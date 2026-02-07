import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Mail, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  );
}

export default function LoginPage() {
  const { loginWithGoogle, sendMagicLink, verifyMagicLink, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      toast.success('Welcome!');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMagicLink = async (e) => {
    e.preventDefault();
    if (!email) return toast.error('Please enter your email');
    setLoading(true);
    try {
      await sendMagicLink(email);
      setMagicLinkSent(true);
      toast.success('Magic link sent! Check your inbox.');
      // Auto-verify after brief delay (simulated)
      setTimeout(async () => {
        try {
          await verifyMagicLink(email);
          toast.success('Welcome!');
        } catch {
          toast.error('Link expired. Try again.');
          setMagicLinkSent(false);
        }
      }, 2500);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 gradient-hero items-center justify-center p-12 relative overflow-hidden">
        <img
          src="/hero.jpeg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-luminosity pointer-events-none"
        />
        <div className="relative max-w-md text-center">
          <img src="/logo.png" alt="PitchReady" className="w-20 h-20 rounded-2xl object-contain mx-auto mb-8" />
          <h1 className="text-4xl font-bold text-white mb-4">PitchReady</h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Master the Laws of the Game and ace your FIFA agent examination with comprehensive practice tools.
          </p>
          <div className="flex items-center justify-center gap-6 mt-10 text-sm text-slate-400">
            <div><span className="block text-2xl font-bold text-white">100+</span>Questions</div>
            <div className="w-px h-10 bg-white/20" />
            <div><span className="block text-2xl font-bold text-white">5</span>Categories</div>
            <div className="w-px h-10 bg-white/20" />
            <div><span className="block text-2xl font-bold text-white">75%</span>Pass Mark</div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 bg-surface-alt">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <img src="/logo.png" alt="PitchReady" className="w-10 h-10 rounded-xl object-contain" />
            <span className="text-xl font-bold text-slate-800">PitchReady</span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-1">Get started</h2>
          <p className="text-slate-500 mb-8">Sign in to continue your preparation</p>

          {magicLinkSent ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-2xl bg-success-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-success-500" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Check your inbox</h3>
              <p className="text-sm text-slate-500 mb-1">
                We sent a magic link to
              </p>
              <p className="text-sm font-semibold text-slate-700 mb-6">{email}</p>
              <div className="flex items-center justify-center gap-2 text-sm text-primary-600">
                <Sparkles size={16} className="animate-spin" />
                Verifying...
              </div>
            </div>
          ) : (
            <>
              <button
                onClick={handleGoogle}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-150 shadow-sm disabled:opacity-50"
              >
                <GoogleIcon />
                Continue with Google
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-surface-alt px-3 text-slate-400">or</span>
                </div>
              </div>

              <form onSubmit={handleSendMagicLink} className="space-y-4">
                <Input
                  label="Email address"
                  type="email"
                  icon={Mail}
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <Button type="submit" fullWidth loading={loading} iconRight={ArrowRight}>
                  Send Magic Link
                </Button>
              </form>

              <p className="text-center text-xs text-slate-400 mt-6">
                No password needed. We'll email you a secure sign-in link.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
