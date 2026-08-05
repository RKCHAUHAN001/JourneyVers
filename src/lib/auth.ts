import { UserProfileData, Booking } from '../types';

const USERS_STORAGE_KEY = 'journeyvers_users_db_v1';
const ACTIVE_SESSION_KEY = 'journeyvers_active_session_v1';
const BOOKINGS_STORAGE_KEY = 'journeyvers_user_bookings_v1';

interface StoredUserAccount {
  user: UserProfileData;
  passwordHash: string; // Plain/Base64 client hashed password
}

function hashPassword(str: string): string {
  // Simple deterministic client hash for local persistence
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash.toString(16) + '_jvers';
}

export function getRegisteredAccounts(): StoredUserAccount[] {
  try {
    const data = localStorage.getItem(USERS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Failed to load registered accounts', err);
    return [];
  }
}

export function signUpUser(data: {
  name: string;
  email: string;
  phone: string;
  password: string;
}): UserProfileData {
  const cleanEmail = data.email.trim().toLowerCase();
  const accounts = getRegisteredAccounts();

  const existing = accounts.find((acc) => acc.user.email.toLowerCase() === cleanEmail);
  if (existing) {
    throw new Error('An account with this email address already exists. Please sign in instead.');
  }

  const initialAvatar = `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop`;

  const newUser: UserProfileData = {
    id: `usr-${Date.now()}`,
    name: data.name.trim(),
    email: cleanEmail,
    phone: data.phone.trim() || '+91 98000 00000',
    avatar: initialAvatar,
    memberSince: new Date().getFullYear().toString(),
    savedPackageIds: [],
  };

  const newAccount: StoredUserAccount = {
    user: newUser,
    passwordHash: hashPassword(data.password),
  };

  accounts.push(newAccount);
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(accounts));
  setActiveSession(newUser);

  return newUser;
}

export function signInUser(data: { email: string; password: string }): UserProfileData {
  const cleanEmail = data.email.trim().toLowerCase();
  const accounts = getRegisteredAccounts();

  const account = accounts.find((acc) => acc.user.email.toLowerCase() === cleanEmail);
  if (!account) {
    throw new Error('No account found with this email address. Please sign up to create your account.');
  }

  if (account.passwordHash !== hashPassword(data.password)) {
    throw new Error('Incorrect password. Please verify your credentials and try again.');
  }

  setActiveSession(account.user);
  return account.user;
}

export function getActiveSession(): UserProfileData | null {
  try {
    const data = localStorage.getItem(ACTIVE_SESSION_KEY);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error('Failed to parse active session', err);
    return null;
  }
}

export function setActiveSession(user: UserProfileData | null): void {
  if (user) {
    localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(ACTIVE_SESSION_KEY);
  }
}

export function logoutUserSession(): void {
  localStorage.removeItem(ACTIVE_SESSION_KEY);
}

export function updateUserAccount(updatedUser: UserProfileData): void {
  setActiveSession(updatedUser);
  const accounts = getRegisteredAccounts();
  const index = accounts.findIndex((a) => a.user.id === updatedUser.id);
  if (index !== -1) {
    accounts[index].user = updatedUser;
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(accounts));
  }
}

// User Bookings Persistence
export function getUserBookings(userId?: string): Booking[] {
  try {
    const data = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    const allBookings: Booking[] = data ? JSON.parse(data) : [];
    if (!userId) return allBookings;
    return allBookings;
  } catch (err) {
    console.error('Failed to load user bookings', err);
    return [];
  }
}

export function saveUserBooking(newBooking: Booking): Booking[] {
  const existing = getUserBookings();
  const updated = [newBooking, ...existing];
  try {
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to persist booking', err);
  }
  return updated;
}
