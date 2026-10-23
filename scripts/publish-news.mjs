/**
 * Envía al Discord de Maledicta las noticias de js/content.js que todavía no se enviaron.
 *
 *   npm run publish-news              envía las noticias nuevas (de la más antigua a la más reciente)
 *   npm run publish-news -- --dry-run muestra lo que se enviaría, sin enviar nada
 *   npm run publish-news -- --id fase-beta   envía (o reenvía) solo esa noticia
 *
 * La URL del webhook es secreta: se lee de la variable de entorno DISCORD_NEWS_WEBHOOK
 * o del archivo .env de la carpeta superior a crearPJ/ (fuera de la carpeta pública).
 * Las noticias enviadas se registran en .news-sent.json, en esa misma carpeta.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { NEWS } from '../js/content.js';

const siteRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const privateRoot = join(siteRoot, '..');
const envFile = join(privateRoot, '.env');
const sentFile = join(privateRoot, '.news-sent.json');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const onlyId = args.includes('--id') ? args[args.indexOf('--id') + 1] : null;

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

const buildEmbed = (item) => {
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

  if (item.closing || item.signature) {
    fields.push({
      name: EMPTY_NAME,
      value: clip([item.closing, item.signature ? `*${item.signature}*` : ''].filter(Boolean).join('\n'), 1024),
      inline: false
    });
  }

  return {
    title: clip(item.title.toUpperCase(), 256),
    url: siteUrl ? `${siteUrl}/#noticias` : undefined,
    description: clip(description, 4096),
    color: 0xa91f3e,
    fields: fields.slice(0, 25),
    author: { name: clip(item.kicker || 'Noticia', 256) },
    thumbnail: siteUrl ? { url: `${siteUrl}/assets/maledicta-logo.webp` } : undefined,
    footer: { text: 'Maledicta · Noticias oficiales' },
    timestamp: new Date(`${item.date}T12:00:00Z`).toISOString()
  };
};

const buildPayload = (item) => ({
  username: 'Maledicta',
  avatar_url: siteUrl ? `${siteUrl}/assets/maledicta-logo.webp` : undefined,
  // Nunca mencionar @everyone, roles ni usuarios por texto copiado en la noticia.
  allowed_mentions: { parse: [] },
  embeds: [buildEmbed(item)]
});

const sendToDiscord = async (webhook, payload) => {
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const response = await fetch(`${webhook}?wait=true`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload)
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
    pending.forEach((item) => console.log(JSON.stringify(buildPayload(item), null, 2)));
    console.log(`\n[simulación] Se enviarían ${pending.length} noticia(s). No se envió nada.`);
    return;
  }

  const webhook = readEnvValue('DISCORD_NEWS_WEBHOOK');
  if (!webhook || !/^https:\/\/(discord\.com|discordapp\.com)\/api\/webhooks\//.test(webhook)) {
    throw new Error(`Falta DISCORD_NEWS_WEBHOOK (en ${envFile} o como variable de entorno).`);
  }

  for (const item of pending) {
    const message = await sendToDiscord(webhook, buildPayload(item));
    sent[item.id] = { sentAt: new Date().toISOString(), messageId: message.id };
    writeSent(sent);
    console.log(`Enviada: "${item.title}" (${item.id})`);
  }
};

main().catch((error) => {
  console.error(`Error: ${error.message}`);
  process.exitCode = 1;
});
