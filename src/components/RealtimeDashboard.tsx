import React, { useState, useEffect } from 'react';
import { Booking, ItineraryActivity } from '../types';
import { Calendar, Clock, MapPin, CheckCircle2, MessageSquare, Phone, Car, CloudSun, Plus, Send, Sparkles, Download, ArrowLeft, ShieldCheck } from 'lucide-react';

interface RealtimeDashboardProps {
  booking: Booking;
  onClose: () => void;
}

export const RealtimeDashboard: React.FC<RealtimeDashboardProps> = ({ booking, onClose }) => {
  const [activeDayIdx, setActiveDayIdx] = useState(0);
  const [itineraryDays, setItineraryDays] = useState(booking.itineraryDays || []);
  
  // Custom Activity Modal State
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);
  const [newActivityTime, setNewActivityTime] = useState('03:00 PM');
  const [newActivityTitle, setNewActivityTitle] = useState('');
  const [newActivityLoc, setNewActivityLoc] = useState('');
  const [newActivityDesc, setNewActivityDesc] = useState('');

  // AI Concierge Assistant State
  const [showConciergeChat, setShowConciergeChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'concierge'; content: string }>>([
    {
      sender: 'concierge',
      content: `Greetings! I am your Journeyvers Royal Concierge for ${booking.city}. How may I assist your upcoming stay at ${booking.hotelBooked}?`,
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Countdown timer calculation
  const [timeLeft, setTimeLeft] = useState({ days: 12, hours: 8, mins: 45, secs: 20 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        return { ...prev, secs: 59, mins: (prev.mins + 59) % 60 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Toggle activity completed state
  const handleToggleActivity = (dayIndex: number, actId: string) => {
    const updated = [...itineraryDays];
    const schedule = updated[dayIndex].schedule;
    const item = schedule.find((s) => s.id === actId);
    if (item) {
      item.completed = !item.completed;
      setItineraryDays(updated);
    }
  };

  // Add custom activity to current active day
  const handleAddCustomActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActivityTitle) return;

    const newSlot: ItineraryActivity = {
      id: `custom-act-${Date.now()}`,
      time: newActivityTime,
      activity: newActivityTitle,
      location: newActivityLoc || booking.city,
      description: newActivityDesc || 'Custom guest activity added to real-time itinerary.',
      category: 'Sightseeing',
      completed: false,
    };

    const updated = [...itineraryDays];
    updated[activeDayIdx].schedule.push(newSlot);
    setItineraryDays(updated);

    // Reset Form
    setNewActivityTitle('');
    setNewActivityLoc('');
    setNewActivityDesc('');
    setShowAddActivityModal(false);
  };

  // Send message to AI Concierge endpoint
  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isSending) return;

    const userText = chatInput;
    setChatInput('');
    setChatMessages((prev) => [...prev, { sender: 'user', content: userText }]);
    setIsSending(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...chatMessages, { sender: 'user', content: userText }],
          currentDestination: booking.city,
          bookingDetails: {
            hotel: booking.hotelBooked,
            package: booking.packageTitle,
            guests: booking.guestsCount,
          },
        }),
      });

      const data = await response.json();
      const reply = data.reply || 'Your butler is attending to your request. Have a wonderful stay!';

      setChatMessages((prev) => [...prev, { sender: 'concierge', content: reply }]);
    } catch (err) {
      console.error('Chat error:', err);
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'concierge',
          content: 'Apologies, our concierge connection is experiencing a brief pause. Please retry.',
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const currentDay = itineraryDays[activeDayIdx] || itineraryDays[0];

  return (
    <div className="fixed inset-0 z-[600] bg-[#F9F7F2] text-[#1A1A1A] overflow-y-auto">
      {/* Top Navbar */}
      <div className="sticky top-0 z-40 bg-[#F0EEE9]/90 backdrop-blur-md border-b border-[#DCD6C8] px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white border border-[#DCD6C8] hover:bg-[#1A1A1A] hover:text-[#F9F7F2] text-[#1A1A1A] flex items-center gap-1 text-xs font-bold transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Main Site
          </button>
          <div className="hidden sm:block h-5 w-px bg-[#DCD6C8]" />
          <div className="hidden sm:block">
            <span className="text-[10px] text-[#8C7A5B] font-mono font-bold">{booking.bookingCode}</span>
            <h1 className="font-serif-display text-base font-bold text-[#1A1A1A]">
              {booking.packageTitle}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowConciergeChat(true)}
            className="px-3.5 py-2 rounded-full bg-white border border-[#DCD6C8] text-[#1A1A1A] text-xs font-bold hover:bg-[#1A1A1A] hover:text-[#F9F7F2] transition-all flex items-center gap-2 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#8C7A5B]" />
            <span>AI Concierge</span>
          </button>

          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-full bg-white border border-[#DCD6C8] text-[#5A554C] hover:text-[#1A1A1A] text-xs font-semibold flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download Invoice</span>
          </button>
        </div>
      </div>

      {/* Main Dashboard Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Realtime Countdown Header Card */}
        <div className="relative rounded-3xl overflow-hidden bg-white border border-[#DCD6C8] p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                Live Real-Time Status: {booking.status}
              </div>
              <h2 className="font-serif-display text-3xl sm:text-4xl text-[#1A1A1A] font-bold">
                {booking.city} Royal Journey
              </h2>
              <p className="text-xs sm:text-sm text-[#5A554C]">
                Check-in: <strong className="text-[#1A1A1A]">{booking.startDate}</strong> at{' '}
                <strong className="text-[#8C7A5B]">{booking.hotelBooked}</strong>
              </p>
            </div>

            {/* Live Countdown Clock */}
            <div className="lg:col-span-5 bg-[#F0EEE9] p-4 rounded-2xl border border-[#DCD6C8] text-center">
              <span className="text-[10px] uppercase font-bold text-[#8C7A5B] tracking-widest block mb-2">
                Countdown to Arrival
              </span>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-2 rounded-xl bg-white border border-[#DCD6C8]">
                  <span className="text-xl sm:text-2xl font-bold text-[#1A1A1A]">{timeLeft.days}</span>
                  <span className="text-[9px] uppercase text-[#7A756C] block">Days</span>
                </div>
                <div className="p-2 rounded-xl bg-white border border-[#DCD6C8]">
                  <span className="text-xl sm:text-2xl font-bold text-[#1A1A1A]">{timeLeft.hours}</span>
                  <span className="text-[9px] uppercase text-[#7A756C] block">Hours</span>
                </div>
                <div className="p-2 rounded-xl bg-white border border-[#DCD6C8]">
                  <span className="text-xl sm:text-2xl font-bold text-[#1A1A1A]">{timeLeft.mins}</span>
                  <span className="text-[9px] uppercase text-[#7A756C] block">Mins</span>
                </div>
                <div className="p-2 rounded-xl bg-white border border-[#DCD6C8]">
                  <span className="text-xl sm:text-2xl font-bold text-[#1A1A1A]">{timeLeft.secs}</span>
                  <span className="text-[9px] uppercase text-[#7A756C] block">Secs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chauffeur & Weather Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Driver Info Card */}
          <div className="p-5 rounded-2xl bg-white border border-[#DCD6C8] space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#8C7A5B] uppercase tracking-wider flex items-center gap-1.5">
                <Car className="w-4 h-4" /> Assigned Chauffeur
              </span>
              <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                On Duty
              </span>
            </div>
            <div>
              <h4 className="text-base font-bold text-[#1A1A1A]">{booking.driverName}</h4>
              <p className="text-xs text-[#5A554C]">{booking.vehicleModel}</p>
            </div>
            <div className="pt-2 border-t border-[#DCD6C8] flex items-center justify-between text-xs">
              <span className="text-[#7A756C]">{booking.driverContact}</span>
              <a
                href={`tel:${booking.driverContact}`}
                className="px-3 py-1 rounded-lg bg-[#1A1A1A] text-[#F9F7F2] font-bold text-[11px] flex items-center gap-1 hover:bg-[#333333]"
              >
                <Phone className="w-3 h-3" /> Call Chauffeur
              </a>
            </div>
          </div>

          {/* Weather Widget Card */}
          <div className="p-5 rounded-2xl bg-white border border-[#DCD6C8] space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#8C7A5B] uppercase tracking-wider flex items-center gap-1.5">
                <CloudSun className="w-4 h-4" /> Destination Weather
              </span>
              <span className="text-xs text-[#5A554C]">{booking.city}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-[#1A1A1A]">
                {booking.city === 'Hyderabad' ? '29°C' : booking.city === 'Delhi' ? '28°C' : '31°C'}
              </span>
              <div>
                <p className="text-xs font-semibold text-[#1A1A1A]">
                  {booking.city === 'Hyderabad' ? 'Sunny & Clear Skies' : booking.city === 'Delhi' ? 'Pleasant Mild Breeze' : 'Coastal Sunset Breeze'}
                </p>
                <p className="text-[11px] text-[#7A756C]">Ideal for outdoor heritage walks</p>
              </div>
            </div>
          </div>

          {/* Hotel Escort Card */}
          <div className="p-5 rounded-2xl bg-white border border-[#DCD6C8] space-y-3 shadow-sm md:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#8C7A5B] uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Butler Concierge
              </span>
              <span className="text-[10px] text-[#8C7A5B] font-bold bg-[#F0EEE9] px-2 py-0.5 rounded border border-[#DCD6C8]">
                24/7 Available
              </span>
            </div>
            <div>
              <h4 className="text-base font-bold text-[#1A1A1A]">{booking.hotelBooked}</h4>
              <p className="text-xs text-[#5A554C]">Royal Suite VIP Check-in Escort</p>
            </div>
          </div>
        </div>

        {/* Day-by-Day Timeline Manager */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#DCD6C8] space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-[#DCD6C8] pb-4">
            <div>
              <span className="text-xs font-bold text-[#8C7A5B] uppercase tracking-widest">
                Interactive Itinerary
              </span>
              <h3 className="font-serif-display text-2xl text-[#1A1A1A] font-bold">
                Day-by-Day Schedule & Custom Activities
              </h3>
            </div>

            <button
              onClick={() => setShowAddActivityModal(true)}
              className="px-4 py-2.5 rounded-xl bg-[#1A1A1A] text-[#F9F7F2] font-bold text-xs hover:bg-[#333333] transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add Custom Activity
            </button>
          </div>

          {/* Day Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {itineraryDays.map((day, idx) => (
              <button
                key={day.dayNumber}
                onClick={() => setActiveDayIdx(idx)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap border ${
                  activeDayIdx === idx
                    ? 'bg-[#1A1A1A] text-[#F9F7F2] border-[#1A1A1A]'
                    : 'bg-[#F0EEE9] text-[#5A554C] border-[#DCD6C8] hover:text-[#1A1A1A]'
                }`}
              >
                Day 0{day.dayNumber}: {day.theme}
              </button>
            ))}
          </div>

          {/* Schedule List for Active Day */}
          {currentDay && (
            <div className="space-y-4 pt-2">
              <h4 className="text-sm font-bold text-[#8C7A5B] uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Schedule for Day 0{currentDay.dayNumber}
              </h4>

              <div className="space-y-3">
                {currentDay.schedule.map((slot) => (
                  <div
                    key={slot.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      slot.completed
                        ? 'bg-[#F0EEE9]/60 border-emerald-300 opacity-75'
                        : 'bg-[#F0EEE9] border-[#DCD6C8] hover:border-[#1A1A1A]'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#8C7A5B] font-mono flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {slot.time}
                        </span>
                        <span className="text-[10px] text-[#5A554C] bg-white px-2 py-0.5 rounded border border-[#DCD6C8]">
                          {slot.category}
                        </span>
                      </div>
                      <h5
                        className={`text-base font-bold ${
                          slot.completed ? 'line-through text-[#7A756C]' : 'text-[#1A1A1A]'
                        }`}
                      >
                        {slot.activity}
                      </h5>
                      <p className="text-xs text-[#5A554C] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#8C7A5B]" /> {slot.location} • {slot.description}
                      </p>
                    </div>

                    <button
                      onClick={() => handleToggleActivity(activeDayIdx, slot.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 self-start sm:self-center ${
                        slot.completed
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-white text-[#5A554C] hover:text-[#1A1A1A] border border-[#DCD6C8]'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      {slot.completed ? 'Completed' : 'Mark Done'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Custom Activity Modal */}
      {showAddActivityModal && (
        <div className="fixed inset-0 z-[700] flex items-center justify-center p-4 bg-[#1A1A1A]/60 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-white border border-[#DCD6C8] rounded-3xl p-6 shadow-2xl text-[#1A1A1A]">
            <button
              onClick={() => setShowAddActivityModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#F0EEE9] text-[#5A554C] hover:text-[#1A1A1A]"
            >
              ✕
            </button>

            <h3 className="font-serif-display text-xl text-[#1A1A1A] font-bold mb-4">
              Add Custom Activity to Day 0{currentDay.dayNumber}
            </h3>

            <form onSubmit={handleAddCustomActivity} className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] uppercase font-bold text-[#7A756C]">Time</label>
                <input
                  type="text"
                  value={newActivityTime}
                  onChange={(e) => setNewActivityTime(e.target.value)}
                  className="w-full bg-[#F0EEE9] border border-[#DCD6C8] rounded-xl px-3 py-2 text-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-[#7A756C]">Activity Name</label>
                <input
                  type="text"
                  placeholder="e.g. Private High Tea at Taj Falaknuma"
                  value={newActivityTitle}
                  onChange={(e) => setNewActivityTitle(e.target.value)}
                  className="w-full bg-[#F0EEE9] border border-[#DCD6C8] rounded-xl px-3 py-2 text-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-[#7A756C]">Location</label>
                <input
                  type="text"
                  placeholder="e.g. Falaknuma Palace Terrace"
                  value={newActivityLoc}
                  onChange={(e) => setNewActivityLoc(e.target.value)}
                  className="w-full bg-[#F0EEE9] border border-[#DCD6C8] rounded-xl px-3 py-2 text-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-[#7A756C]">Notes / Description</label>
                <textarea
                  rows={2}
                  placeholder="Additional requests or notes for chauffeur..."
                  value={newActivityDesc}
                  onChange={(e) => setNewActivityDesc(e.target.value)}
                  className="w-full bg-[#F0EEE9] border border-[#DCD6C8] rounded-xl px-3 py-2 text-[#1A1A1A]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#1A1A1A] text-[#F9F7F2] hover:bg-[#333333] font-bold uppercase tracking-wider text-xs shadow-sm"
              >
                Add Activity Slot
              </button>
            </form>
          </div>
        </div>
      )}

      {/* AI Concierge Drawer / Chat Modal */}
      {showConciergeChat && (
        <div className="fixed inset-y-0 right-0 z-[700] w-full max-w-md bg-white border-l border-[#DCD6C8] p-6 flex flex-col shadow-2xl animate-slideLeft text-[#1A1A1A]">
          {/* Header */}
          <div className="flex justify-between items-center pb-4 border-b border-[#DCD6C8]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#8C7A5B]" />
              <div>
                <h3 className="font-serif-display text-lg text-[#1A1A1A] font-bold">
                  JOURNEYVERS AI Butler
                </h3>
                <span className="text-[10px] text-emerald-700">Online • Powered by Gemini</span>
              </div>
            </div>
            <button
              onClick={() => setShowConciergeChat(false)}
              className="p-1.5 rounded-full bg-[#F0EEE9] text-[#5A554C] hover:text-[#1A1A1A]"
            >
              ✕
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#1A1A1A] text-[#F9F7F2] font-medium rounded-tr-none'
                      : 'bg-[#F0EEE9] border border-[#DCD6C8] text-[#1A1A1A] rounded-tl-none'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendChatMessage} className="pt-3 border-t border-[#DCD6C8] flex gap-2">
            <input
              type="text"
              placeholder="Ask concierge e.g. Dress code, high tea timings..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 bg-[#F0EEE9] border border-[#DCD6C8] rounded-xl px-3 py-2.5 text-xs text-[#1A1A1A] focus:outline-none"
            />
            <button
              type="submit"
              disabled={isSending}
              className="p-2.5 rounded-xl bg-[#1A1A1A] text-[#F9F7F2] font-bold hover:bg-[#333333]"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
