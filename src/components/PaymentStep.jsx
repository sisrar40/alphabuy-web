import React, { useState, useEffect } from "react";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaShieldAlt,
  FaLock,
  FaCreditCard,
  FaMobile,
  FaGooglePay,
  FaAmazonPay,
  FaPaypal,
  FaWallet,
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaQrcode,
  FaPhone,
  FaEnvelope,
  FaUser,
  FaCalendarCheck,
  FaClock,
  FaTicketAlt,
  FaUtensils,
  FaWater,
  FaStar,
  FaGift,
  FaPercent,
  FaCrown,
  FaBolt,
  FaLeaf,
  FaRegClock,
  FaRegCalendarAlt,
  FaRegCreditCard,
  FaRegCheckCircle,
  FaRegStar,
  FaRegHeart,
  FaHeart,
  FaChevronDown,
  FaChevronUp,
  FaPlus,
  FaMinus,
  FaTrash,
  FaEdit,
  FaSave,
  FaPrint,
  FaDownload,
  FaShare,
  FaCopy,
  FaQrcode as FaQrCode,
} from "react-icons/fa";
import {
  GiLifeBuoy,
  GiSpeedBoat,
  GiWaterfall,
  GiPalmTree,
  GiWaveSurfer,
  GiBeachBall,
} from "react-icons/gi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setBookingDate,
  setBookingTickets,
  setBookingMeals,
  setPaymentDetails,
} from "../store/bookingSlice";
import Button from "./ui/Button";
import { useRazorpay } from "react-razorpay";

const PaymentStep = ({ bookingData, setBookingData, prevStep }) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [showUpiApps, setShowUpiApps] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [upiId, setUpiId] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [showSecurityTip, setShowSecurityTip] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Razorpay } = useRazorpay();

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
    if (!acceptedTerms) {
      alert("Please accept the terms and conditions to proceed");
      return;
    }

    setProcessing(true);
    const total = calculateTotal();
    const finalAmount = (total * 1.18).toFixed(0);

    const options = {
      //test key -> rzp_test_SLwkA3iHaRKsMN
      //test key -> SLMc29e7iu2MrphAVe15U3oy
      key: "rzp_test_SLwkA3iHaRKsMN",
      amount: finalAmount * 100,
      currency: "INR",
      name: "AquaZen Water Park",
      description: "Premium Water Park Tickets",
      image: "https://cdn-icons-png.flaticon.com/512/414/414927.png",
      handler: (response) => {
        setProcessing(false);
        const transactionId = response.razorpay_payment_id;

        dispatch(setBookingDate(bookingData.date));
        dispatch(setBookingTickets(bookingData.tickets));
        dispatch(setBookingMeals(bookingData.meals));
        dispatch(
          setPaymentDetails({
            transactionId,
            amount: finalAmount,
            method: paymentMethod,
            status: "completed",
          }),
        );

        navigate("/booking-details");
      },
      prefill: {
        name: bookingData.guestName || "Water Park Guest",
        email: bookingData.guestEmail || "guest@waterpark.com",
        contact: bookingData.guestPhone || "9999999999",
      },
      theme: {
        color: "#0891b2", // cyan-600
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
      alert("Payment Failed: " + response.error.description);
    });
    rzp1.open();
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const handleCardChange = (field, value) => {
    if (field === "number") {
      value = formatCardNumber(value);
    }
    if (field === "expiry") {
      value = value.replace(/[^0-9]/g, "");
      if (value.length >= 2) {
        value = value.substring(0, 2) + "/" + value.substring(2, 4);
      }
    }
    if (field === "cvv") {
      value = value.replace(/[^0-9]/g, "").substring(0, 3);
    }
    setCardDetails((prev) => ({ ...prev, [field]: value }));
  };

  const totalAmount = calculateTotal();
  const finalAmount = (totalAmount * 1.18).toFixed(0);
  const gstAmount = (totalAmount * 0.18).toFixed(0);

  const upiApps = [
    {
      id: "gpay",
      name: "Google Pay",
      icon: "📱",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "phonepe",
      name: "PhonePe",
      icon: "📱",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "paytm",
      name: "Paytm",
      icon: "📱",
      color: "from-blue-400 to-blue-500",
    },
    {
      id: "amazonpay",
      name: "Amazon Pay",
      icon: "📱",
      color: "from-orange-500 to-orange-600",
    },
    {
      id: "bhim",
      name: "BHIM UPI",
      icon: "📱",
      color: "from-red-500 to-red-600",
    },
    {
      id: "whatsapp",
      name: "WhatsApp Pay",
      icon: "📱",
      color: "from-green-500 to-green-600",
    },
  ];

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
          {/* Left Column - Payment Methods */}
          <div className="lg:col-span-8 space-y-6">
            {/* Payment Method Selection */}
            <div className="bg-white rounded-3xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Select Payment Method
              </h3>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === "card"
                      ? "border-cyan-600 bg-cyan-50"
                      : "border-gray-200 hover:border-cyan-300"
                  }`}
                >
                  <FaCreditCard
                    className={`text-2xl mx-auto mb-2 ${paymentMethod === "card" ? "text-cyan-600" : "text-gray-400"}`}
                  />
                  <span
                    className={`text-xs font-bold block ${paymentMethod === "card" ? "text-cyan-600" : "text-gray-600"}`}
                  >
                    Card
                  </span>
                </button>

                <button
                  onClick={() => setPaymentMethod("upi")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === "upi"
                      ? "border-cyan-600 bg-cyan-50"
                      : "border-gray-200 hover:border-cyan-300"
                  }`}
                >
                  <FaMobile
                    className={`text-2xl mx-auto mb-2 ${paymentMethod === "upi" ? "text-cyan-600" : "text-gray-400"}`}
                  />
                  <span
                    className={`text-xs font-bold block ${paymentMethod === "upi" ? "text-cyan-600" : "text-gray-600"}`}
                  >
                    UPI
                  </span>
                </button>

                <button
                  onClick={() => setPaymentMethod("wallet")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === "wallet"
                      ? "border-cyan-600 bg-cyan-50"
                      : "border-gray-200 hover:border-cyan-300"
                  }`}
                >
                  <FaWallet
                    className={`text-2xl mx-auto mb-2 ${paymentMethod === "wallet" ? "text-cyan-600" : "text-gray-400"}`}
                  />
                  <span
                    className={`text-xs font-bold block ${paymentMethod === "wallet" ? "text-cyan-600" : "text-gray-600"}`}
                  >
                    Wallet
                  </span>
                </button>
              </div>

              {/* Card Payment Form */}
              {paymentMethod === "card" && (
                <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
                  <div>
                    <label className="text-xs font-bold text-gray-600 mb-1 block">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardDetails.number}
                        onChange={(e) =>
                          handleCardChange("number", e.target.value)
                        }
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-600 focus:outline-none transition-all font-mono"
                        maxLength="19"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                        <div className="w-8 h-5 bg-red-500 rounded"></div>
                        <div className="w-8 h-5 bg-blue-600 rounded"></div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-600 mb-1 block">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={cardDetails.expiry}
                        onChange={(e) =>
                          handleCardChange("expiry", e.target.value)
                        }
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-600 focus:outline-none transition-all"
                        maxLength="5"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-600 mb-1 block">
                        CVV
                      </label>
                      <input
                        type="password"
                        value={cardDetails.cvv}
                        onChange={(e) =>
                          handleCardChange("cvv", e.target.value)
                        }
                        placeholder="•••"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-600 focus:outline-none transition-all"
                        maxLength="3"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-600 mb-1 block">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={cardDetails.name}
                      onChange={(e) =>
                        setCardDetails((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="As shown on card"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-600 focus:outline-none transition-all"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                    <FaShieldAlt className="text-green-500" />
                    <span>Your card details are securely encrypted</span>
                  </div>
                </div>
              )}

              {/* UPI Payment Form */}
              {paymentMethod === "upi" && (
                <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
                  <div>
                    <label className="text-xs font-bold text-gray-600 mb-1 block">
                      UPI ID
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@okhdfcbank"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-600 focus:outline-none transition-all"
                    />
                  </div>

                  <div className="relative">
                    <button
                      onClick={() => setShowUpiApps(!showUpiApps)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl flex items-center justify-between text-gray-600 hover:border-cyan-300 transition-all"
                    >
                      <span>Or choose UPI app</span>
                      <FaChevronDown
                        className={`transition-transform ${showUpiApps ? "rotate-180" : ""}`}
                      />
                    </button>

                    {showUpiApps && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl z-10 p-2 animate-in slide-in-from-top-2 duration-300">
                        <div className="grid grid-cols-2 gap-2">
                          {upiApps.map((app) => (
                            <button
                              key={app.id}
                              onClick={() => {
                                setUpiId(`user@${app.id}`);
                                setShowUpiApps(false);
                              }}
                              className={`p-3 rounded-xl bg-gradient-to-r ${app.color} text-white flex items-center gap-2 hover:opacity-90 transition-all`}
                            >
                              <span className="text-xl">{app.icon}</span>
                              <span className="text-xs font-bold">
                                {app.name}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <FaQrCode className="text-4xl text-gray-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-600">
                      Scan QR code with any UPI app
                    </p>
                  </div>
                </div>
              )}

              {/* Wallet Payment Form */}
              {paymentMethod === "wallet" && (
                <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="grid grid-cols-2 gap-3">
                    <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-cyan-300 hover:bg-cyan-50 transition-all">
                      <span className="block text-2xl mb-2">🪙</span>
                      <span className="text-xs font-bold">Paytm Wallet</span>
                    </button>
                    <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-cyan-300 hover:bg-cyan-50 transition-all">
                      <span className="block text-2xl mb-2">💰</span>
                      <span className="text-xs font-bold">PhonePe Wallet</span>
                    </button>
                    <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-cyan-300 hover:bg-cyan-50 transition-all">
                      <span className="block text-2xl mb-2">💎</span>
                      <span className="text-xs font-bold">Amazon Pay</span>
                    </button>
                    <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-cyan-300 hover:bg-cyan-50 transition-all">
                      <span className="block text-2xl mb-2">⭐</span>
                      <span className="text-xs font-bold">Mobikwik</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Guest Information */}
            <div className="bg-white rounded-3xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Contact Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-600 mb-1 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-600 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600 mb-1 block">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-600 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600 mb-1 block">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="98765 43210"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-600 focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
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
              {bookingData.date && (
                <div className="flex items-center gap-3 p-3 bg-cyan-50 rounded-xl mb-4">
                  <FaCalendarAlt className="text-cyan-600" />
                  <div>
                    <p className="text-xs text-gray-500">Visit Date</p>
                    <p className="text-sm font-bold text-gray-900">
                      {new Date(bookingData.date).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              )}

              {/* Ticket Summary */}
              {bookingData.tickets?.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-bold text-gray-600 mb-2 flex items-center gap-1">
                    <FaTicketAlt className="text-cyan-600" />
                    Tickets
                  </p>
                  {bookingData.tickets.map((ticket, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center text-sm mb-2"
                    >
                      <span className="text-gray-600">
                        {ticket.quantity || ticket.count}x{" "}
                        {ticket.name || ticket.type}
                      </span>
                      <span className="font-bold text-gray-900">
                        ₹{(ticket.quantity || ticket.count || 0) * 1000}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Meal Summary */}
              {bookingData.meals?.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-bold text-gray-600 mb-2 flex items-center gap-1">
                    <FaUtensils className="text-cyan-600" />
                    Meals
                  </p>
                  {bookingData.meals.map((meal, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center text-sm mb-2"
                    >
                      <span className="text-gray-600">{meal.name}</span>
                      <span className="font-bold text-gray-900">
                        ₹{meal.count * 500}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Price Breakdown */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-bold text-gray-900">
                    ₹{totalAmount}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">GST (18%)</span>
                  <span className="font-bold text-gray-900">₹{gstAmount}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-cyan-600">₹{finalAmount}</span>
                </div>
              </div>

              {/* Pay Button */}
              <Button
                onClick={handlePayment}
                disabled={processing || !acceptedTerms}
                className="w-full !py-4 !rounded-2xl text-base font-bold bg-gradient-to-r from-cyan-600 to-blue-600 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {processing ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </span>
                ) : (
                  <span>Pay ₹{finalAmount} Securely</span>
                )}
              </Button>

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
