import { createContext, useState, useCallback, useRef } from 'react';
import examService from '../services/exams';

export const ExamContext = createContext(null);

export default function ExamProvider({ children }) {
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const startTimeRef = useRef(null);

  const startExam = useCallback((examType, options = {}) => {
    const newExam = examService.startExam(examType, options);
    setExam(newExam);
    setAnswers({});
    setFlagged(new Set());
    setCurrentIndex(0);
    startTimeRef.current = Date.now();
    return newExam;
  }, []);

  const selectAnswer = useCallback((questionId, answerId) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerId }));
  }, []);

  const toggleFlag = useCallback((questionId) => {
    setFlagged(prev => {
      const next = new Set(prev);
      if (next.has(questionId)) next.delete(questionId);
      else next.add(questionId);
      return next;
    });
  }, []);

  const goToQuestion = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  const nextQuestion = useCallback(() => {
    if (exam && currentIndex < exam.questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [exam, currentIndex]);

  const prevQuestion = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  const submitExam = useCallback(async (userId) => {
    if (!exam) throw new Error('No active exam');
    setIsSubmitting(true);
    try {
      const timeTaken = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const result = examService.submitExam(exam.id, answers, userId, timeTaken);
      setExam(null);
      setAnswers({});
      setFlagged(new Set());
      setCurrentIndex(0);
      startTimeRef.current = null;
      return result;
    } finally {
      setIsSubmitting(false);
    }
  }, [exam, answers]);

  const cancelExam = useCallback(() => {
    examService.clearBackup();
    setExam(null);
    setAnswers({});
    setFlagged(new Set());
    setCurrentIndex(0);
    startTimeRef.current = null;
  }, []);

  const currentQuestion = exam?.questions[currentIndex] || null;
  const answeredCount = Object.keys(answers).length;
  const totalQuestions = exam?.questions.length || 0;
  const progress = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  const value = {
    exam,
    answers,
    flagged,
    currentIndex,
    currentQuestion,
    answeredCount,
    totalQuestions,
    progress,
    isSubmitting,
    startExam,
    selectAnswer,
    toggleFlag,
    goToQuestion,
    nextQuestion,
    prevQuestion,
    submitExam,
    cancelExam,
  };

  return (
    <ExamContext.Provider value={value}>
      {children}
    </ExamContext.Provider>
  );
}
