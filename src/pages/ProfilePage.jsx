import { useState } from 'react';
import { User, Mail, Lock, Save } from 'lucide-react';
import Card, { CardBody, CardHeader } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { user, updateProfile, changePassword } = useAuth();
  const [profileForm, setProfileForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (!profileForm.firstName || !profileForm.lastName || !profileForm.email) {
      return toast.error('Please fill in all fields');
    }
    setProfileLoading(true);
    try {
      await updateProfile(profileForm);
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = passwordForm;
    if (!currentPassword || !newPassword) return toast.error('Please fill in all fields');
    if (newPassword.length < 6) return toast.error('Password must be at least 6 characters');
    if (newPassword !== confirmPassword) return toast.error('Passwords do not match');

    setPasswordLoading(true);
    try {
      await changePassword(currentPassword, newPassword);
      toast.success('Password changed successfully');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Profile</h1>

      <Card>
        <div className="px-6 py-6 flex items-center gap-4 border-b border-slate-100">
          <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center">
            <span className="text-xl font-bold text-primary-700">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-sm text-slate-500">{user?.email}</p>
            <Badge variant={user?.role === 'admin' ? 'accent' : 'primary'} size="sm" className="mt-1 capitalize">
              {user?.role}
            </Badge>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="font-semibold text-slate-800">Personal Information</h3>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="First Name"
                icon={User}
                value={profileForm.firstName}
                onChange={e => setProfileForm(f => ({ ...f, firstName: e.target.value }))}
              />
              <Input
                label="Last Name"
                value={profileForm.lastName}
                onChange={e => setProfileForm(f => ({ ...f, lastName: e.target.value }))}
              />
            </div>
            <Input
              label="Email"
              type="email"
              icon={Mail}
              value={profileForm.email}
              onChange={e => setProfileForm(f => ({ ...f, email: e.target.value }))}
            />
            <Button type="submit" loading={profileLoading} icon={Save}>
              Save Changes
            </Button>
          </form>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="font-semibold text-slate-800">Change Password</h3>
        </CardHeader>
        <CardBody>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <Input
              label="Current Password"
              type="password"
              icon={Lock}
              value={passwordForm.currentPassword}
              onChange={e => setPasswordForm(f => ({ ...f, currentPassword: e.target.value }))}
            />
            <Input
              label="New Password"
              type="password"
              icon={Lock}
              value={passwordForm.newPassword}
              onChange={e => setPasswordForm(f => ({ ...f, newPassword: e.target.value }))}
            />
            <Input
              label="Confirm New Password"
              type="password"
              icon={Lock}
              value={passwordForm.confirmPassword}
              onChange={e => setPasswordForm(f => ({ ...f, confirmPassword: e.target.value }))}
            />
            <Button type="submit" loading={passwordLoading} icon={Save}>
              Change Password
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
