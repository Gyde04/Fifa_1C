import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, FileQuestion, ClipboardList, BookMarked,
  ArrowRight, TrendingUp,
} from 'lucide-react';
import Card, { CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';
import questionService from '../services/questions';
import resultService from '../services/results';
import studyService from '../services/study';
import authService from '../services/auth';
import { CATEGORY_COLORS, CATEGORIES } from '../utils/constants';

export default function AdminDashboardPage() {
  const navigate = useNavigate();

  const stats = useMemo(() => {
    const allResults = resultService.getAll();
    const avgScore = allResults.length > 0
      ? Math.round(allResults.reduce((s, r) => s + r.percentage, 0) / allResults.length)
      : 0;
    const passRate = allResults.length > 0
      ? Math.round((allResults.filter(r => r.passed).length / allResults.length) * 100)
      : 0;

    return {
      totalQuestions: questionService.getTotalCount(),
      totalMaterials: studyService.getAll().length,
      totalExams: allResults.length,
      averageScore: avgScore,
      passRate,
    };
  }, []);

  const categoryCounts = useMemo(() => questionService.getCategoryCounts(), []);

  const statCards = [
    { label: 'Total Questions', value: stats.totalQuestions, icon: FileQuestion, color: 'text-primary-500', bg: 'bg-primary-50' },
    { label: 'Total Exams', value: stats.totalExams, icon: ClipboardList, color: 'text-accent-500', bg: 'bg-accent-50' },
    { label: 'Avg Score', value: `${stats.averageScore}%`, icon: TrendingUp, color: 'text-success-500', bg: 'bg-success-50' },
    { label: 'Study Materials', value: stats.totalMaterials, icon: BookMarked, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Admin Dashboard</h1>
          <p className="text-slate-500">Platform overview and management</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label} className="stat-card">
            <CardBody className="!py-4">
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-2 ${color}`}>
                <Icon size={20} />
              </div>
              <p className="text-2xl font-bold text-slate-900">{value}</p>
              <p className="text-sm text-slate-500">{label}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-800">Questions by Category</h3>
            <Button variant="ghost" size="sm" onClick={() => navigate('/admin/questions')} iconRight={ArrowRight}>
              Manage
            </Button>
          </div>
          <CardBody>
            <div className="space-y-3">
              {CATEGORIES.map(cat => {
                const count = categoryCounts[cat] || 0;
                const total = stats.totalQuestions;
                const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                const colors = CATEGORY_COLORS[cat];
                return (
                  <div key={cat}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-700">{cat}</span>
                      <span className="text-sm font-medium text-slate-500">{count} ({pct}%)</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${pct}%`, backgroundColor: colors?.hex }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>

        <Card>
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-800">Quick Actions</h3>
          </div>
          <CardBody className="space-y-3">
            <button
              onClick={() => navigate('/admin/questions')}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                <FileQuestion size={20} className="text-primary-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700">Manage Questions</p>
                <p className="text-xs text-slate-400">Add, edit, or remove questions</p>
              </div>
              <ArrowRight size={16} className="ml-auto text-slate-300" />
            </button>

            <button
              onClick={() => navigate('/admin/users')}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center">
                <Users size={20} className="text-accent-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700">User Management</p>
                <p className="text-xs text-slate-400">View and manage user accounts</p>
              </div>
              <ArrowRight size={16} className="ml-auto text-slate-300" />
            </button>

            <button
              onClick={() => navigate('/admin/materials')}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                <BookMarked size={20} className="text-purple-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700">Study Materials</p>
                <p className="text-xs text-slate-400">Manage learning resources</p>
              </div>
              <ArrowRight size={16} className="ml-auto text-slate-300" />
            </button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
