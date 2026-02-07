import { useState, useCallback } from 'react';
import { BookOpen, ArrowRight, ArrowLeft, RotateCcw, CheckCircle } from 'lucide-react';
import Card, { CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';
import QuestionCard from '../components/questions/QuestionCard';
import useAuth from '../hooks/useAuth';
import questionService from '../services/questions';
import flaggedService from '../services/flagged';
import { CATEGORIES, DIFFICULTY_LEVELS, CATEGORY_COLORS } from '../utils/constants';
import { shuffleArray } from '../utils/formatters';

export default function PracticePage() {
  const { user } = useAuth();
  const [mode, setMode] = useState('setup');
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState([]);
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [count, setCount] = useState('10');

  const startPractice = useCallback(() => {
    const opts = {};
    if (category) opts.category = category;
    if (difficulty) opts.difficulty = difficulty;
    const qs = questionService.getRandom(parseInt(count), opts);
    if (qs.length === 0) return;
    setQuestions(qs);
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setResults([]);
    setMode('practice');
  }, [category, difficulty, count]);

  const handleAnswer = (answerId) => {
    if (showResult) return;
    setSelectedAnswer(answerId);
  };

  const checkAnswer = () => {
    if (!selectedAnswer) return;
    setShowResult(true);
    const q = questions[currentIdx];
    setResults(prev => [...prev, {
      questionId: q.id,
      selectedAnswer,
      isCorrect: selectedAnswer === q.correctAnswer,
    }]);
  };

  const nextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setMode('summary');
    }
  };

  const toggleFlag = (qId) => {
    if (user) flaggedService.toggleFlag(user.id, qId);
  };

  const restart = () => {
    setMode('setup');
    setQuestions([]);
    setResults([]);
  };

  const correct = results.filter(r => r.isCorrect).length;
  const pct = results.length > 0 ? Math.round((correct / results.length) * 100) : 0;

  if (mode === 'setup') {
    const categoryCounts = questionService.getCategoryCounts();
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Practice Mode</h1>
          <p className="text-slate-500">Study at your own pace with instant feedback</p>
        </div>

        <Card>
          <CardBody className="space-y-5">
            <Select
              label="Category"
              placeholder="All Categories"
              value={category}
              onChange={e => setCategory(e.target.value)}
              options={CATEGORIES.map(c => ({ value: c, label: `${c} (${categoryCounts[c] || 0})` }))}
            />

            <Select
              label="Difficulty"
              placeholder="All Difficulties"
              value={difficulty}
              onChange={e => setDifficulty(e.target.value)}
              options={DIFFICULTY_LEVELS.map(d => ({ value: d, label: d.charAt(0).toUpperCase() + d.slice(1) }))}
            />

            <Select
              label="Number of Questions"
              value={count}
              onChange={e => setCount(e.target.value)}
              options={[
                { value: '5', label: '5 Questions' },
                { value: '10', label: '10 Questions' },
                { value: '20', label: '20 Questions' },
                { value: '30', label: '30 Questions' },
              ]}
            />

            <Button fullWidth onClick={startPractice} icon={BookOpen} size="lg">
              Start Practice
            </Button>
          </CardBody>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CATEGORIES.map(cat => {
            const c = CATEGORY_COLORS[cat];
            return (
              <Card
                key={cat}
                hover
                className="cursor-pointer"
                onClick={() => { setCategory(cat); }}
              >
                <CardBody className="!py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-700">{cat}</p>
                      <p className="text-xs text-slate-400">{categoryCounts[cat] || 0} questions</p>
                    </div>
                    <Badge className={`${c.bg} ${c.text}`} size="sm">
                      {categoryCounts[cat] || 0}
                    </Badge>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  if (mode === 'summary') {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardBody className="text-center py-10">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 ${pct >= 75 ? 'bg-success-100' : 'bg-danger-100'}`}>
              <CheckCircle size={36} className={pct >= 75 ? 'text-success-500' : 'text-danger-500'} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Practice Complete!</h2>
            <p className="text-slate-500 mb-6">
              You scored {correct} out of {results.length} ({pct}%)
            </p>
            <ProgressBar value={pct} color="auto" size="lg" className="mb-8 max-w-xs mx-auto" />
            <div className="flex gap-3 justify-center">
              <Button variant="secondary" onClick={restart} icon={RotateCcw}>
                New Practice
              </Button>
              <Button onClick={startPractice} icon={ArrowRight}>
                Try Again
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  const q = questions[currentIdx];
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <ProgressBar value={currentIdx + 1} max={questions.length} size="sm" showLabel label="Progress" />

      <Card>
        <CardBody>
          <QuestionCard
            question={q}
            questionNumber={currentIdx + 1}
            totalQuestions={questions.length}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={handleAnswer}
            isFlagged={user ? flaggedService.isFlagged(user.id, q.id) : false}
            onToggleFlag={toggleFlag}
            showResult={showResult}
            showExplanation={showResult}
          />
        </CardBody>
      </Card>

      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          disabled={currentIdx === 0}
          onClick={() => { setCurrentIdx(prev => prev - 1); setSelectedAnswer(null); setShowResult(false); }}
          icon={ArrowLeft}
        >
          Previous
        </Button>

        {!showResult ? (
          <Button onClick={checkAnswer} disabled={!selectedAnswer}>
            Check Answer
          </Button>
        ) : (
          <Button onClick={nextQuestion} iconRight={ArrowRight}>
            {currentIdx < questions.length - 1 ? 'Next Question' : 'See Results'}
          </Button>
        )}
      </div>
    </div>
  );
}
