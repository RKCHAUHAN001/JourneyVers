import React, { useState } from 'react';
import { SEO } from '../components/SEO';
import { PhoneCall, Mail, MapPin, MessageCircle, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: 'Hyderabad',
    travelers: '2',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-28 sm:pt-32 lg:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <SEO
        title="Contact & Royal Concierge | Tour with Journeyvers"
        description="Get in touch with Journeyvers. 24/7 Royal Line support, WhatsApp chat (+91 72910 10487), and custom travel inquiry forms."
        keywords="Journeyvers, Travel, Tour with Journeyvers, Contact Journeyvers, Journeyvers Customer Care"
      />

      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8C7A5B]/10 border border-[#8C7A5B]/20 text-[#8C7A5B] text-xs font-bold uppercase tracking-widest">
          <PhoneCall className="w-3.5 h-3.5" />
          <span>24/7 White-Glove Support</span>
        </div>
        <h1 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#1A1A1A]">
          Contact <span className="text-[#8C7A5B]">Journeyvers</span> Concierge
        </h1>
        <p className="text-xs sm:text-sm text-[#5A554C] leading-relaxed">
          Our travel concierges are at your service 24 hours a day to assist with custom itineraries, private bookings, and instant support.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-[#DCD6C8] p-6 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#8C7A5B]/10 flex items-center justify-center text-[#8C7A5B]">
              <PhoneCall className="w-5 h-5" />
            </div>
            <h3 className="font-serif-display font-bold text-base text-[#1A1A1A]">24/7 Customer Care Line</h3>
            <p className="text-xs text-[#5A554C]">+91 72910 10487</p>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
              Available 24/7/365
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-[#DCD6C8] p-6 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#075E54]/10 flex items-center justify-center text-[#075E54]">
              <MessageCircle className="w-5 h-5 text-[#075E54]" />
            </div>
            <h3 className="font-serif-display font-bold text-base text-[#1A1A1A]">WhatsApp Travel Support</h3>
            <p className="text-xs text-[#5A554C]">+91 72910 10487</p>
            <a
              href="https://wa.me/917291010487"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#075E54] hover:underline inline-block"
            >
              Start Instant WhatsApp Chat &rarr;
            </a>
          </div>

          <div className="bg-white rounded-2xl border border-[#DCD6C8] p-6 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#8C7A5B]/10 flex items-center justify-center text-[#8C7A5B]">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-serif-display font-bold text-base text-[#1A1A1A]">Email Support</h3>
            <p className="text-xs text-[#5A554C]">journeyvers.com@gmail.com</p>
            <p className="text-[10px] text-[#7A756C]">Response time within 15 minutes</p>
          </div>

          <div className="bg-white rounded-2xl border border-[#DCD6C8] p-6 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#8C7A5B]/10 flex items-center justify-center text-[#8C7A5B]">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-serif-display font-bold text-base text-[#1A1A1A]">Corporate Headquarters</h3>
            <p className="text-xs text-[#5A554C]">
              Journeyvers Headquarters, Imperial Tower, Janpath, Connaught Place, New Delhi 110001
            </p>
          </div>
        </div>

        {/* Form Container */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-[#DCD6C8] p-8 shadow-sm space-y-6">
          <h2 className="font-serif-display text-2xl font-bold text-[#1A1A1A]">
            Send an Online Inquiry
          </h2>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif-display text-xl font-bold text-emerald-900">Inquiry Received!</h3>
              <p className="text-xs text-emerald-800 max-w-md mx-auto">
                Thank you for contacting Journeyvers. A senior travel butler will get back to you via email/phone shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2 rounded-full bg-[#1A1A1A] text-white text-xs font-bold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DCD6C8] text-xs focus:outline-none focus:border-[#8C7A5B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. ananya@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DCD6C8] text-xs focus:outline-none focus:border-[#8C7A5B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DCD6C8] text-xs focus:outline-none focus:border-[#8C7A5B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] mb-1">Target Destination</label>
                  <select
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DCD6C8] text-xs focus:outline-none focus:border-[#8C7A5B]"
                  >
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Mumbai">Mumbai</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] mb-1">Travelers Count</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.travelers}
                    onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DCD6C8] text-xs focus:outline-none focus:border-[#8C7A5B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1">Travel Details / Custom Notes</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us about your preferred travel dates, budget, or hotel preferences..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DCD6C8] text-xs focus:outline-none focus:border-[#8C7A5B]"
                />
              </div>

              <button
                type="submit"
                className="px-8 py-3.5 rounded-full bg-[#1A1A1A] hover:bg-[#333333] text-[#F9F7F2] text-xs font-bold uppercase tracking-widest transition-all shadow-md flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Custom Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
