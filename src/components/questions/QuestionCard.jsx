import { Flag, BookOpen } from 'lucide-react';
import Badge from '../ui/Badge';
import { CATEGORY_COLORS, DIFFICULTY_COLORS } from '../../utils/constants';

export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  isFlagged,
  onToggleFlag,
  showResult,
  showExplanation,
}) {
  const catColor = CATEGORY_COLORS[question.category] || {};
  const diffColor = DIFFICULTY_COLORS[question.difficulty] || {};

  const getOptionClass = (optionId) => {
    const base = 'w-full flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200';

    if (showResult) {
      if (optionId === question.correctAnswer) {
        return `${base} border-success-300 bg-success-50 text-success-800`;
      }
      if (optionId === selectedAnswer && optionId !== question.correctAnswer) {
        return `${base} border-danger-300 bg-danger-50 text-danger-800`;
      }
      return `${base} border-slate-100 bg-white text-slate-400`;
    }

    if (optionId === selectedAnswer) {
      return `${base} border-primary-400 bg-primary-50 text-primary-800 shadow-sm`;
    }

    return `${base} border-slate-200 bg-white hover:border-primary-200 hover:bg-primary-50/30 cursor-pointer`;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="neutral" size="sm">
            {questionNumber} of {totalQuestions}
          </Badge>
          <Badge size="sm" className={`${catColor.bg} ${catColor.text}`}>
            {question.category}
          </Badge>
          <Badge size="sm" className={`${diffColor.bg} ${diffColor.text}`}>
            {diffColor.label || question.difficulty}
          </Badge>
        </div>
        {onToggleFlag && (
          <button
            onClick={() => onToggleFlag(question.id)}
            className={`p-2 rounded-lg transition-colors ${
              isFlagged
                ? 'text-accent-600 bg-accent-50 hover:bg-accent-100'
                : 'text-slate-400 hover:text-accent-600 hover:bg-slate-100'
            }`}
          >
            <Flag size={18} fill={isFlagged ? 'currentColor' : 'none'} />
          </button>
        )}
      </div>

      <h2 className="text-lg font-semibold text-slate-800 mb-6 leading-relaxed">
        {question.questionText}
      </h2>

      <div className="space-y-3">
        {question.options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => !showResult && onSelectAnswer?.(opt.id)}
            disabled={showResult}
            className={getOptionClass(opt.id)}
          >
            <span className={`
              w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0
              ${showResult && opt.id === question.correctAnswer
                ? 'bg-success-500 text-white'
                : showResult && opt.id === selectedAnswer
                  ? 'bg-danger-500 text-white'
                  : opt.id === selectedAnswer
                    ? 'bg-primary-500 text-white'
                    : 'bg-slate-100 text-slate-500'
              }
            `}>
              {opt.id}
            </span>
            <span className="text-sm pt-1">{opt.text}</span>
          </button>
        ))}
      </div>

      {showExplanation && question.explanation && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen size={16} className="text-blue-600" />
            <span className="text-sm font-semibold text-blue-800">Explanation</span>
          </div>
          <p className="text-sm text-blue-700 leading-relaxed">{question.explanation}</p>
          {question.lawReference && (
            <p className="text-xs text-blue-500 mt-2 font-medium">
              Reference: {question.lawReference}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
