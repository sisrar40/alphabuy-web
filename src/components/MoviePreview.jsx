import React, { useState } from "react";
import { FaPlay, FaHeart, FaShare } from "react-icons/fa";
import Button from "./Button";

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

  // const Button = ({ children, onClick, variant = "primary" }) => (
  //   <button
  //     onClick={onClick}
  //     className={`py-3 px-6 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 border-none outline-none ${
  //       variant === "primary"
  //         ? "bg-gradient-to-r from-[#08453E] to-[#1C9789] text-white hover:opacity-90"
  //         : "border border-[#1C9789] text-[#1C9789] hover:bg-[#1C9789] hover:text-white"
  //     }`}
  //   >
  //     {children}
  //   </button>
  // );

  return (
    <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm text-white overflow-hidden shadow-2xl rounded-2xl flex flex-col lg:flex-row p-6 gap-6 border border-gray-700/50">
      {/* Poster Section */}
      <div className="lg:w-72 w-full h-72 relative flex-shrink-0">
        <img
          src={posterUrl}
          alt={title}
          className="rounded-xl w-full h-full object-cover cursor-pointer shadow-lg"
        />

        {trailerLabel && (
          <button className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40 hover:bg-black/60 transition-all text-white text-sm font-medium rounded-xl">
            <FaPlay className="mr-2" />
            {trailerLabel}
          </button>
        )}

        {releaseDate && (
          <p className="absolute bottom-3 left-1/2 -translate-x-1/2 transform bg-black/80 text-white text-xs px-3 py-2 rounded-lg backdrop-blur-sm">
            Releasing on {releaseDate}
          </p>
        )}
      </div>

      {/* Content Section */}
      <div className="lg:w-2/3 flex flex-col gap-4">
        {/* Title and Actions */}
        <div className="flex justify-between items-start">
          <h2 className="text-3xl font-bold text-white">{title}</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-2 rounded-full transition-all duration-200 ${
                isFavorite
                  ? "bg-red-500 text-white"
                  : "bg-gray-700/50 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <FaHeart className={isFavorite ? "fill-current" : ""} />
            </button>
            <button className="p-2 bg-gray-700/50 text-gray-300 rounded-full hover:bg-gray-600 transition-all duration-200">
              <FaShare />
            </button>
          </div>
        </div>

        {/* Interest Section */}
        {isInterested && (
          <div className="flex items-center gap-3 border border-gray-600 rounded-xl px-4 py-3 w-fit bg-gray-800/30 backdrop-blur-sm">
            <span className="text-green-400 text-lg">👍</span>
            <p className="text-sm text-gray-300">
              {interestCount} are interested
            </p>
            <Button variant="secondary">I'm interested</Button>
          </div>
        )}

        {/* Tags Section */}
        <div className="flex flex-wrap gap-2">
          {formatTags?.map((format, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm bg-gradient-to-r from-[#08453E] to-[#1C9789] text-white rounded-lg font-medium"
            >
              {format}
            </span>
          ))}
          {languages?.map((lang, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm border border-gray-600 text-gray-300 rounded-lg bg-gray-800/50"
            >
              {lang}
            </span>
          ))}
        </div>

        {/* Meta Information */}
        <p className="text-sm text-gray-400">
          {duration} • {genres.join(", ")} • UA13+
        </p>

        {/* Rating */}
        {rating && (
          <div className="flex items-center gap-3 bg-gray-800/50 backdrop-blur-sm rounded-xl px-4 py-3 w-fit border border-gray-700">
            <span className="text-yellow-400 text-xl">★</span>
            <div>
              <p className="text-white font-semibold">{rating.score}/10</p>
              <p className="text-gray-400 text-xs">({rating.votes} Votes)</p>
            </div>
            <Button variant="secondary">Rate now</Button>
          </div>
        )}

        {/* Book Tickets Button */}
        {isInCinemas && (
          <div className="mt-2">
            <Button>Book tickets</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MoviePreview;
