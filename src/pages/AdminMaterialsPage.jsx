import { useMemo } from 'react';
import { FileText, Video, BookOpen, BookMarked } from 'lucide-react';
import Card, { CardBody } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import EmptyState from '../components/ui/EmptyState';
import { CATEGORY_COLORS } from '../utils/constants';
import studyService from '../services/study';

const typeIcons = { pdf: FileText, video: Video, guide: BookOpen };

export default function AdminMaterialsPage() {
  const materials = useMemo(() => studyService.getAll(), []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Study Materials</h1>
          <p className="text-slate-500">{materials.length} material{materials.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {materials.length === 0 ? (
        <EmptyState icon={BookMarked} title="No materials" description="No study materials have been added yet" />
      ) : (
        <div className="space-y-2">
          {materials.map(m => {
            const Icon = typeIcons[m.type] || BookOpen;
            const catColors = CATEGORY_COLORS[m.category] || {};
            return (
              <Card key={m.id}>
                <div className="flex items-start gap-4 px-5 py-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-slate-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800">{m.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{m.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge size="sm" className={`${catColors.bg} ${catColors.text}`}>
                        {m.category}
                      </Badge>
                      <Badge size="sm" variant="neutral" className="capitalize">{m.type}</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
