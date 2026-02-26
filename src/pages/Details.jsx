import React, { useState } from "react";
import Button from "../components/ui/Button";
import {
  FaStar,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaHeart,
  FaShare,
  FaChevronDown,
  FaArrowRight,
  FaCheckCircle,
  FaLocationArrow,
} from "react-icons/fa";
import { useAppNavigation } from "../hooks/useAppNavigation";

function Details() {
  const [activeTab, setActiveTab] = useState("description");
  const [isFavorite, setIsFavorite] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const { navigateTo } = useAppNavigation();

  const productDetails = {
    title: "Aqua-Zen Premium Experience",
    subtitle: "Ultimate Water Adventure & Family Destination",
    price: "₹1,296.82",
    period: "full access",
    rating: 4.9,
    reviews: "1.2k+ Explorers",
    location: "Lonavala, Maharashtra",
    availability: "Immediate Slot Available",
    images: [
      "https://media-cdn.tripadvisor.com/media/photo-s/05/32/5d/86/wet-n-joy-in-the-lake.jpg",
      "https://res.cloudinary.com/dwzmsvp7f/image/upload/f_auto,w_1280/c_crop%2Cg_custom%2Fv1756989100%2Fstftuzl5lldacp02z3h1.jpg",
      "https://shirdi.tourismindia.co.in/images//tourist-places/wet-n-joy-water-park-shirdi/wet-n-joy-water-park-shirdi-history-shirdi-tourism.jpg.jpg",
      "https://www.whitewaterwest.com/wp-content/uploads/2019/11/Hero-Whizzard-Wet-n-Joy-Water-Park-Lonavala-India.jpg",
    ],
  };

  const specifications = [
    { label: "Park Type", value: "Water + Amusement" },
    { label: "Age Group", value: "Ages 3 to 80" },
    { label: "Locker Room", value: "Premium Available" },
    { label: "Food Court", value: "7 Multi-Cuisine" },
    { label: "Costumes", value: "Rental Available" },
    { label: "Parking", value: "Free Valet" },
  ];

  const faqItems = [
    {
      question: "What should I carry for the water park?",
      answer: "We recommend comfortable nylon/lycra swimwear. Towels and lockers are available on rent at the venue. Don't forget your sunblock!",
    },
    {
      question: "Are outside foods allowed?",
      answer: "For hygiene and safety, outside food and beverages are not allowed inside the park. We have multiple multi-cuisine food courts for your convenience.",
    },
    {
      question: "Is there a group discount?",
      answer: "Yes, for groups of 20 or more, we offer exclusive rates. Please contact our support team for bulk booking inquiries.",
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl font-black text-gray-900 mb-6 font-display tracking-tight">Adventure Overview</h3>
            <p className="text-gray-500 font-bold leading-relaxed text-lg">
              Dive into the most exhilarating water adventure at Lonavala's premier destination. 
              Featuring high-velocity slides, lazy rivers, and an massive wave pool, there's a splash 
              for every member of the family. Our park is internationally certified for safety and 
              offers a premium resort-like experience.
            </p>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div className="flex items-center gap-4 bg-aqua-50/50 p-6 rounded-[24px] border border-aqua-100/50">
                  <FaCheckCircle className="text-aqua-600 text-xl" />
                  <span className="text-sm font-black text-gray-700 uppercase tracking-widest">Global Safety Standards</span>
               </div>
               <div className="flex items-center gap-4 bg-aqua-50/50 p-6 rounded-[24px] border border-aqua-100/50">
                  <FaCheckCircle className="text-aqua-600 text-xl" />
                  <span className="text-sm font-black text-gray-700 uppercase tracking-widest">Temperature Controlled Pools</span>
               </div>
            </div>
          </div>
        );

      case "specifications":
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl font-black text-gray-900 mb-6 font-display tracking-tight">Key Highlights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              {specifications.map((spec, index) => (
                <div key={index} className="flex justify-between py-4 border-b border-gray-50">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{spec.label}</span>
                  <span className="text-sm font-black text-gray-900">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "reviews":
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-2xl font-black text-gray-900 font-display tracking-tight">Visitor Echoes</h3>
               <div className="flex items-center gap-2 bg-amber-50 text-amber-600 px-4 py-2 rounded-xl font-black text-xs">
                 <FaStar /> {productDetails.rating} Rating
               </div>
            </div>
            <div className="space-y-6">
               {[1, 2].map((_, i) => (
                 <div key={i} className="bg-gray-50/50 border border-gray-100 rounded-[32px] p-8">
                    <div className="flex items-center gap-4 mb-4">
                       <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center font-black text-aqua-600 shadow-soft">R</div>
                       <div>
                          <p className="text-sm font-black text-gray-900">{i === 0 ? "Rahul S." : "Ananya M."}</p>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Verified Explorer</p>
                       </div>
                    </div>
                    <p className="text-gray-500 font-bold leading-relaxed">
                      "Absolutely fantastic experience! The slides were well-maintained and the 
                      staff was extremely helpful. My family had the best weekend ever. Highly recommended!"
                    </p>
                 </div>
               ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-primary pb-32">
      {/* High-Fidelity Hero Section */}
      <div className="relative h-[600px] overflow-hidden group">
        <img
          src={productDetails.images[0]}
          className="h-full w-full object-cover transition-all duration-1000 group-hover:scale-105"
          alt="Adventure Banner"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end pb-32 px-6">
           <div className="max-w-7xl mx-auto w-full">
              <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-10 rounded-[48px] max-w-4xl shadow-2xl relative overflow-hidden group/card">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-aqua-400/20 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                 
                 <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-8">
                    <div className="space-y-4">
                       <div className="flex items-center gap-3">
                          <span className="bg-aqua-500 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg shadow-aqua-500/20">Premier Access</span>
                          <div className="flex items-center gap-1.5 text-amber-400">
                             <FaStar /> <span className="text-white font-black text-xs">{productDetails.rating} Expert Choice</span>
                          </div>
                       </div>
                       <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-none font-display">
                        {productDetails.title}
                       </h1>
                       <div className="flex items-center gap-6 text-white/60 font-black text-xs uppercase tracking-widest px-1">
                          <span className="flex items-center gap-2"><FaMapMarkerAlt /> {productDetails.location}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                          <span>{productDetails.reviews}</span>
                       </div>
                    </div>

                    <div className="text-right pb-2">
                       <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">Adventure Starting At</p>
                       <p className="text-5xl font-black text-white tracking-tighter mb-4">{productDetails.price}</p>
                       <Button variant="primary" size="lg" className="px-12 !rounded-2xl" onClick={() => navigateTo("/booking")}>
                         Secure My Slots
                       </Button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-30">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Info Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* High-Fidelity Action Bar */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl transition-standard font-black text-xs uppercase tracking-widest shadow-soft ${
                  isFavorite ? "bg-red-500 text-white shadow-premium" : "bg-white border border-gray-100 text-gray-400 hover:text-red-500"
                }`}
              >
                <FaHeart /> {isFavorite ? "In My Heart" : "Save Choice"}
              </button>

              <button className="flex items-center gap-3 px-8 py-4 bg-white border border-gray-100 text-gray-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:text-aqua-600 transition-standard shadow-soft">
                <FaShare /> Spread Joy
              </button>
            </div>

            {/* Premium Tab Navigation */}
            <div className="bg-white rounded-[40px] p-4 shadow-soft border border-gray-50 inline-flex gap-2">
              {["description", "specifications", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-10 py-4 font-black transition-standard text-xs uppercase tracking-widest rounded-[32px] ${
                    activeTab === tab
                      ? "bg-aqua-gradient text-white shadow-premium"
                      : "text-gray-400 hover:text-aqua-600 hover:bg-aqua-50/50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Narrative Content */}
            <div className="bg-white rounded-[40px] p-12 shadow-soft border border-gray-50 min-h-[400px]">
              {renderTabContent()}
            </div>

            {/* Intelligent FAQ Section */}
            <div className="bg-white rounded-[40px] p-12 shadow-soft border border-gray-50">
              <div className="flex items-center justify-between mb-10">
                 <h3 className="text-3xl font-black text-gray-900 font-display tracking-tight">Need Clarity?</h3>
                 <div className="w-12 h-12 bg-aqua-50 rounded-2xl flex items-center justify-center text-aqua-600">?</div>
              </div>

              <div className="space-y-4">
                {faqItems.map((faq, index) => (
                  <div
                    key={index}
                    className="group border border-gray-50 rounded-[24px] overflow-hidden transition-standard hover:border-aqua-100 shadow-sm"
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="flex justify-between items-center w-full px-8 py-6 text-left transition-standard hover:bg-aqua-50/20"
                    >
                      <span className="text-sm font-black text-gray-700 uppercase tracking-widest">
                        {faq.question}
                      </span>
                      <FaChevronDown
                        className={`text-gray-300 transition-transform duration-500 ${
                          expandedFaq === index ? "rotate-180 text-aqua-600" : ""
                        }`}
                      />
                    </button>

                    {expandedFaq === index && (
                      <div className="px-8 pb-8 animate-in fade-in slide-in-from-top-2 duration-300">
                        <p className="text-gray-500 font-bold leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Promo Callout */}
              <div className="mt-12 p-8 bg-aqua-gradient rounded-[32px] flex items-center justify-between shadow-premium overflow-hidden relative">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -ml-16 -mt-16"></div>
                <div className="flex items-center gap-8 relative z-10">
                   <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/20 shadow-lg">
                      <span className="text-white font-black text-2xl">10%</span>
                   </div>
                   <div>
                     <h4 className="font-black text-white text-xl tracking-tight leading-none mb-1">AQUA-FIRST PROMO</h4>
                     <p className="text-white/60 font-bold text-xs uppercase tracking-widest">Valid on your premiere booking</p>
                   </div>
                </div>
                <button className="bg-white text-aqua-600 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-standard relative z-10">
                  Claim Magic
                </button>
              </div>
            </div>
          </div>

          {/* Sticky Action Sidepane */}
          <div className="lg:col-span-4 space-y-8">
            {/* Visual Snap Gallery */}
            <div className="bg-white rounded-[40px] p-8 shadow-soft border border-gray-50">
               <div className="flex items-center justify-between mb-6">
                 <h3 className="text-xl font-black text-gray-900 font-display">Visual Snap</h3>
                 <FaLocationArrow className="text-gray-200" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                 {productDetails.images.map((image, index) => (
                   <div key={index} className="h-32 rounded-2xl overflow-hidden group border border-gray-100 shadow-sm">
                      <img
                        src={image}
                        className="w-full h-full object-cover transition-standard group-hover:scale-125"
                        alt="Gallery View"
                      />
                   </div>
                 ))}
               </div>
            </div>

            {/* Kinetic Booking Card */}
            <div className="bg-white rounded-[40px] p-10 shadow-premium border border-gray-50 sticky top-32 group">
              <div className="flex flex-col gap-10">
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-aqua-500 uppercase tracking-widest">Pricing Strategy</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-gray-900 tracking-tighter">{productDetails.price}</span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">/ experience</span>
                  </div>
                </div>

                <div className="space-y-4 py-8 border-y border-gray-50">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Live Status</span>
                    <span className="text-xs font-black text-aqua-600 uppercase tracking-widest flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-aqua-500 animate-pulse"></span>
                      {productDetails.availability}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                     <span className="font-black text-gray-400 uppercase tracking-widest">Safe Passage</span>
                     <span className="font-black text-gray-700 capitalize flex items-center gap-2">
                        <FaShieldAlt className="text-aqua-400" /> Insured Adventure
                     </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button variant="ghost" className="w-full !py-5 !rounded-[20px] border-2 border-aqua-50 focus:ring-0">
                    Add to Wishful Thinking
                  </Button>
                  <Button variant="primary" size="lg" className="w-full !py-5 !rounded-[20px] shadow-premium" onClick={() => navigateTo("/booking")}>
                    Confirm Reservation
                  </Button>
                </div>

                <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] text-center">
                  Secure Socket Layer (SSL) Encrypted
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
