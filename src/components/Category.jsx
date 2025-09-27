import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const Categories = ({ categories, onCategoryClick }) => {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Coupon Banner Section */}

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 justify-center">
          {categories.map((category) => (
            <div
              key={category.slug}
              onClick={() => onCategoryClick?.(category.slug)}
              className="flex flex-col items-center cursor-pointer group flex-shrink-0"
            >
              <div className="w-24 h-24 bg-gray-700/50 backdrop-blur-sm overflow-hidden rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 border border-gray-600/50 group-hover:border-green-400">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-24 h-24 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <p className="mt-3 text-sm font-medium text-gray-300 group-hover:text-green-400 transition-colors text-center">
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
