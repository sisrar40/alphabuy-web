import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { fetchCoupons, createCoupon, deleteCoupon, toggleCouponStatus } from "../../api/couponApi";
import { FaTicketAlt, FaPercent, FaMoneyBillWave, FaCalendarAlt, FaPlus, FaTrash, FaCheckCircle, FaSpinner, FaTimesCircle } from "react-icons/fa";

const ManageCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    couponCode: "",
    discountType: "percentage",
    discountValue: "",
    expiryDate: "",
    minimumAmount: "",
    applicablePark: "ALL"
  });
  const [formStatus, setFormStatus] = useState({ loading: false, success: false, error: null });

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = async () => {
    setLoading(true);
    try {
      const data = await fetchCoupons();
      setCoupons(data);
    } catch (err) {
      console.error("Failed to fetch coupons", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: false, error: null });

    try {
      if (!formData.couponCode || !formData.discountValue || !formData.expiryDate) {
        throw new Error("Please fill in all required fields");
      }
      
      await createCoupon(formData);
      setCoupons([...coupons, { ...formData, id: Date.now().toString(), active: true }]);
      
      setFormStatus({ loading: false, success: true, error: null });
      setFormData({ couponCode: "", discountType: "percentage", discountValue: "", expiryDate: "", minimumAmount: "", applicablePark: "ALL" });
      
      setTimeout(() => {
         setFormStatus(prev => ({ ...prev, success: false }));
         setShowForm(false);
      }, 2000);
    } catch (err) {
      setFormStatus({ loading: false, success: false, error: err.message });
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm("Are you sure you want to delete this coupon?")) {
      await deleteCoupon(id);
      setCoupons(coupons.filter(c => c.id !== id));
    }
  };

  const handleToggle = async (id, currentStatus) => {
    await toggleCouponStatus(id, !currentStatus);
    setCoupons(coupons.map(c => c.id === id ? { ...c, active: !currentStatus } : c));
  };

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Coupons & Offers</h1>
          <p className="text-gray-500 font-medium mt-1">Create and manage discount codes for your customers.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
        >
          {showForm ? <FaTimesCircle className="mr-2" /> : <FaPlus className="mr-2" />}
          {showForm ? "Cancel Creation" : "Create New Coupon"}
        </button>
      </div>

      {/* Create Coupon Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8 animate-fade-in-down">
          <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">New Coupon Details</h2>
          
          {formStatus.success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center">
               <FaCheckCircle className="mr-3 text-xl" />
               <span className="font-bold">Coupon created successfully!</span>
            </div>
          )}
          {formStatus.error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl font-semibold">
               {formStatus.error}
            </div>
          )}

          <form onSubmit={handleCreateCoupon} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">Coupon Code <span className="text-red-500">*</span></label>
                <div className="relative flex items-center">
                  <FaTicketAlt className="absolute left-4 text-gray-400" />
                  <input
                    type="text"
                    name="couponCode"
                    value={formData.couponCode}
                    onChange={handleFormChange}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 uppercase font-bold text-gray-900"
                    placeholder="e.g. SUMMER25"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">Discount Type</label>
                <div className="flex space-x-4 h-12">
                   <label className={`flex-1 flex items-center justify-center cursor-pointer rounded-xl border-2 transition-colors ${formData.discountType === 'percentage' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>
                      <input type="radio" name="discountType" value="percentage" checked={formData.discountType === 'percentage'} onChange={handleFormChange} className="hidden" />
                      <FaPercent className="mr-2" /> <span className="font-bold">Percentage (%)</span>
                   </label>
                   <label className={`flex-1 flex items-center justify-center cursor-pointer rounded-xl border-2 transition-colors ${formData.discountType === 'fixed' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>
                      <input type="radio" name="discountType" value="fixed" checked={formData.discountType === 'fixed'} onChange={handleFormChange} className="hidden" />
                      <FaMoneyBillWave className="mr-2" /> <span className="font-bold">Fixed (₹)</span>
                   </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">Discount Value <span className="text-red-500">*</span></label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-gray-400 font-bold">{formData.discountType === 'fixed' ? '₹' : '%'}</span>
                  <input
                    type="number"
                    name="discountValue"
                    value={formData.discountValue}
                    onChange={handleFormChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-bold text-gray-900"
                    placeholder="e.g. 15"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">Expiry Date <span className="text-red-500">*</span></label>
                <div className="relative flex items-center">
                  <FaCalendarAlt className="absolute left-4 text-gray-400" />
                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleFormChange}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium text-gray-900"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">Minimum Order Amount (₹)</label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-gray-400 font-bold">₹</span>
                  <input
                    type="number"
                    name="minimumAmount"
                    value={formData.minimumAmount}
                    onChange={handleFormChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium text-gray-900"
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">Applicable Park</label>
                <select
                  name="applicablePark"
                  value={formData.applicablePark}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium text-gray-900"
                >
                  <option value="ALL">All Parks</option>
                  <option value="p1">Adventure City Theme Park</option>
                  <option value="p2">Aqua Splash Water Park</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                disabled={formStatus.loading}
                className="flex items-center px-8 py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/20 transition-all disabled:opacity-70 shadow-md shadow-blue-600/20"
              >
                {formStatus.loading ? <FaSpinner className="animate-spin mr-2" /> : null}
                {formStatus.loading ? "Creating..." : "Save Coupon"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Coupons List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm font-bold uppercase tracking-wider border-b border-gray-100">
                <th className="p-4 pl-6">Code</th>
                <th className="p-4">Discount</th>
                <th className="p-4">Expiry</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan="5" className="p-8 text-center text-gray-500"><FaSpinner className="animate-spin inline mr-2" /> Loading coupons...</td></tr>
              ) : coupons.length === 0 ? (
                <tr><td colSpan="5" className="p-8 text-center text-gray-500">No coupons active. Create one to get started.</td></tr>
              ) : (
                coupons.map((coupon) => (
                  <tr key={coupon.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-lg inline-block border border-gray-200">
                        {coupon.couponCode || coupon.code}
                      </div>
                    </td>
                    <td className="p-4 font-bold text-gray-700">
                      {coupon.discountType === 'fixed' || coupon.type === 'fixed' ? '₹' : ''}
                      {coupon.discountValue || coupon.value}
                      {coupon.discountType === 'percentage' || coupon.type === 'percentage' ? '%' : ''} Off
                    </td>
                    <td className="p-4 text-gray-600 font-medium">
                      {new Date(coupon.expiryDate || coupon.expiry).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <button 
                        onClick={() => handleToggle(coupon.id, coupon.active)}
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide \${coupon.active ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-600 border border-gray-200'}`}
                      >
                        {coupon.active ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <button 
                        onClick={() => handleDelete(coupon.id)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete Coupon"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageCoupons;
