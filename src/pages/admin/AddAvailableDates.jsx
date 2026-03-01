import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { fetchParks } from "../../api/parkApi";
import { createAvailableDate } from "../../api/dateApi";
import { FaCalendarDay, FaTicketAlt, FaBuilding, FaCheckCircle, FaSpinner } from "react-icons/fa";

const AddAvailableDates = () => {
  const [parks, setParks] = useState([]);
  const [formData, setFormData] = useState({
    parkId: "",
    date: "",
    availableSlots: ""
  });
  const [status, setStatus] = useState({ loading: false, fetching: true, success: false, error: null });

  useEffect(() => {
    const loadParks = async () => {
      try {
        const data = await fetchParks();
        setParks(data);
        if (data.length > 0) {
           setFormData(prev => ({ ...prev, parkId: data[0].id }));
        }
      } catch {
        setStatus(prev => ({ ...prev, error: "Failed to load parks" }));
      } finally {
        setStatus(prev => ({ ...prev, fetching: false }));
      }
    };
    loadParks();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(prev => ({ ...prev, loading: true, success: false, error: null }));

    try {
      if (!formData.parkId || !formData.date || !formData.availableSlots) {
        throw new Error("All fields are required.");
      }
      if (parseInt(formData.availableSlots) <= 0) {
         throw new Error("Slots must be greater than 0.");
      }
      
      await createAvailableDate(formData);
      
      setStatus(prev => ({ ...prev, loading: false, success: true }));
      setFormData(prev => ({ ...prev, date: "", availableSlots: "" }));
      
      setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 3000);
    } catch (err) {
      setStatus(prev => ({ ...prev, loading: false, success: false, error: err.message }));
    }
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Manage Inventory</h1>
        <p className="text-gray-500 font-medium mt-1">Add available booking dates and ticket limits for specific parks.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 max-w-2xl">
        {status.success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center">
             <FaCheckCircle className="mr-3 text-xl" />
             <span className="font-bold">Dates added to inventory successfully!</span>
          </div>
        )}

        {status.error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl font-semibold">
             {status.error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">Select Park <span className="text-red-500">*</span></label>
            <div className="relative flex items-center">
              <FaBuilding className="absolute left-4 text-gray-400 z-10" />
              <select
                name="parkId"
                value={formData.parkId}
                onChange={handleChange}
                disabled={status.fetching}
                className="w-full pl-11 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-gray-900 appearance-none disabled:opacity-50"
              >
                {status.fetching ? (
                  <option>Loading parks...</option>
                ) : (
                  parks.map(park => (
                    <option key={park.id} value={park.id}>{park.name}</option>
                  ))
                )}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">Operating Date <span className="text-red-500">*</span></label>
              <div className="relative flex items-center">
                <FaCalendarDay className="absolute left-4 text-gray-400" />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none transition-all font-medium text-gray-900"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">Total Available Slots <span className="text-red-500">*</span></label>
              <div className="relative flex items-center">
                <FaTicketAlt className="absolute left-4 text-gray-400" />
                <input
                  type="number"
                  name="availableSlots"
                  value={formData.availableSlots}
                  onChange={handleChange}
                  min="1"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none transition-all font-medium text-gray-900"
                  placeholder="e.g. 5000"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              disabled={status.loading || status.fetching}
              className="flex items-center px-8 py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-blue-600/20"
            >
              {status.loading ? <FaSpinner className="animate-spin mr-2" /> : null}
              {status.loading ? "Adding..." : "Add Inventory"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddAvailableDates;
