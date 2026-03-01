import React, { useState } from "react";
import { FaArrowRight, FaArrowLeft, FaCheck } from "react-icons/fa";
import Button from "./ui/Button";

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
    <div className="premium-card p-8 md:p-12 border-none">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div>
          <span className="bg-aqua-100 text-aqua-600 text-[9px] font-bold uppercase tracking-widest px-5 py-2 rounded-full shadow-sm mb-3 inline-block">Allocation Phase</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight font-display">
            Select Tickets
          </h2>
          <p className="text-gray-400 font-medium text-sm mt-2">Personalize your journey with premium ticket tiers.</p>
        </div>
        <button
          onClick={prevStep}
          className="flex items-center gap-3 text-gray-400 hover:text-aqua-600 font-bold text-[10px] uppercase tracking-widest bg-white border border-gray-100 px-8 py-4 rounded-2xl transition-all shadow-soft active:scale-95"
        >
          <FaArrowLeft className="text-xs" />
          Back to Date
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {ticketTypes.map((ticket) => {
          const qty = getTicketQuantity(ticket.id);
          const isActive = qty > 0;
          return (
            <div
              key={ticket.id}
              className={`rounded-[40px] p-8 bg-white transition-all duration-500 relative overflow-hidden flex flex-col justify-between border-2 ${
                isActive
                  ? "border-aqua-500 shadow-premium ring-4 ring-aqua-500/10 scale-[1.02]"
                  : ticket.popular
                  ? "border-aqua-100 shadow-soft"
                  : "border-gray-50 shadow-soft hover:border-aqua-100 hover:-translate-y-1"
              }`}
            >
              {ticket.popular && (
                <div className="absolute top-0 right-0 bg-premium-gradient text-white text-[9px] font-bold uppercase tracking-wider px-6 py-2.5 rounded-bl-[32px] shadow-lg shadow-aqua-500/20">
                  Popular
                </div>
              )}

              <div>
                <h3 className="font-bold text-2xl text-gray-900 mb-1 font-display tracking-tight">{ticket.name}</h3>
                <p className="text-gray-400 font-bold text-[11px] uppercase tracking-wider mb-8">{ticket.description}</p>

                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-5xl font-bold text-gray-900 tracking-tighter">₹{ticket.price}</span>
                  <span className="text-xs font-bold text-gray-400 line-through">₹{ticket.originalPrice}</span>
                </div>

                <ul className="space-y-4 mb-10">
                  {ticket.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-4">
                      <div className="w-6 h-6 bg-aqua-50 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm border border-aqua-100">
                        <FaCheck className="text-aqua-600 text-[9px]" />
                      </div>
                      <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-8 border-t border-gray-50">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Quantity</span>
                <div className="flex items-center gap-6 bg-gray-50/50 border border-gray-100 rounded-[24px] p-2.5 shadow-inner-sm">
                  <button
                    onClick={() => updateTicketQuantity(ticket.id, qty - 1)}
                    disabled={qty === 0}
                    className="w-12 h-12 rounded-2xl flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed bg-white shadow-soft text-gray-900 font-bold text-xl transition-all active:scale-95 border border-transparent hover:border-gray-100"
                  >
                    −
                  </button>
                  <span className="font-bold text-gray-900 text-xl w-6 text-center">{qty}</span>
                  <button
                    onClick={() => updateTicketQuantity(ticket.id, qty + 1)}
                    className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white shadow-soft text-aqua-600 font-bold text-xl transition-all active:scale-95 border border-transparent hover:border-aqua-100"
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
      <div className="bg-gray-50/50 border border-gray-100 rounded-[40px] p-10 mb-12 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-aqua-100/20 rounded-full blur-3xl -mr-32 -mt-32 transition-colors duration-700 group-hover:bg-aqua-200/30"></div>
        
        <h3 className="font-bold text-xl text-gray-900 mb-8 flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-aqua-600 text-xl shadow-soft border border-aqua-50">🧾</div>
          Order Analysis
        </h3>

        {tickets.length > 0 ? (
          <div className="space-y-6 relative z-10">
            {tickets.map((ticket) => {
              const ticketType = ticketTypes.find((t) => t.id === ticket.id);
              return ticketType ? (
                <div key={ticket.id} className="flex justify-between items-center py-4 border-b border-gray-100/50 last:border-0">
                  <span className="flex items-center gap-5 text-[11px] font-bold text-gray-900 uppercase tracking-widest">
                    <span className="bg-white border border-aqua-100 text-aqua-600 text-[10px] font-bold px-4 py-2 rounded-xl shadow-sm">{ticket.quantity}×</span>
                    {ticketType.name}
                  </span>
                  <span className="text-xl font-bold text-gray-900 tracking-tight">₹{ticketType.price * ticket.quantity}</span>
                </div>
              ) : null;
            })}
          </div>
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-[32px] bg-white/50 relative z-10">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">No allocations selected</p>
          </div>
        )}

        <div className="mt-8 pt-8 border-t-2 border-dashed border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Aggregate Amount</span>
          <div className="flex items-baseline gap-2">
             <span className="text-sm font-bold text-gray-400 uppercase">INR</span>
             <span className="text-5xl font-bold text-aqua-600 tracking-tighter">₹{totalAmount}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <Button
          variant="secondary"
          onClick={prevStep}
          className="flex-1 !rounded-[28px] !py-6 text-[11px] tracking-widest uppercase shadow-soft"
        >
          Change Schedule
        </Button>
        <Button
          onClick={nextStep}
          disabled={tickets.length === 0}
          className="flex-[2] !rounded-[28px] !py-6 text-[11px] tracking-widest uppercase shadow-xl"
        >
          Continue to Meals
          <FaArrowRight className="text-xs ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default TicketSelectionStep;
