import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import ImageCarousel from "../components/ImageCarousel";
import { entertainmentPosterData } from "../dummy/data";

function Entertainment() {
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("");
  const [appliedFilters, setAppliedFilters] = useState(null);

  const handleApplyFilter = () => {
    setAppliedFilters({ category, location });
    setShowMobileFilter(false); // Close modal after applying (mobile)
  };

  const handleReset = () => {
    setCategory("All");
    setLocation("");
    setAppliedFilters(null);
  };

  return (
    <div className="max-w-7xl mx-auto mt-2 px-4 space-y-6 relative">
      {/* Image Carousel — Full Width */}
      <ImageCarousel images={entertainmentPosterData} />

      {/* Applied Filters Section */}
      {appliedFilters && (
        <div className="bg-blue-100 text-blue-800 p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Applied Filters:</h3>
          <ul className="text-sm list-disc pl-5 space-y-1">
            <li>
              <strong>Category:</strong> {appliedFilters.category}
            </li>
            <li>
              <strong>Location:</strong> {appliedFilters.location || "Any"}
            </li>
          </ul>
        </div>
      )}

      {/* --- DESKTOP Filter + Cards Layout --- */}
      <div className="hidden md:flex gap-6">
        {/* Desktop Filter Sidebar */}
        <div className="w-1/4 bg-gray-100 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Filter</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium">Category</label>
              <select
                className="mt-1 w-full border rounded px-2 py-1"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>All</option>
                <option>Theme Parks</option>
                <option>Water Parks</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Location</label>
              <input
                type="text"
                className="mt-1 w-full border rounded px-2 py-1"
                placeholder="Enter city"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <button
              className="bg-blue-600 text-white px-4 py-2 cursor-pointer rounded mt-2 hover:bg-blue-700 w-full"
              onClick={handleApplyFilter}
            >
              Apply Filter
            </button>
            <button
              className="text-sm text-blue-600 underline w-full text-left cursor-pointer"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="w-3/4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {entertainmentPosterData.map((image, index) => (
            <div
              key={index}
              className="bg-white shadow rounded overflow-hidden"
            >
              <img
                src={image}
                alt={`Park ${index}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">
                  Amusement Park {index + 1}
                </h3>
                <p className="text-sm text-gray-600">
                  Description goes here...
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- MOBILE View --- */}
      <div className="md:hidden grid gap-4 sm:grid-cols-2">
        {entertainmentPosterData.map((image, index) => (
          <div key={index} className="bg-white shadow rounded overflow-hidden">
            <img
              src={image}
              alt={`Park ${index}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">
                Amusement Park {index + 1}
              </h3>
              <p className="text-sm text-gray-600">Description goes here...</p>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Filter Button (mobile only) */}
      <button
        onClick={() => setShowMobileFilter(true)}
        className="md:hidden fixed bottom-6 right-6 bg-rose-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 z-40"
      >
        <FaFilter />
        <span>Filter</span>
      </button>

      {/* Mobile Filter Modal (bottom sheet style) */}
      {showMobileFilter && (
        <div className="fixed inset-0 bg-[#000]/70 z-50 flex items-end md:hidden">
          <div className="bg-white w-full rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto transition-all duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Filter Results</h2>
              <button
                onClick={handleReset}
                className="text-sm text-blue-600 cursor-pointer"
              >
                Reset
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border px-3 py-2 rounded mt-1"
                >
                  <option>All</option>
                  <option>Theme Parks</option>
                  <option>Water Parks</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border px-3 py-2 rounded mt-1"
                  placeholder="Enter city"
                />
              </div>

              <button
                onClick={handleApplyFilter}
                className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700"
              >
                Apply Filters
              </button>

              <button
                onClick={() => setShowMobileFilter(false)}
                className="w-full text-center text-gray-500 text-sm mt-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Entertainment;
