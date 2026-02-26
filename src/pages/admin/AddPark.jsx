import React, { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { createPark } from "../../api/parkApi";
import { FaMapMarkerAlt, FaFileImage, FaTag, FaAlignLeft, FaCheckCircle, FaSpinner } from "react-icons/fa";

const AddPark = () => {
  const [formData, setFormData] = useState({
    parkName: "",
    location: "",
    description: "",
    price: "",
    image: ""
  });
  
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      if (!formData.parkName || !formData.price || !formData.location) {
        throw new Error("Please fill in all required fields.");
      }
      
      await createPark(formData);
      
      setStatus({ loading: false, success: true, error: null });
      setFormData({ parkName: "", location: "", description: "", price: "", image: "" });
      
      setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 3000);
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message });
    }
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Add New Park</h1>
        <p className="text-gray-500 font-medium mt-1">Create a new theme park listing with details and pricing.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 max-w-3xl">
        {status.success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center">
             <FaCheckCircle className="mr-3 text-xl" />
             <span className="font-bold">Park created successfully!</span>
          </div>
        )}

        {status.error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl font-semibold">
             {status.error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">Park Name <span className="text-red-500">*</span></label>
              <div className="relative flex items-center">
                <FaTag className="absolute left-4 text-gray-400" />
                <input
                  type="text"
                  name="parkName"
                  value={formData.parkName}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none transition-all font-medium text-gray-900"
                  placeholder="e.g. Wonder Water Park"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">Location <span className="text-red-500">*</span></label>
              <div className="relative flex items-center">
                <FaMapMarkerAlt className="absolute left-4 text-gray-400" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none transition-all font-medium text-gray-900"
                  placeholder="City, State"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">Description</label>
            <div className="relative">
              <FaAlignLeft className="absolute left-4 top-4 text-gray-400" />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none transition-all font-medium text-gray-900"
                placeholder="Detailed description of the park's attractions..."
              ></textarea>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">Base Price (₹) <span className="text-red-500">*</span></label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-gray-400 font-bold">₹</span>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none transition-all font-medium text-gray-900"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">Image URL</label>
              <div className="relative flex items-center">
                <FaFileImage className="absolute left-4 text-gray-400" />
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none transition-all font-medium text-gray-900"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              disabled={status.loading}
              className="flex items-center px-8 py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-blue-600/20"
            >
              {status.loading ? <FaSpinner className="animate-spin mr-2" /> : null}
              {status.loading ? "Creating..." : "Create Park"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddPark;
