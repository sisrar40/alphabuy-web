import React, { useState } from "react";
import {
  FaShoppingCart,
  FaTrash,
  FaPlus,
  FaMinus,
  FaArrowLeft,
  FaCreditCard,
  FaTicketAlt,
  FaUtensils,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import Button from "../components/Button";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      type: "ticket",
      name: "Adult Ticket",
      description: "Ages 13+ years - Full park access",
      date: "2025-09-27",
      quantity: 2,
      price: 1199,
      originalPrice: 1399,
      image: "/api/placeholder/100/100",
      features: ["All Rides Access", "Water Park Entry", "Free Parking"],
    },
    {
      id: 2,
      type: "ticket",
      name: "Child Ticket",
      description: "Ages 3-12 years - Supervised activities",
      date: "2025-09-27",
      quantity: 1,
      price: 899,
      originalPrice: 1099,
      image: "/api/placeholder/100/100",
      features: ["Kids Zone Access", "Supervised Activities", "Child Meals"],
    },
    {
      id: 3,
      type: "meal",
      name: "Premium Meal Plan",
      description: "Lunch + Dinner + Unlimited Beverages",
      date: "2025-09-27",
      quantity: 3,
      price: 599,
      originalPrice: 799,
      image: "/api/placeholder/100/100",
      features: [
        "Multi-cuisine Buffet",
        "Unlimited Drinks",
        "Premium Desserts",
      ],
    },
    {
      id: 4,
      type: "fastpass",
      name: "Fast Pass Pro",
      description: "Skip waiting lines - Priority access",
      date: "2025-09-27",
      quantity: 2,
      price: 1999,
      originalPrice: 2499,
      image: "/api/placeholder/100/100",
      features: ["Skip All Lines", "VIP Lounge Access", "Priority Seating"],
    },
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);

  // Calculate totals
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const discount = appliedPromo ? subtotal * 0.1 : 0; // 10% discount for demo
  const tax = (subtotal - discount) * 0.18;
  const total = subtotal - discount + tax;

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.trim() === "SAVE10") {
      setAppliedPromo({
        code: "SAVE10",
        discount: 10,
        message: "10% discount applied!",
      });
    } else {
      setAppliedPromo({
        code: promoCode,
        discount: 0,
        message: "Invalid promo code",
      });
    }
  };

  const getItemIcon = (type) => {
    switch (type) {
      case "ticket":
        return <FaTicketAlt className="text-blue-400" />;
      case "meal":
        return <FaUtensils className="text-green-400" />;
      case "fastpass":
        return <FaCreditCard className="text-purple-400" />;
      default:
        return <FaShoppingCart className="text-gray-400" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "ticket":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "meal":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "fastpass":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-700/50 rounded-full flex items-center justify-center">
                <FaShoppingCart className="text-4xl text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Your Cart is Empty
              </h2>
              <p className="text-gray-400 mb-6">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Button>Start Booking Tickets</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <h3 className="text-3xl font-bold text-white">Shopping Cart</h3>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <FaShoppingCart />
              <span>
                {cartItems.reduce((total, item) => total + item.quantity, 0)}{" "}
                items
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
                {/* Cart Header */}
                <div className="bg-gray-700/50 px-6 py-4 border-b border-gray-600/50">
                  <h2 className="text-xl font-semibold text-white">
                    Your Booking Items
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Review and manage your selected items
                  </p>
                </div>

                {/* Cart Items List */}
                <div className="divide-y divide-gray-700/50">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-6 hover:bg-gray-700/20 transition-colors"
                    >
                      <div className="flex items-start space-x-4">
                        {/* Item Icon */}
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center ${getTypeColor(
                            item.type
                          )}`}
                        >
                          {getItemIcon(item.type)}
                        </div>

                        {/* Item Details */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-white text-lg">
                                {item.name}
                              </h3>
                              <p className="text-gray-400 text-sm">
                                {item.description}
                              </p>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-red-400 hover:text-red-300 transition-colors p-2"
                              aria-label="Remove item"
                            >
                              <FaTrash />
                            </button>
                          </div>

                          {/* Date and Features */}
                          <div className="flex items-center space-x-4 mb-3">
                            <div className="flex items-center text-sm text-gray-400">
                              <FaCalendarAlt className="mr-2" />
                              {new Date(item.date).toLocaleDateString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {item.features
                                .slice(0, 2)
                                .map((feature, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-gray-700/50 rounded text-xs text-gray-300"
                                  >
                                    {feature}
                                  </span>
                                ))}
                              {item.features.length > 2 && (
                                <span className="px-2 py-1 bg-gray-700/50 rounded text-xs text-gray-300">
                                  +{item.features.length - 2} more
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Quantity and Price */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                              >
                                <FaMinus className="text-xs" />
                              </button>
                              <span className="font-semibold text-white w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                              >
                                <FaPlus className="text-xs" />
                              </button>
                            </div>

                            <div className="text-right">
                              <div className="flex items-baseline space-x-2">
                                <span className="text-xl font-bold text-green-400">
                                  ₹{item.price * item.quantity}
                                </span>
                                {item.originalPrice > item.price && (
                                  <span className="text-sm text-gray-400 line-through">
                                    ₹{item.originalPrice * item.quantity}
                                  </span>
                                )}
                              </div>
                              <div className="text-sm text-gray-400">
                                ₹{item.price} each
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Promo Code Section */}
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 mt-6">
                <h3 className="font-semibold text-white mb-4">
                  Apply Promo Code
                </h3>
                <div className="flex space-x-4">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    className="flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <div
                    className={`mt-3 p-3 rounded-lg ${
                      appliedPromo.discount > 0
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {appliedPromo.message}
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 sticky top-24">
                <h3 className="text-xl font-semibold text-white mb-6">
                  Order Summary
                </h3>

                {/* Booking Details */}
                <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-white mb-3">
                    Booking Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-300">
                      <FaCalendarAlt className="mr-3 text-blue-400" />
                      <span>
                        Visit Date:{" "}
                        {new Date(cartItems[0].date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <FaClock className="mr-3 text-green-400" />
                      <span>Park Hours: 10:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <FaMapMarkerAlt className="mr-3 text-red-400" />
                      <span>Adventure City Theme Park</span>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>

                  {appliedPromo && appliedPromo.discount > 0 && (
                    <div className="flex justify-between text-green-400">
                      <span>Discount ({appliedPromo.discount}%)</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-300">
                    <span>Tax (18%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>

                  <div className="border-t border-gray-600 pt-3 flex justify-between text-lg font-semibold text-white">
                    <span>Total Amount</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Savings */}
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 mb-6">
                  <div className="flex justify-between text-green-400 text-sm">
                    <span>You Save</span>
                    <span>
                      ₹
                      {(
                        cartItems.reduce(
                          (total, item) =>
                            total +
                            (item.originalPrice - item.price) * item.quantity,
                          0
                        ) + discount
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300">
                    Proceed to Checkout
                  </Button>
                  <button className="w-full border border-gray-600 text-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-700/50 transition-all duration-300">
                    Continue Shopping
                  </button>
                </div>

                {/* Security Badge */}
                <div className="text-center mt-6 pt-6 border-t border-gray-600/50">
                  <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
                    <FaCreditCard className="text-green-400" />
                    <span>Secure Payment • 256-bit SSL Encrypted</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
