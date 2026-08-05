import React, { useState } from 'react';
import { SEO } from '../components/SEO';
import { Package } from '../types';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, Calendar, Star, CheckCircle, ShieldCheck, ArrowLeft, Heart, Sparkles, MessageCircle, Clock, UserCheck } from 'lucide-react';

interface PackageDetailPageProps {
  packages: Package[];
  savedPackageIds?: string[];
  onBookNow: (pkg: Package) => void;
  onToggleSave: (pkg: Package) => void;
}

export const PackageDetailPage: React.FC<PackageDetailPageProps> = ({
  packages,
  savedPackageIds = [],
  onBookNow,
  onToggleSave,
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const pkg = packages.find((p) => p.id === id) || packages[0];
  const isSaved = savedPackageIds.includes(pkg?.id || '');

  // Active selected image for detail page
  const defaultImage = pkg?.coverImage || pkg?.galleryImages?.[0] || 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop';
  const [selectedImage, setSelectedImage] = useState<string>(defaultImage);

  // Fallback handler if external image fails
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop';
  };

  if (!pkg) {
    return (
      <div className="pt-32 pb-20 text-center max-w-xl mx-auto px-4 space-y-4">
        <h2 className="text-2xl font-serif-display font-bold text-[#1A1A1A]">Package Not Found</h2>
        <p className="text-xs text-[#5A554C]">The requested tour package could not be located.</p>
        <Link to="/packages" className="px-6 py-2.5 rounded-full bg-[#1A1A1A] text-white text-xs font-bold inline-block">
          View All Packages
        </Link>
      </div>
    );
  }

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    'name': pkg.title,
    'description': pkg.subtitle,
    'touristType': ['Heritage Travelers', 'Luxury Vacationers', 'Family Travelers'],
    'offers': {
      '@type': 'Offer',
      'price': pkg.priceINR,
      'priceCurrency': 'INR',
      'availability': 'https://schema.org/InStock',
    },
    'provider': {
      '@type': 'TravelAgency',
      'name': 'Journeyvers Travel',
      'url': 'https://journeyvers.com',
    },
  };

  return (
    <div className="pt-28 sm:pt-32 lg:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      <SEO
        title={`${pkg.title} | Tour with Journeyvers`}
        description={`Book ${pkg.title} in ${pkg.city}. ${pkg.subtitle}. Price ₹${pkg.priceINR.toLocaleString('en-IN')}. Includes ${pkg.hotelName}, private transport, and 24/7 concierge.`}
        keywords={`Journeyvers, Travel, Tour with Journeyvers, ${pkg.city} Tour, ${pkg.title}`}
        schemaData={schemaData}
      />

      {/* Back Button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#8C7A5B] hover:text-[#1A1A1A] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Packages</span>
        </button>
      </div>

      {/* Header Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Details Left */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative h-72 sm:h-96 rounded-3xl overflow-hidden border border-[#DCD6C8] shadow-sm">
            <img
              src={selectedImage || defaultImage}
              alt={pkg.title}
              onError={handleImageError}
              className="w-full h-full object-cover transition-all duration-300"
            />
            <div className="absolute top-4 left-4 bg-[#1A1A1A]/90 backdrop-blur-md text-[#F9F7F2] text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border border-white/20">
              <MapPin className="w-3.5 h-3.5 text-[#8C7A5B]" />
              <span>{pkg.city} Heritage Experience</span>
            </div>
            <button
              onClick={() => onToggleSave(pkg)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-md text-[#1A1A1A] hover:bg-white transition-all shadow-md"
              title={isSaved ? 'Remove from Saved' : 'Save to Wishlist'}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : 'text-[#1A1A1A]'}`} />
            </button>
          </div>

          {/* Gallery Thumbnails */}
          {pkg.galleryImages && pkg.galleryImages.length > 0 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {[pkg.coverImage, ...pkg.galleryImages.filter(img => img !== pkg.coverImage)].map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`relative w-20 h-16 sm:w-24 sm:h-18 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    (selectedImage || defaultImage) === imgUrl
                      ? 'border-[#8C7A5B] ring-2 ring-[#8C7A5B]/30 scale-105 shadow-md'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${pkg.title} photo ${idx + 1}`}
                    onError={handleImageError}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-widest text-[#8C7A5B]">
                {pkg.durationDays} Days / {pkg.durationDays - 1} Nights Journey
              </span>
              <div className="flex items-center gap-1 text-xs font-bold text-[#1A1A1A]">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>{pkg.rating} Rating</span>
              </div>
            </div>

            <h1 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
              {pkg.title}
            </h1>
            <p className="text-sm text-[#5A554C] leading-relaxed">
              {pkg.subtitle}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {pkg.tags?.map((t) => (
                <span
                  key={t}
                  className="text-xs bg-[#F0EEE9] border border-[#DCD6C8] text-[#5A554C] px-3 py-1 rounded-full font-medium"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* Highlights & Inclusions */}
          <div className="bg-white rounded-2xl border border-[#DCD6C8] p-6 space-y-4 shadow-sm">
            <h3 className="font-serif-display text-lg font-bold text-[#1A1A1A] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8C7A5B]" />
              <span>Exclusive Package Inclusions & Services</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#5A554C]">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#8C7A5B] shrink-0 mt-0.5" />
                <span><strong>Luxury Stay:</strong> {pkg.hotelName}</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#8C7A5B] shrink-0 mt-0.5" />
                <span><strong>Chauffeur Transit:</strong> Private AC Vehicle Included</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#8C7A5B] shrink-0 mt-0.5" />
                <span><strong>Curator Access:</strong> Fast-track monument tickets</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#8C7A5B] shrink-0 mt-0.5" />
                <span><strong>Concierge Support:</strong> 24/7 Journeyvers Butler Line</span>
              </div>
            </div>
          </div>

          {/* Day-by-day Itinerary */}
          <div className="space-y-4">
            <h3 className="font-serif-display text-xl font-bold text-[#1A1A1A]">
              Day-by-Day Journey Itinerary
            </h3>

            <div className="space-y-4">
              {pkg.itinerary?.map((day) => (
                <div
                  key={day.dayNumber}
                  className="bg-white rounded-2xl border border-[#DCD6C8] p-6 space-y-4 shadow-sm"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-[#F0EEE9]">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8C7A5B]">
                      Day 0{day.dayNumber}
                    </span>
                    <h4 className="font-serif-display font-bold text-sm text-[#1A1A1A]">
                      {day.theme}
                    </h4>
                  </div>

                  <div className="space-y-3 pl-2 border-l-2 border-[#8C7A5B]/30">
                    {day.schedule?.map((item) => (
                      <div key={item.id} className="text-xs space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#8C7A5B] bg-[#8C7A5B]/10 px-2 py-0.5 rounded text-[10px]">
                            {item.time}
                          </span>
                          <span className="font-bold text-[#1A1A1A]">{item.activity}</span>
                          <span className="text-[10px] text-[#7A756C] italic">({item.category})</span>
                        </div>
                        <p className="text-[#5A554C] pl-2 leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Booking Card Right */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-[#DCD6C8] p-6 space-y-6 shadow-md sticky top-28">
            <div className="space-y-1 border-b border-[#F0EEE9] pb-4">
              <span className="text-xs text-[#7A756C] block font-semibold">Total Price Per Couple</span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif-display text-3xl font-bold text-[#1A1A1A]">
                  ₹{pkg.priceINR.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-[#7A756C]">($ {pkg.priceUSD} USD)</span>
              </div>
              <p className="text-[10px] text-emerald-700 font-bold pt-1">
                ✔ Taxes & Private Transport Included
              </p>
            </div>

            <div className="space-y-3 text-xs text-[#5A554C]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#8C7A5B]" />
                <span>PCI-DSS 256-bit Encrypted Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#8C7A5B]" />
                <span>Verified Local Tour Guide</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#8C7A5B]" />
                <span>Free cancellation up to 48 hours prior</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => onBookNow(pkg)}
                className="w-full py-3.5 rounded-full bg-[#1A1A1A] hover:bg-[#333333] text-[#F9F7F2] font-bold text-xs uppercase tracking-widest transition-all shadow-md"
              >
                Book This Package
              </button>
              <a
                href={`https://wa.me/917291010487?text=${encodeURIComponent(`Hi Journeyvers! I am interested in booking the "${pkg.title}" package.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
