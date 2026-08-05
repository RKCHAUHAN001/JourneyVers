import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Package, Booking } from '../types';
import { getActiveSession } from '../lib/auth';
import { ShieldCheck, Lock, CreditCard, QrCode, Building, CheckCircle2, Loader2, Sparkles, Download, ArrowRight } from 'lucide-react';

interface CheckoutModalProps {
  pkg: Package;
  onClose: () => void;
  onPaymentSuccess: (newBooking: Booking) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  pkg,
  onClose,
  onPaymentSuccess,
}) => {
  const activeUser = getActiveSession();
  const [step, setStep] = useState<'details' | 'payment' | 'otp' | 'success'>('details');
  
  // Form State
  const [guestName, setGuestName] = useState(activeUser?.name || '');
  const [email, setEmail] = useState(activeUser?.email || '');
  const [phone, setPhone] = useState(activeUser?.phone || '');
  const [travelDate, setTravelDate] = useState(() => {
    const tomorrow = new Date(Date.now() + 86400000);
    return tomorrow.toISOString().split('T')[0];
  });
  const [guestsCount, setGuestsCount] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('');

  // Upgrades
  const [addYacht, setAddYacht] = useState(false);
  const [addButler, setAddButler] = useState(true);

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState<'CARD' | 'UPI' | 'NETBANKING' | 'WIRE'>('CARD');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [otpCode, setOtpCode] = useState('');

  // Processing & Confirmation State
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Price Calculation
  const basePrice = pkg.priceINR;
  const coachPrice = addYacht ? 800 : 0;
  const guidePrice = addButler ? 500 : 0;
  const subtotal = basePrice + coachPrice + guidePrice;
  const taxGst = Math.round(subtotal * 0.05); // 5% GST tax
  const grandTotal = subtotal + taxGst;

  const handleAuthorizePayment = async () => {
    setIsProcessing(true);

    try {
      const response = await fetch('/api/payment/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: grandTotal,
          currency: 'INR',
          paymentMethod,
          packageId: pkg.id,
          customerName: guestName,
          email,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Trigger celebratory confetti burst
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#d4af37', '#c5a059', '#ffffff', '#e5c158'],
        });

        const newBooking: Booking = {
          id: `bk-${Date.now()}`,
          bookingCode: data.confirmationCode || 'JRN-998812',
          packageId: pkg.id,
          packageTitle: pkg.title,
          city: pkg.city,
          startDate: travelDate,
          endDate: new Date(new Date(travelDate).getTime() + pkg.durationDays * 86400000)
            .toISOString()
            .split('T')[0],
          guestsCount,
          status: 'CONFIRMED',
          totalPaidINR: grandTotal,
          paymentMethod: paymentMethod === 'CARD' ? 'HDFC Infinia Visa' : paymentMethod === 'UPI' ? 'BHIM UPI' : 'Bank Wire',
          paymentDate: new Date().toISOString().split('T')[0],
          transactionId: data.transactionId || 'LXV-0012399',
          hotelBooked: pkg.hotelName,
          driverName: pkg.city === 'Hyderabad' ? 'Sultan Mohammed' : pkg.city === 'Delhi' ? 'Ramesh Singh' : 'Zamir Shaikh',
          driverContact: '+91 98112 33445',
          vehicleModel: pkg.city === 'Hyderabad' ? 'Toyota Innova Crysta AC' : pkg.city === 'Delhi' ? 'Maruti Suzuki Ertiga AC' : 'AC Comfort Coach',
          specialRequests,
          itineraryDays: pkg.dayByDayItinerary,
        };

        setConfirmedBooking(newBooking);
        setStep('success');
      }
    } catch (err) {
      console.error('Payment error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePrintETicket = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[700] flex items-center justify-center p-4 bg-[#1A1A1A]/60 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-[#DCD6C8] rounded-3xl p-6 sm:p-8 shadow-2xl my-8 text-[#1A1A1A]">
        {/* Header Bar */}
        <div className="flex justify-between items-center pb-4 border-b border-[#DCD6C8]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#8C7A5B]" />
            <h2 className="font-serif-display text-xl text-[#1A1A1A] font-bold">
              Secure JOURNEYVERS Payment Gate
            </h2>
          </div>
          {step !== 'success' && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-[#F0EEE9] text-[#5A554C] hover:text-[#1A1A1A]"
            >
              ✕
            </button>
          )}
        </div>

        {/* STEP 1: GUEST DETAILS & LUXURY UPGRADES */}
        {step === 'details' && (
          <div className="space-y-6 mt-6 animate-fadeIn">
            <div>
              <span className="text-[10px] text-[#8C7A5B] font-bold uppercase tracking-wider">
                Step 1 of 3 • Booking Overview
              </span>
              <h3 className="font-serif-display text-2xl text-[#1A1A1A] font-semibold mt-0.5">
                {pkg.title}
              </h3>
              <p className="text-xs text-[#5A554C]">
                {pkg.city} • {pkg.durationDays} Days • {pkg.hotelName}
              </p>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-[#7A756C]">Guest Name</label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-[#F0EEE9] border border-[#DCD6C8] rounded-xl px-3 py-2.5 text-[#1A1A1A]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-[#7A756C]">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F0EEE9] border border-[#DCD6C8] rounded-xl px-3 py-2.5 text-[#1A1A1A]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-[#7A756C]">Check-In Start Date</label>
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full bg-[#F0EEE9] border border-[#DCD6C8] rounded-xl px-3 py-2.5 text-[#1A1A1A]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-[#7A756C]">Guests Count</label>
                <select
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(parseInt(e.target.value))}
                  className="w-full bg-[#F0EEE9] border border-[#DCD6C8] rounded-xl px-3 py-2.5 text-[#1A1A1A]"
                >
                  <option value={1}>1 Guest (Solo Royal Pass)</option>
                  <option value={2}>2 Guests (Royal Couple)</option>
                  <option value={4}>4 Guests (Family Suite)</option>
                </select>
              </div>
            </div>

            {/* Optional Travel Add-ons */}
            <div className="space-y-2 p-4 rounded-2xl bg-[#F0EEE9] border border-[#DCD6C8]">
              <span className="text-xs font-bold text-[#8C7A5B] uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Optional Tour Upgrades
              </span>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#DCD6C8] cursor-pointer text-xs shadow-sm">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={addYacht}
                    onChange={(e) => setAddYacht(e.target.checked)}
                    className="accent-[#1A1A1A]"
                  />
                  <span>AC Volvo / Express Bus Seat Upgrade</span>
                </div>
                <span className="text-[#8C7A5B] font-bold">+₹800</span>
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#DCD6C8] cursor-pointer text-xs shadow-sm">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={addButler}
                    onChange={(e) => setAddButler(e.target.checked)}
                    className="accent-[#1A1A1A]"
                  />
                  <span>Personal Tour Guide & Fast Monument Entry</span>
                </div>
                <span className="text-[#8C7A5B] font-bold">+₹500</span>
              </label>
            </div>

            {/* Price Breakdown Summary */}
            <div className="p-4 rounded-2xl bg-[#F0EEE9] border border-[#DCD6C8] text-xs space-y-2">
              <div className="flex justify-between text-[#5A554C]">
                <span>Base Package Rate ({pkg.durationDays} Days)</span>
                <span>₹{basePrice.toLocaleString('en-IN')}</span>
              </div>
              {addYacht && (
                <div className="flex justify-between text-[#5A554C]">
                  <span>AC Express Bus Upgrade</span>
                  <span>₹800</span>
                </div>
              )}
              {addButler && (
                <div className="flex justify-between text-[#5A554C]">
                  <span>Dedicated Heritage Guide</span>
                  <span>₹500</span>
                </div>
              )}
              <div className="flex justify-between text-[#5A554C]">
                <span>Government Travel GST (5%)</span>
                <span>₹{taxGst.toLocaleString('en-IN')}</span>
              </div>
              <div className="pt-2 border-t border-[#DCD6C8] flex justify-between text-sm font-bold text-[#1A1A1A]">
                <span>Grand Total Authorized</span>
                <span className="text-[#1A1A1A] text-lg">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <button
              onClick={() => setStep('payment')}
              className="w-full py-3.5 rounded-2xl bg-[#1A1A1A] hover:bg-[#333333] text-[#F9F7F2] font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <span>Proceed to Select Payment Method</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: PAYMENT METHOD */}
        {step === 'payment' && (
          <div className="space-y-6 mt-6 animate-fadeIn">
            <div>
              <span className="text-[10px] text-[#8C7A5B] font-bold uppercase tracking-wider">
                Step 2 of 3 • Select Payment Method
              </span>
              <h3 className="font-serif-display text-2xl text-[#1A1A1A] font-semibold mt-0.5">
                Total Payable: <span className="text-[#8C7A5B]">₹{grandTotal.toLocaleString('en-IN')}</span>
              </h3>
            </div>

            {/* Payment Method Selector Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('CARD')}
                className={`p-3 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'CARD'
                    ? 'bg-[#1A1A1A] text-[#F9F7F2] border-[#1A1A1A]'
                    : 'bg-[#F0EEE9] text-[#5A554C] border-[#DCD6C8]'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Credit/Debit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('UPI')}
                className={`p-3 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'UPI'
                    ? 'bg-[#1A1A1A] text-[#F9F7F2] border-[#1A1A1A]'
                    : 'bg-[#F0EEE9] text-[#5A554C] border-[#DCD6C8]'
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>Instant UPI QR</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('NETBANKING')}
                className={`p-3 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'NETBANKING'
                    ? 'bg-[#1A1A1A] text-[#F9F7F2] border-[#1A1A1A]'
                    : 'bg-[#F0EEE9] text-[#5A554C] border-[#DCD6C8]'
                }`}
              >
                <Building className="w-4 h-4" />
                <span>NetBanking</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('WIRE')}
                className={`p-3 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'WIRE'
                    ? 'bg-[#1A1A1A] text-[#F9F7F2] border-[#1A1A1A]'
                    : 'bg-[#F0EEE9] text-[#5A554C] border-[#DCD6C8]'
                }`}
              >
                <Lock className="w-4 h-4" />
                <span>Wire Transfer</span>
              </button>
            </div>

            {/* Payment Forms */}
            {paymentMethod === 'CARD' && (
              <div className="space-y-3 p-4 rounded-2xl bg-[#F0EEE9] border border-[#DCD6C8] text-xs">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-[#7A756C]">Cardholder Name</label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-white border border-[#DCD6C8] rounded-xl px-3 py-2 text-[#1A1A1A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-[#7A756C]">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-white border border-[#DCD6C8] rounded-xl px-3 py-2 text-[#1A1A1A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-[#7A756C]">Expiry</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full bg-white border border-[#DCD6C8] rounded-xl px-3 py-2 text-[#1A1A1A]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-[#7A756C]">CVV</label>
                    <input
                      type="password"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full bg-white border border-[#DCD6C8] rounded-xl px-3 py-2 text-[#1A1A1A]"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'UPI' && (
              <div className="p-6 rounded-2xl bg-[#F0EEE9] border border-[#DCD6C8] text-center space-y-4">
                <div className="w-36 h-36 bg-white p-2 rounded-2xl mx-auto shadow-sm flex items-center justify-center border border-[#DCD6C8]">
                  <QrCode className="w-28 h-28 text-[#1A1A1A]" />
                </div>
                <p className="text-xs text-[#5A554C]">Scan with GPay, PhonePe, or Paytm</p>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full max-w-xs bg-white border border-[#DCD6C8] rounded-xl px-3 py-2 text-center text-xs text-[#1A1A1A]"
                />
              </div>
            )}

            {(paymentMethod === 'NETBANKING' || paymentMethod === 'WIRE') && (
              <div className="p-4 rounded-2xl bg-[#F0EEE9] border border-[#DCD6C8] text-xs space-y-2">
                <p className="text-[#5A554C]">
                  Direct Royal Concierge Wire Account: <strong className="text-[#1A1A1A]">HDFC Bank Treasury Branch</strong>
                </p>
                <p className="text-[#5A554C]">
                  A/C Number: <strong className="text-[#1A1A1A]">50200018928371</strong> • IFSC: <strong className="text-[#1A1A1A]">HDFC0000001</strong>
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="py-3 px-4 rounded-xl border border-[#DCD6C8] text-xs font-bold text-[#1A1A1A] hover:bg-[#F0EEE9]"
              >
                Back
              </button>

              <button
                type="button"
                onClick={() => setStep('otp')}
                className="flex-1 py-3.5 rounded-2xl bg-[#1A1A1A] hover:bg-[#333333] text-[#F9F7F2] font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <span>Request Security Authorization OTP</span>
                <Lock className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: OTP VERIFICATION */}
        {step === 'otp' && (
          <div className="space-y-6 mt-6 animate-fadeIn text-center">
            <div className="w-12 h-12 rounded-full bg-[#F0EEE9] border border-[#DCD6C8] mx-auto flex items-center justify-center text-[#8C7A5B]">
              <Lock className="w-6 h-6" />
            </div>

            <div>
              <span className="text-[10px] text-[#8C7A5B] font-bold uppercase tracking-wider">
                Step 3 of 3 • 2-Factor Authentication
              </span>
              <h3 className="font-serif-display text-2xl text-[#1A1A1A] font-semibold mt-1">
                Enter 6-Digit Payment PIN
              </h3>
              <p className="text-xs text-[#5A554C] mt-1">
                A security SMS code was sent to {phone} for ₹{grandTotal.toLocaleString('en-IN')}.
              </p>
            </div>

            <div className="max-w-xs mx-auto">
              <input
                type="text"
                placeholder="7 8 9 1 2 3"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="w-full text-center tracking-[0.5em] text-xl font-bold bg-[#F0EEE9] border-2 border-[#1A1A1A] rounded-2xl py-3 text-[#1A1A1A] focus:outline-none"
              />
              <span className="text-[10px] text-[#7A756C] mt-2 block flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#8C7A5B]" />
                Secure 256-bit SSL Banking Verification Gateway
              </span>
            </div>

            <button
              onClick={handleAuthorizePayment}
              disabled={isProcessing}
              className="w-full py-4 rounded-2xl bg-[#1A1A1A] hover:bg-[#333333] text-[#F9F7F2] font-bold text-xs uppercase tracking-widest transition-all shadow-sm flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Encrypted Bank Authorization...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Authorize & Complete Booking (₹{grandTotal.toLocaleString('en-IN')})</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* STEP 4: SUCCESS CONFIRMATION & E-TICKET */}
        {step === 'success' && confirmedBooking && (
          <div className="space-y-6 mt-6 animate-fadeIn text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-600 text-emerald-700 mx-auto flex items-center justify-center shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold text-[10px] uppercase border border-emerald-200">
                Payment Authorized & Booking Confirmed
              </span>
              <h3 className="font-serif-display text-3xl text-[#1A1A1A] font-bold mt-2">
                Welcome to JOURNEYVERS Royal Voyage
              </h3>
              <p className="text-xs text-[#5A554C]">
                Your booking reference: <strong className="text-[#8C7A5B] font-mono text-sm">{confirmedBooking.bookingCode}</strong>
              </p>
            </div>

            {/* E-Ticket Invoice Card */}
            <div className="p-6 rounded-2xl bg-[#F0EEE9] border border-[#DCD6C8] text-left space-y-3 text-xs">
              <div className="flex justify-between items-center pb-3 border-b border-[#DCD6C8]">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#7A756C]">Package</span>
                  <p className="text-sm font-bold text-[#1A1A1A]">{confirmedBooking.packageTitle}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-[#7A756C]">Total Paid</span>
                  <p className="text-sm font-bold text-[#1A1A1A]">₹{confirmedBooking.totalPaidINR.toLocaleString('en-IN')}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[#5A554C]">
                <div>
                  <span className="block text-[10px] uppercase font-semibold">City Capital:</span>
                  <strong className="text-[#1A1A1A]">{confirmedBooking.city}</strong>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-semibold">Hotel Booked:</span>
                  <strong className="text-[#1A1A1A]">{confirmedBooking.hotelBooked}</strong>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-semibold">Check-In Date:</span>
                  <strong className="text-[#1A1A1A]">{confirmedBooking.startDate}</strong>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-semibold">Chauffeur Assigned:</span>
                  <strong className="text-[#1A1A1A]">{confirmedBooking.driverName} ({confirmedBooking.vehicleModel})</strong>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handlePrintETicket}
                className="py-3 px-4 rounded-xl border border-[#DCD6C8] bg-white text-xs font-semibold text-[#1A1A1A] hover:bg-[#F0EEE9] flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-[#8C7A5B]" /> Print / Save E-Ticket PDF
              </button>

              <button
                onClick={() => onPaymentSuccess(confirmedBooking)}
                className="flex-1 py-3.5 rounded-xl bg-[#1A1A1A] text-[#F9F7F2] hover:bg-[#333333] font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <span>Open Real-time Itinerary Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
