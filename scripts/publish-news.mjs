/**
 * Envía al Discord de Maledicta las noticias de js/content.js que todavía no se enviaron.
 *
 *   npm run publish-news              envía las noticias nuevas (de la más antigua a la más reciente)
 *   npm run publish-news -- --dry-run muestra lo que se enviaría, sin enviar nada
 *   npm run publish-news -- --id fase-beta   envía (o reenvía) solo esa noticia
 *
 * Regla obligatoria: toda noticia menciona a @everyone, oculto dentro de un spoiler.
 * Las imágenes de la noticia y el logo de cierre se adjuntan al mensaje, así se ven
 * aunque la web todavía no esté publicada con esos archivos.
 *
 * La URL del webhook es secreta: se lee de la variable de entorno DISCORD_NEWS_WEBHOOK
 * o del archivo .env de la carpeta superior a crearPJ/ (fuera de la carpeta pública).
 * Las noticias enviadas se registran en .news-sent.json, en esa misma carpeta.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { basename, dirname, join } from 'node:path';
import { NEWS } from '../js/content.js';

const siteRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const privateRoot = join(siteRoot, '..');
const envFile = join(privateRoot, '.env');
const sentFile = join(privateRoot, '.news-sent.json');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const onlyId = args.includes('--id') ? args[args.indexOf('--id') + 1] : null;

const LOGO_PATH = 'assets/maledicta-logo.webp';
const IMAGE_TYPES = { '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif' };

const readEnvValue = (key) => {
  if (process.env[key]) return process.env[key];
  if (!existsSync(envFile)) return null;
  const line = readFileSync(envFile, 'utf8').split(/\r?\n/).find((entry) => entry.trim().startsWith(`${key}=`));
  return line ? line.slice(line.indexOf('=') + 1).trim() : null;
};

const readSent = () => (existsSync(sentFile) ? JSON.parse(readFileSync(sentFile, 'utf8')) : {});
const writeSent = (sent) => writeFileSync(sentFile, `${JSON.stringify(sent, null, 2)}\n`);

const domain = existsSync(join(siteRoot, 'CNAME')) ? readFileSync(join(siteRoot, 'CNAME'), 'utf8').trim() : '';
const siteUrl = domain ? `https://${domain}` : null;

// Límites de Discord para embeds.
const clip = (text, max) => (text.length > max ? `${text.slice(0, max - 1)}…` : text);
const EMPTY_NAME = '​';

// Archivos locales que viajan adjuntos al mensaje; los embeds los citan como attachment://nombre.
const collectAttachments = (item) => {
  const sectionImage = (item.sections || []).find((section) => section.image)?.image;
  const files = [];
  if (sectionImage) files.push({ role: 'image', path: sectionImage.src });
  files.push({ role: 'logo', path: LOGO_PATH });
  return files
    .filter((file) => existsSync(join(siteRoot, file.path)))
    .map((file) => ({ ...file, name: basename(file.path) }));
};

const buildEmbed = (item, attachments) => {
  const description = [
    item.greeting ? `**${item.greeting}**` : '',
    item.summary || '',
    item.highlight ? `## ${item.highlight.title}\n**${item.highlight.subtitle}**` : ''
  ].filter(Boolean).join('\n\n');

  const fields = (item.sections || []).map((section) => {
    const value = section.races
      ? section.races.map((race) => `• ${race.name}`).join('\n')
      : section.body.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).join('\n\n');
    return {
      name: clip(section.title ? section.title.toUpperCase() : EMPTY_NAME, 256),
      value: clip(value, 1024),
      inline: false
    };
  });

  const image = attachments.find((file) => file.role === 'image');
  return {
    title: clip(item.title.toUpperCase(), 256),
    url: siteUrl ? `${siteUrl}/#noticias/${item.id}` : undefined,
    description: clip(description, 4096),
    color: 0xa91f3e,
    fields: fields.slice(0, 25),
    author: { name: clip(item.kicker || 'Noticia', 256) },
    image: image ? { url: `attachment://${image.name}` } : undefined,
    timestamp: new Date(`${item.date}T12:00:00Z`).toISOString()
  };
};

// Cierre: firma de la noticia y el logo de Maledicta al final del mensaje.
const buildClosingEmbed = (item, attachments) => {
  const logo = attachments.find((file) => file.role === 'logo');
  const text = [item.closing, item.signature ? `**${item.signature}**` : ''].filter(Boolean).join('\n\n');
  return {
    description: text ? clip(text, 4096) : undefined,
    color: 0xa91f3e,
    image: logo ? { url: `attachment://${logo.name}` } : undefined,
    footer: { text: 'Maledicta · Noticias oficiales' }
  };
};

const buildPayload = (item, attachments) => ({
  username: 'Maledicta',
  avatar_url: siteUrl ? `${siteUrl}/${LOGO_PATH}` : undefined,
  // Regla obligatoria: @everyone siempre, oculto en un spoiler. Nunca roles ni usuarios.
  content: '||@everyone||',
  allowed_mentions: { parse: ['everyone'] },
  embeds: [buildEmbed(item, attachments), buildClosingEmbed(item, attachments)],
  attachments: attachments.map((file, index) => ({ id: index, filename: file.name }))
});

const buildBody = (payload, attachments) => {
  const form = new FormData();
  form.append('payload_json', JSON.stringify(payload));
  attachments.forEach((file, index) => {
    const type = IMAGE_TYPES[file.name.slice(file.name.lastIndexOf('.')).toLowerCase()] || 'application/octet-stream';
    form.append(`files[${index}]`, new Blob([readFileSync(join(siteRoot, file.path))], { type }), file.name);
  });
  return form;
};

const sendToDiscord = async (webhook, payload, attachments) => {
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const response = await fetch(`${webhook}?wait=true`, {
      method: 'POST',
      body: buildBody(payload, attachments)
    });
    if (response.ok) return response.json();
    if (response.status === 429) {
      const { retry_after: retryAfter = 2 } = await response.json().catch(() => ({}));
      await new Promise((resolve) => setTimeout(resolve, Math.ceil(retryAfter * 1000)));
      continue;
    }
    throw new Error(`Discord respondió ${response.status}: ${await response.text()}`);
  }
  throw new Error('Discord siguió limitando los envíos (429). Probá de nuevo en un minuto.');
};

const main = async () => {
  const sent = readSent();
  const pending = NEWS
    .filter((item) => (onlyId ? item.id === onlyId : !sent[item.id]))
    .sort((a, b) => a.date.localeCompare(b.date));

  if (onlyId && !pending.length) throw new Error(`No existe una noticia con id "${onlyId}" en js/content.js.`);
  if (!pending.length) {
    console.log('No hay noticias nuevas para enviar.');
    return;
  }

  if (dryRun) {
    pending.forEach((item) => {
      const attachments = collectAttachments(item);
      console.log(JSON.stringify(buildPayload(item, attachments), null, 2));
      console.log(`Adjuntos: ${attachments.map((file) => file.path).join(', ') || 'ninguno'}`);
    });
    console.log(`\n[simulación] Se enviarían ${pending.length} noticia(s). No se envió nada.`);
    return;
  }

  const webhook = readEnvValue('DISCORD_NEWS_WEBHOOK');
  if (!webhook || !/^https:\/\/(discord\.com|discordapp\.com)\/api\/webhooks\//.test(webhook)) {
    throw new Error(`Falta DISCORD_NEWS_WEBHOOK (en ${envFile} o como variable de entorno).`);
  }

  for (const item of pending) {
    const attachments = collectAttachments(item);
    const message = await sendToDiscord(webhook, buildPayload(item, attachments), attachments);
    sent[item.id] = { sentAt: new Date().toISOString(), messageId: message.id };
    writeSent(sent);
    console.log(`Enviada: "${item.title}" (${item.id})`);
  }
};

main().catch((error) => {
  console.error(`Error: ${error.message}`);
  process.exitCode = 1;
});
