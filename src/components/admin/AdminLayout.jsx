import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaMapMarkedAlt,
  FaCalendarAlt,
  FaTicketAlt,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUserCircle
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../../store/adminAuthSlice";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FaTachometerAlt /> },
    { name: "Add Park", path: "/admin/parks/add", icon: <FaMapMarkedAlt /> },
    { name: "Available Dates", path: "/admin/dates/add", icon: <FaCalendarAlt /> },
    { name: "Manage Coupons", path: "/admin/coupons", icon: <FaTicketAlt /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100 bg-white">
          <span className="text-xl font-black text-blue-600 tracking-tight">AlphaBuy <span className="text-gray-800">Admin</span></span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <FaTimes size={20} />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all ${
                  isActive
                    ? "bg-blue-50 text-blue-600 border border-blue-100 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent"
                }`}
              >
                <div className={`mr-3 ${isActive ? 'text-blue-500' : 'text-gray-400'}`}>
                    {item.icon}
                </div>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content (Offset for Sidebar on lg screens) */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          sidebarOpen ? "md:ml-64" : ""
        }`}
      >
        {/* Top Navbar */}
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm h-16 flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-500 focus:outline-none hover:text-gray-700 bg-gray-50 p-2 rounded-lg border border-gray-200"
            >
              <FaBars size={20} />
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-700 bg-gray-50 py-1.5 px-3 rounded-full border border-gray-200">
               <FaUserCircle className="text-gray-400 text-lg" />
               Admin User
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center text-sm font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg border border-red-100 transition-colors"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </header>

        {/* Page Content Provider */}
        <main className="flex-1 p-6 md:p-8 bg-gray-50/50">
          <div className="max-w-7xl mx-auto">
             {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
