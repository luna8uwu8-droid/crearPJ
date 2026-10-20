const wrapText = (ctx, text, maxWidth) => {
  const words = String(text).split(' ');
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine) lines.push(currentLine);
  return lines;
};

const drawPanel = (ctx, x, y, w, h) => {
  ctx.fillStyle = 'rgba(255, 244, 240, 0.045)';
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = 'rgba(244, 220, 224, 0.18)';
  ctx.strokeRect(x, y, w, h);
};

export const generateValidationCode = () => {
  const segment = () => Math.random().toString(36).slice(2, 6).toUpperCase();
  return `MAL-${segment()}-${segment()}`;
};

export const downloadCharacterSheet = async (character, validationCode) => {
  const canvas = document.createElement('canvas');
  canvas.width = 1400;
  canvas.height = 2100;
  const ctx = canvas.getContext('2d');

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
  ctx.font = 'bold 72px Georgia';
  ctx.textAlign = 'center';
  ctx.fillText('MALEDICTA', canvas.width / 2, 150);

  ctx.fillStyle = '#e6b4bd';
  ctx.font = '600 24px Arial';
  ctx.fillText('REGISTRO DE PERSONAJE', canvas.width / 2, 195);
  if (character.lastEditedAt) {
    ctx.font = '600 18px Arial';
    ctx.fillText(`FICHA EDITADA: ${formatSheetDate(character.lastEditedAt)}`, canvas.width / 2, 225);
  }

  const logo = new Image();
  logo.src = './assets/maledicta-logo.png';
  await new Promise((resolve) => {
    logo.onload = resolve;
    logo.onerror = resolve;
  });

  if (logo.complete && logo.naturalWidth > 0) {
    const logoSize = 120;
    ctx.drawImage(logo, canvas.width / 2 - logoSize / 2, 215, logoSize, logoSize);
  }

  const summary = [
    ['Nombre', character.name || 'No definido'],
    ['Edad', character.age || 'No definida'],
    ['Sexo / Género', character.sex || 'No definido'],
    ['Origen', character.origin || 'No especificado'],
    ['Raza', character.ethnicity || 'No definida'],
    ['Altura', character.height || 'No definida']
  ];

  const cardX = 100;
  const cardY = 360;
  const cardW = canvas.width - 200;
  const itemW = cardW / 2 - 14;
  const itemH = 96;

  summary.forEach(([label, value], index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const x = cardX + col * (itemW + 14);
    const y = cardY + row * (itemH + 14);
    drawPanel(ctx, x, y, itemW, itemH);
    ctx.fillStyle = '#d0b7bd';
    ctx.font = '600 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(label.toUpperCase(), x + 18, y + 30);
    ctx.fillStyle = '#fff4f0';
    ctx.font = '600 26px Arial';
    wrapText(ctx, value, itemW - 28).slice(0, 2).forEach((line, i) => {
      ctx.fillText(line, x + 18, y + 62 + i * 24);
    });
  });

  const imageBoxY = 780;
  ctx.fillStyle = '#e6b4bd';
  ctx.font = '600 20px Arial';
  ctx.fillText('IMAGEN DEL PERSONAJE', 100, imageBoxY);

  const imageBox = { x: 100, y: imageBoxY + 20, w: canvas.width - 200, h: 300 };
  ctx.fillStyle = 'rgba(48, 21, 35, 0.82)';
  ctx.fillRect(imageBox.x, imageBox.y, imageBox.w, imageBox.h);
  ctx.strokeStyle = 'rgba(239, 169, 173, 0.42)';
  ctx.strokeRect(imageBox.x, imageBox.y, imageBox.w, imageBox.h);

  if (character.image?.dataUrl) {
    const characterImage = new Image();
    characterImage.src = character.image.dataUrl;
    await new Promise((resolve) => {
      characterImage.onload = resolve;
      characterImage.onerror = resolve;
    });
    if (characterImage.complete && characterImage.naturalWidth > 0) {
      const padding = 16;
      const maxW = imageBox.w - padding * 2;
      const maxH = imageBox.h - padding * 2;
      const scale = Math.min(maxW / characterImage.naturalWidth, maxH / characterImage.naturalHeight);
      const drawW = characterImage.naturalWidth * scale;
      const drawH = characterImage.naturalHeight * scale;
      ctx.drawImage(
        characterImage,
        imageBox.x + (imageBox.w - drawW) / 2,
        imageBox.y + (imageBox.h - drawH) / 2,
        drawW,
        drawH
      );
    }
  }

  const descY = 1120;
  ctx.fillStyle = '#e6b4bd';
  ctx.font = '600 20px Arial';
  ctx.fillText('DESCRIPCIÓN FÍSICA', 100, descY);

  const descBox = { x: 100, y: descY + 20, w: canvas.width - 200, h: 280 };
  drawPanel(ctx, descBox.x, descBox.y, descBox.w, descBox.h);
  ctx.fillStyle = '#fff4f0';
  ctx.font = '20px Arial';
  const physical = [
    character.distinctiveFeatures ? `Rasgos: ${character.distinctiveFeatures}` : '',
    character.physicalDescription || 'Sin descripción registrada.'
  ].filter(Boolean).join('\n\n');
  wrapText(ctx, physical, descBox.w - 40).slice(0, 10).forEach((line, i) => {
    ctx.fillText(line, descBox.x + 22, descBox.y + 36 + i * 26);
  });

  const codeY = 1450;
  ctx.fillStyle = '#e6b4bd';
  ctx.font = '600 20px Arial';
  ctx.fillText('CÓDIGO DE VALIDACIÓN', 100, codeY);

  drawPanel(ctx, 100, codeY + 20, canvas.width - 200, 80);
  ctx.fillStyle = '#ffe9df';
  ctx.font = 'bold 36px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(validationCode || 'PENDIENTE', canvas.width / 2, codeY + 72);

  ctx.textAlign = 'left';
  ctx.fillStyle = '#a1828e';
  ctx.font = '16px Arial';
  ctx.fillText('Presenta esta ficha en el ticket de validación de Discord.', 100, codeY + 140);

  const fileName = `${(character.name || 'personaje').replace(/\s+/g, '_').toLowerCase()}_maledicta.png`;
  const link = document.createElement('a');
  link.download = fileName;
  link.href = canvas.toDataURL('image/png');
  link.click();

  return fileName;
};

const formatSheetDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'fecha no disponible';
  return new Intl.DateTimeFormat('es-ES', { dateStyle: 'long', timeStyle: 'short' }).format(date);
};

export const printCharacterSheet = () => {
  window.print();
};
