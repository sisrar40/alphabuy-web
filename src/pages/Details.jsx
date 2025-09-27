import React, { useState } from "react";
import Button from "../components/Button";
import {
  FaStar,
  FaMapMarkerAlt,
  FaClock,
  FaShieldAlt,
  FaHeart,
  FaShare,
  FaChevronDown,
  FaChevronUp,
  FaArrowRight,
} from "react-icons/fa";

function Details() {
  const [activeTab, setActiveTab] = useState("description");
  const [isFavorite, setIsFavorite] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const productDetails = {
    title: "Premium PlayStation 5 Console with VR Bundle",
    category: "Gaming Consoles",
    price: "₹695.02",
    period: "per day",
    rating: 4.8,
    reviews: 1247,
    location: "Connaught Place, Delhi",
    deliveryTime: "10:00 AM - 12:00 PM",
    minRental: "2 days minimum",
    availability: "Available Now",
    images: [
      "https://media-cdn.tripadvisor.com/media/photo-s/05/32/5d/86/wet-n-joy-in-the-lake.jpg",
      "https://res.cloudinary.com/dwzmsvp7f/image/upload/f_auto,w_1280/c_crop%2Cg_custom%2Fv1756989100%2Fstftuzl5lldacp02z3h1.jpg",
      "https://shirdi.tourismindia.co.in/images//tourist-places/wet-n-joy-water-park-shirdi/wet-n-joy-water-park-shirdi-history-shirdi-tourism.jpg.jpg",
      "https://www.whitewaterwest.com/wp-content/uploads/2019/11/Hero-Whizzard-Wet-n-Joy-Water-Park-Lonavala-India.jpg",
    ],
  };

  const descriptionText = `Experience next-generation gaming with the PlayStation 5 console. This premium bundle includes the PS5 Digital Edition, VR headset, two DualSense wireless controllers, and a collection of popular games.

Features:
• 4K Gaming at 120Hz
• Lightning Fast Loading with SSD
• HDR Technology
• 3D Audio Support
• VR Ready with PlayStation VR2
• Includes 5 popular games

Perfect for gamers looking for the ultimate entertainment experience. The console is regularly sanitized and comes with a 6-month warranty. Delivery and pickup available across Delhi.`;

  const specifications = [
    { label: "Storage", value: "825GB SSD" },
    { label: "Resolution", value: "Up to 8K" },
    { label: "Refresh Rate", value: "Up to 120Hz" },
    { label: "Controller", value: "DualSense Wireless" },
    { label: "VR Support", value: "PlayStation VR2" },
    { label: "Warranty", value: "6 Months" },
  ];

  const reviews = [
    {
      name: "Rahul Sharma",
      rating: 5,
      comment: "Amazing console! Perfect condition and fast delivery.",
      date: "2 days ago",
    },
    {
      name: "Priya Patel",
      rating: 4,
      comment: "Great experience overall. Would rent again!",
      date: "1 week ago",
    },
  ];

  const deliveryInfo = {
    areas: ["All over Delhi", "Gurgaon", "Noida", "Faridabad"],
    timing: "10:00 AM - 8:00 PM",
    charges: "₹199 delivery charges apply",
    freePickup: "Free pickup available from our stores",
  };

  const faqItems = [
    {
      question: "Are the products new or used?",
      answer:
        "All products offered on Rentkar are in like-new condition. Each item undergoes thorough quality checks, cleaning, and testing after every return, so you always receive a product that's ready to perform at its best.",
    },
    {
      question: "What kinds of products can?",
      answer:
        "Rentkar offers a wide range of products including electronics, gaming consoles, home appliances, outdoor equipment, and special occasion items.",
    },
    {
      question: "What is the rental period?",
      answer:
        "You can rent products for a minimum of 1 day up to several months. The pricing varies based on the rental duration.",
    },
    {
      question: "Is delivery available?",
      answer:
        "Yes, we offer delivery across Delhi. Delivery charges of ₹199 will apply. Pick-up is free from our designated locations.",
    },
  ];

  const testimonials = [
    {
      name: "Roy",
      comment:
        "Check services! Very easy to rent and stop have good quality products as well! Have had no issues in the...",
      time: "2 weeks ago",
      rating: 5,
    },
    {
      name: "Roy land ka baal",
      comment:
        "Check services! Very easy to rent and stop have good quality products as well! Have had no issues in the...",
      time: "2 weeks ago",
      rating: 3,
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-xl font-bold mb-4">Description</h3>
            <div className="text-gray-300 leading-relaxed whitespace-pre-line">
              {descriptionText}
            </div>
          </div>
        );

      case "specifications":
        return (
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-xl font-bold mb-4">Specifications</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {specifications.map((spec, index) => (
                <div
                  key={index}
                  className="flex justify-between py-3 border-b border-gray-700/30"
                >
                  <span className="text-gray-400 font-medium">
                    {spec.label}
                  </span>
                  <span className="text-white font-semibold">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "reviews":
        return (
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
            <div className="max-w-4xl mx-auto ">
              <div className="grid md:grid-cols-2 gap-6">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center">
                        <span className="text-black font-bold text-lg">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">
                          {testimonial.name}
                        </h4>
                        <div className="flex items-center gap-1 text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-3">
                      "{testimonial.comment}"
                    </p>
                    <span className="text-gray-400 text-sm">
                      {testimonial.time}
                    </span>
                  </div>
                ))}

                {/* Add more testimonials or placeholder */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 flex items-center justify-center">
                  <p className="text-gray-400 text-center">
                    Share your experience and be featured here!
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case "delivery":
        return (
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-xl font-bold mb-4">Delivery Information</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Delivery Areas</h4>
                <ul className="text-gray-300 list-disc list-inside">
                  {deliveryInfo.areas.map((area, index) => (
                    <li key={index}>{area}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Delivery Timing</h4>
                <p className="text-gray-300">{deliveryInfo.timing}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Charges</h4>
                <p className="text-gray-300">{deliveryInfo.charges}</p>
                <p className="text-green-400 text-sm mt-1">
                  {deliveryInfo.freePickup}
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 pt-4 pb-8">
        {/* Banner Section */}
        <div className="relative h-72 md:h-80 lg:h-96 rounded-2xl  shadow-2xl mb-20 md:mb-28">
          <img
            src="https://previews.123rf.com/images/avian/avian1805/avian180500004/100944910-amusement-park-landscape-banner-with-carousels-roller-coaster-and-air-balloon-circus-fun-fair-and.jpg"
            className="h-full w-full object-cover"
            alt="Product Banner"
          />

          {/* Overlapping Card */}
          <div className="absolute -bottom-30 md:-bottom-24 left-4 right-4 md:left-6 md:right-6">
            <div className="bg-gray-900/90 backdrop-blur-xl rounded-2xl p-6 border border-green-700/50 shadow-2xl">
              {/* Mobile Layout */}
              <div className="md:hidden">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={productDetails.images[0]}
                    className="h-16 w-16 rounded-xl object-cover shadow-lg"
                    alt="Product"
                  />
                  <div>
                    <h1 className="text-lg font-bold">
                      {productDetails.title}
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                      <FaStar className="text-yellow-400 text-sm" />
                      <span className="text-xs text-gray-300">
                        {productDetails.rating} ({productDetails.reviews}{" "}
                        reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-green-400">
                      {productDetails.price}
                    </span>
                    <span className="text-gray-400 text-sm ml-2">
                      {productDetails.period}
                    </span>
                  </div>
                  <Button>Book now</Button>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:flex justify-between items-center">
                <div className="flex items-center gap-6">
                  <img
                    src={productDetails.images[0]}
                    className="h-20 w-20 rounded-xl object-cover shadow-lg"
                    alt="Product"
                  />
                  <div>
                    <h1 className="text-xl font-bold mb-1">
                      {productDetails.title}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-gray-300">
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-400" />
                        <span>
                          {productDetails.rating} ({productDetails.reviews}{" "}
                          reviews)
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaMapMarkerAlt />
                        <span>{productDetails.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="mb-2">
                    <span className="text-2xl font-bold text-green-400">
                      {productDetails.price}
                    </span>
                    <span className="text-gray-400 ml-2">
                      {productDetails.period}
                    </span>
                  </div>
                  <Button>Book now</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`flex items-center cursor-pointer gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              isFavorite
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:border-gray-600/70"
            }`}
          >
            <FaHeart className={isFavorite ? "fill-green-400" : ""} />
            {isFavorite ? "Saved" : "Save"}
          </button>

          <button className="flex items-center cursor-pointer gap-2 px-4 py-2 rounded-lg bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:border-gray-600/70 transition-all duration-200">
            <FaShare />
            Share
          </button>
        </div>

        {/* Content Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-700 overflow-x-auto">
              {["description", "specifications", "reviews", "delivery"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 font-medium capitalize whitespace-nowrap transition-all duration-200 border-b-2 ${
                      activeTab === tab
                        ? "border-green-400 text-green-400"
                        : "border-transparent text-gray-400 hover:text-gray-300"
                    }`}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>

            {/* Tab Content */}
            {renderTabContent()}

            {/* FAQ Section (Always visible) */}
            <div className="bg-gray-800/30  backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-bold mb-6">
                Frequently asked questions
              </h3>

              <div className="space-y-4">
                {faqItems.map((faq, index) => (
                  <div
                    key={index}
                    className="cursor-pointer p-4 bg-[#1B2221] rounded-xl"
                  >
                    <button
                      onClick={() =>
                        setExpandedFaq(expandedFaq === index ? null : index)
                      }
                      className="flex justify-between items-center w-full text-left cursor-pointer"
                    >
                      <span className="text-gray-300 cursor-pointer">
                        {faq.question}
                      </span>
                      <FaChevronDown
                        className={`transform transition-transform duration-200 cursor-pointer ${
                          expandedFaq === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {expandedFaq === index && (
                      <div className="mt-1 text-gray-400 text-sm leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Coupon Section */}
              <div className="mt-8 p-4 bg-gradient-to-r from-green-900/30 to-green-800/20 rounded-lg border border-green-700/30">
                <div className="text-center mb-4">
                  <p className="text-gray-300 text-sm">
                    Apply coupon in next step
                  </p>
                </div>

                <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-black font-bold text-sm">10%</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">YOUR FIRST 10</h4>
                      <p className="text-sm text-gray-300">
                        Get upto 10% off on your first rental.
                      </p>
                    </div>
                  </div>
                  <FaArrowRight className="text-green-400" />
                </div>
              </div>

              {/* Share Credits Section */}
              <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-700/30">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <FaShare className="text-blue-400" />
                  Share credits
                </h4>
                <p className="text-lg font-bold text-blue-300 mb-2">
                  100 credits = 100 Rupees
                </p>
                <p className="text-sm text-gray-300">
                  Earn share credits of up to 2% whenever you rent or share
                  something on the platform. It's simple, rewarding, and built
                  to benefit our community.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Gallery & Booking Card */}
          <div className="lg:col-span-1 space-y-6">
            {/* Gallery */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-bold mb-4">Gallery</h3>
              <div className="grid grid-cols-2 gap-3">
                {productDetails.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    className="w-full h-24 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform duration-200"
                    alt={`Product view ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Booking Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 sticky top-24">
              <h3 className="text-xl font-bold mb-4">Booking Details</h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Price</span>
                  <span className="text-2xl font-bold text-green-400">
                    {productDetails.price}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Availability</span>
                  <span className="text-green-400 font-medium">
                    {productDetails.availability}
                  </span>
                </div>

                <div className="space-y-3 pt-4">
                  <Button> Add to Cart</Button>
                  <Button>Book now</Button>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-400 mt-4">
                  <FaShieldAlt className="text-green-400" />
                  <span>Secure booking with 24/7 support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
