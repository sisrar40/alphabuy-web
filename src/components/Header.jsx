import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaSearch,
  FaTimes,
  FaWater,
  FaMapMarkerAlt,
  FaTicketAlt,
  FaPercent,
  FaShieldAlt,
  FaBuilding,
  FaBell,
  FaBars,
  FaStar,
  FaCrown,
  FaBolt,
  FaFire,
  FaChevronRight,
  FaCheckCircle,
  FaWallet
} from "react-icons/fa";
import { GiSpeedBoat, GiWaterfall, GiPalmTree } from "react-icons/gi";
import { useAppNavigation } from "../hooks/useAppNavigation";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin, registerUser, logout, setAuthModal } from "../features/auth/authSlice";
import { resetBooking } from "../store/bookingSlice";
import { useAlert } from "../context/AlertContext";
import Button from "./ui/Button";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  // Remove local showLoginModal state
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, showAuthModal } = useSelector((state) => state.auth);

  const { navigateTo } = useAppNavigation();
  const { showAlert } = useAlert();

  const searchSuggestions = [
    { text: "Water Park Tickets", icon: <FaWater />, category: "Tickets" },
    { text: "Theme Park Passes", icon: <GiSpeedBoat />, category: "Passes" },
    { text: "Family Packages", icon: <GiPalmTree />, category: "Packages" },
    { text: "VIP Experiences", icon: <FaCrown />, category: "Premium" },
    { text: "Fast Track Passes", icon: <FaBolt />, category: "Access" },
    { text: "Season Pass", icon: <FaStar />, category: "Annual" },
    { text: "Group Discounts", icon: <FaPercent />, category: "Offers" },
  ];

  const notifications = [
    {
      id: 1,
      message: "Flash Sale: 30% off on all tickets!",
      time: "5 min ago",
      read: false,
      icon: <FaFire className="text-orange-500" />,
    },
    {
      id: 2,
      message: "Your booking is confirmed for AquaZen Park",
      time: "1 hour ago",
      read: false,
      icon: <FaCheckCircle className="text-green-500" />,
    },
    {
      id: 3,
      message: "New water slides now open!",
      time: "1 day ago",
      read: true,
      icon: <GiWaterfall className="text-blue-500" />,
    },
  ];

  const countryCodes = ["+91", "+1", "+44", "+61", "+65"];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetBooking());
    showAlert("Logged out successfully", "success");
    navigateTo("/");
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showAuthModal || showMobileMenu || showNotifications) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showAuthModal, showMobileMenu, showNotifications]);

  const clearSearch = () => {
    setSearchQuery("");
    setShowSearchSuggestions(false);
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    if (isRegistering) {
      if (!name || !email || !password) {
        showAlert("Please fill in all fields", "error");
        return;
      }
      try {
        const result = await dispatch(registerUser({ name, email, password, role: 'user' })).unwrap();
        showAlert("Account created successfully!", "success");
        dispatch(setAuthModal(false));
        // Clear fields
        setName("");
        setEmail("");
        setPassword("");
      } catch (err) {
        showAlert(err || "Registration failed", "error");
      }
    } else {
      if (!email || !password) {
        showAlert("Please enter email and password", "error");
        return;
      }
      try {
        await dispatch(loginAdmin({ email, password })).unwrap();
        showAlert("Logged in successfully!", "success");
        dispatch(setAuthModal(false));
        // Clear fields
        setEmail("");
        setPassword("");
      } catch (err) {
        showAlert(err || "Login failed", "error");
      }
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-500 ${isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg py-2"
          : "bg-white/80 backdrop-blur-sm border-b border-blue-100/50 py-4"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowMobileMenu(true)}
                className="lg:hidden w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600"
              >
                <FaBars />
              </button>

              <div
                onClick={() => navigateTo("/")}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className="relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg shadow-blue-500/30 group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
                    A
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                <div className="hidden sm:block">
                  <span className="text-lg sm:text-xl font-black text-gray-900 tracking-tight leading-none">
                    Alphabuy
                  </span>
                  <span className="text-[8px] font-bold text-blue-500 uppercase tracking-wider block">
                    Asia's Finest
                  </span>
                </div>
              </div>
            </div>

            {/* Location Selector */}
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-xl">
              <FaMapMarkerAlt className="text-blue-600" />
              <select className="bg-transparent border-none text-sm font-bold text-gray-900 focus:outline-none cursor-pointer">
                <option>Mumbai</option>
                <option>Delhi</option>
                <option>Bangalore</option>
                <option>Pune</option>
              </select>
            </div>

            {/* Desktop Search */}
            <div className="hidden lg:block flex-1 max-w-xl relative mx-4">
              <div
                className={`relative group transition-all duration-300 ${isSearchFocused ? "scale-[1.02]" : ""}`}
              >
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                  <FaSearch />
                </div>
                <input
                  type="text"
                  placeholder="Search for water parks, attractions, meals..."
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
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none font-medium text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FaTimes />
                  </button>
                )}

                {/* Search Suggestions */}
                {showSearchSuggestions && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300 z-50">
                    <div className="p-2">
                      {searchSuggestions
                        .filter((s) =>
                          s.text
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()),
                        )
                        .map((s, i) => (
                          <div
                            key={i}
                            className="px-4 py-3 hover:bg-blue-50 rounded-xl cursor-pointer flex items-center gap-4 transition-colors"
                            onClick={() => {
                              setSearchQuery(s.text);
                              setShowSearchSuggestions(false);
                            }}
                          >
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                              {s.icon}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-bold text-gray-900">
                                {s.text}
                              </p>
                              <p className="text-[10px] text-gray-500">
                                {s.category}
                              </p>
                            </div>
                            <FaChevronRight className="text-gray-400" />
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Notifications */}
              <button
                onClick={() => setShowNotifications(true)}
                className="relative p-2.5 sm:p-3 text-gray-600 hover:text-blue-600 transition-all hover:scale-110 bg-gray-50 rounded-xl"
              >
                <FaBell className="text-lg sm:text-xl" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-lg animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="hidden sm:flex items-center gap-2">
                  <button
                    onClick={() => navigateTo("/wallet")}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 transition-all text-xs font-bold"
                  >
                    <FaWallet className="text-sm" /> Wallet
                  </button>
                  <div className="relative group">
                    <button className="flex items-center gap-3 pl-2 pr-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg transition-all">
                      <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                        <FaUser />
                      </div>
                      <span className="text-xs font-bold whitespace-nowrap">
                        {user?.name?.split(" ")[0] || "Profile"}
                      </span>
                    </button>
                    <div className="absolute right-0 top-full w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden hidden group-hover:block animate-in fade-in slide-in-from-top-2 duration-200">
                      <button
                        onClick={() => navigateTo("/profile")}
                        className="w-full text-left px-5 py-3 hover:bg-gray-50 text-sm font-medium text-gray-700 flex items-center gap-2"
                      >
                        <FaUser className="text-blue-500" /> My Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-5 py-3 hover:bg-red-50 text-sm font-medium text-red-600 border-t border-gray-50 flex items-center gap-2"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => dispatch(setAuthModal(true))}
                  className="hidden sm:flex items-center gap-3 pl-2 pr-5 py-2 rounded-xl bg-gray-900 text-white hover:bg-gray-800 shadow-xl shadow-gray-900/10 transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <FaUser />
                  </div>
                  <span className="text-xs font-bold uppercase">Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-[200] lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowMobileMenu(false)}
          ></div>
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold">
                    W
                  </div>
                  <span className="font-black text-gray-900">Alphabuy</span>
                </div>
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Location Selector */}
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl">
                <FaMapMarkerAlt className="text-blue-600" />
                <select className="bg-transparent border-none text-sm font-bold text-gray-900 focus:outline-none w-full">
                  <option>Mumbai</option>
                  <option>Delhi</option>
                  <option>Bangalore</option>
                  <option>Pune</option>
                </select>
              </div>
            </div>

            <div className="p-6 space-y-2">
              {[
                {
                  icon: <FaWater />,
                  label: "Water Parks",
                  href: "/entertainment",
                },
                {
                  icon: <GiSpeedBoat />,
                  label: "Theme Parks",
                  href: "/entertainment",
                },
                { icon: <FaTicketAlt />, label: "Tickets", href: "/booking" },
                { icon: <FaPercent />, label: "Offers", href: "#offers" },
                { icon: <FaShieldAlt />, label: "Safety", href: "#safety" },
                {
                  icon: <FaBuilding />,
                  label: "Corporate",
                  href: "#corporate",
                },
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={() => {
                    navigateTo(item.href);
                    setShowMobileMenu(false);
                  }}
                  className="w-full flex items-center gap-4 p-3 hover:bg-blue-50 rounded-xl transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    {item.icon}
                  </div>
                  <span className="font-bold text-gray-900">{item.label}</span>
                </button>
              ))}
            </div>

            {!isAuthenticated && (
              <div className="absolute bottom-6 left-6 right-6">
                <button
                  onClick={() => {
                    setShowMobileMenu(false);
                    dispatch(setAuthModal(true));
                  }}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl flex items-center justify-center gap-3"
                >
                  <FaUser />
                  Sign In / Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="fixed inset-0 z-[150]">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowNotifications(false)}
          ></div>
          <div className="absolute right-4 top-20 w-96 bg-white rounded-2xl shadow-2xl animate-in slide-in-from-top-2 duration-300">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Notifications</h3>
              <button
                onClick={() => setShowNotifications(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${!notification.read ? "bg-blue-50/50" : ""
                    }`}
                >
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                      {notification.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {notification.time}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100">
              <button className="w-full text-center text-sm text-blue-600 font-bold hover:underline">
                View All Notifications
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div
            className="absolute inset-0"
            onClick={() => dispatch(setAuthModal(false))}
          ></div>

          <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
            <button
              onClick={() => dispatch(setAuthModal(false))}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FaTimes />
            </button>

            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white text-3xl mb-4 shadow-lg">
                  <FaWater />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  Welcome to Alphabuy
                </h2>
                <p className="text-sm text-gray-500">
                  Sign in to continue your splash adventure
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-6">
                {isRegistering && (
                  <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider ml-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl font-bold text-gray-900 placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-all"
                        required
                      />
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wider ml-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="hello@example.com"
                      className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl font-bold text-gray-900 placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wider ml-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl font-bold text-gray-900 placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading || !email || !password || (isRegistering && !name)}
                  className="w-full flex justify-center items-center !py-4 !rounded-xl text-base font-bold bg-gradient-to-r from-blue-600 to-cyan-500"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : isRegistering ? (
                    "Create Account"
                  ) : (
                    "Sign In"
                  )}
                </Button>

                <button
                  type="button"
                  onClick={() => setIsRegistering(!isRegistering)}
                  className="w-full text-center text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors"
                >
                  {isRegistering
                    ? "Already have an account? Sign In"
                    : "Don't have an account? Register"}
                </button>
              </form>

              {/* Social Login */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-xs text-center text-gray-400 mb-4">
                  Or continue with
                </p>
                <div className="flex justify-center gap-3">
                  <button className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-all">
                    G
                  </button>
                  <button className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-all">
                    f
                  </button>
                  <button className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-all">
                    in
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
