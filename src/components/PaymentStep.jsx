import React, { useState, useEffect } from "react";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaShieldAlt,
  FaLock,
  FaCreditCard,
  FaMobile,
  FaWallet,
  FaCheckCircle,
  FaExclamationCircle,
  FaCalendarCheck,
  FaTicketAlt,
  FaUtensils,
  FaGift,
  FaChevronDown,
  FaQrcode as FaQrCode,
  FaPlus
} from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setBookingDate,
  setBookingTickets,
  setBookingMeals,
  setPaymentDetails,
  setUserInfo,
  setSelectedCoupon,
  calculateBookingTotal,
} from "../store/bookingSlice";
import { fetchCoupons } from "../features/coupons/couponSlice";
import Button from "./ui/Button";
import { useRazorpay } from "react-razorpay";
import bookingService from "../services/bookingService";
import leadService from "../services/leadService";
import userService from "../services/userService";
import { useAlert } from '../context/AlertContext';
import { fetchWallet, deductFromWallet } from '../features/wallet/walletSlice';
import { setAuthModal } from '../features/auth/authSlice';

const PaymentStep = ({ prevStep }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Razorpay } = useRazorpay();

  const bookingData = useSelector((state) => state.booking);
  const {
    userInfo,
    pricing,
    selectedCoupon,
    tickets,
    meals,
    date: bookingDate,
    selectedTime: bookingTime,
    availableTicketTypes,
    availableMeals,
    availableAddOns,
    selectedAddOns
  } = bookingData;

  const [processing, setProcessing] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(true);
  const [showSecurityTip, setShowSecurityTip] = useState(true);
  const [leadId, setLeadId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('razorpay'); // 'razorpay' | 'wallet'
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token && paymentMethod === 'wallet') {
      setPaymentMethod('razorpay');
    }
  }, [token, paymentMethod]);
  const { wallet } = useSelector((state) => state.wallet);
  const walletBalance = wallet?.balance ?? 0;
  const walletId = wallet?.id;

  useEffect(() => {
    if (token) dispatch(fetchWallet(token));
  }, [dispatch, token]);

  const TICKET_TYPES = availableTicketTypes || [];
  const MEAL_PLANS = availableMeals || [];
  const ADD_ONS = availableAddOns || [];

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    dispatch(setUserInfo({ ...userInfo, [name]: value }));
  };

  const handleContactBlur = async (e) => {
    const { name, value } = e.target;
    if (!value || value.length < 5) return;

    if (name === "email" || name === "phone") {
      try {
        const emailToSearch = name === "email" ? value : "";
        const phoneToSearch = name === "phone" ? value : "";

        const data = await userService.lookupUser(emailToSearch, phoneToSearch);
        if (data) {
          dispatch(setUserInfo({
            ...userInfo,
            name: userInfo.name || data.name || "",
            address: userInfo.address || data.address || "",
            city: userInfo.city || data.city || "",
            state: userInfo.state || data.state || "",
            zip: userInfo.zip || data.zip || "",
            ...(name === "email" && { phone: userInfo.phone || data.phone || "" }),
            ...(name === "phone" && { email: userInfo.email || data.email || "" })
          }));
          showAlert("Found past details and auto-filled form", "success");
        }
      } catch (error) {
        // Silently ignore if not found
      }
    }
  };

  const renderedTickets = tickets.map((t, i) => {
    const details = TICKET_TYPES.find(tt => tt.id === (t.id || t.type));
    return (
      <div key={i} className="flex justify-between items-center text-sm mb-1">
        <span className="text-gray-600">{details?.name || (t.id || t.type)} x {t.quantity || t.count}</span>
        <span className="font-bold text-gray-900">₹{((details?.price || 0) * (t.quantity || t.count)).toFixed(2)}</span>
      </div>
    );
  });

  const renderedMeals = meals.map((m, i) => {
    const mealId = typeof m === 'string' ? m : (m.id || m.type);
    const details = MEAL_PLANS.find(mp => mp.id === mealId);
    return (
      <div key={i} className="flex justify-between items-center text-sm mb-1">
        <span className="text-gray-600">{details?.name || mealId}</span>
        <span className="font-bold text-gray-900">₹{(details?.price || 0).toFixed(2)}</span>
      </div>
    );
  });

  const renderedAddOns = (selectedAddOns || []).map((aoId, i) => {
    const details = ADD_ONS.find(ao => ao.id === aoId);
    return (
      <div key={i} className="flex justify-between items-center text-sm mb-1">
        <span className="text-gray-600">{details?.name || aoId}</span>
        <span className="font-bold text-gray-900">₹{(details?.price || 0).toFixed(2)}</span>
      </div>
    );
  });

  const { items: availableCoupons } = useSelector((state) => state.coupons);

  useEffect(() => {
    dispatch(fetchCoupons(bookingData.parkId));
  }, [dispatch, bookingData.parkId]);

  // ── Wallet pay handler (Refactored for Top-up & Pay) ────────────────────────
  const handleWalletPayment = async () => {
    if (!acceptedTerms) {
      showAlert("Please accept the terms and conditions", "error");
      return;
    }

    const finalAmount = parseFloat(pricing.total.toFixed(2));

    // If insufficient balance, initiate Top-up first
    if (walletBalance < finalAmount) {
      const topupAmount = finalAmount - walletBalance;
      setProcessing(true);

      const options = {
        key: "rzp_test_SLwkA3iHaRKsMN",
        amount: Math.round(topupAmount * 100),
        currency: "INR",
        name: "AquaZen Wallet Top-up",
        description: `Top-up for booking payment`,
        handler: async (response) => {
          try {
            // 1. Add funds to wallet
            await dispatch(addFundsToWallet({
              token,
              amount: topupAmount,
              referenceId: response.razorpay_payment_id,
              description: "Booking top-up"
            })).unwrap();

            // 2. Proceed with Wallet Payment (now balance is sufficient)
            await executeWalletDebitAndBooking(finalAmount);
          } catch (err) {
            showAlert("Top-up successful but booking failed. Please try paying via wallet again.", "warning");
            setProcessing(false);
          }
        },
        modal: { ondismiss: () => setProcessing(false) },
        prefill: { name: userInfo.name, email: userInfo.email, contact: userInfo.phone },
        theme: { color: "#0891b2" }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      return;
    }

    setProcessing(true);
    await executeWalletDebitAndBooking(finalAmount);
  };

  const executeWalletDebitAndBooking = async (amount) => {
    try {
      // Deduct from wallet
      await dispatch(deductFromWallet({
        token,
        amount: amount,
        description: `Booking payment for ${bookingDate}`,
        referenceId: `BK-${Date.now()}`,
      })).unwrap();

      // Create booking record
      const bookingPayload = {
        user_name: userInfo.name,
        user_email: userInfo.email,
        user_phone: userInfo.phone,
        address: userInfo.address,
        city: userInfo.city,
        state: userInfo.state,
        zip: userInfo.zip,
        booking_date: bookingDate ? new Date(bookingDate).toISOString() : new Date().toISOString(),
        booking_time: bookingTime?.time || bookingTime || "",
        subtotal: pricing.subtotal,
        tax: pricing.tax,
        discount: pricing.discount,
        total: pricing.total,
        payment_status: "completed",
        payment_method: "Wallet", // Updated
        transaction_id: `WALLET-${Date.now()}`,
        coupon_id: selectedCoupon?.id,
        items: [
          ...tickets.map(t => ({
            item_type: 'ticket',
            item_id: t.id || t.type,
            quantity: t.quantity || t.count,
            price: TICKET_TYPES.find(tt => tt.id === (t.id || t.type))?.price || 0
          })),
          ...meals.map(m => {
            const mealId = typeof m === 'string' ? m : (m.id || m.type);
            return { item_type: 'meal', item_id: mealId, quantity: 1, price: MEAL_PLANS.find(mp => mp.id === mealId)?.price || 0 };
          }),
          ...(bookingData.selectedAddOns || []).map(aoId => ({
            item_type: 'addon',
            item_id: aoId,
            quantity: 1,
            price: ADD_ONS.find(ao => ao.id === aoId)?.price || 0
          }))
        ],
      };
      await bookingService.createBooking(bookingPayload);
      dispatch(setPaymentDetails({ transactionId: `WALLET-${Date.now()}`, amount: amount, method: 'Wallet', status: 'completed' }));
      showAlert("Payment successful via Wallet!", "success");
      navigate("/booking-details");
    } catch (err) {
      showAlert(err || "Wallet payment failed", "error");
    } finally {
      setProcessing(false);
    }
  };

  const handlePayment = async () => {
    if (!acceptedTerms) {
      showAlert("Please accept the terms and conditions to proceed", "error");
      return;
    }

    setProcessing(true);

    // Create lead before initializing payment
    try {
      const lead = await leadService.createLead({
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone,
        park_id: bookingData.parkId,
        message: `Booking attempt for ${bookingDate} with total ₹${pricing.total.toFixed(2)}`,
        status: "new"
      });
      if (lead && lead.id) {
        setLeadId(lead.id);
      }
    } catch (error) {
      console.error("Failed to capture lead:", error);
      // Continue with payment even if lead capture fails
    }

    const finalAmount = pricing.total.toFixed(2);

    const options = {
      key: "rzp_test_SLwkA3iHaRKsMN",
      amount: finalAmount * 100,
      currency: "INR",
      name: "AquaZen Water Park",
      description: "Premium Water Park Tickets",
      image: "https://cdn-icons-png.flaticon.com/512/414/414927.png",
      handler: async (response) => {
        const transactionId = response.razorpay_payment_id;

        try {
          // Delete lead if payment is successful
          if (leadId) {
            try {
              await leadService.deleteLead(leadId);
            } catch (leadError) {
              console.error("Failed to delete lead after payment:", leadError);
            }
          }

          // Construct backend booking payload
          const bookingPayload = {
            user_name: userInfo.name,
            user_email: userInfo.email,
            user_phone: userInfo.phone,
            address: userInfo.address,
            city: userInfo.city,
            state: userInfo.state,
            zip: userInfo.zip,
            booking_date: bookingDate ? new Date(bookingDate).toISOString() : new Date().toISOString(),
            booking_time: bookingTime?.time || bookingTime || "",
            subtotal: pricing.subtotal,
            tax: pricing.tax,
            discount: pricing.discount,
            total: pricing.total,
            payment_status: "completed",
            transaction_id: transactionId,
            coupon_id: selectedCoupon?.id,
            items: [
              ...tickets.map(t => ({
                item_type: 'ticket',
                item_id: t.id || t.type,
                quantity: t.quantity || t.count,
                price: TICKET_TYPES.find(tt => tt.id === (t.id || t.type))?.price || 0
              })),
              ...meals.map(m => {
                const mealId = typeof m === 'string' ? m : (m.id || m.type);
                return {
                  item_type: 'meal',
                  item_id: mealId,
                  quantity: 1,
                  price: MEAL_PLANS.find(mp => mp.id === mealId)?.price || 0
                };
              }),
              ...(bookingData.selectedAddOns || []).map(aoId => ({
                item_type: 'addon',
                item_id: aoId,
                quantity: 1,
                price: ADD_ONS.find(ao => ao.id === aoId)?.price || 0
              }))
            ]
          };

          await bookingService.createBooking(bookingPayload);

          dispatch(
            setPaymentDetails({
              transactionId,
              amount: finalAmount,
              method: 'Razorpay',
              status: "completed",
            }),
          );

          navigate("/booking-details");
        } catch (error) {
          console.error("Booking submission error:", error);
          showAlert("Booking failed. Please contact support with Transaction ID: " + transactionId, "error");
        } finally {
          setProcessing(false);
        }
      },
      prefill: {
        name: userInfo.name || "Guest",
        email: userInfo.email || "",
        contact: userInfo.phone || "",
      },
      theme: {
        color: "#2563EB",
      },
      modal: {
        ondismiss: () => {
          setProcessing(false);
        },
      },
    };

    const rzp1 = new Razorpay(options);
    rzp1.on("payment.failed", (response) => {
      setProcessing(false);
      showAlert("Payment Failed: " + response.error.description, "error");
    });
    rzp1.open();
  };





  return (
    <div className="bg-white rounded-4xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 via-cyan-600 to-blue-600 p-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0,30 Q25,20 50,30 T100,30"
              stroke="white"
              fill="none"
              strokeWidth="2"
            />
            <path
              d="M0,50 Q25,40 50,50 T100,50"
              stroke="white"
              fill="none"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30">
              <FaLock className="text-3xl text-white" />
            </div>
            <div>
              <span className="text-white/80 text-sm mb-1 block">
                Step 4 of 4
              </span>
              <h2 className="text-3xl font-bold text-white">Secure Checkout</h2>
            </div>
          </div>

          <button
            onClick={prevStep}
            className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-all"
          >
            <FaArrowLeft className="text-sm" />
            <span className="text-sm font-medium">Back</span>
          </button>
        </div>
      </div>

      <div className="p-8 md:p-10">
        {/* Security Banner */}
        {showSecurityTip && (
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 mb-6 flex items-start gap-3 border border-blue-100 animate-in slide-in-from-top-2 duration-500">
            <FaShieldAlt className="text-blue-600 text-xl flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-bold text-blue-900">
                Secure Payment Gateway
              </p>
              <p className="text-xs text-blue-700">
                Your transaction is protected by 256-bit SSL encryption. We
                never store your card details.
              </p>
            </div>
            <button
              onClick={() => setShowSecurityTip(false)}
              className="text-blue-400 hover:text-blue-600"
            >
              <FaExclamationCircle />
            </button>
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-8 space-y-6">

            {/* Available Coupons Section */}
            <div className="bg-white rounded-3xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaGift className="text-cyan-600" />
                Available Coupons
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableCoupons?.filter(c => c.active).map((coupon) => (
                  <button
                    key={coupon.id}
                    onClick={() => {
                      dispatch(setSelectedCoupon(selectedCoupon?.id === coupon.id ? null : coupon));
                      dispatch(calculateBookingTotal());
                    }}
                    className={`p-4 rounded-2xl border-2 transition-all text-left flex items-start gap-4 ${selectedCoupon?.id === coupon.id
                      ? "border-cyan-600 bg-cyan-50"
                      : "border-gray-100 hover:border-cyan-200"
                      }`}
                  >
                    <div className={`p-2 rounded-xl ${selectedCoupon?.id === coupon.id ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                      <FaTicketAlt />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-black text-slate-900">{coupon.couponCode}</span>
                        {selectedCoupon?.id === coupon.id && <FaCheckCircle className="text-cyan-600 text-xs" />}
                      </div>
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        {coupon.discountType === 'percentage' ? `${coupon.discountValue}% OFF` : `₹${coupon.discountValue} FLAT`}
                      </p>
                    </div>
                  </button>
                ))}
                {availableCoupons?.length === 0 && (
                  <p className="text-xs text-slate-400 col-span-2 text-center py-4">No coupons currently available.</p>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-3xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={userInfo.name}
                    onChange={handleInfoChange}
                    placeholder="John Doe"
                    className="w-full px-5 h-14 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-cyan-600/20 focus:border-cyan-600 transition-all font-bold text-slate-900"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleInfoChange}
                    onBlur={handleContactBlur}
                    placeholder="john@example.com"
                    className="w-full px-5 h-14 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-cyan-600/20 focus:border-cyan-600 transition-all font-bold text-slate-900"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={userInfo.phone}
                    onChange={handleInfoChange}
                    onBlur={handleContactBlur}
                    placeholder="98765 43210"
                    className="w-full px-5 h-14 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-cyan-600/20 focus:border-cyan-600 transition-all font-bold text-slate-900"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={userInfo.address}
                    onChange={handleInfoChange}
                    placeholder="Street name, Building"
                    className="w-full px-5 h-14 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-cyan-600/20 focus:border-cyan-600 transition-all font-bold text-slate-900"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4 col-span-1 md:col-span-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={userInfo.city}
                      onChange={handleInfoChange}
                      placeholder="Mumbai"
                      className="w-full px-5 h-14 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-cyan-600/20 focus:border-cyan-600 transition-all font-bold text-slate-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">State</label>
                    <input
                      type="text"
                      name="state"
                      value={userInfo.state}
                      onChange={handleInfoChange}
                      placeholder="MH"
                      className="w-full px-5 h-14 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-cyan-600/20 focus:border-cyan-600 transition-all font-bold text-slate-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Zip Code</label>
                    <input
                      type="text"
                      name="zip"
                      value={userInfo.zip}
                      onChange={handleInfoChange}
                      placeholder="400001"
                      className="w-full px-5 h-14 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-cyan-600/20 focus:border-cyan-600 transition-all font-bold text-slate-900"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 p-4">
              <input
                type="checkbox"
                id="terms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1 w-4 h-4 text-cyan-600 rounded border-gray-300 focus:ring-cyan-500"
              />
              <label htmlFor="terms" className="text-xs text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-cyan-600 font-bold hover:underline">
                  Terms & Conditions
                </a>{" "}
                and
                <a
                  href="#"
                  className="text-cyan-600 font-bold hover:underline ml-1"
                >
                  Cancellation Policy
                </a>
                . I understand that this booking is non-refundable after 24
                hours before the visit.
              </label>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-200 p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaCalendarCheck className="text-cyan-600" />
                Order Summary
              </h3>

              {/* Selected Date */}
              {bookingDate && (
                <div className="flex items-center gap-3 p-3 bg-cyan-50 rounded-xl mb-4">
                  <FaCalendarAlt className="text-cyan-600" />
                  <div>
                    <p className="text-xs text-gray-500">Visit Date</p>
                    <p className="text-sm font-bold text-gray-900">
                      {new Date(bookingDate).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              )}

              {/* Ticket Summary */}
              {tickets?.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-bold text-gray-600 mb-2 flex items-center gap-1">
                    <FaTicketAlt className="text-cyan-600" />
                    Tickets
                  </p>
                  {renderedTickets}
                </div>
              )}

              {/* Meal Summary */}
              {meals?.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-bold text-gray-600 mb-2 flex items-center gap-1">
                    <FaUtensils className="text-cyan-600" />
                    Meals
                  </p>
                  {renderedMeals}
                </div>
              )}

              {/* Add-on Summary */}
              {bookingData.selectedAddOns?.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-bold text-gray-600 mb-2 flex items-center gap-1">
                    <FaGift className="text-cyan-600" />
                    Enhancements
                  </p>
                  {renderedAddOns}
                </div>
              )}

              {/* Price Breakdown */}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-bold uppercase tracking-wider">Subtotal</span>
                  <span className="font-black text-slate-900">
                    ₹{pricing.subtotal.toFixed(2)}
                  </span>
                </div>
                {pricing.discount > 0 && (
                  <div className="flex justify-between text-sm text-emerald-600">
                    <span className="font-bold uppercase tracking-wider">Campaign Reduction</span>
                    <span className="font-black">-₹{pricing.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-slate-400">
                  <span className="font-bold uppercase tracking-wider">GST (18%)</span>
                  <span className="font-black">₹{pricing.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-4 border-t border-slate-100">
                  <span className="font-black text-slate-900">Total</span>
                  <span className="text-3xl font-black text-cyan-600 tracking-tighter">₹{pricing.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Savings Badge */}
              {pricing.discount > 0 && (
                <div className="bg-emerald-50 p-4 rounded-2xl flex items-center justify-between border border-emerald-100 mt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
                      <FaGift className="text-xl" />
                    </div>
                    <span className="text-[10px] font-black text-emerald-800 uppercase tracking-widest leading-tight">Applied Savings</span>
                  </div>
                  <span className="text-lg font-black text-emerald-600">₹{pricing.discount.toFixed(0)}</span>
                </div>
              )}

              {/* Pay Button */}
              {/* Payment Method Selector */}
              <div className="mb-4">
                <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">Payment Method</p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button
                    onClick={() => setPaymentMethod('razorpay')}
                    className={`flex flex-col items-center gap-1 p-3 rounded-2xl border-2 transition-all ${paymentMethod === 'razorpay' ? 'border-cyan-500 bg-cyan-50' : 'border-gray-100 hover:border-gray-200'}`}
                  >
                    <FaCreditCard className={`text-xl ${paymentMethod === 'razorpay' ? 'text-cyan-600' : 'text-gray-400'}`} />
                    <span className={`text-xs font-bold ${paymentMethod === 'razorpay' ? 'text-cyan-700' : 'text-gray-500'}`}>Razorpay</span>
                  </button>
                  {token ? (
                    <button
                      onClick={() => setPaymentMethod('wallet')}
                      className={`flex flex-col items-center gap-1 p-3 rounded-2xl border-2 transition-all ${paymentMethod === 'wallet' ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-gray-200'}`}
                    >
                      <FaWallet className={`text-xl ${paymentMethod === 'wallet' ? 'text-blue-600' : 'text-gray-400'}`} />
                      <span className={`text-xs font-bold ${paymentMethod === 'wallet' ? 'text-blue-700' : 'text-gray-500'}`}>Wallet</span>
                      <span className={`text-[10px] font-black ${walletBalance >= pricing.total ? 'text-green-600' : 'text-red-500'}`}>₹{walletBalance.toFixed(2)}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => dispatch(setAuthModal(true))}
                      className="flex flex-col items-center justify-center gap-1 p-3 rounded-2xl border-2 border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
                    >
                      <FaLock className="text-xl text-gray-300 group-hover:text-blue-400" />
                      <span className="text-[10px] font-bold text-gray-400 group-hover:text-blue-500 text-center leading-tight">Login to use Wallet</span>
                    </button>
                  )}
                </div>
              </div>

              {paymentMethod === 'razorpay' ? (
                <Button
                  onClick={handlePayment}
                  disabled={processing || !acceptedTerms}
                  className="w-full !py-4 !rounded-2xl text-sm font-black bg-gradient-to-r from-cyan-500 to-blue-600 disabled:opacity-50"
                >
                  {processing ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Securing Portal...
                    </span>
                  ) : (
                    <span>Initialize Payment • ₹{pricing.total.toFixed(2)}</span>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleWalletPayment}
                  disabled={processing || !acceptedTerms}
                  className="w-full !py-4 !rounded-2xl text-sm font-black bg-gradient-to-r from-blue-600 to-indigo-600 disabled:opacity-50"
                >
                  {processing ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </span>
                  ) : walletBalance < pricing.total ? (
                    <span className="flex items-center justify-center gap-2">
                      <FaPlus className="text-xs" /> Top-up & Pay ₹{pricing.total.toFixed(2)}
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2"><FaWallet /> Pay ₹{pricing.total.toFixed(2)} via Wallet</span>
                  )}
                </Button>
              )}


              {/* Trust Badges */}
              <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                <div>
                  <FaLock className="text-green-600 text-xl mx-auto mb-1" />
                  <span className="text-[10px] font-bold text-gray-500">
                    256-bit SSL
                  </span>
                </div>
                <div>
                  <FaShieldAlt className="text-blue-600 text-xl mx-auto mb-1" />
                  <span className="text-[10px] font-bold text-gray-500">
                    PCI Compliant
                  </span>
                </div>
                <div>
                  <FaCheckCircle className="text-purple-600 text-xl mx-auto mb-1" />
                  <span className="text-[10px] font-bold text-gray-500">
                    Secure Checkout
                  </span>
                </div>
              </div>

              {/* Money Back Guarantee */}
              <div className="mt-4 p-3 bg-green-50 rounded-xl flex items-center gap-2">
                <FaGift className="text-green-600 text-lg" />
                <div>
                  <p className="text-xs font-bold text-green-700">
                    Money-back Guarantee
                  </p>
                  <p className="text-[10px] text-green-600">
                    Free cancellation within 24h
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStep;
