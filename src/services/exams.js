import questionService from './questions';
import resultService from './results';
import storage from './storage';
import { STORAGE_KEYS, EXAM_CONFIGS, PASSING_SCORE } from '../utils/constants';
import { generateId } from '../utils/formatters';

const examService = {
  startExam(examType, options = {}) {
    const config = EXAM_CONFIGS[examType];
    const count = options.questionCount || config.questions;
    const timeLimit = config.timeLimit;

    const questions = questionService.getRandom(count, {
      category: options.category,
      difficulty: options.difficulty,
    });

    if (questions.length === 0) {
      throw new Error('No questions available for the selected criteria');
    }

    const examQuestions = questions.map(q => ({
      id: q.id,
      questionText: q.questionText,
      options: q.options,
      category: q.category,
      difficulty: q.difficulty,
      lawReference: q.lawReference,
    }));

    const exam = {
      id: generateId(),
      examType,
      category: options.category || null,
      questions: examQuestions,
      timeLimit,
      startedAt: new Date().toISOString(),
    };

    storage.set(STORAGE_KEYS.EXAM_BACKUP, exam);
    return exam;
  },

  submitExam(examId, answers, userId, timeTaken) {
    const backup = storage.get(STORAGE_KEYS.EXAM_BACKUP);
    if (!backup || backup.id !== examId) {
      throw new Error('Exam session not found');
    }

    const scoredQuestions = backup.questions.map(eq => {
      const fullQuestion = questionService.getById(eq.id);
      const selectedAnswer = answers[eq.id] || null;
      return {
        questionId: eq.id,
        questionText: eq.questionText,
        options: eq.options,
        category: eq.category,
        difficulty: eq.difficulty,
        selectedAnswer,
        correctAnswer: fullQuestion?.correctAnswer || 'A',
        explanation: fullQuestion?.explanation || '',
        lawReference: eq.lawReference,
        isCorrect: selectedAnswer === fullQuestion?.correctAnswer,
      };
    });

    const correct = scoredQuestions.filter(q => q.isCorrect).length;
    const total = scoredQuestions.length;
    const percentage = Math.round((correct / total) * 100);

    const categoryBreakdown = {};
    scoredQuestions.forEach(q => {
      if (!categoryBreakdown[q.category]) {
        categoryBreakdown[q.category] = { correct: 0, total: 0 };
      }
      categoryBreakdown[q.category].total++;
      if (q.isCorrect) categoryBreakdown[q.category].correct++;
    });

    const result = {
      id: generateId(),
      userId,
      examType: backup.examType,
      category: backup.category,
      questions: scoredQuestions,
      score: correct,
      total,
      percentage,
      passed: percentage >= PASSING_SCORE,
      timeTaken,
      categoryBreakdown,
      createdAt: new Date().toISOString(),
    };

    resultService.saveResult(result);
    storage.remove(STORAGE_KEYS.EXAM_BACKUP);
    return result;
  },

  getBackup() {
    return storage.get(STORAGE_KEYS.EXAM_BACKUP);
  },

  clearBackup() {
    storage.remove(STORAGE_KEYS.EXAM_BACKUP);
  },
};

export default examService;
