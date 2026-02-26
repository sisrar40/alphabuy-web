import React, { useState } from "react";
import Button from "./ui/Button";
import { FaPlay, FaStar, FaHeart, FaShare } from "react-icons/fa";

function MoviePreview({
  title,
  posterUrl,
  trailerLabel,
  isInterested,
  interestCount,
  isInCinemas,
  duration,
  genres,
  rating,
  languages,
  releaseDate,
  formatTags,
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="bg-white rounded-[48px] shadow-soft border border-gray-50 flex flex-col lg:flex-row p-8 gap-12 group transition-standard hover:shadow-premium relative overflow-hidden">
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-aqua-50/30 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-aqua-100/40 transition-colors"></div>
      
      {/* Poster Section */}
      <div className="lg:w-80 w-full h-[480px] lg:h-[400px] relative flex-shrink-0 z-10">
        <img
          src={posterUrl}
          alt={title}
          className="rounded-[32px] w-full h-full object-cover shadow-premium group-hover:scale-[1.03] transition-all duration-700"
        />

        {trailerLabel && (
          <button className="absolute inset-x-8 bottom-8 flex cursor-pointer items-center justify-center bg-white/10 backdrop-blur-xl border border-white/20 py-4 rounded-2xl text-white text-sm font-black uppercase tracking-widest hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100">
             <FaPlay className="mr-3 text-xs" />
             {trailerLabel}
          </button>
        )}

        <div className="absolute top-6 left-6 flex flex-col gap-2">
           <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black text-gray-900 uppercase tracking-widest shadow-sm">UA 13+</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col gap-8 justify-center z-10">
        <div className="space-y-4">
          <div className="flex gap-2 mb-2">
            {genres.slice(0, 2).map((g, i) => (
              <span key={i} className="text-[10px] font-black text-aqua-600 uppercase tracking-widest bg-aqua-50 px-3 py-1 rounded-lg">{g}</span>
            ))}
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight tracking-tight font-display">
            {title}
          </h2>
          <div className="flex items-center gap-4 text-gray-400 font-bold text-sm">
             <span>{duration}</span>
             <span className="w-1.5 h-1.5 rounded-full bg-gray-200"></span>
             <span>{languages.join(", ")}</span>
          </div>
        </div>

        {/* Formats */}
        <div className="flex flex-wrap gap-2">
          {formatTags?.slice(0, 4).map((format, index) => (
            <span
              key={index}
              className="px-4 py-2 text-[10px] bg-gray-50 text-gray-500 border border-gray-100 rounded-xl font-black uppercase tracking-widest"
            >
              {format}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-6">
          {/* Rating */}
          {rating && (
            <div className="flex items-center gap-4 bg-gray-50/50 rounded-3xl px-6 py-4 border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center shadow-inner">
                  <FaStar className="text-amber-500 text-xl" />
                </div>
                <div>
                  <p className="font-black text-xl text-gray-900 tracking-tight">
                    {rating.score}<span className="text-xs font-bold text-gray-400 ml-1">/10</span>
                  </p>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-black">{rating.votes} Explorers</p>
                </div>
            </div>
          )}

          <div className="flex gap-3">
             <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-standard ${
                  isFavorite ? "bg-red-500 text-white shadow-lg shadow-red-500/20" : "bg-white border border-gray-100 text-gray-300 hover:text-red-500 hover:border-red-100"
                }`}
              >
                <FaHeart className="text-xl" />
              </button>
              <button className="w-14 h-14 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-300 hover:text-aqua-500 hover:border-aqua-100 transition-standard">
                <FaShare className="text-xl" />
              </button>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-50 flex flex-wrap items-center justify-between gap-6">
           <div>
             <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Coming Next</p>
             <p className="text-sm font-black text-gray-700">{releaseDate}</p>
           </div>
           <Button variant="primary" size="lg" className="px-16 !rounded-[24px]">
             Secure Spot
           </Button>
        </div>
      </div>
    </div>
  );
}

export default MoviePreview;
