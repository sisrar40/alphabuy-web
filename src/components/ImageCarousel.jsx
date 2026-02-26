import React, { useState, useEffect } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaPause,
  FaExpand,
} from "react-icons/fa";

const ImageCarousel = ({
  images,
  autoPlay = true,
  showControls = true,
  showIndicators = true,
  showThumbnails = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) nextSlide();
    else if (distance < -minSwipeDistance) prevSlide();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      else if (e.key === "ArrowRight") nextSlide();
      else if (e.key === " ") togglePlayPause();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  useEffect(() => {
    let interval;
    if (isPlaying && autoPlay) {
      interval = setInterval(nextSlide, 6000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, autoPlay, images.length]);

  return (
    <div
      className={`relative w-full mx-auto group overflow-hidden ${
        isFullscreen ? "fixed inset-0 z-50 bg-black" : "rounded-[40px] shadow-premium bg-white border border-gray-100"
      }`}
    >
      <div
        className={`${isFullscreen ? "h-screen" : "h-[500px] md:h-[600px]"}`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1) h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full h-full shrink-0 relative">
              <img
                src={image}
                alt={`Experience ${index + 1}`}
                className="w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
            </div>
          ))}
        </div>
      </div>

      {showControls && (
        <>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-8 transform -translate-y-1/2 w-14 h-14 flex items-center justify-center bg-white/10 backdrop-blur-xl text-white border border-white/20 rounded-2xl hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 shadow-xl"
            aria-label="Previous"
          >
            <FaChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-8 transform -translate-y-1/2 w-14 h-14 flex items-center justify-center bg-white/10 backdrop-blur-xl text-white border border-white/20 rounded-2xl hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 shadow-xl"
            aria-label="Next"
          >
            <FaChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex items-center gap-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl px-8 py-4 shadow-2xl transition-all">
        {showIndicators && (
          <div className="flex space-x-3">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-500 rounded-full ${
                  currentIndex === index
                    ? "w-8 h-2 bg-aqua-400"
                    : "w-2 h-2 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        )}

        <div className="h-4 w-[1px] bg-white/20"></div>

        <button
          onClick={togglePlayPause}
          className="text-white/80 hover:text-white transition-colors"
        >
          {isPlaying ? <FaPause size={12} /> : <FaPlay size={12} />}
        </button>

        <button
          onClick={toggleFullscreen}
          className="text-white/80 hover:text-white transition-colors"
        >
          <FaExpand size={12} />
        </button>
      </div>

      {/* Experience Count */}
      <div className="absolute top-8 left-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-5 py-2.5 text-white/90 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
         Adventure {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default ImageCarousel;
