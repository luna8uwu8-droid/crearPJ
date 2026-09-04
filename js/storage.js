const STORAGE_KEY = 'maledicta-character-builder';

export const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn('No se pudo cargar el estado del personaje:', error);
    return null;
  }
};

export const saveState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch (error) {
    console.warn('No se pudo guardar el estado del personaje:', error);
    return false;
  }
};

export const clearState = () => {
  localStorage.removeItem(STORAGE_KEY);
};
