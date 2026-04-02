import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addTicketType, updateTicketType, fetchTicketTypes } from "./ticketSlice";
import { fetchParks } from "../parks/parkSlice";
import PageHeader from "../../components/ui/PageHeader";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useAlert } from "../../context/AlertContext";
import {
  FaTicketAlt,
  FaTag,
  FaArrowLeft,
  FaInfoCircle,
  FaCheckCircle,
  FaTimesCircle,
  FaDollarSign,
  FaMapMarkerAlt,
} from "react-icons/fa";

const AddTicketType = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const { showAlert } = useAlert();
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { items: parks, loading: parksLoading } = useSelector((state) => state.parks);
  const { items: tickets } = useSelector((state) => state.tickets);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    original_price: "",
    discount: "",
    max_per_order: 10,
    age_group: "Adult",
    ride_access: "All Rides",
    benefits: [],
    parkIds: [],
  });

  useEffect(() => {
    if (parks.length === 0) dispatch(fetchParks());
    if (items.length === 0) dispatch(fetchTicketTypes());
  }, [dispatch]);

  useEffect(() => {
    if (isEditMode && tickets.length > 0) {
      const existing = tickets.find((t) => String(t.id) === String(id));
      if (existing) {
        setFormData({
          name: existing.name || "",
          description: existing.description || "",
          price: existing.price || "",
          original_price: existing.original_price || "",
          discount: existing.discount || "",
          max_per_order: existing.max_per_order || 10,
          age_group: existing.age_group || "Adult",
          ride_access: existing.ride_access || "All Rides",
          benefits: existing.benefits || [],
          parkIds: existing.park_ids || existing.parkIds || [],
        });
      }
    }
  }, [id, isEditMode, tickets]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleParkToggle = (parkId) => {
    const newParkIds = formData.parkIds.includes(parkId)
      ? formData.parkIds.filter(id => id !== parkId)
      : [...formData.parkIds, parkId];
    setFormData({ ...formData, parkIds: newParkIds });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Ticket name is required";
    if (formData.parkIds.length === 0) newErrors.parkIds = "Select at least one park";
    if (!formData.price) newErrors.price = "Price is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        original_price: parseFloat(formData.original_price || formData.price),
        max_per_order: parseInt(formData.max_per_order),
        park_ids: formData.parkIds
      };

      if (isEditMode) {
        await dispatch(updateTicketType({ ...payload, id })).unwrap();
        showAlert("Ticket type updated", "success");
      } else {
        await dispatch(addTicketType(payload)).unwrap();
        showAlert("Ticket type added", "success");
      }
      navigate("/admin/tickets");
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate("/admin/tickets")} className="p-2.5 bg-gray-100 rounded-lg text-gray-600 hover:bg-blue-600 hover:text-white transition-all">
          <FaArrowLeft />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{isEditMode ? "Edit Ticket Type" : "Add Ticket Type"}</h1>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ticket Name *</label>
              <Input name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Standard Adult Ticket" />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age Group</label>
              <select name="age_group" value={formData.age_group} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none">
                <option value="Adult">Adult</option>
                <option value="Child">Child</option>
                <option value="Senior">Senior</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
              <Input name="price" type="number" value={formData.price} onChange={handleChange} icon={() => <span>₹</span>} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (₹)</label>
              <Input name="original_price" type="number" value={formData.original_price} onChange={handleChange} icon={() => <span>₹</span>} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Per Order</label>
              <Input name="max_per_order" type="number" value={formData.max_per_order} onChange={handleChange} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Associate with Parks *</label>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
              {parks.map((p) => (
                <label key={p.id} className="flex items-center gap-3 p-2 hover:bg-white rounded-lg cursor-pointer">
                  <input type="checkbox" checked={formData.parkIds.includes(p.id)} onChange={() => handleParkToggle(p.id)} />
                  <span className="text-sm font-medium text-gray-700">{p.parkName || p.name}</span>
                </label>
              ))}
            </div>
            {errors.parkIds && <p className="text-xs text-red-500 mt-1 text-center">{errors.parkIds}</p>}
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t">
            <button type="button" onClick={() => navigate("/admin/tickets")} className="px-6 py-2 border border-gray-300 rounded-lg text-sm text-gray-700">Cancel</button>
            <button type="submit" disabled={loading} className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-bold">
              {loading ? "Saving..." : "Save Ticket Type"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTicketType;
