import React, { useState } from "react";
import { FaArrowRight, FaArrowLeft, FaCheck } from "react-icons/fa";

const TicketSelectionStep = ({
  bookingData,
  setBookingData,
  nextStep,
  prevStep,
}) => {
  const [tickets, setTickets] = useState(bookingData.tickets);

  const ticketTypes = [
    {
      id: "adult",
      name: "Adult Ticket",
      description: "Ages 13+ years",
      price: 1199,
      originalPrice: 1399,
      features: ["All Rides Access", "Water Park Entry", "Free Parking"],
      popular: true,
    },
    {
      id: "child",
      name: "Child Ticket",
      description: "Ages 3-12 years",
      price: 899,
      originalPrice: 1099,
      features: ["All Rides Access", "Kids Zone", "Supervised Activities"],
    },
    {
      id: "senior",
      name: "Senior Citizen",
      description: "Ages 60+ years",
      price: 799,
      originalPrice: 999,
      features: ["All Rides Access", "Priority Seating", "Medical Assistance"],
    },
    {
      id: "fastpass",
      name: "Fast Pass Pro",
      description: "Skip the lines",
      price: 1999,
      originalPrice: 2499,
      features: ["Skip Waiting Lines", "Priority Access", "VIP Lounge"],
    },
  ];

  const updateTicketQuantity = (ticketId, quantity) => {
    const updatedTickets = tickets.filter((t) => t.id !== ticketId);
    if (quantity > 0) {
      updatedTickets.push({ id: ticketId, quantity });
    }
    setTickets(updatedTickets);
    setBookingData((prev) => ({ ...prev, tickets: updatedTickets }));
  };

  const getTicketQuantity = (ticketId) => {
    const ticket = tickets.find((t) => t.id === ticketId);
    return ticket ? ticket.quantity : 0;
  };

  const totalAmount = tickets.reduce((total, ticket) => {
    const ticketType = ticketTypes.find((t) => t.id === ticket.id);
    return total + (ticketType ? ticketType.price * ticket.quantity : 0);
  }, 0);

  return (
    <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Select Tickets</h2>
        <button
          onClick={prevStep}
          className="flex items-center text-blue-400 hover:text-blue-300"
        >
          <FaArrowLeft className="mr-2" />
          Change Date
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 cursor-pointer">
        {ticketTypes.map((ticket) => (
          <div
            key={ticket.id}
            className={`border-2 rounded-lg p-4 bg-gray-700/30 backdrop-blur-sm ${
              ticket.popular
                ? "border-green-400 ring-2 ring-yellow-200/20"
                : "border-gray-600"
            }`}
          >
            {ticket.popular && (
              <div className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full inline-block mb-3">
                MOST POPULAR
              </div>
            )}

            <h3 className="font-bold text-lg text-white">{ticket.name}</h3>
            <p className="text-gray-300 text-sm mb-3">{ticket.description}</p>

            <div className="flex items-baseline mb-3">
              <span className="text-2xl font-bold text-green-400">
                ₹{ticket.price}
              </span>
              <span className="text-sm text-gray-400 line-through ml-2">
                ₹{ticket.originalPrice}
              </span>
            </div>

            <ul className="text-sm text-gray-300 space-y-1 mb-4">
              {ticket.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <FaCheck className="text-green-500 mr-2 text-xs" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Quantity:</span>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() =>
                    updateTicketQuantity(
                      ticket.id,
                      getTicketQuantity(ticket.id) - 1
                    )
                  }
                  disabled={getTicketQuantity(ticket.id) === 0}
                  className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center disabled:opacity-50 text-white bg-gray-600"
                >
                  -
                </button>
                <span className="font-semibold text-white">
                  {getTicketQuantity(ticket.id)}
                </span>
                <button
                  onClick={() =>
                    updateTicketQuantity(
                      ticket.id,
                      getTicketQuantity(ticket.id) + 1
                    )
                  }
                  className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-white bg-gray-600"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-white mb-3">Order Summary</h3>
        <div className="space-y-2">
          {tickets.map((ticket) => {
            const ticketType = ticketTypes.find((t) => t.id === ticket.id);
            return ticketType ? (
              <div
                key={ticket.id}
                className="flex justify-between text-sm text-gray-300"
              >
                <span>
                  {ticketType.name} × {ticket.quantity}
                </span>
                <span className="text-white">
                  ₹{ticketType.price * ticket.quantity}
                </span>
              </div>
            ) : null;
          })}
        </div>
        <div className="border-t border-gray-600 mt-3 pt-3 flex justify-between font-semibold text-white">
          <span>Total</span>
          <span>₹{totalAmount}</span>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={prevStep}
          className="flex-1 border border-gray-400 text-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-700/50 transition duration-300"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          disabled={tickets.length === 0}
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition duration-300 flex items-center justify-center"
        >
          Continue to Meals
          <FaArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default TicketSelectionStep;
