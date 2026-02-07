import { useState, useMemo } from 'react';
import { FileText, Video, BookOpen, ExternalLink, Search } from 'lucide-react';
import Card, { CardBody } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import { CATEGORY_COLORS } from '../utils/constants';
import studyService from '../services/study';

const typeIcons = { pdf: FileText, video: Video, guide: BookOpen };
const typeColors = {
  pdf: 'bg-danger-100 text-danger-600',
  video: 'bg-purple-100 text-purple-600',
  guide: 'bg-primary-100 text-primary-600',
};

export default function StudyPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const materials = useMemo(() => {
    let items = filter === 'all' ? studyService.getAll() : studyService.getByType(filter);
    if (search) {
      const lower = search.toLowerCase();
      items = items.filter(m =>
        m.title.toLowerCase().includes(lower) ||
        m.description.toLowerCase().includes(lower) ||
        m.category.toLowerCase().includes(lower)
      );
    }
    return items;
  }, [filter, search]);

  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'guide', label: 'Guides' },
    { key: 'pdf', label: 'PDFs' },
    { key: 'video', label: 'Videos' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Study Materials</h1>
        <p className="text-slate-500">Resources to help you prepare for the exam</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setFilter(t.key)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                filter === t.key
                  ? 'bg-white text-primary-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex-1 max-w-xs">
          <Input
            icon={Search}
            placeholder="Search materials..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {materials.map(m => {
          const Icon = typeIcons[m.type] || BookOpen;
          const catColors = CATEGORY_COLORS[m.category] || {};
          return (
            <Card key={m.id} hover>
              <CardBody>
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${typeColors[m.type] || 'bg-slate-100 text-slate-500'}`}>
                    <Icon size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-slate-800 line-clamp-2">{m.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge size="sm" className={`${catColors.bg} ${catColors.text}`}>
                        {m.category}
                      </Badge>
                      <Badge size="sm" variant="neutral" className="capitalize">
                        {m.type}
                      </Badge>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-500 line-clamp-3 mb-4">{m.description}</p>
                <a
                  href={m.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                >
                  Open Resource <ExternalLink size={14} />
                </a>
              </CardBody>
            </Card>
          );
        })}
      </div>

      {materials.length === 0 && (
        <div className="text-center py-12">
          <BookOpen size={28} className="mx-auto text-slate-300 mb-2" />
          <p className="text-slate-500">No materials found</p>
        </div>
      )}
    </div>
  );
}
