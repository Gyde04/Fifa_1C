import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Clock, BarChart3, GraduationCap } from 'lucide-react';

const items = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Home' },
  { path: '/practice', icon: BookOpen, label: 'Practice' },
  { path: '/exam', icon: Clock, label: 'Exam' },
  { path: '/analytics', icon: BarChart3, label: 'Stats' },
  { path: '/study', icon: GraduationCap, label: 'Study' },
];

export default function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200 lg:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {items.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) => `
              flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg min-w-[56px]
              transition-colors duration-150
              ${isActive
                ? 'text-primary-600'
                : 'text-slate-400 hover:text-slate-600'
              }
            `}
          >
            <Icon size={20} />
            <span className="text-[10px] font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
