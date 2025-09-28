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

  // Sample search suggestions
  const searchSuggestions = [
    "Theme Park Tickets",
    "Water Park Passes",
    "Family Packages",
    "Season Pass",
    "VIP Experiences",
    "Group Discounts",
    "Fast Track Passes",
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      const searchBtn = document.querySelector(".search-btn");
      if (searchBtn) {
        searchBtn.classList.add("searching");
        setTimeout(() => {
          searchBtn.classList.remove("searching");
        }, 1000);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setShowSearchSuggestions(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSearchSuggestions(false);
    handleSearch();
  };

  // OTP input handling
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < 5) {
        setActiveOtpIndex(index + 1);
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      setActiveOtpIndex(index - 1);
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleSendOtp = () => {
    if (phoneNumber.length === 10) {
      setOtpSent(true);
      // Simulate OTP sending
      console.log("OTP sent to:", phoneNumber);
    }
  };

  const handleVerifyOtp = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length === 6) {
      // Simulate OTP verification
      console.log("OTP verified:", enteredOtp);
      setShowLoginModal(false);
      // Reset form
      setPhoneNumber("");
      setOtp(["", "", "", "", "", ""]);
      setOtpSent(false);
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pasteData)) {
      const newOtp = pasteData
        .split("")
        .concat(Array(6 - pasteData.length).fill(""));
      setOtp(newOtp);
      setActiveOtpIndex(Math.min(pasteData.length, 5));
    }
  };

  useEffect(() => {
    if (showLoginModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [showLoginModal]);

  return (
    <>
      <style jsx>{`
        @keyframes pulse-glow {
          0% {
            box-shadow: 0 0 5px rgba(34, 197, 94, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.8);
          }
          100% {
            box-shadow: 0 0 5px rgba(34, 197, 94, 0.5);
          }
        }

        @keyframes search-spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes slide-in {
          from {
            transform: translateX(-10px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes modal-appear {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .search-input:focus {
          animation: pulse-glow 2s infinite;
        }

        .search-btn.searching {
          animation: search-spin 1s ease-in-out;
        }

        .suggestion-item {
          animation: slide-in 0.3s ease-out;
        }

        .search-container {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .search-container.expanded {
          transform: scale(1.02);
        }

        .glass-effect {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.1);
        }

        .modal-overlay {
          animation: modal-appear 0.3s ease-out;
        }

        .otp-input:focus {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
        }
      `}</style>

      <header
        className={`sticky top-0 z-50 w-full shadow-md px-4 py-3 text-white transition-all duration-300 ${
          isScrolled
            ? "bg-black/80 backdrop-blur-md glass-effect"
            : "bg-gradient-to-r from-gray-900 via-gray-800 to-black"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between md:flex-row md:gap-4">
            <div
              onClick={() => navigateTo("/")}
              className="text-2xl cursor-pointer font-bold shrink-0 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"
            >
              Alphabuy
            </div>

            {/* Desktop Search */}
            <div className="hidden md:flex md:flex-1 md:max-w-lg md:mx-4">
              <div
                className={`search-container w-full relative transition-all duration-300 ${
                  isSearchFocused ? "expanded" : ""
                }`}
              >
                <div className="flex w-full relative">
                  <input
                    type="text"
                    placeholder="Search attractions, tickets..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSearchSuggestions(e.target.value.length > 0);
                    }}
                    onFocus={() => {
                      setIsSearchFocused(true);
                      setShowSearchSuggestions(searchQuery.length > 0);
                    }}
                    onBlur={() => {
                      setTimeout(() => setIsSearchFocused(false), 200);
                      setTimeout(() => setShowSearchSuggestions(false), 300);
                    }}
                    onKeyPress={handleKeyPress}
                    aria-label="Search products"
                    className="search-input w-full px-4 py-2 border-2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/50 text-white placeholder-green-300 transition-all duration-300 bg-gray-800/80 border-green-600 pr-10 rounded-r-none"
                  />

                  {searchQuery && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-24 cursor-pointer top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                      aria-label="Clear search"
                    >
                      <FaTimes className="text-sm" />
                    </button>
                  )}

                  <button
                    onClick={handleSearch}
                    className="search-btn px-6 py-3 cursor-pointer text-white rounded-2xl hover:opacity-90 transition-all duration-300 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 relative overflow-hidden group rounded-l-none border-l-0"
                    aria-label="Search"
                  >
                    <FaSearch className="relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>

                {/* Search Suggestions */}
                {showSearchSuggestions && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-green-600/30 overflow-hidden z-50">
                    <div className="p-2 max-h-60 overflow-y-auto">
                      {searchSuggestions
                        .filter((suggestion) =>
                          suggestion
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                        )
                        .map((suggestion, index) => (
                          <div
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="suggestion-item p-3 hover:bg-green-600/20 rounded-lg cursor-pointer transition-all duration-200 hover:translate-x-1 flex items-center"
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            <FaSearch className="text-green-400 mr-3 text-sm opacity-70" />
                            <span className="text-white">{suggestion}</span>
                          </div>
                        ))}

                      {searchQuery &&
                        searchSuggestions.filter((s) =>
                          s.toLowerCase().includes(searchQuery.toLowerCase())
                        ).length === 0 && (
                          <div className="p-3 text-gray-400 text-center">
                            No results found for "{searchQuery}"
                          </div>
                        )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Icons */}
            <div className="flex items-center space-x-4 text-white text-xl shrink-0">
              <button
                className="hover:text-green-400 relative cursor-pointer group transition-all duration-300 hover:scale-110"
                aria-label="Favorites"
              >
                <FaHeart />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
                <span
                  className={`absolute hidden group-hover:block text-sm text-white px-2 py-1 rounded-2xl -bottom-8 transition-all duration-300 ${
                    isScrolled ? "bg-black/80 backdrop-blur-sm" : "bg-gray-800"
                  }`}
                >
                  Favorites
                </span>
              </button>

              <button
                className="hover:text-green-400 cursor-pointer relative group transition-all duration-300 hover:scale-110"
                aria-label="Shopping Cart"
                onClick={() => navigateTo("/cart")}
              >
                <FaShoppingCart />
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  2
                </span>
                <span
                  className={`absolute hidden group-hover:block text-sm text-white px-2 py-1 rounded-2xl -bottom-8 transition-all duration-300 ${
                    isScrolled ? "bg-black/80 backdrop-blur-sm" : "bg-gray-800"
                  }`}
                >
                  Cart
                </span>
              </button>

              <button
                onClick={() => setShowLoginModal(true)}
                className="hover:text-green-400 cursor-pointer relative group transition-all duration-300 hover:scale-110"
                aria-label="User Profile"
              >
                <FaUser />
                <span
                  className={`absolute hidden group-hover:block text-sm text-white px-2 py-1 rounded-2xl -bottom-8 transition-all duration-300 ${
                    isScrolled ? "bg-black/80 backdrop-blur-sm" : "bg-gray-800"
                  }`}
                >
                  Profile
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div
            className={`mt-3 md:hidden transition-all duration-300 ${
              isScrolled ? "opacity-90" : "opacity-100"
            }`}
          >
            <div className="flex w-full relative">
              <input
                type="text"
                placeholder="Search attractions..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchSuggestions(e.target.value.length > 0);
                }}
                onFocus={() => setShowSearchSuggestions(searchQuery.length > 0)}
                onBlur={() =>
                  setTimeout(() => setShowSearchSuggestions(false), 300)
                }
                onKeyPress={handleKeyPress}
                aria-label="Search products"
                className="w-full px-4 py-3 border-2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/50 text-white placeholder-green-300 bg-gray-800/80 border-green-600 pr-12"
              />

              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-16 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label="Clear search"
                >
                  <FaTimes className="text-sm" />
                </button>
              )}

              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 text-white p-3 rounded-2xl hover:bg-green-700 transition-colors duration-300"
                aria-label="Search"
              >
                <FaSearch />
              </button>
            </div>

            {/* Mobile Search Suggestions */}
            {showSearchSuggestions && (
              <div className="absolute left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-green-600/30 overflow-hidden z-50">
                <div className="p-2 max-h-60 overflow-y-auto">
                  {searchSuggestions
                    .filter((suggestion) =>
                      suggestion
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                    .map((suggestion, index) => (
                      <div
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="suggestion-item p-3 hover:bg-green-600/20 rounded-2xl cursor-pointer transition-all duration-200"
                      >
                        <span className="text-white">{suggestion}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Login/Signup Modal */}
        {showLoginModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay overflow-y-auto">
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setShowLoginModal(false)}
            ></div>

            <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700/50 shadow-2xl max-w-md w-full mx-4">
              {/* Close Button */}
              <button
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-white transition-colors z-10"
              >
                <FaTimes className="text-xl" />
              </button>

              <div className="p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Login/Signup to Your Account
                  </h2>
                  <p className="text-gray-400">
                    Enter your Mobile/Whatsapp number
                  </p>
                </div>

                {/* Phone Input */}
                {!otpSent ? (
                  <div className="space-y-6">
                    <div className="relative">
                      <div className="flex items-center bg-gray-800/50 border border-gray-600 rounded-2xl px-4 py-3 focus-within:border-green-500 transition-colors">
                        <span className="text-white mr-2">+91</span>
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) =>
                            setPhoneNumber(
                              e.target.value.replace(/\D/g, "").slice(0, 10)
                            )
                          }
                          placeholder="Enter your Mobile/Whatsapp number"
                          className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-400"
                          maxLength={10}
                        />
                        {phoneNumber && (
                          <FaCheck className="text-green-500 ml-2" />
                        )}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4">
                      <div className="flex items-center text-green-400 mb-2">
                        <FaGift className="mr-2" />
                        <span className="font-semibold">
                          Earn share credits upto 2% as you go
                        </span>
                      </div>
                      <p className="text-green-300 text-sm">
                        Terms and conditions apply
                      </p>
                    </div>

                    {/* Get OTP Button */}
                    <button
                      onClick={handleSendOtp}
                      disabled={phoneNumber.length !== 10}
                      className="w-full cursor-pointer bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-2xl font-semibold hover:from-green-700 hover:to-green-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
                    >
                      Get OTP →
                    </button>

                    {/* Contact Options */}
                    <div className="flex space-x-4">
                      <button className="flex-1 cursor-pointer flex items-center justify-center space-x-2 bg-blue-600/20 text-blue-400 py-2 rounded-lg border border-blue-500/30 hover:bg-blue-600/30 transition-colors">
                        <FaPhone />
                        <span>Call</span>
                      </button>
                      <button className="flex-1 cursor-pointer flex items-center justify-center space-x-2 bg-green-600/20 text-green-400 py-2 rounded-lg border border-green-500/30 hover:bg-green-600/30 transition-colors">
                        <FaWhatsapp />
                        <span>WhatsApp</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* OTP Verification */
                  <div className="space-y-6">
                    <div className="text-center">
                      <p className="text-gray-400 mb-4">
                        Enter OTP sent to{" "}
                        <span className="text-white">+91 {phoneNumber}</span>
                      </p>

                      <div className="flex justify-center space-x-2 mb-6">
                        {otp.map((digit, index) => (
                          <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            value={digit}
                            onChange={(e) => handleOtpChange(e, index)}
                            onKeyDown={(e) => handleOtpKeyDown(e, index)}
                            onPaste={handleOtpPaste}
                            onFocus={() => setActiveOtpIndex(index)}
                            maxLength={1}
                            className="otp-input w-12 h-12 text-center text-white text-xl bg-gray-800/50 border-2 border-gray-600 rounded-lg focus:border-green-500 outline-none transition-colors"
                          />
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handleVerifyOtp}
                      disabled={otp.join("").length !== 6}
                      className="w-full cursor-pointer bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-2xl font-semibold hover:from-green-700 hover:to-green-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-300"
                    >
                      Verify OTP
                    </button>

                    <button
                      onClick={() => setOtpSent(false)}
                      className="w-full cursor-pointer text-gray-400 hover:text-white transition-colors"
                    >
                      Change Number
                    </button>
                  </div>
                )}

                {/* Footer */}
                <div className="mt-6 pt-6 border-t border-gray-600/50">
                  <p className="text-gray-400 text-sm text-center">
                    By continuing, you agree to the{" "}
                    <a href="#" className="text-green-400 hover:underline">
                      Terms and conditions
                    </a>{" "}
                    and acknowledge the{" "}
                    <a href="#" className="text-green-400 hover:underline">
                      Privacy Policy
                    </a>
                  </p>

                  <div className="flex items-center justify-center mt-4 text-gray-400">
                    <FaLock className="mr-2 text-green-400" />
                    <span className="text-sm">Secure & Encrypted</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
