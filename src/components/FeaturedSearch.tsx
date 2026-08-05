import React from 'react';
import { SearchFilters, CityDestination } from '../types';
import { Search, MapPin, Calendar, Users, SlidersHorizontal, Sparkles, X } from 'lucide-react';

interface FeaturedSearchProps {
  filters: SearchFilters;
  onFilterChange: (newFilters: SearchFilters) => void;
  onResetFilters: () => void;
  totalResultsCount: number;
}

export const FeaturedSearch: React.FC<FeaturedSearchProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResultsCount,
}) => {
  return (
    <div className="relative py-8 z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#DCD6C8] shadow-md space-y-4">
        {/* Search Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-[#DCD6C8]">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-[#8C7A5B]" />
            <h3 className="text-xs uppercase tracking-widest font-bold text-[#1A1A1A]">
              Personalized Luxury Search Bar
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#8C7A5B] font-semibold bg-[#F0EEE9] px-2.5 py-1 rounded-full border border-[#DCD6C8]">
              {totalResultsCount} Curated Options
            </span>
            {(filters.destination !== 'All' || filters.searchQuery || filters.travelStyle) && (
              <button
                onClick={onResetFilters}
                className="text-xs text-[#7A756C] hover:text-[#1A1A1A] flex items-center gap-1 transition-colors"
              >
                <X className="w-3.5 h-3.5" /> Reset
              </button>
            )}
          </div>
        </div>

        {/* Input Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Destination Selector */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-semibold text-[#7A756C] flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#8C7A5B]" /> Destination
            </label>
            <select
              value={filters.destination}
              onChange={(e) =>
                onFilterChange({ ...filters, destination: e.target.value as CityDestination })
              }
              className="w-full bg-[#F0EEE9] border border-[#DCD6C8] rounded-xl px-3 py-2.5 text-xs text-[#1A1A1A] font-medium focus:outline-none focus:border-[#1A1A1A]"
            >
              <option value="All">All Capitals (Hyderabad, Delhi, Mumbai)</option>
              <option value="Hyderabad">Hyderabad (Nizam Palaces & Pearls)</option>
              <option value="Delhi">Delhi (Imperial Heritage & Forts)</option>
              <option value="Mumbai">Mumbai (Coastal Glamour & Taj)</option>
            </select>
          </div>

          {/* Travel Date */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-semibold text-[#7A756C] flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#8C7A5B]" /> Travel Date
            </label>
            <input
              type="date"
              value={filters.checkInDate}
              onChange={(e) => onFilterChange({ ...filters, checkInDate: e.target.value })}
              className="w-full bg-[#F0EEE9] border border-[#DCD6C8] rounded-xl px-3 py-2.5 text-xs text-[#1A1A1A] font-medium focus:outline-none focus:border-[#1A1A1A]"
            />
          </div>

          {/* Guests Count */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-semibold text-[#7A756C] flex items-center gap-1">
              <Users className="w-3 h-3 text-[#8C7A5B]" /> Guests
            </label>
            <select
              value={filters.guests}
              onChange={(e) => onFilterChange({ ...filters, guests: parseInt(e.target.value) })}
              className="w-full bg-[#F0EEE9] border border-[#DCD6C8] rounded-xl px-3 py-2.5 text-xs text-[#1A1A1A] font-medium focus:outline-none focus:border-[#1A1A1A]"
            >
              <option value={1}>1 Solo Explorer</option>
              <option value={2}>2 Guests (Royal Couple)</option>
              <option value={4}>4 Guests (Family Suite)</option>
              <option value={6}>6+ Guests (Royal Charter Group)</option>
            </select>
          </div>

          {/* Travel Vibe Style */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-semibold text-[#7A756C] flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3 text-[#8C7A5B]" /> Travel Vibe
            </label>
            <select
              value={filters.travelStyle}
              onChange={(e) => onFilterChange({ ...filters, travelStyle: e.target.value })}
              className="w-full bg-[#F0EEE9] border border-[#DCD6C8] rounded-xl px-3 py-2.5 text-xs text-[#1A1A1A] font-medium focus:outline-none focus:border-[#1A1A1A]"
            >
              <option value="">All Styles</option>
              <option value="Royal Heritage">Royal Heritage & Palaces</option>
              <option value="Fine Dining">Fine Dining & Chef Tables</option>
              <option value="Shopping & Bazaars">High-Fashion Bazaars & Pearls</option>
              <option value="Private Access">Private Yacht & Chauffeur</option>
            </select>
          </div>

          {/* Keyword Search Input */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-semibold text-[#7A756C] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#8C7A5B]" /> Search Keyword
            </label>
            <input
              type="text"
              placeholder="e.g. Falaknuma, Qutub, Yacht, Biryani..."
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
              className="w-full bg-[#F0EEE9] border border-[#DCD6C8] rounded-xl px-3 py-2.5 text-xs text-[#1A1A1A] placeholder-[#8C857B] font-medium focus:outline-none focus:border-[#1A1A1A]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
