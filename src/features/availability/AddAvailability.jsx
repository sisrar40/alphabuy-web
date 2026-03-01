import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addAvailability } from "./availabilitySlice";
import { fetchParks } from "../parks/parkSlice";
import PageHeader from "../../components/ui/PageHeader";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Badge from "../../components/ui/Badge";
import {
  FaCalendarAlt,
  FaTicketAlt,
  FaArrowLeft,
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaClock,
  FaUsers,
  FaWater,
} from "react-icons/fa";

const AddAvailability = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const { items: parks, loading: parksLoading } = useSelector(
    (state) => state.parks,
  );

  const [formData, setFormData] = useState({
    parkId: "",
    date: "",
    availableSlots: "",
    timeSlot: "full-day",
    maxCapacity: "",
    notes: "",
  });

  useEffect(() => {
    if (parks.length === 0) {
      dispatch(fetchParks());
    }
  }, [dispatch, parks.length]);

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
    if (!formData.parkId) newErrors.parkId = "Please select a park";
    if (!formData.date) newErrors.date = "Please select a date";
    if (!formData.availableSlots)
      newErrors.availableSlots = "Available slots is required";
    if (formData.availableSlots && parseInt(formData.availableSlots) <= 0) {
      newErrors.availableSlots = "Slots must be greater than 0";
    }

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
    setSuccess(false);

    try {
      await dispatch(addAvailability(formData)).unwrap();
      setSuccess(true);
      setFormData((prev) => ({
        ...prev,
        date: "",
        availableSlots: "",
        notes: "",
      }));

      // Auto-hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to update inventory:", error);
      setErrors({ submit: "Failed to update inventory. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const parkOptions = [
    { label: "Select a Park", value: "" },
    ...parks.map((p) => ({ label: p.parkName, value: p.id })),
  ];

  const timeSlotOptions = [
    { label: "Full Day", value: "full-day" },
    { label: "Morning (9AM - 12PM)", value: "morning" },
    { label: "Afternoon (12PM - 3PM)", value: "afternoon" },
    { label: "Evening (3PM - 6PM)", value: "evening" },
    { label: "Night (6PM - 9PM)", value: "night" },
  ];

  // Get min date (today)
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="w-10 h-10 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
        >
          <FaArrowLeft />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Schedule Capacity
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage daily visitor capacity for water parks
          </p>
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 animate-in slide-in-from-top duration-300">
          <FaCheckCircle className="text-green-600 text-lg" />
          <span className="text-sm font-medium text-green-700">
            Inventory successfully updated and synchronized.
          </span>
        </div>
      )}

      {/* Main Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Column */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <form onSubmit={handleSubmit} className="p-6">
              {/* Park Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Park <span className="text-red-500">*</span>
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

              {/* Date and Slots */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="date"
                    type="date"
                    min={today}
                    value={formData.date}
                    onChange={handleChange}
                    icon={FaCalendarAlt}
                    className={errors.date ? "border-red-500" : ""}
                  />
                  {errors.date && (
                    <p className="text-xs text-red-500 mt-1">{errors.date}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Available Slots <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="availableSlots"
                    type="number"
                    placeholder="e.g. 1000"
                    value={formData.availableSlots}
                    onChange={handleChange}
                    icon={FaTicketAlt}
                    className={errors.availableSlots ? "border-red-500" : ""}
                  />
                  {errors.availableSlots && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.availableSlots}
                    </p>
                  )}
                </div>
              </div>

              {/* Time Slot and Max Capacity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time Slot
                  </label>
                  <select
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                  >
                    {timeSlotOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Capacity (optional)
                  </label>
                  <Input
                    name="maxCapacity"
                    type="number"
                    placeholder="e.g. 5000"
                    value={formData.maxCapacity}
                    onChange={handleChange}
                    icon={FaUsers}
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  placeholder="Any special instructions or notes about this date..."
                />
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => navigate("/admin/dashboard")}
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
                      Save Schedule
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
        </div>

        {/* Info Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <FaInfoCircle className="text-blue-600" />
              Quick Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Total Parks</span>
                <span className="text-sm font-bold text-gray-900">
                  {parks.length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Today's Date</span>
                <span className="text-sm font-bold text-gray-900">
                  {new Date().toLocaleDateString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Time</span>
                <span className="text-sm font-bold text-gray-900">
                  {new Date().toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Tips Card */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h3 className="text-sm font-bold text-blue-900 mb-2 flex items-center gap-2">
              <FaInfoCircle className="text-blue-600" />
              Scheduling Tips
            </h3>
            <ul className="text-xs text-blue-800 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                Set available slots based on park's daily capacity
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                Consider peak hours and weekends for higher allocation
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                Update inventory at least 24 hours in advance
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                Add notes for special events or maintenance
              </li>
            </ul>
          </div>

          {/* Recent Activity Placeholder */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-3">
              Recent Updates
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-900">
                    AquaZen Paradise
                  </p>
                  <p className="text-[10px] text-gray-500">
                    Updated 2 hours ago
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-900">
                    Splash Kingdom
                  </p>
                  <p className="text-[10px] text-gray-500">
                    Updated 5 hours ago
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-900">
                    Wave World
                  </p>
                  <p className="text-[10px] text-gray-500">No updates today</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAvailability;
