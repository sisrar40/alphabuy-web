import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addMeal } from "./mealSlice";
import { fetchParks } from "../parks/parkSlice";
import PageHeader from "../../components/ui/PageHeader";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import {
  FaUtensils,
  FaTag,
  FaArrowLeft,
  FaInfoCircle,
  FaCheckCircle,
  FaTimesCircle,
  FaLeaf,
  FaFire,
  FaClock,
  FaDollarSign,
} from "react-icons/fa";

const AddMeal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { items: parks, loading: parksLoading } = useSelector(
    (state) => state.parks,
  );

  const [formData, setFormData] = useState({
    mealName: "",
    parkId: "",
    description: "",
    price: "",
    type: "veg",
    calories: "",
    preparationTime: "",
    popular: false,
  });

  useEffect(() => {
    if (parks.length === 0) {
      dispatch(fetchParks());
    }
  }, [dispatch, parks.length]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.mealName.trim()) newErrors.mealName = "Meal name is required";
    if (!formData.parkId) newErrors.parkId = "Please select a park";
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

    if (!formData.parkId) {
      alert("Please select a park first");
      return;
    }

    setLoading(true);
    try {
      await dispatch(addMeal(formData)).unwrap();
      navigate("/admin/meals");
    } catch (error) {
      console.error("Failed to save meal:", error);
      setErrors({ submit: "Failed to save meal. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const parkOptions = [
    { label: "Select a Park", value: "" },
    ...parks.map((p) => ({ label: p.parkName, value: p.id })),
  ];

  const mealTypes = [
    { value: "veg", label: "Vegetarian" },
    { value: "non-veg", label: "Non-Vegetarian" },
    { value: "vegan", label: "Vegan" },
    { value: "gluten-free", label: "Gluten Free" },
    { value: "mixed", label: "Mixed" },
  ];

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/admin/meals")}
          className="w-10 h-10 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
        >
          <FaArrowLeft />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Add New Meal Plan
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Create a new meal option for water parks
          </p>
        </div>
      </div>

      {/* Main Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6">
          {/* Basic Information */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaUtensils className="text-orange-600" />
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meal Name <span className="text-red-500">*</span>
                </label>
                <Input
                  name="mealName"
                  placeholder="e.g. Premium Lunch Buffet"
                  value={formData.mealName}
                  onChange={handleChange}
                  icon={FaTag}
                  className={errors.mealName ? "border-red-500" : ""}
                />
                {errors.mealName && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <FaTimesCircle /> {errors.mealName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Park <span className="text-red-500">*</span>
                </label>
                <Select
                  name="parkId"
                  value={formData.parkId}
                  onChange={handleChange}
                  options={parkOptions}
                  disabled={parksLoading}
                  className={errors.parkId ? "border-red-500" : ""}
                />
                {errors.parkId && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <FaTimesCircle /> {errors.parkId}
                  </p>
                )}
                {parksLoading && (
                  <p className="text-xs text-gray-500 mt-1">Loading parks...</p>
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
              placeholder="Provide a detailed description of the meal, including ingredients, portions, and any special features..."
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <FaTimesCircle /> {errors.description}
              </p>
            )}
          </div>

          {/* Meal Details */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaInfoCircle className="text-blue-600" />
              Meal Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                >
                  {mealTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Calories (approx)
                </label>
                <Input
                  name="calories"
                  placeholder="e.g. 500-700 kcal"
                  value={formData.calories}
                  onChange={handleChange}
                  icon={FaFire}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prep Time (mins)
                </label>
                <Input
                  name="preparationTime"
                  type="number"
                  placeholder="30"
                  value={formData.preparationTime}
                  onChange={handleChange}
                  icon={FaClock}
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaDollarSign className="text-green-600" />
              Pricing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₹) <span className="text-red-500">*</span>
                </label>
                <Input
                  name="price"
                  type="number"
                  placeholder="599"
                  value={formData.price}
                  onChange={handleChange}
                  icon={() => <span>₹</span>}
                  className={errors.price ? "border-red-500" : ""}
                />
                {errors.price && (
                  <p className="text-xs text-red-500 mt-1">{errors.price}</p>
                )}
              </div>

              <div className="flex items-center mt-8">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="popular"
                    checked={formData.popular}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    Mark as popular item
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate("/admin/meals")}
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
                  Save Meal Plan
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
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
        <h3 className="text-sm font-bold text-orange-900 mb-2 flex items-center gap-2">
          <FaInfoCircle className="text-orange-600" />
          Tips for creating a meal plan
        </h3>
        <ul className="text-sm text-orange-800 space-y-1">
          <li>• Use descriptive names that include key ingredients</li>
          <li>• Select the correct park where this meal will be available</li>
          <li>• Include dietary information in the description</li>
          <li>• Set competitive pricing based on portion size</li>
          <li>• Mark items as popular to highlight them to customers</li>
        </ul>
      </div>
    </div>
  );
};

export default AddMeal;
