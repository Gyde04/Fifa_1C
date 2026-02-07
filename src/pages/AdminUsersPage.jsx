import { useState, useEffect } from 'react';
import { Search, Shield, ShieldOff, Trash2, Users } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import EmptyState from '../components/ui/EmptyState';
import useAuth from '../hooks/useAuth';
import authService from '../services/auth';
import { formatDate } from '../utils/formatters';
import toast from 'react-hot-toast';

export default function AdminUsersPage() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  const loadUsers = async () => {
    const allUsers = await authService.getAllUsers();
    setUsers(allUsers);
  };

  useEffect(() => { loadUsers(); }, []);

  const filteredUsers = search
    ? users.filter(u =>
        `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(search.toLowerCase())
      )
    : users;

  const handleRoleToggle = async (userId, currentRole) => {
    if (userId === currentUser?.id) return toast.error("Can't change your own role");
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    try {
      await authService.updateUserRole(userId, newRole);
      toast.success(`Role updated to ${newRole}`);
      loadUsers();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (userId) => {
    if (userId === currentUser?.id) return toast.error("Can't delete yourself");
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      await authService.deleteUser(userId);
      toast.success('User deleted');
      loadUsers();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">User Management</h1>
          <p className="text-slate-500">{users.length} registered user{users.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <Input
        icon={Search}
        placeholder="Search users..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="max-w-md"
      />

      {filteredUsers.length === 0 ? (
        <EmptyState icon={Users} title="No users found" description="No users match your search" />
      ) : (
        <div className="space-y-2">
          {filteredUsers.map(u => (
            <Card key={u.id}>
              <div className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary-700">
                      {u.firstName?.[0]}{u.lastName?.[0]}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {u.firstName} {u.lastName}
                      {u.id === currentUser?.id && <span className="text-xs text-slate-400 ml-1">(you)</span>}
                    </p>
                    <p className="text-xs text-slate-400">{u.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant={u.role === 'admin' ? 'accent' : 'neutral'}
                    size="sm"
                    className="capitalize"
                  >
                    {u.role}
                  </Badge>
                  <span className="text-xs text-slate-400 hidden sm:inline">
                    Joined {formatDate(u.createdAt)}
                  </span>
                  {u.id !== currentUser?.id && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleRoleToggle(u.id, u.role)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                        title={u.role === 'admin' ? 'Remove admin' : 'Make admin'}
                      >
                        {u.role === 'admin' ? <ShieldOff size={16} /> : <Shield size={16} />}
                      </button>
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-danger-500 hover:bg-danger-50 transition-colors"
                        title="Delete user"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
