import React, { useState } from 'react';
import { SEO } from '../components/SEO';
import { Package, CityDestination } from '../types';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, Compass, ArrowRight, Star, Sun, Utensils, Landmark, Sparkles } from 'lucide-react';

interface DestinationsPageProps {
  packages: Package[];
  onSelectPackage: (pkg: Package) => void;
  onBookNow: (pkg: Package) => void;
}

const CITY_DETAILS = {
  Hyderabad: {
    title: 'Hyderabad: City of Nizams & Pearls',
    tagline: 'Falaknuma Luxury, Charminar Heritage & Iconic Hyderabadi Biryani',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Golconda_Fort_005.jpg',
    description: 'Hyderabad blends four centuries of royal Nizam heritage with contemporary elegance. From Charminar, Golconda Fort sound & light shows, to the opulent Taj Falaknuma Palace high tea.',
    topSpots: ['Charminar & Laad Bazaar', 'Golconda Fort', 'Qutb Shahi Tombs', 'Taj Falaknuma Palace', 'Chowmahalla Palace'],
    foodHighlights: ['Hyderabadi Dum Biryani', 'Double Ka Meetha', 'Irani Chai & Osmania Biscuits', 'Mirchi Ka Salan'],
    bestTime: 'October to March (Pleasant 20°C - 28°C)',
  },
  Delhi: {
    title: 'Delhi: Capital of Monarchs & Heritage',
    tagline: 'Imperial Lutyens, Chandni Chowk Food Safari & UNESCO Wonders',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1200&auto=format&fit=crop',
    description: 'Delhi stands as the vibrant soul of India, where ancient Mughal forts sit alongside grand British colonial avenues. Experience Chandni Chowk rickshaw rides, Qutub Minar, and India Gate.',
    topSpots: ['Qutub Minar Complex', 'Chandni Chowk & Jama Masjid', 'Humayun Tomb', 'India Gate & Rashtrapati Bhavan', 'Red Fort'],
    foodHighlights: ['Paranthe Wali Gali Paranthas', 'Butter Chicken at Pandara Road', 'Daulat Ki Chaat', 'Chole Bhature'],
    bestTime: 'October to March (Crisp 10°C - 22°C)',
  },
  Mumbai: {
    title: 'Mumbai: Coastal Gateway & Financial Capital',
    tagline: 'Marine Drive Sunset, Elephanta Caves & Gateway of India Splendor',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1200&auto=format&fit=crop',
    description: 'Mumbai is India’s economic powerhouse and cinematic heartland. Experience colonial Victorian architecture, coastal Marine Drive promenades, Elephanta island heritage, and Colaba street markets.',
    topSpots: ['Gateway of India', 'Marine Drive Promenade', 'Elephanta Caves UNESCO', 'Chhatrapati Shivaji Terminus', 'Colaba Causeway'],
    foodHighlights: ['Vada Pav & Pav Bhaji at Juhu', 'Bombil Fry', 'Irani Cafe Mutton Berry Pulao', 'Falooda at Badshah'],
    bestTime: 'November to February (Breezy 22°C - 30°C)',
  },
};

export const DestinationsPage: React.FC<DestinationsPageProps> = ({
  packages,
  onSelectPackage,
  onBookNow,
}) => {
  const { city } = useParams<{ city?: string }>();
  const navigate = useNavigate();

  const currentCity: 'Hyderabad' | 'Delhi' | 'Mumbai' =
    city === 'Delhi' || city === 'Mumbai' ? city : 'Hyderabad';

  const details = CITY_DETAILS[currentCity];
  const cityPackages = packages.filter((p) => p.city === currentCity);

  return (
    <div className="pt-28 sm:pt-32 lg:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <SEO
        title={`${details.title} | Tour with Journeyvers`}
        description={`${details.description} Book Hyderabad, Delhi, and Mumbai tour packages with Journeyvers.`}
        keywords={`Journeyvers, Travel, Tour with Journeyvers, ${currentCity} Tour Packages, ${currentCity} Travel Guide`}
      />

      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8C7A5B]/10 border border-[#8C7A5B]/20 text-[#8C7A5B] text-xs font-bold uppercase tracking-widest">
          <Compass className="w-3.5 h-3.5" />
          <span>India Destination Guides</span>
        </div>
        <h1 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#1A1A1A]">
          Tour <span className="text-[#8C7A5B]">{currentCity}</span> with Journeyvers
        </h1>
        <p className="text-xs sm:text-sm text-[#5A554C] leading-relaxed">
          Select a capital below to explore authentic city heritage guides, local culinary secrets, and hand-crafted tour packages.
        </p>
      </div>

      {/* City Switcher Tabs */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 border-b border-[#DCD6C8] pb-4">
        {(['Hyderabad', 'Delhi', 'Mumbai'] as const).map((c) => (
          <button
            key={c}
            onClick={() => navigate(`/destinations/${c}`)}
            className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all ${
              currentCity === c
                ? 'bg-[#1A1A1A] text-[#F9F7F2] shadow-md'
                : 'bg-white border border-[#DCD6C8] text-[#5A554C] hover:border-[#8C7A5B]'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* City Hero Card */}
      <div className="relative rounded-3xl overflow-hidden border border-[#DCD6C8] shadow-md h-80 sm:h-96">
        <img
          src={details.image}
          alt={details.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 sm:p-10 text-white space-y-2">
          <span className="text-xs font-bold text-[#8C7A5B] uppercase tracking-widest bg-black/60 px-3 py-1 rounded-full w-fit backdrop-blur-md">
            Destination Spotlight
          </span>
          <h2 className="font-serif-display text-2xl sm:text-4xl font-bold">
            {details.title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-200 max-w-2xl">
            {details.description}
          </p>
        </div>
      </div>

      {/* City Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-[#DCD6C8] p-6 space-y-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#8C7A5B]/10 flex items-center justify-center text-[#8C7A5B]">
            <Landmark className="w-5 h-5" />
          </div>
          <h3 className="font-serif-display font-bold text-base text-[#1A1A1A]">Key Heritage Monuments</h3>
          <ul className="text-xs text-[#5A554C] space-y-1.5 list-disc list-inside">
            {details?.topSpots?.map((spot) => (
              <li key={spot}>{spot}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl border border-[#DCD6C8] p-6 space-y-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#8C7A5B]/10 flex items-center justify-center text-[#8C7A5B]">
            <Utensils className="w-5 h-5" />
          </div>
          <h3 className="font-serif-display font-bold text-base text-[#1A1A1A]">Must-Try Food Delicacies</h3>
          <ul className="text-xs text-[#5A554C] space-y-1.5 list-disc list-inside">
            {details?.foodHighlights?.map((food) => (
              <li key={food}>{food}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl border border-[#DCD6C8] p-6 space-y-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#8C7A5B]/10 flex items-center justify-center text-[#8C7A5B]">
            <Sun className="w-5 h-5" />
          </div>
          <h3 className="font-serif-display font-bold text-base text-[#1A1A1A]">Best Season to Visit</h3>
          <p className="text-xs text-[#5A554C] leading-relaxed">
            {details.bestTime}
          </p>
          <div className="pt-2">
            <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2.5 py-1 rounded-full border border-emerald-200">
              Ideal Weather for Sightseeing
            </span>
          </div>
        </div>
      </div>

      {/* Packages for this City */}
      <div className="space-y-6">
        <h3 className="font-serif-display text-2xl font-bold text-[#1A1A1A]">
          Available Tour Packages in {currentCity}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cityPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-2xl border border-[#DCD6C8] hover:border-[#8C7A5B] transition-all overflow-hidden flex flex-col justify-between shadow-sm group"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={pkg.coverImage || pkg.galleryImages?.[0] || 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop'}
                    alt={pkg.title}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#1A1A1A]/90 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    {pkg.durationDays} Days / {pkg.durationDays - 1} Nights
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h4 className="font-serif-display text-base font-bold text-[#1A1A1A] line-clamp-1">
                    {pkg.title}
                  </h4>
                  <p className="text-xs text-[#5A554C] line-clamp-2 leading-relaxed">
                    {pkg.subtitle}
                  </p>
                  <p className="text-[11px] text-[#8C7A5B] font-semibold pt-1">
                    🏨 {pkg.hotelName}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-[#F0EEE9] mt-3 space-y-3">
                <div className="pt-3 flex justify-between items-baseline">
                  <span className="font-serif-display font-bold text-lg text-[#1A1A1A]">
                    ₹{pkg.priceINR.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-[#7A756C]">($ {pkg.priceUSD})</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSelectPackage(pkg)}
                    className="w-full py-2 rounded-xl bg-white border border-[#DCD6C8] text-[#1A1A1A] text-xs font-bold"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => onBookNow(pkg)}
                    className="w-full py-2 rounded-xl bg-[#1A1A1A] text-[#F9F7F2] text-xs font-bold"
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
