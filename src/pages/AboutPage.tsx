import React from 'react';
import { SEO } from '../components/SEO';
import { ShieldCheck, Award, Heart, Sparkles, Globe, MapPin, Users, PhoneCall, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-28 sm:pt-32 lg:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      <SEO
        title="About Journeyvers | Royal Travel Heritage"
        description="Learn about Journeyvers. Offering white-glove royal hospitality, AI custom itineraries, and authentic experiences across India."
        keywords="Journeyvers, Travel, Tour with Journeyvers, Journeyvers Travel, Royal Hospitality India"
      />

      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8C7A5B]/10 border border-[#8C7A5B]/20 text-[#8C7A5B] text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Journeyvers Brand Story</span>
        </div>
        <h1 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#1A1A1A] leading-tight">
          Crafting Unforgettable Journeys with <br />
          <span className="text-[#8C7A5B]">Journeyvers Travel</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#5A554C] leading-relaxed">
          As India's premier bespoke travel agency, Journeyvers combines authentic cultural heritage with modern AI convenience and white-glove royal hospitality.
        </p>
      </div>

      {/* Main Narrative Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white rounded-3xl border border-[#DCD6C8] p-8 sm:p-12 shadow-sm">
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8C7A5B]">
            Our Vision & Promise
          </span>
          <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
            Redefining Travel Across Hyderabad, Delhi & Mumbai
          </h2>
          <p className="text-xs text-[#5A554C] leading-relaxed">
            At Journeyvers, we believe that travel should be seamless, inspiring, and accessible. Whether you are seeking a budget-friendly heritage weekend in Old Delhi, a royal Nizam luxury stay in Hyderabad, or a coastal Mumbai getaway, Journeyvers delivers curated itineraries backed by verified local guides and 24/7 butler support.
          </p>
          <p className="text-xs text-[#5A554C] leading-relaxed">
            Our real-time itinerary dashboard keeps travelers updated on private vehicle transit, live weather, and concierge recommendations every step of the way.
          </p>

          <div className="pt-2 flex items-center gap-4">
            <Link
              to="/packages"
              className="px-6 py-3 rounded-full bg-[#1A1A1A] hover:bg-[#333333] text-white text-xs font-bold uppercase tracking-wider transition-all"
            >
              Explore Packages
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-full bg-[#F0EEE9] border border-[#DCD6C8] text-[#1A1A1A] text-xs font-bold uppercase tracking-wider hover:bg-[#E5E0D5] transition-all"
            >
              Contact Concierge
            </Link>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-[#DCD6C8] shadow-md h-80">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop"
            alt="Journeyvers Hospitality"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6 text-white">
            <div>
              <p className="font-serif-display font-bold text-lg">Journeyvers Hospitality Excellence</p>
              <p className="text-[11px] text-gray-200">24/7 Dedicated Butler & Royal Concierge Service</p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-[#DCD6C8] p-6 space-y-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#8C7A5B]/10 flex items-center justify-center text-[#8C7A5B]">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-serif-display font-bold text-base text-[#1A1A1A]">Curated Heritage Access</h3>
          <p className="text-xs text-[#5A554C] leading-relaxed">
            Fast-track entrance tickets, expert local historians, and private carriage transfers at iconic monuments.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#DCD6C8] p-6 space-y-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#8C7A5B]/10 flex items-center justify-center text-[#8C7A5B]">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-serif-display font-bold text-base text-[#1A1A1A]">AI Custom Planning</h3>
          <p className="text-xs text-[#5A554C] leading-relaxed">
            Proprietary AI itinerary builder tailored to your exact budget and travel style.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#DCD6C8] p-6 space-y-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#8C7A5B]/10 flex items-center justify-center text-[#8C7A5B]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-serif-display font-bold text-base text-[#1A1A1A]">Encrypted & Transparent</h3>
          <p className="text-xs text-[#5A554C] leading-relaxed">
            PCI-DSS encrypted payment gateway, zero hidden charges, and transparent instant booking confirmations.
          </p>
        </div>
      </div>

      {/* Stats Counter */}
      <div className="bg-[#1A1A1A] rounded-3xl p-8 sm:p-12 text-[#F9F7F2] grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <span className="font-serif-display text-3xl sm:text-4xl font-bold text-[#8C7A5B]">12,500+</span>
          <p className="text-xs text-[#DCD6C8] mt-1">Happy Travelers</p>
        </div>
        <div>
          <span className="font-serif-display text-3xl sm:text-4xl font-bold text-[#8C7A5B]">99.4%</span>
          <p className="text-xs text-[#DCD6C8] mt-1">Satisfaction Rating</p>
        </div>
        <div>
          <span className="font-serif-display text-3xl sm:text-4xl font-bold text-[#8C7A5B]">3</span>
          <p className="text-xs text-[#DCD6C8] mt-1">Historic Capitals</p>
        </div>
        <div>
          <span className="font-serif-display text-3xl sm:text-4xl font-bold text-[#8C7A5B]">24/7</span>
          <p className="text-xs text-[#DCD6C8] mt-1">Royal Concierge Line</p>
        </div>
      </div>
    </div>
  );
};
