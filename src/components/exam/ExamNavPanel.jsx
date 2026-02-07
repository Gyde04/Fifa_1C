import { Flag, CheckCircle, Circle, ArrowRight } from 'lucide-react';

export default function ExamNavPanel({
  questions,
  answers,
  flagged,
  currentIndex,
  onGoTo,
}) {
  const answered = Object.keys(answers).length;
  const flaggedCount = flagged.size;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-800">Questions</h3>
        <span className="text-xs text-slate-500">
          {answered}/{questions.length} answered
        </span>
      </div>

      <div className="grid grid-cols-5 gap-2 mb-4">
        {questions.map((q, idx) => {
          const isAnswered = !!answers[q.id];
          const isFlagged = flagged.has(q.id);
          const isCurrent = idx === currentIndex;

          return (
            <button
              key={q.id}
              onClick={() => onGoTo(idx)}
              className={`
                relative w-full aspect-square rounded-lg text-xs font-bold
                flex items-center justify-center transition-all duration-150
                ${isCurrent
                  ? 'bg-primary-500 text-white shadow-md ring-2 ring-primary-300'
                  : isAnswered
                    ? 'bg-success-100 text-success-700 hover:bg-success-200'
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                }
              `}
            >
              {idx + 1}
              {isFlagged && (
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent-500" />
              )}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-3 border-t border-slate-100">
        <span className="flex items-center gap-1">
          <Circle size={10} className="text-slate-300" /> Unanswered
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle size={10} className="text-success-500" /> Answered
        </span>
        <span className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-accent-500" /> Flagged
        </span>
        <span className="flex items-center gap-1">
          <ArrowRight size={10} className="text-primary-500" /> Current
        </span>
      </div>

      {flaggedCount > 0 && (
        <div className="mt-3 flex items-center gap-1.5 text-xs text-accent-600 bg-accent-50 px-3 py-2 rounded-lg">
          <Flag size={12} />
          {flaggedCount} flagged for review
        </div>
      )}
    </div>
  );
}
