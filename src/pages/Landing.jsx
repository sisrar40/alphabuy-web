import React, { useState } from "react";
import ImageCarousel from "../components/ImageCarousel";
import { images, ladiesCategories } from "../dummy/data";
import Categories from "../components/Category";
import MoviePreview from "../components/MoviePreview";
import {
  FaMapMarkerAlt,
  FaHeart,
  FaShare,
  FaDirections,
  FaCopy,
  FaCheck,
  FaCloudSun,
  FaTrophy,
} from "react-icons/fa";
import Button from "../components/ui/Button";
import { useAppNavigation } from "../hooks/useAppNavigation";

function Landing() {
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);
  const { navigateTo } = useAppNavigation();

  const handleCategoryClick = (slug) => {
    console.log("Category clicked:", slug);
  };

  const venueData = {
    title: "Indie & Longway Water Park",
    subtitle: "Premier Family Splash Adventure • nJoy Destination",
    distance: "0.39 km",
    status: "Highly Demanded",
    price: "₹1,296.82",
    priceNote: "Exclusive Member Rate",
    rating: 4.8,
    reviews: "42k+ Happy Families",
    location: "Magic Mountain, Home march, Sunny Da Dhaba",
    images: [
      "https://www.shirdi.wetnjoy.in/wp-content/uploads/2023/06/Wnj-shirdi-website-banner-2-1.jpg",
      "https://pbs.twimg.com/media/FGJQmbtVQAcF2p0.jpg",
      "https://images.all-free-download.com/images/thumbjpg/banner_90a_house_and_garage_music_template_dynamic_silhouette_6929855.jpg",
      "https://st3.depositphotos.com/1026931/19498/v/450/depositphotos_194983496-stock-illustration-amusement-park-landscape-banner.jpg",
    ],
  };

  const weatherData = [
    { day: "SAT", temp: "24°", status: "Sunny" },
    { day: "SUN", temp: "23°", status: "Breezy" },
    { day: "MON", temp: "24°", status: "Clear" },
  ];

  const couponCodes = [
    {
      code: "AQUAFIRST10",
      description: "Unlock a 10% splash discount on your first family booking.",
      discount: "10% OFF",
    },
    {
      code: "SPLASH20",
      description: "Join the VIP wave—20% off for all season pass holders.",
      discount: "20% OFF",
    },
  ];

  return (
    <div className="bg-primary min-h-screen pb-32">
      {/* Search/Category Hub */}
      <Categories
        categories={ladiesCategories}
        onCategoryClick={handleCategoryClick}
      />

      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Adventure Content */}
          <div className="lg:col-span-8 space-y-12">
            {/* Hero Adventure Carousel */}
            <div className="hover:shadow-premium transition-standard rounded-[40px] overflow-hidden">
               <ImageCarousel images={images} />
            </div>

            {/* Venue Intelligence Card */}
            <div className="bg-white rounded-[40px] p-10 shadow-soft border border-gray-50 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-aqua-50/50 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-aqua-100 transition-colors"></div>
               
               <div className="flex flex-col md:flex-row justify-between items-start gap-8 relative z-10">
                <div className="space-y-4">
                   <div className="flex items-center gap-2">
                      <span className="bg-aqua-50 text-aqua-600 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-lg flex items-center gap-2">
                        <FaTrophy className="text-xs" /> {venueData.status}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="text-xs font-bold text-gray-400">{venueData.reviews}</span>
                   </div>
                   <h1 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight font-display">
                    {venueData.title}
                   </h1>
                   <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em]">{venueData.subtitle}</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-standard ${
                      isFavorite
                        ? "bg-red-500 text-white shadow-lg shadow-red-500/20"
                        : "bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50"
                    }`}
                  >
                    <FaHeart className={isFavorite ? "fill-current" : ""} />
                  </button>
                  <button className="w-14 h-14 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center hover:text-aqua-600 hover:bg-aqua-50 transition-standard">
                    <FaShare />
                  </button>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-8 py-8 border-y border-gray-50">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-aqua-600 shadow-inner">
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <p className="text-sm font-black text-gray-900 leading-none mb-1">{venueData.distance}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none truncate max-w-[200px]">{venueData.location}</p>
                    </div>
                 </div>

                 <div className="h-10 w-[1px] bg-gray-100 hidden md:block"></div>

                 <div className="flex-1 flex justify-between items-center min-w-[300px]">
                    <div className="flex items-center gap-6">
                      {weatherData.map((weather, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">{weather.day}</span>
                          <span className="text-lg font-black text-gray-700">{weather.temp}</span>
                          <FaCloudSun className="text-aqua-400 text-xs mt-1" />
                        </div>
                      ))}
                    </div>

                    <div className="bg-aqua-gradient p-0.5 rounded-[24px] shadow-lg shadow-aqua-500/20">
                       <div className="bg-white rounded-[22px] px-8 py-4 flex items-center gap-4">
                          <div className="text-right">
                             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{venueData.priceNote}</p>
                             <p className="text-2xl font-black text-gray-900 tracking-tighter">{venueData.price}</p>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            </div>

            {/* Immersive Gallery Section */}
            <div className="bg-white rounded-[40px] p-8 shadow-soft border border-gray-50">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight font-display">Visual Journey</h3>
                  <button className="text-[10px] font-black text-aqua-600 uppercase tracking-widest hover:underline">View All 42 Photos</button>
               </div>
               
               <div className="grid grid-cols-12 gap-6 h-[500px]">
                  <div className="col-span-8 overflow-hidden rounded-[32px] group">
                    <img
                      src={venueData.images[activeImage]}
                      alt="Primary Experience"
                      className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                    />
                  </div>
                  <div className="col-span-4 grid grid-rows-4 gap-4">
                    {venueData.images.map((image, index) => (
                      <div 
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`relative cursor-pointer rounded-2xl overflow-hidden group transition-standard ${
                          activeImage === index ? "ring-4 ring-aqua-500 ring-offset-4" : "opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
                        }`}
                      >
                        <img src={image} className="w-full h-full object-cover group-hover:scale-125 transition-all duration-700" alt="Thumbnail" />
                        {activeImage === index && (
                           <div className="absolute inset-0 bg-aqua-500/20 backdrop-blur-[2px]"></div>
                        )}
                      </div>
                    ))}
                  </div>
               </div>
            </div>

            {/* Smart Map Card */}
            <div className="bg-white rounded-[40px] p-4 shadow-soft border border-gray-50 overflow-hidden group">
              <div className="bg-gray-50 rounded-[32px] h-80 flex items-center justify-center relative overflow-hidden">
                {/* Visual Map Texture (Mock) */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] grayscale"></div>
                
                <div className="relative text-center z-10 transition-standard group-hover:scale-105">
                  <div className="w-20 h-20 bg-aqua-gradient rounded-3xl flex items-center justify-center text-white text-3xl mx-auto mb-6 shadow-xl shadow-aqua-500/30">
                    <FaMapMarkerAlt />
                  </div>
                  <p className="text-2xl font-black text-gray-900 tracking-tight mb-2">
                    {venueData.title}
                  </p>
                  <p className="text-gray-400 font-bold text-xs uppercase tracking-widest max-w-[280px] mx-auto">{venueData.location}</p>
                  <button className="mt-8 aqua-btn px-10 py-4 flex items-center gap-3 mx-auto">
                    <FaDirections />
                    Launch Navigator
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Action Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Quick Access Portal */}
            <div className="bg-white rounded-[40px] p-10 shadow-premium border border-gray-50 sticky top-32">
              <div className="flex flex-col gap-8">
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight font-display">
                    Fast Booking
                  </h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Secure your family adventure in seconds</p>
                </div>
                
                <div className="space-y-4">
                  <Button 
                    variant="primary"
                    className="w-full !py-5 text-lg !rounded-2xl"
                    onClick={() => navigateTo("/booking")}
                  >
                    Quick Reserve
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full !py-4 !rounded-2xl border-2 border-aqua-50 focus:ring-0"
                    onClick={() => navigateTo("/entertainment")}
                  >
                    Explore Packages
                  </Button>
                </div>

                <div className="pt-8 border-t border-gray-50 space-y-6">
                   <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest text-center">Exclusive Splash Deals</p>
                   <div className="space-y-4">
                      {couponCodes.map((coupon, index) => (
                        <div key={index} className="bg-primary/50 group border border-gray-100 rounded-2xl p-5 hover:bg-aqua-50/50 hover:border-aqua-100 transition-standard">
                           <div className="flex items-center justify-between mb-2">
                              <span className="text-lg font-black text-aqua-600">{coupon.discount}</span>
                              <button 
                                onClick={() => {
                                  navigator.clipboard.writeText(coupon.code);
                                  setCopiedCode(coupon.code);
                                  setTimeout(() => setCopiedCode(null), 2000);
                                }}
                                className="text-gray-300 hover:text-aqua-500 transition-colors"
                              >
                                {copiedCode === coupon.code ? <FaCheck /> : <FaCopy />}
                              </button>
                           </div>
                           <p className="text-[10px] font-black text-gray-900 bg-white inline-block px-3 py-1 rounded-lg border border-gray-100 mb-3 uppercase tracking-widest shadow-sm">{coupon.code}</p>
                           <p className="text-[10px] font-bold text-gray-400 leading-relaxed uppercase tracking-widest">{coupon.description}</p>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* High Fidelity Featured Section */}
        <div className="mt-32 space-y-12">
          <div className="flex items-end justify-between">
            <div className="space-y-4">
              <span className="bg-aqua-50 text-aqua-600 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">Coming Attraction</span>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight font-display">
                Featured Entertainment
              </h2>
            </div>
            <Button variant="ghost" className="!rounded-full px-8">View Master List</Button>
          </div>

          <MoviePreview
            title="Demon Slayer: Infinity Castle"
            posterUrl="https://i0.wp.com/www.shutterstock.com/blog/wp-content/uploads/sites/5/2024/03/Stopmotion-poster.jpg?ssl=1"
            trailerLabel="Trailers (7)"
            isInterested={false}
            interestCount="99.3K"
            isInCinemas={true}
            duration="2h 35m"
            genres={["Action", "Adventure", "Anime"]}
            languages={["Japanese", "English", "+3"]}
            formatTags={["2D", "ICE", "4DX", "DOLBY CINEMA 2D", "MX4D", "IMAX 2D"]}
            rating={{ score: 9.5, votes: "99.3K" }}
            releaseDate="12 Sep, 2025"
          />
        </div>
      </div>
    </div>
  );
}

export default Landing;
