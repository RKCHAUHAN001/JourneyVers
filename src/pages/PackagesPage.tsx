import React, { useState } from 'react';
import { SEO } from '../components/SEO';
import { Package, SearchFilters, CityDestination } from '../types';
import { Compass, Sparkles, MapPin, Calendar, Star, CheckCircle, ArrowRight, Search, SlidersHorizontal, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PackagesPageProps {
  packages: Package[];
  onSelectPackage: (pkg: Package) => void;
  onBookNow: (pkg: Package) => void;
}

export const PackagesPage: React.FC<PackagesPageProps> = ({
  packages,
  onSelectPackage,
  onBookNow,
}) => {
  const navigate = useNavigate();
  const [cityFilter, setCityFilter] = useState<CityDestination>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxBudget, setMaxBudget] = useState<number>(200000);

  const filtered = packages.filter((pkg) => {
    const matchesCity = cityFilter === 'All' || pkg.city === cityFilter;
    const matchesPrice = pkg.priceINR <= maxBudget;
    const matchesSearch = !searchQuery ||
      pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCity && matchesPrice && matchesSearch;
  });

  return (
    <div className="pt-28 sm:pt-32 lg:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <SEO
        title="Tour Packages | Tour with Journeyvers"
        description="Browse all tour packages for Hyderabad, Delhi, and Mumbai. Tour with Journeyvers for guaranteed low prices, luxury stays, street food walks, and 24/7 concierge."
        keywords="Journeyvers, Travel, Tour with Journeyvers, Hyderabad Tour Packages, Delhi Tour Packages, Mumbai Tour Packages, Budget Travel India, Royal Travel Packages"
      />

      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8C7A5B]/10 border border-[#8C7A5B]/20 text-[#8C7A5B] text-xs font-bold uppercase tracking-widest">
          <Compass className="w-3.5 h-3.5" />
          <span>Tour with Journeyvers</span>
        </div>
        <h1 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#1A1A1A]">
          Tour & Travel Packages by <span className="text-[#8C7A5B]">Journeyvers</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#5A554C] leading-relaxed">
          From the historic Nizam Palaces of Hyderabad and Mughal monuments of Delhi to coastal Mumbai, discover hand-curated tour packages designed by Journeyvers.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white border border-[#DCD6C8] rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Search Query Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#8C7A5B] absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by monument, city, or feature..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#DCD6C8] text-xs focus:outline-none focus:border-[#8C7A5B]"
            />
          </div>

          {/* City Destination Filter */}
          <div className="flex items-center gap-2">
            {(['All', 'Hyderabad', 'Delhi', 'Mumbai'] as CityDestination[]).map((c) => (
              <button
                key={c}
                onClick={() => setCityFilter(c)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                  cityFilter === c
                    ? 'bg-[#1A1A1A] text-[#F9F7F2] border-[#1A1A1A]'
                    : 'bg-white text-[#5A554C] border-[#DCD6C8] hover:border-[#8C7A5B]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Budget Filter */}
          <div className="flex flex-col justify-center px-2">
            <div className="flex justify-between text-xs text-[#5A554C] mb-1">
              <span>Max Budget:</span>
              <span className="font-bold text-[#8C7A5B]">₹{maxBudget.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="200000"
              step="5000"
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="accent-[#8C7A5B] cursor-pointer w-full"
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-[#7A756C] pt-2 border-t border-[#F0EEE9]">
          <span>Showing <strong>{filtered.length}</strong> available tour packages</span>
          <button
            onClick={() => {
              setCityFilter('All');
              setSearchQuery('');
              setMaxBudget(200000);
            }}
            className="text-[#8C7A5B] hover:underline font-semibold"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white rounded-2xl border border-[#DCD6C8] hover:border-[#8C7A5B] transition-all overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md group"
          >
            <div>
              {/* Thumbnail Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={pkg.coverImage || pkg.galleryImages?.[0] || 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop'}
                  alt={pkg.title}
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#1A1A1A]/90 backdrop-blur-md text-[#F9F7F2] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/20">
                  <MapPin className="w-3 h-3 text-[#8C7A5B]" />
                  <span>{pkg.city}</span>
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-[#1A1A1A] text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{pkg.rating}</span>
                </div>
              </div>

              {/* Package Content */}
              <div className="p-5 space-y-3">
                <p className="text-[10px] uppercase font-bold tracking-widest text-[#8C7A5B]">
                  {pkg.durationDays} Days / {pkg.durationDays - 1} Nights
                </p>
                <h3 className="font-serif-display text-lg font-bold text-[#1A1A1A] group-hover:text-[#8C7A5B] transition-colors line-clamp-1">
                  {pkg.title}
                </h3>
                <p className="text-xs text-[#5A554C] line-clamp-2 leading-relaxed">
                  {pkg.subtitle}
                </p>

                {/* Hotel & Transport Badges */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  <span className="text-[10px] bg-[#F0EEE9] border border-[#DCD6C8] px-2 py-0.5 rounded text-[#5A554C]">
                    🏨 {pkg.hotelName}
                  </span>
                  <span className="text-[10px] bg-[#F0EEE9] border border-[#DCD6C8] px-2 py-0.5 rounded text-[#5A554C]">
                    🚗 Private Transit
                  </span>
                </div>
              </div>
            </div>

            {/* Pricing & CTA Buttons */}
            <div className="p-5 pt-0 space-y-3 border-t border-[#F0EEE9] mt-3">
              <div className="flex items-baseline justify-between pt-3">
                <div>
                  <span className="text-[10px] text-[#7A756C] block">Total Package Price</span>
                  <span className="text-lg font-serif-display font-bold text-[#1A1A1A]">
                    ₹{pkg.priceINR.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-[#7A756C] ml-1">($ {pkg.priceUSD})</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  Instant Confirmation
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onSelectPackage(pkg)}
                  className="w-full py-2.5 rounded-xl bg-white border border-[#DCD6C8] hover:border-[#1A1A1A] text-[#1A1A1A] text-xs font-bold transition-all"
                >
                  View Itinerary
                </button>
                <button
                  onClick={() => onBookNow(pkg)}
                  className="w-full py-2.5 rounded-xl bg-[#1A1A1A] hover:bg-[#333333] text-[#F9F7F2] text-xs font-bold transition-all shadow-sm"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white border border-[#DCD6C8] rounded-2xl p-8 space-y-4">
          <p className="text-sm font-semibold text-[#1A1A1A]">No tour packages found matching your criteria.</p>
          <button
            onClick={() => {
              setCityFilter('All');
              setSearchQuery('');
              setMaxBudget(200000);
            }}
            className="px-6 py-2.5 rounded-full bg-[#1A1A1A] text-[#F9F7F2] text-xs font-bold uppercase tracking-wider"
          >
            Clear All Search Filters
          </button>
        </div>
      )}

      {/* Custom AI Builder Banner */}
      <section className="p-8 rounded-3xl bg-[#F0EEE9] border border-[#DCD6C8] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-left">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#8C7A5B] uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Need a Custom Travel Plan?</span>
          </div>
          <h3 className="font-serif-display text-2xl font-bold text-[#1A1A1A]">
            Design Your Tailored Itinerary with Journeyvers AI
          </h3>
          <p className="text-xs text-[#5A554C] max-w-xl">
            Specify your budget, travel dates, and preferences. Our concierge AI generator will craft a day-by-day royal plan in seconds.
          </p>
        </div>
        <button
          onClick={() => navigate('/custom-builder')}
          className="px-8 py-3.5 rounded-full bg-[#1A1A1A] hover:bg-[#333333] text-[#F9F7F2] text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap shadow-md"
        >
          Open AI Custom Builder
        </button>
      </section>
    </div>
  );
};
