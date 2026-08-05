import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { TouristSpot, CityDestination, SpotCategory } from '../types';
import { TOURIST_SPOTS } from '../data/travelData';
import { MapPin, Star, Compass, Clock, Ticket, Sparkles, Plus, Check } from 'lucide-react';

interface InteractiveMapProps {
  onAddSpotToCustomItinerary?: (spot: TouristSpot) => void;
  selectedCityFilter?: CityDestination;
}

// Helper to safely parse and validate LatLng coordinates
const parseLatLng = (lat: any, lng: any, defaultLat = 21.0, defaultLng = 77.5): [number, number] | null => {
  const numLat = Number(lat);
  const numLng = Number(lng);
  if (
    typeof numLat === 'number' &&
    !isNaN(numLat) &&
    isFinite(numLat) &&
    typeof numLng === 'number' &&
    !isNaN(numLng) &&
    isFinite(numLng)
  ) {
    return [numLat, numLng];
  }
  if (defaultLat !== undefined && defaultLng !== undefined) {
    return [defaultLat, defaultLng];
  }
  return null;
};

// City center coordinates
const CITY_CENTERS: Record<string, { lat: number; lng: number; zoom: number }> = {
  All: { lat: 21.0, lng: 77.5, zoom: 5 },
  Hyderabad: { lat: 17.385, lng: 78.486, zoom: 12 },
  Delhi: { lat: 28.6139, lng: 77.209, zoom: 12 },
  Mumbai: { lat: 18.96, lng: 72.83, zoom: 12 },
};

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  onAddSpotToCustomItinerary,
  selectedCityFilter = 'All',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  const [activeCity, setActiveCity] = useState<CityDestination>(selectedCityFilter || 'All');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null);
  const [addedSpots, setAddedSpots] = useState<string[]>([]);

  // Update activeCity if selectedCityFilter prop changes
  useEffect(() => {
    if (selectedCityFilter) {
      setActiveCity(selectedCityFilter);
    }
  }, [selectedCityFilter]);

  // Filter spots
  const filteredSpots = TOURIST_SPOTS.filter((spot) => {
    if (!spot) return false;
    const matchesCity = activeCity === 'All' || spot.city === activeCity;
    const matchesCategory = activeCategory === 'All' || spot.category === activeCategory;
    return matchesCity && matchesCategory;
  });

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const targetCenter = CITY_CENTERS[activeCity] || CITY_CENTERS['All'];
      const initialCoords = parseLatLng(targetCenter?.lat, targetCenter?.lng, 21.0, 77.5) || [21.0, 77.5];
      const rawZoom = Number(targetCenter?.zoom);
      const validZoom = typeof rawZoom === 'number' && !isNaN(rawZoom) && isFinite(rawZoom) ? rawZoom : 5;

      try {
        const map = L.map(mapContainerRef.current, {
          center: initialCoords,
          zoom: validZoom,
          zoomControl: false,
        });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
          maxZoom: 19,
        }).addTo(map);

        L.control.zoom({ position: 'bottomright' }).addTo(map);

        mapInstanceRef.current = map;

        setTimeout(() => {
          if (mapInstanceRef.current) {
            mapInstanceRef.current.invalidateSize();
          }
        }, 200);
      } catch (err) {
        console.warn('Failed to initialize Leaflet map:', err);
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch {
          // ignore cleanup errors
        }
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Map view and markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Remove existing markers safely
    markersRef.current.forEach((m) => {
      try {
        m.remove();
      } catch {
        // ignore
      }
    });
    markersRef.current = [];

    // Fly to new city center safely
    const targetCenter = CITY_CENTERS[activeCity] || CITY_CENTERS['All'];
    const flyCoords = parseLatLng(targetCenter?.lat, targetCenter?.lng, 21.0, 77.5);
    const rawZoom = Number(targetCenter?.zoom);
    const validZoom = typeof rawZoom === 'number' && !isNaN(rawZoom) && isFinite(rawZoom) ? rawZoom : 12;

    if (flyCoords) {
      try {
        map.flyTo(flyCoords, validZoom, {
          duration: 1.2,
        });
      } catch (err) {
        console.warn('Map flyTo error:', err);
      }
    }

    // Create custom Editorial Marker SVG Icon
    const createCustomIcon = (cityName: string, category: string) => {
      let badgeColor = '#1A1A1A';
      if (cityName === 'Hyderabad') badgeColor = '#8C7A5B';
      if (cityName === 'Delhi') badgeColor = '#5A554C';
      if (cityName === 'Mumbai') badgeColor = '#1A1A1A';

      return L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div style="position: relative; display: flex; align-items: center; justify-content: center; cursor: pointer;">
            <div style="width: 32px; height: 32px; background: #FFFFFF; border: 2px solid ${badgeColor}; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.15);">
              <div style="width: 10px; height: 10px; background: ${badgeColor}; border-radius: 50%;"></div>
            </div>
            <div style="position: absolute; bottom: -6px; width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 6px solid ${badgeColor};"></div>
          </div>
        `,
        iconSize: [32, 38],
        iconAnchor: [16, 38],
      });
    };

    // Add new markers
    filteredSpots.forEach((spot) => {
      if (!spot) return;
      const spotCoords = parseLatLng(spot.lat, spot.lng, undefined, undefined);

      if (spotCoords) {
        try {
          const marker = L.marker(spotCoords, {
            icon: createCustomIcon(spot.city, spot.category),
          }).addTo(map);

          marker.on('click', () => {
            setSelectedSpot(spot);
            try {
              map.flyTo(spotCoords, 14, { duration: 0.8 });
            } catch (err) {
              console.warn('Marker click flyTo error:', err);
            }
          });

          markersRef.current.push(marker);
        } catch (e) {
          console.warn('Failed to add marker for spot:', spot?.name, e);
        }
      }
    });
  }, [activeCity, activeCategory]);

  const handleSelectSpot = (spot: TouristSpot) => {
    setSelectedSpot(spot);
    if (!spot) return;
    const coords = parseLatLng(spot.lat, spot.lng, undefined, undefined);
    if (coords && mapInstanceRef.current) {
      try {
        mapInstanceRef.current.flyTo(coords, 14, { duration: 0.8 });
      } catch (err) {
        console.warn('Sidebar spot select flyTo error:', err);
      }
    }
  };

  const handleAddSpot = (spot: TouristSpot) => {
    if (!addedSpots.includes(spot.id)) {
      setAddedSpots([...addedSpots, spot.id]);
    }
    if (onAddSpotToCustomItinerary) {
      onAddSpotToCustomItinerary(spot);
    }
  };

  const categories = [
    'All',
    'Heritage & Palaces',
    'Luxury Stays',
    'Fine Dining & High Tea',
    'Shopping & Bazaars',
    'Arts & Culture',
  ];

  return (
    <section id="interactive-map" className="py-20 bg-[#F9F7F2] text-[#1A1A1A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F0EEE9] border border-[#DCD6C8] text-[#8C7A5B] text-xs uppercase tracking-widest font-semibold mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive Tour Spots Map</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] mb-4">
            Explore <span className="text-[#8C7A5B]">Hyderabad, Delhi & Mumbai</span>
          </h2>
          <p className="text-[#5A554C] text-sm sm:text-base font-sans-body">
            Discover iconic heritage landmarks, local street food walks, bustling bazaars, and scenic sea views across India's top travel destinations.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          {/* City Toggle */}
          <div className="inline-flex p-1 bg-white border border-[#DCD6C8] rounded-full w-full md:w-auto overflow-x-auto shadow-sm">
            {(['All', 'Hyderabad', 'Delhi', 'Mumbai'] as CityDestination[]).map((city) => (
              <button
                key={city}
                onClick={() => setActiveCity(city)}
                className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                  activeCity === city
                    ? 'bg-[#1A1A1A] text-[#F9F7F2] shadow-sm font-bold'
                    : 'text-[#5A554C] hover:text-[#1A1A1A]'
                }`}
              >
                {city === 'All' ? 'All Capitals' : city}
              </button>
            ))}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap border ${
                  activeCategory === cat
                    ? 'border-[#1A1A1A] bg-[#1A1A1A] text-[#F9F7F2]'
                    : 'border-[#DCD6C8] bg-white text-[#5A554C] hover:border-[#1A1A1A] hover:text-[#1A1A1A]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Map Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[600px] rounded-2xl overflow-hidden border border-[#DCD6C8] bg-white shadow-md relative">
          {/* Map Area */}
          <div className="lg:col-span-8 h-full relative z-10">
            <div ref={mapContainerRef} className="w-full h-full" />
            
            {/* Quick Map Legend Overlay */}
            <div className="absolute top-4 left-4 z-[400] bg-white px-4 py-2.5 rounded-xl border border-[#DCD6C8] text-xs hidden sm:flex items-center gap-4 shadow-md">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8C7A5B]" />
                <span className="text-[#5A554C]">Hyderabad</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#5A554C]" />
                <span className="text-[#5A554C]">Delhi</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A]" />
                <span className="text-[#5A554C]">Mumbai</span>
              </div>
            </div>
          </div>

          {/* Sidebar Spots List & Detail Card */}
          <div className="lg:col-span-4 h-full bg-[#F0EEE9] border-l border-[#DCD6C8] p-4 flex flex-col overflow-y-auto">
            {selectedSpot ? (
              /* Selected Spot Detail View */
              <div className="flex-1 flex flex-col h-full animate-fadeIn">
                <button
                  onClick={() => setSelectedSpot(null)}
                  className="text-xs text-[#8C7A5B] hover:underline mb-3 inline-flex items-center gap-1 font-medium"
                >
                  ← Back to spot listings ({filteredSpots.length})
                </button>

                <div className="relative h-44 rounded-xl overflow-hidden mb-4 border border-[#DCD6C8]">
                  <img
                    src={selectedSpot.image}
                    alt={selectedSpot.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 bg-white/95 border border-[#DCD6C8] text-[#1A1A1A] text-[10px] uppercase font-bold px-2.5 py-1 rounded-full shadow-sm">
                    {selectedSpot.city}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                    <span className="text-xs text-[#1A1A1A] font-medium bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded border border-[#DCD6C8]">
                      {selectedSpot.category}
                    </span>
                    <span className="flex items-center gap-1 bg-[#1A1A1A] text-[#F9F7F2] font-bold text-xs px-2 py-0.5 rounded">
                      <Star className="w-3 h-3 fill-[#F9F7F2]" /> {selectedSpot.rating}
                    </span>
                  </div>
                </div>

                <h3 className="font-serif-display text-xl text-[#1A1A1A] font-semibold mb-1">
                  {selectedSpot.name}
                </h3>
                <p className="text-xs text-[#7A756C] mb-3 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#8C7A5B]" /> {selectedSpot.address}
                </p>

                <p className="text-xs text-[#5A554C] leading-relaxed mb-4">
                  {selectedSpot.description}
                </p>

                {/* Spot Meta Details */}
                <div className="space-y-2 mb-4 bg-white p-3 rounded-xl border border-[#DCD6C8] text-xs">
                  <div className="flex justify-between items-center text-[#5A554C]">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#8C7A5B]" /> Recommended Duration:
                    </span>
                    <span className="text-[#1A1A1A] font-semibold">{selectedSpot.durationHours} Hours</span>
                  </div>
                  <div className="flex justify-between items-center text-[#5A554C]">
                    <span className="flex items-center gap-1.5">
                      <Ticket className="w-3.5 h-3.5 text-[#8C7A5B]" /> Entry Pass / Tour:
                    </span>
                    <span className="text-[#8C7A5B] font-semibold">
                      {selectedSpot.ticketFeeINR > 0 ? `₹${selectedSpot.ticketFeeINR.toLocaleString('en-IN')}` : 'Complimentary'}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-[#DCD6C8]">
                    <span className="text-[#8C7A5B] font-semibold block mb-0.5 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Traveler Smart Tip:
                    </span>
                    <p className="text-[11px] text-[#5A554C] italic">{selectedSpot.travelerTip || selectedSpot.luxuryTip}</p>
                  </div>
                </div>

                <div className="mt-auto pt-2">
                  <button
                    onClick={() => handleAddSpot(selectedSpot)}
                    className={`w-full py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 ${
                      addedSpots.includes(selectedSpot.id)
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#1A1A1A] text-[#F9F7F2] hover:bg-[#333333] shadow-sm'
                    }`}
                  >
                    {addedSpots.includes(selectedSpot.id) ? (
                      <>
                        <Check className="w-4 h-4" /> Added to Custom Itinerary
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" /> Add Spot to Itinerary
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              /* Spots List Sidebar */
              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#DCD6C8]">
                  <span className="text-xs uppercase tracking-wider text-[#8C7A5B] font-semibold">
                    Spots ({filteredSpots.length})
                  </span>
                  <span className="text-[11px] text-[#7A756C]">Click pin or spot to explore</span>
                </div>

                <div className="space-y-3 overflow-y-auto pr-1 flex-1">
                  {filteredSpots.map((spot) => (
                    <div
                      key={spot.id}
                      onClick={() => handleSelectSpot(spot)}
                      className="group p-3 rounded-xl bg-white hover:bg-[#F0EEE9] border border-[#DCD6C8] transition-all cursor-pointer flex items-center gap-3 shadow-sm"
                    >
                      <img
                        src={spot.image}
                        alt={spot.name}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="text-xs font-semibold text-[#1A1A1A] group-hover:text-[#8C7A5B] truncate">
                            {spot.name}
                          </h4>
                          <span className="flex items-center text-[10px] text-[#1A1A1A] font-bold">
                            <Star className="w-2.5 h-2.5 fill-[#1A1A1A] mr-0.5" />
                            {spot.rating}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#7A756C] truncate mt-0.5">{spot.category}</p>
                        <div className="flex items-center gap-2 mt-1.5 text-[10px] text-[#5A554C]">
                          <span className="px-1.5 py-0.5 rounded bg-[#F0EEE9] text-[#1A1A1A] border border-[#DCD6C8]">
                            {spot.city}
                          </span>
                          <span>{spot.durationHours}h tour</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
