import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

const PaymentStep = ({ bookingData, setBookingData, prevStep }) => {
  const [paymentMethod, setPaymentMethod] = useState("card");

  const calculateTotal = () => {
    const ticketsTotal = bookingData.tickets.reduce((total, ticket) => {
      // This would need actual ticket prices from your data
      return total + ticket.quantity * 1000; // Placeholder calculation
    }, 0);

    const mealsTotal = bookingData.meals.reduce((total, mealId) => {
      // This would need actual meal prices from your data
      return total + 500; // Placeholder calculation
    }, 0);

    return ticketsTotal + mealsTotal;
  };

  const handlePayment = () => {
    // Handle payment processing here
    alert("Payment processed successfully!");
  };

  return (
    <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Complete Payment</h2>
        <button
          onClick={prevStep}
          className="flex items-center text-blue-400 hover:text-blue-300"
        >
          <FaArrowLeft className="mr-2" />
          Back to Meals
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div className="bg-gray-700/50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-white mb-4">Order Summary</h3>

            <div className="space-y-3 text-gray-300">
              <div className="flex justify-between text-sm">
                <span>Tickets</span>
                <span className="text-white">
                  ₹{calculateTotal() - 500}
                </span>{" "}
                {/* Placeholder */}
              </div>
              <div className="flex justify-between text-sm">
                <span>Meals</span>
                <span className="text-white">₹500</span> {/* Placeholder */}
              </div>
              <div className="flex justify-between text-sm">
                <span>Taxes & Fees</span>
                <span className="text-white">
                  ₹{(calculateTotal() * 0.18).toFixed(0)}
                </span>
              </div>
              <div className="border-t border-gray-600 pt-3 flex justify-between font-semibold text-lg text-white">
                <span>Total Amount</span>
                <span>₹{(calculateTotal() * 1.18).toFixed(0)}</span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="font-semibold text-white mb-4">Payment Method</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => setPaymentMethod("card")}
                className={`p-4 border-2 rounded-lg text-center ${
                  paymentMethod === "card"
                    ? "border-blue-500 bg-blue-900/20 text-white"
                    : "border-gray-600 text-gray-300 bg-gray-700/30"
                }`}
              >
                💳 Credit/Debit Card
              </button>
              <button
                onClick={() => setPaymentMethod("upi")}
                className={`p-4 border-2 rounded-lg text-center ${
                  paymentMethod === "upi"
                    ? "border-blue-500 bg-blue-900/20 text-white"
                    : "border-gray-600 text-gray-300 bg-gray-700/30"
                }`}
              >
                📱 UPI Payment
              </button>
            </div>

            {paymentMethod === "card" && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="p-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="p-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400"
                />
              </div>
            )}

            {paymentMethod === "upi" && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="UPI ID"
                  className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400"
                />
                <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700">
                  Pay via UPI
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Booking Details */}
        <div className="bg-blue-900/20 rounded-lg p-6 h-fit border border-blue-700/30">
          <h3 className="font-semibold text-blue-300 mb-4">Booking Details</h3>
          <div className="space-y-3 text-sm text-blue-200">
            <div className="flex justify-between">
              <span>Date:</span>
              <span className="font-semibold text-white">
                {bookingData.date || "Not selected"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Tickets:</span>
              <span className="font-semibold text-white">
                {bookingData.tickets.length} types
              </span>
            </div>
            <div className="flex justify-between">
              <span>Meals:</span>
              <span className="font-semibold text-white">
                {bookingData.meals.length} plans
              </span>
            </div>
          </div>

          <button
            onClick={handlePayment}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 mt-6 transition duration-300"
          >
            Pay ₹{(calculateTotal() * 1.18).toFixed(0)}
          </button>

          <p className="text-xs text-gray-400 text-center mt-3">
            By proceeding, you agree to our Terms & Conditions
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentStep;
