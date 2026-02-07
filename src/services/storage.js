import { STORAGE_KEYS } from '../utils/constants';

const storage = {
  get(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  clear() {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
  },
};

export function initializeStorage() {
  if (!storage.get(STORAGE_KEYS.USERS)) {
    storage.set(STORAGE_KEYS.USERS, [
      {
        id: 'admin-001',
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@pitchready.com',
        password: 'Admin123!',
        role: 'admin',
        createdAt: new Date('2024-01-01').toISOString(),
      },
      {
        id: 'demo-001',
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@pitchready.com',
        password: 'Demo123!',
        role: 'user',
        createdAt: new Date('2024-06-01').toISOString(),
      },
    ]);
  }

  if (!storage.get(STORAGE_KEYS.RESULTS)) {
    storage.set(STORAGE_KEYS.RESULTS, []);
  }

  if (!storage.get(STORAGE_KEYS.FLAGGED)) {
    storage.set(STORAGE_KEYS.FLAGGED, []);
  }
}

export default storage;
