import React from 'react';
import { SEO } from '../components/SEO';
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="pt-28 sm:pt-32 lg:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      <SEO
        title="Privacy Policy | Journeyvers"
        description="Read the official Privacy Policy of Journeyvers. Learn how we handle, store, and protect your personal travel data."
        keywords="Journeyvers Privacy Policy, Data Protection Travel, Privacy Standards Journeyvers"
      />

      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8C7A5B]/10 border border-[#8C7A5B]/20 text-[#8C7A5B] text-xs font-bold uppercase tracking-widest">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Legal & Data Security</span>
        </div>
        <h1 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-[#5A554C] leading-relaxed">
          Effective Date: August 3, 2026 | Journeyvers Travel
        </p>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-3xl border border-[#DCD6C8] p-6 sm:p-10 space-y-8 shadow-sm text-[#1A1A1A]">
        <div className="space-y-3">
          <h2 className="font-serif-display text-xl font-bold text-[#1A1A1A] flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#8C7A5B]" />
            1. Commitment to Privacy
          </h2>
          <p className="text-xs sm:text-sm text-[#5A554C] leading-relaxed">
            At <strong>Journeyvers</strong>, we take your privacy and data security seriously. This Privacy Policy outlines how we collect, use, store, and safeguard your personal information when you access our travel portal, use our custom itinerary builders, or book tours across Hyderabad, Delhi, and Mumbai.
          </p>
        </div>

        <div className="border-t border-[#F0EEE9] pt-6 space-y-3">
          <h2 className="font-serif-display text-xl font-bold text-[#1A1A1A] flex items-center gap-2">
            <Eye className="w-5 h-5 text-[#8C7A5B]" />
            2. Information We Collect
          </h2>
          <p className="text-xs sm:text-sm text-[#5A554C] leading-relaxed">
            To provide white-glove concierge and customized travel experiences, we collect necessary information including:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-[#5A554C] pl-4">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#8C7A5B] flex-shrink-0 mt-0.5" />
              <span><strong>Account & Contact Info:</strong> Name, email address, phone number, and passport/government ID details when booking hotel or flight services.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#8C7A5B] flex-shrink-0 mt-0.5" />
              <span><strong>Travel Preferences:</strong> Selected destinations, dietary preferences, hotel star ratings, and customized itinerary parameters.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#8C7A5B] flex-shrink-0 mt-0.5" />
              <span><strong>Transaction Records:</strong> Booking references, payment confirmation receipts, and transaction timestamps. Financial processing is handled via encrypted PCI-DSS compliant gateways.</span>
            </li>
          </ul>
        </div>

        <div className="border-t border-[#F0EEE9] pt-6 space-y-3">
          <h2 className="font-serif-display text-xl font-bold text-[#1A1A1A] flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#8C7A5B]" />
            3. How We Use Your Information
          </h2>
          <p className="text-xs sm:text-sm text-[#5A554C] leading-relaxed">
            Your data is strictly utilized for operational excellence:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-[#5A554C] pl-4">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8C7A5B] flex-shrink-0 mt-2" />
              <span>Fulfilling hotel reservations, private luxury transport arrangements, and guided tours.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8C7A5B] flex-shrink-0 mt-2" />
              <span>Sending real-time updates via WhatsApp or email regarding your trip status, driver contact info, and local weather.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8C7A5B] flex-shrink-0 mt-2" />
              <span>Enhancing our AI itinerary customization tools to serve tailor-made recommendations.</span>
            </li>
          </ul>
        </div>

        <div className="border-t border-[#F0EEE9] pt-6 space-y-3">
          <h2 className="font-serif-display text-xl font-bold text-[#1A1A1A]">
            4. Data Sharing & Third Parties
          </h2>
          <p className="text-xs sm:text-sm text-[#5A554C] leading-relaxed">
            We <strong>never sell or rent</strong> your personal data to third-party marketers. We only share necessary booking details with verified hospitality partners (hotels, licensed transport contractors, tour guides) exclusively for executing your booked itinerary.
          </p>
        </div>

        <div className="border-t border-[#F0EEE9] pt-6 space-y-3">
          <h2 className="font-serif-display text-xl font-bold text-[#1A1A1A]">
            5. Data Protection & Rights
          </h2>
          <p className="text-xs sm:text-sm text-[#5A554C] leading-relaxed">
            All user data is stored securely using cloud encryption standards. You have the right to request access to, correction of, or deletion of your personal records at any time by reaching out to our privacy compliance desk at <strong>journeyvers.com@gmail.com</strong>.
          </p>
        </div>

        {/* Action / Contact Banner */}
        <div className="bg-[#F9F7F2] border border-[#DCD6C8] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-sm text-[#1A1A1A]">Questions about our Privacy Policy?</h3>
            <p className="text-xs text-[#5A554C]">Our 24/7 concierge line and legal team at Journeyvers are happy to assist.</p>
          </div>
          <Link
            to="/contact"
            className="px-5 py-2.5 rounded-full bg-[#1A1A1A] hover:bg-[#333333] text-white text-xs font-bold uppercase tracking-wider transition-colors flex-shrink-0"
          >
            Contact Legal Desk
          </Link>
        </div>
      </div>
    </div>
  );
};
