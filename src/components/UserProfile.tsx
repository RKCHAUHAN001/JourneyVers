import React, { useState } from 'react';
import { UserProfileData, Booking, Package } from '../types';
import { Crown, Calendar, Sparkles, LogOut, CheckCircle2, Clock, MapPin, ChevronRight, Bookmark, MessageCircle } from 'lucide-react';

interface UserProfileProps {
  user: UserProfileData;
  bookings: Booking[];
  savedPackages: Package[];
  onClose: () => void;
  onLogout: () => void;
  onOpenDashboard: (booking: Booking) => void;
  onViewPackage: (pkg: Package) => void;
  onOpenCustomBuilder?: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  user,
  bookings = [],
  savedPackages = [],
  onClose,
  onLogout,
  onOpenDashboard,
  onViewPackage,
  onOpenCustomBuilder,
}) => {
  const [activeTab, setActiveTab] = useState<'bookings' | 'saved' | 'history'>('bookings');

  const activeBookings = bookings.filter((b) => b.status === 'CONFIRMED' || b.status === 'IN_PROGRESS');
  const pastBookings = bookings.filter((b) => b.status === 'COMPLETED' || b.status === 'CANCELLED');

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-[#1A1A1A]/60 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white border border-[#DCD6C8] rounded-3xl p-6 sm:p-8 shadow-2xl my-8 text-[#1A1A1A]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#F0EEE9] hover:bg-[#E5E0D5] text-[#5A554C] hover:text-[#1A1A1A]"
        >
          ✕
        </button>

        {/* User Card Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-6 border-b border-[#DCD6C8] text-center sm:text-left">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-[#DCD6C8] shadow-md"
            />
            <span className="absolute bottom-0 right-0 p-1 rounded-full bg-[#1A1A1A] text-[#F9F7F2]">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="font-serif-display text-2xl text-[#1A1A1A] font-bold">
                  {user.name}
                </h2>
                <p className="text-xs text-[#5A554C]">{user.email} • {user.phone}</p>
              </div>

              <button
                onClick={onLogout}
                className="px-3.5 py-1.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-semibold flex items-center justify-center gap-1.5 self-center sm:self-start"
              >
                <LogOut className="w-3.5 h-3.5" /> Log Out
              </button>
            </div>

            <div className="flex items-center gap-2 mt-3 justify-center sm:justify-start">
              <span className="px-3 py-1 rounded-full bg-[#F0EEE9] border border-[#DCD6C8] text-[#8C7A5B] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#8C7A5B]" /> Verified Traveler
              </span>
              <span className="text-[11px] text-[#7A756C]">Member since {user.memberSince}</span>
            </div>
          </div>
        </div>

        {/* Exclusive Member Concierge & Quick Tools */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6 pt-5 border-t border-[#DCD6C8]">
          <button
            onClick={() => {
              onClose();
              if (bookings.length > 0) {
                onOpenDashboard(bookings[0]);
              } else {
                onOpenDashboard({
                  id: 'demo-booking-1',
                  bookingCode: 'JV-LXR-7821',
                  packageId: 'hyderabad-royal',
                  packageTitle: 'Hyderabad Royal Heritage Experience',
                  city: 'Hyderabad',
                  startDate: '2026-08-15',
                  endDate: '2026-08-18',
                  guestsCount: 2,
                  totalPaidINR: 45000,
                  totalPaidUSD: 540,
                  status: 'CONFIRMED',
                  travelers: [],
                  guideAssigned: true,
                  guideName: 'Rajesh Kumar',
                  guidePhone: '+91 98765 43210',
                  driverName: 'Vikram Singh',
                  vehicleModel: 'Toyota Innova Crysta',
                  currentLocation: 'Golconda Fort',
                  nextStop: 'Qutb Shahi Tombs',
                  estimatedArrivalNextStop: '11:30 AM',
                });
              }
            }}
            className="p-3.5 rounded-2xl bg-[#F0EEE9] hover:bg-[#E5E0D5] border border-[#8C7A5B]/30 text-[#1A1A1A] transition-all flex items-center justify-between group shadow-2xs text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#8C7A5B]/15 border border-[#8C7A5B]/30 flex items-center justify-center text-[#8C7A5B]">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-xs text-[#1A1A1A]">Itinerary Dashboard</p>
                <p className="text-[10px] text-[#7A756C]">Real-time trip tracking</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#8C7A5B] group-hover:translate-x-1 transition-transform" />
          </button>

          {onOpenCustomBuilder && (
            <button
              onClick={() => {
                onClose();
                onOpenCustomBuilder();
              }}
              className="p-3.5 rounded-2xl bg-[#F0EEE9] hover:bg-[#E5E0D5] border border-[#8C7A5B]/30 text-[#1A1A1A] transition-all flex items-center justify-between group shadow-2xs text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#8C7A5B]/15 border border-[#8C7A5B]/30 flex items-center justify-center text-[#8C7A5B]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-xs text-[#1A1A1A]">AI Custom Package Builder</p>
                  <p className="text-[10px] text-[#7A756C]">Formulate luxury plans</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#8C7A5B] group-hover:translate-x-1 transition-transform" />
            </button>
          )}

          <a
            href="https://wa.me/917291010487?text=Hi!%20I%20am%20a%20logged%20in%20member%20and%20I%20would%20like%20to%20discuss%20a%20custom%20tour%20package."
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/40 text-[#1A1A1A] transition-all flex items-center justify-between group shadow-2xs text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#25D366] flex items-center justify-center text-white shadow-2xs">
                <MessageCircle className="w-5 h-5 fill-current stroke-none" />
              </div>
              <div>
                <p className="font-bold text-xs text-[#075E54]">WhatsApp Support</p>
                <p className="text-[10px] text-[#075E54]/80">Chat +91 72910 10487</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#075E54] group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Profile Navigation Tabs */}
        <div className="flex items-center gap-2 mb-6 border-b border-[#DCD6C8] pb-2">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'bookings'
                ? 'bg-[#1A1A1A] text-[#F9F7F2]'
                : 'text-[#7A756C] hover:text-[#1A1A1A]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" /> Active Bookings ({activeBookings.length})
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'bg-[#1A1A1A] text-[#F9F7F2]'
                : 'text-[#7A756C] hover:text-[#1A1A1A]'
            }`}
          >
            <Clock className="w-3.5 h-3.5" /> Travel History ({pastBookings.length})
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'saved'
                ? 'bg-[#1A1A1A] text-[#F9F7F2]'
                : 'text-[#7A756C] hover:text-[#1A1A1A]'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" /> Saved Packages ({savedPackages.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
          {/* Active Bookings */}
          {activeTab === 'bookings' && (
            <div className="space-y-3">
              {activeBookings.length === 0 ? (
                <div className="text-center py-8 text-[#7A756C] text-xs">
                  No active bookings. Choose a package in Hyderabad, Delhi, or Mumbai to begin!
                </div>
              ) : (
                activeBookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-4 rounded-2xl bg-[#F0EEE9] border border-[#DCD6C8] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-[#1A1A1A] transition-all shadow-sm"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px] border border-emerald-200">
                          {b.status}
                        </span>
                        <span className="text-xs text-[#8C7A5B] font-mono font-bold">{b.bookingCode}</span>
                      </div>
                      <h4 className="font-serif-display text-lg text-[#1A1A1A] font-semibold mt-1">
                        {b.packageTitle}
                      </h4>
                      <p className="text-xs text-[#5A554C] flex items-center gap-1.5 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#8C7A5B]" /> {b.city} • {b.startDate} to {b.endDate} ({b.guestsCount} Guests)
                      </p>
                      <p className="text-[11px] text-[#7A756C] mt-1">
                        🚗 Assigned Driver: {b.driverName} ({b.vehicleModel})
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2 w-full sm:w-auto">
                      <span className="text-lg font-bold text-[#1A1A1A]">
                        ₹{b.totalPaidINR.toLocaleString('en-IN')}
                      </span>
                      <button
                        onClick={() => onOpenDashboard(b)}
                        className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#1A1A1A] text-[#F9F7F2] font-bold text-xs hover:bg-[#333333] transition-all flex items-center justify-center gap-1 shadow-sm"
                      >
                        Open Live Dashboard <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Past Travel History */}
          {activeTab === 'history' && (
            <div className="space-y-3">
              {pastBookings.length === 0 ? (
                <div className="text-center py-8 text-[#7A756C] text-xs">
                  No past trips recorded yet.
                </div>
              ) : (
                pastBookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-4 rounded-2xl bg-[#F0EEE9] border border-[#DCD6C8] flex justify-between items-center"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-gray-200 text-[#5A554C] font-bold text-[10px]">
                          {b.status}
                        </span>
                        <span className="text-xs text-[#8C7A5B] font-mono">{b.bookingCode}</span>
                      </div>
                      <h4 className="font-serif-display text-base text-[#1A1A1A] font-semibold mt-1">
                        {b.packageTitle}
                      </h4>
                      <p className="text-xs text-[#7A756C]">{b.city} • Completed {b.endDate}</p>
                    </div>

                    <span className="text-sm font-bold text-[#1A1A1A]">
                      ₹{b.totalPaidINR.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Saved Packages */}
          {activeTab === 'saved' && (
            <div>
              {savedPackages.length === 0 ? (
                <div className="text-center py-8 text-[#7A756C] text-xs">
                  No saved packages yet. Explore budget tour packages and save your favorites to view them here.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {savedPackages.map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => onViewPackage(pkg)}
                      className="p-3 rounded-2xl bg-[#F0EEE9] border border-[#DCD6C8] hover:border-[#1A1A1A] cursor-pointer transition-all flex items-center gap-3 shadow-sm"
                    >
                      <img
                        src={pkg.coverImage}
                        alt={pkg.title}
                        className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="text-[9px] uppercase font-bold text-[#8C7A5B]">{pkg.city}</span>
                        <h4 className="text-xs font-semibold text-[#1A1A1A] truncate">{pkg.title}</h4>
                        <span className="text-xs font-bold text-[#1A1A1A]">
                          ₹{pkg.priceINR.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
