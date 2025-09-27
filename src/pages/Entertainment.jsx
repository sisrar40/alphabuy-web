import React, { useState } from "react";
import {
  FaFilter,
  FaMapMarkerAlt,
  FaStar,
  FaHeart,
  FaShare,
  FaClock,
  FaUsers,
} from "react-icons/fa";
import ImageCarousel from "../components/ImageCarousel";
import { entertainmentPosterData } from "../dummy/data";
import Button from "../components/Button";

function Entertainment() {
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("");
  const [appliedFilters, setAppliedFilters] = useState(null);
  const [favorites, setFavorites] = useState(new Set());

  const handleApplyFilter = () => {
    setAppliedFilters({ category, location });
    setShowMobileFilter(false);
  };

  const handleReset = () => {
    setCategory("All");
    setLocation("");
    setAppliedFilters(null);
  };

  const handleBookNow = (parkName) => {
    console.log(`Booking: ${parkName}`);
  };

  const toggleFavorite = (index) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(index)) {
      newFavorites.delete(index);
    } else {
      newFavorites.add(index);
    }
    setFavorites(newFavorites);
  };

  const parkData = [
    {
      name: "Indie & Longway Water Park",
      location: "Magic Mountain, Home march",
      distance: "0.39 km",
      status: "Demanded",
      price: "₹1,296.82",
      rating: 4.4,
      reviews: "42,096 reviews",
      description:
        "Experience the ultimate water adventure with thrilling slides and wave pools.",
      features: ["Wave Pool", "Water Slides", "Lazy River", "Kids Zone"],
      timing: "10:00 AM - 8:00 PM",
    },
    {
      name: "Thrill Valley Amusement Park",
      location: "Adventure Road, Fun City",
      distance: "1.2 km",
      status: "Popular",
      price: "₹1,599.00",
      rating: 4.7,
      reviews: "28,451 reviews",
      description:
        "Your one-stop destination for roller coasters and family entertainment.",
      features: [
        "Roller Coasters",
        "Ferris Wheel",
        "Arcade Games",
        "Food Court",
      ],
      timing: "9:00 AM - 10:00 PM",
    },
    {
      name: "Splash n Joy Water World",
      location: "Waterfront Avenue, Beach Side",
      distance: "2.5 km",
      status: "Trending",
      price: "₹1,199.50",
      rating: 4.3,
      reviews: "15,892 reviews",
      description:
        "Dive into fun with our massive water attractions and tropical theme.",
      features: [
        "Wave Beach",
        "Speed Slides",
        "Cabana Rentals",
        "Spa Services",
      ],
      timing: "10:30 AM - 7:00 PM",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Hero Carousel */}
        <div className="rounded-2xl overflow-hidden shadow-2xl">
          <ImageCarousel images={entertainmentPosterData} />
        </div>

        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Discover Amazing Entertainment
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Explore the best amusement parks, water parks, and entertainment
            venues near you. Book your perfect day out with just a few clicks!
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-700/50">
            <div className="text-2xl font-bold text-green-400">50+</div>
            <div className="text-gray-300 text-sm">Venues</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-700/50">
            <div className="text-2xl font-bold text-blue-400">1M+</div>
            <div className="text-gray-300 text-sm">Happy Visitors</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-700/50">
            <div className="text-2xl font-bold text-purple-400">4.5★</div>
            <div className="text-gray-300 text-sm">Avg Rating</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-700/50">
            <div className="text-2xl font-bold text-yellow-400">24/7</div>
            <div className="text-gray-300 text-sm">Support</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filter Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-700/50 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Filters</h2>
                <button
                  onClick={handleReset}
                  className="text-sm text-green-400 hover:text-green-300 transition-colors"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Category
                  </label>
                  <div className="space-y-2">
                    {[
                      "All",
                      "Theme Parks",
                      "Water Parks",
                      "Adventure Parks",
                      "Family Entertainment",
                    ].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                          category === cat
                            ? "bg-gradient-to-r from-[#08453E] to-[#1C9789] text-white"
                            : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Location
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter city or area"
                    />
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Price Range
                  </label>
                  <div className="space-y-2">
                    {[
                      "₹0 - ₹500",
                      "₹500 - ₹1000",
                      "₹1000 - ₹2000",
                      "₹2000+",
                    ].map((range) => (
                      <button
                        key={range}
                        className="w-full text-left px-4 py-2 rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 transition-all duration-200"
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                <Button onClick={handleApplyFilter}>Apply Filters</Button>
              </div>
            </div>
          </div>

          {/* Parks Grid */}
          <div className="lg:col-span-3">
            {/* Applied Filters */}
            {appliedFilters && (
              <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl p-4 mb-6 border border-green-700/30">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-green-400 font-semibold">
                      Active Filters:
                    </span>
                    <span className="text-gray-300 ml-2">
                      {appliedFilters.category} •{" "}
                      {appliedFilters.location || "Any location"}
                    </span>
                  </div>
                  <button
                    onClick={handleReset}
                    className="text-sm text-red-400 hover:text-red-300"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}

            {/* Parks Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {parkData.map((park, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-green-400/50 transition-all duration-300 hover:transform hover:scale-[1.02] group"
                >
                  {/* Park Image */}
                  <div className="relative">
                    <img
                      src={
                        entertainmentPosterData[
                          index % entertainmentPosterData.length
                        ]
                      }
                      alt={park.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(index)}
                      className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
                        favorites.has(index)
                          ? "bg-red-500 text-white"
                          : "bg-black/50 text-white hover:bg-red-500"
                      }`}
                    >
                      <FaHeart
                        className={favorites.has(index) ? "fill-current" : ""}
                      />
                    </button>

                    {/* Distance Badge */}
                    <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {park.distance}
                    </div>

                    {/* Status Badge */}
                    <div className="absolute bottom-3 left-3 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {park.status}
                    </div>
                  </div>

                  {/* Park Info */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-white">
                        {park.name}
                      </h3>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-400">
                          {park.price}
                        </div>
                        <div className="text-gray-400 text-sm">per person</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-300 mb-3">
                      <FaMapMarkerAlt className="w-4 h-4" />
                      <span className="text-sm">{park.location}</span>
                    </div>

                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      {park.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {park.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Rating and Timing */}
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-yellow-400">
                          <FaStar />
                          <span className="text-white font-semibold">
                            {park.rating}
                          </span>
                        </div>
                        <span className="text-gray-400 text-sm">
                          ({park.reviews})
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400 text-sm">
                        <FaClock className="w-3 h-3" />
                        {park.timing}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button
                        onClick={() => handleBookNow(park.name)}
                        className="flex-1"
                      >
                        Book Now
                      </Button>
                      <button className="p-3 bg-gray-700/50 text-gray-300 rounded-xl hover:bg-gray-600/50 transition-all duration-200">
                        <FaShare className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Filter Button (mobile only) */}
        <button
          onClick={() => setShowMobileFilter(true)}
          className="md:hidden fixed bottom-6 right-6 bg-gradient-to-r from-[#08453E] to-[#1C9789] text-white p-4 rounded-full shadow-2xl flex items-center gap-2 z-40 hover:scale-110 transition-all duration-200"
        >
          <FaFilter className="w-5 h-5" />
          <span className="font-semibold">Filter</span>
        </button>

        {/* Mobile Filter Modal */}
        {showMobileFilter && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end md:hidden">
            <div className="bg-gradient-to-b from-gray-900 to-gray-800 w-full rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto border-t border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Filter Results</h2>
                <button
                  onClick={() => setShowMobileFilter(false)}
                  className="text-2xl text-gray-400 hover:text-white"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* Mobile filter content same as desktop */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Category
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {["All", "Theme Parks", "Water Parks", "Adventure"].map(
                      (cat) => (
                        <button
                          key={cat}
                          onClick={() => setCategory(cat)}
                          className={`px-4 py-3 rounded-xl transition-all duration-200 ${
                            category === cat
                              ? "bg-gradient-to-r from-[#08453E] to-[#1C9789] text-white"
                              : "bg-gray-700/50 text-gray-300"
                          }`}
                        >
                          {cat}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <Button onClick={handleApplyFilter}>Apply Filters</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Entertainment;
