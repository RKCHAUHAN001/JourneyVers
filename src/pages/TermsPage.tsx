import React from 'react';
import { SEO } from '../components/SEO';
import { FileText, ShieldAlert, CheckCircle2, HelpCircle, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TermsPage: React.FC = () => {
  return (
    <div className="pt-28 sm:pt-32 lg:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      <SEO
        title="Terms and Conditions | Journeyvers"
        description="Read the official Terms and Conditions for booking tours, custom itineraries, and luxury packages with Journeyvers."
        keywords="Journeyvers Terms and Conditions, Booking Policy, Travel Terms India, Journeyvers Guidelines"
      />

      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8C7A5B]/10 border border-[#8C7A5B]/20 text-[#8C7A5B] text-xs font-bold uppercase tracking-widest">
          <Scale className="w-3.5 h-3.5" />
          <span>User Agreement & Booking Terms</span>
        </div>
        <h1 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
          Terms and Conditions
        </h1>
        <p className="text-xs sm:text-sm text-[#5A554C] leading-relaxed">
          Last Updated: August 3, 2026 | Journeyvers
        </p>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-3xl border border-[#DCD6C8] p-6 sm:p-10 space-y-8 shadow-sm text-[#1A1A1A]">
        <div className="space-y-3">
          <h2 className="font-serif-display text-xl font-bold text-[#1A1A1A] flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#8C7A5B]" />
            1. Overview & Agreement
          </h2>
          <p className="text-xs sm:text-sm text-[#5A554C] leading-relaxed">
            Welcome to <strong>Journeyvers</strong>. By accessing our platform, utilizing our custom itinerary builder, or reserving any travel package, you agree to comply with and be bound by these Terms and Conditions.
          </p>
        </div>

        <div className="border-t border-[#F0EEE9] pt-6 space-y-3">
          <h2 className="font-serif-display text-xl font-bold text-[#1A1A1A] flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#8C7A5B]" />
            2. Booking & Payment Policy
          </h2>
          <p className="text-xs sm:text-sm text-[#5A554C] leading-relaxed">
            To confirm a reservation across our Hyderabad, Delhi, or Mumbai packages:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-[#5A554C] pl-4">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8C7A5B] flex-shrink-0 mt-2" />
              <span>Full or deposit payments as specified at checkout must be received before voucher generation.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8C7A5B] flex-shrink-0 mt-2" />
              <span>Prices listed are in Indian Rupees (INR) and include applicable taxes and service fees unless explicitly stated otherwise.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8C7A5B] flex-shrink-0 mt-2" />
              <span>Special requests (e.g., specific room views or late check-outs) are subject to availability at hotel check-in.</span>
            </li>
          </ul>
        </div>

        <div className="border-t border-[#F0EEE9] pt-6 space-y-3">
          <h2 className="font-serif-display text-xl font-bold text-[#1A1A1A] flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#8C7A5B]" />
            3. Cancellation & Refund Policy
          </h2>
          <p className="text-xs sm:text-sm text-[#5A554C] leading-relaxed">
            We offer transparent cancellation terms:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-[#5A554C] pl-4">
            <li className="flex items-start gap-2">
              <strong className="text-[#1A1A1A]">More than 7 days before travel:</strong> 100% refund or free reschedule credit.
            </li>
            <li className="flex items-start gap-2">
              <strong className="text-[#1A1A1A]">3 to 7 days before travel:</strong> 50% refund, or 80% reschedule credit.
            </li>
            <li className="flex items-start gap-2">
              <strong className="text-[#1A1A1A]">Less than 72 hours before travel:</strong> Non-refundable due to pre-committed private vehicle and hotel block bookings.
            </li>
          </ul>
        </div>

        <div className="border-t border-[#F0EEE9] pt-6 space-y-3">
          <h2 className="font-serif-display text-xl font-bold text-[#1A1A1A]">
            4. Traveler Responsibilities
          </h2>
          <p className="text-xs sm:text-sm text-[#5A554C] leading-relaxed">
            Travelers are responsible for carrying valid government-issued photo identification (Aadhaar, Passport, or Voter ID) during all tours. Travelers must adhere to local monument rules, cultural guidelines, and private transport etiquette.
          </p>
        </div>

        <div className="border-t border-[#F0EEE9] pt-6 space-y-3">
          <h2 className="font-serif-display text-xl font-bold text-[#1A1A1A]">
            5. Liability & Force Majeure
          </h2>
          <p className="text-xs sm:text-sm text-[#5A554C] leading-relaxed">
            Journeyvers acts with utmost care in selecting travel vendors. However, Journeyvers shall not be held liable for delays or cancellations arising from acts of God, extreme weather conditions, traffic road closures, or government restrictions beyond our reasonable control.
          </p>
        </div>

        {/* Action / Contact Banner */}
        <div className="bg-[#F9F7F2] border border-[#DCD6C8] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-[#8C7A5B]" />
            <div>
              <h3 className="font-bold text-sm text-[#1A1A1A]">Need clarification on terms?</h3>
              <p className="text-xs text-[#5A554C]">Our concierge team is available 24/7 via WhatsApp and phone support.</p>
            </div>
          </div>
          <Link
            to="/contact"
            className="px-5 py-2.5 rounded-full bg-[#1A1A1A] hover:bg-[#333333] text-white text-xs font-bold uppercase tracking-wider transition-colors flex-shrink-0"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};
