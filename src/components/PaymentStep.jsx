import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setBookingDate, setBookingTickets, setBookingMeals, setPaymentDetails } from "../store/bookingSlice";

const PaymentStep = ({ bookingData, setBookingData, prevStep }) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const calculateTotal = () => {
    const ticketsTotal = bookingData.tickets.reduce((total, ticket) => {
      return total + (ticket.quantity || ticket.count || 0) * 1000;
    }, 0);

    const mealsTotal = bookingData.meals.reduce((total, meal) => {
      return total + (meal.count || 0) * 500;
    }, 0);

    return ticketsTotal + mealsTotal;
  };

  const handlePayment = () => {
    const total = calculateTotal();
    const finalAmount = (total * 1.18).toFixed(0);
    const transactionId = "ALPH-" + Math.random().toString(36).substr(2, 9).toUpperCase();

    // Dispatch all data to Redux for persistence
    dispatch(setBookingDate(bookingData.date));
    dispatch(setBookingTickets(bookingData.tickets));
    dispatch(setBookingMeals(bookingData.meals));
    dispatch(setPaymentDetails({
      transactionId,
      amount: finalAmount,
      status: "completed"
    }));

    navigate("/booking-details");
  };

  const totalAmount = calculateTotal();

  return (
    <div className="bg-white rounded-[40px] p-6 border border-gray-200 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Complete Payment</h2>
        <button
          onClick={prevStep}
          className="flex items-center text-aqua-600 hover:text-aqua-700 transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          Back to Meals
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>

            <div className="space-y-3 text-gray-800 opacity-80">
              <div className="flex justify-between text-sm">
                <span>Items Subtotal</span>
                <span className="font-medium">₹{totalAmount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Taxes & Fees (18%)</span>
                <span className="font-medium">₹{(totalAmount * 0.18).toFixed(0)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-lg text-gray-900">
                <span>Total Amount</span>
                <span className="text-aqua-600">₹{(totalAmount * 1.18).toFixed(0)}</span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Payment Method</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => setPaymentMethod("card")}
                className={`p-4 border-2 rounded-xl text-center transition-all duration-300 ${
                  paymentMethod === "card"
                    ? "border-aqua-500 bg-aqua-50 text-aqua-700"
                    : "border-gray-200 text-gray-800 opacity-70"
                }`}
              >
                💳 Credit/Debit Card
              </button>
              <button
                onClick={() => setPaymentMethod("upi")}
                className={`p-4 border-2 rounded-xl text-center transition-all duration-300 ${
                  paymentMethod === "upi"
                    ? "border-aqua-500 bg-aqua-50 text-aqua-700"
                    : "border-gray-200 text-gray-800 opacity-70"
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
                  className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 outline-none focus:border-aqua-500"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="p-4 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 outline-none focus:border-aqua-500"
                  />
                  <input
                    type="password"
                    placeholder="CVV"
                    className="p-4 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 outline-none focus:border-aqua-500"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 outline-none focus:border-aqua-500"
                />
              </div>
            )}

            {paymentMethod === "upi" && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="UPI ID (e.g., username@upi)"
                  className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 outline-none focus:border-aqua-500"
                />
              </div>
            )}
          </div>
        </div>

        {/* Booking Summary Card */}
        <div className="bg-white rounded-[40px] p-6 h-fit border border-gray-200 shadow-soft">
          <h3 className="font-bold text-gray-900 mb-4">Booking Summary</h3>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-semibold text-gray-900">
                {bookingData.date || "Not selected"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tickets:</span>
              <span className="font-semibold text-gray-900">
                {bookingData.tickets.length} Types Selected
              </span>
            </div>
          </div>

          <button
            onClick={handlePayment}
            className="w-full bg-aqua-gradient text-white py-4 rounded-xl font-bold hover:bg-aqua-600 mt-8 transition-all duration-300 shadow-lg shadow-aqua-500/20"
          >
            Confirm & Pay ₹{(totalAmount * 1.18).toFixed(0)}
          </button>

          <p className="text-xs text-center mt-4 opacity-50">
            Secure 256-bit SSL encrypted payment
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentStep;
