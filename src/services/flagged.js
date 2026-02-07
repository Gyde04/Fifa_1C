import storage from './storage';
import { STORAGE_KEYS } from '../utils/constants';
import questionService from './questions';

const flaggedService = {
  getAll(userId) {
    const flagged = storage.get(STORAGE_KEYS.FLAGGED) || [];
    const userFlagged = userId ? flagged.filter(f => f.userId === userId) : flagged;

    return userFlagged.map(f => ({
      ...f,
      question: questionService.getById(f.questionId),
    })).filter(f => f.question);
  },

  isFlagged(userId, questionId) {
    const flagged = storage.get(STORAGE_KEYS.FLAGGED) || [];
    return flagged.some(f => f.userId === userId && f.questionId === questionId);
  },

  flag(userId, questionId, note = '') {
    const flagged = storage.get(STORAGE_KEYS.FLAGGED) || [];

    if (flagged.some(f => f.userId === userId && f.questionId === questionId)) {
      return false;
    }

    flagged.push({
      userId,
      questionId,
      note,
      flaggedAt: new Date().toISOString(),
    });

    storage.set(STORAGE_KEYS.FLAGGED, flagged);
    return true;
  },

  unflag(userId, questionId) {
    let flagged = storage.get(STORAGE_KEYS.FLAGGED) || [];
    flagged = flagged.filter(f => !(f.userId === userId && f.questionId === questionId));
    storage.set(STORAGE_KEYS.FLAGGED, flagged);
    return true;
  },

  toggleFlag(userId, questionId) {
    if (this.isFlagged(userId, questionId)) {
      this.unflag(userId, questionId);
      return false;
    } else {
      this.flag(userId, questionId);
      return true;
    }
  },
};

export default flaggedService;
