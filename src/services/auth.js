import storage from './storage';
import { STORAGE_KEYS } from '../utils/constants';
import { generateId } from '../utils/formatters';

const authService = {
  async login(email, password) {
    const users = storage.get(STORAGE_KEYS.USERS) || [];
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user || user.password !== password) {
      throw new Error('Invalid email or password');
    }

    const { password: _, ...safeUser } = user;
    storage.set(STORAGE_KEYS.USER, safeUser);
    return safeUser;
  },

  async loginWithGoogle() {
    // Simulated Google OAuth - creates or logs in a Google user
    const users = storage.get(STORAGE_KEYS.USERS) || [];
    const googleEmail = 'user@gmail.com';
    let user = users.find(u => u.email === googleEmail);

    if (!user) {
      user = {
        id: generateId(),
        firstName: 'Google',
        lastName: 'User',
        email: googleEmail,
        password: null,
        role: 'user',
        authProvider: 'google',
        createdAt: new Date().toISOString(),
      };
      users.push(user);
      storage.set(STORAGE_KEYS.USERS, users);
    }

    const { password: _, ...safeUser } = user;
    storage.set(STORAGE_KEYS.USER, safeUser);
    return safeUser;
  },

  async sendMagicLink(email) {
    if (!email) throw new Error('Please enter your email');
    // Store the pending magic link email
    storage.set('fifa_magic_link', { email: email.toLowerCase(), sentAt: Date.now() });
    return true;
  },

  async verifyMagicLink(email) {
    const users = storage.get(STORAGE_KEYS.USERS) || [];
    let user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      // Auto-create account from magic link
      const parts = email.split('@')[0].split(/[._-]/);
      user = {
        id: generateId(),
        firstName: parts[0] ? parts[0].charAt(0).toUpperCase() + parts[0].slice(1) : 'User',
        lastName: parts[1] ? parts[1].charAt(0).toUpperCase() + parts[1].slice(1) : '',
        email: email.toLowerCase(),
        password: null,
        role: 'user',
        authProvider: 'magic_link',
        createdAt: new Date().toISOString(),
      };
      users.push(user);
      storage.set(STORAGE_KEYS.USERS, users);
    }

    const { password: _, ...safeUser } = user;
    storage.set(STORAGE_KEYS.USER, safeUser);
    storage.remove('fifa_magic_link');
    return safeUser;
  },

  async register({ firstName, lastName, email, password }) {
    const users = storage.get(STORAGE_KEYS.USERS) || [];

    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('An account with this email already exists');
    }

    const newUser = {
      id: generateId(),
      firstName,
      lastName,
      email: email.toLowerCase(),
      password,
      role: 'user',
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    storage.set(STORAGE_KEYS.USERS, users);

    const { password: _, ...safeUser } = newUser;
    storage.set(STORAGE_KEYS.USER, safeUser);
    return safeUser;
  },

  async getCurrentUser() {
    return storage.get(STORAGE_KEYS.USER);
  },

  async updateProfile(userId, updates) {
    const users = storage.get(STORAGE_KEYS.USERS) || [];
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) throw new Error('User not found');

    if (updates.email && updates.email !== users[idx].email) {
      if (users.some(u => u.email.toLowerCase() === updates.email.toLowerCase() && u.id !== userId)) {
        throw new Error('Email already in use');
      }
    }

    users[idx] = { ...users[idx], ...updates };
    storage.set(STORAGE_KEYS.USERS, users);

    const { password: _, ...safeUser } = users[idx];
    storage.set(STORAGE_KEYS.USER, safeUser);
    return safeUser;
  },

  async changePassword(userId, currentPassword, newPassword) {
    const users = storage.get(STORAGE_KEYS.USERS) || [];
    const user = users.find(u => u.id === userId);
    if (!user) throw new Error('User not found');

    if (user.password !== currentPassword) {
      throw new Error('Current password is incorrect');
    }

    user.password = newPassword;
    storage.set(STORAGE_KEYS.USERS, users);
    return true;
  },

  logout() {
    storage.remove(STORAGE_KEYS.USER);
    storage.remove(STORAGE_KEYS.EXAM_BACKUP);
  },

  async getAllUsers() {
    const users = storage.get(STORAGE_KEYS.USERS) || [];
    return users.map(({ password: _, ...u }) => u);
  },

  async updateUserRole(userId, role) {
    const users = storage.get(STORAGE_KEYS.USERS) || [];
    const user = users.find(u => u.id === userId);
    if (!user) throw new Error('User not found');
    user.role = role;
    storage.set(STORAGE_KEYS.USERS, users);
    const { password: _, ...safeUser } = user;
    return safeUser;
  },

  async deleteUser(userId) {
    let users = storage.get(STORAGE_KEYS.USERS) || [];
    users = users.filter(u => u.id !== userId);
    storage.set(STORAGE_KEYS.USERS, users);

    let results = storage.get(STORAGE_KEYS.RESULTS) || [];
    results = results.filter(r => r.userId !== userId);
    storage.set(STORAGE_KEYS.RESULTS, results);

    let flagged = storage.get(STORAGE_KEYS.FLAGGED) || [];
    flagged = flagged.filter(f => f.userId !== userId);
    storage.set(STORAGE_KEYS.FLAGGED, flagged);

    return true;
  },
};

export default authService;
