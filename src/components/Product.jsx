import React from "react";
import { FaArrowRight, FaStar } from "react-icons/fa";

const Product = ({
  id,
  title,
  description,
  price,
  discountPercentage,
  rating,
  brand,
  category,
  thumbnail,
}) => {
  const discountedPrice = price * (1 - discountPercentage / 100);

  const handleAddToCart = () => {
    console.log(`Added ${title} (ID: ${id}) to cart`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col border border-gray-100">
      {/* Product Image */}
      <div className="relative">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-48 md:h-56 object-cover"
        />

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
            -{Math.round(discountPercentage)}%
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title & Brand */}
        <h3 className="text-md font-semibold text-gray-900 mb-1 line-clamp-2">
          {title}
        </h3>
        <p className="text-xs text-gray-500 mb-2">
          {brand} • {category}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 text-yellow-500 text-sm mb-3">
          <FaStar />
          <span className="text-gray-700">{rating.toFixed(1)} / 5</span>
        </div>

        {/* Price Section */}

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="mt-auto flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-all duration-200"
        >
          Explore now
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Product;
