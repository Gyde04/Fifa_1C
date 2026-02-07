import allQuestions from '../data/questions';
import { shuffleArray } from '../utils/formatters';

const questionService = {
  getAll() {
    return allQuestions.filter(q => q.isActive);
  },

  getById(id) {
    return allQuestions.find(q => q.id === id) || null;
  },

  getByCategory(category) {
    return allQuestions.filter(q => q.isActive && q.category === category);
  },

  getRandom(count, options = {}) {
    let pool = this.getAll();

    if (options.category) {
      pool = pool.filter(q => q.category === options.category);
    }
    if (options.difficulty) {
      pool = pool.filter(q => q.difficulty === options.difficulty);
    }
    if (options.excludeIds?.length) {
      pool = pool.filter(q => !options.excludeIds.includes(q.id));
    }

    const shuffled = shuffleArray(pool);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  },

  getCategoryCounts() {
    const counts = {};
    this.getAll().forEach(q => {
      counts[q.category] = (counts[q.category] || 0) + 1;
    });
    return counts;
  },

  search(query) {
    const lower = query.toLowerCase();
    return this.getAll().filter(
      q => q.questionText.toLowerCase().includes(lower) ||
           q.explanation.toLowerCase().includes(lower) ||
           q.category.toLowerCase().includes(lower)
    );
  },

  getTotalCount() {
    return this.getAll().length;
  },
};

export default questionService;
