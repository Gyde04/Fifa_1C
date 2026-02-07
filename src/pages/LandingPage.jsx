import { useNavigate } from 'react-router-dom';
import {
  BookOpen, Clock, BarChart3, CheckCircle, ArrowRight,
  Zap, Target, Trophy, Flag, GraduationCap, ChevronRight,
  Star, Award, Sparkles, Play, ShieldCheck, TrendingUp,
} from 'lucide-react';
import useAuth from '../hooks/useAuth';

const features = [
  {
    icon: BookOpen,
    title: 'Smart Practice Mode',
    description: 'Study at your own pace with instant feedback and detailed explanations for every question.',
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    icon: Clock,
    title: 'Timed Mock Exams',
    description: 'Simulate real exam conditions with timed tests, auto-submit, and question navigation.',
    gradient: 'from-violet-500 to-purple-400',
  },
  {
    icon: BarChart3,
    title: 'Performance Analytics',
    description: 'Track your progress with detailed charts showing score trends, strengths, and weak areas.',
    gradient: 'from-emerald-500 to-teal-400',
  },
  {
    icon: Target,
    title: 'Category Focus',
    description: 'Target specific topics like Laws of the Game, VAR, or Disciplinary Actions.',
    gradient: 'from-amber-500 to-orange-400',
  },
  {
    icon: Flag,
    title: 'Flag & Review',
    description: 'Flag tricky questions during practice and revisit them later for focused revision.',
    gradient: 'from-rose-500 to-pink-400',
  },
  {
    icon: GraduationCap,
    title: 'Study Materials',
    description: 'Access curated guides, PDFs, and video resources to deepen your understanding.',
    gradient: 'from-indigo-500 to-blue-400',
  },
];

const steps = [
  { num: '01', title: 'Sign In', description: 'Quick sign-in with Google or a magic link — no passwords needed.', icon: Sparkles },
  { num: '02', title: 'Choose Your Mode', description: 'Practice by topic, timed mock exam, or review flagged questions.', icon: Play },
  { num: '03', title: 'Learn & Improve', description: 'Get instant feedback with explanations and track progress over time.', icon: TrendingUp },
  { num: '04', title: 'Pass Your Exam', description: 'Build confidence and pass with a score of 75% or higher.', icon: Trophy },
];

const categories = [
  { name: 'Laws of the Game', count: 21, gradient: 'from-blue-500 to-blue-600', badge: 'bg-blue-500/20 text-blue-300' },
  { name: 'Match Procedures', count: 21, gradient: 'from-emerald-500 to-emerald-600', badge: 'bg-emerald-500/20 text-emerald-300' },
  { name: 'Disciplinary Actions', count: 21, gradient: 'from-red-500 to-red-600', badge: 'bg-red-500/20 text-red-300' },
  { name: 'VAR & Technology', count: 21, gradient: 'from-violet-500 to-violet-600', badge: 'bg-violet-500/20 text-violet-300' },
  { name: 'Fitness & Positioning', count: 21, gradient: 'from-amber-500 to-amber-600', badge: 'bg-amber-500/20 text-amber-300' },
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
    <div className="min-h-screen bg-[#0a0e1a] overflow-hidden">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#0a0e1a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="PitchReady" className="w-9 h-9 rounded-lg object-contain" />
            <span className="text-lg font-bold text-white">PitchReady</span>
          </div>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors"
              >
                Dashboard
                <ArrowRight size={16} />
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors"
                >
                  Get Started
                  <ArrowRight size={16} />
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative">
        {/* Watermark background */}
        <img
          src="/watermark.jpeg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-[0.06] pointer-events-none"
        />
        {/* Decorative blobs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-600/15 via-cyan-500/10 to-transparent rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-violet-600/12 via-purple-500/8 to-transparent rounded-full blur-3xl translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-emerald-600/8 via-teal-500/6 to-transparent rounded-full blur-3xl -translate-x-1/4 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-20 lg:pt-24 lg:pb-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 text-slate-300 rounded-full text-sm font-medium mb-8 border border-white/10 backdrop-blur-sm">
              <Sparkles size={16} className="text-amber-400" />
              FIFA Agent Exam Preparation Platform
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] mb-6 tracking-tight">
              <span className="text-white">Ace Your FIFA Agent </span>
              <span className="landing-gradient-text">Exam</span>
              <br />
              <span className="text-white">with </span>
              <span className="landing-gradient-text-alt">Confidence</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto">
              Practice with 105+ real exam questions, take timed mock tests, and track your performance across all categories. Everything you need to pass on your first attempt.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleGetStarted}
                className="group inline-flex items-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 text-white text-base font-semibold rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/35 hover:-translate-y-0.5 transition-all duration-200"
              >
                Start Practicing Free
                <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-slate-300 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:text-white transition-all duration-200"
              >
                See How It Works
              </button>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-16 lg:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="group relative text-center p-5 bg-white/[0.03] rounded-2xl border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/10 hover:-translate-y-0.5 transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mx-auto mb-3 shadow-sm shadow-primary-500/20 group-hover:scale-105 transition-transform">
                  <Icon size={20} className="text-white" />
                </div>
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-sm text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1224] via-[#0f1428] to-[#0d1224]" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-semibold mb-4 uppercase tracking-wide border border-emerald-500/20">
              <ShieldCheck size={14} />
              Complete Toolkit
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything You Need to Prepare
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              A complete toolkit designed specifically for FIFA agent exam candidates.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, description, gradient }) => (
              <div
                key={title}
                className="group bg-white/[0.03] rounded-2xl p-6 border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/10 hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-gradient-to-br from-violet-600/8 via-blue-600/5 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-violet-500/10 text-violet-400 rounded-full text-xs font-semibold mb-4 uppercase tracking-wide border border-violet-500/20">
              <Zap size={14} />
              Quick Start
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Get started in minutes and build your path to exam success.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map(({ num, title, description, icon: StepIcon }, idx) => (
              <div key={num} className="relative text-center group">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary-500/20 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-primary-500/30 transition-all duration-300">
                    <StepIcon size={28} className="text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-accent-400 to-accent-500 rounded-lg flex items-center justify-center text-xs font-bold text-white shadow-sm">
                    {num}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
                {idx < steps.length - 1 && (
                  <ChevronRight size={20} className="hidden lg:block absolute top-7 -right-4 text-slate-600" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1224] via-[#0f1428] to-[#0d1224]" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-full text-xs font-semibold mb-4 uppercase tracking-wide border border-blue-500/20">
              <BookOpen size={14} />
              Comprehensive Coverage
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              5 Core Exam Categories
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Comprehensive coverage of every topic on the FIFA agent exam.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {categories.map(({ name, count, gradient, badge }) => (
              <div
                key={name}
                className="group bg-white/[0.03] rounded-2xl p-5 border border-white/[0.06] text-center hover:bg-white/[0.06] hover:border-white/10 hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} mx-auto mb-3 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  <CheckCircle size={24} className="text-white" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">{name}</h3>
                <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${badge}`}>
                  {count} questions
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial / Social Proof */}
      <section className="py-24 lg:py-32 relative">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-bl from-amber-500/8 via-orange-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white/[0.03] rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-white/[0.06]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary-500/10 to-transparent rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent-500/8 to-transparent rounded-full blur-2xl" />

            <div className="relative text-center">
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={22} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <blockquote className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto italic">
                "PitchReady made my FIFA exam preparation efficient and focused. The timed mock exams and detailed analytics helped me identify my weak areas and improve systematically."
              </blockquote>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold text-sm">
                  AK
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-white">Ahmed K.</p>
                  <p className="text-xs text-slate-500">Licensed FIFA Agent</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Multi-layer gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-700 to-primary-800" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <img
              src="/hero.jpeg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-luminosity pointer-events-none"
            />

            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-accent-400/20 to-transparent rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-400/20 to-transparent rounded-full blur-2xl" />

            <div className="relative px-8 py-14 sm:px-14 sm:py-20 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 border border-white/10">
                <Award size={32} className="text-accent-400" />
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
                Ready to Pass Your Exam?
              </h2>
              <p className="text-lg text-slate-300 max-w-xl mx-auto mb-10">
                Join aspiring FIFA agents who are preparing smarter. Start practicing today — it's completely free.
              </p>
              <button
                onClick={handleGetStarted}
                className="group inline-flex items-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600 text-white text-base font-semibold rounded-xl shadow-lg shadow-accent-500/30 hover:shadow-xl hover:shadow-accent-500/40 hover:-translate-y-0.5 transition-all duration-200"
              >
                Get Started Now
                <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="PitchReady" className="w-7 h-7 rounded-md object-contain" />
              <span className="text-sm font-semibold text-slate-300">PitchReady</span>
            </div>
            <p className="text-sm text-slate-600">
              &copy; {new Date().getFullYear()} PitchReady. Built for aspiring FIFA agents.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
