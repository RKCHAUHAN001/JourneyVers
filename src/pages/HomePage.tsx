import React from 'react';
import { Hero } from '../components/Hero';
import { FeaturedSearch } from '../components/FeaturedSearch';
import { DestinationCategories } from '../components/DestinationCategories';
import { InteractiveMap } from '../components/InteractiveMap';
import { SEO } from '../components/SEO';
import { Package, SearchFilters, CityDestination, TouristSpot } from '../types';
import { Sparkles, ShieldCheck, Compass, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface HomePageProps {
  packages: Package[];
  selectedCity: CityDestination;
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
  onResetFilters: () => void;
  onSelectCity: (city: CityDestination) => void;
  onSelectPackage: (pkg: Package) => void;
  onBookNow: (pkg: Package) => void;
  onOpenCustomBuilder: () => void;
  onAddSpotToCustomItinerary: (spot: TouristSpot) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  packages,
  selectedCity,
  filters,
  onFilterChange,
  onResetFilters,
  onSelectCity,
  onSelectPackage,
  onBookNow,
  onOpenCustomBuilder,
  onAddSpotToCustomItinerary,
}) => {
  const navigate = useNavigate();

  return (
    <div>
      <SEO
        title="Journeyvers Travel | Royal Bespoke Journeys by Parivartya Corporation"
        description="Tour with Journeyvers by Parivartya Corporation. Discover budget and luxury tour packages across Hyderabad, Delhi, and Mumbai. Features AI custom itinerary builder and 24/7 royal concierge."
        keywords="Journeyvers, Travel, Tour with Journeyvers, Parivartya, Parivartya Corporation, Hyderabad Tour Packages, Delhi Tour Packages, Mumbai Tour Packages, Custom AI Travel Builder"
      />

      {/* Hero Banner Slider */}
      <Hero
        onOpenCustomBuilder={() => navigate('/custom-builder')}
        onExploreCapitals={() => {
          const el = document.getElementById('destinations-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Search Bar */}
      <FeaturedSearch
        filters={filters}
        onFilterChange={onFilterChange}
        onResetFilters={onResetFilters}
        totalResultsCount={packages.length}
      />

      {/* Quick Navigation Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/packages"
            className="p-6 rounded-2xl bg-white border border-[#DCD6C8] hover:border-[#8C7A5B] transition-all group shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#8C7A5B]/10 flex items-center justify-center text-[#8C7A5B] mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-serif-display text-lg font-bold text-[#1A1A1A] group-hover:text-[#8C7A5B] transition-colors">
                Tour Packages Catalog
              </h3>
              <p className="text-xs text-[#5A554C] mt-1 leading-relaxed">
                Explore all curated heritage & luxury packages in Hyderabad, Delhi, and Mumbai with Journeyvers.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-[#8C7A5B]">
              <span>View All Packages</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            to="/custom-builder"
            className="p-6 rounded-2xl bg-[#1A1A1A] text-[#F9F7F2] transition-all group shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#8C7A5B] mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif-display text-lg font-bold text-white group-hover:text-[#8C7A5B] transition-colors">
                AI Custom Package Builder
              </h3>
              <p className="text-xs text-[#DCD6C8] mt-1 leading-relaxed">
                Tailor a bespoke day-by-day travel plan instantly powered by Parivartya AI engine.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-[#8C7A5B]">
              <span>Build Custom Plan</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            to="/about"
            className="p-6 rounded-2xl bg-white border border-[#DCD6C8] hover:border-[#8C7A5B] transition-all group shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#8C7A5B]/10 flex items-center justify-center text-[#8C7A5B] mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif-display text-lg font-bold text-[#1A1A1A] group-hover:text-[#8C7A5B] transition-colors">
                About Parivartya Corporation
              </h3>
              <p className="text-xs text-[#5A554C] mt-1 leading-relaxed">
                Discover the story, royal hospitality heritage, and values behind Journeyvers by Parivartya.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-[#8C7A5B]">
              <span>Learn Our Story</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* Destination Categories (Hyderabad, Delhi, Mumbai) */}
      <div id="destinations-section">
        <DestinationCategories
          packages={packages}
          selectedCity={selectedCity}
          onSelectCity={onSelectCity}
          onSelectPackage={onSelectPackage}
          onBookNow={onBookNow}
        />
      </div>

      {/* Interactive Spot Map */}
      <div id="interactive-map">
        <InteractiveMap
          selectedCityFilter={selectedCity}
          onAddSpotToCustomItinerary={onAddSpotToCustomItinerary}
        />
      </div>

      {/* Editorial Style Heritage Banner */}
      <section className="py-20 bg-[#F0EEE9] border-y border-[#DCD6C8] text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#DCD6C8] text-[#8C7A5B] text-xs uppercase font-bold tracking-widest shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#8C7A5B]" />
            <span>The Parivartya Guarantee</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-5xl text-[#1A1A1A] leading-tight">
            Tour with Journeyvers Across <br />
            <span className="text-[#8C7A5B] italic font-cormorant font-normal">
              India's Historic Capitals
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-[#5A554C] max-w-2xl mx-auto leading-relaxed">
            Every Journeyvers itinerary crafted by Parivartya Corporation guarantees curated curator access, chauffeur transfers, luxury hotel accommodations, and 24/7 dedicated support.
          </p>
          <div className="pt-4 flex items-center justify-center gap-4">
            <Link
              to="/custom-builder"
              className="px-8 py-3.5 rounded-full bg-[#1A1A1A] hover:bg-[#333333] text-[#F9F7F2] font-bold text-xs uppercase tracking-widest transition-all shadow-md"
            >
              Plan Custom Trip
            </Link>
            <Link
              to="/about"
              className="px-8 py-3.5 rounded-full bg-white hover:bg-[#E5E0D5] border border-[#DCD6C8] text-[#1A1A1A] font-bold text-xs uppercase tracking-widest transition-all shadow-sm"
            >
              About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
