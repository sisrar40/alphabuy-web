import React, { useState, useEffect } from "react";
import {
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaSearch,
  FaTimes,
  FaPhone,
  FaWhatsapp,
  FaGift,
  FaLock,
  FaCheck,
} from "react-icons/fa";
import { useAppNavigation } from "../hooks/useAppNavigation";
import Button from "./ui/Button";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const { navigateTo } = useAppNavigation();

  const searchSuggestions = [
    "Theme Park Tickets",
    "Water Park Passes",
    "Family Packages",
    "Season Pass",
    "VIP Experiences",
    "Fast Track Passes",
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const clearSearch = () => {
    setSearchQuery("");
    setShowSearchSuggestions(false);
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < 5) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-standard ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-soft py-3"
            : "bg-white py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}
            <div
              onClick={() => navigateTo("/")}
              className="text-3xl cursor-pointer font-black font-display bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent flex items-center gap-2 group"
            >
              <div className="w-10 h-10 bg-aqua-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-aqua-500/20 group-hover:rotate-12 transition-standard">
                A
              </div>
              <span className="tracking-tighter">Alphabuy</span>
            </div>

            {/* Desktop Navigation Search */}
            <div className="hidden lg:flex flex-1 max-w-2xl relative">
              <div className={`w-full relative group transition-standard ${isSearchFocused ? 'scale-[1.01]' : ''}`}>
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-aqua-500 transition-colors">
                  <FaSearch />
                </div>
                <input
                  type="text"
                  placeholder="Find your next adventure..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchSuggestions(e.target.value.length > 0);
                  }}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => {
                    setTimeout(() => setIsSearchFocused(false), 200);
                    setTimeout(() => setShowSearchSuggestions(false), 300);
                  }}
                  className="w-full pl-14 pr-12 py-4 bg-gray-50 border border-gray-100 rounded-[20px] outline-none font-semibold text-gray-900 placeholder-gray-300 focus:bg-white focus:border-aqua-200 focus:ring-4 focus:ring-aqua-500/5 transition-standard shadow-inner-sm"
                />
                {searchQuery && (
                  <button onClick={clearSearch} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500">
                    <FaTimes />
                  </button>
                )}
                
                {/* Suggestions Dropdown */}
                {showSearchSuggestions && (
                  <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-3xl shadow-premium border border-gray-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="p-3">
                      {searchSuggestions
                        .filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((s, i) => (
                          <div key={i} className="px-5 py-3 hover:bg-aqua-50 rounded-2xl cursor-pointer flex items-center gap-4 text-gray-600 font-bold text-sm transition-colors">
                            <FaSearch className="text-aqua-300" />
                            {s}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button className="p-3 text-gray-400 hover:text-red-500 transition-colors relative">
                <FaHeart className="text-xl" />
                <span className="absolute top-2 right-2 w-4 h-4 bg-red-500 text-white text-[8px] font-black rounded-full flex items-center justify-center border-2 border-white">3</span>
              </button>
              
              <button 
                onClick={() => navigateTo("/cart")}
                className="p-3 text-gray-400 hover:text-aqua-600 transition-colors relative"
              >
                <FaShoppingCart className="text-xl" />
                <span className="absolute top-2 right-2 w-4 h-4 bg-aqua-500 text-white text-[8px] font-black rounded-full flex items-center justify-center border-2 border-white">2</span>
              </button>

              <div className="h-8 w-[1px] bg-gray-100 mx-2 hidden sm:block"></div>

              <button 
                onClick={() => setShowLoginModal(true)}
                className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 shadow-soft transition-standard group"
              >
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-400 shadow-sm group-hover:text-aqua-500">
                  <FaUser />
                </div>
                <span className="text-sm font-black text-gray-700">Account</span>
              </button>
            </div>
          </div>
        </div>

        {/* Login Modal */}
        {showLoginModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setShowLoginModal(false)}></div>
            <div className="relative bg-white rounded-[40px] shadow-premium max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-300">
              <button onClick={() => setShowLoginModal(false)} className="absolute top-8 right-8 text-gray-300 hover:text-gray-900 transition-colors">
                <FaTimes className="text-xl" />
              </button>

              <div className="p-12">
                <div className="text-center mb-10">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-aqua-50 text-aqua-600 text-3xl mb-6 shadow-sm border border-aqua-100/50">
                    <FaLock />
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-3">Family Access</h2>
                  <p className="text-gray-500 font-bold text-sm uppercase tracking-widest px-4">Secure login for your water adventure</p>
                </div>

                {!otpSent ? (
                  <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Registered Mobile</label>
                       <div className="flex items-center bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 focus-within:bg-white focus-within:border-aqua-200 transition-standard group">
                         <span className="text-gray-900 font-black mr-3">+91</span>
                         <input
                           type="tel"
                           value={phoneNumber}
                           onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                           placeholder="Enter 10 digit number"
                           className="flex-1 bg-transparent border-none outline-none text-gray-900 font-bold placeholder-gray-300"
                         />
                         {phoneNumber.length === 10 && <FaCheck className="text-emerald-500" />}
                       </div>
                    </div>

                    <div className="bg-aqua-50/50 border border-aqua-100 rounded-3xl p-6 flex items-start gap-4">
                      <div className="p-2 bg-white rounded-xl shadow-sm">
                        <FaGift className="text-aqua-500" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">Adventure Perks</p>
                        <p className="text-xs text-gray-500 mt-1 font-medium italic">Earn 2% share credits on every booking.</p>
                      </div>
                    </div>

                    <Button onClick={() => setOtpSent(true)} disabled={phoneNumber.length !== 10} className="w-full">
                      Generate Passcode
                    </Button>

                    <div className="grid grid-cols-2 gap-4">
                      <button className="flex items-center justify-center gap-2 py-3 border border-gray-100 rounded-2xl text-gray-600 text-xs font-bold hover:bg-gray-50 transition-colors">
                        <FaPhone className="text-aqua-400" /> Support
                      </button>
                      <button className="flex items-center justify-center gap-2 py-3 border border-gray-100 rounded-2xl text-gray-600 text-xs font-bold hover:bg-emerald-50 transition-colors">
                        <FaWhatsapp className="text-emerald-500" /> WhatsApp
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-300">
                    <div className="text-center">
                      <p className="text-gray-500 font-bold mb-6">Enter code sent to +91 {phoneNumber}</p>
                      <div className="flex justify-center gap-3">
                        {otp.map((d, i) => (
                          <input
                            key={i}
                            id={`otp-${i}`}
                            type="text"
                            value={d}
                            onChange={(e) => handleOtpChange(e, i)}
                            maxLength={1}
                            className="w-12 h-16 text-center text-2xl font-black bg-gray-50 border-2 border-transparent focus:border-aqua-500 focus:bg-white rounded-2xl outline-none transition-standard shadow-sm"
                          />
                        ))}
                      </div>
                    </div>

                    <Button className="w-full">Explore Now</Button>
                    <button onClick={() => setOtpSent(false)} className="w-full text-center text-xs font-black text-gray-400 uppercase tracking-widest hover:text-aqua-600 transition-colors">
                      Edit Number
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
