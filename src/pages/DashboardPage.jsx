import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ClipboardList, Target, Trophy, BookOpen, ArrowRight,
  TrendingUp, Zap, BarChart3,
} from 'lucide-react';
import Card, { CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';
import useAuth from '../hooks/useAuth';
import analyticsService from '../services/analytics';
import { CATEGORIES, CATEGORY_COLORS } from '../utils/constants';
import { formatPercentage, timeAgo, getPassStatus } from '../utils/formatters';

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const summary = useMemo(() => analyticsService.getSummary(user?.id), [user?.id]);
  const catPerf = useMemo(() => analyticsService.getCategoryPerformance(user?.id), [user?.id]);
  const recent = useMemo(() => analyticsService.getRecentActivity(user?.id, 5), [user?.id]);

  const stats = [
    { label: 'Exams Taken', value: summary.totalExams, icon: ClipboardList, color: 'text-primary-500' },
    { label: 'Average Score', value: formatPercentage(summary.averageScore), icon: Target, color: 'text-accent-500' },
    { label: 'Pass Rate', value: formatPercentage(summary.passRate), icon: Trophy, color: 'text-success-500' },
    { label: 'Questions Done', value: summary.totalQuestions, icon: BookOpen, color: 'text-purple-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="gradient-hero rounded-2xl p-6 lg:p-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-1">
              Welcome back, {user?.firstName}!
            </h1>
            <p className="text-slate-300">
              {summary.totalExams > 0
                ? `You've completed ${summary.totalExams} exam${summary.totalExams > 1 ? 's' : ''}. Keep going!`
                : 'Ready to start your exam preparation journey?'
              }
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="accent"
              onClick={() => navigate('/practice')}
              icon={Zap}
            >
              Quick Practice
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate('/exam')}
              className="!bg-white/10 !text-white !border-white/20 hover:!bg-white/20"
            >
              Mock Exam
            </Button>
          </div>
        </div>

        {summary.streak > 0 && (
          <div className="mt-4 flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2 w-fit">
            <TrendingUp size={16} className="text-accent-400" />
            <span className="text-sm font-medium">
              {summary.streak} exam pass streak!
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="stat-card">
            <CardBody className="!py-4">
              <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mb-3 ${color}`}>
                <Icon size={20} />
              </div>
              <p className="text-2xl font-bold text-slate-900">{value}</p>
              <p className="text-sm text-slate-500">{label}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-800">Category Progress</h3>
            <Button variant="ghost" size="sm" onClick={() => navigate('/analytics')} iconRight={ArrowRight}>
              Details
            </Button>
          </div>
          <CardBody>
            <div className="space-y-5">
              {CATEGORIES.map(cat => {
                const data = catPerf[cat];
                const colors = CATEGORY_COLORS[cat];
                return (
                  <div key={cat}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-slate-700">{cat}</span>
                      <span className="text-sm text-slate-500">
                        {data.total > 0 ? `${data.correct}/${data.total}` : 'No data'}
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${data.percentage}%`,
                          backgroundColor: colors?.hex || '#94a3b8',
                        }}
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
            <h3 className="font-semibold text-slate-800">Recent Exams</h3>
            <Button variant="ghost" size="sm" onClick={() => navigate('/history')} iconRight={ArrowRight}>
              All
            </Button>
          </div>
          <div className="divide-y divide-slate-100">
            {recent.length === 0 ? (
              <div className="px-6 py-8 text-center">
                <BarChart3 size={24} className="mx-auto text-slate-300 mb-2" />
                <p className="text-sm text-slate-500">No exams yet</p>
                <Button size="sm" className="mt-3" onClick={() => navigate('/exam')}>
                  Take your first exam
                </Button>
              </div>
            ) : (
              recent.map(r => {
                const status = getPassStatus(r.score);
                return (
                  <div
                    key={r.id}
                    className="px-6 py-3 hover:bg-slate-50 cursor-pointer transition-colors"
                    onClick={() => navigate(`/results/${r.id}`)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-700 capitalize">
                          {r.examType}{r.category ? ` - ${r.category}` : ''}
                        </p>
                        <p className="text-xs text-slate-400">{timeAgo(r.date)}</p>
                      </div>
                      <Badge variant={status.color} size="sm">
                        {r.score}%
                      </Badge>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
