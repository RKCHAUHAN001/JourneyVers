import React, { useState } from 'react';
import { UserProfileData } from '../types';
import { signUpUser, signInUser } from '../lib/auth';
import { signInWithGoogle } from '../lib/firebase';
import { User, Lock, Mail, Phone, Compass } from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess: (user: UserProfileData) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setErrorMsg('');
    setIsGoogleLoading(true);
    try {
      const user = await signInWithGoogle();
      onLoginSuccess(user);
    } catch (err: unknown) {
      console.error('Google sign-in error:', err);
      if (err instanceof Error) {
        setErrorMsg(`Google Authentication failed: ${err.message}`);
      } else {
        setErrorMsg('Google Sign-in failed. Please try again.');
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !password) {
      setErrorMsg('Please enter your email and password.');
      return;
    }

    if (password.length < 4) {
      setErrorMsg('Password must be at least 4 characters long.');
      return;
    }

    if (isSignUp && !name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    try {
      if (isSignUp) {
        const newUser = signUpUser({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          password,
        });
        onLoginSuccess(newUser);
      } else {
        const user = signInUser({
          email: email.trim(),
          password,
        });
        onLoginSuccess(user);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[700] flex items-center justify-center p-4 bg-[#1A1A1A]/60 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-white border border-[#DCD6C8] rounded-3xl p-6 sm:p-8 shadow-2xl text-[#1A1A1A] animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#F0EEE9] text-[#5A554C] hover:text-[#1A1A1A]"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#F0EEE9] border border-[#DCD6C8] mx-auto mb-3 shadow-sm flex items-center justify-center">
            <Compass className="w-5 h-5 text-[#8C7A5B]" />
          </div>
          <h2 className="font-serif-display text-2xl text-[#1A1A1A] font-bold">
            {isSignUp ? 'Join JOURNEYVERS' : 'Traveler Sign In'}
          </h2>
          <p className="text-xs text-[#5A554C] mt-1">
            {isSignUp
              ? 'Create an account to manage bookings & track tour itineraries'
              : 'Sign in to access your real-time itineraries & saved tour packages'}
          </p>
        </div>

        {/* Google OAuth Button */}
        <div className="mb-5 space-y-3">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
            className="w-full py-3 px-4 rounded-xl bg-white hover:bg-[#F0EEE9] text-[#1A1A1A] font-bold text-xs border border-[#DCD6C8] shadow-sm flex items-center justify-center gap-3 transition-all disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{isGoogleLoading ? 'Connecting to Google...' : 'Continue with Google'}</span>
          </button>

          <div className="relative text-center my-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#DCD6C8]" />
            </div>
            <span className="relative px-3 bg-white text-[10px] uppercase tracking-wider text-[#7A756C]">
              Or continue with email
            </span>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs text-center font-medium">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-[#7A756C]">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-[#8C7A5B] absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Maharani Ananya Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#F0EEE9] border border-[#DCD6C8] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-[#7A756C]">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#8C7A5B] absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F0EEE9] border border-[#DCD6C8] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
              />
            </div>
          </div>

          {isSignUp && (
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-[#7A756C]">Phone Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#8C7A5B] absolute left-3 top-3" />
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#F0EEE9] border border-[#DCD6C8] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-[#7A756C]">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8C7A5B] absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#F0EEE9] border border-[#DCD6C8] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#1A1A1A] hover:bg-[#333333] text-[#F9F7F2] font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
          >
            {isSignUp ? 'Create Royal Membership Account' : 'Sign In To Royal Dashboard'}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="mt-6 text-center text-xs text-[#7A756C]">
          {isSignUp ? 'Already a registered member?' : "Don't have an account yet?"}{' '}
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrorMsg('');
            }}
            className="text-[#8C7A5B] font-semibold underline hover:text-[#1A1A1A]"
          >
            {isSignUp ? 'Sign In' : 'Sign Up Now'}
          </button>
        </div>
      </div>
    </div>
  );
};
