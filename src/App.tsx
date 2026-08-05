import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { UserProfileData, Package, Booking, SearchFilters, CityDestination } from './types';
import { FEATURED_PACKAGES } from './data/travelData';
import { getActiveSession, logoutUserSession, getUserBookings, saveUserBooking, setActiveSession, updateUserAccount } from './lib/auth';
import { auth, logoutFirebase, fetchUserBookingsFirebase, saveBookingFirebase } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Layout & Components
import { Navbar } from './components/Navbar';
import { ScrollToTop } from './components/ScrollToTop';
import { AuthModal } from './components/AuthModal';
import { UserProfile } from './components/UserProfile';
import { CheckoutModal } from './components/CheckoutModal';
import { RealtimeDashboard } from './components/RealtimeDashboard';
import { WhatsAppChat } from './components/WhatsAppChat';
import { CustomPackageBuilder } from './components/CustomPackageBuilder';

// Multi-Page Views
import { HomePage } from './pages/HomePage';
import { PackagesPage } from './pages/PackagesPage';
import { PackageDetailPage } from './pages/PackageDetailPage';
import { DestinationsPage } from './pages/DestinationsPage';
import { CustomBuilderPage } from './pages/CustomBuilderPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';

import { PhoneCall, Mail, MapPin, Instagram, Facebook, Youtube, Sparkles } from 'lucide-react';

function AppContent() {
  const navigate = useNavigate();

  // Application State
  const [user, setUser] = useState<UserProfileData | null>(() => getActiveSession());
  const [packages, setPackages] = useState<Package[]>(FEATURED_PACKAGES);
  const [bookings, setBookings] = useState<Booking[]>(() => getUserBookings());

  // Filters State
  const [selectedCity, setSelectedCity] = useState<CityDestination>('All');
  const [filters, setFilters] = useState<SearchFilters>({
    destination: 'All',
    checkInDate: '',
    guests: 2,
    travelStyle: '',
    maxBudgetINR: 200000,
    searchQuery: '',
  });

  // Modal Visibility Controls
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showCustomBuilderModal, setShowCustomBuilderModal] = useState(false);
  const [selectedPackageForCheckout, setSelectedPackageForCheckout] = useState<Package | null>(null);
  const [activeDashboardBooking, setActiveDashboardBooking] = useState<Booking | null>(null);

  // Handle City Change
  const handleSelectCity = (city: CityDestination) => {
    setSelectedCity(city);
    setFilters((prev) => ({ ...prev, destination: city }));
  };

  // Navigate directly to package detail webpage instead of opening a popup modal
  const handleSelectPackage = (pkg: Package) => {
    navigate(`/package/${pkg.id}`);
  };

  // Filtered packages
  const filteredPackages = packages.filter((pkg) => {
    const matchesCity = filters.destination === 'All' || pkg.city === filters.destination;
    const matchesStyle = !filters.travelStyle || pkg.tags.some((t) => t.toLowerCase().includes(filters.travelStyle.toLowerCase()));
    const matchesQuery = !filters.searchQuery ||
      pkg.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      pkg.subtitle.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      pkg.hotelName.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      pkg.city.toLowerCase().includes(filters.searchQuery.toLowerCase());

    return matchesCity && matchesStyle && matchesQuery;
  });

  // Sync Firebase Auth State & Firestore Bookings
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        const userProfile: UserProfileData = {
          id: fbUser.uid,
          name: fbUser.displayName || fbUser.email?.split('@')[0] || 'Valued Traveler',
          email: fbUser.email || '',
          phone: fbUser.phoneNumber || '+91 98000 00000',
          avatar: fbUser.photoURL || `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop`,
          memberSince: new Date().getFullYear().toString(),
          savedPackageIds: [],
        };
        setUser(userProfile);
        setActiveSession(userProfile);

        try {
          const fsBookings = await fetchUserBookingsFirebase(fbUser.uid);
          if (fsBookings.length > 0) {
            setBookings(fsBookings);
          }
        } catch (err) {
          console.error('Failed to fetch Firebase bookings', err);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Handle Payment Completion
  const handlePaymentSuccess = async (newBooking: Booking) => {
    const updated = saveUserBooking(newBooking);
    setBookings(updated);
    if (user?.id) {
      await saveBookingFirebase(newBooking);
    }
    setSelectedPackageForCheckout(null);
    setActiveDashboardBooking(newBooking);
  };

  const handleToggleSavePackage = (pkg: Package) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    const currentSaved = user.savedPackageIds || [];
    const isSaved = currentSaved.includes(pkg.id);
    const updatedIds = isSaved
      ? currentSaved.filter((id) => id !== pkg.id)
      : [...currentSaved, pkg.id];

    const updatedUser = { ...user, savedPackageIds: updatedIds };
    setUser(updatedUser);
    updateUserAccount(updatedUser);
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#1A1A1A] font-sans-body selection:bg-[#1A1A1A] selection:text-[#F9F7F2] flex flex-col">
      {/* Navigation Header */}
      <Navbar
        user={user}
        onOpenAuth={() => setShowAuthModal(true)}
        onOpenProfile={() => setShowProfileModal(true)}
        onOpenDashboard={() => {
          if (bookings.length > 0) {
            setActiveDashboardBooking(bookings[0]);
          } else {
            setShowAuthModal(true);
          }
        }}
        onSelectCategory={handleSelectCity}
        onOpenCustomBuilder={() => setShowCustomBuilderModal(true)}
      />

      {/* Multi-Page Routes Body */}
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                packages={filteredPackages}
                selectedCity={selectedCity}
                filters={filters}
                onFilterChange={(newF) => {
                  setFilters(newF);
                  if (newF.destination) setSelectedCity(newF.destination);
                }}
                onResetFilters={() => {
                  setFilters({
                    destination: 'All',
                    checkInDate: '',
                    guests: 2,
                    travelStyle: '',
                    maxBudgetINR: 200000,
                    searchQuery: '',
                  });
                  setSelectedCity('All');
                }}
                onSelectCity={handleSelectCity}
                onSelectPackage={handleSelectPackage}
                onBookNow={(pkg) => setSelectedPackageForCheckout(pkg)}
                onOpenCustomBuilder={() => setShowCustomBuilderModal(true)}
                onAddSpotToCustomItinerary={() => setShowCustomBuilderModal(true)}
              />
            }
          />

          <Route
            path="/packages"
            element={
              <PackagesPage
                packages={packages}
                onSelectPackage={handleSelectPackage}
                onBookNow={(pkg) => setSelectedPackageForCheckout(pkg)}
              />
            }
          />

          <Route
            path="/package/:id"
            element={
              <PackageDetailPage
                packages={packages}
                savedPackageIds={user?.savedPackageIds}
                onBookNow={(pkg) => setSelectedPackageForCheckout(pkg)}
                onToggleSave={handleToggleSavePackage}
              />
            }
          />

          <Route
            path="/destinations"
            element={
              <DestinationsPage
                packages={packages}
                onSelectPackage={handleSelectPackage}
                onBookNow={(pkg) => setSelectedPackageForCheckout(pkg)}
              />
            }
          />

          <Route
            path="/destinations/:city"
            element={
              <DestinationsPage
                packages={packages}
                onSelectPackage={handleSelectPackage}
                onBookNow={(pkg) => setSelectedPackageForCheckout(pkg)}
              />
            }
          />

          <Route
            path="/custom-builder"
            element={
              <CustomBuilderPage
                onProceedToBooking={(customPkg) => setSelectedPackageForCheckout(customPkg)}
              />
            }
          />

          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes>
      </main>

      {/* Editorial Footer */}
      <footer className="bg-[#1A1A1A] text-[#F9F7F2] border-t border-[#333333] pt-16 pb-12 px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="font-serif-display font-bold text-xl tracking-wider text-[#F9F7F2]">
                JOURNEYVERS
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#8C7A5B] font-bold border border-[#8C7A5B]/40 px-1.5 py-0.5 rounded">
                PARIVARTYA
              </span>
            </div>
            <p className="text-xs text-[#A09B8F] leading-relaxed">
              Curated heritage and modern tour packages across Hyderabad, Delhi, and Mumbai by Parivartya Corporation.
            </p>
            <div className="flex items-center gap-3 pt-2 text-[#8C7A5B]">
              <Instagram className="w-4 h-4 hover:text-[#F9F7F2] transition-colors cursor-pointer" />
              <Facebook className="w-4 h-4 hover:text-[#F9F7F2] transition-colors cursor-pointer" />
              <Youtube className="w-4 h-4 hover:text-[#F9F7F2] transition-colors cursor-pointer" />
            </div>
          </div>

          <div>
            <h4 className="font-bold uppercase text-[#8C7A5B] text-[11px] tracking-widest mb-3">
              Explore Destinations
            </h4>
            <ul className="space-y-2 text-xs text-[#A09B8F]">
              <li>
                <Link to="/destinations/Hyderabad" className="hover:text-[#F9F7F2] transition-colors">
                  Hyderabad Heritage & Charminar
                </Link>
              </li>
              <li>
                <Link to="/destinations/Delhi" className="hover:text-[#F9F7F2] transition-colors">
                  Delhi Monuments & Mughlai Walks
                </Link>
              </li>
              <li>
                <Link to="/destinations/Mumbai" className="hover:text-[#F9F7F2] transition-colors">
                  Mumbai Coastal & Gateway Tours
                </Link>
              </li>
              <li>
                <Link to="/packages" className="hover:text-[#F9F7F2] transition-colors">
                  All Custom Packages
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase text-[#8C7A5B] text-[11px] tracking-widest mb-3">
              24/7 Support Line
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-[#8C7A5B]" /> +91 72910 10487
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#8C7A5B]" /> journeyvers.com@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#8C7A5B]" /> Imperial Tower, Janpath, New Delhi
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase text-[#8C7A5B] text-[11px] tracking-widest mb-3">
              AI Custom Builder
            </h4>
            <p className="text-xs text-[#A09B8F] mb-3 leading-relaxed">
              Build your custom day-by-day itinerary with automated hotel and private transit allocation.
            </p>
            <button
              onClick={() => setShowCustomBuilderModal(true)}
              className="w-full py-2.5 rounded-full bg-[#8C7A5B] hover:bg-[#A08C6B] text-[#1A1A1A] font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch AI Itinerary Builder</span>
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[#333333] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#A09B8F] gap-4">
          <p>© {new Date().getFullYear()} Journeyvers by Parivartya Corporation. All rights reserved.</p>
          <div className="flex items-center gap-4 flex-wrap">
            <Link to="/about" className="hover:text-[#F9F7F2] transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="hover:text-[#F9F7F2] transition-colors">
              Contact Support
            </Link>
            <Link to="/privacy" className="hover:text-[#F9F7F2] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-[#F9F7F2] transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </footer>

      {/* Global Modals */}
      {showCustomBuilderModal && (
        <CustomPackageBuilder
          onClose={() => setShowCustomBuilderModal(false)}
          onProceedToBooking={(customPkg) => {
            setShowCustomBuilderModal(false);
            setSelectedPackageForCheckout(customPkg);
          }}
        />
      )}

      {selectedPackageForCheckout && (
        <CheckoutModal
          pkg={selectedPackageForCheckout}
          onClose={() => setSelectedPackageForCheckout(null)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onLoginSuccess={(loggedUser) => {
            setUser(loggedUser);
            setShowAuthModal(false);
          }}
        />
      )}

      {showProfileModal && user && (
        <UserProfile
          user={user}
          bookings={bookings}
          savedPackages={packages.filter((pkg) => user.savedPackageIds?.includes(pkg.id))}
          onClose={() => setShowProfileModal(false)}
          onLogout={() => {
            logoutUserSession();
            logoutFirebase().catch((err) => console.error('Firebase logout error:', err));
            setUser(null);
            setShowProfileModal(false);
          }}
          onOpenDashboard={(b) => {
            setShowProfileModal(false);
            setActiveDashboardBooking(b);
          }}
          onViewPackage={(pkg) => {
            setShowProfileModal(false);
            handleSelectPackage(pkg);
          }}
          onOpenCustomBuilder={() => {
            setShowProfileModal(false);
            setShowCustomBuilderModal(true);
          }}
        />
      )}

      {activeDashboardBooking && (
        <RealtimeDashboard
          booking={activeDashboardBooking}
          onClose={() => setActiveDashboardBooking(null)}
        />
      )}

      {/* Floating WhatsApp Widget */}
      <WhatsAppChat phoneNumber="917291010487" selectedPackage={selectedPackageForCheckout} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}
