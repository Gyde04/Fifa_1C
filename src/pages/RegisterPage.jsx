import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const { register, isAuthenticated } = useAuth();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const update = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = form;
    if (!firstName || !lastName || !email || !password) return toast.error('Please fill in all fields');
    if (password.length < 6) return toast.error('Password must be at least 6 characters');
    if (password !== confirmPassword) return toast.error('Passwords do not match');

    setLoading(true);
    try {
      await register({ firstName, lastName, email, password });
      toast.success('Account created successfully!');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-surface-alt">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-8">
          <img src="/logo.png" alt="PitchReady" className="w-10 h-10 rounded-xl object-contain" />
          <span className="text-xl font-bold text-slate-800">PitchReady</span>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-1">Create your account</h2>
        <p className="text-slate-500 mb-8">Start preparing for your FIFA agent exam</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="First Name"
              icon={User}
              placeholder="John"
              value={form.firstName}
              onChange={update('firstName')}
            />
            <Input
              label="Last Name"
              placeholder="Doe"
              value={form.lastName}
              onChange={update('lastName')}
            />
          </div>
          <Input
            label="Email"
            type="email"
            icon={Mail}
            placeholder="you@example.com"
            value={form.email}
            onChange={update('email')}
          />
          <Input
            label="Password"
            type="password"
            icon={Lock}
            placeholder="At least 6 characters"
            value={form.password}
            onChange={update('password')}
          />
          <Input
            label="Confirm Password"
            type="password"
            icon={Lock}
            placeholder="Repeat your password"
            value={form.confirmPassword}
            onChange={update('confirmPassword')}
          />
          <Button type="submit" fullWidth loading={loading} iconRight={ArrowRight}>
            Create Account
          </Button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-600 font-medium hover:text-primary-700">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
