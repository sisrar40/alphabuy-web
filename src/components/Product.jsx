import React, { useState } from "react";
import { FaArrowRight, FaStar, FaHeart, FaEye } from "react-icons/fa";
import Button from "./Button";

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
  variant = "default",
  showQuickActions = true,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const discountedPrice = price * (1 - discountPercentage / 100);
  const hasDiscount = discountPercentage > 0;

  const handleAddToCart = () => {
    console.log(`Added ${title} (ID: ${id}) to cart`);
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleQuickView = () => {
    console.log(`Quick view: ${title}`);
  };

  // Quick actions component
  const QuickActions = () => (
    <div
      className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
        isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
      }`}
    >
      <button
        onClick={handleFavorite}
        className={`p-2 rounded-full shadow-lg transition-all duration-200 ${
          isFavorite
            ? "bg-red-500 text-white shadow-lg"
            : "bg-white text-gray-400 border border-gray-100 hover:bg-red-50 hover:text-red-500 shadow-soft"
        }`}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <FaHeart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
      </button>

      <button
        onClick={handleQuickView}
        className="p-2 bg-white text-gray-400 border border-gray-100 rounded-full shadow-soft hover:bg-aqua-50 hover:text-aqua-600 transition-all duration-200"
        aria-label="Quick view"
      >
        <FaEye className="w-4 h-4" />
      </button>
    </div>
  );

  if (variant === "minimal") {
    return (
      <div
        className="bg-[var(--card-bg)] backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[var(--border-color)] overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-44 object-cover"
          />
          {hasDiscount && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] px-2 py-1 rounded-lg shadow-lg font-bold uppercase tracking-wider">
              {Math.round(discountPercentage)}% OFF
            </span>
          )}
          {showQuickActions && <QuickActions />}
        </div>

        <div className="p-5">
          <h3 className="text-base font-bold text-[var(--text-color)] mb-1 line-clamp-1">
            {title}
          </h3>
          <p className="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wide">{brand}</p>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-green-600">
                ₹{price.toFixed(0)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-gray-400 line-through font-medium">
                  ₹{discountedPrice.toFixed(0)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Per Day</span>
          </div>

          <Button onClick={handleAddToCart} className="py-2.5 text-sm">Rent Now</Button>
        </div>
      </div>
    );
  }

  if (variant === "featured") {
    return (
      <div
        className="bg-white rounded-3xl shadow-soft hover:shadow-premium transition-all duration-300 border border-gray-100 relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Featured Badge */}
        <div className="absolute top-3 left-3 bg-gradient-to-r from-[#08453E] to-[#1C9789] text-white text-xs px-3 py-1 rounded-full z-10 font-medium">
          Featured
        </div>

        <div className="relative overflow-hidden rounded-t-xl">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-56 object-cover transition-transform duration-500 hover:scale-105"
          />
          {showQuickActions && <QuickActions />}
        </div>

        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{title}</h3>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">
                {brand} • {category}
              </p>
            </div>
            <div className="flex items-center gap-1 text-yellow-500">
              <FaStar />
              <span className="text-sm font-bold text-gray-900">
                {rating.toFixed(1)}
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-500 font-medium mb-6 line-clamp-2">
            {description}
          </p>

          {/* Price Section */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900 tracking-tight">
                ₹{price.toFixed(2)}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-sm text-gray-400 line-through">
                    ₹{discountedPrice.toFixed(2)}
                  </span>
                  <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full">
                    Save {Math.round(discountPercentage)}%
                  </span>
                </>
              )}
            </div>
            <span className="text-sm text-gray-500">per day</span>
          </div>

          <Button onClick={handleAddToCart}>Rent Now</Button>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div
      className="bg-white rounded-3xl shadow-soft hover:shadow-premium transition-all duration-300 overflow-hidden flex flex-col border border-gray-100 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-48 md:h-56 object-cover transition-transform duration-300 hover:scale-105"
        />

        {/* Discount Badge */}
        {hasDiscount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow-md z-10 font-medium">
            -{Math.round(discountPercentage)}%
          </span>
        )}

        {/* Quick Actions */}
        {showQuickActions && <QuickActions />}

        {/* Category Badge */}
        <span className="absolute top-3 right-3 bg-gray-50 text-gray-400 text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-gray-100 shadow-sm">
          {category}
        </span>
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title & Brand */}
        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1 truncate">
          {title}
        </h3>
        <p className="text-xs text-gray-400 mb-2">
          {brand} • {category}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 text-yellow-500 text-sm mb-3">
          <FaStar />
          <span className="text-gray-900 font-bold">{rating.toFixed(1)}</span>
          <span className="text-gray-400 text-xs">
            ({Math.floor(rating * 20)} reviews)
          </span>
        </div>

        {/* Price Section - COMPLETE */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900 tracking-tight">
              ₹{price.toFixed(2)}
            </span>
            {hasDiscount && (
              <>
                <span className="text-sm text-gray-400 line-through">
                  ₹{discountedPrice.toFixed(2)}
                </span>
                <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full">
                  Save {Math.round(discountPercentage)}%
                </span>
              </>
            )}
          </div>
          <span className="text-sm text-gray-500">per day</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 font-medium mb-6 line-clamp-2 flex-grow">
          {description}
        </p>

        {/* Rent Now Button */}
        <Button onClick={handleAddToCart}>
          <span>Rent Now</span>
          <FaArrowRight className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};

export default Product;
