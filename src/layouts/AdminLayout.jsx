import React, { useState } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaMapMarkedAlt,
  FaUtensils,
  FaCalendarAlt,
  FaTicketAlt,
  FaBook,
  FaHeadset,
  FaSignOutAlt,
  FaBars,
  FaUserCircle,
  FaBell,
  FaWater,
  FaUsers,
  FaCog,
  FaChartLine,
  FaCreditCard,
  FaPercent,
} from "react-icons/fa";
import { GiSpeedBoat } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin/login");
  };

  // Mock notifications
  const notifications = [
    { id: 1, message: "New booking received", time: "2 min ago", read: false },
    { id: 2, message: "Low inventory alert", time: "15 min ago", read: false },
    {
      id: 3,
      message: "New user registrations",
      time: "1 hour ago",
      read: true,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  const menuGroups = [
    {
      label: "MAIN CONTROL",
      items: [
        {
          name: "Analytics",
          path: "/admin/dashboard",
          icon: <FaTachometerAlt />,
        },
        { name: "Water Parks", path: "/admin/parks", icon: <FaMapMarkedAlt /> },
        { name: "Meal Plans", path: "/admin/meals", icon: <FaUtensils /> },
        {
          name: "Inventory",
          path: "/admin/dates",
          icon: <FaCalendarAlt />,
        },
        { name: "Rides", path: "/admin/rides", icon: <GiSpeedBoat /> },
      ],
    },
    {
      label: "CUSTOMER RELATIONS",
      items: [
        { name: "Promotions", path: "/admin/coupons", icon: <FaTicketAlt /> },
        { name: "Bookings", path: "/admin/bookings", icon: <FaBook /> },
        { name: "User Leads", path: "/admin/leads", icon: <FaHeadset /> },
        { name: "Reviews", path: "/admin/reviews", icon: <FaUsers /> },
      ],
    },
    {
      label: "FINANCIALS",
      items: [
        { name: "Revenue", path: "/admin/revenue", icon: <FaChartLine /> },
        {
          name: "Transactions",
          path: "/admin/transactions",
          icon: <FaCreditCard />,
        },
        { name: "Tax Reports", path: "/admin/taxes", icon: <FaPercent /> },
      ],
    },
    {
      label: "SETTINGS",
      items: [{ name: "Settings", path: "/admin/settings", icon: <FaCog /> }],
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-72" : "w-20"
        } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col z-50 shadow-sm`}
      >
        {/* Logo Area */}
        <div className="h-20 flex items-center justify-center px-4 border-b border-gray-100">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/admin/dashboard")}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-md">
              W
            </div>
            {isSidebarOpen && (
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 text-lg leading-none">
                  WATERPARKS
                </span>
                <span className="text-[8px] text-blue-500 uppercase tracking-wider mt-0.5">
                  Admin Panel
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto py-6 px-3">
          {menuGroups.map((group, idx) => (
            <div key={idx} className="mb-6">
              {isSidebarOpen && (
                <p className="px-3 mb-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  {group.label}
                </p>
              )}

              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = location.pathname === item.path;

                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`
                        flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 text-sm
                        ${
                          isActive
                            ? "bg-blue-600 text-white shadow-md"
                            : "text-gray-600 hover:bg-gray-100"
                        }
                        ${!isSidebarOpen && "justify-center"}
                      `}
                    >
                      <div className={`text-lg ${isSidebarOpen ? "mr-3" : ""}`}>
                        {item.icon}
                      </div>
                      {isSidebarOpen && (
                        <span className="font-medium">{item.name}</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className={`
              flex items-center w-full px-3 py-2.5 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200
              ${!isSidebarOpen && "justify-center"}
            `}
          >
            <div className={`text-lg ${isSidebarOpen ? "mr-3" : ""}`}>
              <FaSignOutAlt />
            </div>
            {isSidebarOpen && (
              <span className="text-sm font-medium">Logout</span>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-40">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
            >
              <FaBars />
            </button>

            <div className="h-6 w-px bg-gray-200"></div>

            <div>
              <span className="text-sm font-medium text-gray-500">Page /</span>
              <span className="text-sm font-bold text-gray-900 ml-1">
                {location.pathname.split("/").pop()?.toUpperCase() ||
                  "DASHBOARD"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all relative"
              >
                <FaBell />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center border border-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                  <div className="p-3 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer ${
                          !notification.read ? "bg-blue-50" : ""
                        }`}
                      >
                        <p className="text-sm text-gray-900">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.time}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-3 pl-2 border-l border-gray-200">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">Admin User</p>
                <p className="text-[10px] text-gray-500">Super Admin</p>
              </div>
              <div className="w-9 h-9 rounded-lg bg-gray-200 flex items-center justify-center text-gray-600">
                <FaUserCircle className="text-2xl" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
