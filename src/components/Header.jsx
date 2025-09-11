import React from "react";
import { FaHeart, FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";

const Header = () => {
  return (
    <header className="w-full bg-white shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <div className="text-2xl font-bold text-gray-800">MyLogo</div>

        {/* Center: Search Bar */}
        <div className="flex-1 mx-6">
          <div className="flex">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700">
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center space-x-4 text-gray-600 text-xl">
          <button className="hover:text-red-500">
            <FaHeart />
          </button>
          <button className="hover:text-green-600">
            <FaShoppingCart />
          </button>
          <button className="hover:text-blue-600">
            <FaUser />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
