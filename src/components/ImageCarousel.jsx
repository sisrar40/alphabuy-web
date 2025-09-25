import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("forward");

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setDirection("backward");
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setDirection("forward");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        let newIndex;

        if (direction === "forward") {
          if (prevIndex === images.length - 1) {
            setDirection("backward");
            newIndex = prevIndex - 1;
          } else {
            newIndex = prevIndex + 1;
          }
        } else {
          if (prevIndex === 0) {
            setDirection("forward");
            newIndex = prevIndex + 1;
          } else {
            newIndex = prevIndex - 1;
          }
        }

        return newIndex;
      });
    }, 5000);

    return () => clearInterval(interval); // Cleanup
  }, [direction, images.length]);

  return (
    <div className="relative w-full max-w-7xl mx-auto mt-6">
      <div className="overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-64 md:h-96 object-cover shrink-0"
            />
          ))}
        </div>
      </div>

      {/* Left arrow */}
      <button
        onClick={prevSlide}
        className="absolute cursor-pointer top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Previous slide"
      >
        <FaChevronLeft />
      </button>

      {/* Right arrow */}
      <button
        onClick={nextSlide}
        className="absolute cursor-pointer top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Next slide"
      >
        <FaChevronRight />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 cursor-pointer left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-blue-600" : "bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
