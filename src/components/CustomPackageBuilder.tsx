import React, { useState } from 'react';
import { CityDestination, DayItinerary, Package } from '../types';
import { Sparkles, Calendar, MapPin, Users, HeartHandshake, CheckCircle2, ArrowRight, Loader2, RefreshCw } from 'lucide-react';

interface CustomPackageBuilderProps {
  onClose: () => void;
  onProceedToBooking: (customPackage: Package) => void;
}

export const CustomPackageBuilder: React.FC<CustomPackageBuilderProps> = ({
  onClose,
  onProceedToBooking,
}) => {
  const [destination, setDestination] = useState<'Hyderabad' | 'Delhi' | 'Mumbai'>('Hyderabad');
  const [durationDays, setDurationDays] = useState<number>(3);
  const [travelerType, setTravelerType] = useState<string>('Family Budget Trip');
  const [budgetLevel, setBudgetLevel] = useState<string>('Value Budget Comfort Stays');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Heritage & Landmarks',
    'Local Food & Street Walking',
  ]);
  const [specialRequests, setSpecialRequests] = useState<string>('');

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const interestOptions = [
    'Heritage & Landmarks',
    'Local Food & Street Walking',
    'Boat Cruise & Ferry Ride',
    'Bazaars & Souvenir Shopping',
    'Arts, Culture & Museums',
    'Sightseeing & City Tours',
  ];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleGenerateAIItinerary = async () => {
    setIsGenerating(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/gemini/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination,
          durationDays,
          travelerType,
          budget: budgetLevel,
          interests: selectedInterests,
          specialRequests,
        }),
      });

      const data = await response.json();

      if (data.success && data.itinerary) {
        setGeneratedItinerary(data.itinerary);
      } else {
        // Fallback generated itinerary template if offline or key missing
        const fallbackTitle = `Custom ${destination} Budget Tour`;
        const fallbackCost = destination === 'Hyderabad' ? 3499 : destination === 'Delhi' ? 3999 : 4499;
        
        const fallbackDays: DayItinerary[] = Array.from({ length: durationDays }).map((_, idx) => ({
          dayNumber: idx + 1,
          theme: idx === 0 ? 'City Arrival & Heritage Street Walk' : idx === 1 ? 'Historical Monument Tour & Local Eats' : 'Market Souvenirs & Departure',
          schedule: [
            {
              id: `custom-${idx}-1`,
              time: '09:30 AM',
              activity: `Morning City Exploration in ${destination}`,
              location: `${destination} Heritage Center`,
              description: `Guided tour of curated historical landmarks and sights in ${destination}.`,
              category: 'Heritage',
              insiderTip: 'Wear comfortable walking shoes and carry a water bottle.'
            },
            {
              id: `custom-${idx}-2`,
              time: '01:00 PM',
              activity: 'Local Authentic Food Lunch',
              location: `${destination} Famous Local Eatery`,
              description: 'Savor authentic regional dishes at famous budget-friendly family food stalls.',
              category: 'Local Dining'
            },
            {
              id: `custom-${idx}-3`,
              time: '05:00 PM',
              activity: 'Sunset Walk & Bazaars',
              location: `${destination} Promenade`,
              description: 'Breezy evening walk and shopping for handcrafted souvenirs.',
              category: 'Shopping'
            }
          ]
        }));

        setGeneratedItinerary({
          title: fallbackTitle,
          tagline: `Value ${durationDays}-Day Budget Tour in ${destination}`,
          estimatedCostINR: fallbackCost,
          includedLuxuryServices: [
            '3-Star AC Hotel Accommodation',
            'AC Bus / Private Coach Transfers',
            'All Monument Entry Passes & Guide Fees',
            'Complimentary Daily Breakfast'
          ],
          days: fallbackDays,
          conciergeNotes: 'Your budget custom itinerary is ready for instant booking.'
        });
      }
    } catch (err: any) {
      console.error('Itinerary generation error:', err);
      setErrorMsg('Could not connect to AI server. Showing curated template.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleConvertAndBook = () => {
    if (!generatedItinerary) return;

    const customPkg: Package = {
      id: `custom-pkg-${Date.now()}`,
      title: generatedItinerary.title || `Custom ${destination} Budget Tour`,
      subtitle: generatedItinerary.tagline || `Pocket-Friendly ${durationDays}-Day Itinerary`,
      city: destination,
      durationDays,
      priceINR: generatedItinerary.estimatedCostINR || 3499,
      originalPriceINR: (generatedItinerary.estimatedCostINR || 3499) * 1.4,
      coverImage:
        destination === 'Hyderabad'
          ? 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200&auto=format&fit=crop'
          : destination === 'Delhi'
          ? 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop'
          : 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200&auto=format&fit=crop'
      ],
      hotelName: `Verified 3-Star AC Hotel Stay in ${destination}`,
      hotelRating: 4,
      rating: 4.8,
      totalReviews: 12,
      tags: ['Custom AI Generated', 'AC Transport Included', 'Budget Special'],
      highlights: generatedItinerary.includedLuxuryServices || ['Budget Friendly Itinerary'],
      inclusions: generatedItinerary.includedLuxuryServices || ['AC Hotel Stay', 'Sightseeing Transfers'],
      dayByDayItinerary: generatedItinerary.days || [],
      bestFor: travelerType
    };

    onProceedToBooking(customPkg);
  };

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-[#080a0e]/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0d1017] border border-[#d4af37]/30 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 text-[#f2efe9]">
        {/* Header */}
        <div className="flex justify-between items-start pb-6 border-b border-[#d4af37]/20">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-panel-gold text-[#d4af37] text-[10px] font-bold uppercase tracking-widest mb-2">
              <Sparkles className="w-3 h-3" />
              <span>AI Custom Vacation Builder • Gemini 3.1 Pro</span>
            </div>
            <h2 className="font-serif-display text-2xl sm:text-3xl text-[#f4f0ea]">
              Design Your <span className="gold-gradient-text">Bespoke Itinerary</span>
            </h2>
            <p className="text-xs text-[#a0a5b1] mt-1">
              Select your preferred capital, travel style, and duration. Our AI concierge will formulate a tailored day-by-day luxury plan.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#161a24] hover:bg-[#202634] text-[#a0a5b1] hover:text-[#f2efe9]"
          >
            ✕
          </button>
        </div>

        {/* Form Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          {/* Destination Capital */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Destination Capital
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Hyderabad', 'Delhi', 'Mumbai'] as const).map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => setDestination(city)}
                  className={`py-3 px-2 rounded-xl text-xs font-bold transition-all border ${
                    destination === city
                      ? 'bg-[#d4af37] text-[#0b0d10] border-[#d4af37]'
                      : 'bg-[#141822] text-[#a0a5b1] border-[#d4af37]/20 hover:border-[#d4af37]/50'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Duration Days */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> Duration (Days)
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[2, 3, 4, 5].map((days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => setDurationDays(days)}
                  className={`py-3 rounded-xl text-xs font-bold transition-all border ${
                    durationDays === days
                      ? 'bg-[#d4af37] text-[#0b0d10] border-[#d4af37]'
                      : 'bg-[#141822] text-[#a0a5b1] border-[#d4af37]/20 hover:border-[#d4af37]/50'
                  }`}
                >
                  {days} Days
                </button>
              ))}
            </div>
          </div>

          {/* Traveler Style */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" /> Traveler Vibe
            </label>
            <select
              value={travelerType}
              onChange={(e) => setTravelerType(e.target.value)}
              className="w-full bg-[#141822] border border-[#d4af37]/20 rounded-xl px-3 py-3 text-xs text-[#f4f0ea] focus:outline-none focus:border-[#d4af37]"
            >
              <option value="Couples Royal Getaway">Couples Royal Getaway & Honeymoon</option>
              <option value="Family Heritage Vacation">Family Heritage & Educational Tour</option>
              <option value="Solo Luxury Explorer">Solo VIP Explorer</option>
              <option value="Culinary & Shopping Safari">Culinary, Fashion & Pearl Safari</option>
            </select>
          </div>

          {/* Budget Tier */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
              <HeartHandshake className="w-3.5 h-3.5" /> Luxury Tier
            </label>
            <select
              value={budgetLevel}
              onChange={(e) => setBudgetLevel(e.target.value)}
              className="w-full bg-[#141822] border border-[#d4af37]/20 rounded-xl px-3 py-3 text-xs text-[#f4f0ea] focus:outline-none focus:border-[#d4af37]"
            >
              <option value="Ultra Royal Palace Stays">Ultra Royal Palace Stays & Maybach Transfers</option>
              <option value="5-Star Luxury Heritage">5-Star Heritage Hotel & Private Chauffeur</option>
              <option value="Bespoke Boutique">Bespoke Boutique Suite & Concierge</option>
            </select>
          </div>

          {/* Interests Pills */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
              Interests & Inclusions
            </label>
            <div className="flex flex-wrap gap-2">
              {interestOptions.map((option) => {
                const isSelected = selectedInterests.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleInterest(option)}
                    className={`px-3.5 py-2 rounded-full text-xs font-medium transition-all border ${
                      isSelected
                        ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#d4af37]'
                        : 'bg-[#141822] border-[#d4af37]/15 text-[#8e94a0] hover:text-[#f2efe9]'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Special Requests */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
              Special Concierge Notes / Preferences
            </label>
            <input
              type="text"
              placeholder="e.g. Vegetarian high tea, dietary requirements, anniversary cake, horse carriage entry..."
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              className="w-full bg-[#141822] border border-[#d4af37]/20 rounded-xl px-4 py-3 text-xs text-[#f4f0ea] placeholder-[#555a66] focus:outline-none focus:border-[#d4af37]"
            />
          </div>
        </div>

        {/* Generate Button */}
        {!generatedItinerary && (
          <div className="pt-2">
            <button
              onClick={handleGenerateAIItinerary}
              disabled={isGenerating}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#8a6a1c] text-[#0b0d10] font-bold text-xs uppercase tracking-widest hover:opacity-95 transition-all shadow-xl shadow-[#d4af37]/20 flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Synthesizing Royal Gemini Itinerary...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate AI Itinerary with Gemini 3.1 Pro</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Generated Itinerary Preview Card */}
        {generatedItinerary && (
          <div className="mt-6 p-6 rounded-2xl bg-[#131722] border border-[#d4af37]/40 space-y-4 animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-[#d4af37]/20">
              <div>
                <span className="text-[10px] text-[#d4af37] uppercase font-bold tracking-widest bg-[#d4af37]/10 px-2 py-0.5 rounded">
                  AI Tailored Result
                </span>
                <h3 className="font-serif-display text-2xl text-[#f4f0ea] font-semibold mt-1">
                  {generatedItinerary.title}
                </h3>
                <p className="text-xs text-[#a0a5b1] italic">{generatedItinerary.tagline}</p>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-[#8e94a0] uppercase block">Total Calculated Cost</span>
                <span className="text-2xl font-bold gold-gradient-text">
                  ₹{Number(generatedItinerary.estimatedCostINR || 145000).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Day By Day Timeline Preview */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {generatedItinerary.days?.map((day: DayItinerary) => (
                <div key={day.dayNumber} className="p-3 rounded-xl bg-[#191d2a] border border-[#d4af37]/15">
                  <div className="flex justify-between items-center text-xs font-bold text-[#d4af37]">
                    <span>Day 0{day.dayNumber}: {day.theme}</span>
                    <span>{day.schedule?.length || 0} Exclusive Activities</span>
                  </div>
                  <div className="mt-2 space-y-1">
                    {day.schedule?.map((act: any, idx: number) => (
                      <div key={idx} className="text-[11px] text-[#c0c5d0] flex justify-between">
                        <span>• {act.time} - {act.activity} ({act.location})</span>
                        <span className="text-[#d4af37]">{act.category}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Inclusions */}
            {generatedItinerary.includedLuxuryServices && (
              <div className="pt-2">
                <span className="text-[10px] uppercase font-bold text-[#8e94a0]">Inclusions:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {generatedItinerary.includedLuxuryServices.map((inc: string, i: number) => (
                    <span key={i} className="text-[11px] text-[#d4af37] bg-[#d4af37]/10 px-2.5 py-1 rounded-full border border-[#d4af37]/20 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#d4af37]" /> {inc}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="flex gap-3 pt-4 border-t border-[#d4af37]/20">
              <button
                onClick={handleGenerateAIItinerary}
                className="py-3 px-4 rounded-xl border border-[#d4af37]/30 bg-[#161a24] hover:bg-[#1f2533] text-xs font-semibold text-[#f4f0ea] flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Re-Generate
              </button>

              <button
                onClick={handleConvertAndBook}
                className="flex-1 py-3 rounded-xl bg-[#d4af37] hover:bg-[#e5c158] text-[#0b0d10] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#d4af37]/20"
              >
                <span>Proceed to Secure Booking & Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
