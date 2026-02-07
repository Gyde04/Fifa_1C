import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, Clock, History, BarChart3,
  GraduationCap, Flag, X,
} from 'lucide-react';
import { NAV_ITEMS } from '../../utils/constants';

const iconMap = {
  LayoutDashboard, BookOpen, Clock, History, BarChart3, GraduationCap, Flag,
};

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-64 bg-navy-800 text-white
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between h-16 px-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="PitchReady" className="w-8 h-8 rounded-lg object-contain" />
            <div>
              <h1 className="text-sm font-bold leading-tight">PitchReady</h1>
              <p className="text-[10px] text-slate-400 leading-tight">Agent Training</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 lg:hidden">
            <X size={18} />
          </button>
        </div>

        <nav className="p-3 space-y-1 mt-2">
          {NAV_ITEMS.map(item => {
            const Icon = iconMap[item.icon];
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                  transition-all duration-150
                  ${isActive
                    ? 'bg-primary-500/20 text-accent-400'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }
                `}
              >
                {Icon && <Icon size={18} />}
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-xs text-slate-400 mb-1">Passing Score</p>
            <p className="text-2xl font-bold text-accent-400">75%</p>
            <p className="text-[10px] text-slate-500 mt-1">FIFA Standard</p>
          </div>
        </div>
      </aside>
    </>
  );
}
