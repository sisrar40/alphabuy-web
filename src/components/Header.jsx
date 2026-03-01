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
  FaPercent,
  FaShieldAlt,
  FaBuilding,
  FaWater
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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showLoginModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showLoginModal]);

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
        className={`sticky top-0 z-50 w-full transition-all duration-500 ${
          isScrolled
            ? "glass-effect shadow-soft py-3"
            : "bg-white/80 backdrop-blur-sm border-b border-gray-50 py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}
            <div className="flex items-center gap-10">
              <div
                onClick={() => navigateTo("/")}
                className="text-3xl cursor-pointer font-bold tracking-tight flex items-center gap-4 group"
              >
                <div className="w-11 h-11 bg-premium-gradient rounded-2xl flex items-center justify-center text-white text-xl shadow-lg shadow-aqua-500/30 group-hover:rotate-6 group-hover:scale-105 transition-standard">
                  A
                </div>
                <span className="tracking-tighter hidden md:block text-gray-900">Alphabuy</span>
              </div>
            </div>

            {/* Desktop Navigation Search */}
            <div className="hidden xl:flex flex-1 max-w-lg relative mx-4">
              <div className={`w-full relative group transition-standard ${isSearchFocused ? 'scale-[1.02]' : ''}`}>
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-aqua-500 transition-colors">
                  <FaSearch />
                </div>
                <input
                  type="text"
                  placeholder="Search for water parks, meals..."
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
                  className="w-full pl-14 pr-12 py-3 bg-gray-50/50 border border-gray-100 rounded-2xl outline-none font-semibold text-gray-900 placeholder-gray-400 focus:bg-white focus:border-aqua-300 focus:ring-4 focus:ring-aqua-500/10 transition-standard text-sm"
                />
                {searchQuery && (
                  <button onClick={clearSearch} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                    <FaTimes />
                  </button>
                )}
                
                {/* Suggestions Dropdown */}
                {showSearchSuggestions && (
                  <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-3xl shadow-premium border border-gray-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300 z-50">
                    <div className="p-3">
                      {searchSuggestions
                        .filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((s, i) => (
                          <div key={i} className="px-5 py-3 hover:bg-aqua-50 rounded-2xl cursor-pointer flex items-center gap-4 text-gray-600 font-bold text-sm transition-colors">
                            <FaSearch className="text-aqua-400" />
                            {s}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <button className="p-3 text-gray-400 hover:text-red-500 transition-all hover:scale-110 relative group bg-gray-50 rounded-2xl">
                  <FaHeart className="text-lg group-hover:fill-current" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">3</span>
                </button>
                
                <button 
                  onClick={() => navigateTo("/cart")}
                  className="p-3 text-gray-400 hover:text-aqua-600 transition-all hover:scale-110 relative group bg-gray-50 rounded-2xl"
                >
                  <FaShoppingCart className="text-lg" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-aqua-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">2</span>
                </button>
              </div>

              <button 
                onClick={() => setShowLoginModal(true)}
                className="hidden sm:flex items-center gap-3 pl-2 pr-6 py-2 rounded-2xl bg-gray-900 text-white hover:bg-gray-800 shadow-xl shadow-gray-900/10 transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <FaUser />
                </div>
                <span className="text-xs font-black uppercase tracking-widest">Sign In</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Login Modal - Fixed positioning */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
          {/* Backdrop */}
          <div className="absolute inset-0" onClick={() => setShowLoginModal(false)}></div>
          
          {/* Modal */}
          <div className="relative bg-white rounded-[40px] shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 slide-in-from-bottom-10 duration-300">
            <button 
              onClick={() => setShowLoginModal(false)} 
              className="absolute top-6 right-6 z-10 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FaTimes className="text-lg" />
            </button>

            <div className="p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-aqua-50 to-blue-50 text-aqua-600 text-3xl mb-6 shadow-lg border border-aqua-100">
                  <FaLock />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Welcome Back!</h2>
                <p className="text-gray-500 text-sm">Sign in to continue your water adventure</p>
              </div>

              {!otpSent ? (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider ml-2">Registered Mobile Number</label>
                    <div className="flex items-center bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 focus-within:border-aqua-300 focus-within:bg-white transition-all group">
                      <span className="text-gray-900 font-bold mr-3 text-lg">+91</span>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                        placeholder="98765 43210"
                        className="flex-1 bg-transparent border-none outline-none text-gray-900 font-bold text-lg placeholder-gray-400"
                        autoFocus
                      />
                      {phoneNumber.length === 10 && (
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white">
                          <FaCheck className="text-xs" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-aqua-50 to-blue-50 rounded-2xl p-5 flex items-start gap-4">
                    <div className="p-2 bg-white rounded-xl shadow-sm shrink-0">
                      <FaGift className="text-aqua-500 text-xl" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">Exclusive Member Benefits</p>
                      <p className="text-xs text-gray-600 mt-1">Get 2% cashback on every booking & early access to offers</p>
                    </div>
                  </div>

                  <Button 
                    onClick={() => setOtpSent(true)} 
                    disabled={phoneNumber.length !== 10} 
                    className="w-full py-4 text-base"
                  >
                    Send OTP
                  </Button>

                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 py-3 border-2 border-gray-100 rounded-xl text-gray-600 text-xs font-bold hover:bg-gray-50 hover:border-gray-200 transition-all">
                      <FaPhone className="text-aqua-500" /> 
                      <span>Help</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 py-3 border-2 border-gray-100 rounded-xl text-gray-600 text-xs font-bold hover:bg-emerald-50 hover:border-emerald-200 transition-all">
                      <FaWhatsapp className="text-emerald-500 text-base" /> 
                      <span>WhatsApp</span>
                    </button>
                  </div>

                  <p className="text-center text-xs text-gray-400">
                    By continuing, you agree to our <a href="#" className="text-aqua-600 font-bold hover:underline">Terms</a> & <a href="#" className="text-aqua-600 font-bold hover:underline">Privacy Policy</a>
                  </p>
                </div>
              ) : (
                <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-300">
                  <div className="text-center">
                    <p className="text-gray-600 mb-6">Enter the 6-digit code sent to</p>
                    <p className="text-xl font-bold text-gray-900 mb-8">+91 {phoneNumber}</p>
                    
                    <div className="flex justify-center gap-2 md:gap-3 mb-6">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          id={`otp-${index}`}
                          type="text"
                          value={digit}
                          onChange={(e) => handleOtpChange(e, index)}
                          onKeyDown={(e) => {
                            if (e.key === "Backspace" && !digit && index > 0) {
                              document.getElementById(`otp-${index - 1}`)?.focus();
                            }
                          }}
                          maxLength={1}
                          className="w-12 h-14 md:w-14 md:h-16 text-center text-2xl font-bold bg-gray-50 border-2 border-gray-200 focus:border-aqua-500 focus:bg-white rounded-xl outline-none transition-all"
                          autoFocus={index === 0}
                        />
                      ))}
                    </div>

                    <p className="text-sm text-gray-500 mb-2">
                      Didn't receive code? <button className="text-aqua-600 font-bold hover:underline">Resend</button>
                    </p>
                  </div>

                  <Button 
                    className="w-full py-4 text-base"
                    onClick={() => {
                      // Handle OTP verification
                      console.log("Verifying OTP:", otp.join(""));
                    }}
                  >
                    Verify & Sign In
                  </Button>
                  
                  <button 
                    onClick={() => {
                      setOtpSent(false);
                      setOtp(["", "", "", "", "", ""]);
                    }} 
                    className="w-full text-center text-sm font-bold text-gray-500 hover:text-aqua-600 transition-colors"
                  >
                    ← Use different number
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;