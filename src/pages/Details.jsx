import React, { useState } from "react";
import Button from "../components/ui/Button";

import { useAppNavigation } from "../hooks/useAppNavigation";
import { FaBaby, FaBath, FaCamera, FaCheckCircle, FaChevronDown, FaChevronLeft, FaChevronRight, FaChild, FaClock, FaCoffee, FaEnvelope, FaExpand, FaFacebookF, FaFirstAid, FaHeart, FaIceCream, FaLaptop, FaLifeRing, FaLocationArrow, FaLock, FaMapMarkerAlt, FaMobileAlt, FaParking, FaPhone, FaRegCalendarAlt, FaShare, FaShieldAlt, FaShoppingBag, FaShower, FaStar, FaSun, FaTimes, FaTshirt, FaTwitter, FaUmbrellaBeach, FaUsers, FaUtensils, FaWater, FaWhatsapp, FaWheelchair, FaWifi } from "react-icons/fa";

function Details() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isFavorite, setIsFavorite] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [visitorCount, setVisitorCount] = useState(2);
  const { navigateTo } = useAppNavigation();

  const productDetails = {
    id: "aqua-zen-001",
    title: "AquaZen Paradise",
    subtitle: "Ultimate Water Adventure & Family Destination",
    price: "₹1,296.82",
    originalPrice: "₹2,499",
    discount: "48% OFF",
    period: "per person",
    rating: 4.9,
    reviews: "1.2k+",
    location: "Lonavala, Maharashtra",
    distance: "45 km from city center",
    availability: "30+ slots today",
    badge: "Premium Pick",
    badgeColor: "from-amber-500 to-yellow-500",
    highlights: [
      "Asia's largest wave pool",
      "12 high-thrill water slides",
      "1 km lazy river",
      "Kids aqua play zone",
      "Private cabanas",
      "Multi-cuisine food court"
    ],
    images: [
      "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1000&auto=format&fit=crop"
    ],
  };

  const specifications = [
    { icon: <FaWater />, label: "Park Type", value: "Water Park + Resort" },
    { icon: <FaChild />, label: "Age Group", value: "All Ages (3-80)" },
    { icon: <FaClock />, label: "Operating Hours", value: "10:00 AM - 8:00 PM" },
    { icon: <FaUsers />, label: "Capacity", value: "5000 Visitors/Day" },
    { icon: <FaShieldAlt />, label: "Safety Rating", value: "ISO 9001 Certified" },
    { icon: <FaUmbrellaBeach />, label: "Area", value: "50 Acres" },
    { icon: <FaParking />, label: "Parking", value: "Free Valet Available" },
    { icon: <FaUtensils />, label: "Food Courts", value: "7 Multi-Cuisine" },
    { icon: <FaLock />, label: "Lockers", value: "Premium Available" },
    { icon: <FaTshirt />, label: "Swimwear", value: "Rental Available" },
    { icon: <FaWifi />, label: "WiFi", value: "Free Throughout" },
    { icon: <FaCamera />, label: "Photography", value: "Professional Available" }
  ];

  const amenities = [
    { icon: <FaParking />, name: "Free Parking", included: true },
    { icon: <FaLock />, name: "Lockers", included: true },
    { icon: <FaBath />, name: "Changing Rooms", included: true },
    { icon: <FaShower />, name: "Hot Showers", included: true },
    { icon: <FaBaby />, name: "Baby Care Room", included: true },
    { icon: <FaWheelchair />, name: "Wheelchair Access", included: true },
    { icon: <FaFirstAid />, name: "First Aid Station", included: true },
    { icon: <FaLifeRing />, name: "Lifeguards", included: true },
    { icon: <FaUtensils />, name: "Restaurants", included: true },
    { icon: <FaIceCream />, name: "Ice Cream Parlor", included: true },
    { icon: <FaCoffee />, name: "Café", included: true },
    { icon: <FaShoppingBag />, name: "Gift Shop", included: true }
  ];

  const faqItems = [
    {
      question: "What should I carry for the water park?",
      answer: "We recommend comfortable swimwear (nylon/lycra), sunscreen, sunglasses, and a change of clothes. Towels and lockers are available for rent at the venue. Water shoes are recommended for comfort.",
    },
    {
      question: "Are outside food and beverages allowed?",
      answer: "For hygiene and safety reasons, outside food and beverages are not permitted inside the park. We have multiple multi-cuisine food courts, cafes, and snack bars offering a variety of options.",
    },
    {
      question: "Is there a group discount available?",
      answer: "Yes! We offer special rates for groups of 20 or more. Corporate events, school trips, and large family gatherings can contact our sales team for customized packages and exclusive discounts.",
    },
    {
      question: "What safety measures are in place?",
      answer: "Our park is ISO 9001 certified with 200+ trained lifeguards, regular water quality testing, CCTV surveillance, and first aid stations. All rides undergo daily safety checks.",
    },
    {
      question: "Can I reschedule or cancel my booking?",
      answer: "Yes, you can reschedule up to 24 hours before your visit at no cost. Cancellations made 48 hours in advance are eligible for a full refund. Last-minute changes may incur fees.",
    }
  ];

  const timeSlots = [
    "10:00 AM - 12:00 PM",
    "12:30 PM - 2:30 PM",
    "3:00 PM - 5:00 PM",
    "5:30 PM - 7:30 PM"
  ];

  const reviews = [
    {
      id: 1,
      name: "Rahul Sharma",
      avatar: "https://i.pravatar.cc/100?img=7",
      rating: 5,
      date: "2 days ago",
      comment: "Absolutely fantastic experience! The slides were thrilling and well-maintained. The wave pool is massive. Staff was extremely helpful. My family had the best weekend ever!",
      helpful: 24
    },
    {
      id: 2,
      name: "Priya Patel",
      avatar: "https://i.pravatar.cc/100?img=5",
      rating: 5,
      date: "1 week ago",
      comment: "Cleanest water park I've ever visited. The lazy river is so relaxing, and the kids' zone is perfect for young children. Food court had great variety. Will definitely come back!",
      helpful: 18
    },
    {
      id: 3,
      name: "Amit Kumar",
      avatar: "https://i.pravatar.cc/100?img=8",
      rating: 4,
      date: "2 weeks ago",
      comment: "Great place for family outing. The slides are exciting. Only suggestion: more shaded areas would be nice. Otherwise, wonderful experience!",
      helpful: 12
    }
  ];

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out ${productDetails.title} on WaterParks!`;
    
    switch(platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
        break;
      default:
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
    }
    setShowShareModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-cyan-50">
      {/* Hero Gallery Section */}
      <section className="relative h-[600px] lg:h-[700px] overflow-hidden bg-gray-900">
        {/* Main Image */}
        <div className="absolute inset-0">
          <img
            src={productDetails.images[selectedImage]}
            alt={productDetails.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        {/* Image Navigation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {productDetails.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                selectedImage === index
                  ? "w-8 bg-white"
                  : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setSelectedImage((prev) => (prev === 0 ? productDetails.images.length - 1 : prev - 1))}
          className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all z-20"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={() => setSelectedImage((prev) => (prev === productDetails.images.length - 1 ? 0 : prev + 1))}
          className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all z-20"
        >
          <FaChevronRight />
        </button>

        {/* Expand Button */}
        <button
          onClick={() => setShowGalleryModal(true)}
          className="absolute top-8 right-8 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all z-20"
        >
          <FaExpand />
        </button>

        {/* Badge */}
        <div className={`absolute top-8 left-8 bg-gradient-to-r ${productDetails.badgeColor} text-white px-6 py-3 rounded-2xl font-bold shadow-xl z-20`}>
          {productDetails.badge}
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-16 left-0 right-0 z-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.1]">
                  {productDetails.title}
                </h1>
                <p className="text-xl text-white/80 max-w-2xl">
                  {productDetails.subtitle}
                </p>
                <div className="flex items-center gap-6 text-white/70">
                  <span className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-blue-400" />
                    {productDetails.location}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/30"></span>
                  <span className="flex items-center gap-2">
                    <FaStar className="text-yellow-400" />
                    {productDetails.rating} ({productDetails.reviews} reviews)
                  </span>
                </div>
              </div>

              {/* Weather Widget */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <FaSun className="text-3xl text-yellow-300" />
                    <div>
                      <div className="text-2xl font-bold text-white">32°C</div>
                      <div className="text-xs text-white/70">Sunny</div>
                    </div>
                  </div>
                  <div className="h-8 w-px bg-white/20"></div>
                  <div>
                    <div className="text-sm font-bold text-white">Perfect Day</div>
                    <div className="text-xs text-white/70">For Water Fun</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all ${
                  isFavorite
                    ? "bg-red-500 text-white shadow-lg"
                    : "bg-white border-2 border-gray-200 text-gray-600 hover:border-red-400 hover:text-red-500"
                }`}
              >
                <FaHeart className={isFavorite ? "fill-current" : ""} />
                {isFavorite ? "Saved" : "Save to Wishlist"}
              </button>

              <button
                onClick={() => setShowShareModal(true)}
                className="flex items-center gap-3 px-8 py-4 bg-white border-2 border-gray-200 text-gray-600 rounded-2xl font-bold hover:border-blue-400 hover:text-blue-600 transition-all"
              >
                <FaShare />
                Share
              </button>

              <button className="flex items-center gap-3 px-8 py-4 bg-white border-2 border-gray-200 text-gray-600 rounded-2xl font-bold hover:border-green-400 hover:text-green-600 transition-all">
                <FaPhone />
                Contact
              </button>
            </div>

            {/* Quick Highlights */}
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Highlights</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {productDetails.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-500 text-lg flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
              <div className="flex border-b border-gray-100">
                {[
                  { id: "overview", label: "Overview", icon: <FaWater /> },
                  { id: "specs", label: "Specifications", icon: <FaShieldAlt /> },
                  { id: "amenities", label: "Amenities", icon: <FaUmbrellaBeach /> },
                  { id: "reviews", label: "Reviews", icon: <FaStar /> },
                  { id: "faq", label: "FAQ", icon: <FaClock /> }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-bold transition-all ${
                      activeTab === tab.id
                        ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-8">
                {activeTab === "overview" && (
                  <div className="space-y-6 animate-in fade-in duration-500">
                    <h3 className="text-xl font-bold text-gray-900">About the Park</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Dive into the most exhilarating water adventure at Lonavala's premier destination. 
                      AquaZen Paradise spans across 50 acres of pristine water attractions, featuring 
                      Asia's largest wave pool, 12 high-thrill water slides, a 1 km lazy river, and 
                      dedicated kids' aqua play zone. Our park is internationally certified for safety 
                      and offers a premium resort-like experience with private cabanas, multi-cuisine 
                      dining, and professional photography services.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      Whether you're seeking adrenaline-pumping slides or a relaxing day by the wave 
                      pool, AquaZen has something for everyone. Our trained lifeguards ensure your 
                      safety while you create unforgettable memories with family and friends.
                    </p>
                  </div>
                )}

                {activeTab === "specs" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-500">
                    {specifications.map((spec, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white text-lg">
                          {spec.icon}
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">{spec.label}</div>
                          <div className="font-bold text-gray-900">{spec.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "amenities" && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-in fade-in duration-500">
                    {amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <div className={`text-xl ${amenity.included ? 'text-green-500' : 'text-gray-400'}`}>
                          {amenity.icon}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{amenity.name}</span>
                        {amenity.included && (
                          <FaCheckCircle className="text-green-500 text-xs ml-auto" />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-6 animate-in fade-in duration-500">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="text-3xl font-bold text-gray-900">{productDetails.rating}</div>
                        <div className="flex items-center gap-1">
                          {[1,2,3,4,5].map((star) => (
                            <FaStar key={star} className={`text-lg ${star <= productDetails.rating ? 'text-yellow-400' : 'text-gray-200'}`} />
                          ))}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">Based on {productDetails.reviews} reviews</div>
                    </div>

                    {reviews.map((review) => (
                      <div key={review.id} className="bg-gray-50 rounded-2xl p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full" />
                          <div>
                            <h4 className="font-bold text-gray-900">{review.name}</h4>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                {[1,2,3,4,5].map((star) => (
                                  <FaStar key={star} className={`text-xs ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                                ))}
                              </div>
                              <span className="text-xs text-gray-400">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-3">{review.comment}</p>
                        <button className="text-sm text-blue-600 font-bold hover:underline">
                          Helpful ({review.helpful})
                        </button>
                      </div>
                    ))}

                    <button className="w-full py-4 border-2 border-gray-200 rounded-2xl font-bold text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-all">
                      View All Reviews
                    </button>
                  </div>
                )}

                {activeTab === "faq" && (
                  <div className="space-y-4 animate-in fade-in duration-500">
                    {faqItems.map((faq, index) => (
                      <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden">
                        <button
                          onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                          className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-all"
                        >
                          <span className="font-bold text-gray-900">{faq.question}</span>
                          <FaChevronDown className={`text-gray-400 transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`} />
                        </button>
                        {expandedFaq === index && (
                          <div className="px-6 pb-6">
                            <p className="text-gray-600">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Price Card */}
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm opacity-90">Starting from</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">
                      {productDetails.discount}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black">{productDetails.price}</span>
                    <span className="text-sm opacity-90">{productDetails.period}</span>
                  </div>
                  <div className="text-sm opacity-75 line-through mt-1">
                    {productDetails.originalPrice}
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Date Selection */}
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                      Select Date
                    </label>
                    <div className="relative">
                      <FaRegCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-blue-400 focus:outline-none transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                      Select Time Slot
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((slot, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedTime(slot)}
                          className={`px-3 py-3 rounded-xl text-xs font-bold transition-all ${
                            selectedTime === slot
                              ? "bg-blue-600 text-white"
                              : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Visitor Count */}
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                      Number of Visitors
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setVisitorCount(Math.max(1, visitorCount - 1))}
                        className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-xl font-bold hover:bg-gray-200 transition-all"
                      >
                        -
                      </button>
                      <div className="flex-1 text-center">
                        <span className="text-2xl font-bold text-gray-900">{visitorCount}</span>
                        <span className="text-sm text-gray-500 ml-1">persons</span>
                      </div>
                      <button
                        onClick={() => setVisitorCount(Math.min(10, visitorCount + 1))}
                        className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-xl font-bold hover:bg-gray-200 transition-all"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Price Summary */}
                  <div className="bg-blue-50 rounded-2xl p-5 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Ticket Price</span>
                      <span className="font-bold text-gray-900">{productDetails.price}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">× {visitorCount} Person(s)</span>
                      <span className="font-bold text-gray-900">
                        ₹{(parseInt(productDetails.price.replace(/[^0-9]/g, '')) * visitorCount).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Taxes & Fees</span>
                      <span className="font-bold text-gray-900">₹499</span>
                    </div>
                    <div className="border-t border-blue-200 pt-3">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-900">Total</span>
                        <span className="text-2xl font-black text-blue-600">
                          ₹{(parseInt(productDetails.price.replace(/[^0-9]/g, '')) * visitorCount + 499).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Book Button */}
                  <Button
                    onClick={() => navigateTo("/booking")}
                    className="w-full !py-5 !rounded-2xl text-base font-bold bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-xl"
                  >
                    Proceed to Book
                  </Button>

                  {/* Availability */}
                  <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    {productDetails.availability}
                  </div>

                  {/* Trust Badges */}
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100">
                    <div className="text-center">
                      <FaShieldAlt className="text-blue-500 text-xl mx-auto mb-1" />
                      <span className="text-[10px] font-bold text-gray-500">Secure Payment</span>
                    </div>
                    <div className="text-center">
                      <FaClock className="text-blue-500 text-xl mx-auto mb-1" />
                      <span className="text-[10px] font-bold text-gray-500">Instant Confirmation</span>
                    </div>
                    <div className="text-center">
                      <FaMobileAlt className="text-blue-500 text-xl mx-auto mb-1" />
                      <span className="text-[10px] font-bold text-gray-500">Mobile Ticket</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="bg-white rounded-3xl shadow-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">Location</h3>
                <div className="flex items-start gap-3 mb-4">
                  <FaMapMarkerAlt className="text-blue-500 text-xl flex-shrink-0" />
                  <div>
                    <p className="font-bold text-gray-900">{productDetails.location}</p>
                    <p className="text-sm text-gray-500">{productDetails.distance}</p>
                  </div>
                </div>
                <div className="bg-gray-100 h-40 rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1569336415962-a4bd9f69c07b?q=80&w=1000&auto=format&fit=crop" 
                    alt="Map"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="w-full mt-4 py-3 text-blue-600 font-bold hover:underline text-sm">
                  Get Directions <FaLocationArrow className="inline ml-1" />
                </button>
              </div>

              {/* Contact Card */}
              <div className="bg-white rounded-3xl shadow-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">Need Help?</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center gap-3 p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all">
                    <FaPhone className="text-blue-600" />
                    <span className="font-medium text-gray-900">Call Support</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-all">
                    <FaWhatsapp className="text-green-600 text-xl" />
                    <span className="font-medium text-gray-900">WhatsApp</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 bg-purple-50 rounded-xl hover:bg-purple-100 transition-all">
                    <FaEnvelope className="text-purple-600" />
                    <span className="font-medium text-gray-900">Email Us</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => setShowShareModal(false)}></div>
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-in zoom-in-95 duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Share this Park</h3>
            <div className="grid grid-cols-4 gap-4 mb-8">
              <button
                onClick={() => handleShare('facebook')}
                className="p-4 bg-blue-100 text-blue-600 rounded-2xl hover:bg-blue-200 transition-all"
              >
                <FaFacebookF className="text-2xl mx-auto" />
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="p-4 bg-sky-100 text-sky-600 rounded-2xl hover:bg-sky-200 transition-all"
              >
                <FaTwitter className="text-2xl mx-auto" />
              </button>
              <button
                onClick={() => handleShare('whatsapp')}
                className="p-4 bg-green-100 text-green-600 rounded-2xl hover:bg-green-200 transition-all"
              >
                <FaWhatsapp className="text-2xl mx-auto" />
              </button>
              <button
                onClick={() => handleShare('copy')}
                className="p-4 bg-gray-100 text-gray-600 rounded-2xl hover:bg-gray-200 transition-all"
              >
                <FaLaptop className="text-2xl mx-auto" />
              </button>
            </div>
            <button
              onClick={() => setShowShareModal(false)}
              className="w-full py-4 border-2 border-gray-200 rounded-2xl font-bold text-gray-600 hover:border-gray-300 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Gallery Modal */}
      {showGalleryModal && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setShowGalleryModal(false)}
            className="absolute top-8 right-8 text-white/70 hover:text-white text-2xl z-10"
          >
            <FaTimes />
          </button>
          
          <div className="max-w-7xl mx-auto">
            <img
              src={productDetails.images[selectedImage]}
              alt="Gallery"
              className="max-h-[80vh] mx-auto rounded-2xl"
            />
            
            <div className="flex justify-center gap-4 mt-8">
              {productDetails.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-blue-500 scale-110' : 'border-transparent opacity-50'
                  }`}
                >
                  <img src={img} alt={`Thumb ${index}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;