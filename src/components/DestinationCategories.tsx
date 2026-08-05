import React from 'react';
import { Package, CityDestination } from '../types';
import { MapPin, Star, ArrowRight, ShieldCheck, Sparkles, Building, Landmark, Utensils, Anchor } from 'lucide-react';

interface DestinationCategoriesProps {
  packages: Package[];
  selectedCity: CityDestination;
  onSelectCity: (city: CityDestination) => void;
  onSelectPackage: (pkg: Package) => void;
  onBookNow: (pkg: Package) => void;
}

const DESTINATION_DETAILS = [
  {
    city: 'Hyderabad' as const,
    title: 'Hyderabad: City of Pearls & Nizam Palaces',
    tagline: 'Asaf Jahi Splendor, Falaknuma High Tea & Royal Biryani',
    coverImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop',
    icon: Landmark,
    accentColor: '#e5c158',
    highlights: [
      'Taj Falaknuma Palace 101-seat dining table & horse-drawn carriage entry',
      'Private curator walk at Chowmahalla Palace Nizam vintage cars',
      'Exclusive Basra pearl shopping in Laad Bazaar with 4th-gen jewelers',
      'Elevated fine dining 100-ft in the air at Jewel of Nizam'
    ],
    weatherTemp: '29°C Clear Sky',
    bestSeason: 'Oct - Mar (Royal Winter)'
  },
  {
    city: 'Delhi' as const,
    title: 'Delhi: Capital of Monarchs & Timeless Heritage',
    tagline: 'Imperial Lutyens, UNESCO Minarets & Culinary Greatness',
    coverImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop',
    icon: Building,
    accentColor: '#c5a059',
    highlights: [
      '5,000-piece artwork collection walk at historic 1930s The Imperial',
      'Chef Table experience at Bukhara (ITC Maurya) tandoori master pit',
      'Golden hour sunset walk around UNESCO Qutub Minar & Mehrauli',
      'Luxury electric rickshaw safari through Old Delhi spice bazaars'
    ],
    weatherTemp: '28°C Pleasant',
    bestSeason: 'Nov - Mar (Autumn Splendor)'
  },
  {
    city: 'Mumbai' as const,
    title: 'Mumbai: Gateway to Coastal Glamour & Taj Soirees',
    tagline: 'High-Fashion Kala Ghoda, Private Yachting & Sea-Facing Suites',
    coverImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop',
    icon: Anchor,
    accentColor: '#f4e0a5',
    highlights: [
      'Sea-facing Grand Suite at the 1903 Taj Mahal Palace Colaba',
      'Private 50ft catamaran yacht charter into Arabian Sea sunset',
      'Personal fashion stylist escort at Kala Ghoda Sabyasachi Mansion',
      'Midnight chauffeur cruise along Marine Drive in a vintage Rolls-Royce'
    ],
    weatherTemp: '31°C Coastal Breeze',
    bestSeason: 'Nov - Feb (Oceanic Breeze)'
  }
];

export const DestinationCategories: React.FC<DestinationCategoriesProps> = ({
  packages,
  selectedCity,
  onSelectCity,
  onSelectPackage,
  onBookNow,
}) => {
  return (
    <section className="py-20 bg-[#F9F7F2] text-[#1A1A1A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F0EEE9] border border-[#DCD6C8] text-[#8C7A5B] text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Tour Destinations</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-5xl text-[#1A1A1A]">
            Budget Tour Packages in <br />
            <span className="text-[#8C7A5B]">Hyderabad, Delhi & Mumbai</span>
          </h2>
          <p className="text-[#5A554C] text-xs sm:text-sm">
            Select a destination to explore budget-friendly tour packages, verified AC hotel stays, guided monument passes, and authentic local food experiences.
          </p>
        </div>

        {/* Destination Category Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {DESTINATION_DETAILS.map((dest) => {
            const Icon = dest.icon;
            const destPackages = packages.filter((p) => p.city === dest.city);
            const isSelected = selectedCity === dest.city;

            return (
              <div
                key={dest.city}
                className={`group rounded-3xl overflow-hidden bg-white border transition-all duration-300 flex flex-col ${
                  isSelected
                    ? 'border-[#1A1A1A] shadow-md scale-[1.02]'
                    : 'border-[#DCD6C8] hover:border-[#1A1A1A]'
                }`}
              >
                {/* Category Cover Image Header */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={dest.coverImage}
                    alt={dest.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />

                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/95 border border-[#DCD6C8] text-[#1A1A1A] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                      <Icon className="w-3.5 h-3.5 text-[#8C7A5B]" />
                      {dest.city}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-xs">
                    <span className="text-[#5A554C] bg-white/90 px-2.5 py-1 rounded-full backdrop-blur-sm border border-[#DCD6C8]">
                      {dest.weatherTemp}
                    </span>
                    <span className="text-[#1A1A1A] font-semibold bg-white/90 px-2.5 py-1 rounded-full backdrop-blur-sm border border-[#DCD6C8]">
                      {destPackages.length} Bespoke Package{destPackages.length > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                {/* Category Details Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <h3 className="font-serif-display text-2xl text-[#1A1A1A] font-semibold mb-1">
                      {dest.city}
                    </h3>
                    <p className="text-xs text-[#8C7A5B] font-medium mb-4 italic font-cormorant text-base">
                      "{dest.tagline}"
                    </p>

                    {/* Key Luxury Highlights */}
                    <div className="space-y-2 mb-6">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#7A756C]">
                        Category Highlights:
                      </span>
                      <ul className="space-y-2">
                        {dest.highlights.map((item, i) => (
                          <li key={i} className="text-xs text-[#5A554C] flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#8C7A5B] mt-1.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3 pt-4 border-t border-[#DCD6C8]">
                    <button
                      onClick={() => onSelectCity(dest.city)}
                      className={`w-full py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                        isSelected
                          ? 'bg-[#1A1A1A] text-[#F9F7F2] shadow-sm'
                          : 'bg-white text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F9F7F2] border border-[#DCD6C8]'
                      }`}
                    >
                      <span>Explore {dest.city} Packages</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected City Filtered Packages Showcase */}
        <div className="pt-10 border-t border-[#DCD6C8]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-semibold text-[#8C7A5B] uppercase tracking-widest">
                Curated Vacation Packages
              </span>
              <h3 className="font-serif-display text-2xl sm:text-3xl text-[#1A1A1A]">
                {selectedCity === 'All' ? 'All Luxury Packages' : `Featured ${selectedCity} Packages`}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              {(['All', 'Hyderabad', 'Delhi', 'Mumbai'] as CityDestination[]).map((city) => (
                <button
                  key={city}
                  onClick={() => onSelectCity(city)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    selectedCity === city
                      ? 'bg-[#1A1A1A] text-[#F9F7F2]'
                      : 'bg-white text-[#5A554C] border border-[#DCD6C8] hover:text-[#1A1A1A]'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages
              .filter((p) => selectedCity === 'All' || p.city === selectedCity)
              .map((pkg) => (
                <div
                  key={pkg.id}
                  className="group rounded-2xl bg-white border border-[#DCD6C8] hover:border-[#1A1A1A] transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-sm"
                >
                  <div>
                    {/* Image & Price Tag */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={pkg.coverImage || pkg.galleryImages?.[0] || 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop'}
                        alt={pkg.title}
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop';
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 border border-[#DCD6C8] text-[#1A1A1A] font-bold text-[10px] uppercase shadow-sm">
                        {pkg.city} • {pkg.durationDays} Days
                      </span>
                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#1A1A1A] text-[#F9F7F2] font-bold text-xs flex items-center gap-1 shadow-sm">
                        <Star className="w-3 h-3 fill-[#F9F7F2]" /> {pkg.rating}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <div>
                        <h4 className="font-serif-display text-xl text-[#1A1A1A] font-semibold group-hover:text-[#8C7A5B] transition-colors">
                          {pkg.title}
                        </h4>
                        <p className="text-xs text-[#7A756C] mt-1">{pkg.subtitle}</p>
                      </div>

                      {/* Hotel Badge */}
                      <div className="p-3 rounded-xl bg-[#F0EEE9] border border-[#DCD6C8] text-xs flex items-center justify-between">
                        <span className="text-[#5A554C] truncate font-medium">
                          🏨 Stay: <strong className="text-[#1A1A1A]">{pkg.hotelName}</strong>
                        </span>
                        <span className="text-[#8C7A5B] font-bold">5★</span>
                      </div>

                      {/* Package Highlights */}
                      <ul className="space-y-1.5">
                        {pkg.highlights?.slice(0, 3)?.map((hl, idx) => (
                          <li key={idx} className="text-xs text-[#5A554C] flex items-center gap-2 truncate">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#8C7A5B] flex-shrink-0" />
                            <span className="truncate">{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Pricing & Booking Footer */}
                  <div className="p-6 pt-0 border-t border-[#DCD6C8] mt-4 space-y-3">
                    <div className="flex items-baseline justify-between pt-4">
                      <div>
                        <span className="text-[10px] text-[#7A756C] uppercase block">Bespoke Price</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold text-[#1A1A1A]">
                            ₹{pkg.priceINR.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs text-[#8C857B] line-through">
                            ₹{pkg.originalPriceINR.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] text-[#7A756C]">per couple / tour</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onSelectPackage(pkg)}
                        className="py-2.5 rounded-xl border border-[#DCD6C8] bg-white hover:bg-[#F0EEE9] text-xs font-semibold text-[#1A1A1A] transition-all"
                      >
                        View Itinerary
                      </button>

                      <button
                        onClick={() => onBookNow(pkg)}
                        className="py-2.5 rounded-xl bg-[#1A1A1A] hover:bg-[#333333] text-[#F9F7F2] text-xs font-bold transition-all shadow-sm"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};
