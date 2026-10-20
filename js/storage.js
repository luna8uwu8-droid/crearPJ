const STORAGE_KEY = 'maledicta-character-builder-v2';
const IMAGE_DB = 'maledicta-images';
const IMAGE_STORE = 'character-image';
const BOSS_GALLERY_STORE = 'boss-gallery';

const openImageDb = () => new Promise((resolve, reject) => {
  const request = indexedDB.open(IMAGE_DB, 2);
  request.onupgradeneeded = () => {
    const db = request.result;
    if (!db.objectStoreNames.contains(IMAGE_STORE)) {
      db.createObjectStore(IMAGE_STORE);
    }
    if (!db.objectStoreNames.contains(BOSS_GALLERY_STORE)) {
      const store = db.createObjectStore(BOSS_GALLERY_STORE, { keyPath: 'id' });
      store.createIndex('bossId', 'bossId', { unique: false });
    }
  };
  request.onsuccess = () => resolve(request.result);
  request.onerror = () => reject(request.error);
});

export const saveImageBlob = async (dataUrl) => {
  try {
    const db = await openImageDb();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(IMAGE_STORE, 'readwrite');
      tx.objectStore(IMAGE_STORE).put(dataUrl, 'current');
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });
    db.close();
    return true;
  } catch (error) {
    console.warn('No se pudo guardar la imagen en IndexedDB:', error);
    return false;
  }
};

export const loadImageBlob = async () => {
  try {
    const db = await openImageDb();
    const dataUrl = await new Promise((resolve, reject) => {
      const tx = db.transaction(IMAGE_STORE, 'readonly');
      const request = tx.objectStore(IMAGE_STORE).get('current');
      request.onsuccess = () => resolve(request.result ?? null);
      request.onerror = () => reject(request.error);
    });
    db.close();
    return dataUrl;
  } catch (error) {
    console.warn('No se pudo cargar la imagen desde IndexedDB:', error);
    return null;
  }
};

export const clearImageBlob = async () => {
  try {
    const db = await openImageDb();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(IMAGE_STORE, 'readwrite');
      tx.objectStore(IMAGE_STORE).delete('current');
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  } catch (error) {
    console.warn('No se pudo limpiar la imagen:', error);
  }
};

export const loadBossGalleryImages = async () => {
  const db = await openImageDb();
  const records = await new Promise((resolve, reject) => {
    const tx = db.transaction(BOSS_GALLERY_STORE, 'readonly');
    const request = tx.objectStore(BOSS_GALLERY_STORE).getAll();
    request.onsuccess = () => resolve(request.result ?? []);
    request.onerror = () => reject(request.error);
  });
  db.close();
  return records;
};

export const saveBossGalleryImage = async (record) => {
  const db = await openImageDb();
  await new Promise((resolve, reject) => {
    const tx = db.transaction(BOSS_GALLERY_STORE, 'readwrite');
    tx.objectStore(BOSS_GALLERY_STORE).put(record);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
  db.close();
};

export const deleteBossGalleryImage = async (id) => {
  const db = await openImageDb();
  await new Promise((resolve, reject) => {
    const tx = db.transaction(BOSS_GALLERY_STORE, 'readwrite');
    tx.objectStore(BOSS_GALLERY_STORE).delete(id);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
  db.close();
};

const migrateLegacyState = (legacy) => {
  if (!legacy || legacy.version === 2) return legacy;

  const character = {
    name: legacy.character?.name ?? '',
    age: legacy.character?.age ?? '',
    sex: '',
    origin: '',
    height: '',
    distinctiveFeatures: '',
    physicalDescription: legacy.character?.story ?? '',
    ethnicity: '',
    ethnicityDetail: '',
    imageStatus: legacy.character?.image?.dataUrl ? 'valid' : 'missing',
    imageError: '',
    image: legacy.character?.image ?? {
      dataUrl: null,
      name: null,
      size: null,
      width: null,
      height: null,
      uploadedAt: null,
      serverValidated: false
    },
    validationCode: null,
    sheetGeneratedAt: null,
    lastEditedAt: null
  };

  return {
    version: 2,
    phase: legacy.completed ? 'hub' : 'welcome',
    creationStep: 0,
    hubSection: legacy.completed ? 'mi-personaje' : 'inicio',
    characterComplete: Boolean(legacy.completed || legacy.confirmed),
    sheetDelivered: Boolean(legacy.confirmed),
    acceptances: { lore: false, rules: false, conditions: false },
    character,
    banner: ''
  };
};

export const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return migrateLegacyState(JSON.parse(raw));
    }

    const legacyRaw = localStorage.getItem('maledicta-character-builder');
    if (legacyRaw) {
      const migrated = migrateLegacyState(JSON.parse(legacyRaw));
      saveState(migrated);
      return migrated;
    }

    return null;
  } catch (error) {
    console.warn('No se pudo cargar el estado:', error);
    return null;
  }
};

export const saveState = (state) => {
  try {
    const payload = { ...state, version: 2 };
    const { character, ...rest } = payload;
    const imageMeta = character.image;
    const slimCharacter = {
      ...character,
      image: imageMeta?.dataUrl
        ? { ...imageMeta, dataUrl: null }
        : imageMeta
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...rest, character: slimCharacter }));

    if (imageMeta?.dataUrl) {
      saveImageBlob(imageMeta.dataUrl);
    }

    return true;
  } catch (error) {
    console.warn('No se pudo guardar el estado:', error);
    return false;
  }
};

export const hydrateImage = async (state) => {
  if (state?.character?.image?.dataUrl) return state;
  const dataUrl = await loadImageBlob();
  if (dataUrl && state?.character) {
    state.character.image = { ...state.character.image, dataUrl };
  }
  return state;
};

export const clearState = async () => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem('maledicta-character-builder');
  await clearImageBlob();
};
