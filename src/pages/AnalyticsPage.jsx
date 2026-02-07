import { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, RadialLinearScale, ArcElement,
  Tooltip, Legend, Filler,
} from 'chart.js';
import { Line, Bar, Radar, Doughnut } from 'react-chartjs-2';
import {
  Target, TrendingUp, Trophy, Award, AlertTriangle, Zap,
} from 'lucide-react';
import Card, { CardBody } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import EmptyState from '../components/ui/EmptyState';
import useAuth from '../hooks/useAuth';
import analyticsService from '../services/analytics';
import { CATEGORIES, CATEGORY_COLORS } from '../utils/constants';
import { formatPercentage, formatDate } from '../utils/formatters';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, RadialLinearScale, ArcElement,
  Tooltip, Legend, Filler
);

const chartDefaults = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
};

export default function AnalyticsPage() {
  const { user } = useAuth();
  const summary = useMemo(() => analyticsService.getSummary(user?.id), [user?.id]);
  const trend = useMemo(() => analyticsService.getScoreTrend(user?.id, 20), [user?.id]);
  const catPerf = useMemo(() => analyticsService.getCategoryPerformance(user?.id), [user?.id]);
  const diffBreak = useMemo(() => analyticsService.getDifficultyBreakdown(user?.id), [user?.id]);
  const weakCats = useMemo(() => analyticsService.getWeakCategories(user?.id), [user?.id]);

  if (summary.totalExams === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
        <EmptyState
          icon={TrendingUp}
          title="No data yet"
          description="Complete some exams to see your performance analytics"
          actionLabel="Take an Exam"
          onAction={() => window.location.href = '/exam'}
        />
      </div>
    );
  }

  const trendData = {
    labels: trend.map(t => formatDate(t.date)),
    datasets: [{
      label: 'Score',
      data: trend.map(t => t.score),
      borderColor: '#326295',
      backgroundColor: 'rgba(50, 98, 149, 0.1)',
      fill: true,
      tension: 0.3,
      pointRadius: 4,
      pointBackgroundColor: trend.map(t => t.passed ? '#22c55e' : '#ef4444'),
    }],
  };

  const radarData = {
    labels: CATEGORIES.map(c => c.split(' ').slice(0, 2).join(' ')),
    datasets: [{
      label: 'Performance',
      data: CATEGORIES.map(c => catPerf[c]?.percentage || 0),
      backgroundColor: 'rgba(50, 98, 149, 0.15)',
      borderColor: '#326295',
      borderWidth: 2,
      pointBackgroundColor: '#326295',
    }],
  };

  const diffData = {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [{
      data: [diffBreak.easy.percentage, diffBreak.medium.percentage, diffBreak.hard.percentage],
      backgroundColor: ['#22c55e', '#f59e0b', '#ef4444'],
      borderWidth: 0,
    }],
  };

  const statCards = [
    { label: 'Average Score', value: formatPercentage(summary.averageScore), icon: Target, color: 'text-primary-500', bg: 'bg-primary-50' },
    { label: 'Best Score', value: formatPercentage(summary.bestScore), icon: Trophy, color: 'text-success-500', bg: 'bg-success-50' },
    { label: 'Pass Rate', value: formatPercentage(summary.passRate), icon: Award, color: 'text-accent-500', bg: 'bg-accent-50' },
    { label: 'Pass Streak', value: summary.streak, icon: Zap, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label}>
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
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">Score Trend</h3>
          </div>
          <CardBody>
            <div className="h-64">
              <Line
                data={trendData}
                options={{
                  ...chartDefaults,
                  scales: {
                    y: { beginAtZero: true, max: 100, grid: { color: '#f1f5f9' } },
                    x: { grid: { display: false }, ticks: { maxRotation: 45 } },
                  },
                  plugins: {
                    ...chartDefaults.plugins,
                    annotation: {
                      annotations: {
                        passLine: {
                          type: 'line', yMin: 75, yMax: 75,
                          borderColor: '#22c55e', borderDash: [5, 5], borderWidth: 1,
                        },
                      },
                    },
                  },
                }}
              />
            </div>
          </CardBody>
        </Card>

        <Card>
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">Category Strengths</h3>
          </div>
          <CardBody>
            <div className="h-64 flex items-center justify-center">
              <Radar
                data={radarData}
                options={{
                  ...chartDefaults,
                  scales: {
                    r: {
                      beginAtZero: true, max: 100,
                      ticks: { stepSize: 25, display: false },
                      grid: { color: '#e2e8f0' },
                      pointLabels: { font: { size: 11 } },
                    },
                  },
                }}
              />
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card>
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">Difficulty Breakdown</h3>
          </div>
          <CardBody>
            <div className="h-48 flex items-center justify-center">
              <Doughnut
                data={diffData}
                options={{
                  ...chartDefaults,
                  cutout: '60%',
                  plugins: {
                    legend: { display: true, position: 'bottom', labels: { padding: 16, usePointStyle: true } },
                  },
                }}
              />
            </div>
            <div className="mt-4 space-y-2">
              {Object.entries(diffBreak).map(([d, data]) => (
                <div key={d} className="flex items-center justify-between text-sm">
                  <span className="capitalize text-slate-600">{d}</span>
                  <span className="font-medium">{data.correct}/{data.total} ({data.percentage}%)</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card className="lg:col-span-2">
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">Areas for Improvement</h3>
          </div>
          <CardBody>
            {weakCats.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-8">Not enough data yet</p>
            ) : (
              <div className="space-y-4">
                {weakCats.map((wc, idx) => {
                  const colors = CATEGORY_COLORS[wc.category] || {};
                  return (
                    <div key={wc.category} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${colors.bg || 'bg-slate-100'}`}>
                        <AlertTriangle size={16} className={colors.text || 'text-slate-500'} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-700">{wc.category}</p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {wc.correct}/{wc.total} correct ({wc.percentage}%)
                        </p>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mt-2">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${wc.percentage}%`, backgroundColor: colors.hex || '#94a3b8' }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
