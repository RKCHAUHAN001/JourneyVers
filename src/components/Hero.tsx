import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Compass, ShieldCheck, Award, Clock } from 'lucide-react';

interface HeroProps {
  onOpenCustomBuilder: () => void;
  onExploreCapitals: () => void;
}

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=2000&auto=format&fit=crop',
    city: 'HYDERABAD',
    tagline: 'Pearl City Budget Special • From ₹3,499',
    desc: 'Explore Charminar, Golconda Fort acoustics, Chowmahalla Palace, and enjoy authentic Hyderabadi Mutton Dum Biryani with AC transfers included.'
  },
  {
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2000&auto=format&fit=crop',
    city: 'DELHI',
    tagline: 'Capital Express & Heritage Saver • From ₹3,999',
    desc: 'Old Delhi electric rickshaw food walk in Chandni Chowk, Qutub Minar, Humayun Tomb, India Gate, and central AC hotel stay.'
  },
  {
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2000&auto=format&fit=crop',
    city: 'MUMBAI',
    tagline: 'Coastal Gateway & City Explorer • From ₹4,499',
    desc: 'Gateway of India, Elephanta Island ferry cruise ticket, Marine Drive sunset stroll, and Girgaon Chowpatty street food treats.'
  }
];

export const Hero: React.FC<HeroProps> = ({ onOpenCustomBuilder, onExploreCapitals }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative min-h-screen pt-20 flex flex-col justify-between overflow-hidden bg-[#F9F7F2]">
      {/* Background Slideshow with Soft Editorial Vignette */}
      {HERO_SLIDES.map((s, idx) => (
        <div
          key={s.city}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100 z-0' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={s.image}
            alt={s.tagline}
            className="w-full h-full object-cover scale-105 animate-subtleZoom opacity-85"
          />
          {/* Multi-stage light gradient overlay for maximum editorial text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#F9F7F2] via-[#F9F7F2]/75 to-[#F9F7F2]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F9F7F2] via-[#F9F7F2]/60 to-transparent" />
        </div>
      ))}

      {/* Hero Central Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 my-auto text-center lg:text-left grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-6">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F0EEE9] border border-[#DCD6C8] text-[#8C7A5B] text-xs font-semibold uppercase tracking-[0.2em] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#8C7A5B]" />
            <span>JOURNEYVERS • Budget Friendly Tour & Travel Packages</span>
          </div>

          {/* Main Display Headline */}
          <h1 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl tracking-tight text-[#1A1A1A] leading-[1.1]">
            Pocket-Friendly <br />
            <span className="text-[#8C7A5B] italic font-cormorant font-normal">
              Tour & Travel Escapes
            </span>
          </h1>

          {/* City Specific Tagline */}
          <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-[#DCD6C8] max-w-2xl shadow-sm">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-xs uppercase font-bold tracking-widest text-[#1A1A1A] bg-[#F0EEE9] px-2.5 py-0.5 rounded border border-[#DCD6C8]">
                {slide.city}
              </span>
              <h3 className="text-sm sm:text-base font-semibold text-[#1A1A1A]">
                {slide.tagline}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#5A554C] leading-relaxed">
              {slide.desc}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <button
              onClick={onOpenCustomBuilder}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#1A1A1A] hover:bg-[#333333] text-[#F9F7F2] font-bold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-3 group"
            >
              <span>Build Custom Budget Package</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onExploreCapitals}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/90 hover:bg-white border border-[#DCD6C8] text-[#1A1A1A] font-semibold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Compass className="w-4 h-4 text-[#8C7A5B]" />
              <span>Explore All Packages</span>
            </button>
          </div>
        </div>

        {/* Slide Counter & Indicators (Right Side Desktop) */}
        <div className="lg:col-span-4 grid grid-cols-3 lg:grid-cols-1 gap-2 sm:gap-3 w-full max-w-xl mx-auto lg:mx-0 z-10">
          {HERO_SLIDES.map((s, idx) => (
            <button
              key={s.city}
              onClick={() => setCurrentSlide(idx)}
              className={`group text-left p-2.5 sm:p-3.5 rounded-xl transition-all border text-xs w-full ${
                idx === currentSlide
                  ? 'bg-white border-[#1A1A1A] shadow-md'
                  : 'bg-white/80 border-[#DCD6C8] hover:border-[#1A1A1A]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5 sm:gap-4">
                <span className={`font-bold tracking-wider text-[11px] sm:text-xs ${idx === currentSlide ? 'text-[#1A1A1A]' : 'text-[#8C7A5B]'}`}>
                  0{idx + 1}. {s.city}
                </span>
                <span className="hidden sm:inline text-[10px] text-[#7A756C]">Budget Tour</span>
              </div>
              <p className={`text-[10px] sm:text-[11px] truncate mt-0.5 sm:mt-1 ${idx === currentSlide ? 'text-[#1A1A1A]' : 'text-[#7A756C]'}`}>
                {s.tagline}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Trust Badges Footer Bar */}
      <div className="relative z-10 bg-[#F0EEE9] border-t border-[#DCD6C8] py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-[#5A554C]">
            <ShieldCheck className="w-4 h-4 text-[#8C7A5B]" />
            <span>100% Lowest Price Guarantee</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-[#5A554C]">
            <Award className="w-4 h-4 text-[#8C7A5B]" />
            <span>Comfort AC Stays & Hotel Verified</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-[#5A554C]">
            <Clock className="w-4 h-4 text-[#8C7A5B]" />
            <span>24/7 On-Tour Customer Support</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-[#5A554C]">
            <Sparkles className="w-4 h-4 text-[#8C7A5B]" />
            <span>No Hidden Fees & Zero Subscriptions</span>
          </div>
        </div>
      </div>
    </section>
  );
};
