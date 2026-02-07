import { useState, useMemo } from 'react';
import { Flag, Trash2, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import Card, { CardBody } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import useAuth from '../hooks/useAuth';
import flaggedService from '../services/flagged';
import { CATEGORY_COLORS, DIFFICULTY_COLORS } from '../utils/constants';

export default function FlaggedPage() {
  const { user } = useAuth();
  const [expandedId, setExpandedId] = useState(null);
  const [, setRefresh] = useState(0);

  const flaggedItems = useMemo(
    () => flaggedService.getAll(user?.id),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user?.id]
  );

  const handleUnflag = (questionId) => {
    flaggedService.unflag(user.id, questionId);
    setRefresh(v => v + 1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Flagged Questions</h1>
        <p className="text-slate-500">{flaggedItems.length} question{flaggedItems.length !== 1 ? 's' : ''} flagged for review</p>
      </div>

      {flaggedItems.length === 0 ? (
        <EmptyState
          icon={Flag}
          title="No flagged questions"
          description="Flag questions during practice or exams to review them later"
        />
      ) : (
        <div className="space-y-3">
          {flaggedItems.map(({ questionId, question, flaggedAt }) => {
            if (!question) return null;
            const isExpanded = expandedId === questionId;
            const catColors = CATEGORY_COLORS[question.category] || {};
            const diffColors = DIFFICULTY_COLORS[question.difficulty] || {};

            return (
              <Card key={questionId}>
                <div
                  className="px-5 py-4 cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : questionId)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 mb-2">{question.questionText}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge size="sm" className={`${catColors.bg} ${catColors.text}`}>
                          {question.category}
                        </Badge>
                        <Badge size="sm" className={`${diffColors.bg} ${diffColors.text}`}>
                          {question.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleUnflag(questionId); }}
                        className="p-1.5 rounded-lg text-slate-300 hover:text-danger-500 hover:bg-danger-50 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                      {isExpanded ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-slate-100 pt-4">
                    <div className="space-y-2 mb-4">
                      {question.options.map(opt => (
                        <div
                          key={opt.id}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                            opt.id === question.correctAnswer
                              ? 'bg-success-50 text-success-700 border border-success-200 font-medium'
                              : 'bg-slate-50 text-slate-600'
                          }`}
                        >
                          <span className="font-bold">{opt.id}.</span> {opt.text}
                        </div>
                      ))}
                    </div>

                    {question.explanation && (
                      <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                        <div className="flex items-center gap-1.5 mb-1">
                          <BookOpen size={14} className="text-blue-600" />
                          <span className="text-xs font-semibold text-blue-700">Explanation</span>
                        </div>
                        <p className="text-sm text-blue-700">{question.explanation}</p>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
