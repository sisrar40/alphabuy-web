import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaCalendarAlt, FaTicketAlt, FaUtensils, FaCreditCard, FaHome } from "react-icons/fa";

const BookingDetails = () => {
  const booking = useSelector((state) => state.booking);
  const navigate = useNavigate();

  if (!booking.date && !booking.payment.transactionId) {
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
    <div className="min-h-screen py-12 px-4 bg-[var(--bg-color)]">
      <div className="max-w-3xl mx-auto bg-[var(--card-bg)] rounded-3xl shadow-xl overflow-hidden border border-[var(--border-color)]">
        {/* Success Header */}
        <div className="bg-green-600 p-8 text-center text-white">
          <FaCheckCircle className="text-6xl mx-auto mb-4 animate-bounce" />
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="opacity-90">Thank you for booking with Alphabuy. Your reservation is secured.</p>
        </div>

        <div className="p-8 space-y-8">
          {/* Transaction ID */}
          <div className="flex justify-between items-center pb-4 border-b border-[var(--border-color)]">
            <span className="text-gray-500 font-medium">Booking ID:</span>
            <span className="font-bold text-green-600">#{booking.payment.transactionId || "ALPH-123456"}</span>
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Date Selection */}
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-2xl text-blue-600">
                <FaCalendarAlt className="text-xl" />
              </div>
              <div>
                <h3 className="text-gray-500 text-sm font-medium uppercase">Date</h3>
                <p className="text-lg font-semibold">{booking.date ? new Date(booking.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : "Not specified"}</p>
              </div>
            </div>

            {/* Tickets */}
            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-2xl text-purple-600">
                <FaTicketAlt className="text-xl" />
              </div>
              <div>
                <h3 className="text-gray-500 text-sm font-medium uppercase">Tickets</h3>
                <div className="space-y-1">
                  {booking.tickets.length > 0 ? (
                    booking.tickets.map((t, i) => (
                      <p key={i} className="text-lg font-semibold">{t.count}x {t.type}</p>
                    ))
                  ) : (
                    <p className="text-lg font-semibold">No tickets selected</p>
                  )}
                </div>
              </div>
            </div>

            {/* Meals */}
            <div className="flex items-start space-x-4">
              <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-2xl text-orange-600">
                <FaUtensils className="text-xl" />
              </div>
              <div>
                <h3 className="text-gray-500 text-sm font-medium uppercase">Add-ons</h3>
                <div className="space-y-1">
                   {booking.meals.length > 0 ? (
                    booking.meals.map((m, i) => (
                      <p key={i} className="text-lg font-semibold">{m.count}x {m.name}</p>
                    ))
                  ) : (
                    <p className="text-lg font-semibold">No meals added</p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-2xl text-green-600">
                <FaCreditCard className="text-xl" />
              </div>
              <div>
                <h3 className="text-gray-500 text-sm font-medium uppercase">Payment Status</h3>
                <p className="text-lg font-semibold text-green-500">Paid - ₹{booking.payment.amount || "0"}</p>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row gap-4">
            <button
               onClick={() => window.print()}
               className="flex-1 border-2 border-green-600 text-green-600 py-3 rounded-2xl font-bold hover:bg-green-50 transition-colors"
            >
              Download PDF
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex-1 bg-green-600 text-white py-3 rounded-2xl font-bold hover:bg-green-700 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
