import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  CheckCircle, XCircle, ArrowLeft, Trophy, Target,
  Clock, BarChart3, BookOpen, RotateCcw,
} from 'lucide-react';
import Card, { CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';
import { CATEGORY_COLORS, PASSING_SCORE } from '../utils/constants';
import { formatPercentage, formatTime, getPassStatus } from '../utils/formatters';
import resultService from '../services/results';

export default function ResultPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const result = useMemo(() => resultService.getById(id), [id]);

  if (!result) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500">Result not found</p>
        <Button variant="ghost" onClick={() => navigate('/history')} className="mt-4">
          Back to History
        </Button>
      </div>
    );
  }

  const status = getPassStatus(result.percentage);
  const wrongAnswers = result.questions.filter(q => !q.isCorrect);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Button variant="ghost" onClick={() => navigate('/history')} icon={ArrowLeft} size="sm">
        Back to History
      </Button>

      <Card>
        <CardBody className="text-center py-10">
          <div className={`w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-4 ${
            status.passed ? 'bg-success-100' : 'bg-danger-100'
          }`}>
            {status.passed
              ? <Trophy size={44} className="text-success-500" />
              : <Target size={44} className="text-danger-500" />
            }
          </div>

          <Badge variant={status.color} size="lg" className="mb-3">{status.label}</Badge>

          <h1 className="text-4xl font-bold text-slate-900 mb-1">
            {result.percentage}%
          </h1>
          <p className="text-slate-500">
            {result.score} of {result.total} correct · Pass mark: {PASSING_SCORE}%
          </p>

          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-slate-600">
            <div className="flex items-center gap-1.5">
              <Clock size={16} className="text-slate-400" />
              {formatTime(result.timeTaken)}
            </div>
            <div className="flex items-center gap-1.5">
              <BarChart3 size={16} className="text-slate-400" />
              {result.examType}
            </div>
          </div>

          <div className="flex gap-3 justify-center mt-6">
            <Button variant="secondary" onClick={() => navigate('/exam')} icon={RotateCcw}>
              Try Again
            </Button>
            <Button onClick={() => navigate('/analytics')}>
              View Analytics
            </Button>
          </div>
        </CardBody>
      </Card>

      {result.categoryBreakdown && (
        <Card>
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">Category Breakdown</h3>
          </div>
          <CardBody>
            <div className="space-y-4">
              {Object.entries(result.categoryBreakdown).map(([cat, data]) => {
                const pct = Math.round((data.correct / data.total) * 100);
                const colors = CATEGORY_COLORS[cat] || {};
                return (
                  <div key={cat}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-slate-700">{cat}</span>
                      <span className="text-sm text-slate-500">{data.correct}/{data.total} ({pct}%)</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, backgroundColor: colors.hex || '#94a3b8' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>
      )}

      {wrongAnswers.length > 0 && (
        <Card>
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">
              Incorrect Answers ({wrongAnswers.length})
            </h3>
          </div>
          <div className="divide-y divide-slate-100">
            {wrongAnswers.map((q, idx) => (
              <div key={idx} className="px-6 py-5">
                <p className="text-sm font-medium text-slate-800 mb-3">{q.questionText}</p>
                <div className="grid sm:grid-cols-2 gap-2 mb-3">
                  {q.options.map(opt => (
                    <div
                      key={opt.id}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                        opt.id === q.correctAnswer
                          ? 'bg-success-50 text-success-700 border border-success-200'
                          : opt.id === q.selectedAnswer
                            ? 'bg-danger-50 text-danger-700 border border-danger-200'
                            : 'bg-slate-50 text-slate-500'
                      }`}
                    >
                      <span className="font-bold">{opt.id}.</span>
                      {opt.text}
                      {opt.id === q.correctAnswer && <CheckCircle size={14} className="ml-auto shrink-0" />}
                      {opt.id === q.selectedAnswer && opt.id !== q.correctAnswer && <XCircle size={14} className="ml-auto shrink-0" />}
                    </div>
                  ))}
                </div>
                {q.explanation && (
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                    <div className="flex items-center gap-1.5 mb-1">
                      <BookOpen size={14} className="text-blue-600" />
                      <span className="text-xs font-semibold text-blue-700">Explanation</span>
                    </div>
                    <p className="text-sm text-blue-700">{q.explanation}</p>
                    {q.lawReference && (
                      <p className="text-xs text-blue-500 mt-1">{q.lawReference}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
