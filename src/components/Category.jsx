import React from "react";

const Categories = ({ categories, onCategoryClick }) => {
  return (
    <div className="bg-white pt-1">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((category) => (
            <div
              key={category.slug}
              onClick={() => onCategoryClick?.(category.slug)}
              className="flex flex-col items-center cursor-pointer group"
            >
              {/* Circular Background */}
              <div className="w-20 h-20 bg-gray-100 overflow-hidden rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                {/* Image perfectly fits inside the circle */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-20 h-20 transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              {/* Category Name */}
              <p className="mt-2 text-sm font-medium text-gray-700 group-hover:text-pink-600 transition-colors">
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
