import { createServer } from 'node:http';
import { createReadStream, promises as fs } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import Busboy from 'busboy';

const root = fileURLToPath(new URL('.', import.meta.url));
const port = process.env.PORT || 4173;
const maxBytes = 10 * 1024 * 1024;
const allowedMime = new Set(['image/png', 'image/jpeg']);

const readUpload = (request) => new Promise((resolve, reject) => {
  const contentType = request.headers['content-type'] || '';
  if (!contentType.startsWith('multipart/form-data')) return reject(new Error('FORMATO_MULTIPART'));
  const busboy = Busboy({ headers: request.headers, limits: { fileSize: maxBytes, files: 1 } });
  let upload = null;
  let tooLarge = false;
  busboy.on('file', (fieldName, stream, info) => {
    if (fieldName !== 'image') return stream.resume();
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('limit', () => { tooLarge = true; });
    stream.on('end', () => { upload = { buffer: Buffer.concat(chunks), mime: info.mimeType, name: info.filename }; });
  });
  busboy.on('finish', () => tooLarge ? reject(new Error('TAMANO')) : upload ? resolve(upload) : reject(new Error('FALTA_IMAGEN')));
  busboy.on('error', reject);
  request.pipe(busboy);
});

const getDimensions = (buffer, mime) => {
  if (mime === 'image/png' && buffer.length > 24 && buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }
  if (mime === 'image/jpeg' && buffer.subarray(0, 2).equals(Buffer.from([255, 216]))) {
    let offset = 2;
    while (offset + 9 < buffer.length) {
      if (buffer[offset] !== 255) { offset += 1; continue; }
      const marker = buffer[offset + 1];
      const length = buffer.readUInt16BE(offset + 2);
      if ([192, 193, 194, 195, 216].includes(marker) && offset + 8 < buffer.length) {
        return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
      }
      offset += 2 + length;
    }
  }
  return null;
};

const validateUpload = ({ buffer, mime, name }) => {
  const dimensions = getDimensions(buffer, mime);
  if (!allowedMime.has(mime) || !dimensions) throw new Error('IMAGEN_INVALIDA');
  if (dimensions.width < 512 || dimensions.height < 512) throw new Error('RESOLUCION');
  return { nombreArchivo: name, tamano: buffer.length, dimensiones: dimensions, fechaSubida: new Date().toISOString() };
};

const sendJson = (response, status, body) => {
  response.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*' });
  response.end(JSON.stringify(body));
};

const server = createServer(async (request, response) => {
  if (request.method === 'POST' && request.url === '/api/analyze-image') {
    try {
      const upload = await readUpload(request);
      return sendJson(response, 200, validateUpload(upload));
    } catch (error) {
      const messages = { TAMANO: 'La imagen supera el tamaño máximo de 10 MB.', RESOLUCION: 'La resolución mínima es de 512 × 512 píxeles.', IMAGEN_INVALIDA: 'El contenido no es una imagen PNG o JPEG válida.' };
      return sendJson(response, 400, { error: messages[error.message] || 'No se pudo validar la imagen.' });
    }
  }
  if (request.method !== 'GET') return sendJson(response, 405, { error: 'Método no permitido.' });
  const requested = request.url === '/' ? '/index.html' : request.url.split('?')[0];
  const safePath = normalize(requested).replace(/^([.][.][/\\])+/, '');
  const filePath = join(root, safePath);
  try {
    const stat = await fs.stat(filePath);
    if (!stat.isFile()) throw new Error('not-file');
    const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg' };
    response.writeHead(200, { 'content-type': `${types[extname(filePath)] || 'application/octet-stream'}; charset=utf-8` });
    createReadStream(filePath).pipe(response);
  } catch { sendJson(response, 404, { error: 'No encontrado.' }); }
});

server.listen(port, () => console.log(`Maledicta disponible en http://localhost:${port}`));
