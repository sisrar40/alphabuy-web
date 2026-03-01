import React from "react";

const Categories = ({ categories, onCategoryClick }) => {
  return (
    <div className="bg-white py-12 border-b border-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex gap-8 overflow-x-auto scrollbar-hide pb-6 justify-center">
          {categories.map((category) => (
            <div
              key={category.slug}
              onClick={() => onCategoryClick?.(category.slug)}
              className="flex flex-col items-center cursor-pointer group flex-shrink-0"
            >
              <div className="w-28 h-28 bg-white overflow-hidden rounded-[32px] flex items-center justify-center shadow-soft border border-gray-100 group-hover:border-aqua-300 group-hover:shadow-premium transition-standard p-2">
                <div className="w-full h-full rounded-[24px] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>
              <p className="mt-4 text-xs font-bold text-gray-500 uppercase tracking-wider group-hover:text-aqua-600 transition-colors text-center">
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
