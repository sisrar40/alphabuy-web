import React, { useState, useEffect, useRef } from "react";
import {
  FaTicketAlt,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaUsers,
  FaArrowRight,
  FaCheckCircle,
  FaChevronDown,
  FaWater,
  FaCalendarAlt,
  FaChild,
  FaSwimmer,
  FaSun,
  FaPlayCircle,
  FaHeart,
  FaChevronLeft,
  FaChevronRight,
  FaExpand,
  FaClock,
  FaStar,
  FaHeadset,
  FaBolt,
  FaTree,
  FaUmbrellaBeach,
  FaMountain,
} from "react-icons/fa";
import { WiDaySunny } from "react-icons/wi";
import { GiSpeedBoat, GiLifeBuoy, GiPalmTree } from "react-icons/gi";
import { MdDiscount, MdVerified, MdSupportAgent, MdAttractions } from "react-icons/md";
import { RiRocketFill } from "react-icons/ri";
import Button from "../components/ui/Button";
import { useAppNavigation } from "../hooks/useAppNavigation";
import ImageCarousel from "../components/ImageCarousel";

// Asset paths with high-quality water park images
const HERO_SLIDES = [
  "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format&fit=crop",
];

import { useSelector, useDispatch } from "react-redux";
import { setBookingDate, setBookingParkId } from "../store/bookingSlice";
import { fetchParks } from "../features/parks/parkSlice";
import { useAlert } from '../context/AlertContext';

function Landing() {
  const dispatch = useDispatch();
  const { items: parksData, status } = useSelector((state) => state.parks);
  const { showAlert } = useAlert();
  const parksFromRedux = parksData || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(fetchParks());
  }, [dispatch]);

  const WATER_PARKS_DATA = (parksFromRedux?.length || 0) > 0 ? parksFromRedux : [];
  const { navigateTo } = useAppNavigation();
  const [selectedPark, setSelectedPark] = useState(null);
  const [showParkDropdown, setShowParkDropdown] = useState(false);
  const parkDropdownRef = useRef(null);
  const reelScrollRef = useRef(null);

  const scrollReels = (direction) => {
    if (reelScrollRef.current) {
      const scrollAmount = 340;
      reelScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Splash Reels data
  const REELS = [
    { title: "Water Slide Fun", views: "12.4K", poster: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?q=80&w=400&auto=format&fit=crop" },
    { title: "Wave Pool Vibes", views: "8.2K", poster: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=400&auto=format&fit=crop" },
    { title: "Family Day Out", views: "15.1K", poster: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=400&auto=format&fit=crop" },
    { title: "Roller Coaster Rush", views: "20.5K", poster: "https://images.unsplash.com/photo-1513889959013-c517500d4408?q=80&w=400&auto=format&fit=crop" },
    { title: "Night Light Show", views: "9.8K", poster: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=400&auto=format&fit=crop" },
    { title: "Lazy River Ride", views: "7.3K", poster: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=400&auto=format&fit=crop" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        parkDropdownRef.current &&
        !parkDropdownRef.current.contains(event.target)
      ) {
        setShowParkDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleParkSelect = (park) => {
    setSelectedPark(park);
    setShowParkDropdown(false);
  };

  // Features data
  const FEATURES = [
    {
      icon: <MdDiscount />,
      title: "Industry Best Discounts",
      desc: "Save up to 40% on all park bookings with exclusive early bird and group offers.",
      color: "from-amber-400 to-yellow-500",
      iconBg: "bg-amber-400",
      accent: "text-amber-400",
      tag: "Save Big Today",
      tagIcon: <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />,
    },
    {
      icon: <MdVerified />,
      title: "Authorized Ticketing Partner",
      desc: "100% genuine tickets from park authorities. Guaranteed entry, no overcharging.",
      color: "from-emerald-400 to-green-500",
      iconBg: "bg-emerald-400",
      accent: "text-emerald-400",
      tag: "Verified & Trusted",
      tagIcon: <FaCheckCircle className="ml-2" />,
    },
    {
      icon: <MdSupportAgent />,
      title: "Real-Time Chat Support",
      desc: "24/7 live assistance from park experts. Instant answers to all your queries.",
      color: "from-violet-400 to-purple-500",
      iconBg: "bg-violet-400",
      accent: "text-violet-400",
      tag: "We're Here 24/7",
      tagIcon: <FaHeadset className="ml-2" />,
    },
    {
      icon: <FaBolt />,
      title: "Simple & Fast Process",
      desc: "Book your adventure in under 60 seconds. 3 simple steps and you're ready!",
      color: "from-orange-400 to-red-500",
      iconBg: "bg-orange-400",
      accent: "text-orange-400",
      tag: "60-Second Booking",
      tagIcon: <RiRocketFill className="ml-2" />,
    },
  ];

  // Partner categories
  const CATEGORIES = [
    {
      title: "Theme Parks",
      badge: "Theme Park Partner",
      count: "15+",
      desc: "Thrilling roller coasters, magical worlds, and unforgettable adventures with our premium theme park partners.",
      image: "https://images.unsplash.com/photo-1513889959013-c517500d4408?q=80&w=800&auto=format&fit=crop",
      tags: ["Roller Coasters", "4D Rides", "Kids Zones"],
      btnColor: "bg-yellow-400 hover:bg-yellow-300",
      badgeColor: "bg-yellow-400",
      accentColor: "text-yellow-400",
      link: "/entertainment?category=theme",
      btnText: "Explore Theme Parks",
    },
    {
      title: "Water Parks",
      badge: "Water Park Partner",
      count: "12+",
      desc: "Giant slides, wave pools, lazy rivers, and aquatic adventures for the whole family.",
      image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=800&auto=format&fit=crop",
      tags: ["Water Slides", "Wave Pools", "Lazy Rivers"],
      btnColor: "bg-cyan-400 hover:bg-cyan-300",
      badgeColor: "bg-cyan-400",
      accentColor: "text-cyan-400",
      link: "/entertainment?category=water",
      btnText: "Explore Water Parks",
    },
    {
      title: "Adventure & Nature",
      badge: "Other Parks",
      count: "10+",
      desc: "Wildlife sanctuaries, botanical gardens, adventure parks, and unique themed experiences.",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
      tags: ["Wildlife", "Gardens", "Adventure"],
      btnColor: "bg-emerald-400 hover:bg-emerald-300",
      badgeColor: "bg-emerald-400",
      accentColor: "text-emerald-400",
      link: "/entertainment?category=other",
      btnText: "Explore More",
    },
  ];

  // Trusted stats
  const STATS = [
    { value: "37+", label: "Total Partner Parks" },
    { value: "15M+", label: "Annual Visitors" },
    { value: "24/7", label: "Customer Support" },
  ];

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* ════════════════════════════════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Background Carousel */}
        <div className="absolute inset-0 z-0">
          <ImageCarousel
            images={HERO_SLIDES}
            autoPlay={true}
            showControls={false}
            showIndicators={false}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/85 via-gray-900/60 to-transparent z-10"></div>
        </div>

        {/* Floating decorative blobs */}
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-cyan-400/20 rounded-full blur-[100px] z-10 animate-pulse"></div>
        <div className="absolute bottom-20 left-[5%] w-56 h-56 bg-yellow-400/15 rounded-full blur-[80px] z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

        {/* Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <svg viewBox="0 0 1440 120" className="w-full h-auto" preserveAspectRatio="none">
            <path
              fill="white"
              d="M0,64L60,58.7C120,53,240,43,360,48C480,53,600,75,720,80C840,85,960,75,1080,64C1200,53,1320,43,1380,37.3L1440,32L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
            ></path>
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 z-30 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Hero Copy */}
            <div className="text-white space-y-8 max-w-xl">
              {/* Live badge */}
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full text-sm font-bold border border-white/20">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400"></span>
                </span>
                Amusement Park Booking Platform
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
                Get the Best Deals on{" "}
                <span className="relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300">
                    Amusement Parks
                  </span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                    <path d="M2 8C50 2 100 2 150 6C200 10 250 4 298 8" stroke="url(#underline-grad)" strokeWidth="3" strokeLinecap="round" />
                    <defs><linearGradient id="underline-grad" x1="0" y1="0" x2="300" y2="0"><stop stopColor="#fbbf24"/><stop offset="1" stopColor="#f59e0b"/></linearGradient></defs>
                  </svg>
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-lg">
                Book tickets easily with the best prices and instant confirmation.
                Experience world-class attractions with exclusive discounts.
              </p>

              {/* Trust badges inline */}
              <div className="flex flex-wrap gap-4 text-sm text-white/70">
                <span className="flex items-center gap-1.5"><FaCheckCircle className="text-green-400" /> Instant Confirmation</span>
                <span className="flex items-center gap-1.5"><FaShieldAlt className="text-blue-400" /> Secure Payments</span>
                <span className="flex items-center gap-1.5"><MdVerified className="text-yellow-400" /> Authorized Partner</span>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => navigateTo("/booking")}
                  className="group px-10 py-5 bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 font-black rounded-2xl hover:shadow-[0_20px_60px_-15px_rgba(245,158,11,0.5)] hover:scale-105 transition-all flex items-center gap-3 text-lg shadow-xl"
                >
                  Book Now
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigateTo("/entertainment")}
                  className="px-10 py-5 bg-white/10 backdrop-blur-md border-2 border-white/25 text-white font-bold rounded-2xl hover:bg-white/20 transition-all text-lg"
                >
                  Explore Parks
                </button>
              </div>
            </div>

            {/* Right: Quick Booking Card */}
            <div className="hidden lg:block">
              <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] p-8 shadow-2xl border border-white/50 relative overflow-hidden">
                {/* Card glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-400/20 rounded-full blur-[60px]"></div>

                {/* Park Selector */}
                <div className="relative mb-8" ref={parkDropdownRef}>
                  <button
                    onClick={() => setShowParkDropdown(!showParkDropdown)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl font-bold hover:shadow-xl transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <FaMapMarkerAlt className="text-lg" />
                      <span>
                        {selectedPark ? selectedPark.name : "Select Your Park"}
                      </span>
                    </div>
                    <FaChevronDown
                      className={`text-sm transition-transform ${showParkDropdown ? "rotate-180" : ""}`}
                    />
                  </button>

                  {showParkDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden z-50 max-h-80 overflow-y-auto">
                      {(WATER_PARKS_DATA || []).map((park) => (
                        <button
                          key={park.id}
                          onClick={() => handleParkSelect(park)}
                          className="w-full flex items-center gap-4 p-4 hover:bg-blue-50 transition-all border-b border-blue-50 last:border-0"
                        >
                          <img
                            src={park.image}
                            alt={park.name}
                            className="w-14 h-14 rounded-xl object-cover"
                          />
                          <div className="flex-1 text-left">
                            <h4 className="font-black text-gray-900">
                              {park.name}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {park.location}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <FaStar className="text-yellow-400 text-xs" />
                              <span className="text-xs font-bold">
                                {park.rating}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-black text-blue-600">
                              {park.price}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick Booking Form */}
                <div className="space-y-5">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-xl">
                      <FaTicketAlt />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-gray-900">
                        Quick Booking
                      </h3>
                      <p className="text-xs text-gray-500">
                        Select a park and book in seconds
                      </p>
                    </div>
                  </div>

                  {/* Price Summary — only when park selected */}
                  {selectedPark && (
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-5">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">Starting from</span>
                        <span className="text-3xl font-black text-blue-600">
                          {selectedPark.price}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">per person • taxes extra</p>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      if (!selectedPark?.id) {
                        showAlert("Please select a park first", "error");
                        return;
                      }
                      dispatch(setBookingParkId(selectedPark.id));
                      navigateTo("/booking");
                    }}
                    className="w-full py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black rounded-2xl hover:shadow-xl transition-all text-lg"
                  >
                    Proceed to Book
                  </button>

                  <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-2">
                    <FaShieldAlt className="text-green-500" />
                    Safe & Secure Payment • Instant Confirmation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          WHY CHOOSE US — FEATURES SECTION
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.05),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(6,182,212,0.05),transparent_70%)]"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-bold mb-4">
              <FaStar className="text-yellow-500" />
              Why Choose Alphabuy
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
              The Smartest Way to Book
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Trusted by millions of families for hassle-free amusement park bookings
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, i) => (
              <div
                key={i}
                className="group relative bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                {/* Colored top bar */}
                <div className={`absolute top-0 left-8 right-8 h-1 bg-gradient-to-r ${feature.color} rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity`}></div>

                <div className={`w-16 h-16 ${feature.iconBg} rounded-2xl flex items-center justify-center text-3xl text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  {feature.desc}
                </p>
                <div className={`flex items-center ${feature.accent} font-bold text-sm`}>
                  <span>{feature.tag}</span>
                  {feature.tagIcon}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          PARK PARTNER CATEGORIES
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-bold mb-4">
              <MdAttractions className="text-lg" />
              Our Partners
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
              Park Categories
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Choose from our wide range of partnered parks for the perfect family adventure
            </p>
          </div>

          {/* Category Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {CATEGORIES.map((cat, i) => (
              <div
                key={i}
                className="group relative rounded-[2rem] overflow-hidden shadow-xl cursor-pointer hover:-translate-y-3 transition-all duration-500"
              >
                <div className="relative h-[520px]">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                  {/* Badge */}
                  <div className={`absolute top-6 left-6 ${cat.badgeColor} text-gray-900 px-4 py-2 rounded-full font-black text-sm shadow-lg`}>
                    {cat.badge}
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="mb-4">
                      <span className={`text-5xl font-black ${cat.accentColor}`}>{cat.count}</span>
                      <span className="text-sm ml-2 text-white/80">Parks</span>
                    </div>
                    <h3 className="text-3xl font-black mb-3">{cat.title}</h3>
                    <p className="text-white/70 mb-5 leading-relaxed text-sm">
                      {cat.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {cat.tags.map((tag, j) => (
                        <span key={j} className="px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-xs font-medium">{tag}</span>
                      ))}
                    </div>
                    <button
                      onClick={() => navigateTo(cat.link)}
                      className={`w-full py-4 ${cat.btnColor} text-gray-900 rounded-2xl font-black transition-all flex items-center justify-center gap-2 shadow-lg`}
                    >
                      {cat.btnText} <FaArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Row */}
          <div className="mt-16 grid grid-cols-3 gap-6 bg-white rounded-[2rem] p-8 shadow-lg border border-gray-100">
            {STATS.map((stat, i) => (
              <div key={i} className={`text-center ${i > 0 ? "border-l border-gray-200" : ""}`}>
                <p className="text-4xl font-black bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">{stat.value}</p>
                <p className="text-gray-600 font-bold mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FEATURED PARKS FROM API
      ════════════════════════════════════════════════════════════════════ */}
      {(WATER_PARKS_DATA || []).length > 0 && (
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-50 text-cyan-600 rounded-full text-sm font-bold mb-4">
                <FaWater />
                Featured Destinations
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
                Featured Parks
              </h2>
              <p className="text-gray-500 text-lg">
                Spectacular destinations at unbeatable prices
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(WATER_PARKS_DATA || []).slice(0, 6).map((park) => (
                <div
                  key={park.id}
                  className="group relative bg-white rounded-3xl shadow-md overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={park.image}
                      alt={park.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-bold shadow-lg flex items-center gap-1.5">
                      <FaStar className="text-yellow-400" />
                      {park.rating}
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                      <FaMapMarkerAlt className="text-xs" />
                      {park.location}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-black text-gray-900">
                        {park.name}
                      </h3>
                      <span className="text-2xl font-black text-blue-600">
                        {park.price}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {(park.features || []).map((feature, j) => (
                        <span
                          key={j}
                          className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <FaStar className="text-yellow-400 text-xs" />
                        {park.reviews} reviews
                      </span>
                      <Button
                        onClick={() => {
                          dispatch(setBookingParkId(park.id));
                          navigateTo("/booking");
                        }}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl hover:shadow-lg transition-all text-sm"
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button
                onClick={() => navigateTo("/entertainment")}
                className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-bold rounded-2xl hover:bg-blue-600 hover:text-white transition-all"
              >
                View All Parks <FaArrowRight className="inline ml-2" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          HOW IT WORKS
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-[100px]"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black mb-4">
              How It Works
            </h2>
            <p className="text-white/70 text-lg max-w-lg mx-auto">
              Three simple steps to your next adventure
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: "01",
                title: "Choose Your Park",
                desc: "Browse our collection of premium amusement parks, water parks, and adventure destinations.",
                icon: <FaMapMarkerAlt className="text-2xl" />,
              },
              {
                step: "02",
                title: "Pick Your Tickets",
                desc: "Select your preferred date, ticket type, and add-ons. Apply coupons for extra savings.",
                icon: <FaTicketAlt className="text-2xl" />,
              },
              {
                step: "03",
                title: "Enjoy the Fun!",
                desc: "Get instant confirmation with QR code. Skip the queue and head straight to the fun!",
                icon: <FaCheckCircle className="text-2xl" />,
              },
            ].map((item, i) => (
              <div key={i} className="relative text-center group">
                {/* Connector line */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-[2px] bg-white/20">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-yellow-400 rounded-full"></div>
                  </div>
                )}

                <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 mb-6 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                  {item.icon}
                  <span className="absolute -top-3 -right-3 w-8 h-8 bg-yellow-400 text-gray-900 rounded-full flex items-center justify-center text-xs font-black shadow-lg">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-2xl font-black mb-3">{item.title}</h3>
                <p className="text-white/70 leading-relaxed max-w-xs mx-auto">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <button
              onClick={() => navigateTo("/booking")}
              className="px-12 py-5 bg-yellow-400 text-gray-900 font-black rounded-2xl hover:bg-yellow-300 hover:shadow-[0_20px_60px_-15px_rgba(250,204,21,0.4)] transition-all text-lg"
            >
              Start Booking Now <FaArrowRight className="inline ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SPLASH REELS
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-50 text-pink-600 rounded-full text-sm font-bold mb-3">
                <FaPlayCircle />
                Trending Now
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-2">
                Splash Reels
              </h2>
              <p className="text-gray-500">Shorts & reels from our partner parks</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => scrollReels("left")}
                className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={() => scrollReels("right")}
                className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>

          <div
            ref={reelScrollRef}
            className="flex overflow-x-hidden gap-6 pb-4 scroll-smooth"
          >
            {REELS.concat(REELS).map((reel, index) => (
              <div
                key={index}
                className="relative min-w-[300px] h-[500px] rounded-3xl overflow-hidden group flex-shrink-0 shadow-xl cursor-pointer"
              >
                <img
                  src={reel.poster}
                  alt={reel.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm flex items-center gap-2">
                  <FaHeart className="text-red-500" />
                  {reel.views}
                </div>

                <div className="absolute bottom-6 left-6 text-white">
                  <FaPlayCircle className="text-4xl mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-black">{reel.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          TRUST & SAFETY
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-full text-sm font-bold">
                <FaShieldAlt />
                Trust & Safety
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
                Your Safety Is Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  Top Priority
                </span>
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed">
                We partner only with parks that maintain the highest safety
                standards — certified lifeguards, regular equipment checks, and
                crystal-clear water quality monitored 24/7.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <FaShieldAlt />, title: "ISO Certified", desc: "International safety standards" },
                  { icon: <GiLifeBuoy />, title: "200+ Lifeguards", desc: "Always on duty" },
                  { icon: <FaWater />, title: "pH Balanced", desc: "Crystal clear water" },
                  { icon: <FaCheckCircle />, title: "Daily Testing", desc: "Quality assurance" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors"
                  >
                    <div className="text-xl text-blue-600 mt-0.5">{item.icon}</div>
                    <div>
                      <h4 className="font-black text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-8 pt-4">
                <div className="text-center">
                  <p className="text-3xl font-black text-blue-600">15+</p>
                  <p className="text-sm text-gray-500">Years of Excellence</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-black text-blue-600">10M+</p>
                  <p className="text-sm text-gray-500">Happy Visitors</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-black text-blue-600">50+</p>
                  <p className="text-sm text-gray-500">World-Class Rides</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1000&auto=format&fit=crop"
                alt="Safety"
                className="rounded-[2rem] shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                <p className="text-4xl font-black text-blue-600">100%</p>
                <p className="text-gray-600 font-bold">Safety Record</p>
                <p className="text-xs text-gray-400">Zero major incidents</p>
              </div>
              <div className="absolute -top-6 -right-6 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-2xl shadow-2xl p-6">
                <p className="text-2xl font-black text-gray-900">ISO 9001</p>
                <p className="text-xs text-gray-800 font-bold">Certified Park Partner</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.15),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(6,182,212,0.15),transparent_60%)]"></div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-black mb-6">
            Ready for Your Next{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-300">
              Adventure?
            </span>
          </h2>
          <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
            Join millions of happy families who book through Alphabuy. Best prices,
            instant confirmation, and 24/7 support — every single time.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigateTo("/booking")}
              className="px-12 py-5 bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 font-black rounded-2xl hover:shadow-[0_20px_60px_-15px_rgba(245,158,11,0.4)] hover:scale-105 transition-all text-lg"
            >
              Book Tickets Now <FaArrowRight className="inline ml-2" />
            </button>
            <button
              onClick={() => navigateTo("/entertainment")}
              className="px-12 py-5 border-2 border-white/20 text-white font-bold rounded-2xl hover:bg-white/10 transition-all text-lg"
            >
              Browse All Parks
            </button>
          </div>
          <div className="flex flex-wrap gap-6 justify-center mt-10 text-sm text-white/50">
            <span className="flex items-center gap-1.5"><FaCheckCircle className="text-green-400" /> No Hidden Fees</span>
            <span className="flex items-center gap-1.5"><FaShieldAlt className="text-blue-400" /> 100% Secure</span>
            <span className="flex items-center gap-1.5"><MdSupportAgent className="text-cyan-400" /> 24/7 Support</span>
            <span className="flex items-center gap-1.5"><MdVerified className="text-yellow-400" /> Authorized Partner</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landing;