import { STEPS, CHARACTER_CATALOG, CONSENT_CATEGORIES, defaultCharacter } from './config.js';
import { loadState, saveState, clearState } from './storage.js';

const appRoot = document.querySelector('#app');
const stepNav = document.querySelector('#step-nav');
const stepContent = document.querySelector('#step-content');
const actionBar = document.querySelector('#action-bar');
const progressIndicator = document.querySelector('#progress-indicator');
const progressFill = document.querySelector('#progress-fill');
const statusBanner = document.querySelector('#status-banner');

const baseState = {
  currentStep: 0,
  completed: false,
  confirmed: false,
  banner: '',
  character: defaultCharacter()
};

let state = (() => {
  const saved = loadState();
  if (!saved) {
    return structuredClone(baseState);
  }

  return {
    ...baseState,
    ...saved,
    character: {
      ...defaultCharacter(),
      ...(saved.character ?? {})
    }
  };
})();

const escapeHtml = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/\"/g, '&quot;')
  .replace(/'/g, '&#039;');

const getProgress = () => {
  const requiredFields = ['name', 'age', 'profession', 'classType', 'archetype', 'alignment', 'story'];
  const consentKeys = Object.keys(state.character.consent);
  const filled = requiredFields.filter((key) => {
    const value = state.character[key];
    if (typeof value === 'string') return value.trim().length > 0;
    return value !== '' && value !== null && value !== undefined;
  }).length;

  const consentFilled = consentKeys.filter((key) => state.character.consent[key]).length;
  const imageFilled = isImageValid();
  const total = requiredFields.length + consentKeys.length + 1;
  const complete = filled + consentFilled + (imageFilled ? 1 : 0);
  return Math.min(100, Math.max(0, Math.round((complete / total) * 100)));
};

const persist = () => {
  saveState(state);
};

const setBanner = (message = '') => {
  state.banner = message;
  if (message) {
    statusBanner.textContent = message;
    statusBanner.classList.remove('hidden');
  } else {
    statusBanner.textContent = '';
    statusBanner.classList.add('hidden');
  }
};

const getSelectedOption = (catalog, value) => {
  return catalog.find((item) => item.value === value) || null;
};

const getConsentLabel = (key) => {
  const category = CONSENT_CATEGORIES.find((item) => item.key === key);
  const selected = category?.options.find((option) => option.value === state.character.consent[key]);
  return selected ? selected.label : 'Sin definir';
};

const getValidationErrors = () => {
  const errors = [];

  if (!state.character.name.trim()) {
    errors.push({ field: 'name', message: 'Este personaje todavía necesita un nombre.' });
  }

  if (!state.character.age || Number(state.character.age) <= 0) {
    errors.push({ field: 'age', message: 'La edad del personaje debe estar definida.' });
  }

  if (!state.character.profession) {
    errors.push({ field: 'profession', message: 'Falta la profesión del personaje.' });
  }

  if (!state.character.classType) {
    errors.push({ field: 'classType', message: 'Debes elegir una clase para continuar.' });
  }

  if (!state.character.archetype) {
    errors.push({ field: 'archetype', message: 'Falta definir el arquetipo.' });
  }

  if (!state.character.alignment) {
    errors.push({ field: 'alignment', message: 'La alineación del personaje aún no está definida.' });
  }

  if (!state.character.story.trim()) {
    errors.push({ field: 'story', message: 'La historia del personaje no puede quedar vacía.' });
  }

  for (const category of CONSENT_CATEGORIES) {
    if (!state.character.consent[category.key]) {
      errors.push({ field: category.key, message: `Falta la preferencia de ${category.title.toLowerCase()}.` });
    }
  }

  if (!isImageValid()) {
    errors.push({ field: 'image', message: 'Debes cargar una imagen válida del personaje antes de continuar.' });
  }

  return errors;
};

const isImageValid = () => {
  const image = state.character.image;
  return Boolean(image?.dataUrl && image.name && image.size <= 10 * 1024 * 1024 && image.width >= 512 && image.height >= 512);
};

const getImageStatus = () => {
  const image = state.character.image;
  if (!image?.dataUrl) return { label: 'Sin imagen', className: 'image-status-missing' };
  return { label: 'Imagen cargada', className: 'image-status-approved' };
};

const validateCurrentStep = () => {
  const errors = getValidationErrors();
  const currentStep = STEPS[state.currentStep]?.id;

  if (currentStep === 'identity') {
    const identityErrors = errors.filter((item) => ['name', 'age', 'profession', 'classType', 'archetype', 'alignment'].includes(item.field));
    if (identityErrors.length) {
      setBanner(identityErrors[0].message);
      return false;
    }
  }

  if (currentStep === 'story') {
    const storyErrors = errors.filter((item) => item.field === 'story');
    if (storyErrors.length) {
      setBanner(storyErrors[0].message);
      return false;
    }
  }

  if (currentStep === 'consent') {
    const consentErrors = errors.filter((item) => item.field.startsWith('confinement') || item.field === 'violence' || item.field === 'gore' || item.field === 'erp');
    if (consentErrors.length) {
      setBanner(consentErrors[0].message);
      return false;
    }
  }

  if (currentStep === 'image' && !isImageValid()) {
    const imageError = errors.find((item) => item.field === 'image');
    setBanner(imageError?.message || 'Carga una imagen válida para continuar.');
    return false;
  }

  setBanner('');
  return true;
};

const renderStepNav = () => {
  const progress = getProgress();
  const items = STEPS.map((step, index) => {
    const active = index === state.currentStep;
    const done = index < state.currentStep || progress >= 100;
    return `
      <button
        class="step-item ${active ? 'active' : ''} ${done ? 'done' : ''}"
        type="button"
        data-step-index="${index}"
        aria-current="${active ? 'step' : 'false'}"
      >
        <span class="step-index">${index + 1}</span>
        <span class="step-copy">
          <span class="step-label">${step.label}</span>
          <span class="step-title">${step.title}</span>
        </span>
        <span class="step-status">${done ? '✓' : ''}</span>
      </button>
    `;
  }).join('');

  stepNav.innerHTML = items;
  progressIndicator.textContent = `${progress}%`;
  progressFill.style.width = `${progress}%`;
  progressFill.className = 'progress-fill';
  const progressBar = document.querySelector('.progress-fill');
  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }
};

const renderIdentityStep = () => {
  const selectedProfession = getSelectedOption(CHARACTER_CATALOG.professions, state.character.profession);
  const selectedClass = getSelectedOption(CHARACTER_CATALOG.classes, state.character.classType);
  const selectedArchetype = getSelectedOption(CHARACTER_CATALOG.archetypes, state.character.archetype);
  const selectedAlignment = getSelectedOption(CHARACTER_CATALOG.alignments, state.character.alignment);

  const renderSelect = (name, label, options, selected) => `
    <label class="field-card">
      <span class="field-label">${label} <span class="field-hint">Selecciona una</span></span>
      <select class="input-shell select-shell" name="${name}">
        <option value="">Seleccionar...</option>
        ${options.map((option) => `
          <option value="${option.value}" ${state.character[name] === option.value ? 'selected' : ''}>${option.value}</option>
        `).join('')}
      </select>
      <div class="selection-preview">
        <strong>${selected ? selected.value : 'Sin seleccionar'}</strong>
        ${selected ? ` · ${selected.description}` : ' · Elige una opción del menú desplegable.'}
      </div>
    </label>
  `;

  return `
    <div class="section-intro">
      <p class="eyebrow">01 — IDENTIDAD</p>
      <h2>Define la esencia del personaje</h2>
      <p class="section-subtitle">Cada decisión deja una huella sobre el destino que le espera a este alma en Maledicta.</p>
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

      ${renderSelect('profession', 'Profesión', CHARACTER_CATALOG.professions, selectedProfession)}
      ${renderSelect('classType', 'Clase', CHARACTER_CATALOG.classes, selectedClass)}
      ${renderSelect('archetype', 'Arquetipo', CHARACTER_CATALOG.archetypes, selectedArchetype)}
      ${renderSelect('alignment', 'Alineación', CHARACTER_CATALOG.alignments, selectedAlignment)}
    </div>
  `;
};

const renderStoryStep = () => {
  const story = state.character.story || '';
  const counter = story.length;
  const maxLength = 1500;

  return `
    <div class="section-intro">
      <p class="eyebrow">02 — HISTORIA</p>
      <h2>Escribe la memoria del personaje</h2>
      <p class="section-subtitle">La historia no es un formulario: es la marca que lo convierte en alguien real dentro del mundo.</p>
    </div>

    <div class="codex-panel">
      <div class="codex-header">
        <span class="field-label">Historia del personaje</span>
        <span class="char-counter">${counter}/${maxLength}</span>
      </div>
      <textarea
        class="textarea-shell"
        name="story"
        maxlength="${maxLength}"
        placeholder="Escribe la historia de este personaje..."
      >${escapeHtml(story)}</textarea>
    </div>
  `;
};

const renderConsentStep = () => {
  return `
    <div class="section-intro">
      <p class="eyebrow">03 — CONSENTIMIENTOS Y LÍMITES</p>
      <h2>Establece tus límites con claridad</h2>
      <p class="section-subtitle">Estas preferencias ayudan a definir el tono del rol sin ambigüedades ni sorpresas.</p>
    </div>

    <div class="consent-grid">
      ${CONSENT_CATEGORIES.map((category) => `
        <div class="option-panel">
          <h3>${category.title}</h3>
          <p class="panel-copy">${category.prompt}</p>
          <div class="preference-list">
            ${category.options.map((option) => `
              <button
                type="button"
                class="preference-item ${state.character.consent[category.key] === option.value ? 'selected' : ''}"
                data-field="consent"
                data-category="${category.key}"
                data-value="${option.value}"
                title="${option.description}"
              >
                ${option.label}
              </button>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  `;
};

const renderImageStep = () => {
  const image = state.character.image;
  const status = getImageStatus();
  const imageError = state.character.imageError || '';
  const preview = image?.dataUrl
    ? `<div class="image-preview-wrap"><img class="image-preview" src="${image.dataUrl}" alt="Vista previa de ${escapeHtml(image.name || 'la imagen del personaje')}" /><div class="image-details"><strong>${escapeHtml(image.name)}</strong><span>${Math.round(image.size / 1024)} KB · ${image.width} × ${image.height}px</span></div><button class="secondary-btn" type="button" data-action="remove-image">Reemplazar imagen</button></div>`
    : `<div class="upload-placeholder"><strong>Suelta aquí el retrato de tu personaje</strong><span>PNG, JPG o JPEG · máximo 10 MB · mínimo 512 × 512 px</span></div>`;

  return `
    <div class="section-intro">
      <p class="eyebrow">04 — IMAGEN DEL PERSONAJE</p>
      <h2>Da rostro a su leyenda</h2>
      <p class="section-subtitle">Carga una imagen original y representativa. Será revisada antes de permitir el registro final.</p>
    </div>
    <div class="image-upload-panel">
      <input id="character-image-input" class="visually-hidden" type="file" accept="image/png,image/jpeg" />
      <label class="drop-zone" for="character-image-input" data-drop-zone>
        ${preview}
        ${image?.dataUrl ? '' : '<span class="upload-icon" aria-hidden="true">↑</span><span class="upload-action">Seleccionar archivo</span>'}
      </label>
      <div class="image-status ${status.className}"><span class="status-dot"></span><strong>${status.label}</strong></div>
      ${imageError ? `<div class="image-error" role="alert">${escapeHtml(imageError)}</div>` : ''}
      <p class="image-note">La imagen se valida por formato, tamaño y resolución antes de continuar.</p>
    </div>
  `;
};

const renderReviewStep = () => {
  const story = state.character.story.trim();
  const consentEntries = CONSENT_CATEGORIES.map((category) => ({
    label: category.title,
    value: getConsentLabel(category.key)
  }));
  const image = state.character.image;
  const imageStatus = getImageStatus();

  return `
    <div class="section-intro">
      <p class="eyebrow">04 — REVISIÓN</p>
      <h2>Revisa la forma final del personaje</h2>
      <p class="section-subtitle">Comprobá que cada elemento del registro encaje con la identidad que deseas sostener.</p>
    </div>

    <div class="review-layout">
      <div class="review-panel">
        <h3 class="summary-hero">Maledicta</h3>
        <div class="summary-grid">
          <div class="summary-item"><span class="summary-label">Nombre</span><span class="summary-value">${escapeHtml(state.character.name || 'No definido')}</span></div>
          <div class="summary-item"><span class="summary-label">Edad</span><span class="summary-value">${escapeHtml(state.character.age || 'No definida')}</span></div>
          <div class="summary-item"><span class="summary-label">Arquetipo</span><span class="summary-value">${escapeHtml(state.character.archetype || 'No definido')}</span></div>
          <div class="summary-item"><span class="summary-label">Profesión</span><span class="summary-value">${escapeHtml(state.character.profession || 'No definida')}</span></div>
          <div class="summary-item"><span class="summary-label">Clase</span><span class="summary-value">${escapeHtml(state.character.classType || 'No definida')}</span></div>
          <div class="summary-item"><span class="summary-label">Alineación</span><span class="summary-value">${escapeHtml(state.character.alignment || 'No definida')}</span></div>
        </div>

        <div class="history-block">
          <h4>Historia</h4>
          <div class="history-text">${escapeHtml(story || 'Todavía no se ha escrito la historia del personaje.')}</div>
        </div>
      </div>

      <div class="review-image-panel">
        <h4>Imagen del personaje</h4>
        ${image?.dataUrl ? `<img class="review-image" src="${image.dataUrl}" alt="Vista previa del personaje" />` : '<div class="review-image missing">No se ha cargado una imagen.</div>'}
        <div class="image-status ${imageStatus.className}"><span class="status-dot"></span><strong>${imageStatus.label}</strong></div>
        <p class="review-ai-result">La imagen cumple los requisitos técnicos del formulario.</p>
      </div>

      <div class="consent-summary">
        <h4>Consentimientos</h4>
        <div class="badge-list">
          ${consentEntries.map((entry) => `<span class="badge">${entry.label}: ${entry.value}</span>`).join('')}
        </div>
      </div>
    </div>
  `;
};

const wrapText = (ctx, text, maxWidth) => {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const metrics = ctx.measureText(testLine);

    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
};

const downloadCharacterSheet = async () => {
  if (getProgress() < 100) {
    setBanner('Completa todos los campos y consentimientos antes de descargar la ficha.');
    return false;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1400;
  canvas.height = 1900;
  const ctx = canvas.getContext('2d');

  const consentEntries = CONSENT_CATEGORIES.map((category) => ({
    label: category.title,
    value: getConsentLabel(category.key)
  }));

  const name = (state.character.name || 'Personaje sin nombre').trim();
  const title = 'MALEDICTA';

  ctx.fillStyle = '#070b10';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const logo = new Image();
  logo.src = './assets/maledicta-logo.png';
  await new Promise((resolve) => {
    logo.onload = resolve;
    logo.onerror = resolve;
  });

  const characterImage = new Image();
  if (state.character.image?.dataUrl) {
    characterImage.src = state.character.image.dataUrl;
    await new Promise((resolve) => {
      characterImage.onload = resolve;
      characterImage.onerror = resolve;
    });
  }

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#25131d');
  gradient.addColorStop(0.55, '#160a12');
  gradient.addColorStop(1, '#10070d');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = 'rgba(244, 220, 224, 0.5)';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.roundRect(48, 52, canvas.width - 96, canvas.height - 104, 42);
  ctx.stroke();

  ctx.fillStyle = '#ffe9df';
  ctx.font = 'bold 82px Georgia';
  ctx.textAlign = 'center';
  ctx.fillText(title, canvas.width / 2, 180);

  if (logo.complete && logo.naturalWidth > 0) {
    const logoSize = 170;
    ctx.globalAlpha = 0.92;
    ctx.drawImage(logo, canvas.width / 2 - logoSize / 2, 274, logoSize, logoSize);
    ctx.globalAlpha = 1;
  }

  ctx.fillStyle = '#e6b4bd';
  ctx.font = '600 28px Arial';
  ctx.letterSpacing = '0.2em';
  ctx.fillText('REGISTRO DE PERSONAJE', canvas.width / 2, 245);

  const summary = [
    ['Nombre', state.character.name || 'No definido'],
    ['Edad', state.character.age || 'No definida'],
    ['Arquetipo', state.character.archetype || 'No definido'],
    ['Profesión', state.character.profession || 'No definida'],
    ['Clase', state.character.classType || 'No definida'],
    ['Alineación', state.character.alignment || 'No definida']
  ];

  const cardX = 110;
  const cardY = 300;
  const cardW = canvas.width - 220;
  const itemW = cardW / 2 - 20;
  const itemH = 110;

  summary.forEach(([label, value], index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const x = cardX + col * (itemW + 20);
    const y = cardY + row * (itemH + 18);

    ctx.fillStyle = 'rgba(255, 244, 240, 0.045)';
    ctx.fillRect(x, y, itemW, itemH);
    ctx.strokeStyle = 'rgba(244, 220, 224, 0.18)';
    ctx.strokeRect(x, y, itemW, itemH);

    ctx.fillStyle = '#d0b7bd';
    ctx.font = '600 18px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(label.toUpperCase(), x + 24, y + 34);

    ctx.fillStyle = '#fff4f0';
    ctx.font = '600 30px Arial';
    const safeValue = String(value || 'No definido');
    const valueLines = wrapText(ctx, safeValue, itemW - 30);
    const maxLines = 2;
    valueLines.slice(0, maxLines).forEach((line, lineIdx) => {
      ctx.fillText(line, x + 24, y + 70 + lineIdx * 26);
    });
  });

  const imageTitleY = 760;
  ctx.fillStyle = '#e6b4bd';
  ctx.font = '600 22px Arial';
  ctx.textAlign = 'left';
  ctx.fillText('IMAGEN DEL PERSONAJE', 110, imageTitleY);

  const imageBoxX = 110;
  const imageBoxY = 790;
  const imageBoxW = canvas.width - 220;
  const imageBoxH = 330;
  ctx.fillStyle = 'rgba(48, 21, 35, 0.82)';
  ctx.fillRect(imageBoxX, imageBoxY, imageBoxW, imageBoxH);
  ctx.strokeStyle = 'rgba(239, 169, 173, 0.42)';
  ctx.strokeRect(imageBoxX, imageBoxY, imageBoxW, imageBoxH);

  if (characterImage.complete && characterImage.naturalWidth > 0) {
    const padding = 18;
    const maxW = imageBoxW - padding * 2;
    const maxH = imageBoxH - padding * 2;
    const scale = Math.min(maxW / characterImage.naturalWidth, maxH / characterImage.naturalHeight);
    const drawW = characterImage.naturalWidth * scale;
    const drawH = characterImage.naturalHeight * scale;
    const drawX = imageBoxX + (imageBoxW - drawW) / 2;
    const drawY = imageBoxY + (imageBoxH - drawH) / 2;
    ctx.drawImage(characterImage, drawX, drawY, drawW, drawH);
  }

  const storyTitleY = 1160;
  ctx.fillStyle = '#e6b4bd';
  ctx.font = '600 22px Arial';
  ctx.textAlign = 'left';
  ctx.fillText('HISTORIA', 110, storyTitleY);

  const storyBoxX = 110;
  const storyBoxY = 1190;
  const storyBoxW = canvas.width - 220;
  const storyBoxH = 390;
  ctx.fillStyle = 'rgba(255, 244, 240, 0.045)';
  ctx.fillRect(storyBoxX, storyBoxY, storyBoxW, storyBoxH);
  ctx.strokeStyle = 'rgba(244, 220, 224, 0.18)';
  ctx.strokeRect(storyBoxX, storyBoxY, storyBoxW, storyBoxH);

  ctx.fillStyle = '#fff4f0';
  ctx.font = '22px Arial';
  const storyText = state.character.story || 'Sin historia registrada.';
  const storyLines = wrapText(ctx, storyText, storyBoxW - 50);
  storyLines.slice(0, 12).forEach((line, index) => {
    ctx.fillText(line, storyBoxX + 28, storyBoxY + 48 + index * 28);
  });

  const consentTitleY = 1630;
  ctx.fillStyle = '#e6b4bd';
  ctx.font = '600 22px Arial';
  ctx.fillText('CONSENTIMIENTOS', 110, consentTitleY);

  let badgeX = 110;
  let badgeY = 1680;
  let badgeIndex = 0;

  consentEntries.forEach((entry) => {
    const text = `${entry.label}: ${entry.value}`;
    const badgeWidth = Math.max(170, ctx.measureText(text).width + 28);

    if (badgeX + badgeWidth > canvas.width - 110) {
      badgeX = 110;
      badgeY += 54;
    }

    ctx.fillStyle = 'rgba(230, 180, 189, 0.1)';
    ctx.fillRect(badgeX, badgeY, badgeWidth, 42);
    ctx.strokeStyle = 'rgba(230, 180, 189, 0.28)';
    ctx.strokeRect(badgeX, badgeY, badgeWidth, 42);
    ctx.fillStyle = '#fff4f0';
    ctx.font = '500 18px Arial';
    ctx.fillText(text, badgeX + 14, badgeY + 27);

    badgeX += badgeWidth + 14;
    badgeIndex += 1;
  });

  const fileName = `${name.replace(/\s+/g, '_').toLowerCase()}_maledicta.png`;
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = fileName;
  link.href = dataUrl;
  link.click();

  window.__lastCharacterSheetDownload = fileName;
  return true;
};

const renderFinalStep = () => {
  const canConfirm = getProgress() === 100;
  const missingFields = getValidationErrors().map((error) => error.message);
  const confirmed = state.confirmed && canConfirm;
  const confirmedText = confirmed
    ? 'Este personaje ya fue confirmado dentro de Maledicta.'
    : canConfirm
      ? 'Tu personaje ha sido registrado en Maledicta. El registro quedó guardado en este navegador para que puedas revisarlo y confirmar su estado final.'
      : 'Tu ficha aún está incompleta. Completa los datos pendientes antes de confirmar el personaje o descargar la ficha.';
  const missingText = canConfirm
    ? ''
    : `<div class="incomplete-list"><strong>Falta completar:</strong><ul>${missingFields.map((field) => `<li>${escapeHtml(field)}</li>`).join('')}</ul></div>`;

  return `
    <div class="complete-panel">
      <div class="complete-badge ${canConfirm ? '' : 'incomplete'}">${confirmed ? '✦' : canConfirm ? '✓' : '!'}</div>
      <h2>${confirmed ? 'PERSONAJE CONFIRMADO' : canConfirm ? 'REGISTRO COMPLETADO' : 'FICHA INCOMPLETA'}</h2>
      <p>${confirmedText}</p>
      ${missingText}
      <div class="button-row">
        <button class="secondary-btn" type="button" data-action="edit">Editar personaje</button>
        <button class="action-btn" type="button" data-action="confirm" ${canConfirm ? '' : 'disabled'}>${confirmed ? 'Personaje confirmado' : 'Confirmar personaje'}</button>
        <button class="ghost-btn" type="button" data-action="restart">Reiniciar</button>
        <button class="ghost-btn" type="button" data-action="save">Guardar</button>
      </div>
    </div>
  `;
};

const renderStepContent = () => {
  if (state.completed) {
    stepContent.innerHTML = renderFinalStep();
    actionBar.innerHTML = '';
    return;
  }

  const stepId = STEPS[state.currentStep].id;
  let content = '';

  if (stepId === 'identity') content = renderIdentityStep();
  if (stepId === 'story') content = renderStoryStep();
  if (stepId === 'consent') content = renderConsentStep();
  if (stepId === 'image') content = renderImageStep();
  if (stepId === 'review') content = renderReviewStep();

  stepContent.innerHTML = content;
  renderActionBar();
};

const renderActionBar = () => {
  if (state.completed) {
    return;
  }

  const currentIndex = state.currentStep;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === STEPS.length - 1;

  actionBar.innerHTML = `
    <div class="left-group">
      ${isFirst ? '' : '<button class="secondary-btn" type="button" data-action="prev">Anterior</button>'}
    </div>
    <div class="right-group">
      <button class="ghost-btn" type="button" data-action="save">Guardar</button>
      <button class="action-btn" type="button" data-action="${isLast ? 'finish' : 'next'}">${isLast ? 'Finalizar registro' : 'Siguiente'}</button>
    </div>
  `;
};

const saveAndRender = () => {
  persist();
  renderStepNav();
  renderStepContent();
};

const goToStep = (index) => {
  state.currentStep = Math.max(0, Math.min(index, STEPS.length - 1));
  setBanner('');
  saveAndRender();
};

const handleNext = () => {
  if (!validateCurrentStep()) {
    return;
  }

  if (state.currentStep < STEPS.length - 1) {
    state.currentStep += 1;
    saveAndRender();
    return;
  }

  state.completed = true;
  persist();
  renderStepNav();
  renderStepContent();
};

const handleFinish = () => {
  if (!validateCurrentStep()) {
    return;
  }

  state.completed = true;
  persist();
  renderStepNav();
  renderStepContent();
};

const handleInput = (event) => {
  const { name, value } = event.target;
  if (!name || event.target.matches('select')) return;

  if (name === 'story') {
    state.character.story = value;
    persist();
    renderStepNav();

    const counter = event.target.closest('.codex-panel')?.querySelector('.char-counter');
    if (counter) {
      counter.textContent = `${value.length}/1500`;
    }
    return;
  }

  if (name === 'age') {
    const cleanValue = value.replace(/[^\d]/g, '').slice(0, 5);
    state.character.age = cleanValue;
    event.target.value = cleanValue;
  } else {
    state.character[name] = value;
  }

  persist();
  renderStepNav();
};

const handleSelectChange = (event) => {
  const select = event.target.closest('select');
  if (!select) return;

  const { name, value } = select;
  if (!name || !(name in state.character)) return;

  state.character[name] = value;
  persist();
  renderStepNav();
  renderStepContent();
};

const handleImageFile = async (file) => {
  state.character.imageError = '';
  const allowedTypes = ['image/png', 'image/jpeg'];
  if (!file || !allowedTypes.includes(file.type)) {
    state.character.imageError = 'Formato no permitido. Usa una imagen PNG, JPG o JPEG real.';
    renderStepContent();
    return;
  }
  if (file.size > 10 * 1024 * 1024) {
    state.character.imageError = 'La imagen supera el tamaño máximo de 10 MB.';
    renderStepContent();
    return;
  }

  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  const imageElement = new Image();
  imageElement.src = dataUrl;
  await new Promise((resolve, reject) => {
    imageElement.onload = resolve;
    imageElement.onerror = reject;
  }).catch(() => {
    state.character.imageError = 'No se pudo leer la imagen. El archivo podría estar dañado.';
  });
  if (state.character.imageError) {
    renderStepContent();
    return;
  }
  if (imageElement.naturalWidth < 512 || imageElement.naturalHeight < 512) {
    state.character.imageError = 'La resolución mínima es de 512 × 512 píxeles.';
    renderStepContent();
    return;
  }

  state.character.image = {
    dataUrl,
    name: file.name,
    size: file.size,
    width: imageElement.naturalWidth,
    height: imageElement.naturalHeight,
    uploadedAt: new Date().toISOString()
  };
  persist();
  setBanner('');
  renderStepNav();
  renderStepContent();
};

const removeImage = () => {
  state.character.image = defaultCharacter().image;
  state.character.imageError = '';
  persist();
  setBanner('La imagen fue eliminada. Debes cargar otra para continuar.');
  renderStepNav();
  renderStepContent();
};

const handleOptionSelect = (event) => {
  const button = event.target.closest('[data-field]');
  if (!button) return;

  const field = button.dataset.field;
  if (field === 'consent') {
    state.character.consent[button.dataset.category] = button.dataset.value;
    persist();
    renderStepContent();
    return;
  }

  state.character[field] = button.dataset.value;
  persist();
  renderStepContent();
};

const handleAction = (event) => {
  const actionBtn = event.target.closest('[data-action]');
  if (!actionBtn) return;

  const action = actionBtn.dataset.action;

  if (action === 'next') {
    handleNext();
  }

  if (action === 'finish') {
    handleFinish();
  }

  if (action === 'prev') {
    goToStep(state.currentStep - 1);
  }

  if (action === 'save') {
    persist();
    setBanner('El personaje quedó guardado en este navegador.');
    renderStepContent();
    renderStepNav();
  }

  if (action === 'remove-image') {
    removeImage();
  }

  if (action === 'edit') {
    state.completed = false;
    state.currentStep = 0;
    state.confirmed = false;
    setBanner('');
    saveAndRender();
  }

  if (action === 'confirm') {
    if (getProgress() < 100) {
      setBanner('Completa todos los campos y consentimientos antes de confirmar el personaje.');
      renderStepContent();
      renderStepNav();
      return;
    }

    state.confirmed = true;
    persist();
    downloadCharacterSheet();
    setBanner('Tu personaje ha sido confirmado dentro de Maledicta.');
    renderStepContent();
    renderStepNav();
  }

  if (action === 'restart') {
    state = {
      ...baseState,
      character: defaultCharacter()
    };
    clearState();
    setBanner('Se reinició la creación del personaje.');
    saveAndRender();
  }
};

const bindEvents = () => {
  stepNav.addEventListener('click', (event) => {
    const button = event.target.closest('[data-step-index]');
    if (!button) return;
    const index = Number(button.dataset.stepIndex);
    if (index <= state.currentStep) {
      goToStep(index);
      return;
    }
    if (index === state.currentStep + 1 && validateCurrentStep()) {
      goToStep(index);
    }
  });

  stepContent.addEventListener('input', handleInput);
  stepContent.addEventListener('change', handleSelectChange);
  stepContent.addEventListener('click', handleAction);
  stepContent.addEventListener('click', handleOptionSelect);
  stepContent.addEventListener('change', (event) => {
    if (event.target.id === 'character-image-input') handleImageFile(event.target.files[0]);
  });
  stepContent.addEventListener('dragover', (event) => {
    if (event.target.closest('[data-drop-zone]')) event.preventDefault();
  });
  stepContent.addEventListener('drop', (event) => {
    const zone = event.target.closest('[data-drop-zone]');
    if (!zone) return;
    event.preventDefault();
    handleImageFile(event.dataTransfer.files[0]);
  });
  actionBar.addEventListener('click', handleAction);
};

const initialize = () => {
  bindEvents();
  renderStepNav();
  renderStepContent();
};

initialize();
