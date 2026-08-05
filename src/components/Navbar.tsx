import React, { useState } from 'react';
import { UserProfileData } from '../types';
import { Sparkles, Compass, User, LogIn, Menu, X, Globe, PhoneCall } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps {
  user: UserProfileData | null;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
  onOpenDashboard?: () => void;
  onSelectCategory?: (city: 'Hyderabad' | 'Delhi' | 'Mumbai' | 'All') => void;
  onOpenCustomBuilder?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  onOpenAuth,
  onOpenProfile,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currency, setCurrency] = useState<'INR' | 'USD' | 'EUR'>('INR');
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-[500] bg-[#F9F7F2]/95 backdrop-blur-md border-b border-[#DCD6C8] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/assets/logo.png"
              alt="JOURNEYVERS Logo"
              className="w-10 h-10 rounded-full object-cover border-2 border-[#8C7A5B] shadow-sm group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="font-serif-display text-lg sm:text-xl tracking-wider text-[#1A1A1A] font-bold group-hover:text-[#8C7A5B] transition-colors">
                JOURNEYVERS
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#8C7A5B] font-semibold">
                Parivartya Corporation
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-6 text-xs uppercase tracking-widest font-semibold text-[#5A554C]">
            <Link
              to="/destinations/Hyderabad"
              className={`hover:text-[#1A1A1A] transition-colors py-1 relative ${
                location.pathname === '/destinations/Hyderabad' ? 'text-[#8C7A5B]' : ''
              }`}
            >
              Hyderabad
              {location.pathname === '/destinations/Hyderabad' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8C7A5B]" />
              )}
            </Link>

            <Link
              to="/destinations/Delhi"
              className={`hover:text-[#1A1A1A] transition-colors py-1 relative ${
                location.pathname === '/destinations/Delhi' ? 'text-[#8C7A5B]' : ''
              }`}
            >
              Delhi
              {location.pathname === '/destinations/Delhi' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8C7A5B]" />
              )}
            </Link>

            <Link
              to="/destinations/Mumbai"
              className={`hover:text-[#1A1A1A] transition-colors py-1 relative ${
                location.pathname === '/destinations/Mumbai' ? 'text-[#8C7A5B]' : ''
              }`}
            >
              Mumbai
              {location.pathname === '/destinations/Mumbai' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8C7A5B]" />
              )}
            </Link>
          </div>
        </div>

        {/* User Account & Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Currency Toggle */}
          <div className="flex items-center gap-1 text-[11px] bg-[#FFFFFF] border border-[#DCD6C8] rounded-full px-2.5 py-1 text-[#5A554C]">
            <Globe className="w-3 h-3 text-[#8C7A5B]" />
            {(['INR', 'USD', 'EUR'] as const).map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-1.5 py-0.5 rounded font-semibold transition-colors ${
                  currency === curr ? 'bg-[#1A1A1A] text-[#F9F7F2]' : 'hover:text-[#1A1A1A]'
                }`}
              >
                {curr === 'INR' ? '₹' : curr === 'USD' ? '$' : '€'}
              </button>
            ))}
          </div>

          {/* User Auth Profile */}
          {user ? (
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#DCD6C8] hover:border-[#1A1A1A] transition-all"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-7 h-7 rounded-full object-cover border border-[#8C7A5B]"
              />
              <span className="text-xs font-semibold text-[#1A1A1A] max-w-[100px] truncate">
                {user.name}
              </span>
              <User className="w-3.5 h-3.5 text-[#8C7A5B]" />
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-5 py-2 rounded-full bg-[#1A1A1A] hover:bg-[#333333] text-[#F9F7F2] font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-2"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#1A1A1A] hover:text-[#8C7A5B]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F9F7F2] border-b border-[#DCD6C8] px-6 py-6 space-y-4 animate-fadeIn">
          <div className="grid grid-cols-3 gap-2 text-xs font-bold text-center">
            <Link
              to="/destinations/Hyderabad"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 rounded-lg bg-[#FFFFFF] border border-[#DCD6C8] text-[#1A1A1A]"
            >
              Hyderabad
            </Link>
            <Link
              to="/destinations/Delhi"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 rounded-lg bg-[#FFFFFF] border border-[#DCD6C8] text-[#1A1A1A]"
            >
              Delhi
            </Link>
            <Link
              to="/destinations/Mumbai"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 rounded-lg bg-[#FFFFFF] border border-[#DCD6C8] text-[#1A1A1A]"
            >
              Mumbai
            </Link>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#DCD6C8]">
            {user ? (
              <button
                onClick={() => {
                  onOpenProfile();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-xl bg-[#FFFFFF] border border-[#DCD6C8] text-[#1A1A1A] text-xs font-semibold flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4 text-[#8C7A5B]" /> {user.name}
              </button>
            ) : (
              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-xl bg-[#1A1A1A] text-[#F9F7F2] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" /> Sign In / Create Account
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
