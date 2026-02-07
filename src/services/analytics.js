import resultService from './results';
import { CATEGORIES } from '../utils/constants';

const analyticsService = {
  getSummary(userId) {
    const results = resultService.getAll(userId);

    if (results.length === 0) {
      return {
        totalExams: 0,
        averageScore: 0,
        passRate: 0,
        totalQuestions: 0,
        correctAnswers: 0,
        bestScore: 0,
        worstScore: 0,
        streak: 0,
      };
    }

    const totalExams = results.length;
    const avgScore = Math.round(results.reduce((sum, r) => sum + r.percentage, 0) / totalExams);
    const passCount = results.filter(r => r.passed).length;
    const totalQuestions = results.reduce((sum, r) => sum + r.total, 0);
    const correctAnswers = results.reduce((sum, r) => sum + r.score, 0);

    let streak = 0;
    for (const r of results) {
      if (r.passed) streak++;
      else break;
    }

    return {
      totalExams,
      averageScore: avgScore,
      passRate: Math.round((passCount / totalExams) * 100),
      totalQuestions,
      correctAnswers,
      bestScore: Math.max(...results.map(r => r.percentage)),
      worstScore: Math.min(...results.map(r => r.percentage)),
      streak,
    };
  },

  getScoreTrend(userId, limit = 20) {
    const results = resultService.getAll(userId).slice(0, limit).reverse();
    return results.map(r => ({
      date: r.createdAt,
      score: r.percentage,
      passed: r.passed,
      examType: r.examType,
    }));
  },

  getCategoryPerformance(userId) {
    const results = resultService.getAll(userId);
    const categoryData = {};

    CATEGORIES.forEach(cat => {
      categoryData[cat] = { correct: 0, total: 0, percentage: 0 };
    });

    results.forEach(r => {
      if (r.categoryBreakdown) {
        Object.entries(r.categoryBreakdown).forEach(([cat, data]) => {
          if (categoryData[cat]) {
            categoryData[cat].correct += data.correct;
            categoryData[cat].total += data.total;
          }
        });
      }
    });

    Object.keys(categoryData).forEach(cat => {
      const d = categoryData[cat];
      d.percentage = d.total > 0 ? Math.round((d.correct / d.total) * 100) : 0;
    });

    return categoryData;
  },

  getWeakCategories(userId) {
    const catPerf = this.getCategoryPerformance(userId);
    return Object.entries(catPerf)
      .filter(([, data]) => data.total > 0)
      .sort((a, b) => a[1].percentage - b[1].percentage)
      .slice(0, 3)
      .map(([category, data]) => ({ category, ...data }));
  },

  getStrongCategories(userId) {
    const catPerf = this.getCategoryPerformance(userId);
    return Object.entries(catPerf)
      .filter(([, data]) => data.total > 0)
      .sort((a, b) => b[1].percentage - a[1].percentage)
      .slice(0, 3)
      .map(([category, data]) => ({ category, ...data }));
  },

  getDifficultyBreakdown(userId) {
    const results = resultService.getAll(userId);
    const breakdown = { easy: { correct: 0, total: 0 }, medium: { correct: 0, total: 0 }, hard: { correct: 0, total: 0 } };

    results.forEach(r => {
      r.questions?.forEach(q => {
        const diff = q.difficulty || 'medium';
        if (breakdown[diff]) {
          breakdown[diff].total++;
          if (q.isCorrect) breakdown[diff].correct++;
        }
      });
    });

    Object.keys(breakdown).forEach(d => {
      breakdown[d].percentage = breakdown[d].total > 0
        ? Math.round((breakdown[d].correct / breakdown[d].total) * 100)
        : 0;
    });

    return breakdown;
  },

  getRecentActivity(userId, limit = 10) {
    return resultService.getAll(userId).slice(0, limit).map(r => ({
      id: r.id,
      examType: r.examType,
      category: r.category,
      score: r.percentage,
      passed: r.passed,
      questionsCount: r.total,
      date: r.createdAt,
    }));
  },
};

export default analyticsService;
