import React, { useState } from "react";
import { FaHeart, FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between md:flex-row md:gap-4">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-800 shrink-0">
            MyLogo
          </div>

          <div className="hidden md:flex md:flex-1 md:max-w-lg md:mx-4">
            <div className="flex w-full">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search products"
                className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
                aria-label="Search"
              >
                <FaSearch />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-gray-600 text-xl shrink-0">
            <button
              className="hover:text-red-500 relative group"
              aria-label="Favorites"
            >
              <FaHeart />
              <span className="absolute hidden group-hover:block text-sm bg-gray-800 text-white px-2 py-1 rounded -bottom-8">
                Favorites
              </span>
            </button>
            <button
              className="hover:text-green-600 relative group"
              aria-label="Shopping Cart"
            >
              <FaShoppingCart />
              <span className="absolute hidden group-hover:block text-sm bg-gray-800 text-white px-2 py-1 rounded -bottom-8">
                Cart
              </span>
            </button>
            <button
              className="hover:text-blue-600 relative group"
              aria-label="User Profile"
            >
              <FaUser />
              <span className="absolute hidden group-hover:block text-sm bg-gray-800 text-white px-2 py-1 rounded -bottom-8">
                Profile
              </span>
            </button>
          </div>
        </div>

        <div className="mt-3 md:hidden">
          <div className="flex w-full">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search products"
              className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
              aria-label="Search"
            >
              <FaSearch />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
