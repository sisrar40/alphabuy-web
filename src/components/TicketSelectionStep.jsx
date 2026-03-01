import React, { useState } from "react";
import {
  FaArrowRight,
  FaArrowLeft,
  FaCheck,
  FaStar,
  FaUsers,
  FaBolt,
  FaCrown,
  FaGift,
  FaClock,
  FaTicketAlt,
  FaShoppingCart,
  FaPlus,
  FaMinus,
  FaChevronDown,
  FaChevronUp,
  FaShieldAlt,
  FaLock,
} from "react-icons/fa";
import { GiLifeBuoy, GiPalmTree, GiBeachBall } from "react-icons/gi";
import Button from "./ui/Button";

const TicketSelectionStep = ({
  bookingData,
  setBookingData,
  nextStep,
  prevStep,
}) => {
  const [tickets, setTickets] = useState(bookingData.tickets || []);
  const [showDetails, setShowDetails] = useState({});
  const [familyPackActive, setFamilyPackActive] = useState(false);
  const [groupDiscount, setGroupDiscount] = useState(false);

  const toggleDetails = (ticketId) => {
    setShowDetails((prev) => ({
      ...prev,
      [ticketId]: !prev[ticketId],
    }));
  };

  const ticketTypes = [
    {
      id: "adult",
      name: "Adult Premium Pass",
      description: "Ages 13+ years",
      price: 1199,
      originalPrice: 1399,
      discount: "14% OFF",
      features: [
        "All Rides Unlimited Access",
        "Wave Pool Entry",
        "Free Parking",
        "Locker Rental Included",
        "1 Complimentary Drink",
      ],
      popular: true,
      icon: <FaUsers className="text-blue-600" />,
      color: "from-blue-500 to-blue-600",
      bgColor: "blue",
      maxPerOrder: 10,
      ageGroup: "13+ years",
      rideAccess: "All 45+ Rides",
      benefits: ["Skip Line Access", "Free Locker", "Drink Included"],
    },
    {
      id: "child",
      name: "Child Adventure Pass",
      description: "Ages 3-12 years",
      price: 899,
      originalPrice: 1099,
      discount: "18% OFF",
      features: [
        "All Kid-Friendly Rides",
        "Kids Splash Zone Access",
        "Supervised Activities",
        "Life Jacket Included",
        "Kids Meal Voucher",
      ],
      icon: <GiBeachBall className="text-orange-600" />,
      color: "from-orange-500 to-orange-600",
      bgColor: "orange",
      maxPerOrder: 8,
      ageGroup: "3-12 years",
      rideAccess: "25+ Kids Rides",
      benefits: ["Supervised Play", "Life Jacket", "Kids Meal"],
    },
    {
      id: "senior",
      name: "Senior Splash Pass",
      description: "Ages 60+ years",
      price: 799,
      originalPrice: 999,
      discount: "20% OFF",
      features: [
        "All Rides Access",
        "Priority Seating Areas",
        "Medical Assistance Available",
        "Rest Areas Access",
        "Complimentary Tea/Coffee",
      ],
      icon: <GiLifeBuoy className="text-green-600" />,
      color: "from-green-500 to-green-600",
      bgColor: "green",
      maxPerOrder: 6,
      ageGroup: "60+ years",
      rideAccess: "All Relaxed Rides",
      benefits: ["Priority Seating", "Medical Support", "Tea Included"],
    },
    {
      id: "fastpass",
      name: "Fast Pass Pro",
      description: "Skip the lines",
      price: 1999,
      originalPrice: 2499,
      discount: "20% OFF",
      features: [
        "Skip All Waiting Lines",
        "Priority Boarding on Rides",
        "VIP Lounge Access",
        "Express Entry to Park",
        "Dedicated Support",
      ],
      popular: true,
      icon: <FaBolt className="text-yellow-600" />,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "yellow",
      maxPerOrder: 5,
      ageGroup: "All Ages",
      rideAccess: "Express Queue Access",
      benefits: ["Skip Lines", "VIP Lounge", "Express Entry"],
    },
    {
      id: "family",
      name: "Family Fun Pack",
      description: "2 Adults + 2 Kids",
      price: 3499,
      originalPrice: 4596,
      discount: "24% OFF",
      features: [
        "2 Adult + 2 Child Tickets",
        "Family Picnic Area",
        "Private Cabana (4 hours)",
        "Family Meal Deal",
        "Parking Included",
      ],
      icon: <GiPalmTree className="text-purple-600" />,
      color: "from-purple-500 to-purple-600",
      bgColor: "purple",
      maxPerOrder: 2,
      ageGroup: "Family Package",
      rideAccess: "All Family Rides",
      benefits: ["Private Cabana", "Meal Deal", "Parking"],
    },
    {
      id: "vip",
      name: "VIP Experience",
      description: "Royal Treatment",
      price: 4999,
      originalPrice: 6499,
      discount: "23% OFF",
      features: [
        "All Access Pass",
        "Personal Guide",
        "Gourmet Dining",
        "Spa Access",
        "Souvenir Package",
      ],
      icon: <FaCrown className="text-amber-600" />,
      color: "from-amber-500 to-amber-600",
      bgColor: "amber",
      maxPerOrder: 4,
      ageGroup: "All Ages",
      rideAccess: "VIP All Access",
      benefits: ["Personal Guide", "Gourmet Dining", "Spa Access"],
    },
  ];

  const updateTicketQuantity = (ticketId, quantity) => {
    if (quantity < 0) return;

    // Check max per order limit
    const ticket = ticketTypes.find((t) => t.id === ticketId);
    if (ticket && quantity > ticket.maxPerOrder) return;

    const updatedTickets = tickets.filter((t) => t.id !== ticketId);
    if (quantity > 0) {
      updatedTickets.push({ id: ticketId, quantity });
    }

    setTickets(updatedTickets);
    setBookingData((prev) => ({ ...prev, tickets: updatedTickets }));

    // Check for family pack activation
    const adultQty =
      updatedTickets.find((t) => t.id === "adult")?.quantity || 0;
    const childQty =
      updatedTickets.find((t) => t.id === "child")?.quantity || 0;
    setFamilyPackActive(adultQty >= 2 && childQty >= 2);

    // Check for group discount (5+ total tickets)
    const totalTickets = updatedTickets.reduce((sum, t) => sum + t.quantity, 0);
    setGroupDiscount(totalTickets >= 5);
  };

  const getTicketQuantity = (ticketId) => {
    const ticket = tickets.find((t) => t.id === ticketId);
    return ticket ? ticket.quantity : 0;
  };

  const calculateSubtotal = () => {
    return tickets.reduce((total, ticket) => {
      const ticketType = ticketTypes.find((t) => t.id === ticket.id);
      return total + (ticketType ? ticketType.price * ticket.quantity : 0);
    }, 0);
  };

  const calculateDiscount = () => {
    let discount = 0;
    const subtotal = calculateSubtotal();

    // Family pack discount (additional 10%)
    if (familyPackActive) {
      discount += subtotal * 0.1;
    }

    // Group discount (5+ tickets - additional 5%)
    if (groupDiscount) {
      discount += subtotal * 0.05;
    }

    return discount;
  };

  const totalAmount = calculateSubtotal();
  const totalDiscount = calculateDiscount();
  const finalAmount = totalAmount - totalDiscount;

  const getBgColorClass = (color) => {
    const colors = {
      blue: "from-blue-50 to-blue-100/50",
      orange: "from-orange-50 to-orange-100/50",
      green: "from-green-50 to-green-100/50",
      yellow: "from-yellow-50 to-yellow-100/50",
      purple: "from-purple-50 to-purple-100/50",
      amber: "from-amber-50 to-amber-100/50",
    };
    return colors[color] || "from-gray-50 to-gray-100/50";
  };

  return (
    <div className="bg-white rounded-4xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 p-8 relative overflow-hidden">
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
              <FaTicketAlt className="text-3xl text-white" />
            </div>
            <div>
              <span className="text-white/80 text-sm mb-1 block">
                Step 2 of 4
              </span>
              <h2 className="text-3xl font-bold text-white">
                Choose Your Tickets
              </h2>
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
        {/* Ticket Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {ticketTypes.map((ticket) => {
            const qty = getTicketQuantity(ticket.id);
            const isActive = qty > 0;

            return (
              <div
                key={ticket.id}
                className={`group relative bg-gradient-to-br ${getBgColorClass(ticket.bgColor)} rounded-3xl overflow-hidden transition-all duration-300 ${
                  isActive
                    ? "ring-4 ring-blue-500/20 shadow-2xl scale-[1.02]"
                    : "hover:shadow-xl hover:-translate-y-1"
                }`}
              >
                {/* Popular Badge */}
                {ticket.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                      <FaStar className="text-yellow-300" />
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Discount Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    {ticket.discount}
                  </span>
                </div>

                <div className="p-6">
                  {/* Icon and Title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${ticket.color} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg`}
                    >
                      {ticket.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{ticket.name}</h3>
                      <p className="text-xs text-gray-500">
                        {ticket.description}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-gray-900">
                        ₹{ticket.price}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        ₹{ticket.originalPrice}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      per person • {ticket.ageGroup}
                    </p>
                  </div>

                  {/* Quick Features */}
                  <div className="space-y-2 mb-4">
                    {ticket.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <FaCheck className="text-green-500 text-xs flex-shrink-0" />
                        <span className="text-xs text-gray-600">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* View Details Toggle */}
                  <button
                    onClick={() => toggleDetails(ticket.id)}
                    className="flex items-center gap-1 text-blue-600 text-xs font-medium mb-4 hover:underline"
                  >
                    <span>View all features</span>
                    {showDetails[ticket.id] ? (
                      <FaChevronUp className="text-xs" />
                    ) : (
                      <FaChevronDown className="text-xs" />
                    )}
                  </button>

                  {/* Detailed Features */}
                  {showDetails[ticket.id] && (
                    <div className="mb-4 p-4 bg-white/80 rounded-xl animate-in slide-in-from-top-2 duration-300">
                      <h4 className="text-xs font-bold text-gray-900 mb-2">
                        All Features:
                      </h4>
                      <ul className="space-y-2">
                        {ticket.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-xs text-gray-600"
                          >
                            <FaCheckCircle className="text-blue-500 text-xs mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-500">
                          <span className="font-bold">Ride Access:</span>{" "}
                          {ticket.rideAccess}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Quantity Selector */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-xs font-medium text-gray-500">
                      Max {ticket.maxPerOrder} per order
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateTicketQuantity(ticket.id, qty - 1)}
                        disabled={qty === 0}
                        className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      >
                        <FaMinus className="text-xs" />
                      </button>
                      <span className="w-8 text-center font-bold text-gray-900">
                        {qty}
                      </span>
                      <button
                        onClick={() => updateTicketQuantity(ticket.id, qty + 1)}
                        disabled={qty >= ticket.maxPerOrder}
                        className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      >
                        <FaPlus className="text-xs" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Tickets Summary */}
        {tickets.length > 0 && (
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-6 mb-8 animate-in slide-in-from-bottom-4 duration-500">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaShoppingCart className="text-blue-600" />
              Selected Tickets
            </h3>

            <div className="space-y-3 mb-4">
              {tickets.map((ticket) => {
                const ticketType = ticketTypes.find((t) => t.id === ticket.id);
                return ticketType ? (
                  <div
                    key={ticket.id}
                    className="flex items-center justify-between py-2 border-b border-blue-200/50 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-sm font-bold text-blue-600">
                        {ticket.quantity}×
                      </span>
                      <span className="font-medium text-gray-900">
                        {ticketType.name}
                      </span>
                    </div>
                    <span className="font-bold text-gray-900">
                      ₹{ticketType.price * ticket.quantity}
                    </span>
                  </div>
                ) : null;
              })}
            </div>

            {/* Discounts */}
            {(familyPackActive || groupDiscount) && (
              <div className="bg-green-50 rounded-xl p-4 mb-4">
                <h4 className="text-xs font-bold text-green-700 mb-2 flex items-center gap-1">
                  <FaGift className="text-green-600" />
                  Applied Discounts
                </h4>
                {familyPackActive && (
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-green-600">
                      Family Pack Discount (10%)
                    </span>
                    <span className="text-green-600 font-bold">
                      -₹{(totalAmount * 0.1).toFixed(0)}
                    </span>
                  </div>
                )}
                {groupDiscount && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-green-600">Group Discount (5%)</span>
                    <span className="text-green-600 font-bold">
                      -₹{(totalAmount * 0.05).toFixed(0)}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Total */}
            <div className="flex justify-between items-center pt-4 border-t-2 border-blue-200">
              <span className="font-bold text-gray-900">Total Amount</span>
              <div className="text-right">
                {totalDiscount > 0 && (
                  <span className="text-sm text-gray-500 line-through block">
                    ₹{totalAmount}
                  </span>
                )}
                <span className="text-2xl font-bold text-blue-600">
                  ₹{finalAmount}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Recommendations */}
        {tickets.length === 0 && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-6 mb-8 text-center">
            <FaStar className="text-3xl text-purple-500 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Recommended Combo</h3>
            <p className="text-sm text-gray-600 mb-4">
              Save 24% with our Family Fun Pack - includes 2 Adult + 2 Child
              tickets with private cabana!
            </p>
            <button
              onClick={() => {
                updateTicketQuantity("family", 1);
              }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
            >
              Add Family Pack
            </button>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <Button
            variant="secondary"
            onClick={prevStep}
            className="flex-1 !py-5 !rounded-2xl text-sm font-medium"
          >
            <FaArrowLeft className="mr-2" />
            Back to Date Selection
          </Button>
          <Button
            onClick={nextStep}
            disabled={tickets.length === 0}
            className="flex-[2] !py-5 !rounded-2xl text-sm font-bold bg-gradient-to-r from-blue-600 to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue to Add Meals
            <FaArrowRight className="ml-2" />
          </Button>
        </div>

        {/* Guarantee */}
        <div className="mt-6 flex items-center justify-center gap-6 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <FaShieldAlt className="text-green-500" />
            Secure Booking
          </span>
          <span className="flex items-center gap-1">
            <FaClock className="text-blue-500" />
            Instant Confirmation
          </span>
          <span className="flex items-center gap-1">
            <FaLock className="text-purple-500" />
            PCI Compliant
          </span>
        </div>
      </div>
    </div>
  );
};

export default TicketSelectionStep;
