import { resolveCharacterCollision } from './character-physics.js';

const DONATION_URL = 'https://www.g-portal.com/int/donate/ae314d607f3e8a9d8f6ad43cabff0bc2/maledicta';
const GPORTAL_URL = 'https://www.g-portal.com/';
const STORAGE_KEY = 'maledicta-donation-mascot-v1';

const guideSteps = [
  {
    title: 'Creá tu cuenta',
    text: 'Entrá en g-portal.com y completá el formulario de registro.',
    art: `
      <div class="mascot-art mascot-art--register" aria-label="Ilustración de un formulario de registro">
        <div class="mascot-browser"><span></span><span></span><span></span></div>
        <strong>Crear cuenta</strong><i>Correo electrónico</i><i>Contraseña</i>
        <b>Registrarme <span>→</span></b>
      </div>`,
    link: `<a class="mascot-action-link" href="${GPORTAL_URL}" target="_blank" rel="noopener noreferrer">Ir a GPORTAL <span aria-hidden="true">↗</span></a>`
  },
  {
    title: 'Seleccioná INT',
    text: 'Hacé clic en el selector de cuenta, junto a tu ID, y elegí INT (International). Las donaciones a Maledicta llegan únicamente desde INT.',
    art: `
      <div class="mascot-art mascot-art--regions" aria-label="INT destacada frente a EU">
        <span class="mascot-region mascot-region--eu"><small>REGIÓN</small><strong>EU</strong><em>Saldo independiente</em></span>
        <span class="mascot-region mascot-region--int"><small>REGIÓN</small><strong>INT</strong><em>✓ Maledicta</em></span>
      </div>`,
    note: 'EU e INT tienen saldos independientes. El crédito de EU no se transfiere a INT.'
  },
  {
    title: 'Cargá crédito',
    text: 'Desde INT, abrí la sección de crédito, elegí el importe y completá el pago con un medio disponible.',
    art: `
      <div class="mascot-art mascot-art--wallet" aria-label="Ilustración de cartera y opciones de pago">
        <div class="mascot-wallet"><span>GPORTAL · INT</span><strong>Mi crédito</strong><b>＋ Cargar saldo</b></div>
        <div class="mascot-payments"><span>💳 Tarjeta</span><span>◉ Otros medios</span><small>Las opciones pueden variar por país.</small></div>
      </div>`,
    note: 'Asegurate de seguir en INT antes de cargar. Revisá en GPORTAL qué métodos están disponibles para tu región.'
  },
  {
    title: 'Abrí el enlace de Maledicta',
    text: 'Ingresá al enlace oficial de donación de Maledicta. Verificá que la página indique el servidor correcto.',
    art: `
      <div class="mascot-art mascot-art--portal" aria-label="Acceso al portal de donaciones de Maledicta">
        <span class="mascot-portal-seal">M</span><div><small>GPORTAL · INT</small><strong>MALEDICTA</strong><em>Portal de donación</em></div><b>↗</b>
      </div>`,
    link: `<a class="mascot-action-link mascot-action-link--bright" href="${DONATION_URL}" target="_blank" rel="noopener noreferrer">Abrir donación de Maledicta <span aria-hidden="true">↗</span></a>`
  },
  {
    title: 'Enviá tu donación',
    text: 'Escribí una descripción, indicá el importe que quieras aportar y confirmá con Enviar en GPORTAL.',
    art: `
      <div class="mascot-art mascot-art--donation" aria-label="Ejemplo de formulario de donación">
        <strong>Donación · Maledicta</strong>
        <label>Descripción <input type="text" value="Donación para Maledicta" aria-label="Descripción sugerida" /></label>
        <label>Importe <input class="mascot-amount" type="number" min="0" step="any" placeholder="Elegí tu importe" aria-label="Importe a elección" /></label>
        <small>Ejemplo visual: completá y confirmá los datos en GPORTAL. Revisá INT antes de enviar.</small>
      </div>`,
    link: `<a class="mascot-action-link" href="${DONATION_URL}" target="_blank" rel="noopener noreferrer">Continuar en GPORTAL <span aria-hidden="true">↗</span></a>`
  }
];

const line = (text, mood = 'curious') => ({ text, mood });
const dialogueBanks = {
  welcome: [
    line('¡Eh! ¡Tú! Soy la pequeña guardiana de Maledicta. Llevo horas patrullando y mi estómago ya ruge...', 'hungry'),
    line('¡Saludos, viajera! Vigilo estas tierras, aunque una guerrera con hambre pierde hasta la cuenta de sus monedas.', 'proud')
  ],
  spontaneous: [
    line('Qué lindo sería tener una monedita para comprarme algo calentito... ¡El invierno nórdico es cruel!', 'hungry'),
    line('¿Sabías que los grandes reinos se mantienen con grandes tesoros? Bueno... con algunos pequeños también.', 'curious'),
    line('Hoy soñé con un banquete. Había carne, hidromiel y una montaña de monedas. ¡Qué sueño tan hermoso!', 'cheerful'),
    line('Estoy pensando en renovar mi armadura. Quizás Maledicta tenga algún benefactor generoso por aquí...', 'proud'),
    line('¡Qué tranquilidad! Casi puedo escuchar las monedas llegando al reino...', 'curious'),
    line('Una guerrera tiene muchas responsabilidades. Comer, entrenar, dormir y cuidar que las arcas del reino sigan respirando.', 'proud'),
    line('¿Vos también sentís ese aroma? Creo que alguien está cocinando... O quizás estoy imaginando cosas por el hambre.', 'hungry'),
    line('Crom me dio fuerza, valor y una espada. ¡Alguien podría darme unas monedas para completar el equipo!', 'playful'),
    line('Qué hermoso sería despertar mañana con las provisiones llenas. ¡Una puede tener sueños ambiciosos!', 'dreamy'),
    line('Estoy practicando mi sonrisa de agradecimiento. ¿Qué tal me sale?', 'cheerful'),
    line('Los bardos cuentan historias de héroes legendarios. ¡Algún día cantaré sobre quienes ayudaron a Maledicta!', 'grateful'),
    line('¡Una pequeña moneda puede hacer una gran diferencia! Además, me vendría estupendamente para el almuerzo.', 'hungry'),
    line('Me pregunto cuántas monedas hacen falta para llenar una despensa... Por curiosidad, claro.', 'curious'),
    line('¡Qué orgullosa estoy de pertenecer a Maledicta! Aunque estaría todavía más orgullosa con un buen plato de estofado.', 'proud'),
    line('Tengo una teoría: cuanto más felices están los habitantes, más posibilidades hay de que aparezcan monedas en las arcas. ¡Habrá que comprobarlo!', 'playful')
  ],
  drag: [
    line('¡Wooooow! ¡Me mareoooo!', 'dizzy'),
    line('¡Esooo! ¡Ese lugar tiene mejor luz!', 'cheerful'),
    line('¡Despacio, despacio! ¡Que todavía tengo el desayuno dando vueltas!', 'dizzy'),
    line('¡JA! ¡Siempre quise volar!', 'cheerful'),
    line('¡Por Crom! ¡Qué paseo! ¿Esto viene incluido con las donaciones?', 'surprised'),
    line('¡Más a la izquierda! ¡Ahí parece que hay mejor comida!', 'hungry'),
    line('¡Uy! ¡Me estás despeinando! ¡Mi melena es patrimonio nórdico!', 'blushing'),
    line('¡Qué vistas! Desde aquí hasta puedo ver las arcas del reino... ¿Están vacías todavía?', 'curious'),
    line('¡Jajajaja! ¡Soy una guerrera, no una bolsa de papas!', 'playful'),
    line('¡Ese rincón me gusta! Tiene pinta de ser un buen lugar para recibir benefactores.', 'proud'),
    line('¡Cuidado con mi espada! ¡La última vez casi corto una pestaña!', 'surprised'),
    line('¡Qué elegante traslado! Deberías trabajar en la realeza.', 'grateful'),
    line('¡Arriba, arriba! ¡Quiero ver si hay algún tesoro escondido!', 'curious'),
    line('¡Me estás dando más vueltas que un comerciante contando sus monedas!', 'dizzy'),
    line('¡Ahí, ahí! ¡Ese es mi nuevo puesto de vigilancia!', 'proud')
  ],
  release: [
    line('¡Puf! ¡Aterrizaje perfecto!', 'cheerful'),
    line('Creo que voy a necesitar un minuto para recuperar la dignidad.', 'blushing'),
    line('¡Este sitio tiene potencial! Quizás hasta consiga un patrocinador.', 'curious'),
    line('¡Gracias por el transporte, noble criatura!', 'grateful'),
    line('¡Aquí me quedo! Desde este lugar puedo vigilar las arcas.', 'proud'),
    line('¡Qué buena ubicación! Ahora solo falta que aparezca un alma generosa.', 'cheerful'),
    line('¡Listo! Ya elegí mi nuevo trono. Acepto monedas como tributo.', 'playful')
  ],
  discord: [
    line('¡Ey, ese es el Discord de Maledicta! ¡No me tapes con tu melena, Jojo!', 'playful'),
    line('¡Compañero, paso! El logo también tiene que salir en la foto.', 'cheerful'),
    line('¡Duelo amistoso! Yo vigilo las arcas y vos cuidás el chat, ¿trato hecho?', 'proud'),
    line('¡No te pongas celoso, Discord! Compartimos las monedas y el estofado.', 'playful'),
    line('¡Uy, perdón, colega! Casi te piso el canal de bienvenida.', 'blushing'),
    line('¡A la cuenta de tres, choque de escudos! Uno, dos... mejor vamos por hidromiel.', 'cheerful')
  ],
  oni: [
    line('¡Eh! ¡Cuidado con esos cuernos! ¡Compartimos el reino, grandulón!', 'surprised'),
    line('¡No ocupes todo el espacio! ¡Yo también tengo que patrullar!', 'playful'),
    line('¡Vaya choque! Espero que tus cuatro colas estén bien.', 'curious')
  ],
  click: [
    line('¡Oh! ¡Alguien quiere hablar conmigo! ¿Traés noticias del reino? ¿O quizás unas monedas?', 'surprised'),
    line('¡Aquí estoy! Siempre disponible para conversaciones, aventuras y pequeños aportes al tesoro.', 'cheerful'),
    line('¿Necesitás ayuda? Soy experta en supervivencia, espadas y detectar personas generosas.', 'proud'),
    line('¡Decime! Tengo toda la atención del mundo. Bueno... casi toda. Mi estómago también reclama atención.', 'hungry'),
    line('¡Bienvenido! ¿Te cuento cómo ayudar a mantener nuestro pequeño reino?', 'curious'),
    line('¡Qué alegría verte! Estaba pensando justamente en Maledicta y en todas las cosas que podríamos hacer con un poquito de ayuda.', 'grateful')
  ],
  wake: [
    line('¡Cinco minutitos más...! ¿Eh? ¿Hay comida? ¡YA DESPERTÉ!', 'surprised'),
    line('¡Buenos días! ¿Me perdí alguna donación mientras dormía?', 'curious'),
    line('¡Por Crom! ¡Qué siesta! Creo que hasta soñé con un cofre lleno de monedas.', 'dreamy'),
    line('¡Estoy lista para otra jornada de aventuras! ¿Vos cómo venís?', 'cheerful'),
    line('¡Qué bueno que volviste! Ya estaba empezando a hablar con mi espada.', 'grateful')
  ],
  linger: [
    line('¿Seguís ahí? ¡Me gusta tu compañía!', 'grateful'),
    line('Creo que estamos haciendo buena pareja de aventuras. Vos navegás y yo superviso.', 'playful'),
    line('Tengo una pregunta importante... ¿Cuándo fue la última vez que comiste algo rico? Porque yo ya perdí la cuenta.', 'hungry'),
    line('¡Qué paciencia tenés! Esa cualidad también sirve para llenar un cofre de monedas.', 'cheerful'),
    line('Si te quedás un ratito más, puedo enseñarte algo sobre las donaciones de Maledicta.', 'curious')
  ],
  guide: [
    line('¡OOOH! ¡Vamos a hablar de tesoros!', 'surprised'),
    line('¡Acá comienza la aventura! Te voy a mostrar cómo colaborar con nuestro reino.', 'cheerful'),
    line('¡Preparate! En cinco pasos te convierto en un benefactor legendario.', 'proud'),
    line('¡Mirá qué sencillo! Hasta yo podría hacerlo con una sola mano... aunque necesito las dos para comer.', 'hungry'),
    line('¡Cada aporte ayuda a mantener encendidas las fogatas de Maledicta!', 'grateful')
  ],
  finish: [
    line('¡Y así se forjan las leyendas! Gracias por llegar hasta el final.', 'grateful'),
    line('¡Ahora ya conocés el camino hacia el tesoro de Maledicta!', 'proud'),
    line('¡Excelente trabajo! Voy a contarle al reino que tenemos visitantes muy generosos.', 'cheerful'),
    line('¡Mi pancita y las arcas del reino te lo agradecen!', 'hungry'),
    line('¡Que Crom ilumine tu camino! Y que algún día nos volvamos a encontrar frente a un gran banquete.', 'grateful')
  ]
};

const chooseDialogue = (bankName, recentPhrases) => {
  const bank = dialogueBanks[bankName] || [];
  const candidates = bank.filter(({ text }) => !recentPhrases.includes(text));
  const fallback = [...dialogueBanks.spontaneous, ...dialogueBanks.linger]
    .filter(({ text }) => !recentPhrases.includes(text));
  const choices = candidates.length ? candidates : fallback;
  return choices[Math.floor(Math.random() * choices.length)];
};

const readSavedState = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    return saved && typeof saved === 'object' ? saved : {};
  } catch (error) {
    console.warn('No se pudo leer el estado de la mascota:', error);
    return {};
  }
};

export const initializeMascot = () => {
  if (document.querySelector('#maledicta-mascot')) return;
  const saved = readSavedState();
  const root = document.createElement('div');
  root.id = 'maledicta-mascot';
  root.className = 'maledicta-mascot';
  root.innerHTML = `
    <div class="mascot-speech" hidden role="status"></div>
    <button class="mascot-companion" type="button" aria-label="Abrir la guía de donaciones" aria-expanded="false" aria-controls="mascot-support-link">
      <span class="mascot-mood-mark" aria-hidden="true"></span>
      <span class="mascot-zs" aria-hidden="true">Z<span>z</span></span>
      <img src="./assets/maledicta/mascota/guerrera.svg" alt="" width="118" height="140" draggable="false" />
      <span class="mascot-food" aria-hidden="true">♡</span>
    </button>
    <a id="mascot-support-link" class="mascot-support-link" href="${DONATION_URL}" target="_blank" rel="noopener noreferrer" aria-label="Apoyar a Maledicta mediante GPORTAL">
      <span aria-hidden="true">♡</span> Apoyar <span aria-hidden="true">↗</span>
    </a>
    <section class="mascot-guide" aria-label="Guía de donaciones a Maledicta" hidden>
      <header class="mascot-guide-header">
        <span class="mascot-guide-emblem" aria-hidden="true">M</span>
        <div><small>GUÍA DE DONACIONES</small><strong>Alimentá al reino y ayudá a Maledicta</strong></div>
        <button class="mascot-close" type="button" data-mascot-action="sleep" aria-label="Cerrar y poner a dormir">×</button>
      </header>
      <div class="mascot-region-warning" role="note">
        <strong><span aria-hidden="true">!</span> IMPORTANTE: DONÁ SIEMPRE DESDE TU CUENTA INT (INTERNATIONAL).</strong>
        <p>Las donaciones a Maledicta llegan únicamente desde INT. Verificá la región antes de cargar crédito y enviar. EU e INT tienen saldos independientes.</p>
      </div>
      <div class="mascot-progress" aria-label="Progreso de la guía"></div>
      <div class="mascot-guide-content"></div>
      <footer class="mascot-guide-footer"></footer>
    </section>
  `;
  document.body.append(root);

  const companion = root.querySelector('.mascot-companion');
  const speech = root.querySelector('.mascot-speech');
  const panel = root.querySelector('.mascot-guide');
  const content = root.querySelector('.mascot-guide-content');
  const progress = root.querySelector('.mascot-progress');
  const footer = root.querySelector('.mascot-guide-footer');
  let step = Number.isInteger(saved.step) ? Math.min(guideSteps.length - 1, Math.max(0, saved.step)) : 0;
  let sleeping = saved.sleeping === true;
  let completed = saved.completed === true;
  let welcomed = saved.welcomed === true;
  let speechTimer;
  let moodTimer;
  let autonomousTimer;
  let sleepYawnTimer;
  let yawnAnimationTimer;
  let pendingDialogueTimer;
  let welcomeTimer;
  let dragStart = null;
  let guideDragStart = null;
  let moved = false;
  let guideDragMoved = false;
  let dragAnnounced = false;
  let discordOverlap = false;
  let discordEncounterThisDrag = false;
  let lastDiscordDialogueAt = 0;
  let discordReactionTimer;
  let discordBadgeTimer;
  let characterOverlap = false;
  let lastCharacterDialogueAt = 0;
  let lastInteractionAt = Date.now();
  const recentPhrases = [];
  const moodClasses = ['dizzy', 'cheerful', 'hungry', 'blushing', 'curious', 'surprised', 'dreamy', 'grateful', 'proud', 'playful'];

  const save = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        left: parseFloat(root.style.left) || null,
        top: parseFloat(root.style.top) || null,
        sleeping,
        step,
        completed,
        welcomed
      }));
    } catch (error) {
      console.warn('No se pudo guardar el estado de la mascota:', error);
    }
  };
  const positionSpeech = () => {
    if (speech.hidden) return;
    const margin = 10;
    const gap = 12;
    const mascot = companion.getBoundingClientRect();
    const bubble = speech.getBoundingClientRect();
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = window.innerHeight;
    const bubbleWidth = bubble.width;
    const bubbleHeight = bubble.height;
    const centerX = mascot.left + mascot.width / 2;
    const centerY = mascot.top + mascot.height / 2;
    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
    const centeredLeft = clamp(centerX - bubbleWidth / 2, margin, viewportWidth - bubbleWidth - margin);
    const centeredTop = clamp(centerY - bubbleHeight / 2, margin, viewportHeight - bubbleHeight - margin);
    const candidates = [
      { anchor: 'top', left: centeredLeft, top: mascot.top - bubbleHeight - gap },
      { anchor: 'bottom', left: centeredLeft, top: mascot.bottom + gap },
      { anchor: 'left', left: mascot.left - bubbleWidth - gap, top: centeredTop },
      { anchor: 'right', left: mascot.right + gap, top: centeredTop }
    ];
    const overlapsMascot = ({ left, top }) => left < mascot.right
      && left + bubbleWidth > mascot.left
      && top < mascot.bottom
      && top + bubbleHeight > mascot.top;
    const overlapsOtherSpeech = ({ left, top }) => {
      const otherSpeech = document.querySelector('.oni-speech');
      if (!otherSpeech || otherSpeech.hidden) return false;
      const other = otherSpeech.getBoundingClientRect();
      return left < other.right && left + bubbleWidth > other.left
        && top < other.bottom && top + bubbleHeight > other.top;
    };
    const fits = ({ left, top }) => left >= margin
      && top >= margin
      && left + bubbleWidth <= viewportWidth - margin
      && top + bubbleHeight <= viewportHeight - margin
      && !overlapsMascot({ left, top })
      && !overlapsOtherSpeech({ left, top });
    let placement = candidates.find((candidate) => fits(candidate) && !overlapsMascot(candidate));
    if (!placement) {
      const preferTop = mascot.top >= viewportHeight - mascot.bottom;
      placement = {
        anchor: preferTop ? 'top' : 'bottom',
        left: centeredLeft,
        top: clamp(
          preferTop ? mascot.top - bubbleHeight - gap : mascot.bottom + gap,
          margin,
          viewportHeight - bubbleHeight - margin
        )
      };
    }
    speech.style.left = `${placement.left}px`;
    speech.style.top = `${placement.top}px`;
    speech.dataset.anchor = placement.anchor;
    speech.style.setProperty(
      '--mascot-tail-offset',
      `${placement.anchor === 'top' || placement.anchor === 'bottom'
        ? clamp(centerX - placement.left, 14, bubbleWidth - 14)
        : clamp(centerY - placement.top, 14, bubbleHeight - 14)}px`
    );
  };
  const checkDiscordCollision = () => {
    const discordLogo = document.querySelector('.discord-badge-logo');
    const logoBox = discordLogo?.getBoundingClientRect();
    const mascotBox = companion.getBoundingClientRect();
    const overlaps = Boolean(
        logoBox
        && discordLogo.getClientRects().length
        && mascotBox.left < logoBox.right
        && mascotBox.right > logoBox.left
        && mascotBox.top < logoBox.bottom
        && mascotBox.bottom > logoBox.top
    );
    if (!overlaps) {
        discordOverlap = false;
        return;
    }
    if (discordOverlap) return;
    discordOverlap = true;
    discordEncounterThisDrag = true;
    if (Date.now() - lastDiscordDialogueAt < 1800) return;
    lastDiscordDialogueAt = Date.now();
    root.classList.add('is-discord-duel');
    window.clearTimeout(discordReactionTimer);
    discordReactionTimer = window.setTimeout(() => root.classList.remove('is-discord-duel'), 1300);
    const discordBadge = discordLogo.closest('.discord-badge');
    if (discordBadge) {
        discordBadge.classList.add('is-friendly-rivalry');
        window.clearTimeout(discordBadgeTimer);
        discordBadgeTimer = window.setTimeout(() => discordBadge.classList.remove('is-friendly-rivalry'), 1100);
    }
    sayRandom('discord');
  };
  const checkOniCollision = () => {
    const oni = document.querySelector('#maledicta-oni');
    const collided = resolveCharacterCollision(root, oni);
    if (!collided) {
      characterOverlap = false;
      return;
    }
    if (characterOverlap) return;
    characterOverlap = true;
    root.classList.add('is-character-bump');
    window.setTimeout(() => root.classList.remove('is-character-bump'), 700);
    document.dispatchEvent(new CustomEvent('maledicta:character-contact', { detail: { source: 'warrior' } }));
  };
  const moveToward = (left, top) => {
    const target = clampPosition(left, top);
    for (let step = 0; step < 256; step += 1) {
      const currentLeft = root.offsetLeft;
      const currentTop = root.offsetTop;
      const dx = target.left - currentLeft;
      const dy = target.top - currentTop;
      const distance = Math.hypot(dx, dy);
      if (distance < 0.5) return;
      const travel = Math.min(24, distance);
      setPosition(currentLeft + dx / distance * travel, currentTop + dy / distance * travel, false);
      checkOniCollision();
      checkDiscordCollision();
      if (root.offsetLeft === currentLeft && root.offsetTop === currentTop) return;
    }
  };
  const positionGuide = () => {
    if (panel.hidden || guideDragStart) return;
    const margin = 12;
    const gap = 14;
    const mascot = companion.getBoundingClientRect();
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = window.innerHeight;
    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
    panel.style.maxHeight = '';
    const panelWidth = panel.offsetWidth;
    const panelHeight = panel.offsetHeight;
    const maxLeft = Math.max(margin, viewportWidth - panelWidth - margin);
    const maxTop = Math.max(margin, viewportHeight - panelHeight - margin);
    const centeredLeft = clamp(mascot.left + mascot.width / 2 - panelWidth / 2, margin, maxLeft);
    const characters = [...document.querySelectorAll('#maledicta-mascot, #maledicta-oni')]
      .map((character) => character.getBoundingClientRect());
    const leftCandidates = [
      centeredLeft,
      mascot.left - panelWidth - gap,
      mascot.right + gap,
      margin,
      maxLeft
    ].map((left) => clamp(left, margin, maxLeft))
      .filter((left, index, list) => list.indexOf(left) === index);
    const spaces = leftCandidates.flatMap((left, index) => {
      const obstructions = characters
        .filter((character) => left < character.right && left + panelWidth > character.left)
        .map((character) => ({
          top: Math.max(margin, character.top),
          bottom: Math.min(viewportHeight - margin, character.bottom)
        }))
        .filter((character) => character.bottom > character.top)
        .sort((a, b) => a.top - b.top);
      const available = [];
      let cursor = margin;
      obstructions.forEach((character) => {
        if (character.top > cursor) available.push({ left, top: cursor, bottom: character.top, index });
        cursor = Math.max(cursor, character.bottom);
      });
      if (cursor < viewportHeight - margin) {
        available.push({ left, top: cursor, bottom: viewportHeight - margin, index });
      }
      return available;
    });
    const fullSpace = spaces.find((space) => space.bottom - space.top >= panelHeight);
    let placement;
    if (fullSpace) {
      const top = clamp(
        mascot.top + mascot.height / 2 - panelHeight / 2,
        fullSpace.top,
        fullSpace.bottom - panelHeight
      );
      placement = { left: fullSpace.left, top };
    } else {
      const bestSpace = spaces.reduce((best, space) => (
        !best || space.bottom - space.top > best.bottom - best.top ? space : best
      ), null);
      const availableHeight = bestSpace ? bestSpace.bottom - bestSpace.top : viewportHeight - margin * 2;
      panel.style.maxHeight = `${availableHeight}px`;
      placement = bestSpace
        ? { left: bestSpace.left, top: bestSpace.top }
        : { left: margin, top: margin };
    }
    panel.style.left = `${placement.left}px`;
    panel.style.top = `${placement.top}px`;
    panel.style.right = 'auto';
    panel.style.bottom = 'auto';
  };
  const guidePositionIsClear = (left, top) => {
    const margin = 8;
    const maxLeft = Math.max(margin, document.documentElement.clientWidth - panel.offsetWidth - margin);
    const maxTop = Math.max(margin, window.innerHeight - panel.offsetHeight - margin);
    const position = {
      left: Math.max(margin, Math.min(maxLeft, left)),
      top: Math.max(margin, Math.min(maxTop, top))
    };
    const right = position.left + panel.offsetWidth;
    const bottom = position.top + panel.offsetHeight;
    const overlapsCharacter = [...document.querySelectorAll('#maledicta-mascot, #maledicta-oni')]
      .some((character) => {
        if (character === root) return false;
        const bounds = character.getBoundingClientRect();
        return position.left < bounds.right && right > bounds.left
          && position.top < bounds.bottom && bottom > bounds.top;
      });
    if (overlapsCharacter) return false;
    panel.style.left = `${position.left}px`;
    panel.style.top = `${position.top}px`;
    panel.style.right = 'auto';
    panel.style.bottom = 'auto';
    return true;
  };
  const clampPosition = (left, top) => ({
    left: Math.max(8, Math.min(window.innerWidth - root.offsetWidth - 8, left)),
    top: Math.max(8, Math.min(window.innerHeight - root.offsetHeight - 8, top))
  });
  const setPosition = (left, top, shouldSave = true) => {
    const position = clampPosition(left, top);
    root.style.left = `${position.left}px`;
    root.style.top = `${position.top}px`;
    root.style.right = 'auto';
    root.style.bottom = 'auto';
    positionSpeech();
    positionGuide();
    if (shouldSave) save();
  };
  if (Number.isFinite(saved.left) && Number.isFinite(saved.top)) {
    setPosition(saved.left, saved.top, false);
  }
  root.classList.toggle('is-sleeping', sleeping);
  companion.setAttribute('aria-label', sleeping ? 'Despertar y abrir la guía de donaciones' : 'Abrir la guía de donaciones');
  if (completed) root.classList.add('is-celebrating');

  const stopAutonomousTimer = () => {
    if (autonomousTimer) window.clearInterval(autonomousTimer);
    autonomousTimer = null;
  };
  const startAutonomousTimer = () => {
    stopAutonomousTimer();
    if (sleeping || document.hidden) return;
    autonomousTimer = window.setInterval(() => {
      if (sleeping || document.hidden) {
        stopAutonomousTimer();
        return;
      }
      const idleFor = Date.now() - lastInteractionAt;
      const bank = idleFor >= 60000 && Math.random() < 0.35 ? 'linger' : 'spontaneous';
      sayRandom(bank, false);
    }, 15000);
  };
  const scheduleSleepYawn = () => {
    window.clearTimeout(sleepYawnTimer);
    sleepYawnTimer = null;
    if (!sleeping || document.hidden) return;
    sleepYawnTimer = window.setTimeout(() => {
      if (!sleeping || document.hidden) return;
      root.classList.add('is-yawning');
      window.clearTimeout(yawnAnimationTimer);
      yawnAnimationTimer = window.setTimeout(() => root.classList.remove('is-yawning'), 950);
      scheduleSleepYawn();
    }, 60000);
  };
  const clearMood = () => {
    window.clearTimeout(moodTimer);
    root.classList.remove(...moodClasses.map((mood) => `is-${mood}`));
    companion.dataset.mood = '';
  };
  const clearDialogue = () => {
    window.clearTimeout(speechTimer);
    speech.hidden = true;
    speech.textContent = '';
    clearMood();
  };
  const say = (entry) => {
    window.clearTimeout(speechTimer);
    clearMood();
    speech.textContent = entry.text;
    speech.hidden = false;
    positionSpeech();
    companion.dataset.mood = entry.mood;
    root.classList.add(`is-${entry.mood}`);
    const duration = Math.min(7000, Math.max(4000, entry.text.length * 35));
    speechTimer = window.setTimeout(() => { speech.hidden = true; }, duration);
    moodTimer = window.setTimeout(clearMood, 1800);
  };
  const sayRandom = (bankName, restartTimer = true) => {
    window.clearTimeout(pendingDialogueTimer);
    if (bankName !== 'welcome') window.clearTimeout(welcomeTimer);
    const entry = chooseDialogue(bankName, recentPhrases);
    if (!entry) return;
    recentPhrases.push(entry.text);
    if (recentPhrases.length > 5) recentPhrases.shift();
    say(entry);
    if (restartTimer) {
      lastInteractionAt = Date.now();
      startAutonomousTimer();
    }
  };
  const interruptForInteraction = () => {
    window.clearTimeout(pendingDialogueTimer);
    clearDialogue();
    lastInteractionAt = Date.now();
    startAutonomousTimer();
  };

  const renderGuide = () => {
    const finalScreen = step >= guideSteps.length;
    progress.innerHTML = guideSteps.map((item, index) => `
      <span class="mascot-progress-item ${index < step ? 'is-done' : ''} ${index === step && !finalScreen ? 'is-current' : ''}">
        <span>${index < step ? '✓' : index + 1}</span><small>${item.title}</small>
      </span>`).join('');
    if (finalScreen) {
      content.innerHTML = `
        <div class="mascot-finale">
          <div class="mascot-finale-stars" aria-hidden="true">✦　✧　✦</div>
          <span class="mascot-finale-icon" aria-hidden="true">♡</span>
          <h2>¡Gracias por acompañar a Maledicta!</h2>
          <p>La guía está completa. Si querés colaborar con el servidor, podés abrir el portal oficial de donación. La página no puede comprobar si se realizó un pago.</p>
          <a class="mascot-action-link mascot-action-link--bright" href="${DONATION_URL}" target="_blank" rel="noopener noreferrer">Abrir donación de Maledicta <span aria-hidden="true">↗</span></a>
        </div>`;
      footer.innerHTML = `<button type="button" class="mascot-nav-button" data-mascot-action="back">← Volver a la guía</button><button type="button" class="mascot-nav-button mascot-nav-button--primary" data-mascot-action="sleep">Listo</button>`;
      return;
    }
    const current = guideSteps[step];
    content.innerHTML = `
      <div class="mascot-step-art">${current.art}</div>
      <div class="mascot-step-copy"><p class="mascot-step-eyebrow">PASO ${step + 1} DE ${guideSteps.length}</p>
        <h2>${current.title}</h2><p>${current.text}</p>
        ${current.note ? `<p class="mascot-step-note">${current.note}</p>` : ''}
        ${current.link || ''}
      </div>`;
    footer.innerHTML = `
      <button type="button" class="mascot-nav-button" data-mascot-action="back" ${step === 0 ? 'disabled' : ''}>← Anterior</button>
      <button type="button" class="mascot-nav-button mascot-nav-button--primary" data-mascot-action="next">${step === guideSteps.length - 1 ? 'Completar guía ✓' : 'Siguiente →'}</button>`;
  };

  const openGuide = (dialogueBank = 'guide') => {
    window.clearTimeout(sleepYawnTimer);
    window.clearTimeout(yawnAnimationTimer);
    sleeping = false;
    root.classList.remove('is-sleeping');
    root.classList.remove('is-yawning');
    root.classList.add('is-excited');
    root.classList.add('is-support-open');
    panel.hidden = false;
    companion.setAttribute('aria-expanded', 'true');
    companion.setAttribute('aria-label', 'Hablar con la guardiana');
    renderGuide();
    positionGuide();
    sayRandom(dialogueBank);
    if (dialogueBank === 'wake') {
      pendingDialogueTimer = window.setTimeout(() => {
        if (!sleeping && !panel.hidden) sayRandom('guide');
      }, 4600);
    }
    save();
    window.setTimeout(() => root.classList.remove('is-excited'), 900);
  };
  const sleep = () => {
    sleeping = true;
    stopAutonomousTimer();
    window.clearTimeout(pendingDialogueTimer);
    clearDialogue();
    panel.hidden = true;
    root.classList.remove('is-support-open');
    panel.style.left = '';
    panel.style.top = '';
    panel.style.right = '';
    panel.style.bottom = '';
    companion.setAttribute('aria-expanded', 'false');
    companion.setAttribute('aria-label', 'Despertar y abrir la guía de donaciones');
    root.classList.add('is-sleeping');
    setPosition(window.innerWidth - root.offsetWidth - 8, window.innerHeight - root.offsetHeight - 8);
    scheduleSleepYawn();
    save();
  };

  root.addEventListener('pointerdown', (event) => {
    if (event.target.closest('.mascot-guide-header') && !event.target.closest('.mascot-close')) {
      guideDragStart = {
        x: event.clientX,
        y: event.clientY,
        left: panel.offsetLeft,
        top: panel.offsetTop,
        pointerId: event.pointerId,
        pointerType: event.pointerType
      };
      guideDragMoved = false;
      if (event.pointerType !== 'mouse') panel.setPointerCapture(event.pointerId);
      return;
    }
    if (event.target.closest('.mascot-guide')) return;
    if (event.target.closest('.mascot-companion')) {
      dragStart = {
        x: event.clientX,
        y: event.clientY,
        left: root.offsetLeft,
        top: root.offsetTop,
        pointerId: event.pointerId,
        pointerType: event.pointerType
      };
      moved = false;
      dragAnnounced = false;
      discordEncounterThisDrag = false;
      if (event.pointerType !== 'mouse') companion.setPointerCapture(event.pointerId);
    }
  });
  const moveDrag = (event) => {
    if (!dragStart) return;
    if (event.pointerId !== undefined
      && (dragStart.pointerType === 'mouse' || event.pointerId !== dragStart.pointerId)) return;
    if (event.pointerId === undefined && (dragStart.pointerType !== 'mouse' || event.buttons !== 1)) return;
    const dx = event.clientX - dragStart.x;
    const dy = event.clientY - dragStart.y;
    if (Math.abs(dx) + Math.abs(dy) > 8) moved = true;
    if (moved) {
      event.preventDefault();
      if (!dragAnnounced) {
        dragAnnounced = true;
        root.classList.add('is-dragging');
        sayRandom('drag');
      }
      moveToward(dragStart.left + dx, dragStart.top + dy);
    }
  };
  window.addEventListener('pointermove', moveDrag);
  window.addEventListener('mousemove', moveDrag);
  const finishDrag = (event) => {
    if (!dragStart) return;
    if (event.pointerId !== undefined
      && (dragStart.pointerType === 'mouse' || event.pointerId !== dragStart.pointerId)) return;
    if (event.pointerId === undefined && dragStart.pointerType !== 'mouse') return;
    if (moved) {
      root.classList.remove('is-dragging');
      companion.dataset.dragged = 'true';
      save();
      window.setTimeout(() => { delete companion.dataset.dragged; }, 0);
      pendingDialogueTimer = window.setTimeout(() => {
        sayRandom(discordEncounterThisDrag ? 'discord' : 'release');
      }, 750);
    }
    dragStart = null;
  };
  window.addEventListener('pointerup', finishDrag);
  window.addEventListener('pointercancel', finishDrag);
  window.addEventListener('mouseup', finishDrag);
  const moveGuideDrag = (event) => {
    if (!guideDragStart) return;
    if (event.pointerId !== undefined
      && (guideDragStart.pointerType === 'mouse' || event.pointerId !== guideDragStart.pointerId)) return;
    if (event.pointerId === undefined && (guideDragStart.pointerType !== 'mouse' || event.buttons !== 1)) return;
    const dx = event.clientX - guideDragStart.x;
    const dy = event.clientY - guideDragStart.y;
    if (Math.abs(dx) + Math.abs(dy) > 5) guideDragMoved = true;
    if (!guideDragMoved) return;
    event.preventDefault();
    panel.classList.add('is-guide-dragging');
    guidePositionIsClear(guideDragStart.left + dx, guideDragStart.top + dy);
  };
  window.addEventListener('pointermove', moveGuideDrag);
  window.addEventListener('mousemove', moveGuideDrag);
  const finishGuideDrag = (event) => {
    if (!guideDragStart) return;
    if (event.pointerId !== undefined
      && (guideDragStart.pointerType === 'mouse' || event.pointerId !== guideDragStart.pointerId)) return;
    if (event.pointerId === undefined && guideDragStart.pointerType !== 'mouse') return;
    panel.classList.remove('is-guide-dragging');
    guideDragStart = null;
  };
  window.addEventListener('pointerup', finishGuideDrag);
  window.addEventListener('pointercancel', finishGuideDrag);
  window.addEventListener('mouseup', finishGuideDrag);
  document.addEventListener('maledicta:character-contact', () => {
    const now = Date.now();
    if (now - lastCharacterDialogueAt < 10000) return;
    lastCharacterDialogueAt = now;
    root.classList.add('is-character-bump');
    window.setTimeout(() => root.classList.remove('is-character-bump'), 700);
    save();
    sayRandom('oni');
  });

  companion.addEventListener('click', () => {
    if (companion.dataset.dragged === 'true') return;
    if (panel.hidden) {
      openGuide(sleeping ? 'wake' : 'guide');
    } else {
      sayRandom('click');
    }
  });
  root.addEventListener('click', (event) => {
    const actionButton = event.target.closest('[data-mascot-action]');
    if (!actionButton) return;
    const action = actionButton.dataset.mascotAction;
    if (action === 'sleep') {
      sleep();
      return;
    }
    if (action === 'back') {
      interruptForInteraction();
      step = Math.max(0, step - 1);
      save();
      renderGuide();
      return;
    }
    if (action === 'next') {
      interruptForInteraction();
      if (step < guideSteps.length - 1) {
        step += 1;
        save();
        renderGuide();
      } else {
        step = guideSteps.length;
        completed = true;
        root.classList.add('is-celebrating');
        save();
        renderGuide();
        sayRandom('finish');
      }
    }
  });

  window.addEventListener('resize', () => {
    setPosition(root.offsetLeft, root.offsetTop);
    checkOniCollision();
    positionSpeech();
    positionGuide();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutonomousTimer();
      window.clearTimeout(sleepYawnTimer);
      sleepYawnTimer = null;
      return;
    }
    lastInteractionAt = Date.now();
    if (sleeping) scheduleSleepYawn();
    else startAutonomousTimer();
  });
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !panel.hidden) sleep();
  });

  if (!sleeping && !welcomed) {
    welcomed = true;
    save();
    welcomeTimer = window.setTimeout(() => {
      if (panel.hidden && !sleeping) sayRandom('welcome');
    }, 1400);
  }
  if (sleeping) scheduleSleepYawn();
  else startAutonomousTimer();
  save();
};
