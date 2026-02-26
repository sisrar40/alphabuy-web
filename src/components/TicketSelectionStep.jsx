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
    <div className="bg-white rounded-[40px] p-8 md:p-12 border border-gray-50 shadow-soft">
      <div className="flex items-center justify-between mb-12">
        <div>
          <p className="text-[10px] font-black text-aqua-500 uppercase tracking-widest mb-2">Step 2 of 4</p>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight font-display">Select Tickets</h2>
        </div>
        <button
          onClick={prevStep}
          className="flex items-center gap-2 text-gray-400 hover:text-aqua-600 font-black text-xs uppercase tracking-widest bg-gray-50 border border-gray-100 px-5 py-3 rounded-2xl transition-standard hover:border-aqua-100"
        >
          <FaArrowLeft className="text-xs" />
          Change Date
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {ticketTypes.map((ticket) => {
          const qty = getTicketQuantity(ticket.id);
          const isActive = qty > 0;
          return (
            <div
              key={ticket.id}
              className={`border-2 rounded-[32px] p-8 bg-white transition-standard relative overflow-hidden ${
                isActive
                  ? "border-aqua-400 shadow-premium ring-2 ring-aqua-500/10"
                  : ticket.popular
                  ? "border-aqua-200 shadow-soft"
                  : "border-gray-100 shadow-soft hover:border-aqua-100"
              }`}
            >
              {ticket.popular && (
                <div className="absolute top-0 right-0 bg-aqua-gradient text-white text-[9px] font-black uppercase tracking-[0.2em] px-5 py-2 rounded-bl-[24px] shadow-lg">
                  Popular
                </div>
              )}

              <h3 className="font-black text-xl text-gray-900 mb-1 font-display">{ticket.name}</h3>
              <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-6">{ticket.description}</p>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-black text-gray-900 tracking-tighter">₹{ticket.price}</span>
                <span className="text-xs font-bold text-gray-300 line-through">₹{ticket.originalPrice}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {ticket.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-aqua-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaCheck className="text-aqua-600 text-[8px]" />
                    </div>
                    <span className="text-xs font-black text-gray-600 uppercase tracking-widest">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Qty</span>
                <div className="flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-2">
                  <button
                    onClick={() => updateTicketQuantity(ticket.id, qty - 1)}
                    disabled={qty === 0}
                    className="w-10 h-10 rounded-xl flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white hover:shadow-soft text-gray-700 font-black text-xl transition-standard"
                  >
                    −
                  </button>
                  <span className="font-black text-gray-900 text-lg w-5 text-center">{qty}</span>
                  <button
                    onClick={() => updateTicketQuantity(ticket.id, qty + 1)}
                    className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-aqua-50 hover:text-aqua-600 hover:shadow-soft text-gray-400 font-black text-xl transition-standard"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50/50 border border-gray-100 rounded-[32px] p-8 mb-10">
        <h3 className="font-black text-lg text-gray-900 mb-6 flex items-center gap-3">
          <span className="w-8 h-8 bg-aqua-50 rounded-xl flex items-center justify-center text-aqua-600 text-sm">🧾</span>
          Order Summary
        </h3>
        {tickets.length > 0 ? (
          <div className="space-y-4">
            {tickets.map((ticket) => {
              const ticketType = ticketTypes.find((t) => t.id === ticket.id);
              return ticketType ? (
                <div key={ticket.id} className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="flex items-center gap-3 text-sm font-black text-gray-700">
                    <span className="bg-aqua-50 text-aqua-700 text-xs font-black px-2.5 py-1 rounded-lg border border-aqua-100">{ticket.quantity}×</span>
                    {ticketType.name}
                  </span>
                  <span className="text-sm font-black text-gray-900">₹{ticketType.price * ticket.quantity}</span>
                </div>
              ) : null;
            })}
          </div>
        ) : (
          <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest italic text-center py-6 border border-dashed border-gray-100 rounded-2xl">
            No tickets added yet
          </p>
        )}
        <div className="mt-6 pt-6 border-t-2 border-dashed border-gray-100 flex justify-between items-center">
          <span className="text-sm font-black text-gray-400 uppercase tracking-widest">Total</span>
          <span className="text-3xl font-black text-aqua-600 tracking-tighter">₹{totalAmount}</span>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={prevStep}
          className="flex-1 bg-white border border-gray-100 text-gray-400 py-5 rounded-[20px] font-black text-xs uppercase tracking-widest hover:border-gray-200 hover:text-gray-600 transition-standard shadow-soft"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          disabled={tickets.length === 0}
          className={`flex-[2] py-5 rounded-[20px] font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-standard ${
            tickets.length > 0
              ? "bg-aqua-gradient text-white shadow-premium hover:shadow-xl hover:scale-[1.01]"
              : "bg-gray-100 text-gray-300 cursor-not-allowed"
          }`}
        >
          Choose Meals
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default TicketSelectionStep;
