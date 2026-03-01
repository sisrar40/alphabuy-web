import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaCalendarAlt, FaTicketAlt, FaUtensils, FaCreditCard, FaHome } from "react-icons/fa";

const BookingDetails = () => {
  const booking = useSelector((state) => state.booking);
  const navigate = useNavigate();

  if (!booking || (!booking.date && (!booking.payment || !booking.payment.transactionId))) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">No Booking Found</h2>
        <button
          onClick={() => navigate("/")}
          className="flex items-center space-x-2 bg-green-600 text-white px-6 py-2 rounded-xl"
        >
          <FaHome />
          <span>Go to Home</span>
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-6 bg-[#f8f9fa] relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-aqua-100/20 rounded-full blur-[120px] -ml-64 -mt-64"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-100/20 rounded-full blur-[120px] -mr-64 -mb-64"></div>

      <div className="max-w-4xl mx-auto premium-card border-none overflow-hidden relative z-10 animate-in fade-in zoom-in duration-700">
        {/* Success Header */}
        <div className="bg-premium-gradient p-12 md:p-16 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-2xl border border-white/30 animate-bounce">
              <FaCheckCircle className="text-5xl text-white" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-70 mb-4 block">Transaction Authorized</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display tracking-tight">Booking Confirmed!</h1>
            <p className="text-white font-medium max-w-md mx-auto leading-relaxed">
              Your premium reservation at Alphabuy has been successfully processed. Welcome to the elite tier of entertainment.
            </p>
          </div>
        </div>

        <div className="p-10 md:p-14 space-y-12">
          {/* Booking Reference */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-10 border-b border-gray-100">
            <div className="text-center md:text-left">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Electronic Reference</p>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">#{booking.payment.transactionId || "ALPH-PREMIUM-X9"}</h2>
            </div>
            <div className="bg-aqua-50 border border-aqua-100 px-6 py-3 rounded-2xl flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-aqua-500 animate-pulse"></div>
               <span className="text-[10px] font-bold text-aqua-600 uppercase tracking-widest">Status: Fully Paid</span>
            </div>
          </div>

          {/* Details Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Schedule */}
            <div className="group">
              <div className="flex items-center gap-5 mb-4 font-display">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-aqua-600 text-xl border border-gray-100 shadow-soft transition-all duration-500 group-hover:bg-aqua-500 group-hover:text-white group-hover:scale-110">
                  <FaCalendarAlt />
                </div>
                <div>
                  <h3 className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Scheduled Date</h3>
                  <p className="text-lg font-bold text-gray-900 tracking-tight">
                    {booking.date ? new Date(booking.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : "Reserved Window"}
                  </p>
                </div>
              </div>
            </div>

            {/* Asset Allocation */}
            <div className="group">
              <div className="flex items-center gap-5 mb-4 font-display">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-aqua-600 text-xl border border-gray-100 shadow-soft transition-all duration-500 group-hover:bg-aqua-500 group-hover:text-white group-hover:scale-110">
                  <FaTicketAlt />
                </div>
                <div>
                  <h3 className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Asset Allocation</h3>
                  <div className="space-y-1">
                    {booking.tickets.length > 0 ? (
                      booking.tickets.map((t, i) => (
                        <p key={i} className="text-lg font-bold text-gray-900 tracking-tight">
                          <span className="text-aqua-600">{t.quantity || t.count}x</span> {t.name || t.type}
                        </p>
                      ))
                    ) : (
                      <p className="text-lg font-bold text-gray-900 tracking-tight">Standard Pass</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sustainability */}
            <div className="group">
              <div className="flex items-center gap-5 mb-4 font-display">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-aqua-600 text-xl border border-gray-100 shadow-soft transition-all duration-500 group-hover:bg-aqua-500 group-hover:text-white group-hover:scale-110">
                  <FaUtensils />
                </div>
                <div>
                  <h3 className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Sustainability Plans</h3>
                  <div className="space-y-1">
                    {booking.meals.length > 0 ? (
                      booking.meals.map((m, i) => (
                        <p key={i} className="text-lg font-bold text-gray-900 tracking-tight">
                          <span className="text-aqua-600">Added:</span> {m.name}
                        </p>
                      ))
                    ) : (
                      <p className="text-lg font-bold text-gray-900 tracking-tight text-gray-400 italic">No dietary plans selected</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Ledger */}
            <div className="group">
              <div className="flex items-center gap-5 mb-4 font-display">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-aqua-600 text-xl border border-gray-100 shadow-soft transition-all duration-500 group-hover:bg-aqua-500 group-hover:text-white group-hover:scale-110">
                  <FaCreditCard />
                </div>
                <div>
                  <h3 className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Financial Ledger</h3>
                  <p className="text-3xl font-bold text-aqua-600 tracking-tighter mt-1">₹{booking.payment.amount || "0"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Interface */}
          <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row gap-6">
            <button
               onClick={() => window.print()}
               className="flex-1 border border-gray-100 bg-white text-gray-400 py-5 rounded-[24px] font-bold text-[10px] uppercase tracking-widest hover:text-gray-900 hover:border-gray-200 transition-all shadow-soft active:scale-95 flex items-center justify-center gap-3"
            >
              Print Manifest
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex-1 bg-premium-gradient text-white py-5 rounded-[24px] font-bold text-[10px] uppercase tracking-widest hover:scale-[1.02] shadow-xl shadow-aqua-500/30 transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              Return Home
              <FaHome className="text-sm" />
            </button>
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="bg-gray-50/50 p-8 border-t border-gray-100 text-center">
           <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2 leading-relaxed">
             This is a digital authorization. Valid only at Alphabuy partner locations.
           </p>
           <div className="w-16 h-1 bg-gray-200 mx-auto rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
