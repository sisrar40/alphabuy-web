import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchParks } from "./parkSlice";
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
  FaMapMarkerAlt,
  FaWater,
  FaUsers,
  FaTicketAlt,
  FaStar,
  FaChevronDown,
  FaTimes,
} from "react-icons/fa";

const ParksList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading } = useSelector((state) => state.parks);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedParks, setSelectedParks] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "parkName",
    direction: "asc",
  });

  useEffect(() => {
    dispatch(fetchParks());
  }, [dispatch]);

  // Mock data for demonstration
  const mockParks =
    items.length > 0
      ? items
      : [
          {
            id: 1,
            parkName: "AquaZen Paradise",
            location: "Lonavala, Maharashtra",
            price: 1299,
            rating: 4.8,
            visitors: "45K+",
            status: "active",
          },
          {
            id: 2,
            parkName: "Splash Kingdom",
            location: "Goa",
            price: 1499,
            rating: 4.7,
            visitors: "38K+",
            status: "active",
          },
          {
            id: 3,
            parkName: "Wave World",
            location: "Bangalore",
            price: 999,
            rating: 4.5,
            visitors: "52K+",
            status: "maintenance",
          },
          {
            id: 4,
            parkName: "Aqua Adventure",
            location: "Delhi NCR",
            price: 1199,
            rating: 4.6,
            visitors: "41K+",
            status: "active",
          },
          {
            id: 5,
            parkName: "Water Haven",
            location: "Chennai",
            price: 1099,
            rating: 4.4,
            visitors: "29K+",
            status: "inactive",
          },
        ];

  const filteredParks = mockParks.filter((park) => {
    const matchesSearch =
      park.parkName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      park.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || park.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const sortedParks = [...filteredParks].sort((a, b) => {
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
      setSelectedParks(sortedParks.map((p) => p.id));
    } else {
      setSelectedParks([]);
    }
  };

  const handleSelectPark = (id) => {
    setSelectedParks((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Delete ${selectedParks.length} selected parks?`)) {
      // Handle bulk delete
      setSelectedParks([]);
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      active: "success",
      maintenance: "warning",
      inactive: "error",
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  const columns = [
    {
      header: (
        <input
          type="checkbox"
          checked={
            selectedParks.length === sortedParks.length &&
            sortedParks.length > 0
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
          checked={selectedParks.includes(row.id)}
          onChange={() => handleSelectPark(row.id)}
          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
      ),
    },
    {
      header: "Park Details",
      accessor: "parkName",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center text-white">
            <FaWater />
          </div>
          <div>
            <p className="font-bold text-gray-900">{row.parkName}</p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <FaMapMarkerAlt className="text-blue-500" />
              <span>{row.location}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Pricing",
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
      header: "Performance",
      render: (row) => (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-400" />
            <span className="font-bold text-gray-900">{row.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaUsers className="text-blue-500" />
            <span className="text-sm text-gray-600">{row.visitors}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      onHeaderClick: () => handleSort("status"),
      render: (row) => getStatusBadge(row.status),
    },
    {
      header: "Actions",
      className: "text-right",
      tdClassName: "text-right",
      render: (row) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => navigate(`/admin/parks/${row.id}`)}
            className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white transition-all"
            title="View Details"
          >
            <FaEye className="mx-auto" />
          </button>
          <button
            onClick={() => navigate(`/admin/parks/edit/${row.id}`)}
            className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 hover:bg-green-600 hover:text-white transition-all"
            title="Edit"
          >
            <FaEdit className="mx-auto" />
          </button>
          <button
            onClick={() => {
              if (window.confirm("Delete this park?")) {
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
          <h1 className="text-2xl font-bold text-gray-900">Water Parks</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your water park inventory and pricing
          </p>
        </div>
        <div className="flex items-center gap-3">
          {selectedParks.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 transition-all flex items-center gap-2"
            >
              <FaTrash />
              Delete ({selectedParks.length})
            </button>
          )}
          <button
            onClick={() => navigate("/admin/parks/add")}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg text-sm font-bold hover:shadow-lg transition-all flex items-center gap-2"
          >
            <FaPlus />
            Add New Park
          </button>
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
            <FaDownload />
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search parks by name or location..."
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
              <option value="maintenance">Maintenance</option>
              <option value="inactive">Inactive</option>
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
                <option>Under ₹1000</option>
                <option>₹1000 - ₹1500</option>
                <option>Above ₹1500</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">
                Rating
              </label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                <option>All Ratings</option>
                <option>4.5+ Stars</option>
                <option>4.0+ Stars</option>
                <option>3.5+ Stars</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">
                Location
              </label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                <option>All Locations</option>
                <option>Maharashtra</option>
                <option>Goa</option>
                <option>Karnataka</option>
                <option>Delhi NCR</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
              <FaWater />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {mockParks.length}
            </span>
          </div>
          <p className="text-sm text-gray-500">Total Parks</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
              <FaTicketAlt />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {mockParks.filter((p) => p.status === "active").length}
            </span>
          </div>
          <p className="text-sm text-gray-500">Active Parks</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600">
              <FaUsers />
            </div>
            <span className="text-2xl font-bold text-gray-900">205K+</span>
          </div>
          <p className="text-sm text-gray-500">Total Visitors</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
              <FaStar />
            </div>
            <span className="text-2xl font-bold text-gray-900">4.6</span>
          </div>
          <p className="text-sm text-gray-500">Average Rating</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <Table
          columns={columns}
          data={sortedParks}
          loading={loading}
          pagination={{
            total: sortedParks.length,
            current: 1,
            pageSize: 10,
            onPageChange: (page) => console.log("Page", page),
          }}
          emptyMessage="No water parks found"
        />
      </div>
    </div>
  );
};

export default ParksList;
