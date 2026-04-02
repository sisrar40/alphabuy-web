import React, { useState, useEffect } from "react";
import {
  FaFilter,
  FaMapMarkerAlt,
  FaStar,
  FaHeart,
  FaShare,
  FaClock,
  FaUsers,
  FaWater,
  FaWaveSquare,
  FaUmbrellaBeach,
  FaChild,
  FaSwimmer,
  FaTicketAlt,
  FaCalendarAlt,
  FaChevronRight,
  FaChevronLeft,
  FaInfoCircle,
  FaGift,
  FaPercent,
  FaCrown,
  FaBolt,
  FaLeaf,
  FaRegClock,
  FaRegStar,
  FaRegHeart,
  FaRegBookmark,
  FaSearch,
  FaTimes,
  FaSlidersH,
  FaArrowRight,
  FaCheckCircle,
  FaFire,
  FaCompass,
  FaSun,
  FaCloudSun,
  FaSnowflake,
} from "react-icons/fa";
import {
  GiLifeBuoy,
  GiSpeedBoat,
  GiWaterfall,
  GiPalmTree,
} from "react-icons/gi";
import ImageCarousel from "../components/ImageCarousel";
import { entertainmentPosterData } from "../dummy/data";
import Button from "../components/Button";
import { useAppNavigation } from "../hooks/useAppNavigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchParks } from "../features/parks/parkSlice";

function Entertainment() {
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [category, setCategory] = useState("All Parks");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedFilters, setAppliedFilters] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("popular");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [selectedPark, setSelectedPark] = useState(null);
  const [showQuickView, setShowQuickView] = useState(false);
  const { navigateTo } = useAppNavigation();
  const dispatch = useDispatch();
  const { items: parkDataFromRedux, loading } = useSelector((state) => state.parks);

  useEffect(() => {
    dispatch(fetchParks());
  }, [dispatch]);

  const parkData = parkDataFromRedux.length > 0 ? parkDataFromRedux.map(park => ({
    ...park,
    rating: park.rating || 4.5,
    reviews: park.reviews || "1.2k+ reviews",
    distance: park.distance || "0.5 km",
    features: park.features || ["Wave Pool", "Slides"],
    amenities: park.amenities || ["Parking", "Food"],
    description: park.description || "Exciting park with many attractions."
  })) : [];

  const handleApplyFilter = () => {
    setAppliedFilters({ category, location, priceRange });
    setShowMobileFilter(false);
  };

  const handleReset = () => {
    setCategory("All");
    setLocation("");
    setPriceRange([0, 5000]);
    setAppliedFilters(null);
  };

  const handleBookNow = (park) => {
    navigateTo(`/detail/${park.id}`);
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

  const handleQuickView = (park) => {
    setSelectedPark(park);
    setShowQuickView(true);
  };

  const categories = [
    {
      id: "all",
      name: "All Parks",
      icon: <FaWater />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "water",
      name: "Water Parks",
      icon: <FaWaveSquare />,
      color: "from-cyan-500 to-teal-500",
    },
    {
      id: "theme",
      name: "Theme Parks",
      icon: <GiSpeedBoat />,
      color: "from-orange-500 to-red-500",
    },
    {
      id: "family",
      name: "Family",
      icon: <FaChild />,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "adventure",
      name: "Adventure",
      icon: <GiWaterfall />,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "relax",
      name: "Relaxation",
      icon: <GiPalmTree />,
      color: "from-yellow-500 to-amber-500",
    },
  ];

  const sortOptions = [
    { value: "popular", label: "Most Popular", icon: <FaFire /> },
    { value: "rating", label: "Top Rated", icon: <FaStar /> },
    { value: "price-low", label: "Price: Low to High", icon: <FaArrowRight /> },
    {
      value: "price-high",
      label: "Price: High to Low",
      icon: <FaArrowRight className="rotate-180" />,
    },
    { value: "distance", label: "Nearest First", icon: <FaMapMarkerAlt /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-cyan-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0,50 Q25,30 50,50 T100,50"
              stroke="white"
              fill="none"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
            <div className="space-y-6 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold border border-white/30">
                <FaCompass className="text-yellow-300" />
                Discover Your Next Adventure
              </div>

              <h1 className="text-5xl lg:text-7xl font-black leading-[1.1]">
                Explore
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-300">
                  Water Parks
                </span>
              </h1>

              <p className="text-xl text-white/80 leading-relaxed">
                Find and book the best water parks and attractions. Skip the
                lines, save money, and make memories.
              </p>
            </div>

            {/* Stats Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-black text-yellow-300">50+</div>
                  <div className="text-sm text-white/70">Water Parks</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-yellow-300">1M+</div>
                  <div className="text-sm text-white/70">Happy Visitors</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-yellow-300">
                    4.9★
                  </div>
                  <div className="text-sm text-white/70">Avg Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-yellow-300">
                    24/7
                  </div>
                  <div className="text-sm text-white/70">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto">
            <path
              fill="white"
              d="M0,64L48,74.7C96,85,192,107,288,112C384,117,480,107,576,90.7C672,75,768,53,864,48C960,43,1056,53,1152,69.3C1248,85,1344,107,1392,117.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-3xl shadow-xl p-4 -mt-16 relative z-10 mb-12">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for water parks, locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-blue-400 focus:outline-none transition-all font-medium"
              />
            </div>

            {/* Category Selector */}
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
              {categories.slice(0, 4).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.name)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm whitespace-nowrap transition-all ${category === cat.name
                    ? `bg-gradient-to-r ${cat.color} text-white shadow-lg`
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  <span className="text-base">{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowMobileFilter(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-2xl hover:shadow-xl transition-all whitespace-nowrap"
            >
              <FaSlidersH />
              Filters
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-lg p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                <button
                  onClick={handleReset}
                  className="text-sm text-blue-600 font-bold hover:underline"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-8">
                {/* Location */}
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                    Location
                  </h4>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter city or area..."
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-blue-400 focus:outline-none transition-all text-sm font-medium"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                    Category
                  </h4>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setCategory(cat.name)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${category === cat.name
                          ? `bg-gradient-to-r ${cat.color} text-white`
                          : "text-gray-600 hover:bg-gray-50"
                          }`}
                      >
                        <span className="text-base">{cat.icon}</span>
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                    Price Range
                  </h4>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([0, parseInt(e.target.value)])
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-gray-900">
                        ₹0
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        ₹{priceRange[1]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                    Amenities
                  </h4>
                  <div className="space-y-2">
                    {[
                      "Free Parking",
                      "Lockers",
                      "Restaurants",
                      "Cabana Rentals",
                      "Kids Area",
                    ].map((item) => (
                      <label
                        key={item}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          {item}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                    Minimum Rating
                  </h4>
                  <div className="flex items-center gap-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <button
                        key={rating}
                        className="flex-1 py-2 border-2 border-gray-200 rounded-xl text-sm font-bold hover:border-yellow-400 transition-all"
                      >
                        {rating}+{" "}
                        <FaStar className="inline text-yellow-400 text-xs" />
                      </button>
                    ))}
                  </div>
                </div>

                <Button onClick={handleApplyFilter} className="w-full">
                  Apply Filters
                </Button>
              </div>
            </div>
          </aside>

          {/* Parks Grid */}
          <main className="lg:col-span-9">
            {(() => {
              const filteredParks = (parkData || []).filter((park) => {
                const searchLower = searchTerm.toLowerCase();
                const matchesSearch =
                  !searchTerm ||
                  park.name.toLowerCase().includes(searchLower) ||
                  park.location.toLowerCase().includes(searchLower);

                const matchesCategory =
                  category === "All Parks" ||
                  park.category === category ||
                  (category === "Water Parks" &&
                    park.name.toLowerCase().includes("water")) ||
                  (category === "Theme Parks" &&
                    park.name.toLowerCase().includes("theme"));

                const priceValue =
                  park.price_num ||
                  parseFloat(String(park.price).replace(/[^0-9.]/g, "")) ||
                  0;
                const matchesPrice = priceValue <= priceRange[1];

                const matchesLocation =
                  !location ||
                  (park.location || "").toLowerCase().includes(location.toLowerCase());

                return matchesSearch && matchesCategory && matchesPrice && matchesLocation;
              });

              // Apply sorting
              const sortedParks = [...filteredParks].sort((a, b) => {
                const getPrice = (p) => p.price_num || parseFloat(String(p.price).replace(/[^0-9.]/g, "")) || 0;
                if (sortBy === "price-low") return getPrice(a) - getPrice(b);
                if (sortBy === "price-high") return getPrice(b) - getPrice(a);
                if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
                return 0; // Default: popular/as is
              });

              return (
                <>
                  {/* Results Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {sortedParks.length} Results Found
                      </h2>
                      {(appliedFilters || searchTerm) && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                          Filtered
                        </span>
                      )}
                    </div>

                    <div className="relative">
                      <button
                        onClick={() => setShowSortDropdown(!showSortDropdown)}
                        className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-xl text-sm font-bold hover:border-blue-400 transition-all"
                      >
                        <FaRegClock />
                        Sort By
                      </button>

                      {showSortDropdown && (
                        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 z-50">
                          {sortOptions.map((option) => (
                            <button
                              key={option.value}
                              onClick={() => {
                                setSortBy(option.value);
                                setShowSortDropdown(false);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-blue-50 first:rounded-t-2xl last:rounded-b-2xl"
                            >
                              <span className="text-blue-500">
                                {option.icon}
                              </span>
                              {option.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Parks Grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {sortedParks.length > 0 ? (
                      sortedParks.map((park) => (
                        <div
                          key={park.id}
                          className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                        >
                          <div className="relative h-56 overflow-hidden">
                            <img
                              src={park.image}
                              alt={park.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                              <span
                                className={`bg-gradient-to-r ${park.badgeColor || "from-blue-500 to-cyan-500"} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg`}
                              >
                                {park.badge || "Premium"}
                              </span>
                              <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                {park.distance}
                              </span>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(park.id);
                              }}
                              className={`absolute top-4 right-4 w-10 h-10 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg ${favorites.has(park.id) ? "bg-red-500 text-white" : "bg-white/90 backdrop-blur-sm text-gray-400 hover:text-red-500"}`}
                            >
                              <FaHeart
                                className={
                                  favorites.has(park.id) ? "fill-current" : ""
                                }
                              />
                            </button>
                            <div
                              className={`absolute bottom-4 left-4 bg-gradient-to-r ${park.statusColor || "from-green-500 to-emerald-500"} text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg`}
                            >
                              {park.status || "Open"}
                            </div>
                            <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
                              <FaSun className="text-yellow-300" />
                              {park.weather || "24°C"}
                            </div>
                          </div>

                          <div className="p-6 space-y-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">
                                  {park.name}
                                </h3>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <FaMapMarkerAlt className="text-blue-500" />
                                  {park.location}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-black text-blue-600">
                                  ₹{park.price}
                                </div>
                                <div className="text-xs text-gray-400">
                                  per person
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <FaStar className="text-yellow-400" />
                                <span className="font-bold text-gray-900">
                                  {park.rating || "4.5"}
                                </span>
                              </div>
                              <span className="text-sm text-gray-500">
                                ({park.reviews || "1.2k+"})
                              </span>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {(park.features || []).slice(0, 3).map((f, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium"
                                >
                                  {f}
                                </span>
                              ))}
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-gray-100">
                              <button
                                onClick={() => handleQuickView(park)}
                                className="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:border-blue-400 hover:text-blue-600 transition-all text-sm"
                              >
                                Quick View
                              </button>
                              <Button
                                onClick={() => handleBookNow(park)}
                                className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl hover:shadow-lg transition-all text-sm"
                              >
                                Book Now
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full py-20 text-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 text-3xl">
                          <FaSearch />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          No Matching Parks
                        </h3>
                        <p className="text-gray-500">
                          Try adjusting your filters or search terms.
                        </p>
                      </div>
                    )}
                  </div>
                </>
              );
            })()}
          </main>
        </div>
      </div>

      {/* Quick View Modal */}
      {showQuickView && selectedPark && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div
            className="absolute inset-0"
            onClick={() => setShowQuickView(false)}
          ></div>

          <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setShowQuickView(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all z-10"
            >
              <FaTimes />
            </button>

            <div className="relative h-64">
              <img
                src={selectedPark.image}
                alt={selectedPark.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-1">{selectedPark.name}</h3>
                <div className="flex items-center gap-2 text-white/80">
                  <FaMapMarkerAlt className="text-blue-300" />
                  <span>{selectedPark.location}</span>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span className="font-bold">{selectedPark.rating}</span>
                    <span className="text-gray-500">
                      ({selectedPark.reviews})
                    </span>
                  </div>
                  <span className="text-gray-300">|</span>
                  <span className="text-emerald-600 font-bold">
                    {selectedPark.capacity || "Available"}
                  </span>
                </div>
                <div className="text-2xl font-black text-blue-600">
                  ₹{selectedPark.price}
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed">
                {selectedPark.description}
              </p>

              <div>
                <h4 className="font-bold text-gray-900 mb-3">Highlights</h4>
                <div className="grid grid-cols-2 gap-3">
                  {(selectedPark.features || []).map((f, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <FaCheckCircle className="text-green-500 flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  onClick={() => {
                    setShowQuickView(false);
                    handleBookNow(selectedPark);
                  }}
                  className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-2xl hover:shadow-lg transition-all"
                >
                  Book Now
                </Button>
                <button
                  onClick={() => setShowQuickView(false)}
                  className="px-6 py-4 border-2 border-gray-200 text-gray-700 font-bold rounded-2xl hover:border-blue-400 transition-all text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Entertainment;
