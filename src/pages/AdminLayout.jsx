import { Outlet, Navigate, NavLink } from 'react-router-dom';
import { ArrowLeft, Shield, FileQuestion, Users, BookMarked } from 'lucide-react';
import Button from '../components/ui/Button';
import useAuth from '../hooks/useAuth';

const navItems = [
  { path: '/admin', label: 'Overview', icon: Shield, end: true },
  { path: '/admin/questions', label: 'Questions', icon: FileQuestion },
  { path: '/admin/users', label: 'Users', icon: Users },
  { path: '/admin/materials', label: 'Materials', icon: BookMarked },
];

export default function AdminLayout() {
  const { isAdmin } = useAuth();

  if (!isAdmin) return <Navigate to="/dashboard" replace />;

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" icon={ArrowLeft} onClick={() => window.history.back()}>
          Back
        </Button>
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg overflow-x-auto">
          {navItems.map(({ path, label, icon: Icon, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              className={({ isActive }) => `
                flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-all
                ${isActive
                  ? 'bg-white text-primary-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
                }
              `}
            >
              <Icon size={14} />
              {label}
            </NavLink>
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
}
