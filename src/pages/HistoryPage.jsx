import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { History, ChevronRight, Trash2, Calendar } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import useAuth from '../hooks/useAuth';
import resultService from '../services/results';
import { formatDateTime, getPassStatus } from '../utils/formatters';

export default function HistoryPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const perPage = 10;

  const allResults = useMemo(() => resultService.getAll(user?.id), [user?.id]);
  const totalPages = Math.ceil(allResults.length / perPage);
  const results = allResults.slice((page - 1) * perPage, page * perPage);

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (confirm('Delete this exam result?')) {
      resultService.deleteResult(id);
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Exam History</h1>
          <p className="text-slate-500">{allResults.length} exam{allResults.length !== 1 ? 's' : ''} completed</p>
        </div>
      </div>

      {results.length === 0 ? (
        <EmptyState
          icon={History}
          title="No exams yet"
          description="Take your first exam to see your history here"
          actionLabel="Start Exam"
          onAction={() => navigate('/exam')}
        />
      ) : (
        <div className="space-y-3">
          {results.map(r => {
            const status = getPassStatus(r.percentage);
            return (
              <Card
                key={r.id}
                hover
                onClick={() => navigate(`/results/${r.id}`)}
                className="cursor-pointer"
              >
                <div className="flex items-center justify-between px-5 py-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      status.passed ? 'bg-success-100' : 'bg-danger-100'
                    }`}>
                      <span className={`text-lg font-bold ${status.passed ? 'text-success-600' : 'text-danger-600'}`}>
                        {r.percentage}%
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800 capitalize truncate">
                        {r.examType} Exam{r.category ? ` - ${r.category}` : ''}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {formatDateTime(r.createdAt)}
                        </span>
                        <span>{r.score}/{r.total} correct</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <Badge variant={status.color} size="sm">{status.label}</Badge>
                    <button
                      onClick={(e) => handleDelete(r.id, e)}
                      className="p-1.5 rounded-lg text-slate-300 hover:text-danger-500 hover:bg-danger-50 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                    <ChevronRight size={18} className="text-slate-300" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage(p => p - 1)}
          >
            Previous
          </Button>
          <span className="text-sm text-slate-500">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="ghost"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setPage(p => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
