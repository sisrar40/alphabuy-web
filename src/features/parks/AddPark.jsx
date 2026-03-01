import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPark } from "./parkSlice";
import PageHeader from "../../components/ui/PageHeader";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import {
  FaMapMarkerAlt,
  FaTag,
  FaFileImage,
  FaArrowLeft,
  FaWater,
  FaDollarSign,
  FaInfoCircle,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const AddPark = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    parkName: "",
    location: "",
    description: "",
    price: "",
    image: "",
    capacity: "",
    openingTime: "10:00",
    closingTime: "20:00",
    status: "active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.parkName.trim()) newErrors.parkName = "Park name is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (formData.price && parseFloat(formData.price) <= 0)
      newErrors.price = "Price must be greater than 0";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await dispatch(addPark(formData)).unwrap();
      navigate("/admin/parks");
    } catch (error) {
      console.error("Failed to save park:", error);
      setErrors({ submit: "Failed to save park. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/admin/parks")}
          className="w-10 h-10 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
        >
          <FaArrowLeft />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Add New Water Park
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Create a new water park listing
          </p>
        </div>
      </div>

      {/* Main Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6">
          {/* Basic Information */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaWater className="text-blue-600" />
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Park Name <span className="text-red-500">*</span>
                </label>
                <Input
                  name="parkName"
                  placeholder="e.g. AquaZen Paradise"
                  value={formData.parkName}
                  onChange={handleChange}
                  icon={FaTag}
                  className={errors.parkName ? "border-red-500" : ""}
                />
                {errors.parkName && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <FaTimesCircle /> {errors.parkName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location <span className="text-red-500">*</span>
                </label>
                <Input
                  name="location"
                  placeholder="e.g. Lonavala, Maharashtra"
                  value={formData.location}
                  onChange={handleChange}
                  icon={FaMapMarkerAlt}
                  className={errors.location ? "border-red-500" : ""}
                />
                {errors.location && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <FaTimesCircle /> {errors.location}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Provide a detailed description of the water park, including attractions, amenities, and unique features..."
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <FaTimesCircle /> {errors.description}
              </p>
            )}
          </div>

          {/* Pricing & Capacity */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaDollarSign className="text-green-600" />
              Pricing & Capacity
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Base Price (₹) <span className="text-red-500">*</span>
                </label>
                <Input
                  name="price"
                  type="number"
                  placeholder="1299"
                  value={formData.price}
                  onChange={handleChange}
                  icon={() => <span>₹</span>}
                  className={errors.price ? "border-red-500" : ""}
                />
                {errors.price && (
                  <p className="text-xs text-red-500 mt-1">{errors.price}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Daily Capacity
                </label>
                <Input
                  name="capacity"
                  type="number"
                  placeholder="5000"
                  value={formData.capacity}
                  onChange={handleChange}
                  icon={() => <span>👥</span>}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                >
                  <option value="active">Active</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaInfoCircle className="text-blue-600" />
              Operating Hours
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Opening Time
                </label>
                <input
                  type="time"
                  name="openingTime"
                  value={formData.openingTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Closing Time
                </label>
                <input
                  type="time"
                  name="closingTime"
                  value={formData.closingTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Image URL */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <Input
              name="image"
              placeholder="https://example.com/image.jpg"
              value={formData.image}
              onChange={handleChange}
              icon={FaFileImage}
            />
            <p className="text-xs text-gray-500 mt-1">
              Provide a URL for the park's main image (optional)
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate("/admin/parks")}
              className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg text-sm font-bold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <FaCheckCircle />
                  Save Park
                </>
              )}
            </button>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 flex items-center gap-2">
              <FaTimesCircle />
              {errors.submit}
            </div>
          )}
        </form>
      </div>

      {/* Tips Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h3 className="text-sm font-bold text-blue-900 mb-2 flex items-center gap-2">
          <FaInfoCircle className="text-blue-600" />
          Tips for creating a great listing
        </h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Use a clear, descriptive park name</li>
          <li>• Include the city and state in location</li>
          <li>• Provide detailed description of attractions and amenities</li>
          <li>• Set accurate pricing and capacity information</li>
          <li>• Use a high-quality image URL for better visibility</li>
        </ul>
      </div>
    </div>
  );
};

export default AddPark;
