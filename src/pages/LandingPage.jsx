import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen, Clock, BarChart3, CheckCircle, ArrowRight,
  Zap, Target, Trophy, Flag, GraduationCap, ChevronRight,
  Star, Sparkles, Play, TrendingUp, Lightbulb, ChevronDown,
  ArrowUpRight, Shield, Award, Users, Mail,
} from 'lucide-react';
import useAuth from '../hooks/useAuth';

/* ─── Data ─── */

const featureCards = [
  {
    num: '01',
    icon: BookOpen,
    title: 'Smart Practice Mode',
    description: 'Study at your own pace with instant feedback and detailed explanations for every question. Filter by category and difficulty.',
    image: '/football-action.jpg',
  },
  {
    num: '02',
    icon: Clock,
    title: 'Timed Mock Exams',
    description: 'Simulate real FIFA exam conditions with 20-question timed tests, auto-submit, and comprehensive result breakdowns.',
    image: '/football-match.jpg',
  },
  {
    num: '03',
    icon: BarChart3,
    title: 'Performance Analytics',
    description: 'Track your progress with detailed charts showing score trends, category strengths, and areas that need improvement.',
    image: '/football-strategy.jpg',
  },
  {
    num: '04',
    icon: GraduationCap,
    title: 'Study & Review Tools',
    description: 'Access curated study materials, flag tricky questions for later review, and build a personalized revision schedule.',
    image: '/football-ball.jpg',
  },
];

const processSteps = [
  { num: '01', icon: Sparkles, title: 'Create Account', description: 'Quick sign-in with Google or magic link — no passwords, no hassle.' },
  { num: '02', icon: Play, title: 'Choose Your Mode', description: 'Practice by topic, take a full timed mock exam, or review flagged questions.' },
  { num: '03', icon: TrendingUp, title: 'Learn & Improve', description: 'Get instant feedback with expert explanations and track your progress.' },
  { num: '04', icon: Trophy, title: 'Pass Your Exam', description: 'Build confidence and pass the FIFA agent exam with 75% or higher.' },
];

const categories = [
  { name: 'Laws of the Game', count: 21, icon: BookOpen, color: 'from-blue-500/20 to-blue-600/5' },
  { name: 'Match Procedures', count: 21, icon: Shield, color: 'from-emerald-500/20 to-emerald-600/5' },
  { name: 'Disciplinary Actions', count: 21, icon: Flag, color: 'from-red-500/20 to-red-600/5' },
  { name: 'VAR & Technology', count: 21, icon: Zap, color: 'from-violet-500/20 to-violet-600/5' },
  { name: 'Fitness & Positioning', count: 21, icon: Target, color: 'from-amber-500/20 to-amber-600/5' },
];

const stats = [
  { value: '105+', label: 'Exam Questions' },
  { value: '5', label: 'Topic Categories' },
  { value: '75%', label: 'Pass Mark Required' },
  { value: '3', label: 'Practice Modes' },
];

const testimonials = [
  {
    initials: 'AK',
    name: 'Ahmed K.',
    title: 'Licensed FIFA Agent',
    quote: 'PitchReady made my exam preparation efficient and focused. The timed mock exams and detailed analytics helped me identify weak areas and improve systematically. Passed on my second attempt.',
    rating: 5,
  },
  {
    initials: 'MS',
    name: 'Maria S.',
    title: 'Passed First Attempt — Spain',
    quote: 'I was nervous about the exam, but PitchReady\'s practice mode and instant feedback gave me the confidence I needed. The category focus feature was incredibly helpful for targeting my weak spots.',
    rating: 5,
  },
  {
    initials: 'JT',
    name: 'John T.',
    title: 'Football Agent — UK',
    quote: 'The category focus feature was a game-changer. I could zero in on my weakest topics and drill them until I felt confident. The analytics showed exactly where I needed to improve. Highly recommend.',
    rating: 5,
  },
];

const faqs = [
  {
    question: 'What is the FIFA Football Agent Exam?',
    answer: 'The FIFA Football Agent Exam is a mandatory examination for anyone seeking to become a licensed football agent. It covers the Laws of the Game, match procedures, disciplinary actions, VAR technology, and fitness & positioning. The exam consists of 20 multiple-choice questions with a 75% pass mark.',
  },
  {
    question: 'How many questions are on the real exam?',
    answer: 'The official FIFA exam consists of 20 multiple-choice questions. You need to score at least 75% (15 out of 20 correct) to pass. PitchReady provides over 105 practice questions across all five categories to ensure thorough preparation.',
  },
  {
    question: 'Is PitchReady free to use?',
    answer: 'Yes — PitchReady is completely free. Access all practice questions, mock exams, study materials, and performance analytics without any payment or subscription.',
  },
  {
    question: 'How does the timed mock exam work?',
    answer: 'The timed mock exam simulates real conditions. You receive 20 randomly selected questions with a set time limit. The exam auto-submits when time expires, then provides detailed results showing your score, correct answers, and explanations for every question.',
  },
  {
    question: 'Can I track my progress over time?',
    answer: 'Absolutely. PitchReady includes comprehensive analytics tracking your performance across all categories. View score trends, identify weak areas, monitor improvement with visual charts, and get personalized recommendations on what to study next.',
  },
];

const highlights = [
  { icon: CheckCircle, text: 'Real FIFA exam question format' },
  { icon: CheckCircle, text: 'Detailed explanations for every answer' },
  { icon: CheckCircle, text: 'Track progress across all 5 categories' },
  { icon: CheckCircle, text: '100% free — no hidden fees' },
];

/* ─── Component ─── */

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [openFaq, setOpenFaq] = useState(null);

  const handleGetStarted = () => {
    navigate(isAuthenticated ? '/dashboard' : '/login');
  };

  return (
    <div className="min-h-screen bg-navy-950 overflow-hidden">

      {/* ━━━ Navbar ━━━ */}
      <nav className="sticky top-0 z-50 bg-navy-950/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="PitchReady" className="w-10 h-10 rounded-xl object-contain" />
            <span className="text-xl font-bold text-white tracking-tight">PitchReady</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm font-medium text-slate-400 hover:text-white transition-colors link-underline">Features</button>
            <button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm font-medium text-slate-400 hover:text-white transition-colors link-underline">How It Works</button>
            <button onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm font-medium text-slate-400 hover:text-white transition-colors link-underline">Categories</button>
            <button onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm font-medium text-slate-400 hover:text-white transition-colors link-underline">FAQ</button>
          </div>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <button onClick={() => navigate('/dashboard')} className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-navy-950 bg-accent-400 hover:bg-accent-300 rounded-lg transition-all duration-200">
                Dashboard
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            ) : (
              <>
                <button onClick={() => navigate('/login')} className="hidden sm:block px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
                  Sign In
                </button>
                <button onClick={() => navigate('/login')} className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-navy-950 bg-accent-400 hover:bg-accent-300 rounded-lg transition-all duration-200">
                  Get Started
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ━━━ Hero — Split Layout ━━━ */}
      <section className="relative">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950" />
        <div className="absolute top-0 right-0 w-[60%] h-full opacity-[0.07]">
          <img src="/watermark.jpeg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary-500/[0.08] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent-400/[0.06] rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 sm:pt-16 sm:pb-24 lg:pt-24 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Text */}
            <div className="text-center lg:text-left">
              <div className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-accent-400/10 border border-accent-400/20 text-accent-400 rounded-full text-xs font-semibold uppercase tracking-widest mb-8">
                <Award size={14} />
                FIFA Agent Exam Preparation
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-black leading-[1.1] mb-5 sm:mb-6 tracking-tight">
                <span className="text-white">Master Your </span>
                <span className="text-accent-400">FIFA Agent</span>
                <br />
                <span className="text-white">Exam With </span>
                <span className="text-primary-400">Precision</span>
              </h1>

              <p className="text-sm sm:text-lg text-slate-400 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                Practice with 105+ real exam questions, simulate timed tests, and track your performance. Everything you need to pass on your first attempt.
              </p>

              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-10">
                <button
                  onClick={handleGetStarted}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-accent-400 hover:bg-accent-300 text-navy-950 text-base font-bold rounded-xl shadow-lg shadow-accent-400/20 hover:shadow-xl hover:shadow-accent-400/30 hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto justify-center"
                >
                  Get Started
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <button
                  onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hidden sm:inline-flex group items-center gap-2 px-6 py-4 text-base font-medium text-slate-300 hover:text-white transition-all duration-200"
                >
                  See How It Works
                  <ArrowUpRight size={16} className="text-accent-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>

              {/* Highlights — hidden on mobile */}
              <div className="hidden sm:grid grid-cols-2 gap-3">
                {highlights.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2">
                    <Icon size={16} className="text-accent-400 shrink-0" />
                    <span className="text-xs sm:text-sm text-slate-400">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Hero Image (hidden on mobile) */}
            <div className="hidden lg:block relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-white/[0.08]">
                <img src="/stadium-hero.jpg" alt="Football stadium at night" className="w-full h-auto" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-navy-950/20 pointer-events-none" />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-6 -left-6 bg-navy-800/90 backdrop-blur-xl border border-white/[0.08] rounded-xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent-400/20 flex items-center justify-center">
                    <Trophy size={20} className="text-accent-400" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white leading-none">75%</p>
                    <p className="text-xs text-slate-400">Pass Mark</p>
                  </div>
                </div>
              </div>
              {/* Floating questions card */}
              <div className="absolute -top-4 -right-4 bg-navy-800/90 backdrop-blur-xl border border-white/[0.08] rounded-xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center">
                    <BookOpen size={20} className="text-primary-400" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white leading-none">105+</p>
                    <p className="text-xs text-slate-400">Questions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ Stats Counter Bar ━━━ */}
      <section className="relative border-y border-white/[0.06] bg-navy-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map(({ value, label }, idx) => (
              <div
                key={label}
                className={`py-6 sm:py-10 lg:py-14 text-center ${idx < stats.length - 1 ? 'sm:border-r border-white/[0.06]' : ''} ${idx < 2 ? 'border-b sm:border-b lg:border-b-0 border-white/[0.06]' : ''}`}
              >
                <p className="text-2xl sm:text-4xl lg:text-5xl font-black text-white counter-stat mb-1">{value}</p>
                <p className="text-xs sm:text-sm text-slate-500 uppercase tracking-wider font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ Feature Cards — Numbered (Induyst-style) ━━━ */}
      <section id="features" className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900/50 to-navy-950" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-500/10 text-primary-400 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-primary-500/20">
                <Shield size={14} />
                Complete Toolkit
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Everything You Need<br className="hidden sm:block" /> to Prepare
              </h2>
            </div>
            <p className="text-base text-slate-400 max-w-md lg:text-right">
              Four powerful tools designed specifically for FIFA agent exam candidates. Practice smarter, not harder.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {featureCards.map(({ num, icon: Icon, title, description, image }) => (
              <div
                key={num}
                className="group relative bg-white/[0.02] rounded-2xl border border-white/[0.06] overflow-hidden hover:border-white/[0.12] hover:bg-white/[0.04] card-glow transition-all duration-500"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Content */}
                  <div className="flex-1 p-6 sm:p-8">
                    <span className="text-xs font-bold text-accent-400/60 num-badge">{num}</span>
                    <div className="flex items-center gap-3 mt-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
                        <Icon size={20} className="text-primary-400" />
                      </div>
                      <h3 className="text-lg font-bold text-white">{title}</h3>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed mb-4">{description}</p>
                    <button onClick={handleGetStarted} className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-400 hover:text-accent-300 transition-colors">
                      Try It Now <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                  {/* Image */}
                  <div className="sm:w-48 lg:w-56 shrink-0">
                    <img src={image} alt={title} className="w-full h-48 sm:h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ About / Why Choose PitchReady — Split Layout ━━━ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-navy-950" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-accent-400/[0.04] rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left — Images */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden border border-white/[0.06]">
                    <img src="/football-training.jpg" alt="Football training" className="w-full h-56 object-cover" />
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-white/[0.06]">
                    <img src="/football-field.jpg" alt="Football pitch" className="w-full h-36 object-cover" />
                  </div>
                </div>
                <div className="pt-8 space-y-4">
                  <div className="rounded-2xl overflow-hidden border border-white/[0.06]">
                    <img src="/football-ball.jpg" alt="Football close-up" className="w-full h-56 object-cover" />
                  </div>
                  <div className="rounded-2xl bg-accent-400/10 border border-accent-400/20 p-6 flex flex-col items-center justify-center text-center">
                    <p className="text-3xl font-black text-accent-400 mb-1">19%</p>
                    <p className="text-xs text-slate-400">Global pass rate — be in the top tier</p>
                  </div>
                </div>
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-l-2 border-b-2 border-accent-400/30 rounded-bl-2xl pointer-events-none" />
            </div>

            {/* Right — Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-400/10 text-accent-400 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 border border-accent-400/20">
                <Award size={14} />
                Why PitchReady
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
                The Smartest Way to<br /> Prepare for Your<br /> <span className="text-accent-400">FIFA Exam</span>
              </h2>
              <p className="text-base text-slate-400 leading-relaxed mb-8">
                The FIFA Football Agent Exam has a global pass rate of just 19%. PitchReady gives you the structured practice, real-time analytics, and comprehensive coverage you need to be part of the successful minority.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { icon: Target, label: 'Targeted category practice to eliminate weak spots' },
                  { icon: BarChart3, label: 'Real-time analytics tracking your improvement' },
                  { icon: Clock, label: 'Timed mock exams simulating real conditions' },
                  { icon: Lightbulb, label: 'Expert explanations for every single question' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-primary-400" />
                    </div>
                    <span className="text-sm text-slate-300">{label}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleGetStarted}
                className="group inline-flex items-center gap-3 px-7 py-3.5 bg-accent-400 hover:bg-accent-300 text-navy-950 text-sm font-bold rounded-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Start Preparing Now
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ How It Works ━━━ */}
      <section id="how-it-works" className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900/30 to-navy-950" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-500/10 text-primary-400 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-primary-500/20">
              <Zap size={14} />
              Quick Start
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
              How It Works
            </h2>
            <p className="text-base text-slate-400 max-w-2xl mx-auto">
              Get started in minutes. Four simple steps to exam-ready confidence.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map(({ num, icon: StepIcon, title, description }, idx) => (
              <div key={num} className="relative group">
                <div className="bg-white/[0.02] rounded-2xl border border-white/[0.06] p-6 hover:border-white/[0.12] hover:bg-white/[0.04] card-glow transition-all duration-400 h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
                      <StepIcon size={24} className="text-primary-400" />
                    </div>
                    <span className="text-3xl font-black text-white/[0.06] num-badge">{num}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
                </div>
                {idx < processSteps.length - 1 && (
                  <ChevronRight size={20} className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 text-white/[0.1]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ Categories ━━━ */}
      <section id="categories" className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-navy-950" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-500/10 text-primary-400 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-primary-500/20">
                <BookOpen size={14} />
                Comprehensive Coverage
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                5 Core Exam Categories
              </h2>
            </div>
            <p className="text-base text-slate-400 max-w-md lg:text-right">
              Every topic area covered by the official FIFA Football Agent Examination.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {categories.map(({ name, count, icon: CatIcon, color }) => (
              <div
                key={name}
                className="group bg-white/[0.02] rounded-2xl border border-white/[0.06] p-6 text-center hover:border-white/[0.12] hover:bg-white/[0.04] card-glow transition-all duration-400"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <CatIcon size={24} className="text-white/80" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1">{name}</h3>
                <span className="text-xs text-slate-500 font-medium">{count} questions</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ Testimonials ━━━ */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900/30 to-navy-950" />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary-500/[0.05] rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-400/10 text-accent-400 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-accent-400/20">
              <Users size={14} />
              Testimonials
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
              What Our Users Say
            </h2>
            <p className="text-base text-slate-400 max-w-2xl mx-auto">
              Hear from candidates who prepared with PitchReady and passed their exam.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(({ initials, name, title, quote, rating }) => (
              <div
                key={name}
                className="group bg-white/[0.02] rounded-2xl border border-white/[0.06] p-8 hover:border-white/[0.12] hover:bg-white/[0.04] card-glow transition-all duration-400 relative"
              >
                {/* Quotation mark */}
                <div className="absolute top-6 right-6 text-5xl font-serif text-white/[0.04] leading-none select-none">"</div>

                <div className="flex gap-0.5 mb-5">
                  {[...Array(rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-accent-400 fill-accent-400" />
                  ))}
                </div>
                <blockquote className="text-sm text-slate-300 leading-relaxed mb-6 relative z-10">
                  "{quote}"
                </blockquote>
                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-sm">
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{name}</p>
                    <p className="text-xs text-slate-500">{title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ FAQ Accordion ━━━ */}
      <section id="faq" className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-navy-950" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-500/10 text-primary-400 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-primary-500/20">
              <Lightbulb size={14} />
              FAQ
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-slate-400">
              Everything you need to know about PitchReady and the FIFA exam.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map(({ question, answer }, idx) => (
              <div
                key={idx}
                className={`rounded-xl border transition-colors duration-300 ${openFaq === idx ? 'border-primary-500/30 bg-white/[0.03]' : 'border-white/[0.06] bg-white/[0.01]'}`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left group"
                >
                  <span className="text-base font-medium text-white pr-4">{question}</span>
                  <ChevronDown
                    size={20}
                    className={`text-slate-500 shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-accent-400' : 'group-hover:text-slate-300'}`}
                  />
                </button>
                <div className={`faq-content ${openFaq === idx ? 'open' : ''}`}>
                  <div>
                    <p className="px-6 pb-5 text-sm text-slate-400 leading-relaxed">{answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ CTA Banner ━━━ */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900/30 to-navy-950" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background image */}
            <img src="/stadium-hero.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-navy-950/90 via-primary-900/80 to-navy-950/90" />

            <div className="relative px-8 py-16 sm:px-16 sm:py-24 text-center">
              <div className="w-16 h-16 rounded-2xl bg-accent-400/20 flex items-center justify-center mx-auto mb-8 border border-accent-400/20">
                <Award size={32} className="text-accent-400" />
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5 leading-tight tracking-tight">
                Ready to Pass Your<br />FIFA Agent Exam?
              </h2>
              <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto mb-10">
                Join aspiring FIFA agents who are preparing smarter. Start practicing today — it's completely free.
              </p>
              <button
                onClick={handleGetStarted}
                className="group inline-flex items-center gap-3 px-10 py-4 bg-accent-400 hover:bg-accent-300 text-navy-950 text-base font-bold rounded-xl shadow-lg shadow-accent-400/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Get Started Now
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ Footer ━━━ */}
      <footer className="relative bg-navy-950 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="col-span-2 lg:col-span-4">
              <div className="flex items-center gap-3 mb-5">
                <img src="/logo.png" alt="PitchReady" className="w-10 h-10 rounded-xl object-contain" />
                <span className="text-xl font-bold text-white tracking-tight">PitchReady</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-xs">
                The smartest way to prepare for your FIFA Football Agent Exam. Practice, analyze, and pass with confidence.
              </p>
              {/* Social Icons */}
              <div className="flex gap-3">
                {[
                  { label: 'Twitter', path: 'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z' },
                  { label: 'LinkedIn', path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z' },
                  { label: 'YouTube', path: 'M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17M10 15l5-3-5-3z' },
                ].map(({ label, path }) => (
                  <a key={label} href="#" className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.12] flex items-center justify-center transition-all duration-200" aria-label={label}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><path d={path} /></svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Product */}
            <div className="lg:col-span-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-5">Product</h4>
              <ul className="space-y-3">
                {['Practice Mode', 'Mock Exams', 'Analytics', 'Study Materials'].map((link) => (
                  <li key={link}><a href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="lg:col-span-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-5">Resources</h4>
              <ul className="space-y-3">
                {['FIFA Exam Guide', 'Study Tips', 'Blog', 'FAQ'].map((link) => (
                  <li key={link}><a href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="col-span-2 lg:col-span-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-5">Stay Updated</h4>
              <p className="text-sm text-slate-500 mb-4">Get exam tips and prep strategies delivered to your inbox.</p>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary-500/50 focus:bg-white/[0.06] transition-all"
                  />
                </div>
                <button className="px-5 py-3 bg-accent-400 hover:bg-accent-300 text-navy-950 text-sm font-bold rounded-lg transition-colors shrink-0">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-600">
              &copy; {new Date().getFullYear()} PitchReady. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
                <a key={link} href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
