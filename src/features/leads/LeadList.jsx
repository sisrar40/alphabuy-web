import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads, updateLeadStatus, deleteLead } from "./leadSlice";
import PageHeader from "../../components/ui/PageHeader";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Input from "../../components/ui/Input";
import {
  FaTrash,
  FaSearch,
  FaEnvelope,
  FaPhone,
  FaTimes,
  FaFilter,
  FaDownload,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaUserPlus,
  FaUserCheck,
  FaUserClock,
  FaCalendarAlt,
  FaComment,
  FaWhatsapp,
  FaMailBulk,
  FaInfoCircle,
  FaChevronDown,
  FaChevronUp,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaStar,
  FaRegStar,
  FaFire,
  FaChartLine,
} from "react-icons/fa";

const LeadList = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPark, setFilterPark] = useState("all");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });

  const { items, loading } = useSelector((state) => state.leads);

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  // Mock data for demonstration
  const mockLeads =
    items.length > 0
      ? items
      : [
          {
            id: 1,
            name: "Rahul Sharma",
            email: "rahul.sharma@example.com",
            phone: "9876543210",
            park: "AquaZen Paradise",
            message: "Interested in family packages for weekend",
            date: "2024-03-15T10:30:00",
            status: "New",
            source: "Website",
            priority: "High",
          },
          {
            id: 2,
            name: "Priya Patel",
            email: "priya.patel@example.com",
            phone: "9876543211",
            park: "Splash Kingdom",
            message: "Looking for group discounts for 20 people",
            date: "2024-03-14T14:20:00",
            status: "Contacted",
            source: "WhatsApp",
            priority: "Medium",
          },
          {
            id: 3,
            name: "Amit Kumar",
            email: "amit.kumar@example.com",
            phone: "9876543212",
            park: "Wave World",
            message: "Need information about annual passes",
            date: "2024-03-13T09:15:00",
            status: "Converted",
            source: "Instagram",
            priority: "Low",
          },
          {
            id: 4,
            name: "Sneha Reddy",
            email: "sneha.reddy@example.com",
            phone: "9876543213",
            park: "AquaZen Paradise",
            message: "Birthday party booking for 15 kids",
            date: "2024-03-12T16:45:00",
            status: "New",
            source: "Website",
            priority: "High",
          },
          {
            id: 5,
            name: "Vikram Singh",
            email: "vikram.singh@example.com",
            phone: "9876543214",
            park: "Splash Kingdom",
            message: "Corporate event inquiry for 50 people",
            date: "2024-03-11T11:30:00",
            status: "Contacted",
            source: "Email",
            priority: "Medium",
          },
          {
            id: 6,
            name: "Anjali Desai",
            email: "anjali.desai@example.com",
            phone: "9876543215",
            park: "Wave World",
            message: "Looking for cabana rentals",
            date: "2024-03-10T13:20:00",
            status: "New",
            source: "Facebook",
            priority: "High",
          },
        ];

  const parks = [...new Set(mockLeads.map((lead) => lead.park))];

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateLeadStatus({ id, status: newStatus }));
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedLeads(filteredLeads.map((l) => l.id));
    } else {
      setSelectedLeads([]);
    }
  };

  const handleSelectLead = (id) => {
    setSelectedLeads((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id],
    );
  };

  const handleBulkAction = (action) => {
    if (action === "export") {
      console.log("Export selected:", selectedLeads);
    } else if (action === "contact") {
      console.log("Contact selected:", selectedLeads);
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

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort className="text-gray-400" />;
    return sortConfig.direction === "asc" ? (
      <FaSortUp className="text-blue-600" />
    ) : (
      <FaSortDown className="text-blue-600" />
    );
  };

  // Filter leads
  const filteredLeads = mockLeads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.park.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || lead.status === filterStatus;
    const matchesPark = filterPark === "all" || lead.park === filterPark;

    const leadDate = new Date(lead.date);
    const matchesDateFrom =
      !dateRange.from || leadDate >= new Date(dateRange.from);
    const matchesDateTo = !dateRange.to || leadDate <= new Date(dateRange.to);

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPark &&
      matchesDateFrom &&
      matchesDateTo
    );
  });

  // Sort leads
  const sortedLeads = [...filteredLeads].sort((a, b) => {
    if (sortConfig.key) {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === "date") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "Converted":
        return <Badge variant="success">Converted</Badge>;
      case "Contacted":
        return <Badge variant="info">Contacted</Badge>;
      case "New":
        return <Badge variant="warning">New</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "High":
        return <FaFire className="text-red-500" />;
      case "Medium":
        return <FaStar className="text-yellow-500" />;
      case "Low":
        return <FaRegStar className="text-gray-400" />;
      default:
        return null;
    }
  };

  const getSourceIcon = (source) => {
    switch (source) {
      case "Website":
        return "🌐";
      case "WhatsApp":
        return "📱";
      case "Instagram":
        return "📷";
      case "Facebook":
        return "📘";
      case "Email":
        return "📧";
      default:
        return "📋";
    }
  };

  const columns = [
    {
      header: (
        <input
          type="checkbox"
          checked={
            selectedLeads.length === filteredLeads.length &&
            filteredLeads.length > 0
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
          checked={selectedLeads.includes(row.id)}
          onChange={() => handleSelectLead(row.id)}
          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
      ),
    },
    {
      header: (
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleSort("name")}
        >
          <span>Lead Details</span>
          {getSortIcon("name")}
        </div>
      ),
      render: (row) => (
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {row.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-bold text-gray-900">{row.name}</p>
              {getPriorityIcon(row.priority)}
            </div>
            <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <FaEnvelope className="text-gray-400" /> {row.email}
              </span>
              <span className="flex items-center gap-1">
                <FaPhone className="text-gray-400" /> {row.phone}
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      header: (
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleSort("park")}
        >
          <span>Interest</span>
          {getSortIcon("park")}
        </div>
      ),
      render: (row) => (
        <div className="max-w-xs">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-tighter">
              {row.park}
            </span>
            <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full">
              {getSourceIcon(row.source)} {row.source}
            </span>
          </div>
          <p className="text-xs text-gray-600 mt-1 line-clamp-2 italic bg-gray-50 p-2 rounded-lg">
            "{row.message}"
          </p>
        </div>
      ),
    },
    {
      header: (
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleSort("date")}
        >
          <span>Date</span>
          {getSortIcon("date")}
        </div>
      ),
      render: (row) => (
        <div>
          <p className="text-sm font-medium text-gray-900">
            {new Date(row.date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {new Date(row.date).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      ),
    },
    {
      header: "Status",
      render: (row) => (
        <select
          value={row.status}
          onChange={(e) => handleStatusChange(row.id, e.target.value)}
          className={`
            px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider outline-none border transition-all cursor-pointer
            ${
              row.status === "Converted"
                ? "bg-green-50 text-green-700 border-green-200"
                : row.status === "Contacted"
                  ? "bg-blue-50 text-blue-700 border-blue-200"
                  : "bg-yellow-50 text-yellow-700 border-yellow-200"
            }
          `}
        >
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Converted">Converted</option>
        </select>
      ),
    },
    {
      header: "Actions",
      className: "text-right",
      tdClassName: "text-right",
      render: (row) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => window.open(`mailto:${row.email}`)}
            className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white transition-all"
            title="Send Email"
          >
            <FaEnvelope className="mx-auto" />
          </button>
          <button
            onClick={() => window.open(`https://wa.me/${row.phone}`)}
            className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 hover:bg-green-600 hover:text-white transition-all"
            title="WhatsApp"
          >
            <FaWhatsapp className="mx-auto" />
          </button>
          <button
            onClick={() => {
              if (window.confirm("Delete this inquiry?"))
                dispatch(deleteLead(row.id));
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

  // Summary stats
  const totalLeads = mockLeads.length;
  const newLeads = mockLeads.filter((l) => l.status === "New").length;
  const contactedLeads = mockLeads.filter(
    (l) => l.status === "Contacted",
  ).length;
  const convertedLeads = mockLeads.filter(
    (l) => l.status === "Converted",
  ).length;
  const highPriorityLeads = mockLeads.filter(
    (l) => l.priority === "High",
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Track and manage customer inquiries and potential bookings
          </p>
        </div>
        <div className="flex items-center gap-3">
          {selectedLeads.length > 0 && (
            <>
              <button
                onClick={() => handleBulkAction("contact")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all flex items-center gap-2"
              >
                <FaMailBulk />
                Contact ({selectedLeads.length})
              </button>
              <button
                onClick={() => handleBulkAction("export")}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm font-bold hover:bg-gray-700 transition-all flex items-center gap-2"
              >
                <FaDownload />
                Export
              </button>
            </>
          )}
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
            <FaDownload />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
              <FaUserPlus />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {totalLeads}
            </span>
          </div>
          <p className="text-sm text-gray-500">Total Leads</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600">
              <FaUserClock />
            </div>
            <span className="text-2xl font-bold text-gray-900">{newLeads}</span>
          </div>
          <p className="text-sm text-gray-500">New</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
              <FaUserCheck />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {contactedLeads}
            </span>
          </div>
          <p className="text-sm text-gray-500">Contacted</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
              <FaCheckCircle />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {convertedLeads}
            </span>
          </div>
          <p className="text-sm text-gray-500">Converted</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600">
              <FaFire />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {highPriorityLeads}
            </span>
          </div>
          <p className="text-sm text-gray-500">High Priority</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, phone, or park..."
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
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Converted">Converted</option>
            </select>
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
                Date From
              </label>
              <input
                type="date"
                value={dateRange.from}
                onChange={(e) =>
                  setDateRange({ ...dateRange, from: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">
                Date To
              </label>
              <input
                type="date"
                value={dateRange.to}
                onChange={(e) =>
                  setDateRange({ ...dateRange, to: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">
                Priority
              </label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                <option>All Priorities</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <Table
          columns={columns}
          data={sortedLeads}
          loading={loading}
          pagination={{
            total: sortedLeads.length,
            current: 1,
            pageSize: 10,
            onPageChange: (page) => console.log("Page", page),
          }}
          emptyMessage="No leads found"
        />
      </div>

      {/* Lead Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <FaInfoCircle className="text-blue-600 text-lg mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-blue-900 mb-1">
              Lead Management Tips
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>
                • Follow up with new leads within 24 hours for best conversion
                rates
              </li>
              <li>• High priority leads require immediate attention</li>
              <li>• Track lead source to optimize marketing channels</li>
              <li>• Use WhatsApp for quick responses to urgent inquiries</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadList;
