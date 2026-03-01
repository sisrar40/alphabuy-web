import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMeals } from "./mealSlice";
import PageHeader from "../../components/ui/PageHeader";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaSearch,
  FaFilter,
  FaDownload,
  FaEye,
  FaUtensils,
  FaTag,
  FaFire,
  FaLeaf,
  FaStar,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";

const MealsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading } = useSelector((state) => state.meals);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPark, setFilterPark] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "mealName",
    direction: "asc",
  });

  useEffect(() => {
    dispatch(fetchMeals());
  }, [dispatch]);

  // Mock data for demonstration
  const mockMeals =
    items.length > 0
      ? items
      : [
          {
            id: 1,
            mealName: "Premium Lunch Buffet",
            parkName: "AquaZen Paradise",
            price: 599,
            type: "buffet",
            calories: "650-800",
            popular: true,
            dietary: "veg & non-veg",
          },
          {
            id: 2,
            mealName: "Kids Meal Box",
            parkName: "Splash Kingdom",
            price: 299,
            type: "combo",
            calories: "400-500",
            popular: false,
            dietary: "veg",
          },
          {
            id: 3,
            mealName: "Family Feast Pack",
            parkName: "Wave World",
            price: 1999,
            type: "family",
            calories: "2000+",
            popular: true,
            dietary: "mixed",
          },
          {
            id: 4,
            mealName: "Healthy Bowl",
            parkName: "AquaZen Paradise",
            price: 349,
            type: "healthy",
            calories: "350-450",
            popular: false,
            dietary: "veg",
          },
          {
            id: 5,
            mealName: "Seafood Special",
            parkName: "Water Haven",
            price: 799,
            type: "premium",
            calories: "700-900",
            popular: true,
            dietary: "non-veg",
          },
          {
            id: 6,
            mealName: "Snack Combo",
            parkName: "Splash Kingdom",
            price: 199,
            type: "snack",
            calories: "250-350",
            popular: false,
            dietary: "veg",
          },
        ];

  const parks = [...new Set(mockMeals.map((meal) => meal.parkName))];

  const filteredMeals = mockMeals.filter((meal) => {
    const matchesSearch =
      meal.mealName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meal.parkName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPark = filterPark === "all" || meal.parkName === filterPark;
    const matchesType = filterType === "all" || meal.type === filterType;
    return matchesSearch && matchesPark && matchesType;
  });

  const sortedMeals = [...filteredMeals].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedMeals(sortedMeals.map((m) => m.id));
    } else {
      setSelectedMeals([]);
    }
  };

  const handleSelectMeal = (id) => {
    setSelectedMeals((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Delete ${selectedMeals.length} selected meals?`)) {
      // Handle bulk delete
      setSelectedMeals([]);
    }
  };

  const getDietaryBadge = (dietary) => {
    const variants = {
      veg: { label: "Veg", color: "bg-green-100 text-green-700" },
      "non-veg": { label: "Non-Veg", color: "bg-red-100 text-red-700" },
      mixed: { label: "Mixed", color: "bg-purple-100 text-purple-700" },
    };
    const badge = variants[dietary] || {
      label: dietary,
      color: "bg-gray-100 text-gray-700",
    };
    return (
      <span
        className={`text-[10px] font-bold px-2 py-1 rounded-full ${badge.color}`}
      >
        {badge.label}
      </span>
    );
  };

  const columns = [
    {
      header: (
        <input
          type="checkbox"
          checked={
            selectedMeals.length === sortedMeals.length &&
            sortedMeals.length > 0
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
          checked={selectedMeals.includes(row.id)}
          onChange={() => handleSelectMeal(row.id)}
          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
      ),
    },
    {
      header: "Meal Details",
      accessor: "mealName",
      onHeaderClick: () => handleSort("mealName"),
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
            <FaUtensils />
          </div>
          <div>
            <p className="font-bold text-gray-900">{row.mealName}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-500">{row.parkName}</span>
              {row.popular && (
                <span className="flex items-center gap-1 text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                  <FaFire className="text-xs" />
                  Popular
                </span>
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Price",
      accessor: "price",
      onHeaderClick: () => handleSort("price"),
      render: (row) => (
        <div>
          <p className="font-bold text-gray-900">₹{row.price}</p>
          <p className="text-xs text-gray-500">per person</p>
        </div>
      ),
    },
    {
      header: "Type",
      accessor: "type",
      render: (row) => (
        <span className="text-sm text-gray-600 capitalize">{row.type}</span>
      ),
    },
    {
      header: "Dietary",
      render: (row) => getDietaryBadge(row.dietary),
    },
    {
      header: "Calories",
      render: (row) => (
        <span className="text-sm text-gray-600">{row.calories}</span>
      ),
    },
    {
      header: "Actions",
      className: "text-right",
      tdClassName: "text-right",
      render: (row) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => navigate(`/admin/meals/${row.id}`)}
            className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white transition-all"
            title="View Details"
          >
            <FaEye className="mx-auto" />
          </button>
          <button
            onClick={() => navigate(`/admin/meals/edit/${row.id}`)}
            className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 hover:bg-green-600 hover:text-white transition-all"
            title="Edit"
          >
            <FaEdit className="mx-auto" />
          </button>
          <button
            onClick={() => {
              if (window.confirm("Delete this meal?")) {
                console.log("Delete", row.id);
              }
            }}
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
          <h1 className="text-2xl font-bold text-gray-900">Meal Plans</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage meal options across all water parks
          </p>
        </div>
        <div className="flex items-center gap-3">
          {selectedMeals.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 transition-all flex items-center gap-2"
            >
              <FaTrash />
              Delete ({selectedMeals.length})
            </button>
          )}
          <button
            onClick={() => navigate("/admin/meals/add")}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg text-sm font-bold hover:shadow-lg transition-all flex items-center gap-2"
          >
            <FaPlus />
            Add New Meal
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
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
              <FaUtensils />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {mockMeals.length}
            </span>
          </div>
          <p className="text-sm text-gray-500">Total Meals</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
              <FaLeaf />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {mockMeals.filter((m) => m.dietary === "veg").length}
            </span>
          </div>
          <p className="text-sm text-gray-500">Vegetarian</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600">
              <FaFire />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {mockMeals.filter((m) => m.popular).length}
            </span>
          </div>
          <p className="text-sm text-gray-500">Popular Items</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
              <FaTag />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              ₹
              {(
                mockMeals.reduce((sum, m) => sum + m.price, 0) /
                mockMeals.length
              ).toFixed(0)}
            </span>
          </div>
          <p className="text-sm text-gray-500">Avg. Price</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search meals by name or park..."
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
              value={filterPark}
              onChange={(e) => setFilterPark(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:border-blue-500 focus:outline-none"
            >
              <option value="all">All Parks</option>
              {parks.map((park) => (
                <option key={park} value={park}>
                  {park}
                </option>
              ))}
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:border-blue-500 focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="buffet">Buffet</option>
              <option value="combo">Combo</option>
              <option value="family">Family</option>
              <option value="healthy">Healthy</option>
              <option value="premium">Premium</option>
              <option value="snack">Snack</option>
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
                Price Range
              </label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                <option>All Prices</option>
                <option>Under ₹300</option>
                <option>₹300 - ₹600</option>
                <option>Above ₹600</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">
                Dietary
              </label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                <option>All</option>
                <option>Vegetarian</option>
                <option>Non-Vegetarian</option>
                <option>Mixed</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">
                Calories
              </label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                <option>All</option>
                <option>Under 400</option>
                <option>400 - 700</option>
                <option>Above 700</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <Table
          columns={columns}
          data={sortedMeals}
          loading={loading}
          pagination={{
            total: sortedMeals.length,
            current: 1,
            pageSize: 10,
            onPageChange: (page) => console.log("Page", page),
          }}
          emptyMessage="No meal plans found"
        />
      </div>
    </div>
  );
};

export default MealsList;
