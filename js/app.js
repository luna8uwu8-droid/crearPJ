import {
  CREATION_STEPS,
  HUB_SECTIONS,
  ETHNICITIES,
  CHARACTER_CATALOG,
  RACE_GROUPS,
  raceSlug,
  SEX_OPTIONS,
  ACCEPTANCE_ITEMS,
  IMAGE_LIMITS,
  BOSS_GALLERY_LIMITS,
  defaultCharacter,
  defaultAcceptances
} from './config.js';
import {
  WELCOME,
  LORE_SECTIONS,
  NORMATIVE_CATEGORIES,
  FANDOM,
  NEWS,
  DISCORD_INVITE_URL,
  GUIDES,
  FAQ,
  OTHER_GAMES,
  OTHER_GAMES_INTRO,
  STAFF_DELIVERY,
  CONTENT_PENDING
} from './content.js';
import {
  loadState,
  saveState,
  clearState,
  hydrateImage,
  loadBossGalleryImages,
  saveBossGalleryImage,
  deleteBossGalleryImage
} from './storage.js';
import { downloadCharacterSheet, generateValidationCode, printCharacterSheet } from './sheet.js';

const appRoot = document.querySelector('#app');
const printRoot = document.querySelector('#print-sheet');

const baseState = {
  version: 2,
  phase: 'welcome',
  creationStep: 0,
  hubSection: 'inicio',
  characterComplete: false,
  editingCharacter: false,
  sheetDelivered: false,
  acceptances: defaultAcceptances(),
  banner: '',
  bannerTone: 'danger',
  character: defaultCharacter()
};

let state = { ...structuredClone(baseState) };
let historyReaderIndex = null;
let bossGalleryViewer = null;
const bossGalleryImages = new Map();

const escapeHtml = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

const formatDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'fecha no disponible';
  return new Intl.DateTimeFormat('es-ES', { dateStyle: 'long', timeStyle: 'short' }).format(date);
};

const persist = () => saveState(state);

const setBanner = (message = '', tone = 'danger') => {
  state.banner = message;
  state.bannerTone = tone;
};

const currentStepId = () => CREATION_STEPS[state.creationStep]?.id || 'datos';

const isImageValid = () => {
  const image = state.character.image;
  return Boolean(
    image?.dataUrl
    && image.name
    && image.size <= IMAGE_LIMITS.maxBytes
    && image.width >= IMAGE_LIMITS.minSize
    && image.height >= IMAGE_LIMITS.minSize
    && state.character.imageStatus === 'valid'
  );
};

const getCreationProgress = () => {
  const checks = [
    Boolean(state.character.name.trim()),
    Boolean(state.character.age && Number(state.character.age) > 0),
    Boolean(state.character.sex),
    Boolean(state.character.height.trim()),
    Boolean(state.character.distinctiveFeatures.trim()),
    Boolean(state.character.physicalDescription.trim()),
    Boolean(state.character.ethnicity),
    isImageValid(),
    state.acceptances.lore,
    state.acceptances.rules,
    state.acceptances.conditions
  ];
  const complete = checks.filter(Boolean).length;
  return Math.round((complete / checks.length) * 100);
};

const getStepErrors = (stepId = currentStepId()) => {
  const c = state.character;
  const errors = [];

  if (stepId === 'datos') {
    if (!c.name.trim()) errors.push('Este personaje todavía necesita un nombre.');
    if (!c.age || Number(c.age) <= 0) errors.push('La edad del personaje debe estar definida.');
    if (!c.sex) errors.push('Elige el sexo o género del personaje.');
  }

  if (stepId === 'apariencia') {
    if (!c.height.trim()) errors.push('Indica la altura del personaje.');
    if (!c.distinctiveFeatures.trim()) errors.push('Describe al menos un rasgo distintivo.');
    if (!c.physicalDescription.trim()) errors.push('La descripción física no puede quedar vacía.');
  }

  if (stepId === 'etnia') {
    if (!c.ethnicity) errors.push('Selecciona una raza para continuar.');
    const option = ETHNICITIES.find((item) => item.value === c.ethnicity);
    if (option?.needsDetail && !c.ethnicityDetail.trim()) {
      errors.push('Indica cuál es la etnia permitida por el Staff.');
    }
  }

  if (stepId === 'imagen') {
    if (c.imageStatus === 'analyzing') errors.push('Espera a que termine la verificación de la imagen.');
    else if (!isImageValid()) errors.push(c.imageError || 'Debes cargar una imagen válida del personaje.');
  }

  if (stepId === 'confirmacion' || stepId === 'revision') {
    ACCEPTANCE_ITEMS.forEach((item) => {
      if (!state.acceptances[item.key]) errors.push(`Falta aceptar: ${item.label}`);
    });
  }

  if (stepId === 'revision' && !isImageValid()) {
    errors.push('Falta una imagen válida para generar la ficha.');
  }

  return errors;
};

const allRequiredComplete = () => {
  return ['datos', 'apariencia', 'etnia', 'imagen', 'confirmacion'].every((id) => getStepErrors(id).length === 0);
};

const brandMark = () => `
  <div class="brand-mark">
    <img src="./assets/maledicta-logo.webp" alt="" hidden onload="this.hidden = false; this.nextElementSibling.hidden = true;" onerror="this.hidden = true; this.nextElementSibling.hidden = false;" />
    <span>M</span>
  </div>
`;

const bannerHtml = () => {
  if (!state.banner) return '';
  return `<div class="status-banner ${state.bannerTone === 'ok' ? 'status-ok' : ''}" role="status">${escapeHtml(state.banner)}</div>`;
};

const syncHash = () => {
  let hash = '#bienvenida';
  if (state.phase === 'creating') hash = `#crear/${currentStepId()}`;
  if (state.phase === 'entrega') hash = '#entrega';
  if (state.phase === 'hub') hash = `#${state.hubSection}`;
  if (location.hash !== hash) {
    history.replaceState(null, '', hash);
  }
};

const applyHash = () => {
  const raw = (location.hash || '#bienvenida').replace('#', '');
  const [section, sub] = raw.split('/');

  if (section === 'bienvenida' || section === 'inicio' && state.phase === 'welcome') {
    if (!state.characterComplete) state.phase = 'welcome';
    else {
      state.phase = 'hub';
      state.hubSection = 'inicio';
    }
    return;
  }

  if (section === 'crear') {
    state.phase = 'creating';
    const index = CREATION_STEPS.findIndex((step) => step.id === sub);
    state.creationStep = index >= 0 ? index : 0;
    return;
  }

  if (section === 'entrega') {
    state.phase = state.characterComplete ? 'entrega' : 'creating';
    return;
  }

  const hubIds = HUB_SECTIONS.map((item) => item.id);
  // 'fandom' ya no existe: los enlaces viejos llevan a Inicio.
  if (hubIds.includes(section) || section === 'fandom') {
    state.phase = 'hub';
    state.hubSection = section === 'fandom' ? 'inicio' : section;
    if (section === 'razas' && sub && findRaceEntry(sub)) state.hubSection = `razas/${sub}`;
  }
};

const goToPhase = (phase, extra = {}) => {
  state.phase = phase;
  Object.assign(state, extra);
  setBanner('');
  persist();
  render();
};

const goToStep = (index) => {
  state.phase = 'creating';
  state.creationStep = Math.max(0, Math.min(index, CREATION_STEPS.length - 1));
  setBanner('');
  persist();
  render();
};

const handleContinue = () => {
  const errors = getStepErrors();
  if (errors.length) {
    setBanner(errors[0]);
    render();
    return;
  }
  if (state.creationStep < CREATION_STEPS.length - 1) {
    goToStep(state.creationStep + 1);
    return;
  }
  handleGenerateSheet();
};

const handleGenerateSheet = async () => {
  const errors = getStepErrors('revision');
  if (errors.length) {
    setBanner(errors[0]);
    render();
    return;
  }
  if (!state.character.validationCode) {
    state.character.validationCode = generateValidationCode();
  }
  const now = new Date().toISOString();
  if (state.characterComplete && state.editingCharacter) {
    state.character.lastEditedAt = now;
  } else if (!state.character.sheetGeneratedAt) {
    state.character.sheetGeneratedAt = now;
  }
  state.characterComplete = true;
  state.editingCharacter = false;
  persist();
  await downloadCharacterSheet(state.character, state.character.validationCode);
  state.phase = 'entrega';
  setBanner('Ficha generada. Descárgala e infórmala al Staff por Discord.', 'ok');
  persist();
  render();
};

const renderWelcome = () => `
  <section class="welcome-screen">
    ${bannerHtml()}
    <div class="welcome-orb" aria-hidden="true"></div>
    <header class="welcome-brand">
      ${brandMark()}
      <h1>${escapeHtml(WELCOME.title)}</h1>
    </header>
    <p class="welcome-intro">${escapeHtml(WELCOME.intro)}</p>
    <div class="welcome-process">
      <h2>El ingreso</h2>
      <p>${escapeHtml(WELCOME.processSummary)}</p>
      <ol class="journey-list">
        <li>Datos y apariencia</li>
        <li>Etnia e imagen</li>
        <li>Lore y normativas</li>
        <li>Ficha y ticket en Discord</li>
      </ol>
    </div>
    <p class="welcome-note">${escapeHtml(WELCOME.discordNote)}</p>
    <div class="welcome-actions">
      <button class="action-btn" type="button" data-route="crear">${state.creationStep > 0 || state.character.name ? 'Continuar registro' : 'Crear personaje'}</button>
      <button class="ghost-btn" type="button" data-route="hub/inicio">Centro de información</button>
    </div>
  </section>
`;

const renderChoiceCards = (name, options, selected, gridClass = '') => `
  <div class="choice-grid ${gridClass}">
    ${options.map((option) => `
      <button
        type="button"
        class="choice-card ${selected === option.value ? 'selected' : ''}"
        data-field="${name}"
        data-value="${escapeHtml(option.value)}"
      >
        <strong>${escapeHtml(option.value)}</strong>
        <span>${escapeHtml(option.description || '')}</span>
      </button>
    `).join('')}
  </div>
`;

const renderDatos = () => `
  <div class="section-intro">
    <p class="eyebrow">01 — DATOS BÁSICOS</p>
    <h2>Nombra a quien va a cruzar</h2>
    <p class="section-subtitle">Empieza por lo esencial. El resto del registro se apoyará en esta identidad.</p>
  </div>
  <div class="field-grid">
    <label class="field-card">
      <span class="field-label">Nombre del personaje <span class="field-hint">Requerido</span></span>
      <input class="input-shell" name="name" type="text" maxlength="40" value="${escapeHtml(state.character.name)}" placeholder="Ej. Aelren Vey" />
    </label>
    <label class="field-card">
      <span class="field-label">Edad <span class="field-hint">Requerido</span></span>
      <input class="input-shell" name="age" type="number" min="1" max="99999" value="${escapeHtml(state.character.age)}" placeholder="35" />
    </label>
    <label class="field-card field-span">
      <span class="field-label">Lugar de origen <span class="field-hint">Opcional</span></span>
      <input class="input-shell" name="origin" type="text" maxlength="80" value="${escapeHtml(state.character.origin)}" placeholder="Ciudad, región o linaje de origen" />
    </label>
  </div>
  <div class="block-gap">
    <span class="field-label">Sexo / Género <span class="field-hint">Requerido</span></span>
    ${renderChoiceCards('sex', SEX_OPTIONS, state.character.sex)}
  </div>
`;

const renderApariencia = () => {
  const desc = state.character.physicalDescription || '';
  const personality = state.character.personalityTrait || '';
  return `
    <div class="section-intro">
      <p class="eyebrow">02 — APARIENCIA FÍSICA</p>
      <h2>Da forma al cuerpo que habitará el mundo</h2>
      <p class="section-subtitle">No es una planilla: es el retrato que el resto del servidor aprenderá a reconocer.</p>
    </div>
    <div class="field-grid">
      <label class="field-card">
        <span class="field-label">Altura <span class="field-hint">Requerido</span></span>
        <input class="input-shell" name="height" type="text" maxlength="20" value="${escapeHtml(state.character.height)}" placeholder="Ej. 1,78 m" />
      </label>
      <label class="field-card">
        <span class="field-label">Rasgos distintivos <span class="field-hint">Requerido</span></span>
        <input class="input-shell" name="distinctiveFeatures" type="text" maxlength="180" value="${escapeHtml(state.character.distinctiveFeatures)}" placeholder="Ej. cicatriz en la ceja, tatuaje en el cuello, cojera o mirada intensa" />
      </label>
    </div>
    <div class="codex-panel">
      <div class="codex-header">
        <span class="field-label">Descripción física</span>
        <span class="char-counter">${desc.length}/1500</span>
      </div>
      <textarea class="textarea-shell" name="physicalDescription" maxlength="1500" placeholder="Describe su presencia, gesto, vestimenta habitual y lo que se percibe al verlo por primera vez.">${escapeHtml(desc)}</textarea>
    </div>
    <div class="codex-panel block-gap">
      <div class="codex-header">
        <span class="field-label">Rasgo de personalidad <span class="field-hint">Opcional</span></span>
        <span class="char-counter">${personality.length}/1500</span>
      </div>
      <p class="codex-help">Describe la personalidad de tu personaje, sus principales características, virtudes, defectos y manera de actuar.</p>
      <textarea class="textarea-shell" name="personalityTrait" maxlength="1500" placeholder="Temperamento, comportamiento, virtudes, defectos y forma de relacionarse con los demás.">${escapeHtml(personality)}</textarea>
    </div>
  `;
};

const renderEtnia = () => {
  const selected = ETHNICITIES.find((item) => item.value === state.character.ethnicity);
  return `
    <div class="section-intro">
      <p class="eyebrow">03 — RAZA</p>
      <h2>Elige la raza del personaje</h2>
      <p class="section-subtitle">Cada raza define la naturaleza, la herencia y el lugar del personaje en el mundo.</p>
    </div>
    <section class="race-step-block">
      <h3 class="race-step-title">Todos comienzan como humanos</h3>
      <p class="race-step-text">Cada aventurero dará sus primeros pasos como humano, y luego podrá elegir firmar un pacto con una de las 5 razas disponibles, para acceder a sus habilidades, conocimientos y una nueva forma de vida.</p>
      ${renderChoiceCards('ethnicity', ETHNICITIES.filter((item) => item.value === 'Humanos'), state.character.ethnicity, 'race-grid')}
    </section>
    <section class="race-step-block">
      <h3 class="race-step-title">Sub razas</h3>
      <p class="race-step-text">Pero si no quieres comenzar como humano, puedes elegir una de las 4 subrazas.</p>
      ${renderChoiceCards('ethnicity', ETHNICITIES.filter((item) => item.value !== 'Humanos'), state.character.ethnicity, 'race-grid')}
    </section>
    ${selected?.needsDetail ? `
      <label class="field-card block-gap">
        <span class="field-label">Especifica la etnia permitida <span class="field-hint">Requerido</span></span>
        <input class="input-shell" name="ethnicityDetail" type="text" maxlength="80" value="${escapeHtml(state.character.ethnicityDetail)}" placeholder="Nombre de la etnia autorizada por el Staff" />
      </label>
    ` : ''}
  `;
};

const imageStatusCopy = () => {
  const status = state.character.imageStatus;
  if (status === 'analyzing') return { label: 'Analizando...', className: 'image-status-warning' };
  if (status === 'valid') return { label: 'Imagen válida', className: 'image-status-approved' };
  if (status === 'rejected') return { label: 'Imagen rechazada · se requiere otra imagen', className: 'image-status-rejected' };
  return { label: 'Sin imagen', className: 'image-status-missing' };
};

const renderImagen = () => {
  const image = state.character.image;
  const status = imageStatusCopy();
  const preview = image?.dataUrl
    ? `<div class="image-preview-wrap"><img class="image-preview" src="${image.dataUrl}" alt="Vista previa de ${escapeHtml(image.name || 'la imagen del personaje')}" /><div class="image-details"><strong>${escapeHtml(image.name || '')}</strong><span>${Math.round((image.size || 0) / 1024)} KB · ${image.width} × ${image.height}px</span></div><div class="button-row"><button class="secondary-btn" type="button" data-action="replace-image">Reemplazar imagen</button><button class="ghost-btn" type="button" data-action="remove-image">Eliminar imagen</button></div></div>`
    : `<div class="upload-placeholder"><strong>Suelta aquí el retrato de tu personaje</strong><span>PNG o JPG · máximo 10 MB · mínimo 512 × 512 px</span></div>`;

  return `
    <div class="section-intro">
      <p class="eyebrow">04 — IMAGEN DEL PERSONAJE</p>
      <h2>Da rostro a su leyenda</h2>
      <p class="section-subtitle">La imagen se verifica automáticamente por formato, peso y resolución. Puedes seguir explorando la web mientras se analiza.</p>
    </div>
    <div class="image-upload-panel">
      <input id="character-image-input" class="visually-hidden" type="file" accept="image/png,image/jpeg" />
      <label class="drop-zone ${state.character.imageStatus === 'analyzing' ? 'is-busy' : ''}" for="character-image-input" data-drop-zone>
        ${preview}
        ${image?.dataUrl ? '' : '<span class="upload-icon" aria-hidden="true">↑</span><span class="upload-action">Seleccionar archivo</span>'}
      </label>
      <div class="image-status ${status.className}"><span class="status-dot"></span><strong>${status.label}</strong></div>
      ${state.character.imageError ? `<div class="image-error" role="alert">${escapeHtml(state.character.imageError)}</div>` : ''}
      <p class="image-note">La verificación automática comprueba que el archivo sea una imagen real PNG o JPEG, no exceda 10 MB y alcance al menos 512 × 512 píxeles.</p>
    </div>
  `;
};

const renderLore = () => `
  <div class="section-intro">
    <p class="eyebrow">05 — LORE</p>
    <h2>Sumérgete en Maledicta</h2>
    <p class="section-subtitle">Lee lo que el servidor ya tiene publicado. Lo que aún no está escrito por el Staff aparece marcado con claridad.</p>
  </div>
  <div class="chapter-stack">
    ${LORE_SECTIONS.map((section) => `
      <details class="lore-chapter">
        <summary>
          <span class="chapter-kicker">${escapeHtml(section.summary)}</span>
          <strong>${escapeHtml(section.title)}</strong>
        </summary>
        <p>${escapeHtml(section.body)}</p>
        ${section.related ? `<div class="entry-grid compact">${section.related.map((item) => `<article class="entry-card"><h3>${escapeHtml(item.value)}</h3><p>${escapeHtml(item.description)}</p></article>`).join('')}</div>` : ''}
      </details>
    `).join('')}
  </div>
`;

// Convierte el formato de texto de NORMATIVE_CATEGORIES (ver content.js) en HTML.
const renderRuleText = (text = '') => text
  .trim()
  .split(/\n\s*\n/)
  .map((block) => {
    const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
    if (lines.every((line) => line.startsWith('• '))) {
      return `<ul class="rule-list">${lines.map((line) => `<li>${escapeHtml(line.slice(2))}</li>`).join('')}</ul>`;
    }
    const content = lines.join('\n');
    if (content.startsWith('### ')) return `<h5 class="rule-minor">${escapeHtml(content.slice(4))}</h5>`;
    if (content.startsWith('## ')) return `<h4 class="rule-subtitle">${escapeHtml(content.slice(3))}</h4>`;
    if (content.startsWith('> ')) return `<p class="rule-note">${escapeHtml(content.slice(2))}</p>`;
    if (content.startsWith('/')) return `<p class="rule-command"><code>${escapeHtml(content)}</code></p>`;
    return `<p>${escapeHtml(content)}</p>`;
  })
  .join('');

const renderNormativas = () => `
  <div class="section-intro">
    <p class="eyebrow">06 — NORMATIVAS</p>
    <h2>Las leyes que sostienen el servidor</h2>
    <p class="section-subtitle">Consulta el reglamento por categoría. Despliega cada una para leer sus normas.</p>
  </div>
  <div class="chapter-stack">
    ${NORMATIVE_CATEGORIES.map((category) => `
      <details class="lore-chapter rule-chapter">
        <summary><strong>${escapeHtml(category.title)}</strong></summary>
        ${category.intro ? `<div class="rule-intro">${renderRuleText(category.intro)}</div>` : ''}
        ${category.items.map((item) => `
          <div class="rule-block">
            ${item.title ? `<h3>${escapeHtml(item.title)}</h3>` : ''}
            ${renderRuleText(item.body)}
          </div>
        `).join('')}
      </details>
    `).join('')}
  </div>
`;

const renderConfirmacion = () => {
  const missing = ACCEPTANCE_ITEMS.filter((item) => !state.acceptances[item.key]);
  return `
    <div class="section-intro">
      <p class="eyebrow">07 — CONFIRMACIÓN</p>
      <h2>Acepta las condiciones del cruce</h2>
      <p class="section-subtitle">Sin estas confirmaciones no se genera la ficha. Marca solo lo que hayas leído de verdad.</p>
    </div>
    <div class="accept-panel">
      ${ACCEPTANCE_ITEMS.map((item) => `
        <label class="accept-row">
          <input type="checkbox" data-accept="${item.key}" ${state.acceptances[item.key] ? 'checked' : ''} />
          <span>${escapeHtml(item.label)}</span>
        </label>
      `).join('')}
    </div>
    ${missing.length ? `<div class="incomplete-list"><strong>Aún falta:</strong><ul>${missing.map((item) => `<li>${escapeHtml(item.label)}</li>`).join('')}</ul></div>` : '<p class="ready-note">Condiciones aceptadas. Ya puedes revisar y generar la ficha.</p>'}
  `;
};

const characterSummary = () => {
  const c = state.character;
  const ethnicity = c.ethnicity;
  const editedNotice = c.lastEditedAt
    ? `<div class="edited-notice" role="status">Ficha editada el ${escapeHtml(formatDate(c.lastEditedAt))}</div>`
    : '';
  return `
    <div class="review-layout">
      <div class="review-panel">
        <h3 class="summary-hero">${escapeHtml(c.name || 'Sin nombre')}</h3>
        ${editedNotice}
        <div class="summary-grid">
          <div class="summary-item"><span class="summary-label">Edad</span><span class="summary-value">${escapeHtml(c.age || 'No definida')}</span></div>
          <div class="summary-item"><span class="summary-label">Sexo / Género</span><span class="summary-value">${escapeHtml(c.sex || 'No definido')}</span></div>
          <div class="summary-item"><span class="summary-label">Origen</span><span class="summary-value">${escapeHtml(c.origin || 'No especificado')}</span></div>
          <div class="summary-item"><span class="summary-label">Raza</span><span class="summary-value">${escapeHtml(ethnicity || 'No definida')}</span></div>
          <div class="summary-item"><span class="summary-label">Altura</span><span class="summary-value">${escapeHtml(c.height || 'No definida')}</span></div>
        </div>
        <div class="history-block">
          <h4>Apariencia</h4>
          <p class="history-text">${escapeHtml(c.distinctiveFeatures || '')}</p>
          <div class="history-text">${escapeHtml(c.physicalDescription || 'Todavía no hay descripción física.')}</div>
        </div>
        <div class="history-block">
          <h4>Rasgo de personalidad</h4>
          <div class="history-text">${escapeHtml(c.personalityTrait || 'Todavía no hay rasgo de personalidad.')}</div>
        </div>
        ${c.validationCode ? `<p class="code-chip">Código: ${escapeHtml(c.validationCode)}</p>` : ''}
      </div>
      <div class="review-image-panel">
        <h4>Imagen del personaje</h4>
        ${c.image?.dataUrl ? `<img class="review-image" src="${c.image.dataUrl}" alt="Vista previa del personaje" />` : '<div class="review-image missing">No se ha cargado una imagen.</div>'}
      </div>
    </div>
  `;
};

const renderRevision = () => `
  <div class="section-intro">
    <p class="eyebrow">08 — FICHA</p>
    <h2>Revisa la forma final del personaje</h2>
    <p class="section-subtitle">Comprueba cada dato antes de sellar el registro. Podrás editar sin perder lo escrito.</p>
  </div>
  ${characterSummary()}
`;

const renderStepBody = () => {
  const id = currentStepId();
  if (id === 'datos') return renderDatos();
  if (id === 'apariencia') return renderApariencia();
  if (id === 'etnia') return renderEtnia();
  if (id === 'imagen') return renderImagen();
  if (id === 'lore') return renderLore();
  if (id === 'normativas') return renderNormativas();
  if (id === 'confirmacion') return renderConfirmacion();
  return renderRevision();
};

const renderWizard = () => {
  const progress = getCreationProgress();
  const isFirst = state.creationStep === 0;
  const isLast = currentStepId() === 'revision';
  const confirmReady = getStepErrors('confirmacion').length === 0 && allRequiredComplete();

  return `
    <div class="wizard-layout app-shell">
      <aside class="sidebar">
        <div class="brand-block">
          ${brandMark()}
          <div class="brand-copy">
            <h1>MALEDICTA</h1>
          </div>
        </div>
        <div class="progress-block">
          <div class="progress-meta">
            <span>Paso ${state.creationStep + 1} de ${CREATION_STEPS.length}</span>
            <strong>${progress}%</strong>
          </div>
          <div class="progress-track"><span class="progress-fill" style="width:${progress}%"></span></div>
          <p class="progress-now">${escapeHtml(CREATION_STEPS[state.creationStep].title)}</p>
        </div>
        <nav class="step-nav" aria-label="Pasos del registro">
          ${CREATION_STEPS.map((step, index) => `
            <button class="step-item ${index === state.creationStep ? 'active' : ''} ${index < state.creationStep ? 'done' : ''}" type="button" data-step-index="${index}">
              <span class="step-index">${index + 1}</span>
              <span class="step-copy">
                <span class="step-label">${escapeHtml(step.label)}</span>
                <span class="step-title">${escapeHtml(step.nav)}</span>
              </span>
              <span class="step-status">${index < state.creationStep ? '✓' : ''}</span>
            </button>
          `).join('')}
        </nav>
        <button class="ghost-btn nav-side-link" type="button" data-route="hub/inicio">Centro de información</button>
      </aside>
      <main class="main-panel">
        ${bannerHtml()}
        <nav class="path-nav" aria-label="Recorrido">Inicio → ${CREATION_STEPS.map((step, index) => `<span class="${index === state.creationStep ? 'is-current' : ''}">${escapeHtml(step.nav)}</span>`).join(' → ')}</nav>
        <section class="step-content">${renderStepBody()}</section>
        <footer class="action-bar">
          <div class="left-group">
            ${isFirst ? '<button class="ghost-btn" type="button" data-route="bienvenida">Volver al umbral</button>' : '<button class="secondary-btn" type="button" data-action="prev">Atrás</button>'}
          </div>
          <div class="right-group">
            ${isLast ? '<button class="secondary-btn" type="button" data-action="edit">Editar personaje</button>' : ''}
            ${isLast
              ? `<button class="action-btn" type="button" data-action="generate" ${confirmReady ? '' : 'disabled'}>Generar ficha</button>`
              : '<button class="action-btn" type="button" data-action="next">Continuar</button>'}
          </div>
        </footer>
      </main>
    </div>
  `;
};

const renderEntrega = () => `
  <section class="delivery-screen">
    ${bannerHtml()}
    <div class="complete-panel">
      <div class="complete-badge">✦</div>
      <h2>${escapeHtml(STAFF_DELIVERY.title)}</h2>
      <p>La web ya no es un formulario: es tu portal. El último sello, sin embargo, lo pone el Staff en Discord.</p>
      <ol class="delivery-steps">
        ${STAFF_DELIVERY.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join('')}
      </ol>
      <p class="welcome-note">${escapeHtml(STAFF_DELIVERY.reminder)}</p>
      <div class="button-row">
        <button class="action-btn" type="button" data-action="download">Descargar ficha</button>
        <button class="secondary-btn" type="button" data-action="print">Imprimir ficha</button>
        <button class="ghost-btn" type="button" data-route="hub/mi-personaje">Ir al centro de información</button>
      </div>
    </div>
  </section>
`;

const pendingCard = (title, description) => `
  <article class="entry-card pending">
    <h3>${escapeHtml(title)}</h3>
    <p>${escapeHtml(description || CONTENT_PENDING)}</p>
  </article>
`;

const renderBossesSection = () => `
  <div class="section-intro">
    <p class="eyebrow">BESTIARIO</p>
    <h2>${escapeHtml(FANDOM.bosses.title)}</h2>
    <p class="section-subtitle">${escapeHtml(FANDOM.bosses.description)}</p>
  </div>
  <div class="boss-card-list">
    ${FANDOM.bosses.entries.map((boss) => {
      const images = bossGalleryImages.get(boss.id) || [];
      return `
        <article class="boss-card" id="boss-${escapeHtml(boss.id)}">
          <header class="boss-card-heading">
            <div><p class="eyebrow">JEFE DE MALEDICTA</p><h3>${escapeHtml(boss.name)}</h3></div>
            <div class="boss-health"><span>VIDA</span><strong>${escapeHtml(boss.health)}</strong></div>
          </header>
          <div class="boss-creature"><span>Criatura</span><strong>${escapeHtml(boss.creature)}</strong></div>
          <div class="boss-details-grid">
            <section class="boss-loot">
              <h4>Botín</h4>
              <ul>${boss.loot.map((drop) => `<li><span class="loot-chance">${escapeHtml(drop.chance)}</span><span>${escapeHtml(drop.item)}</span></li>`).join('')}</ul>
            </section>
            <dl class="boss-facts">
              <div><dt>Spawn</dt><dd>${escapeHtml(boss.spawn)}</dd></div>
              <div><dt>Ubicación</dt><dd>${escapeHtml(boss.location)}</dd></div>
            </dl>
          </div>
          <section class="boss-gallery" aria-label="Galería de ${escapeHtml(boss.name)}">
            <div class="boss-gallery-heading">
              <div><h4>Galería</h4><span>${images.length} ${images.length === 1 ? 'imagen' : 'imágenes'}</span></div>
              <label class="secondary-btn" for="boss-images-${escapeHtml(boss.id)}" role="button" tabindex="0" data-boss-upload-label>＋ Agregar imágenes</label>
              <input class="visually-hidden" id="boss-images-${escapeHtml(boss.id)}" type="file" accept="${BOSS_GALLERY_LIMITS.types.join(',')}" multiple data-boss-file-input="${escapeHtml(boss.id)}" />
            </div>
            ${images.length ? `
              <div class="boss-gallery-grid">
                ${images.map((image, index) => `
                  <div class="boss-gallery-item">
                    <button class="boss-gallery-image" type="button" data-boss-gallery-action="open" data-boss-id="${escapeHtml(boss.id)}" data-image-index="${index}" aria-label="Ampliar imagen ${index + 1} de ${escapeHtml(boss.name)}">
                      <img src="${image.url}" alt="${escapeHtml(image.name)}" />
                    </button>
                    <button class="boss-gallery-delete" type="button" data-boss-gallery-action="delete" data-boss-id="${escapeHtml(boss.id)}" data-image-id="${escapeHtml(image.id)}" aria-label="Eliminar ${escapeHtml(image.name)}" title="Eliminar imagen">×</button>
                    <span class="boss-gallery-filename">${escapeHtml(image.name)}</span>
                  </div>
                `).join('')}
              </div>
            ` : '<div class="boss-gallery-empty"><span aria-hidden="true">✧</span><strong>Aún no hay imágenes</strong><small>Las imágenes de este jefe aparecerán aquí.</small></div>'}
          </section>
        </article>
      `;
    }).join('')}
  </div>
`;

const renderBossGalleryViewer = () => {
  if (!bossGalleryViewer) return '';
  const boss = FANDOM.bosses.entries.find((entry) => entry.id === bossGalleryViewer.bossId);
  const images = bossGalleryImages.get(bossGalleryViewer.bossId) || [];
  const image = images[bossGalleryViewer.index];
  if (!boss || !image) return '';
  return `
    <section class="boss-lightbox" role="dialog" aria-modal="true" aria-label="Galería de ${escapeHtml(boss.name)}" data-boss-gallery-action="close">
      <div class="boss-lightbox-panel" data-lightbox-panel>
        <header><span>${escapeHtml(boss.name)} · ${bossGalleryViewer.index + 1} / ${images.length}</span><button class="reader-control" type="button" data-boss-gallery-action="close" aria-label="Cerrar galería">×</button></header>
        <div class="boss-lightbox-stage">
          <button class="boss-lightbox-nav" type="button" data-boss-gallery-action="previous" aria-label="Imagen anterior">‹</button>
          <img src="${image.url}" alt="${escapeHtml(image.name)}" />
          <button class="boss-lightbox-nav" type="button" data-boss-gallery-action="next" aria-label="Imagen siguiente">›</button>
        </div>
        <p>${escapeHtml(image.name)}</p>
      </div>
    </section>
  `;
};

const renderCatalogSection = (data, extra = []) => `
  <div class="section-intro">
    <p class="eyebrow">ARCHIVO</p>
    <h2>${escapeHtml(data.title)}</h2>
    <p class="section-subtitle">${escapeHtml(data.description)}</p>
  </div>
  <div class="entry-grid">
    ${data.entries.map((entry) => `
      <article class="entry-card">
        <h3>${escapeHtml(entry.value || entry.title)}</h3>
        ${entry.body
          ? entry.body.split(/\n\n+/).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')
          : `<p>${escapeHtml(entry.description || CONTENT_PENDING)}</p>`}
        ${entry.abilities?.length ? `
          <div class="ability-list">
            ${entry.abilities.map(([title, description]) => `
              <div class="ability-item">
                <strong>${escapeHtml(title)}</strong>
                <p>${escapeHtml(description)}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </article>
    `).join('')}
    ${extra.map((entry) => `
      <article class="entry-card">
        <h3>${escapeHtml(entry.value)}</h3>
        <p>${escapeHtml(entry.description)}</p>
      </article>
    `).join('')}
  </div>
`;

const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV'];
const toRoman = (number) => ROMAN_NUMERALS[number - 1] || String(number);

// Razas en el orden del libro, combinando el catálogo (habilidades) con las descripciones del registro.
const RACE_ENTRIES = RACE_GROUPS.flatMap((group) => group.races.map(({ race, label }) => {
  const archetype = CHARACTER_CATALOG.archetypes.find((item) => item.value === race) || { value: race, abilities: [] };
  return {
    ...archetype,
    name: label || race,
    slug: raceSlug(label || race),
    group,
    lore: ETHNICITIES.find((item) => item.value === race)?.description || ''
  };
})).map((entry, index) => ({ ...entry, chapter: index + 1 }));

const findRaceEntry = (slug) => RACE_ENTRIES.find((entry) => entry.slug === slug);

const raceIdentity = (entry) => (entry.description || '').replace(/^Identidad racial:\s*/, '');

const renderRaceIndex = () => {
  const renderGroup = (group) => `
    <section class="codex-group codex-group--${escapeHtml(group.id)}">
      <h3 class="codex-group-title">${escapeHtml(group.title)}</h3>
      <p class="codex-group-note">${escapeHtml(group.description)}</p>
      <ol class="codex-toc">
        ${RACE_ENTRIES.filter((entry) => entry.group === group).map((entry) => `
          <li>
            <button class="codex-toc-link" type="button" data-route="hub/razas/${escapeHtml(entry.slug)}">
              <span class="codex-toc-name">${escapeHtml(entry.name)}</span>
              <span class="codex-toc-leader" aria-hidden="true"></span>
              <span class="codex-toc-chapter">${toRoman(entry.chapter)}</span>
            </button>
          </li>
        `).join('')}
      </ol>
    </section>
  `;
  const [firstGroup, ...otherGroups] = RACE_GROUPS;

  return `
    <div class="section-intro">
      <p class="eyebrow">CÓDICE</p>
      <h2>Razas</h2>
      <p class="section-subtitle">El códice de los pueblos de Maledicta. Elige una raza para abrir su capítulo.</p>
    </div>
    <div class="codex-book">
      <div class="codex-page codex-page--left">
        <header class="codex-page-head">
          <span class="codex-kicker">Códice de Maledicta</span>
          <h3 class="codex-title">Libro de las Razas</h3>
          <span class="codex-ornament" aria-hidden="true">❦</span>
        </header>
        ${renderGroup(firstGroup)}
      </div>
      <div class="codex-page codex-page--right">
        ${otherGroups.map(renderGroup).join('')}
      </div>
    </div>
  `;
};

const renderRacePage = (entry) => {
  const index = RACE_ENTRIES.indexOf(entry);
  const previous = RACE_ENTRIES[index - 1];
  const next = RACE_ENTRIES[index + 1];

  return `
    <nav class="codex-back">
      <button class="secondary-btn" type="button" data-route="hub/razas">← Índice de razas</button>
    </nav>
    <article class="codex-book codex-book--single">
      <div class="codex-page">
        <header class="codex-page-head">
          <span class="codex-kicker">Capítulo ${toRoman(entry.chapter)} · ${escapeHtml(entry.group.title)}</span>
          <h2 class="codex-title codex-title--race">${escapeHtml(entry.name)}</h2>
          ${entry.name !== entry.value ? `<p class="codex-alias">${escapeHtml(entry.value)}</p>` : ''}
          <span class="codex-ornament" aria-hidden="true">❦</span>
        </header>
        ${raceIdentity(entry) ? `
          <p class="codex-identity"><span>Identidad racial</span>${escapeHtml(raceIdentity(entry))}</p>
        ` : ''}
        ${entry.lore ? `<div class="codex-lore"><p>${escapeHtml(entry.lore)}</p></div>` : ''}
        ${entry.abilities?.length ? `
          <h3 class="codex-heading">Dones del linaje</h3>
          <ol class="codex-abilities">
            ${entry.abilities.map(([title, description], abilityIndex) => {
              const [level, name] = title.split(/\s+—\s+/);
              return `
                <li>
                  <span class="codex-level" aria-hidden="true">${toRoman(abilityIndex + 1)}</span>
                  <div>
                    <span class="codex-level-label">${escapeHtml(name ? level : `Nivel ${abilityIndex + 1}`)}</span>
                    <strong>${escapeHtml(name || title)}</strong>
                    <p>${escapeHtml(description)}</p>
                  </div>
                </li>
              `;
            }).join('')}
          </ol>
        ` : ''}
        <footer class="codex-pager">
          ${previous ? `<button class="codex-pager-link" type="button" data-route="hub/razas/${escapeHtml(previous.slug)}"><span>← Capítulo anterior</span><strong>${escapeHtml(previous.name)}</strong></button>` : '<span></span>'}
          ${next ? `<button class="codex-pager-link codex-pager-link--next" type="button" data-route="hub/razas/${escapeHtml(next.slug)}"><span>Capítulo siguiente →</span><strong>${escapeHtml(next.name)}</strong></button>` : '<span></span>'}
        </footer>
      </div>
    </article>
  `;
};

const renderHistoryBody = (body) => body
  .split(/\r?\n\r?\n+/)
  .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
  .join('');

const renderHistoryReader = () => {
  const tomes = FANDOM.historia.entries;
  const tome = tomes[historyReaderIndex];
  return `
    <section class="history-reader" aria-label="Lector de Historia" role="dialog" aria-modal="true">
      <div class="history-reader-topbar">
        <button class="reader-control" type="button" data-history-action="close" aria-label="Cerrar lector">× <span>Cerrar</span></button>
        <span class="reader-location">Historia · Tomo ${historyReaderIndex + 1} de ${tomes.length}</span>
        <button class="reader-control" type="button" data-history-action="close">Volver al índice</button>
      </div>
      <article class="history-book">
        <header class="history-book-cover">
          <span class="history-book-kicker">CRÓNICAS DE MALEDICTA</span>
          <h2>${escapeHtml(tome.title)}</h2>
          <span class="history-book-rule"></span>
          <p>Historia canon</p>
        </header>
        <div class="history-book-content">
          ${renderHistoryBody(tome.body)}
        </div>
        <footer class="history-reader-footer">
          <button class="secondary-btn" type="button" data-history-action="previous" ${historyReaderIndex === 0 ? 'disabled' : ''}>← Tomo anterior</button>
          <span>Página de lectura</span>
          <button class="secondary-btn" type="button" data-history-action="next" ${historyReaderIndex === tomes.length - 1 ? 'disabled' : ''}>Tomo siguiente →</button>
        </footer>
      </article>
    </section>
  `;
};

const renderHistorySection = () => {
  const tomes = FANDOM.historia.entries;

  return `
    <div class="section-intro">
      <p class="eyebrow">ARCHIVO HISTÓRICO</p>
      <h2>${escapeHtml(FANDOM.historia.title)}</h2>
      <p class="section-subtitle">${escapeHtml(FANDOM.historia.description)} Elige un tomo para abrirlo como un libro.</p>
    </div>
    <div class="history-shelf">
      ${tomes.map((tome, index) => `
        <button class="history-volume" type="button" data-history-action="open" data-history-index="${index}">
          <span class="history-volume-number">TOMO ${String(index + 1).padStart(2, '0')}</span>
          <strong>${escapeHtml(tome.title.replace(/^Tomo [IVX]+ — /, ''))}</strong>
          <span class="history-volume-cta">Abrir tomo <span aria-hidden="true">→</span></span>
        </button>
      `).join('')}
    </div>
  `;
};

// Bárbaro de Discord: el logo de Discord con casco astado, melena y espada de Conan.
const discordBarbarianIcon = () => `
  <svg class="discord-barbarian" viewBox="0 0 96 96" aria-hidden="true" focusable="false">
    <g transform="rotate(45 48 48)">
      <path d="M45 6 L48 0 L51 6 V66 H45 Z" fill="#d9dde3" />
      <rect x="33" y="64" width="30" height="5" rx="2" fill="#c8964f" />
      <rect x="45.5" y="69" width="5" height="14" fill="#5b3a24" />
      <circle cx="48" cy="86" r="4" fill="#c8964f" />
    </g>
    <path d="M23 42 C12 56 12 76 19 88 L24 80 L27 88 L32 74 L28 58 Z M73 42 C84 56 84 76 77 88 L72 80 L69 88 L64 74 L68 58 Z" fill="#3b2418" />
    <ellipse cx="48" cy="62" rx="22" ry="15" fill="#1d1216" />
    <g transform="translate(18 36) scale(0.472)">
      <path fill="#5865f2" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
    </g>
    <path d="M27 44 C30 28 66 28 69 44 Z" fill="#b07a3c" />
    <rect x="25" y="42" width="46" height="6" rx="3" fill="#8a5a2b" />
    <rect x="46" y="44" width="4" height="13" rx="2" fill="#8a5a2b" />
    <path d="M28 43 C17 41 10 31 12 18 C17 29 24 33 33 36 Z M68 43 C79 41 86 31 84 18 C79 29 72 33 63 36 Z" fill="#efe1c6" />
  </svg>
`;

const renderDiscordButton = () => `
  <a class="discord-btn" href="${escapeHtml(DISCORD_INVITE_URL)}" target="_blank" rel="noopener noreferrer">
    ${discordBarbarianIcon()}
    <span>Ven a Discord</span>
  </a>
`;

const RACE_ICON_PATHS = {
  hammer: 'M14 4l6 6-3 3-6-6z M12.5 8.5L4 17l3 3 8.5-8.5',
  leaf: 'M5 19C5 10 11 5 20 4c-1 9-6 15-15 15z M5 19l8-8',
  flame: 'M12 3c1 4 5 6 5 11a5 5 0 0 1-10 0c0-3 2-4 2-7 1 1 2 2 3 4 1-3 0-5 0-8z',
  mask: 'M4 4l4 5h8l4-5-1 9-7 7-7-7z M9 12.5h1.5 M13.5 12.5H15',
  star: 'M12 2.5l2.4 6.9h7.1l-5.7 4.3 2.2 7-6-4.3-6 4.3 2.2-7-5.7-4.3h7.1z',
  waves: 'M3 8c3-3 6 3 9 0s6 3 9 0 M3 13c3-3 6 3 9 0s6 3 9 0 M3 18c3-3 6 3 9 0s6 3 9 0',
  mountain: 'M2 20l7-13 4 7 3-4 6 10z',
  serpent: 'M5 20c-3 0-3-4 0-4h11c3 0 3-5 0-5H8c-3 0-3-5 0-5h9 M17 6l2.5-2 M17 6l2.5 2',
  cloud: 'M7 18a4 4 0 0 1-.5-8 5.5 5.5 0 0 1 10.6-1.2A4.6 4.6 0 0 1 17 18z'
};

const renderRaceEmblems = (races) => `
  <ul class="news-emblems">
    ${races.map((race) => `
      <li class="news-emblem news-emblem--${escapeHtml(race.tone)}">
        <span class="news-emblem-seal">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${RACE_ICON_PATHS[race.icon] || RACE_ICON_PATHS.star}" /></svg>
        </span>
        <span class="news-emblem-name">${escapeHtml(race.name)}</span>
      </li>
    `).join('')}
  </ul>
`;

const formatNewsDate = (value) => {
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('es-ES', { dateStyle: 'long', timeZone: 'UTC' }).format(date);
};

const renderNewsItem = (item) => `
  <article class="news-proclamation" id="noticia-${escapeHtml(item.id)}">
    <header class="news-proclamation-head">
      <div class="news-meta">
        <span class="news-kicker">${escapeHtml(item.kicker || 'Noticia')}</span>
        <time datetime="${escapeHtml(item.date)}">${escapeHtml(formatNewsDate(item.date))}</time>
      </div>
      <p class="news-wordmark">MALEDICTA</p>
      <h3>${escapeHtml(item.title)}</h3>
      <span class="news-divider" aria-hidden="true"><span>◆</span></span>
    </header>
    ${item.greeting ? `<p class="news-greeting">${escapeHtml(item.greeting)}</p>` : ''}
    ${item.summary ? `<p class="news-lead">${escapeHtml(item.summary)}</p>` : ''}
    ${item.highlight ? `
      <div class="news-highlight">
        <strong>${escapeHtml(item.highlight.title)}</strong>
        <span>${escapeHtml(item.highlight.subtitle)}</span>
      </div>
    ` : ''}
    ${(item.sections || []).map((section) => `
      <section class="news-section">
        ${section.title ? `<h4 class="news-section-title"><span>${escapeHtml(section.title)}</span></h4>` : ''}
        ${section.body ? section.body.split(/\n\s*\n/).map((paragraph) => `<p>${escapeHtml(paragraph.trim())}</p>`).join('') : ''}
        ${section.races ? renderRaceEmblems(section.races) : ''}
      </section>
    `).join('')}
    ${item.closing || item.signature ? `
      <footer class="news-closing">
        ${item.closing ? `<p>${escapeHtml(item.closing)}</p>` : ''}
        ${item.signature ? `<p class="news-signature">${escapeHtml(item.signature)}</p>` : ''}
        <img class="news-seal" src="./assets/maledicta-logo.webp" alt="" />
      </footer>
    ` : ''}
    <div class="news-cta">${renderDiscordButton()}</div>
  </article>
`;

const renderNews = () => `
  <div class="section-intro">
    <p class="eyebrow">NOTICIAS</p>
    <h2>Voces del servidor</h2>
    <p class="section-subtitle">Los avisos oficiales del Staff, como cartas fechadas.</p>
  </div>
  ${NEWS.length ? `
    <div class="news-stack">
      ${NEWS.map(renderNewsItem).join('')}
    </div>
  ` : pendingCard('Sin noticias publicadas', 'Esta sección está lista para recibir titulares, fechas, imágenes y cuerpo de cada aviso.')}
`;

const renderGuides = () => `
  <div class="section-intro">
    <p class="eyebrow">GUÍAS</p>
    <h2>Para quien acaba de cruzar</h2>
    <p class="section-subtitle">Usa estas puertas para orientarte. El detalle de juego se ampliará cuando exista material oficial.</p>
  </div>
  <div class="chapter-stack">
    ${GUIDES.map((guide) => `
      <details class="lore-chapter">
        <summary>
          <span class="chapter-kicker">${escapeHtml(guide.summary)}</span>
          <strong>${escapeHtml(guide.title)}</strong>
        </summary>
        <p>${escapeHtml(guide.body)}</p>
      </details>
    `).join('')}
  </div>
`;

const renderFaq = () => `
  <div class="section-intro">
    <p class="eyebrow">FAQ</p>
    <h2>Preguntas frecuentes</h2>
    <p class="section-subtitle">Respuestas con lo que esta web ya puede afirmar.</p>
  </div>
  <div class="chapter-stack">
    ${FAQ.map((item) => `
      <details class="lore-chapter">
        <summary><strong>${escapeHtml(item.question)}</strong></summary>
        <p>${escapeHtml(item.answer)}</p>
      </details>
    `).join('')}
  </div>
`;

const renderOtherGames = () => `
  <div class="section-intro">
    <p class="eyebrow">MÁS ALLÁ DE MALEDICTA</p>
    <h2>Otros juegos</h2>
  </div>
  <article class="news-proclamation other-games-intro">
    <header class="news-proclamation-head">
      <span class="news-kicker">${escapeHtml(OTHER_GAMES_INTRO.kicker)}</span>
      <h3>${escapeHtml(OTHER_GAMES_INTRO.title)}</h3>
      <span class="news-divider" aria-hidden="true"><span>◆</span></span>
    </header>
    <p class="news-lead">${escapeHtml(OTHER_GAMES_INTRO.body)}</p>
  </article>
  <div class="game-card-list">
    ${OTHER_GAMES.map(renderGameCard).join('')}
  </div>
`;

function renderGameCard(game) {
  return `
    <article class="game-card" id="juego-${escapeHtml(game.id)}">
      <div class="game-card-cover">
        ${game.genre ? `<span class="game-card-genre">${escapeHtml(game.genre)}</span>` : ''}
        <h3>${escapeHtml(game.title)}</h3>
        ${game.hook ? `<p class="game-card-hook">${escapeHtml(game.hook)}</p>` : ''}
        <a class="other-game-play" href="${escapeHtml(game.url)}" target="_blank" rel="noopener noreferrer" aria-label="Jugar ${escapeHtml(game.title)}">
          <span aria-hidden="true">▶</span>
          <span>Jugar</span>
        </a>
        ${game.platform ? `<span class="game-card-platform">${escapeHtml(game.platform)}</span>` : ''}
      </div>
      <div class="game-card-info">
        ${(game.synopsis || []).length ? `
          <h4>Sinopsis</h4>
          ${game.synopsis.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}
        ` : ''}
        ${(game.features || []).length ? `
          <h4>Cómo se juega</h4>
          <ul class="game-card-features">${game.features.map((feature) => `<li>${escapeHtml(feature)}</li>`).join('')}</ul>
        ` : ''}
        ${game.note ? `<p class="game-card-note">${escapeHtml(game.note)}</p>` : ''}
        ${game.thanks ? `<p class="game-card-thanks"><span>Agradecimientos</span>${escapeHtml(game.thanks)}</p>` : ''}
      </div>
    </article>
  `;
}

const renderMiPersonaje = () => {
  if (!state.characterComplete && !state.character.name) {
    return `
      <div class="complete-panel">
        <h2>Aún no hay un personaje sellado</h2>
        <p>El registro no se ha completado. Puedes comenzar ahora y el progreso se guardará en este navegador.</p>
        <button class="action-btn" type="button" data-route="crear">Crear personaje</button>
      </div>
    `;
  }
  return `
    <div class="section-intro">
      <p class="eyebrow">MI PERSONAJE</p>
      <h2>${escapeHtml(state.character.name || 'Personaje en curso')}</h2>
      <p class="section-subtitle">Consulta, descarga o imprime cuando quieras. Editar no borra lo ya escrito.</p>
    </div>
    ${characterSummary()}
    <div class="button-row">
      <button class="action-btn" type="button" data-action="download" ${state.character.validationCode ? '' : 'disabled'}>Descargar ficha</button>
      <button class="secondary-btn" type="button" data-action="print">Imprimir ficha</button>
      <button class="ghost-btn" type="button" data-action="edit">Editar personaje</button>
      <button class="ghost-btn danger-btn" type="button" data-action="delete-character">Borrar ficha</button>
      ${state.characterComplete ? '<button class="ghost-btn" type="button" data-route="entrega">Cómo entregarla al Staff</button>' : ''}
    </div>
  `;
};

const latestNews = () => [...NEWS].sort((a, b) => b.date.localeCompare(a.date))[0];

const renderNewsPreview = (item) => `
  <button class="news-preview" type="button" data-route="hub/noticias" aria-label="Ver noticias: ${escapeHtml(item.title)}">
    <span class="news-preview-meta">
      <span class="news-preview-badge">Última noticia</span>
      <time datetime="${escapeHtml(item.date)}">${escapeHtml(formatNewsDate(item.date))}</time>
    </span>
    <strong class="news-preview-title">${escapeHtml(item.title)}</strong>
    ${item.highlight ? `<span class="news-preview-highlight">${escapeHtml(item.highlight.title)} · ${escapeHtml(item.highlight.subtitle)}</span>` : ''}
    ${item.summary ? `<span class="news-preview-summary">${escapeHtml(item.summary)}</span>` : ''}
    <span class="news-preview-cta">Leer noticias <span aria-hidden="true">→</span></span>
  </button>
`;

const renderHubHome = () => `
  <div class="section-intro">
    <h2>Bienvenido de nuevo a Maledicta</h2>
    <p class="section-subtitle">${escapeHtml(WELCOME.intro)}</p>
  </div>
  ${NEWS.length ? renderNewsPreview(latestNews()) : ''}
  <div class="hub-card-grid">
    ${state.characterComplete ? `<button class="hub-link-card featured" type="button" data-route="hub/mi-personaje"><strong>Mi personaje</strong><span>Revisa, descarga o imprime tu ficha.</span></button>` : `<button class="hub-link-card featured" type="button" data-route="crear"><strong>Crear personaje</strong><span>Continúa el rito de ingreso.</span></button>`}
    <button class="hub-link-card" type="button" data-route="hub/guias"><strong>Guías</strong><span>Primeros pasos para jugadores nuevos.</span></button>
  </div>
`;

const renderHubSection = () => {
  const id = state.hubSection;
  if (id === 'inicio') return renderHubHome();
  if (id === 'mi-personaje') return renderMiPersonaje();
  if (id === 'razas') return renderRaceIndex();
  if (id.startsWith('razas/')) {
    const entry = findRaceEntry(id.slice('razas/'.length));
    return entry ? renderRacePage(entry) : renderRaceIndex();
  }
  if (id === 'historia') return renderHistorySection();
  if (id === 'eventos') return `${renderCatalogSection(FANDOM.eventos)}${renderCatalogSection(FANDOM.actualizaciones)}`;
  if (id === 'bosses-de-maledicta') return renderBossesSection();
  if (id === 'noticias') return renderNews();
  if (id === 'guias') return renderGuides();
  if (id === 'otros-juegos') return renderOtherGames();
  if (id === 'faq') return renderFaq();
  if (id === 'normativas') return renderNormativas();
  return renderHubHome();
};

const renderHub = () => `
  <div class="hub-layout">
    <header class="hub-top">
      <button class="brand-inline" type="button" data-route="hub/inicio">
        ${brandMark()}
        <strong>MALEDICTA</strong>
      </button>
      <nav class="hub-nav" aria-label="Centro de información">
        ${HUB_SECTIONS.filter((item) => !(item.requiresCharacter && !state.characterComplete && item.id === 'mi-personaje' && !state.character.name)).map((item) => `
          <button class="hub-nav-item ${state.hubSection.split('/')[0] === item.id ? 'active' : ''}" type="button" data-route="hub/${item.id}">${escapeHtml(item.label)}</button>
        `).join('')}
      </nav>
    </header>
    <main class="hub-main">
      ${bannerHtml()}
      ${!state.characterComplete ? `<div class="resume-strip"><span>Registro en curso · ${getCreationProgress()}%</span><button class="action-btn" type="button" data-route="crear">Continuar personaje</button></div>` : ''}
      ${renderHubSection()}
    </main>
  </div>
  ${state.hubSection === 'historia' && historyReaderIndex !== null ? renderHistoryReader() : ''}
  ${state.hubSection === 'bosses-de-maledicta' ? renderBossGalleryViewer() : ''}
`;

const fillPrintSheet = () => {
  const c = state.character;
  if (!c?.name && !c?.validationCode) {
    printRoot.hidden = true;
    printRoot.innerHTML = '';
    return;
  }
  printRoot.hidden = false;
  printRoot.innerHTML = `
    <h1>MALEDICTA</h1>
    <p class="print-sub">Registro de personaje</p>
    <p class="print-code">${escapeHtml(c.validationCode || 'SIN CÓDIGO')}</p>
    ${c.lastEditedAt ? `<p class="print-edited">Ficha editada el ${escapeHtml(formatDate(c.lastEditedAt))}</p>` : ''}
    ${c.image?.dataUrl ? `<img src="${c.image.dataUrl}" alt="" />` : ''}
    <dl>
      <div><dt>Nombre</dt><dd>${escapeHtml(c.name)}</dd></div>
      <div><dt>Edad</dt><dd>${escapeHtml(c.age)}</dd></div>
      <div><dt>Sexo / Género</dt><dd>${escapeHtml(c.sex)}</dd></div>
      <div><dt>Origen</dt><dd>${escapeHtml(c.origin || '—')}</dd></div>
      <div><dt>Raza</dt><dd>${escapeHtml(c.ethnicityDetail || c.ethnicity)}</dd></div>
      <div><dt>Altura</dt><dd>${escapeHtml(c.height)}</dd></div>
    </dl>
    <h2>Descripción física</h2>
    <p>${escapeHtml(c.distinctiveFeatures)}</p>
    <p>${escapeHtml(c.physicalDescription)}</p>
    ${c.personalityTrait ? `<h2>Rasgo de personalidad</h2><p>${escapeHtml(c.personalityTrait)}</p>` : ''}
  `;
};

const render = () => {
  document.body.classList.toggle('history-reading', historyReaderIndex !== null);
  if (state.phase === 'welcome') appRoot.innerHTML = renderWelcome();
  else if (state.phase === 'creating') appRoot.innerHTML = renderWizard();
  else if (state.phase === 'entrega') appRoot.innerHTML = renderEntrega();
  else appRoot.innerHTML = renderHub();
  fillPrintSheet();
  syncHash();
};

const handleImageFile = async (file) => {
  state.character.imageError = '';
  state.character.imageStatus = 'analyzing';
  persist();
  render();

  const fail = (message) => {
    state.character.imageError = message;
    state.character.imageStatus = 'rejected';
    state.character.image = defaultCharacter().image;
    persist();
    render();
  };

  if (!file || !IMAGE_LIMITS.types.includes(file.type)) {
    fail('Formato no permitido. Usa una imagen PNG, JPG o JPEG real.');
    return;
  }
  if (file.size > IMAGE_LIMITS.maxBytes) {
    fail('La imagen supera el tamaño máximo de 10 MB.');
    return;
  }

  let dataUrl;
  try {
    dataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  } catch {
    fail('No se pudo leer la imagen. El archivo podría estar dañado.');
    return;
  }

  const imageElement = new Image();
  imageElement.src = dataUrl;
  try {
    await new Promise((resolve, reject) => {
      imageElement.onload = resolve;
      imageElement.onerror = reject;
    });
  } catch {
    fail('No se pudo leer la imagen. El archivo podría estar dañado.');
    return;
  }

  if (imageElement.naturalWidth < IMAGE_LIMITS.minSize || imageElement.naturalHeight < IMAGE_LIMITS.minSize) {
    fail('La resolución mínima es de 512 × 512 píxeles.');
    return;
  }

  let serverValidated = false;
  try {
    const form = new FormData();
    form.append('image', file);
    const response = await fetch('/api/analyze-image', { method: 'POST', body: form });
    const payload = await response.json();
    if (!response.ok) {
      fail(payload.error || 'La verificación automática rechazó la imagen.');
      return;
    }
    serverValidated = true;
  } catch {
    serverValidated = false;
  }

  state.character.image = {
    dataUrl,
    name: file.name,
    size: file.size,
    width: imageElement.naturalWidth,
    height: imageElement.naturalHeight,
    uploadedAt: new Date().toISOString(),
    serverValidated
  };
  state.character.imageStatus = 'valid';
  state.character.imageError = serverValidated ? '' : 'Verificada en este dispositivo. El servidor no respondió; el Staff puede revisarla de nuevo.';
  setBanner('');
  persist();
  render();
};

// crypto.randomUUID solo existe en contextos seguros (https / localhost).
const createId = () => (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
  ? crypto.randomUUID()
  : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`);

const readFileAsDataUrl = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.onerror = () => reject(reader.error);
  reader.readAsDataURL(file);
});

const loadImageElement = (file) => new Promise((resolve) => {
  const url = URL.createObjectURL(file);
  const probe = new Image();
  probe.onload = () => { URL.revokeObjectURL(url); resolve(probe); };
  probe.onerror = () => { URL.revokeObjectURL(url); resolve(null); };
  probe.src = url;
});

// Las imágenes se guardan como texto (data URL) y no como Blob: varios navegadores
// fallan al guardar Blobs en IndexedDB. Las muy grandes se reducen para no agotar la cuota.
const GALLERY_MAX_SIDE = 2048;
const prepareGalleryDataUrl = async (file, imageElement) => {
  const largestSide = Math.max(imageElement.naturalWidth, imageElement.naturalHeight);
  if (file.type === 'image/gif' || (largestSide <= GALLERY_MAX_SIDE && file.size <= 2.5 * 1024 * 1024)) {
    return readFileAsDataUrl(file);
  }
  const scale = Math.min(1, GALLERY_MAX_SIDE / largestSide);
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(imageElement.naturalWidth * scale);
  canvas.height = Math.round(imageElement.naturalHeight * scale);
  canvas.getContext('2d').drawImage(imageElement, 0, 0, canvas.width, canvas.height);
  const webp = canvas.toDataURL('image/webp', 0.9);
  if (webp.startsWith('data:image/webp')) return webp;
  return canvas.toDataURL(file.type === 'image/jpeg' ? 'image/jpeg' : 'image/png', 0.9);
};

const describeStorageError = (error) => {
  if (error?.name === 'QuotaExceededError') return 'el almacenamiento del navegador está lleno';
  return 'este navegador no permite guardar datos de la web (modo incógnito o datos de sitios bloqueados)';
};

const handleBossGalleryFiles = async (bossId, files) => {
  const selectedFiles = [...files];
  let savedCount = 0;
  let sessionOnlyReason = '';
  const problems = [];

  for (const file of selectedFiles) {
    if (!BOSS_GALLERY_LIMITS.types.includes(file.type)) {
      problems.push(`${file.name}: formato no permitido (usa PNG, JPG, WEBP o GIF)`);
      continue;
    }
    if (file.size > BOSS_GALLERY_LIMITS.maxBytes) {
      problems.push(`${file.name}: supera los 10 MB`);
      continue;
    }
    const imageElement = await loadImageElement(file);
    if (!imageElement) {
      problems.push(`${file.name}: el archivo está dañado o no es una imagen`);
      continue;
    }

    let dataUrl;
    try {
      dataUrl = await prepareGalleryDataUrl(file, imageElement);
    } catch (error) {
      console.warn('No se pudo leer la imagen del boss:', error);
      problems.push(`${file.name}: no se pudo leer el archivo`);
      continue;
    }

    const image = {
      id: createId(),
      bossId,
      name: file.name,
      dataUrl,
      addedAt: new Date().toISOString()
    };
    let unsaved = false;
    try {
      await saveBossGalleryImage(image);
      savedCount += 1;
    } catch (error) {
      console.warn('No se pudo guardar la imagen del boss:', error);
      unsaved = true;
      sessionOnlyReason = describeStorageError(error);
    }
    const gallery = bossGalleryImages.get(bossId) || [];
    gallery.push({ ...image, url: dataUrl, unsaved });
    bossGalleryImages.set(bossId, gallery);
  }

  const messages = [];
  if (savedCount) messages.push(`${savedCount} imagen(es) guardada(s) en la galería.`);
  if (sessionOnlyReason) messages.push(`Algunas imágenes se muestran solo durante esta visita porque ${sessionOnlyReason}.`);
  if (problems.length) messages.push(`No se cargaron: ${problems.join(' · ')}.`);
  setBanner(messages.join(' '), sessionOnlyReason || problems.length ? 'danger' : 'ok');
  render();
};

const bindAppEvents = () => {
  appRoot.addEventListener('click', async (event) => {
    const historyButton = event.target.closest('[data-history-action]');
    if (historyButton) {
      const action = historyButton.dataset.historyAction;
      if (action === 'open') historyReaderIndex = Number(historyButton.dataset.historyIndex);
      if (action === 'close') historyReaderIndex = null;
      if (action === 'previous' && historyReaderIndex > 0) historyReaderIndex -= 1;
      if (action === 'next' && historyReaderIndex < FANDOM.historia.entries.length - 1) historyReaderIndex += 1;
      render();
      requestAnimationFrame(() => document.querySelector('.history-book-content')?.scrollTo({ top: 0, behavior: 'auto' }));
      return;
    }

    const galleryButton = event.target.closest('[data-boss-gallery-action]');
    if (galleryButton) {
      const action = galleryButton.dataset.bossGalleryAction;
      const bossId = galleryButton.dataset.bossId || bossGalleryViewer?.bossId;
      if (action === 'close') {
        if (galleryButton.classList.contains('boss-lightbox') && event.target !== galleryButton) return;
        bossGalleryViewer = null;
      }
      if (action === 'open') {
        bossGalleryViewer = { bossId, index: Number(galleryButton.dataset.imageIndex) };
      }
      if (action === 'delete') {
        const gallery = bossGalleryImages.get(bossId) || [];
        const index = gallery.findIndex((image) => image.id === galleryButton.dataset.imageId);
        if (index >= 0) {
          try {
            if (!gallery[index].unsaved) await deleteBossGalleryImage(gallery[index].id);
            if (gallery[index].url.startsWith('blob:')) URL.revokeObjectURL(gallery[index].url);
            gallery.splice(index, 1);
            bossGalleryImages.set(bossId, gallery);
            if (bossGalleryViewer?.bossId === bossId) {
              if (!gallery.length) bossGalleryViewer = null;
              else if (bossGalleryViewer.index >= gallery.length) bossGalleryViewer.index = gallery.length - 1;
              else if (index < bossGalleryViewer.index) bossGalleryViewer.index -= 1;
            }
            setBanner('Imagen eliminada de la galería.', 'ok');
          } catch {
            setBanner('No se pudo eliminar la imagen de su almacenamiento.', 'danger');
          }
        }
      }
      if (action === 'previous' || action === 'next') {
        const gallery = bossGalleryImages.get(bossId) || [];
        if (gallery.length) {
          const offset = action === 'previous' ? -1 : 1;
          bossGalleryViewer.index = (bossGalleryViewer.index + offset + gallery.length) % gallery.length;
        }
      }
      render();
      return;
    }

    const routeBtn = event.target.closest('[data-route]');
    if (routeBtn) {
      const route = routeBtn.dataset.route;
      if (route === 'bienvenida') {
        goToPhase(state.characterComplete ? 'hub' : 'welcome', { hubSection: 'inicio' });
        return;
      }
      if (route === 'crear' || route.startsWith('crear/')) {
        goToPhase('creating');
        return;
      }
      if (route === 'entrega') {
        goToPhase(state.characterComplete ? 'entrega' : 'creating');
        return;
      }
      if (route.startsWith('hub/')) {
        const section = route.replace('hub/', '');
        goToPhase('hub', { hubSection: section });
        if (section.startsWith('razas') || section === 'noticias') window.scrollTo({ top: 0 });
      }
      return;
    }

    const stepBtn = event.target.closest('[data-step-index]');
    if (stepBtn) {
      const index = Number(stepBtn.dataset.stepIndex);
      if (index <= state.creationStep) {
        goToStep(index);
        return;
      }
      if (index === state.creationStep + 1 && !getStepErrors().length) {
        goToStep(index);
        return;
      }
      setBanner(getStepErrors()[0] || 'Completa este paso antes de avanzar.');
      render();
      return;
    }

    const choice = event.target.closest('[data-field]');
    if (choice) {
      const field = choice.dataset.field;
      state.character[field] = choice.dataset.value;
      persist();
      render();
      return;
    }

    const actionBtn = event.target.closest('[data-action]');
    if (!actionBtn) return;
    const action = actionBtn.dataset.action;

    if (action === 'next') handleContinue();
    if (action === 'prev') goToStep(state.creationStep - 1);
    if (action === 'edit') {
      state.phase = 'creating';
      state.creationStep = 0;
      state.editingCharacter = true;
      persist();
      render();
    }
    if (action === 'delete-character') {
      if (!window.confirm('¿Seguro que quieres borrar esta ficha? Se eliminarán sus datos y podrás crear un personaje nuevo.')) return;
      await clearState();
      state = structuredClone(baseState);
      state.phase = 'welcome';
      setBanner('Ficha borrada. Ya puedes crear un personaje nuevo.', 'ok');
      render();
    }
    if (action === 'generate') handleGenerateSheet();
    if (action === 'download') {
      if (!state.character.validationCode) state.character.validationCode = generateValidationCode();
      persist();
      await downloadCharacterSheet(state.character, state.character.validationCode);
    }
    if (action === 'print') {
      fillPrintSheet();
      printCharacterSheet();
    }
    if (action === 'remove-image' || action === 'replace-image') {
      state.character.image = defaultCharacter().image;
      state.character.imageStatus = 'missing';
      state.character.imageError = action === 'remove-image' ? 'La imagen fue eliminada. Debes cargar otra para continuar.' : '';
      persist();
      render();
      if (action === 'replace-image') document.querySelector('#character-image-input')?.click();
    }
  });

  appRoot.addEventListener('change', (event) => {
    if (event.target.matches('[data-accept]')) {
      state.acceptances[event.target.dataset.accept] = event.target.checked;
      persist();
      render();
      return;
    }
    const select = event.target.closest('select');
    if (select?.name && select.name in state.character) {
      state.character[select.name] = select.value;
      persist();
      render();
    }
    if (event.target.id === 'character-image-input') {
      handleImageFile(event.target.files[0]);
    }
    if (event.target.matches('[data-boss-file-input]')) {
      handleBossGalleryFiles(event.target.dataset.bossFileInput, event.target.files);
      event.target.value = '';
    }
  });

  appRoot.addEventListener('input', (event) => {
    const { name, value } = event.target;
    if (!name || !(name in state.character)) return;
    if (name === 'age') {
      const cleanValue = value.replace(/[^\d]/g, '').slice(0, 5);
      state.character.age = cleanValue;
      event.target.value = cleanValue;
    } else {
      state.character[name] = value;
    }
    persist();
    if (name === 'physicalDescription' || name === 'personalityTrait') {
      const counter = event.target.closest('.codex-panel')?.querySelector('.char-counter');
      if (counter) counter.textContent = `${value.length}/1500`;
    }
  });

  appRoot.addEventListener('keydown', (event) => {
    const uploadLabel = event.target.closest('[data-boss-upload-label]');
    if (uploadLabel && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      uploadLabel.click();
    }
  });

  appRoot.addEventListener('dragover', (event) => {
    if (event.target.closest('[data-drop-zone]')) event.preventDefault();
  });

  appRoot.addEventListener('drop', (event) => {
    const zone = event.target.closest('[data-drop-zone]');
    if (!zone) return;
    event.preventDefault();
    handleImageFile(event.dataTransfer.files[0]);
  });
};

const initialize = async () => {
  const saved = loadState();
  if (saved) {
    state = {
      ...structuredClone(baseState),
      ...saved,
      acceptances: { ...defaultAcceptances(), ...(saved.acceptances ?? {}) },
      character: { ...defaultCharacter(), ...(saved.character ?? {}) }
    };
    await hydrateImage(state);
    if (state.character.image?.dataUrl && state.character.imageStatus === 'missing') {
      state.character.imageStatus = 'valid';
    }
  }

  try {
    const records = await loadBossGalleryImages();
    records.forEach((record) => {
      if (!FANDOM.bosses.entries.some((boss) => boss.id === record.bossId)) return;
      const gallery = bossGalleryImages.get(record.bossId) || [];
      // Registros antiguos guardaban el archivo como Blob; los nuevos, como data URL.
      const url = record.dataUrl || (record.blob ? URL.createObjectURL(record.blob) : null);
      if (!url) return;
      gallery.push({ ...record, url });
      bossGalleryImages.set(record.bossId, gallery);
    });
  } catch {
    setBanner('No se pudo abrir el almacenamiento local de las galerías.', 'danger');
  }

  // Secciones eliminadas (p. ej. Fandom) guardadas en el navegador vuelven a Inicio.
  if (!HUB_SECTIONS.some((item) => item.id === state.hubSection.split('/')[0])) state.hubSection = 'inicio';
  if (location.hash) applyHash();
  // Insignia fija de Discord: vive fuera de #app para mantenerse en todas las pantallas.
  document.body.insertAdjacentHTML('beforeend', `
    <a class="discord-badge" href="${escapeHtml(DISCORD_INVITE_URL)}" target="_blank" rel="noopener noreferrer" aria-label="Únete a Discord">
      <span class="discord-badge-sign">Únete a Discord</span>
      <img class="discord-badge-logo" src="./assets/discord-barbarian.webp" alt="" width="256" height="256" />
    </a>
  `);
  bindAppEvents();
  window.addEventListener('hashchange', () => {
    applyHash();
    render();
  });
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && historyReaderIndex !== null) {
      historyReaderIndex = null;
      render();
    }
    if (event.key === 'Escape' && bossGalleryViewer) {
      bossGalleryViewer = null;
      render();
    }
    if (bossGalleryViewer && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
      const gallery = bossGalleryImages.get(bossGalleryViewer.bossId) || [];
      if (gallery.length) {
        event.preventDefault();
        const offset = event.key === 'ArrowLeft' ? -1 : 1;
        bossGalleryViewer.index = (bossGalleryViewer.index + offset + gallery.length) % gallery.length;
        render();
      }
    }
  });
  render();
};

initialize();
