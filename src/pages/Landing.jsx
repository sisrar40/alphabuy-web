import React, { useState, useEffect, useRef } from "react";
import { 
  FaTicketAlt, 
  FaMapMarkerAlt, 
  FaShieldAlt, 
  FaUsers, 
  FaParking, 
  FaArrowRight,
  FaGamepad,
  FaShoppingBag,
  FaCheckCircle,
  FaChevronDown,
  FaChevronUp,
  FaQuoteLeft,
  FaMagic,
  FaWater,
  FaCompass,
  FaBuilding,
  FaCalendarAlt,
  FaChild,
  FaSwimmer,
  FaSun,
  FaPlayCircle,
  FaHeart,
  FaChevronLeft,
  FaChevronRight,
  FaExpand,
  FaIceCream,
  FaVrCardboard,
  FaWaveSquare,
  FaUmbrellaBeach,
  FaClock,
  FaStar,
  FaInfoCircle,
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube
} from "react-icons/fa";
import { WiDaySunny } from "react-icons/wi";
import { GiSpeedBoat, GiLifeBuoy, GiPalmTree } from "react-icons/gi";
import Button from "../components/ui/Button";
import { useAppNavigation } from "../hooks/useAppNavigation";
import ImageCarousel from "../components/ImageCarousel";

// Asset paths with high-quality water park images
const HERO_SLIDES = [
  "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format&fit=crop"
];

const PARK_IMAGES = {
  aquaventure: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1000&auto=format&fit=crop",
  wildWadi: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1000&auto=format&fit=crop",
  splash: "https://images.unsplash.com/photo-1563299201-90a6f4a86906?q=80&w=1000&auto=format&fit=crop",
  wave: "https://images.unsplash.com/photo-1600100397561-45609440ea23?q=80&w=1000&auto=format&fit=crop"
};

const REELS = [
  { id: 1, title: "Giant Splash!", views: "1.2M", video: "https://v.ftcdn.net/05/22/16/81/700_F_522168134_J0H79OnVpTPj9y8pLz8jL8z8z8z8z8z8_ST.mp4", poster: PARK_IMAGES.aquaventure },
  { id: 2, title: "Wave Rider", views: "850K", video: "https://v.ftcdn.net/04/85/91/38/700_F_485913809_V8V8V8V8V8V8V8V8V8V8V8V8V8V8V8V8_ST.mp4", poster: PARK_IMAGES.wildWadi },
  { id: 3, title: "Lazy Vibes", views: "2.4M", video: "https://v.ftcdn.net/03/49/62/17/700_F_349621748_V8V8V8V8V8V8V8V8V8V8V8V8V8V8V8V8_ST.mp4", poster: PARK_IMAGES.splash },
  { id: 4, title: "Extreme Drop", views: "5.1M", video: "https://v.ftcdn.net/05/22/16/81/700_F_522168134_J0H79OnVpTPj9y8pLz8jL8z8z8z8z8z8_ST.mp4", poster: PARK_IMAGES.wave }
];

const GALLERY_PHOTOS = [
  "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop"
];

const WATER_PARKS = [
  { 
    id: 1, 
    name: "Aquaventure", 
    location: "Dubai, UAE", 
    rating: 4.9, 
    reviews: "12.5k+", 
    image: PARK_IMAGES.aquaventure,
    price: "₹3,999",
    features: ["Dolphin Bay", "Tower Slides", "Private Beach"]
  },
  { 
    id: 2, 
    name: "Wild Wadi", 
    location: "Dubai, UAE", 
    rating: 4.8, 
    reviews: "10.2k+", 
    image: PARK_IMAGES.wildWadi,
    price: "₹3,499",
    features: ["Jumeirah Sceirah", "Wave Pool", "Lazy River"]
  },
  { 
    id: 3, 
    name: "Splash Island", 
    location: "Singapore", 
    rating: 4.7, 
    reviews: "8.9k+", 
    image: PARK_IMAGES.splash,
    price: "₹2,999",
    features: ["Water Slides", "Adventure Cove", "Ray Bay"]
  },
  { 
    id: 4, 
    name: "Wave Garden", 
    location: "Abu Dhabi", 
    rating: 4.9, 
    reviews: "15.3k+", 
    image: PARK_IMAGES.wave,
    price: "₹4,299",
    features: ["Surf Pool", "Pearl Dive", "Family Zone"]
  },
  { 
    id: 5, 
    name: "Yas Waterworld", 
    location: "Abu Dhabi", 
    rating: 4.8, 
    reviews: "11.7k+", 
    image: "https://images.unsplash.com/photo-1563299201-90a6f4a86906?q=80&w=1000&auto=format&fit=crop",
    price: "₹3,899",
    features: ["Bandit Bomber", "Dawwama", "Falcon's Falaj"]
  },
  { 
    id: 6, 
    name: "Adventure Cove", 
    location: "Singapore", 
    rating: 4.7, 
    reviews: "9.4k+", 
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1000&auto=format&fit=crop",
    price: "₹3,299",
    features: ["Rainbow Reef", "Riptide Rocket", "Wave Pool"]
  }
];

const RIDES = [
  { name: "Body Slides", icon: <FaSwimmer />, color: "from-blue-500 to-cyan-400", count: "12+" },
  { name: "Wave Pools", icon: <FaWater />, color: "from-cyan-500 to-teal-400", count: "5" },
  { name: "Kids Zone", icon: <FaChild />, color: "from-orange-500 to-amber-400", count: "8" },
  { name: "Lazy Rivers", icon: <FaSun />, color: "from-yellow-500 to-amber-400", count: "4" },
  { name: "Speed Slides", icon: <GiSpeedBoat />, color: "from-red-500 to-rose-400", count: "6" },
  { name: "Family Rafts", icon: <GiLifeBuoy />, color: "from-green-500 to-emerald-400", count: "7" }
];

function Landing() {
  const { navigateTo } = useAppNavigation();
  const [selectedPark, setSelectedPark] = useState(null);
  const [showParkDropdown, setShowParkDropdown] = useState(false);
  const reelScrollRef = useRef(null);
  const parkDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (parkDropdownRef.current && !parkDropdownRef.current.contains(event.target)) {
        setShowParkDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollReels = (direction) => {
    if (reelScrollRef.current) {
      const scrollAmount = 340;
      reelScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleParkSelect = (park) => {
    setSelectedPark(park);
    setShowParkDropdown(false);
    // Scroll to booking section or handle park selection
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-cyan-50 min-h-screen font-sans">
      {/* Hero Section with Wave Background */}
      <section className="relative min-h-screen pt-24 pb-20 overflow-hidden">
        {/* Background Image Carousel */}
        <div className="absolute inset-0 z-0">
          <ImageCarousel 
            images={HERO_SLIDES} 
            autoPlay={true} 
            showControls={false} 
            showIndicators={false}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-blue-600/50 to-cyan-500/30 z-10"></div>
        </div>

        {/* Wave SVG Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <svg viewBox="0 0 1440 320" className="w-full h-auto" preserveAspectRatio="none">
            <path fill="white" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 z-30">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="text-white space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold border border-white/30 animate-pulse">
                <FaWater className="text-cyan-300" />
                Asia's #1 Water Park Destination
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-black leading-[1.1]">
                Make Waves,
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-300">Create Memories</span>
              </h1>
              
              <p className="text-xl text-white/90 max-w-lg leading-relaxed">
                Experience 50+ world-class water slides, wave pools, and attractions across Asia's most spectacular water parks.
              </p>

              {/* Weather Widget */}
              <div className="flex items-center gap-6 bg-white/10 backdrop-blur-md rounded-2xl p-4 w-fit border border-white/20">
                <div className="flex items-center gap-3">
                  <WiDaySunny className="text-4xl text-yellow-300" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-white/70">Today's Weather</p>
                    <p className="text-2xl font-black">32°C</p>
                  </div>
                </div>
                <div className="h-8 w-px bg-white/20"></div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-white/70">Perfect for</p>
                  <p className="text-lg font-black">Water Fun</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-8">
                <button
                  onClick={() => navigateTo("/booking")}
                  className="px-10 py-5 bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 font-black rounded-2xl hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-3 text-lg shadow-xl"
                >
                  Book Tickets <FaArrowRight />
                </button>
                <button
                  onClick={() => navigateTo("/entertainment")}
                  className="px-10 py-5 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-black rounded-2xl hover:bg-white/20 transition-all text-lg"
                >
                  Explore Parks
                </button>
              </div>
            </div>

            {/* Right Content - Park Selector & Quick Booking */}
            <div className="bg-white/95 backdrop-blur-xl rounded-4xl p-8 shadow-2xl">
              {/* Park Selector */}
              <div className="relative mb-8" ref={parkDropdownRef}>
                <button
                  onClick={() => setShowParkDropdown(!showParkDropdown)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl font-bold hover:shadow-xl transition-all"
                >
                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-lg" />
                    <span>{selectedPark ? selectedPark.name : "Select Your Water Park"}</span>
                  </div>
                  <FaChevronDown className={`text-sm transition-transform ${showParkDropdown ? "rotate-180" : ""}`} />
                </button>

                {showParkDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden z-50 max-h-96 overflow-y-auto">
                    {WATER_PARKS.map((park) => (
                      <button
                        key={park.id}
                        onClick={() => handleParkSelect(park)}
                        className="w-full flex items-center gap-4 p-4 hover:bg-blue-50 transition-all border-b border-blue-50 last:border-0"
                      >
                        <img src={park.image} alt={park.name} className="w-16 h-16 rounded-xl object-cover" />
                        <div className="flex-1 text-left">
                          <h4 className="font-black text-gray-900">{park.name}</h4>
                          <p className="text-xs text-gray-500">{park.location}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <FaStar className="text-yellow-400 text-xs" />
                            <span className="text-xs font-bold">{park.rating}</span>
                            <span className="text-xs text-gray-400">({park.reviews})</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-blue-600">from</p>
                          <p className="text-lg font-black text-blue-600">{park.price}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Booking Form */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-xl">
                    <FaTicketAlt />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900">Quick Booking</h3>
                    <p className="text-xs text-gray-500">Get your pass in 60 seconds</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Visit Date</label>
                    <div className="relative">
                      <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />
                      <input type="date" className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl font-bold focus:border-blue-400 focus:outline-none transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Guests</label>
                    <select className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-xl font-bold focus:border-blue-400 focus:outline-none transition-all">
                      <option>2 Adults</option>
                      <option>3 Adults</option>
                      <option>4 Adults</option>
                      <option>Family Pack (2+2)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Ticket Type</label>
                  <select className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-xl font-bold focus:border-blue-400 focus:outline-none transition-all">
                    <option>General Admission - Full Day</option>
                    <option>Express Pass - Skip Lines</option>
                    <option>VIP Cabana + Fast Track</option>
                    <option>Annual Pass</option>
                  </select>
                </div>

                {/* Price Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-2xl font-black text-blue-600">{selectedPark?.price || "₹3,999"}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Taxes & Fees</span>
                    <span className="text-gray-700">₹499</span>
                  </div>
                  <div className="border-t border-blue-200 my-4 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900">Total</span>
                      <span className="text-3xl font-black text-blue-600">
                        {selectedPark ? parseInt(selectedPark.price.replace(/[^0-9]/g, '')) + 499 : 4498}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigateTo("/booking")}
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
      </section>

      {/* Featured Parks Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">Featured Water Parks</h2>
            <p className="text-gray-500 text-lg">Asia's most spectacular aquatic destinations</p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WATER_PARKS.slice(0, 6).map((park) => (
              <div key={park.id} className="group relative bg-white rounded-3xl shadow-xl overflow-hidden hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                <div className="relative h-56 overflow-hidden">
                  <img src={park.image} alt={park.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    {park.rating}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold">
                    {park.location}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-black text-gray-900">{park.name}</h3>
                    <span className="text-2xl font-black text-blue-600">{park.price}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {park.features.map((feature, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{park.reviews} reviews</span>
                    <button
                      onClick={() => handleParkSelect(park)}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl hover:shadow-lg transition-all text-sm"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-bold rounded-2xl hover:bg-blue-600 hover:text-white transition-all">
              View All Parks <FaArrowRight className="inline ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Ride Categories */}
      <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">Ride Categories</h2>
            <p className="text-gray-500 text-lg">Choose your adventure</p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {RIDES.map((ride, i) => (
              <div key={i} className="group cursor-pointer">
                <div className={`bg-gradient-to-br ${ride.color} p-8 rounded-3xl text-white text-center shadow-xl group-hover:scale-105 group-hover:shadow-2xl transition-all duration-300`}>
                  <div className="text-4xl mb-3">{ride.icon}</div>
                  <h3 className="font-black text-lg">{ride.name}</h3>
                  <p className="text-sm opacity-90">{ride.count} Rides</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">Moments of Joy</h2>
            <p className="text-gray-500 text-lg">Captured memories from our happy visitors</p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {GALLERY_PHOTOS.map((photo, i) => (
              <div key={i} className={`relative group rounded-2xl overflow-hidden shadow-lg ${i === 0 ? 'col-span-2 row-span-2' : ''}`}>
                <img src={photo} alt={`Gallery ${i+1}`} className="w-full h-full object-cover aspect-square group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-start p-6">
                  <button className="text-white flex items-center gap-2">
                    <FaExpand className="text-xl" />
                    <span className="text-sm font-bold">View</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black mb-4">Special Offers</h2>
            <p className="text-white/80 text-lg">Exclusive deals for early birds and groups</p>
            <div className="w-24 h-1 bg-white/30 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Early Bird Special", discount: "30% OFF", valid: "Book before 9 AM", icon: <FaClock />, code: "EARLY30" },
              { title: "Group Fun", discount: "Buy 4 Get 1 Free", valid: "Groups of 5+", icon: <FaUsers />, code: "GROUP5" },
              { title: "Family Pack", discount: "Save ₹2000", valid: "2 Adults + 2 Kids", icon: <GiPalmTree />, code: "FAMILY" }
            ].map((offer, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all group">
                <div className="text-5xl mb-4 text-yellow-300">{offer.icon}</div>
                <h3 className="text-2xl font-black mb-2">{offer.title}</h3>
                <p className="text-4xl font-black text-yellow-300 mb-2">{offer.discount}</p>
                <p className="text-white/70 mb-4">{offer.valid}</p>
                <div className="bg-white/20 rounded-xl p-3 mb-6 text-center">
                  <span className="text-sm font-bold">Code: {offer.code}</span>
                </div>
                <button className="w-full py-4 bg-white text-blue-600 font-black rounded-2xl hover:bg-yellow-300 hover:text-gray-900 transition-all">
                  Claim Offer
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reels Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-2">Splash Reels</h2>
              <p className="text-gray-500">Trending moments from our parks</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => scrollReels("left")} className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                <FaChevronLeft />
              </button>
              <button onClick={() => scrollReels("right")} className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                <FaChevronRight />
              </button>
            </div>
          </div>

          <div ref={reelScrollRef} className="flex overflow-x-hidden gap-6 pb-4 scroll-smooth">
            {REELS.concat(REELS).map((reel, index) => (
              <div key={index} className="relative min-w-[320px] h-[550px] rounded-3xl overflow-hidden group flex-shrink-0 shadow-xl">
                <video 
                  className="absolute inset-0 w-full h-full object-cover"
                  poster={reel.poster}
                  loop
                  muted
                  playsInline
                  onMouseEnter={(e) => e.target.play()}
                  onMouseLeave={(e) => {
                    e.target.pause();
                    e.target.currentTime = 0;
                  }}
                >
                  <source src={reel.video} type="video/mp4" />
                </video>
                
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

      {/* Safety & Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
                Your Safety Is Our
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500"> Top Priority</span>
              </h2>
              
              <p className="text-gray-600 text-lg leading-relaxed">
                We maintain the highest safety standards with certified lifeguards, regular equipment checks, and crystal-clear water quality monitored 24/7.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: <FaShieldAlt />, title: "ISO Certified", desc: "International safety standards" },
                  { icon: <GiLifeBuoy />, title: "200+ Lifeguards", desc: "Always on duty" },
                  { icon: <FaWater />, title: "pH Balanced", desc: "Crystal clear water" },
                  { icon: <FaCheckCircle />, title: "Daily Testing", desc: "Quality assurance" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                    <div className="text-2xl text-blue-600">{item.icon}</div>
                    <div>
                      <h4 className="font-black text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-6 pt-4">
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
                className="rounded-4xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-6">
                <p className="text-4xl font-black text-blue-600">100%</p>
                <p className="text-gray-600 font-bold">Safety Record</p>
                <p className="text-xs text-gray-400">Zero major incidents</p>
              </div>
              <div className="absolute -top-6 -right-6 bg-yellow-400 rounded-2xl shadow-2xl p-6">
                <p className="text-2xl font-black text-gray-900">ISO 9001</p>
                <p className="text-xs text-gray-800">Certified</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* About */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-2xl font-black">
                  W
                </div>
                <span className="text-xl font-black">WaterParks</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Asia's premier water park destination. Creating unforgettable aquatic adventures since 2010 across multiple locations.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-all">
                  <FaFacebookF />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-all">
                  <FaInstagram />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-all">
                  <FaTwitter />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-all">
                  <FaYoutube />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-black mb-6">Quick Links</h4>
              <ul className="space-y-4">
                {["About Us", "Our Parks", "Rides & Attractions", "Gallery", "Contact", "Blog"].map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-gray-400 hover:text-white transition-all flex items-center gap-2 group">
                      <FaArrowRight className="text-xs text-blue-500 group-hover:translate-x-1 transition-transform" /> 
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-black mb-6">Support</h4>
              <ul className="space-y-4">
                {["FAQs", "Terms & Conditions", "Privacy Policy", "Refund Policy", "Careers", "Safety Guidelines"].map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-gray-400 hover:text-white transition-all">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-black mb-6">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-400">
                  <FaPhone className="text-blue-500" /> +91 12345 67890
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <FaEnvelope className="text-blue-500" /> info@waterparks.com
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <FaMapMarkerAlt className="text-blue-500" /> Dubai, UAE
                </li>
              </ul>
              
              {/* Newsletter */}
              <div className="mt-8">
                <h5 className="font-bold mb-3">Subscribe to Updates</h5>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="flex-1 px-4 py-3 bg-gray-800 rounded-l-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="px-4 py-3 bg-blue-600 rounded-r-xl hover:bg-blue-700 transition-all">
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>© 2024 WaterParks. All rights reserved. Making waves across Asia.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;