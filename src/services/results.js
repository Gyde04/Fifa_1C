import storage from './storage';
import { STORAGE_KEYS } from '../utils/constants';

const resultService = {
  saveResult(result) {
    const results = storage.get(STORAGE_KEYS.RESULTS) || [];
    results.unshift(result);
    storage.set(STORAGE_KEYS.RESULTS, results);
    return result;
  },

  getAll(userId) {
    const results = storage.get(STORAGE_KEYS.RESULTS) || [];
    return userId ? results.filter(r => r.userId === userId) : results;
  },

  getById(resultId) {
    const results = storage.get(STORAGE_KEYS.RESULTS) || [];
    return results.find(r => r.id === resultId) || null;
  },

  getRecent(userId, limit = 5) {
    return this.getAll(userId).slice(0, limit);
  },

  deleteResult(resultId) {
    let results = storage.get(STORAGE_KEYS.RESULTS) || [];
    results = results.filter(r => r.id !== resultId);
    storage.set(STORAGE_KEYS.RESULTS, results);
    return true;
  },

  clearAll(userId) {
    if (userId) {
      let results = storage.get(STORAGE_KEYS.RESULTS) || [];
      results = results.filter(r => r.userId !== userId);
      storage.set(STORAGE_KEYS.RESULTS, results);
    } else {
      storage.set(STORAGE_KEYS.RESULTS, []);
    }
  },
};

export default resultService;
