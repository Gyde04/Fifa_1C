import { useState, useMemo } from 'react';
import { Search, Plus, Edit2, Trash2, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import { CATEGORIES, CATEGORY_COLORS, DIFFICULTY_COLORS } from '../utils/constants';
import questionService from '../services/questions';

export default function AdminQuestionsPage() {
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [diffFilter, setDiffFilter] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 15;

  const allQuestions = useMemo(() => {
    let qs = questionService.getAll();
    if (search) {
      const lower = search.toLowerCase();
      qs = qs.filter(q =>
        q.questionText.toLowerCase().includes(lower) ||
        q.explanation.toLowerCase().includes(lower)
      );
    }
    if (catFilter) qs = qs.filter(q => q.category === catFilter);
    if (diffFilter) qs = qs.filter(q => q.difficulty === diffFilter);
    return qs;
  }, [search, catFilter, diffFilter]);

  const totalPages = Math.ceil(allQuestions.length / perPage);
  const questions = allQuestions.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Question Bank</h1>
          <p className="text-slate-500">{allQuestions.length} questions</p>
        </div>
        <Button icon={Plus} size="sm" disabled>Add Question</Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          icon={Search}
          placeholder="Search questions..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          className="flex-1"
        />
        <Select
          placeholder="All Categories"
          value={catFilter}
          onChange={e => { setCatFilter(e.target.value); setPage(1); }}
          options={CATEGORIES.map(c => ({ value: c, label: c }))}
          className="w-full sm:w-48"
        />
        <Select
          placeholder="All Difficulty"
          value={diffFilter}
          onChange={e => { setDiffFilter(e.target.value); setPage(1); }}
          options={[
            { value: 'easy', label: 'Easy' },
            { value: 'medium', label: 'Medium' },
            { value: 'hard', label: 'Hard' },
          ]}
          className="w-full sm:w-40"
        />
      </div>

      <div className="space-y-2">
        {questions.map(q => {
          const isExpanded = expandedId === q.id;
          const catColors = CATEGORY_COLORS[q.category] || {};
          const diffColors = DIFFICULTY_COLORS[q.difficulty] || {};
          return (
            <Card key={q.id}>
              <div
                className="px-5 py-3 cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => setExpandedId(isExpanded ? null : q.id)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-400 shrink-0">{q.id}</span>
                  <p className="text-sm text-slate-700 flex-1 truncate">{q.questionText}</p>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge size="sm" className={`${catColors.bg} ${catColors.text} hidden sm:inline-flex`}>
                      {q.category.split(' ').slice(0, 2).join(' ')}
                    </Badge>
                    <Badge size="sm" className={`${diffColors.bg} ${diffColors.text}`}>
                      {q.difficulty}
                    </Badge>
                    {isExpanded ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="px-5 pb-4 border-t border-slate-100 pt-3">
                  <p className="text-sm text-slate-700 mb-3">{q.questionText}</p>
                  <div className="space-y-1.5 mb-3">
                    {q.options.map(opt => (
                      <div
                        key={opt.id}
                        className={`px-3 py-2 rounded-lg text-sm ${
                          opt.id === q.correctAnswer
                            ? 'bg-success-50 text-success-700 font-medium border border-success-200'
                            : 'bg-slate-50 text-slate-600'
                        }`}
                      >
                        <span className="font-bold mr-2">{opt.id}.</span>{opt.text}
                      </div>
                    ))}
                  </div>
                  {q.explanation && (
                    <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
                      <div className="flex items-center gap-1 mb-1">
                        <BookOpen size={14} className="text-blue-600" />
                        <span className="font-semibold text-xs">Explanation</span>
                      </div>
                      {q.explanation}
                    </div>
                  )}
                  {q.lawReference && (
                    <p className="text-xs text-slate-400 mt-2">Ref: {q.lawReference}</p>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {questions.length === 0 && (
        <div className="text-center py-12 text-slate-500">No questions match your filters</div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button variant="ghost" size="sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
            Previous
          </Button>
          <span className="text-sm text-slate-500">Page {page} of {totalPages}</span>
          <Button variant="ghost" size="sm" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
