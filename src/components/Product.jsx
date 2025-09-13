import React from "react";
import { FaShoppingCart, FaStar } from "react-icons/fa";

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
    // Add cart logic here
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-48 md:h-64 object-cover"
      />

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {title}
        </h3>
        <p className="text-sm text-gray-500">
          {brand} • {category}
        </p>
        <div className="flex items-center mt-1">
          <FaStar className="text-yellow-400" />
          <span className="text-sm text-gray-600 ml-1">{rating} / 5</span>
        </div>
        <div className="mt-2">
          <span className="text-xl font-bold text-blue-600">
            ${discountedPrice.toFixed(2)}
          </span>
          {discountPercentage > 0 && (
            <span className="text-sm text-gray-500 line-through ml-2">
              ${price.toFixed(2)}
            </span>
          )}
        </div>
        <p className="text-gray-600 mt-1 text-sm line-clamp-2">{description}</p>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="mt-4 flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={`Add ${title} to cart`}
        >
          <FaShoppingCart className="mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
