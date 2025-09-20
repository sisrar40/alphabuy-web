import React from "react";

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
  return (
    <div className="bg-gradient-to-r  from-black via-gray-800 to-black text-white overflow-hidden shadow-lg flex flex-col lg:flex-row p-4 gap-6">
      <div className="lg:w-72 w-full h-72 relative">
        <img
          src={posterUrl}
          alt={title}
          className="rounded-xl w-72 h-72 object-cover cursor-pointer"
        />

        {trailerLabel && (
          <button className="absolute inset-0 flex cursor-pointer items-center justify-center  bg-opacity-40 hover:bg-opacity-60 transition-all text-white text-sm font-medium rounded-xl">
            ▶ {trailerLabel}
          </button>
        )}

        {releaseDate && (
          <p className="absolute bottom-2 left-1/2 -translate-x-1/2 cursor-pointer transform bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
            Releasing on {releaseDate}
          </p>
        )}
      </div>

      <div className="lg:w-2/3 flex flex-col  gap-4">
        <h2 className="text-3xl font-bold">{title}</h2>

        {isInterested && (
          <div className="flex items-center gap-2 border border-gray-600 rounded-lg px-3 py-2 w-fit">
            <span className="text-green-400">👍</span>
            <p className="text-sm">{interestCount} are interested</p>
            <button className="ml-auto text-black bg-white text-sm rounded px-3 py-1">
              I'm interested
            </button>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {formatTags?.map((format, index) => (
            <span
              key={index}
              className="px-2 py-1 text-sm bg-white text-black rounded"
            >
              {format}
            </span>
          ))}
          {languages?.map((lang, index) => (
            <span
              key={index}
              className="px-2 py-1 text-sm border border-white rounded"
            >
              {lang}
            </span>
          ))}
        </div>

        <p className="text-sm text-gray-300">
          {duration} • {genres.join(", ")} • UA13+
        </p>

        {/* Rating */}
        {rating && (
          <div className="flex items-center gap-2 bg-gray-800 rounded-lg px-3 py-2 w-fit">
            <span className="text-pink-500 text-lg">★</span>
            <p className="text-white text-sm">
              {rating.score}/10 ({rating.votes} Votes)
            </p>
            <button className="ml-auto text-pink-500 text-sm">Rate now</button>
          </div>
        )}

        {/* Book Tickets Button */}
        {isInCinemas && (
          <button className="mt-4 w-fit px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white text-lg font-semibold rounded-lg cursor-pointer">
            Book tickets
          </button>
        )}
      </div>
    </div>
  );
}

export default MoviePreview;
