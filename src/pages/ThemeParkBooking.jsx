import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaUsers,
  FaMapMarkerAlt,
  FaSearch,
  FaArrowRight,
  FaArrowLeft,
  FaCheck,
  FaCreditCard,
  FaUtensils,
  FaTicketAlt,
  FaClock,
} from "react-icons/fa";
import DateSelectionStep from "../components/DateSelectionStep";
import MealSelectionStep from "../components/MealSelectionStep";
import TicketSelectionStep from "../components/TicketSelectionStep";
import PaymentStep from "../components/PaymentStep";

// Main Booking Flow Component
const ThemeParkBooking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    date: null,
    tickets: [],
    meals: [],
    payment: {},
  });

  const steps = [
    { number: 1, title: "Select Date", icon: FaCalendarAlt },
    { number: 2, title: "Choose Tickets", icon: FaTicketAlt },
    { number: 3, title: "Add Meals", icon: FaUtensils },
    { number: 4, title: "Payment", icon: FaCreditCard },
  ];

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
    <div className="min-h-screen bg-primary pb-24">
      {/* Premium Progress Bar */}
      <div className="bg-white border-b border-gray-50 shadow-soft sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex justify-center py-8">
            <div className="flex items-center gap-2 md:gap-4">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-standard ${
                        currentStep > step.number
                          ? "bg-aqua-gradient text-white shadow-premium"
                          : currentStep === step.number
                          ? "bg-aqua-gradient text-white shadow-lg shadow-aqua-500/20 scale-110"
                          : "bg-gray-50 border border-gray-100 text-gray-300"
                      }`}
                    >
                      {currentStep > step.number ? (
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <step.icon className="text-sm" />
                      )}
                    </div>
                    <span
                      className={`hidden md:block font-black text-xs uppercase tracking-widest transition-standard ${
                        currentStep >= step.number ? "text-aqua-600" : "text-gray-300"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-8 md:w-20 h-1 mx-4 rounded-full overflow-hidden bg-gray-100">
                      <div
                        className={`h-full bg-aqua-gradient rounded-full transition-all duration-700 ease-in-out ${
                          currentStep > step.number ? "w-full" : "w-0"
                        }`}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {renderStepContent()}
      </div>
    </div>
  );
};

export default ThemeParkBooking;
