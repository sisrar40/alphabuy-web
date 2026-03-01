import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaCalendarAlt, FaShieldAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setBookingDate, setBookingTickets, setBookingMeals, setPaymentDetails } from "../store/bookingSlice";
import Button from "./ui/Button";
import { useRazorpay } from "react-razorpay";

const PaymentStep = ({ bookingData, setBookingData, prevStep }) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {Razorpay} = useRazorpay();

  const calculateTotal = () => {
    const ticketsTotal = (bookingData.tickets || []).reduce((total, ticket) => {
      return total + (ticket.quantity || ticket.count || 0) * 1000;
    }, 0);

    const mealsTotal = (bookingData.meals || []).reduce((total, meal) => {
      return total + (meal.count || 0) * 500;
    }, 0);

    return ticketsTotal + mealsTotal;
  };

  const handlePayment = () => {
    const total = calculateTotal();
    const finalAmount = (total * 1.18).toFixed(0);
    
    const options = {
      //test key -> rzp_test_SLwkA3iHaRKsMN
      //test key -> SLMc29e7iu2MrphAVe15U3oy
      key: "rzp_test_SLwkA3iHaRKsMN",
      amount: finalAmount * 100, 
      currency: "INR",
      name: "Alphabuy Water Park",
      description: "Park Entry Tickets",
      image: "https://cdn-icons-png.flaticon.com/512/414/414927.png",
      handler: (response) => {
        const transactionId = response.razorpay_payment_id;
        
        dispatch(setBookingDate(bookingData.date));
        dispatch(setBookingTickets(bookingData.tickets));
        dispatch(setBookingMeals(bookingData.meals));
        dispatch(setPaymentDetails({
          transactionId,
          amount: finalAmount,
          status: "completed"
        }));

        navigate("/booking-details");
      },
      prefill: {
        name: "Alphabuy Guest",
        email: "guest@alphabuy.in",
        contact: "9999999999",
      },
      theme: {
        color: "#0ea5e9",
      },
    };

    const rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', (response) => {
        alert("Payment Failed: " + response.error.description);
    });
    rzp1.open();
  };

  const totalAmount = calculateTotal();

  return (
    <div className="premium-card p-8 md:p-12 border-none">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div>
          <span className="bg-aqua-100 text-aqua-600 text-[9px] font-bold uppercase tracking-widest px-5 py-2 rounded-full shadow-sm mb-3 inline-block">Final Settlement</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight font-display">
            Secure Checkout
          </h2>
          <p className="text-gray-400 font-medium text-sm mt-2">Finalize your transaction with enterprise-grade encryption.</p>
        </div>
        <button
          onClick={prevStep}
          className="flex items-center gap-3 text-gray-400 hover:text-aqua-600 font-bold text-[10px] uppercase tracking-widest bg-white border border-gray-100 px-8 py-4 rounded-2xl transition-all shadow-soft active:scale-95"
        >
          <FaArrowLeft className="text-xs" />
          Back to Meals
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Payment Configuration Column */}
        <div className="lg:col-span-8 space-y-10">
          {/* Detailed Statement */}
          <div className="bg-gray-50/50 border border-gray-100 rounded-[40px] p-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-aqua-100/20 rounded-full blur-3xl -mr-32 -mt-32 transition-colors duration-700 group-hover:bg-aqua-200/30"></div>
            
            <h3 className="font-bold uppercase tracking-wider">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-aqua-600 text-xl shadow-soft border border-aqua-50 font-display">∑</div>
              Value Composition
            </h3>

            <div className="space-y-6 relative z-10">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-gray-500 uppercase tracking-widest">Base Provisions</span>
                <span className="font-bold text-gray-900 tracking-tighter">₹{totalAmount}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-gray-500 uppercase tracking-widest">Regulatory Surcharge (18%)</span>
                <span className="font-bold text-gray-900 tracking-tighter">₹{(totalAmount * 0.18).toFixed(0)}</span>
              </div>
              <div className="border-t-2 border-dashed border-gray-200 pt-8 flex justify-between items-center">
                <span className="font-bold text-gray-900 uppercase tracking-wider text-xs">Total Aggregate</span>
                <div className="flex items-baseline gap-2">
                   <span className="text-sm font-bold text-gray-400 uppercase">INR</span>
                   <span className="text-5xl font-bold text-aqua-600 tracking-tighter">₹{(totalAmount * 1.18).toFixed(0)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <div className="flex items-center justify-between mb-8">
               <h3 className="font-bold text-2xl text-gray-900 font-display tracking-tight">Payment Methodology</h3>
               <div className="flex items-center gap-2">
                  <div className="w-8 h-5 bg-blue-600 rounded-sm"></div>
                  <div className="w-8 h-5 bg-amber-500 rounded-sm"></div>
                  <div className="w-8 h-5 bg-gray-300 rounded-sm"></div>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-10">
              <button
                onClick={() => setPaymentMethod("card")}
                className={`p-8 border-2 rounded-[32px] text-left transition-all duration-500 relative overflow-hidden group ${
                  paymentMethod === "card"
                    ? "border-aqua-500 bg-white shadow-premium ring-4 ring-aqua-500/10"
                    : "border-gray-50 bg-gray-50/50 text-gray-400 hover:border-aqua-100"
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors ${paymentMethod === 'card' ? 'bg-aqua-500 text-white shadow-lg' : 'bg-white text-gray-400 border border-gray-100 shadow-sm'}`}>
                   <span className="text-xl">💳</span>
                </div>
                <p className={`font-bold text-sm uppercase tracking-wider ${paymentMethod === 'card' ? 'text-gray-900' : 'text-gray-500'}`}>Card Asset</p>
                <p className="text-[9px] font-bold text-gray-400 mt-1 uppercase tracking-widest transition-opacity group-hover:opacity-100 opacity-60">Credit / Debit</p>
              </button>
              
              <button
                onClick={() => setPaymentMethod("upi")}
                className={`p-8 border-2 rounded-[32px] text-left transition-all duration-500 relative overflow-hidden group ${
                  paymentMethod === "upi"
                    ? "border-aqua-500 bg-white shadow-premium ring-4 ring-aqua-500/10"
                    : "border-gray-50 bg-gray-50/50 text-gray-400 hover:border-aqua-100"
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors ${paymentMethod === 'upi' ? 'bg-aqua-500 text-white shadow-lg' : 'bg-white text-gray-400 border border-gray-100 shadow-sm'}`}>
                   <span className="text-xl">📱</span>
                </div>
                <p className={`font-bold text-sm uppercase tracking-wider ${paymentMethod === 'upi' ? 'text-gray-900' : 'text-gray-500'}`}>Instant UPI</p>
                <p className="text-[9px] font-bold text-gray-400 mt-1 uppercase tracking-widest transition-opacity group-hover:opacity-100 opacity-60">UPI / QR Scan</p>
              </button>
            </div>

            {paymentMethod === "card" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500 bg-white p-10 rounded-[40px] border border-gray-50 shadow-soft">
                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest ml-1">Instrument Identity</span>
                  <input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    className="w-full p-6 border border-gray-100 rounded-[24px] bg-gray-50/50 text-gray-900 font-bold uppercase tracking-wider outline-none focus:border-aqua-500 focus:bg-white transition-all shadow-inner-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest ml-1">Expiry Horizon</span>
                    <input
                      type="text"
                      placeholder="MM / YY"
                      className="w-full p-6 border border-gray-100 rounded-[24px] bg-gray-50/50 text-gray-900 font-bold uppercase tracking-wider outline-none focus:border-aqua-500 focus:bg-white transition-all shadow-inner-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest ml-1">Security Cipher</span>
                    <input
                      type="password"
                      placeholder="•••"
                      className="w-full p-6 border border-gray-100 rounded-[24px] bg-gray-50/50 text-gray-900 font-bold uppercase tracking-wider outline-none focus:border-aqua-500 focus:bg-white transition-all shadow-inner-sm"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest ml-1">Asset Holder</span>
                  <input
                    type="text"
                    placeholder="FULL LEGAL NAME"
                    className="w-full p-4 border border-gray-100 rounded-[24px] bg-gray-50/50 text-gray-900 font-bold uppercase tracking-widest outline-none focus:border-aqua-500 focus:bg-white transition-all shadow-inner-sm"
                  />
                </div>
              </div>
            )}

            {paymentMethod === "upi" && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500 bg-white p-10 rounded-[40px] border border-gray-50 shadow-soft">
                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest ml-1">Virtual Payment Address</span>
                  <input
                    type="text"
                    placeholder="username@bank"
                    className="w-full p-6 border border-gray-100 rounded-[24px] bg-gray-50/50 text-gray-900 font-bold tracking-widest outline-none focus:border-aqua-500 focus:bg-white transition-all shadow-inner-sm"
                  />
                </div>
                <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest mt-4">A request will be sent to your mobile device</p>
              </div>
            )}
          </div>
        </div>

        {/* Audit Sidepane */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-[40px] p-10 h-fit border border-gray-50 shadow-premium sticky top-32 group overflow-hidden">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-aqua-50/50 rounded-full blur-3xl -mb-16 -mr-16 group-hover:bg-aqua-100 transition-all duration-700"></div>
            
            <h3 className="font-bold text-xl text-gray-900 mb-8 font-display tracking-tight relative z-10">Audit Summary</h3>
            
            <div className="space-y-8 relative z-10">
              <div className="space-y-1">
                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 leading-none">Selected Window</p>
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-xl bg-aqua-50 flex items-center justify-center text-aqua-600 text-xs shadow-sm border border-aqua-100"><FaCalendarAlt /></div>
                   <span className="font-bold text-sm text-gray-900 tracking-tight">{bookingData.date || "Not set"}</span>
                </div>
              </div>

              <div className="space-y-1">
                 <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 leading-none">Allocation Count</p>
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-aqua-50 flex items-center justify-center text-aqua-600 text-xs shadow-sm border border-aqua-100">🎟️</div>
                    <span className="font-bold text-sm text-gray-900 tracking-tight">{bookingData.tickets.length} Configurations</span>
                 </div>
              </div>

              <div className="space-y-1">
                 <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 leading-none">Sustainability</p>
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-aqua-50 flex items-center justify-center text-aqua-600 text-xs shadow-sm border border-aqua-100">🍽️</div>
                    <span className="font-bold text-sm text-gray-900 tracking-tight">{bookingData.meals.length} Plans Added</span>
                 </div>
              </div>
            </div>

            <Button
              onClick={handlePayment}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 mt-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg shadow-blue-600/20"
            >
              Confirm
            </Button>

            <div className="flex flex-col items-center gap-3 mt-8 relative z-10">
               <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">256-Bit SSL Shielded</span>
               </div>
            </div>
          </div>

          <div className="bg-aqua-50/50 border border-aqua-100 rounded-[32px] p-8">
             <p className="text-[10px] font-bold text-aqua-600 uppercase tracking-wider mb-4">Integrity Guarantee</p>
             <p className="text-[10px] font-medium text-gray-500 italic leading-relaxed">
               All transactions are processed through enterprise grade financial bridges. Your data remains siloed and encrypted.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStep;
