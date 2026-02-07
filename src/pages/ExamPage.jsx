import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock, ArrowRight, ArrowLeft, ChevronLeft, ChevronRight,
  List, X, Send,
} from 'lucide-react';
import Card, { CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import ProgressBar from '../components/ui/ProgressBar';
import QuestionCard from '../components/questions/QuestionCard';
import Timer from '../components/exam/Timer';
import ExamNavPanel from '../components/exam/ExamNavPanel';
import SubmitConfirmModal from '../components/exam/SubmitConfirmModal';
import useAuth from '../hooks/useAuth';
import useExam from '../hooks/useExam';
import useTimer from '../hooks/useTimer';
import { CATEGORIES, EXAM_CONFIGS } from '../utils/constants';
import toast from 'react-hot-toast';

export default function ExamPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    exam, answers, flagged, currentIndex, currentQuestion,
    answeredCount, totalQuestions, progress, isSubmitting,
    startExam, selectAnswer, toggleFlag,
    goToQuestion, nextQuestion, prevQuestion, submitExam, cancelExam,
  } = useExam();

  const [mode, setMode] = useState('setup');
  const [examType, setExamType] = useState('mock');
  const [category, setCategory] = useState('');
  const [showNav, setShowNav] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleAutoSubmit = useCallback(async () => {
    if (!exam || !user) return;
    try {
      const result = await submitExam(user.id);
      toast('Time is up! Exam auto-submitted.', { icon: '⏰' });
      navigate(`/results/${result.id}`);
    } catch { /* ignore */ }
  }, [exam, user, submitExam, navigate]);

  const timer = useTimer(exam?.timeLimit || 0, {
    onExpire: handleAutoSubmit,
    autoStart: false,
  });

  const handleStart = () => {
    try {
      const opts = {};
      if (examType === 'category' && category) opts.category = category;
      const newExam = startExam(examType, opts);
      if (newExam.timeLimit) {
        timer.reset(newExam.timeLimit);
        setTimeout(() => timer.start(), 100);
      }
      setMode('exam');
    } catch (err) {
      toast.error(err.message || 'Failed to start exam');
    }
  };

  const handleSubmit = async () => {
    if (!user) return;
    try {
      const result = await submitExam(user.id);
      setShowConfirm(false);
      setMode('setup');
      toast.success(result.passed ? 'Congratulations! You passed!' : 'Exam submitted.');
      navigate(`/results/${result.id}`);
    } catch (err) {
      toast.error('Failed to submit exam');
    }
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to quit? Your progress will be lost.')) {
      cancelExam();
      setMode('setup');
    }
  };

  useEffect(() => {
    if (mode === 'exam') {
      const handler = (e) => {
        e.preventDefault();
        e.returnValue = 'You have an exam in progress. Are you sure you want to leave?';
      };
      window.addEventListener('beforeunload', handler);
      return () => window.removeEventListener('beforeunload', handler);
    }
  }, [mode]);

  if (mode === 'setup') {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Exam Simulator</h1>
          <p className="text-slate-500">Test yourself under real exam conditions</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {Object.entries(EXAM_CONFIGS).map(([key, cfg]) => (
            <Card
              key={key}
              hover
              onClick={() => setExamType(key)}
              className={`cursor-pointer transition-all ${
                examType === key ? 'ring-2 ring-primary-400 border-primary-200' : ''
              }`}
            >
              <CardBody>
                <h3 className="font-semibold text-slate-800 capitalize mb-1">{cfg.label}</h3>
                <p className="text-sm text-slate-500">
                  {cfg.questions} questions
                  {cfg.timeLimit ? ` · ${cfg.timeLimit / 60} min` : ' · Untimed'}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>

        {examType === 'category' && (
          <Select
            label="Select Category"
            placeholder="Choose a category"
            value={category}
            onChange={e => setCategory(e.target.value)}
            options={CATEGORIES.map(c => ({ value: c, label: c }))}
          />
        )}

        <Button fullWidth size="lg" onClick={handleStart} icon={Clock}>
          Start Exam
        </Button>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="fixed inset-0 bg-surface-alt z-50 flex flex-col">
      <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 shrink-0">
        <button
          onClick={handleCancel}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700"
        >
          <X size={18} />
          <span className="hidden sm:inline">Quit</span>
        </button>

        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-slate-600">
            {currentIndex + 1} / {totalQuestions}
          </span>
          {exam.timeLimit && (
            <Timer seconds={timer.seconds} isWarning={timer.isWarning} isDanger={timer.isDanger} />
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNav(!showNav)}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <List size={20} />
          </button>
          <Button size="sm" onClick={() => setShowConfirm(true)} icon={Send}>
            Submit
          </Button>
        </div>
      </header>

      <div className="flex-1 overflow-hidden flex">
        <div className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-3xl mx-auto">
            <ProgressBar value={answeredCount} max={totalQuestions} size="sm" className="mb-6" />

            <Card>
              <CardBody>
                <QuestionCard
                  question={currentQuestion}
                  questionNumber={currentIndex + 1}
                  totalQuestions={totalQuestions}
                  selectedAnswer={answers[currentQuestion.id]}
                  onSelectAnswer={(id) => selectAnswer(currentQuestion.id, id)}
                  isFlagged={flagged.has(currentQuestion.id)}
                  onToggleFlag={toggleFlag}
                />
              </CardBody>
            </Card>

            <div className="flex items-center justify-between mt-4">
              <Button variant="ghost" onClick={prevQuestion} disabled={currentIndex === 0} icon={ChevronLeft}>
                Prev
              </Button>
              <Button
                onClick={currentIndex === totalQuestions - 1 ? () => setShowConfirm(true) : nextQuestion}
                iconRight={currentIndex === totalQuestions - 1 ? Send : ChevronRight}
              >
                {currentIndex === totalQuestions - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        </div>

        <aside className={`
          fixed lg:static top-14 right-0 bottom-0 w-72 bg-white border-l border-slate-200
          transform transition-transform duration-300
          overflow-y-auto shrink-0
          ${showNav ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-4">
            <ExamNavPanel
              questions={exam.questions}
              answers={answers}
              flagged={flagged}
              currentIndex={currentIndex}
              onGoTo={(idx) => { goToQuestion(idx); setShowNav(false); }}
            />
          </div>
        </aside>
      </div>

      <SubmitConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleSubmit}
        totalQuestions={totalQuestions}
        answeredCount={answeredCount}
        flaggedCount={flagged.size}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
