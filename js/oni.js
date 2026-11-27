import { resolveCharacterCollision } from './character-physics.js';

const STORAGE_KEY = 'maledicta-oni-v1';
const PAYPAL_URL = 'https://paypal.me/WeCraft?locale.x=es_XC&country.x=AR';
const spirits = ['red', 'green', 'pink', 'black'];
const mood = (text, expression = 'spirit') => ({ text, expression });

const dialogueBanks = {
  red: [
    mood('Los grandes reinos necesitan grandes voluntades. ¿Vas a dejar que Maledicta crezca sin tu aporte?', 'proud'),
    mood('Hmph... hasta los espíritus más poderosos necesitan recursos para conservar su territorio. PayPal puede ayudarte a fortalecer este reino.', 'stern'),
    mood('Tu pequeña contribución puede alimentar una llama que seguirá ardiendo durante mucho tiempo.', 'fire'),
    mood('Los Oni respetamos a quienes protegen aquello que consideran suyo. Maledicta también merece esa lealtad.', 'proud'),
    mood('Tengo cuatro colas, dos cuernos y un reino que proteger. ¡Ayudame a mantenerlo en pie!', 'stern'),
    mood('Un verdadero aliado deja huella. Tu aporte mediante PayPal puede convertirse en una mejora para todos los habitantes de Maledicta.', 'fire'),
    mood('Que quede claro: este reino tiene mucho por conquistar. Cada contribución nos acerca a nuestro próximo gran proyecto.', 'proud')
  ],
  green: [
    mood('¿Conocés PayPal? Es una forma directa de colaborar con el mantenimiento y crecimiento de Maledicta.', 'calm'),
    mood('Cada contribución ayuda a sostener nuestro servidor de Conan Exiles y mantenerlo disponible para la comunidad.', 'calm'),
    mood('Luna utiliza estos recursos para invertir en herramientas que permiten desarrollar nuevas funcionalidades para Maledicta.', 'wise'),
    mood('Nuestra página web también forma parte del proyecto. Mantenerla y mejorarla requiere recursos y trabajo constante.', 'wise'),
    mood('Las contribuciones recibidas se destinan exclusivamente al desarrollo, mantenimiento y crecimiento de Maledicta.', 'calm'),
    mood('Un pequeño aporte puede convertirse en herramientas, mejoras técnicas y nuevas posibilidades para nuestra comunidad.', 'wise'),
    mood('La infraestructura, el alojamiento y las nuevas funciones sostienen el proyecto. Cada aporte voluntario ayuda a que Maledicta siga creciendo.', 'calm')
  ],
  pink: [
    mood('Onichan~ ¿Sabías que mis cuatro colitas brillan mucho más cuando Maledicta recibe cariño?', 'sweet'),
    mood('¡Kyaa! Quiero seguir siendo el Oni más kawaii de toda la página. ¿Me ayudás a mantener mi energía?', 'sweet'),
    mood('Dicen que las donaciones hacen crecer los reinos... ¡Yo creo que también me hacen más hermoso!', 'playful'),
    mood('Nee~ ¿Me regalarías un poquito de energía para seguir acompañándote por aquí?', 'sweet'),
    mood('Arigatou~ Cada aporte ayuda a mantener vivo este pequeño universo que compartimos.', 'sweet'),
    mood('¡Mis cuernitos están brillando! Creo que Maledicta necesita más proyectos bonitos... y yo quiero verlos todos.', 'playful'),
    mood('Onichan, si querés ayudar a que nuestro rinconcito siga creciendo, podés dejar tu aporte por PayPal. ¡Prometo mover mis cuatro colitas de felicidad!', 'sweet'),
    mood('¡Qué bonito sería ver Maledicta llena de nuevas aventuras! Cada contribución ayuda a que ese sueño siga tomando forma.', 'playful')
  ],
  black: [
    mood('¿Sabés...? A veces me pregunto cuánto tiempo podré seguir habitando este pequeño rincón de Maledicta.', 'shy'),
    mood('Me gusta cuando entrás a la página. Por un instante, siento que mi espíritu tiene un lugar al que pertenecer.', 'soft'),
    mood('Maledicta necesita recursos para seguir creciendo... Ojalá pueda acompañarlos durante mucho tiempo.', 'soft'),
    mood('Mi llama espiritual está un poquito débil. Las contribuciones ayudan a mantener encendido este mundo que compartimos.', 'shy'),
    mood('¿Puedo contarte un secreto? Me gustaría seguir aquí cuando vuelvas mañana... y también cuando regreses dentro de muchos meses.', 'soft'),
    mood('Si alguna vez sentís ganas de ayudar a Maledicta, podés hacerlo mediante PayPal. Cada aporte ayuda a que este lugar siga existiendo.', 'shy'),
    mood('Tengo miedo de las sombras que se acercan cuando la energía escasea... Pero todavía hay muchos proyectos por descubrir.', 'soft'),
    mood('Quiero seguir acompañándote, mostrarte mis cuatro colitas y conocer a quienes llegan a este reino. Si querés ayudar a que Maledicta continúe creciendo, tu aporte será muy valioso.', 'soft')
  ]
};

const movementLines = {
  red: [mood('¿Qué territorio intentás conquistar conmigo?', 'stern'), mood('Con cuidado... mis cuernos son parte de mi esencia.', 'proud'), mood('Mi espíritu ha sido desplazado... y no suelo olvidar estas cosas.', 'fire')],
  green: [mood('Las cuatro colas han perdido el equilibrio. Un traslado inesperado.', 'wise'), mood('Este lugar tiene una energía espiritual interesante.', 'calm'), mood('Observo que has decidido cambiar mi posición estratégica.', 'wise')],
  pink: [mood('¡Mis cuatro colitas están haciendo una coreografía nueva!', 'playful'), mood('Nee~ ¡Qué paseo tan sugoi! ¿A dónde vamos?', 'sweet'), mood('¡Con cuidado con mis cuernitos, onichan!', 'sweet')],
  black: [mood('¿Podrías moverme despacito...? Mis colitas se asustan.', 'shy'), mood('Este lugar se siente distinto... ¿te quedás un momento?', 'soft'), mood('Gracias por llevarme. A veces cuesta cambiar de rincón.', 'soft')]
};

const releaseLines = {
  red: [mood('Bien. Desde aquí también puedo vigilar el reino.', 'proud'), mood('El territorio parece aceptable. Por ahora.', 'stern')],
  green: [mood('Nueva ubicación asegurada. Gracias por ayudarme a observar mejor.', 'calm'), mood('Un buen guardián conoce cada rincón de su reino.', 'wise')],
  pink: [mood('¡Arigatou! ¡Este rinconcito es kawaii!', 'sweet'), mood('¡Aterrizaje perfecto! Mis cuatro colitas aprueban.', 'playful')],
  black: [mood('Gracias por dejarme aquí. Creo que voy a estar bien.', 'soft'), mood('Me quedaré un ratito en este rincón contigo.', 'shy')]
};

const colorShiftLines = {
  red: mood('¡El sello espiritual ha despertado mi furia! Mi esencia vuelve a teñirse de rojo.', 'stern'),
  green: mood('El flujo de energía ancestral ha cambiado. Mi espíritu recupera el equilibrio.', 'wise'),
  pink: mood('¡Kyaa! Una energía dulce acaba de despertar mi espíritu. ¡Qué sensación tan kawaii!', 'sweet'),
  black: mood('Las sombras han alcanzado mi esencia... Mi energía espiritual se está debilitando.', 'shy')
};

const contactLines = [
  mood('¡Aparta, criatura! Este territorio también me pertenece.', 'stern'),
  mood('Cuatro colas, dos cuernos y muy poca paciencia.', 'proud'),
  mood('¡Vaya choque! Compartimos el reino, no el mismo espacio.', 'wise')
];

const readSavedState = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    return saved && typeof saved === 'object' ? saved : {};
  } catch (error) {
    console.warn('No se pudo leer el estado del Oni:', error);
    return {};
  }
};

export const initializeOni = () => {
  if (document.querySelector('#maledicta-oni')) return;

  const saved = readSavedState();
  const root = document.createElement('div');
  root.id = 'maledicta-oni';
  root.className = 'maledicta-oni';
  root.dataset.spirit = spirits.includes(saved.spirit) ? saved.spirit : 'red';
  root.innerHTML = `
    <div class="oni-speech" hidden role="status" aria-live="polite"></div>
    <button class="oni-companion" type="button" aria-label="Hablar con el Oni de Maledicta" aria-expanded="false" aria-controls="oni-paypal-link">
      <span class="oni-mood-mark" aria-hidden="true"></span>
      <img src="./assets/maledicta/mascota/oni.svg" alt="" width="128" height="144" draggable="false" />
    </button>
    <a id="oni-paypal-link" class="oni-paypal-link" href="${PAYPAL_URL}" target="_blank" rel="noopener noreferrer" aria-label="Colaborar con Maledicta mediante PayPal">
      <span aria-hidden="true">♡</span> Apoyar <span aria-hidden="true">↗</span>
    </a>
  `;
  document.body.append(root);

  const companion = root.querySelector('.oni-companion');
  const speech = root.querySelector('.oni-speech');
  let spirit = root.dataset.spirit;
  let speechTimer;
  let pendingDialogueTimer;
  let impactTimer;
  let autonomousTimer;
  let impactUntil = 0;
  let dragStart = null;
  let moved = false;
  let discordEncounterThisDrag = false;
  let overlappingDiscord = false;
  let overlappingWarrior = false;
  let lastWarriorDialogueAt = 0;
  let lastPhrase = '';
  let lastInteractionAt = Date.now();

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
    if (shouldSave) save();
  };
  const save = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        left: Number.parseFloat(root.style.left) || null,
        top: Number.parseFloat(root.style.top) || null,
        spirit
      }));
    } catch (error) {
      console.warn('No se pudo guardar el estado del Oni:', error);
    }
  };
  const positionSpeech = () => {
    if (speech.hidden) return;
    const margin = 10;
    const gap = 12;
    const mascot = companion.getBoundingClientRect();
    const bubble = speech.getBoundingClientRect();
    const width = document.documentElement.clientWidth;
    const height = window.innerHeight;
    const centerX = mascot.left + mascot.width / 2;
    const centerY = mascot.top + mascot.height / 2;
    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
    const centeredLeft = clamp(centerX - bubble.width / 2, margin, width - bubble.width - margin);
    const candidates = [
      { anchor: 'top', left: centeredLeft, top: mascot.top - bubble.height - gap },
      { anchor: 'bottom', left: centeredLeft, top: mascot.bottom + gap },
      { anchor: 'left', left: mascot.left - bubble.width - gap, top: mascot.top + mascot.height / 2 - bubble.height / 2 },
      { anchor: 'right', left: mascot.right + gap, top: mascot.top + mascot.height / 2 - bubble.height / 2 }
    ];
    const overlaps = (a, b) => a.left < b.right && a.left + bubble.width > b.left
      && a.top < b.bottom && a.top + bubble.height > b.top;
    const fits = (candidate) => {
      if (candidate.left < margin || candidate.top < margin
        || candidate.left + bubble.width > width - margin
        || candidate.top + bubble.height > height - margin
        || overlaps(candidate, mascot)) return false;
      const otherSpeech = document.querySelector('.mascot-speech');
      if (!otherSpeech || otherSpeech.hidden) return true;
      return !overlaps(candidate, otherSpeech.getBoundingClientRect());
    };
    const placement = candidates.find(fits)
      || { anchor: 'top', left: centeredLeft, top: clamp(mascot.top - bubble.height - gap, margin, height - bubble.height - margin) };
    speech.style.left = `${placement.left}px`;
    speech.style.top = `${placement.top}px`;
    speech.dataset.anchor = placement.anchor;
    const tailOffset = placement.anchor === 'top' || placement.anchor === 'bottom'
      ? clamp(centerX - placement.left, 14, bubble.width - 14)
      : clamp(centerY - placement.top, 14, bubble.height - 14);
    speech.style.setProperty('--oni-tail-offset', `${tailOffset}px`);
  };
  const say = (entry) => {
    window.clearTimeout(pendingDialogueTimer);
    const delay = Math.max(0, impactUntil - Date.now());
    if (delay) {
      pendingDialogueTimer = window.setTimeout(() => say(entry), delay);
      return;
    }
    window.clearTimeout(speechTimer);
    speech.textContent = entry.text;
    speech.dataset.mood = entry.expression;
    speech.hidden = false;
    root.dataset.mood = entry.expression;
    positionSpeech();
    const duration = Math.min(8000, Math.max(4200, entry.text.length * 38));
    speechTimer = window.setTimeout(() => {
      speech.hidden = true;
      delete root.dataset.mood;
    }, duration);
  };
  const randomEntry = (entries) => {
    const choices = entries.filter(({ text }) => text !== lastPhrase);
    const entry = choices[Math.floor(Math.random() * choices.length)] || entries[0];
    if (entry) lastPhrase = entry.text;
    return entry;
  };
  const speakRandom = (entries, restartTimer = true) => {
    const entry = randomEntry(entries);
    if (!entry) return;
    say(entry);
    if (restartTimer) {
      lastInteractionAt = Date.now();
      startAutonomousTimer();
    }
  };
  const startAutonomousTimer = () => {
    window.clearInterval(autonomousTimer);
    if (document.hidden) return;
    autonomousTimer = window.setInterval(() => {
      if (document.hidden) {
        window.clearInterval(autonomousTimer);
        autonomousTimer = null;
        return;
      }
      if (Date.now() - lastInteractionAt < 15000) return;
      speakRandom(dialogueBanks[spirit], false);
    }, 15000);
  };
  const setSpirit = (nextSpirit) => {
    spirit = nextSpirit;
    root.dataset.spirit = spirit;
    save();
    root.classList.add('is-spirit-impact');
    impactUntil = Date.now() + 850;
    window.clearTimeout(impactTimer);
    impactTimer = window.setTimeout(() => root.classList.remove('is-spirit-impact'), 850);
    speakRandom([colorShiftLines[spirit]]);
  };
  const checkDiscordCollision = () => {
    const logo = document.querySelector('.discord-badge-logo');
    const logoBox = logo?.getBoundingClientRect();
    const oniBox = companion.getBoundingClientRect();
    const overlaps = Boolean(logoBox && logo.getClientRects().length
      && oniBox.left < logoBox.right && oniBox.right > logoBox.left
      && oniBox.top < logoBox.bottom && oniBox.bottom > logoBox.top);
    if (!overlaps) {
      overlappingDiscord = false;
      return false;
    }
    if (overlappingDiscord || discordEncounterThisDrag) return true;
    overlappingDiscord = true;
    if (dragStart) {
      discordEncounterThisDrag = true;
      root.classList.add('is-spirit-impact');
    }
    const travelX = dragStart
      ? root.offsetLeft - dragStart.left
      : oniBox.left + oniBox.width / 2 - (logoBox.left + logoBox.width / 2);
    const travelY = dragStart
      ? root.offsetTop - dragStart.top
      : oniBox.top + oniBox.height / 2 - (logoBox.top + logoBox.height / 2);
    const travelDistance = Math.hypot(travelX, travelY);
    const escapeX = travelDistance ? travelX / travelDistance : 0;
    const escapeY = travelDistance ? travelY / travelDistance : 1;
    setPosition(
      root.offsetLeft - escapeX * 58,
      root.offsetTop - escapeY * 58,
      false
    );
    if (dragStart) {
      const nextSpirit = spirits[(spirits.indexOf(spirit) + 1) % spirits.length];
      setSpirit(nextSpirit);
      const badge = logo.closest('.discord-badge');
      if (badge) {
        badge.classList.add('is-friendly-rivalry');
        window.setTimeout(() => badge.classList.remove('is-friendly-rivalry'), 1100);
      }
    }
    return true;
  };
  const notifyWarriorContact = () => {
    const warrior = document.querySelector('#maledicta-mascot');
    const collided = resolveCharacterCollision(root, warrior);
    if (!collided) {
      overlappingWarrior = false;
      return;
    }
    if (overlappingWarrior) return;
    overlappingWarrior = true;
    root.classList.add('is-character-bump');
    window.setTimeout(() => root.classList.remove('is-character-bump'), 700);
    document.dispatchEvent(new CustomEvent('maledicta:character-contact', { detail: { source: 'oni' } }));
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
      notifyWarriorContact();
      if (checkDiscordCollision()) return;
      if (root.offsetLeft === currentLeft && root.offsetTop === currentTop) return;
    }
  };

  if (Number.isFinite(saved.left) && Number.isFinite(saved.top)) setPosition(saved.left, saved.top, false);

  root.addEventListener('pointerdown', (event) => {
    if (!event.target.closest('.oni-companion')) return;
    dragStart = {
      x: event.clientX,
      y: event.clientY,
      left: root.offsetLeft,
      top: root.offsetTop,
      pointerId: event.pointerId,
      pointerType: event.pointerType
    };
    moved = false;
    discordEncounterThisDrag = false;
    if (event.pointerType !== 'mouse') companion.setPointerCapture(event.pointerId);
  });
  const moveDrag = (event) => {
    if (!dragStart) return;
    if (event.pointerId !== undefined
      && (dragStart.pointerType === 'mouse' || event.pointerId !== dragStart.pointerId)) return;
    if (event.pointerId === undefined && (dragStart.pointerType !== 'mouse' || event.buttons !== 1)) return;
    const dx = event.clientX - dragStart.x;
    const dy = event.clientY - dragStart.y;
    if (Math.abs(dx) + Math.abs(dy) > 8) moved = true;
    if (!moved) return;
    event.preventDefault();
    root.classList.add('is-dragging');
    if (root.dataset.dragAnnounced !== 'true') {
      root.dataset.dragAnnounced = 'true';
      speakRandom(movementLines[spirit]);
    }
    moveToward(dragStart.left + dx, dragStart.top + dy);
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
      root.classList.add('is-recovering');
      window.setTimeout(() => root.classList.remove('is-recovering'), 650);
      companion.dataset.dragged = 'true';
      save();
      window.setTimeout(() => { delete companion.dataset.dragged; }, 0);
      if (!discordEncounterThisDrag) speakRandom(releaseLines[spirit]);
    }
    delete root.dataset.dragAnnounced;
    dragStart = null;
  };
  window.addEventListener('pointerup', finishDrag);
  window.addEventListener('pointercancel', finishDrag);
  window.addEventListener('mouseup', finishDrag);
  companion.addEventListener('click', () => {
    if (companion.dataset.dragged === 'true') return;
    const supportOpen = root.classList.toggle('is-support-open');
    companion.setAttribute('aria-expanded', String(supportOpen));
    speakRandom(dialogueBanks[spirit]);
  });

  document.addEventListener('maledicta:character-contact', () => {
    const now = Date.now();
    if (now - lastWarriorDialogueAt < 10000) return;
    lastWarriorDialogueAt = now;
    root.classList.add('is-character-bump');
    window.setTimeout(() => root.classList.remove('is-character-bump'), 700);
    speakRandom(contactLines);
  });
  window.addEventListener('resize', () => {
    setPosition(root.offsetLeft, root.offsetTop);
    notifyWarriorContact();
    checkDiscordCollision();
    positionSpeech();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      window.clearInterval(autonomousTimer);
      autonomousTimer = null;
      return;
    }
    lastInteractionAt = Date.now();
    startAutonomousTimer();
  });
  if (!Number.isFinite(saved.left) || !Number.isFinite(saved.top)) {
    setPosition(14, window.innerHeight - root.offsetHeight - 10, false);
  }
  checkDiscordCollision();
  startAutonomousTimer();
  save();
};
