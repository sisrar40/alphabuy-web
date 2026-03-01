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
import Button from "../components/ui/Button";
import { useRazorpay } from "react-razorpay";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const { Razorpay } = useRazorpay();
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

  const handleCheckout = () => {
    const options = {
      key: "rzp_test_SLwkA3iHaRKsMN", // Using the key provided by user in PaymentStep
      amount: Math.round(total * 100),
      currency: "INR",
      name: "Alphabuy Water Park",
      description: "Cart Checkout",
      image: "https://cdn-icons-png.flaticon.com/512/414/414927.png",
      handler: (response) => {
        console.log("Payment Successful:", response);
        // In a real app, we would verify payment on server and clear cart
        // For now, we redirect to success
        navigate("/booking-details", { 
          state: { 
            transactionId: response.razorpay_payment_id,
            amount: total.toFixed(2)
          } 
        });
      },
      prefill: {
        name: "Alphabuy Guest",
        email: "guest@alphabuy.in",
        contact: "9999999999",
      },
      theme: {
        color: "#0ea5e9",
      },
    };

    const rzp = new Razorpay(options);
    rzp.on("payment.failed", (response) => {
      alert("Payment Failed: " + response.error.description);
    });
    rzp.open();
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
        return "bg-blue-500/10 text-blue-600 border-blue-200";
      case "meal":
        return "bg-green-500/10 text-green-600 border-green-200";
      case "fastpass":
        return "bg-purple-500/10 text-purple-600 border-purple-200";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-200";
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--bg-color)] pt-20 transition-colors duration-300">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[var(--card-bg)] backdrop-blur-sm rounded-3xl p-10 border border-[var(--border-color)] text-center shadow-xl">
              <div className="w-24 h-24 mx-auto mb-8 bg-gray-100  rounded-full flex items-center justify-center">
                <FaShoppingCart className="text-4xl text-gray-400" />
              </div>
              <h2 className="text-3xl font-bold text-[var(--text-color)] mb-4">
                Your Cart is Empty
              </h2>
              <p className="text-[var(--text-color)] opacity-70 mb-8 max-w-md mx-auto">
                Looks like you haven't added any items to your cart yet. Discover great experiences and add them here!
              </p>
              <Button>Start Booking Tickets</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-color)] transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <h3 className="text-3xl font-bold text-[var(--text-color)] tracking-tight">Shopping Cart</h3>
            </div>
            <div className="flex items-center space-x-2 text-[var(--text-color)] opacity-70 font-medium">
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
              <div className="bg-[var(--card-bg)] shadow-md rounded-2xl border border-[var(--border-color)] overflow-hidden transition-colors duration-300">
                {/* Cart Header */}
                <div className="bg-gray-50  px-6 py-5 border-b border-[var(--border-color)]">
                  <h2 className="text-xl font-bold text-[var(--text-color)]">
                    Your Booking Items
                  </h2>
                  <p className="text-[var(--text-color)] opacity-60 text-sm mt-1">
                    Review and manage your selected items
                  </p>
                </div>

                {/* Cart Items List */}
                <div className="divide-y divide-[var(--border-color)]">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-6 hover:bg-gray-50  transition-colors"
                    >
                      <div className="flex items-start space-x-5">
                        {/* Item Icon */}
                        <div
                          className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-sm ${getTypeColor(
                            item.type
                          )}`}
                        >
                          {getItemIcon(item.type)}
                        </div>

                        {/* Item Details */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-bold text-[var(--text-color)] text-lg">
                                {item.name}
                              </h3>
                              <p className="text-[var(--text-color)] opacity-70 text-sm font-medium">
                                {item.description}
                              </p>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-600   bg-red-50  rounded-lg p-2 transition-colors cursor-pointer"
                              aria-label="Remove item"
                            >
                              <FaTrash />
                            </button>
                          </div>

                          {/* Date and Features */}
                          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                            <div className="flex items-center text-sm font-semibold text-[var(--text-color)] opacity-80 bg-[var(--input-bg)] px-3 py-1.5 rounded-lg border border-[var(--border-color)] w-fit">
                              <FaCalendarAlt className="mr-2 text-blue-500" />
                              {new Date(item.date).toLocaleDateString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {item.features
                                .slice(0, 2)
                                .map((feature, index) => (
                                  <span
                                    key={index}
                                    className="px-2.5 py-1 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-lg text-xs font-semibold text-[var(--text-color)] opacity-70"
                                  >
                                    {feature}
                                  </span>
                                ))}
                              {item.features.length > 2 && (
                                <span className="px-2.5 py-1 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-lg text-xs font-semibold text-[var(--text-color)] opacity-70">
                                  +{item.features.length - 2} more
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Quantity and Price */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-xl p-1 shadow-sm">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-color)] hover:bg-gray-200  transition-colors cursor-pointer"
                              >
                                <FaMinus className="text-xs" />
                              </button>
                              <span className="font-bold text-[var(--text-color)] w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-color)] hover:bg-gray-200  transition-colors cursor-pointer"
                              >
                                <FaPlus className="text-xs" />
                              </button>
                            </div>

                            <div className="text-right">
                              <div className="flex items-baseline space-x-2">
                                <span className="text-2xl font-bold text-green-600 ">
                                  ₹{item.price * item.quantity}
                                </span>
                                {item.originalPrice > item.price && (
                                  <span className="text-sm font-semibold text-[var(--text-color)] opacity-40 line-through">
                                    ₹{item.originalPrice * item.quantity}
                                  </span>
                                )}
                              </div>
                              <div className="text-sm font-medium text-[var(--text-color)] opacity-60">
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
              <div className="bg-[var(--card-bg)] shadow-md border border-[var(--border-color)] rounded-2xl p-6 md:p-8 mt-6 transition-colors duration-300">
                <h3 className="font-bold text-lg text-[var(--text-color)] mb-4 flex items-center gap-2">
                   🏷️ Apply Promo Code
                </h3>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    className="flex-1 px-4 py-3 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-xl text-[var(--text-color)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 uppercase font-semibold tracking-wide shadow-inner"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-bold tracking-wide hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-md shadow-purple-600/20"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <div
                    className={`mt-4 p-4 rounded-xl font-medium border ${
                      appliedPromo.discount > 0
                        ? "bg-green-50  border-green-200  text-green-700 "
                        : "bg-red-50  border-red-200  text-red-700 "
                    }`}
                  >
                    {appliedPromo.message}
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[var(--card-bg)] shadow-lg rounded-2xl p-6 md:p-8 border border-[var(--border-color)] sticky top-24 transition-colors duration-300">
                <h3 className="text-2xl font-bold text-[var(--text-color)] mb-6 border-b border-[var(--border-color)] pb-4">
                  Order Summary
                </h3>

                {/* Booking Details */}
                <div className="bg-blue-50  border border-blue-100  rounded-xl p-5 mb-6">
                  <h4 className="font-bold text-blue-800  mb-4 text-sm uppercase tracking-wider">
                    Booking Details
                  </h4>
                  <div className="space-y-3 text-sm font-medium text-blue-900  opacity-90">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-3 text-blue-500 text-lg" />
                      <span>
                        Visit Date:{" "}
                        {new Date(cartItems[0].date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FaClock className="mr-3 text-blue-500 text-lg" />
                      <span>Park Hours: 10:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-3 text-blue-500 text-lg" />
                      <span>Adventure City Theme Park</span>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-4 mb-6 px-2">
                  <div className="flex justify-between text-[var(--text-color)] font-medium">
                    <span className="opacity-70">Subtotal</span>
                    <span className="font-bold border-b border-dashed border-[var(--border-color)]">₹{subtotal}</span>
                  </div>

                  {appliedPromo && appliedPromo.discount > 0 && (
                    <div className="flex justify-between text-green-600  font-bold">
                      <span>Discount ({appliedPromo.discount}%)</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[var(--text-color)] font-medium">
                    <span className="opacity-70">Tax (18%)</span>
                    <span className="font-bold border-b border-dashed border-[var(--border-color)]">₹{tax.toFixed(2)}</span>
                  </div>

                  <div className="border-t-2 border-dashed border-[var(--border-color)] pt-4 mt-2 flex justify-between items-center">
                    <span className="text-lg font-bold text-[var(--text-color)]">Total Amount</span>
                    <span className="text-3xl font-bold text-[var(--text-color)] tracking-tight">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Savings */}
                <div className="bg-green-50  border border-green-200  rounded-xl p-4 mb-8 flex justify-between items-center shadow-inner">
                  <span className="text-green-800  font-bold text-sm">You Save</span>
                  <span className="text-green-600  font-bold text-lg">
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

                <div className="space-y-4">
                  <Button 
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg shadow-blue-600/20"
                  >
                    Proceed to Checkout
                  </Button>
                  <button className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] text-[var(--text-color)] py-4 rounded-xl font-bold hover:bg-gray-100  transition-all duration-300 shadow-sm cursor-pointer">
                    Continue Shopping
                  </button>
                </div>

                {/* Security Badge */}
                <div className="text-center mt-8 pt-6 border-t border-[var(--border-color)]">
                  <div className="flex flex-col items-center justify-center text-[var(--text-color)] opacity-60 text-xs font-semibold space-y-2">
                    <div className="flex items-center space-x-2">
                      <FaCreditCard className="text-green-500 text-lg" />
                      <span>Secure Payment</span>
                    </div>
                    <span>256-bit SSL Encrypted Transaction</span>
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
