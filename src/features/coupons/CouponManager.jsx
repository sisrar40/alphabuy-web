import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCoupons,
  addCoupon,
  deleteCoupon,
  toggleCoupon,
} from "./couponSlice";
import { fetchParks } from "../parks/parkSlice";
import PageHeader from "../../components/ui/PageHeader";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Badge from "../../components/ui/Badge";
import {
  FaPlus,
  FaTrash,
  FaTicketAlt,
  FaPercent,
  FaMoneyBillWave,
  FaTimes,
  FaSearch,
  FaFilter,
  FaDownload,
  FaEdit,
  FaCopy,
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaCalendarAlt,
  FaTag,
  FaFire,
  FaStar,
  FaChevronDown,
  FaEye,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";

const CouponManager = () => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCoupons, setSelectedCoupons] = useState([]);
  const [errors, setErrors] = useState({});
  const [sortConfig, setSortConfig] = useState({
    key: "couponCode",
    direction: "asc",
  });

  const { items: coupons, loading: couponsLoading } = useSelector(
    (state) => state.coupons,
  );
  const { items: parks } = useSelector((state) => state.parks);

  const [formData, setFormData] = useState({
    couponCode: "",
    discountType: "percentage",
    discountValue: "",
    expiryDate: "",
    minimumAmount: "",
    applicablePark: "ALL",
    maxUses: "",
    description: "",
  });

  useEffect(() => {
    dispatch(fetchCoupons());
    if (parks.length === 0) dispatch(fetchParks());
  }, [dispatch, parks.length]);

  // Mock data for demonstration
  const mockCoupons =
    coupons.length > 0
      ? coupons
      : [
          {
            id: 1,
            couponCode: "SAVE20",
            discountType: "percentage",
            discountValue: 20,
            expiryDate: "2024-12-31",
            minimumAmount: 1000,
            applicablePark: "ALL",
            active: true,
            maxUses: 100,
            used: 45,
          },
          {
            id: 2,
            couponCode: "FLAT500",
            discountType: "fixed",
            discountValue: 500,
            expiryDate: "2024-11-30",
            minimumAmount: 2500,
            applicablePark: "1",
            active: true,
            maxUses: 50,
            used: 23,
          },
          {
            id: 3,
            couponCode: "WEEKEND25",
            discountType: "percentage",
            discountValue: 25,
            expiryDate: "2024-10-15",
            minimumAmount: 1500,
            applicablePark: "2",
            active: false,
            maxUses: 200,
            used: 67,
          },
          {
            id: 4,
            couponCode: "FAMILY10",
            discountType: "percentage",
            discountValue: 10,
            expiryDate: "2024-12-25",
            minimumAmount: 3000,
            applicablePark: "ALL",
            active: true,
            maxUses: 150,
            used: 89,
          },
          {
            id: 5,
            couponCode: "WELCOME100",
            discountType: "fixed",
            discountValue: 100,
            expiryDate: "2024-09-30",
            minimumAmount: 500,
            applicablePark: "ALL",
            active: true,
            maxUses: 500,
            used: 312,
          },
        ];

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.couponCode.trim())
      newErrors.couponCode = "Coupon code is required";
    if (!formData.discountValue)
      newErrors.discountValue = "Discount value is required";
    if (formData.discountValue && parseFloat(formData.discountValue) <= 0) {
      newErrors.discountValue = "Discount value must be greater than 0";
    }
    if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormLoading(true);
    try {
      await dispatch(addCoupon(formData)).unwrap();
      setShowForm(false);
      setFormData({
        couponCode: "",
        discountType: "percentage",
        discountValue: "",
        expiryDate: "",
        minimumAmount: "",
        applicablePark: "ALL",
        maxUses: "",
        description: "",
      });
    } catch (error) {
      console.error("Failed to save coupon:", error);
      setErrors({ submit: "Failed to save coupon. Please try again." });
    } finally {
      setFormLoading(false);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCoupons(filteredCoupons.map((c) => c.id));
    } else {
      setSelectedCoupons([]);
    }
  };

  const handleSelectCoupon = (id) => {
    setSelectedCoupons((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Delete ${selectedCoupons.length} selected coupons?`)) {
      selectedCoupons.forEach((id) => dispatch(deleteCoupon(id)));
      setSelectedCoupons([]);
    }
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  // Filter coupons based on search and filters
  const filteredCoupons = mockCoupons.filter((coupon) => {
    const matchesSearch = coupon.couponCode
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && coupon.active) ||
      (filterStatus === "inactive" && !coupon.active);
    const matchesType =
      filterType === "all" || coupon.discountType === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Sort coupons
  const sortedCoupons = [...filteredCoupons].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const parkOptions = [
    { label: "All Parks", value: "ALL" },
    ...parks.map((p) => ({ label: p.parkName, value: p.id })),
  ];

  const getParkName = (parkId) => {
    if (parkId === "ALL") return "All Parks";
    const park = parks.find((p) => p.id === parkId);
    return park ? park.parkName : parkId;
  };

  const columns = [
    {
      header: (
        <input
          type="checkbox"
          checked={
            selectedCoupons.length === sortedCoupons.length &&
            sortedCoupons.length > 0
          }
          onChange={handleSelectAll}
          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
      ),
      accessor: "select",
      width: "50px",
      render: (row) => (
        <input
          type="checkbox"
          checked={selectedCoupons.includes(row.id)}
          onChange={() => handleSelectCoupon(row.id)}
          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
      ),
    },
    {
      header: "Coupon Details",
      accessor: "couponCode",
      onHeaderClick: () => handleSort("couponCode"),
      render: (row) => (
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 uppercase tracking-wide text-sm">
              {row.couponCode}
            </span>
            {row.used >= row.maxUses * 0.8 && (
              <span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                <FaFire className="text-xs" />
                Limited
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {getParkName(row.applicablePark)} • Used {row.used}/{row.maxUses}
          </p>
        </div>
      ),
    },
    {
      header: "Discount",
      accessor: "discountValue",
      onHeaderClick: () => handleSort("discountValue"),
      render: (row) => (
        <div>
          <p className="font-bold text-gray-900">
            {row.discountType === "fixed" ? "₹" : ""}
            {row.discountValue}
            {row.discountType === "percentage" ? "%" : ""}
          </p>
          <p className="text-xs text-gray-500">
            Min: ₹{row.minimumAmount || 0}
          </p>
        </div>
      ),
    },
    {
      header: "Expiry",
      accessor: "expiryDate",
      onHeaderClick: () => handleSort("expiryDate"),
      render: (row) => {
        const expiryDate = new Date(row.expiryDate);
        const today = new Date();
        const daysLeft = Math.ceil(
          (expiryDate - today) / (1000 * 60 * 60 * 24),
        );

        return (
          <div>
            <p className="text-sm text-gray-900">
              {expiryDate.toLocaleDateString("en-IN")}
            </p>
            <p
              className={`text-xs ${daysLeft < 7 ? "text-red-500" : "text-gray-500"}`}
            >
              {daysLeft} days left
            </p>
          </div>
        );
      },
    },
    {
      header: "Status",
      render: (row) => (
        <button
          onClick={() =>
            dispatch(toggleCoupon({ id: row.id, status: row.active }))
          }
          className="flex items-center gap-2"
        >
          {row.active ? (
            <>
              <FaToggleOn className="text-2xl text-green-500" />
              <Badge variant="success">Active</Badge>
            </>
          ) : (
            <>
              <FaToggleOff className="text-2xl text-gray-400" />
              <Badge variant="neutral">Inactive</Badge>
            </>
          )}
        </button>
      ),
    },
    {
      header: "Actions",
      className: "text-right",
      tdClassName: "text-right",
      render: (row) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              navigator.clipboard.writeText(row.couponCode);
              alert("Coupon code copied!");
            }}
            className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white transition-all"
            title="Copy Code"
          >
            <FaCopy className="mx-auto" />
          </button>
          <button
            onClick={() => dispatch(deleteCoupon(row.id))}
            className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 hover:bg-red-600 hover:text-white transition-all"
            title="Delete"
          >
            <FaTrash className="mx-auto" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Promotions & Coupons
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage discount campaigns and promotional offers
          </p>
        </div>
        <div className="flex items-center gap-3">
          {selectedCoupons.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 transition-all flex items-center gap-2"
            >
              <FaTrash />
              Delete ({selectedCoupons.length})
            </button>
          )}
          <button
            onClick={() => setShowForm(!showForm)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
              showForm
                ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                : "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg"
            }`}
          >
            {showForm ? <FaTimes /> : <FaPlus />}
            {showForm ? "Cancel" : "Add Coupon"}
          </button>
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
            <FaDownload />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
              <FaTag />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {mockCoupons.length}
            </span>
          </div>
          <p className="text-sm text-gray-500">Total Coupons</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
              <FaCheckCircle />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {mockCoupons.filter((c) => c.active).length}
            </span>
          </div>
          <p className="text-sm text-gray-500">Active</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
              <FaPercent />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {
                mockCoupons.filter((c) => c.discountType === "percentage")
                  .length
              }
            </span>
          </div>
          <p className="text-sm text-gray-500">Percentage</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
              <FaMoneyBillWave />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {mockCoupons.filter((c) => c.discountType === "fixed").length}
            </span>
          </div>
          <p className="text-sm text-gray-500">Fixed Amount</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search coupons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            )}
          </div>
          <div className="flex gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:border-blue-500 focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:border-blue-500 focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed Amount</option>
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                showFilters
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FaFilter />
              Filters
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">
                Min Amount
              </label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                <option>All</option>
                <option>Under ₹500</option>
                <option>₹500 - ₹1000</option>
                <option>Above ₹1000</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">
                Discount Value
              </label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                <option>All</option>
                <option>Under 20%</option>
                <option>20% - 40%</option>
                <option>Above 40%</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">
                Park
              </label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                <option>All Parks</option>
                {parks.map((p) => (
                  <option key={p.id}>{p.parkName}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Add Coupon Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-in slide-in-from-top duration-300">
          <div className="p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaPlus className="text-blue-600" />
              Add New Coupon
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Coupon Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Coupon Code <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="couponCode"
                    value={formData.couponCode}
                    onChange={handleFormChange}
                    placeholder="SAVE50"
                    icon={FaTag}
                    className={errors.couponCode ? "border-red-500" : ""}
                  />
                  {errors.couponCode && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <FaTimesCircle /> {errors.couponCode}
                    </p>
                  )}
                </div>

                {/* Discount Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount Type
                  </label>
                  <Select
                    name="discountType"
                    value={formData.discountType}
                    onChange={handleFormChange}
                    options={[
                      { label: "Percentage (%)", value: "percentage" },
                      { label: "Fixed Amount (₹)", value: "fixed" },
                    ]}
                  />
                </div>

                {/* Discount Value */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount Value <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="discountValue"
                    type="number"
                    value={formData.discountValue}
                    onChange={handleFormChange}
                    placeholder={
                      formData.discountType === "percentage" ? "20" : "500"
                    }
                    icon={
                      formData.discountType === "percentage"
                        ? FaPercent
                        : FaMoneyBillWave
                    }
                    className={errors.discountValue ? "border-red-500" : ""}
                  />
                  {errors.discountValue && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.discountValue}
                    </p>
                  )}
                </div>

                {/* Expiry Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={handleFormChange}
                    icon={FaCalendarAlt}
                    className={errors.expiryDate ? "border-red-500" : ""}
                  />
                  {errors.expiryDate && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.expiryDate}
                    </p>
                  )}
                </div>

                {/* Minimum Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min. Purchase (₹)
                  </label>
                  <Input
                    name="minimumAmount"
                    type="number"
                    value={formData.minimumAmount}
                    onChange={handleFormChange}
                    placeholder="Optional"
                    icon={() => <span>₹</span>}
                  />
                </div>

                {/* Max Uses */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Uses
                  </label>
                  <Input
                    name="maxUses"
                    type="number"
                    value={formData.maxUses}
                    onChange={handleFormChange}
                    placeholder="e.g. 100"
                    icon={FaCopy}
                  />
                </div>

                {/* Applicable Park */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Applicable Park
                  </label>
                  <Select
                    name="applicablePark"
                    value={formData.applicablePark}
                    onChange={handleFormChange}
                    options={parkOptions}
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    rows="2"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                    placeholder="Brief description of this offer..."
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg text-sm font-bold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                >
                  {formLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <FaCheckCircle />
                      Create Coupon
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
      )}

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <Table
          columns={columns}
          data={sortedCoupons}
          loading={couponsLoading}
          pagination={{
            total: sortedCoupons.length,
            current: 1,
            pageSize: 10,
            onPageChange: (page) => console.log("Page", page),
          }}
          emptyMessage="No coupons found"
        />
      </div>

      {/* Tips Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h3 className="text-sm font-bold text-blue-900 mb-2 flex items-center gap-2">
          <FaInfoCircle className="text-blue-600" />
          Promotional Tips
        </h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Use clear, memorable coupon codes like SUMMER20 or FAMILY10</li>
          <li>
            • Set appropriate minimum purchase amounts to maximize revenue
          </li>
          <li>• Limited-time offers create urgency and drive conversions</li>
          <li>• Track usage to identify most effective promotions</li>
          <li>
            • Test different discount types (percentage vs fixed) to find what
            works best
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CouponManager;
