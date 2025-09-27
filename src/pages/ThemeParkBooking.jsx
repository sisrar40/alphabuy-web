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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Progress Steps */}
      <div className="border-green-700/50 border-b">
        <div className="container mx-auto ">
          <div className="flex justify-center py-6">
            <div className="flex items-center space-x-8">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      currentStep >= step.number
                        ? "bg-green-600 border-green-600 text-white"
                        : "border-gray-300 text-white-400"
                    }`}
                  >
                    <step.icon className="text-sm" />
                  </div>
                  <span
                    className={`ml-2 font-medium ${
                      currentStep >= step.number
                        ? "text-green-600"
                        : "text-white-400"
                    }`}
                  >
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-0.5 mx-4 ${
                        currentStep > step.number ? "bg-green-600" : "bg-white"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">{renderStepContent()}</div>
      </div>
    </div>
  );
};

export default ThemeParkBooking;
