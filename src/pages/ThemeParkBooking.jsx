import React, { useState } from "react";

// Import step components
import DateSelectionStep from "../components/DateSelectionStep";
import MealSelectionStep from "../components/MealSelectionStep";
import TicketSelectionStep from "../components/TicketSelectionStep";
import PaymentStep from "../components/PaymentStep";
import {
  FaCalendarAlt,
  FaCheck,
  FaCreditCard,
  FaMapMarkerAlt,
  FaSun,
  FaTicketAlt,
  FaUtensils,
  FaWater,
} from "react-icons/fa";

const ThemeParkBooking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    date: null,
    tickets: [],
    meals: [],
    payment: {},
    parkLocation: "AquaZen Paradise, Lonavala",
    weather: "32°C • Sunny",
    selectedDate: null,
    selectedTime: null,
    visitors: 2,
    addOns: [],
  });

  const [showSummary, setShowSummary] = useState(true);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  const steps = [
    {
      number: 1,
      title: "Select Date",
      icon: FaCalendarAlt,
      description: "Choose your visit date",
    },
    {
      number: 2,
      title: "Choose Tickets",
      icon: FaTicketAlt,
      description: "Select ticket types",
    },
    {
      number: 3,
      title: "Add Meals",
      icon: FaUtensils,
      description: "Customize dining",
    },
    {
      number: 4,
      title: "Payment",
      icon: FaCreditCard,
      description: "Secure checkout",
    },
  ];

  const handlePromoApply = () => {
    if (promoCode.toUpperCase() === "SPLASH20") {
      setPromoApplied(true);
      setPromoError("");
      // Apply 20% discount logic here
    } else {
      setPromoError("Invalid promo code");
    }
  };

  const calculateTotal = () => {
    const basePrice = 1296.82;
    const ticketTotal = basePrice * bookingData.visitors;
    const mealTotal = bookingData.meals.reduce(
      (sum, meal) => sum + (meal.price || 0),
      0,
    );
    const addOnTotal = bookingData.addOns.reduce(
      (sum, addon) => sum + (addon.price || 0),
      0,
    );
    const taxes = 499;
    const discount = promoApplied
      ? 0.2 * (ticketTotal + mealTotal + addOnTotal)
      : 0;

    return {
      subtotal: ticketTotal + mealTotal + addOnTotal,
      taxes,
      discount,
      total: ticketTotal + mealTotal + addOnTotal + taxes - discount,
    };
  };

  const totals = calculateTotal();

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <DateSelectionStep
            bookingData={bookingData}
            setBookingData={setBookingData}
            nextStep={() => setCurrentStep(2)}
          />
        );
      case 2:
        return (
          <TicketSelectionStep
            bookingData={bookingData}
            setBookingData={setBookingData}
            nextStep={() => setCurrentStep(3)}
            prevStep={() => setCurrentStep(1)}
          />
        );
      case 3:
        return (
          <MealSelectionStep
            bookingData={bookingData}
            setBookingData={setBookingData}
            nextStep={() => setCurrentStep(4)}
            prevStep={() => setCurrentStep(2)}
          />
        );
      case 4:
        return (
          <PaymentStep
            bookingData={bookingData}
            setBookingData={setBookingData}
            prevStep={() => setCurrentStep(3)}
          />
        );
      default:
        return (
          <DateSelectionStep
            bookingData={bookingData}
            setBookingData={setBookingData}
            nextStep={() => setCurrentStep(2)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-cyan-50">
      {/* Hero Header */}
      <section className="relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0,50 Q25,30 50,50 T100,50"
              stroke="white"
              fill="none"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold border border-white/30">
                <FaWater className="text-yellow-300" />
                Secure Your Splash Adventure
              </div>

              <h1 className="text-4xl lg:text-5xl font-black leading-tight">
                Complete Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-300">
                  Booking Journey
                </span>
              </h1>
            </div>

            {/* Park Info Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                  <FaMapMarkerAlt className="text-3xl" />
                </div>
                <div>
                  <div className="text-sm opacity-80">Selected Park</div>
                  <div className="text-xl font-bold">
                    {bookingData.parkLocation}
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-sm">
                    <FaSun className="text-yellow-300" />
                    <span>{bookingData.weather}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full h-auto">
            <path
              fill="white"
              d="M0,32L48,37.3C96,43,192,53,288,53.3C384,54,480,44,576,37.3C672,31,768,27,864,32C960,37,1056,51,1152,53.3C1248,56,1344,48,1392,44L1440,40L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 md:gap-4">
              {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all ${
                        currentStep > step.number
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                          : currentStep === step.number
                            ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30"
                            : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {currentStep > step.number ? (
                        <FaCheck className="text-sm md:text-base" />
                      ) : (
                        <step.icon className="text-sm md:text-base" />
                      )}
                    </div>
                    <div className="hidden md:block">
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Step {step.number}
                      </div>
                      <div
                        className={`text-sm font-bold ${
                          currentStep >= step.number
                            ? "text-gray-900"
                            : "text-gray-400"
                        }`}
                      >
                        {step.title}
                      </div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-8 md:w-16 h-1 bg-gray-200 rounded-full overflow-hidden hidden md:block">
                      <div
                        className={`h-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-500 ${
                          currentStep > step.number ? "w-full" : "w-0"
                        }`}
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column - Step Content */}
          <div
            className={`${showSummary ? "lg:col-span-12" : "lg:col-span-12"} transition-all duration-300`}
          >
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {renderStepContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeParkBooking;
