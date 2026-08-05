import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { Package } from '../types';

interface WhatsAppChatProps {
  phoneNumber?: string; // e.g. "917291010487"
  selectedPackage?: Package | null;
}

export const WhatsAppChat: React.FC<WhatsAppChatProps> = ({
  phoneNumber = '917291010487',
  selectedPackage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const defaultPhone = phoneNumber;

  const handleStartChat = (messageText?: string) => {
    const textToUse = messageText || customMsg || 'Hi! I want to know more about your budget tour packages and discuss custom pricing.';
    const encodedText = encodeURIComponent(textToUse);
    const whatsappUrl = `https://wa.me/${defaultPhone}?text=${encodedText}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const quickQuestions = [
    'Hi! I want to know more about your budget tour packages.',
    'Hi! Can you customize a tour package according to my budget?',
    'Hi! I need help with group booking and discounts.',
    'Hi! What inclusions are covered in your Hyderabad and Delhi tours?'
  ];

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-[500] flex flex-col items-end gap-2">
        {/* Tooltip / Badge */}
        {!isOpen && (
          <div className="bg-[#1A1A1A] text-[#F9F7F2] text-[11px] font-semibold py-1.5 px-3 rounded-full shadow-lg border border-[#333] flex items-center gap-1.5 animate-bounce">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Chat with us on WhatsApp!</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xl flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 group relative"
          aria-label="Chat on WhatsApp"
          title="Chat on WhatsApp"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <div className="relative">
              <MessageCircle className="w-7 h-7 fill-current stroke-none" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
            </div>
          )}
        </button>
      </div>

      {/* WhatsApp Chat Popover Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[500] w-[340px] sm:w-[380px] bg-white rounded-2xl shadow-2xl border border-[#DCD6C8] overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-[#075E54] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg border border-white/30">
                <MessageCircle className="w-6 h-6 fill-current" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">JOURNEYVERS Tour Support</h4>
                <p className="text-[10px] text-emerald-100 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Online • Responds in minutes
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Messages */}
          <div className="p-4 bg-[#E5DDD5] min-h-[220px] max-h-[320px] overflow-y-auto space-y-3 font-sans-body">
            {/* System Welcome Message */}
            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] border border-[#E0D8CB] text-xs text-[#1A1A1A]">
              <p className="font-bold text-[#075E54] text-[11px] mb-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#8C7A5B]" /> JOURNEYVERS Travel Desk
              </p>
              <p className="leading-relaxed">
                Hello! 👋 Planning a budget trip or have questions about our tour packages?
              </p>
              <p className="mt-1.5 text-[11px] text-[#5A554C]">
                Chat directly with our travel experts to discuss your itinerary and get exclusive discount offers!
              </p>
              <span className="text-[9px] text-gray-400 block text-right mt-1">Just now</span>
            </div>

            {selectedPackage && (
              <div className="bg-[#DCF8C6] p-3 rounded-2xl rounded-tr-none shadow-sm ml-auto max-w-[88%] border border-[#C6E6AF] text-xs text-[#1A1A1A]">
                <p className="text-[10px] font-bold text-[#075E54]">Inquiring about:</p>
                <p className="font-semibold">{selectedPackage.title}</p>
                <p className="text-[11px] text-emerald-800 mt-0.5">Price: ₹{selectedPackage.priceINR.toLocaleString('en-IN')}</p>
              </div>
            )}

            {/* Quick Suggestions */}
            <div className="pt-2">
              <p className="text-[10px] uppercase tracking-wider font-bold text-[#5A554C] mb-2">
                Quick Questions:
              </p>
              <div className="space-y-1.5">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleStartChat(q)}
                    className="w-full text-left p-2 rounded-xl bg-white hover:bg-[#DCF8C6] border border-[#DCD6C8] text-[11px] text-[#1A1A1A] transition-colors flex items-center justify-between group shadow-2xs"
                  >
                    <span>{q}</span>
                    <Send className="w-3 h-3 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-[#DCD6C8]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleStartChat();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Type your message or budget..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#DCD6C8] bg-[#F9F7F2] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#075E54]"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            <div className="mt-2 text-center">
              <span className="text-[10px] text-[#7A756C] flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Instant Direct WhatsApp Connection
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
