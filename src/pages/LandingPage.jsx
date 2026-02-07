import { useNavigate } from 'react-router-dom';
import {
  BookOpen, Clock, BarChart3, Shield, CheckCircle, ArrowRight,
  Zap, Target, Trophy, Flag, GraduationCap, ChevronRight,
  Star, Users, Award, Sparkles,
} from 'lucide-react';
import Button from '../components/ui/Button';
import useAuth from '../hooks/useAuth';

const features = [
  {
    icon: BookOpen,
    title: 'Smart Practice Mode',
    description: 'Study at your own pace with instant feedback and detailed explanations for every question.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Clock,
    title: 'Timed Mock Exams',
    description: 'Simulate real exam conditions with timed tests, auto-submit, and question navigation.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: BarChart3,
    title: 'Performance Analytics',
    description: 'Track your progress with detailed charts showing score trends, strengths, and weak areas.',
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    icon: Target,
    title: 'Category Focus',
    description: 'Target specific topics like Laws of the Game, VAR, or Disciplinary Actions to improve weak areas.',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    icon: Flag,
    title: 'Flag & Review',
    description: 'Flag tricky questions during practice and revisit them later for focused revision.',
    color: 'bg-red-100 text-red-600',
  },
  {
    icon: GraduationCap,
    title: 'Study Materials',
    description: 'Access curated guides, PDFs, and video resources to deepen your understanding.',
    color: 'bg-indigo-100 text-indigo-600',
  },
];

const steps = [
  { step: '01', title: 'Sign In', description: 'Quick sign-in with Google or a magic link — no passwords to remember.' },
  { step: '02', title: 'Choose Your Mode', description: 'Practice by topic, take a timed mock exam, or review flagged questions.' },
  { step: '03', title: 'Learn & Improve', description: 'Get instant feedback with explanations and track your progress over time.' },
  { step: '04', title: 'Pass Your Exam', description: 'Build confidence and pass the FIFA agent exam with a score of 75% or higher.' },
];

const categories = [
  { name: 'Laws of the Game', count: 21, color: '#3b82f6' },
  { name: 'Match Procedures', count: 21, color: '#10b981' },
  { name: 'Disciplinary Actions', count: 21, color: '#ef4444' },
  { name: 'VAR & Technology', count: 21, color: '#8b5cf6' },
  { name: 'Fitness & Positioning', count: 21, color: '#f59e0b' },
];

const stats = [
  { value: '105+', label: 'Exam Questions', icon: BookOpen },
  { value: '5', label: 'Topic Categories', icon: Target },
  { value: '75%', label: 'Pass Mark', icon: Trophy },
  { value: '3', label: 'Exam Modes', icon: Zap },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    navigate(isAuthenticated ? '/dashboard' : '/login');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="PitchReady" className="w-9 h-9 rounded-lg object-contain" />
            <span className="text-lg font-bold text-slate-900">PitchReady</span>
          </div>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Button onClick={() => navigate('/dashboard')} iconRight={ArrowRight}>
                Dashboard
              </Button>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate('/login')}>
                  Sign In
                </Button>
                <Button onClick={() => navigate('/login')} iconRight={ArrowRight}>
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-[0.03]" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium mb-6">
              <Sparkles size={16} />
              FIFA Agent Exam Preparation Platform
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
              Ace Your FIFA Agent{' '}
              <span className="text-primary-500">Exam</span> with Confidence
            </h1>
            <p className="text-lg sm:text-xl text-slate-500 leading-relaxed mb-10 max-w-2xl mx-auto">
              Practice with 105+ real exam questions, take timed mock tests, and track your performance across all categories. Everything you need to pass on your first attempt.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" onClick={handleGetStarted} iconRight={ArrowRight} className="text-base px-8">
                Start Practicing Free
              </Button>
              <Button size="lg" variant="secondary" onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })} className="text-base">
                See How It Works
              </Button>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-16 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="text-center p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <Icon size={22} className="mx-auto text-primary-500 mb-2" />
                <p className="text-2xl font-bold text-slate-900">{value}</p>
                <p className="text-sm text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 lg:py-28 bg-surface-alt">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Prepare
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              A complete toolkit designed specifically for FIFA agent exam candidates.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, description, color }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm card-hover"
              >
                <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Get started in minutes and build your path to exam success.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map(({ step, title, description }, idx) => (
              <div key={step} className="relative text-center">
                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-lg font-bold">{step}</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
                <p className="text-sm text-slate-500">{description}</p>
                {idx < steps.length - 1 && (
                  <ChevronRight size={20} className="hidden lg:block absolute top-5 -right-4 text-slate-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 lg:py-28 bg-surface-alt">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              5 Core Categories
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Comprehensive coverage of every topic on the FIFA agent exam.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {categories.map(({ name, count, color }) => (
              <div
                key={name}
                className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm text-center card-hover"
              >
                <div
                  className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center"
                  style={{ backgroundColor: color + '18', color }}
                >
                  <CheckCircle size={22} />
                </div>
                <h3 className="text-sm font-semibold text-slate-800 mb-1">{name}</h3>
                <p className="text-xs text-slate-400">{count} questions</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="gradient-hero rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden">
            <img
              src="/hero.jpeg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-luminosity pointer-events-none"
            />
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
                <Award size={32} className="text-accent-400" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Pass Your Exam?
              </h2>
              <p className="text-lg text-slate-300 max-w-xl mx-auto mb-8">
                Join aspiring FIFA agents who are preparing smarter. Start practicing today — it's completely free.
              </p>
              <Button
                size="lg"
                variant="accent"
                onClick={handleGetStarted}
                iconRight={ArrowRight}
                className="text-base px-8"
              >
                Get Started Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="PitchReady" className="w-7 h-7 rounded-md object-contain" />
              <span className="text-sm font-semibold text-slate-700">PitchReady</span>
            </div>
            <p className="text-sm text-slate-400">
              &copy; {new Date().getFullYear()} PitchReady. Built for aspiring FIFA agents.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
