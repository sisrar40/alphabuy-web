import React, { useState } from "react";
import ImageCarousel from "../components/ImageCarousel";
import { dummyProductData, images, ladiesCategories } from "../dummy/data";
import Product from "../components/Product";
import Categories from "../components/Category";
import MoviePreview from "../components/MoviePreview";
import {
  FaMapMarkerAlt,
  FaStar,
  FaHeart,
  FaShare,
  FaDirections,
  FaCopy,
} from "react-icons/fa";
import Button from "../components/Button";
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
    subtitle: "at nJoy Water Park + Amusement Park",
    distance: "0.39 km",
    status: "Demanded",
    price: "₹1,296.82",
    priceNote: "from official site",
    rating: 4.4,
    reviews: "42,096 reviews",
    location: "Magic Mountain, Home march, Sunny Da Dhaba",
    images: [
      "https://www.shirdi.wetnjoy.in/wp-content/uploads/2023/06/Wnj-shirdi-website-banner-2-1.jpg",
      "https://pbs.twimg.com/media/FGJQmbtVQAcF2p0.jpg",
      "https://images.all-free-download.com/images/thumbjpg/banner_90a_house_and_garage_music_template_dynamic_silhouette_6929855.jpg",
      "https://st3.depositphotos.com/1026931/19498/v/450/depositphotos_194983496-stock-illustration-amusement-park-landscape-banner.jpg",
    ],
  };

  const weatherData = [
    { day: "Sat", temp: "24°" },
    { day: "Sun", temp: "23°" },
    { day: "Mon", temp: "24°" },
  ];

  const couponCodes = [
    {
      code: "YOURFIRST10",
      description: "Get upto 10% off on your first rental.",
      discount: "10% OFF",
    },
    {
      code: "WELCOME20",
      description: "Get 20% off on your first order.",
      discount: "20% OFF",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Categories Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700">
        <Categories
          categories={ladiesCategories}
          onCategoryClick={handleCategoryClick}
        />
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Gallery & Map */}
          <div className="lg:col-span-2 space-y-6">
            {/* Venue Header */}
            <ImageCarousel images={images} />
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-white">
                    {venueData.title}
                  </h1>
                  <p className="text-gray-400 mt-1">{venueData.subtitle}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-2 rounded-full transition-all duration-200 ${
                      isFavorite
                        ? "bg-red-500 text-white"
                        : "bg-gray-700/50 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    <FaHeart className={isFavorite ? "fill-current" : ""} />
                  </button>
                  <button className="p-2 bg-gray-700/50 text-gray-300 rounded-full hover:bg-gray-600 transition-all duration-200">
                    <FaShare />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-300 mb-4">
                <div className="flex items-center gap-1 bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
                  <FaMapMarkerAlt className="w-3 h-3" />
                  <span>{venueData.distance}</span>
                  <span className="ml-2">{venueData.status}</span>
                </div>
                <span>{venueData.location}</span>
              </div>

              {/* Price & Weather Row */}
              <div className="flex flex-wrap gap-6 items-center justify-between">
                <div className="bg-gradient-to-r from-[#08453E] to-[#1C9789] text-white px-4 py-3 rounded-lg">
                  <div className="text-2xl font-bold">{venueData.price}</div>
                  <div className="text-sm opacity-90">
                    {venueData.priceNote}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {weatherData.map((weather, index) => (
                    <div key={index} className="text-center">
                      <div className="text-gray-300 text-sm">{weather.day}</div>
                      <div className="text-white font-semibold">
                        {weather.temp}
                      </div>
                    </div>
                  ))}
                  <div className="text-xs text-gray-400">Google Weather</div>
                </div>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <div className="flex gap-4 mb-4">
                <div className="w-2/3">
                  <img
                    src={venueData.images[activeImage]}
                    alt="Main venue"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="w-1/3 grid grid-cols-2 gap-2">
                  {venueData.images.slice(0, 4).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className={`w-full h-16 object-cover rounded cursor-pointer transition-all duration-200 ${
                        activeImage === index
                          ? "ring-2 ring-[#1C9789]"
                          : "opacity-70 hover:opacity-100"
                      }`}
                      onClick={() => setActiveImage(index)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-bold text-white mb-4">Location</h3>
              <div className="bg-gray-700/30 rounded-lg h-64 flex items-center justify-center relative">
                {/* Mock Map */}
                <div className="text-center text-gray-400">
                  <FaMapMarkerAlt className="w-12 h-12 mx-auto mb-2 text-[#1C9789]" />
                  <p className="text-lg font-semibold text-white">
                    {venueData.title}
                  </p>
                  <p className="text-sm">{venueData.location}</p>
                  <button className="mt-3 flex items-center gap-2 bg-[#1C9789] text-white px-4 py-2 rounded-lg hover:bg-[#08453E] transition-all duration-200">
                    <FaDirections />
                    Get Directions
                  </button>
                </div>
                <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                  Map data ©2025 • Terms
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-bold text-white mb-4">Reviews</h3>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white">
                    {venueData.rating}
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < Math.floor(venueData.rating)
                            ? "fill-current"
                            : "text-gray-600"
                        }
                      />
                    ))}
                  </div>
                  <div className="text-gray-400 text-sm mt-1">
                    {venueData.reviews}
                  </div>
                </div>
                <div className="flex-1">
                  <Button className="w-full py-3 bg-gradient-to-r from-[#08453E] to-[#1C9789] text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-200">
                    Write a Review
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Products & Content */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 sticky top-4 z-10">
              <h3 className="text-lg font-bold text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full cursor-pointer py-3 bg-gradient-to-r from-[#08453E] to-[#1C9789] text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-200">
                  Book Tickets
                </button>
                <button
                  onClick={() => navigateTo("/entertainment")}
                  className="w-full cursor-pointer py-3 border border-[#1C9789] text-[#1C9789] rounded-lg font-semibold hover:bg-[#1C9789] hover:text-white transition-all duration-200"
                >
                  View Packages
                </button>
                <button className="w-full cursor-pointer py-3 border border-gray-600 text-gray-300 rounded-lg font-semibold hover:border-[#1C9789] hover:text-[#1C9789] transition-all duration-200">
                  Contact Venue
                </button>
              </div>
            </div>

            {/* Latest Products */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-bold text-white mb-4">
                Similar Venues
              </h3>
              <div className="space-y-4">
                {dummyProductData.slice(0, 3).map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 bg-gray-700/30 rounded-lg p-3 hover:bg-gray-700/50 transition-all duration-200"
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-white line-clamp-1">
                        {product.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[#1C9789] font-bold">
                          ₹{product.price}
                        </span>
                        <span className="text-gray-400 text-xs">per day</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weather Widget */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-bold text-white mb-4">
                Weather Forecast
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {weatherData.map((weather, index) => (
                  <div
                    key={index}
                    className="text-center p-3 bg-gray-700/30 rounded-lg"
                  >
                    <div className="text-gray-300 text-sm">{weather.day}</div>
                    <div className="text-white font-bold text-lg">
                      {weather.temp}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#08453E] rounded-xl mt-8 to-[#1C9789] text-white py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold mb-2">10% OFF</h1>
              <p className="text-lg opacity-90">
                Use code on your first booking
              </p>
            </div>

            {/* Coupon Codes */}
            <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {couponCodes.map((coupon, index) => (
                <div
                  key={index}
                  className="bg-black/20 rounded-xl p-4 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold">
                      {coupon.discount}
                    </span>
                    <button
                      onClick={() => copyToClipboard(coupon.code, coupon.code)}
                      className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-lg hover:bg-white/30 transition-all duration-200"
                    >
                      {copiedCode === coupon.code ? (
                        <>
                          <FaCheck className="text-green-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <FaCopy />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="mb-2">
                    <div className="font-mono text-lg font-bold">
                      {coupon.code}
                    </div>
                    <p className="text-sm opacity-90">{coupon.description}</p>
                  </div>
                  <p className="text-xs opacity-75">
                    Stay connected for community updates, support, and other
                    benefits
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Sections Below */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            Featured Entertainment
          </h2>

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
            formatTags={[
              "2D",
              "ICE",
              "4DX",
              "DOLBY CINEMA 2D",
              "MX4D",
              "IMAX 2D",
            ]}
            rating={{ score: 9.5, votes: "99.3K" }}
            releaseDate="12 Sep, 2025"
          />
        </div>
      </div>
    </div>
  );
}

export default Landing;
