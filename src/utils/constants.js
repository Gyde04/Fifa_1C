export const PASSING_SCORE = 75;

export const CATEGORIES = [
  'Laws of the Game',
  'Match Procedures',
  'Disciplinary Actions',
  'VAR & Technology',
  'Fitness & Positioning',
];

export const DIFFICULTY_LEVELS = ['easy', 'medium', 'hard'];

export const EXAM_TYPES = {
  PRACTICE: 'practice',
  MOCK: 'mock',
  CATEGORY: 'category',
};

export const EXAM_CONFIGS = {
  practice: { questions: 10, timeLimit: null, label: 'Practice Mode' },
  mock: { questions: 50, timeLimit: 90 * 60, label: 'Mock Exam' },
  category: { questions: 15, timeLimit: 20 * 60, label: 'Category Quiz' },
};

export const QUESTION_STATUS = {
  UNANSWERED: 'unanswered',
  ANSWERED: 'answered',
  FLAGGED: 'flagged',
  CURRENT: 'current',
};

export const STORAGE_KEYS = {
  USER: 'fifa_user',
  USERS: 'fifa_users',
  RESULTS: 'fifa_results',
  FLAGGED: 'fifa_flagged',
  SETTINGS: 'fifa_settings',
  EXAM_BACKUP: 'fifa_exam_backup',
};

export const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { path: '/practice', label: 'Practice', icon: 'BookOpen' },
  { path: '/exam', label: 'Mock Exam', icon: 'Clock' },
  { path: '/history', label: 'History', icon: 'History' },
  { path: '/analytics', label: 'Analytics', icon: 'BarChart3' },
  { path: '/study', label: 'Study', icon: 'GraduationCap' },
  { path: '/flagged', label: 'Flagged', icon: 'Flag' },
];

export const ADMIN_NAV_ITEMS = [
  { path: '/admin', label: 'Overview', icon: 'Shield' },
  { path: '/admin/questions', label: 'Questions', icon: 'FileQuestion' },
  { path: '/admin/users', label: 'Users', icon: 'Users' },
  { path: '/admin/materials', label: 'Materials', icon: 'BookMarked' },
];

export const CATEGORY_COLORS = {
  'Laws of the Game': { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200', hex: '#3b82f6' },
  'Match Procedures': { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200', hex: '#10b981' },
  'Disciplinary Actions': { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', hex: '#ef4444' },
  'VAR & Technology': { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200', hex: '#8b5cf6' },
  'Fitness & Positioning': { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200', hex: '#f59e0b' },
};

export const DIFFICULTY_COLORS = {
  easy: { bg: 'bg-success-50', text: 'text-success-700', label: 'Easy' },
  medium: { bg: 'bg-warning-50', text: 'text-warning-600', label: 'Medium' },
  hard: { bg: 'bg-danger-50', text: 'text-danger-700', label: 'Hard' },
};
