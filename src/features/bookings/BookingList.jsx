import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAdminBookings, updateBookingStatus } from "./bookingSlice";
import PageHeader from "../../components/ui/PageHeader";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Select from "../../components/ui/Select";
import {
  FaEye,
  FaFilter,
  FaSearch,
  FaTimes,
  FaDownload,
  FaCalendarAlt,
  FaUser,
  FaTicketAlt,
  FaRupeeSign,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaInfoCircle,
  FaPrint,
  FaEnvelope,
  FaWhatsapp,
  FaChevronDown,
  FaChevronUp,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaFilePdf,
  FaFileExcel,
} from "react-icons/fa";

const BookingList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading } = useSelector((state) => state.adminBookings);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPayment, setFilterPayment] = useState("all");
  const [filterDate, setFilterDate] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });

  useEffect(() => {
    dispatch(fetchAdminBookings());
  }, [dispatch]);

  // Mock data for demonstration
  const mockBookings =
    items.length > 0
      ? items
      : [
          {
            id: "BKG001",
            userName: "Rahul Sharma",
            userEmail: "rahul@example.com",
            userPhone: "9876543210",
            parkName: "AquaZen Paradise",
            parkId: "1",
            date: "2024-03-15",
            slots: 3,
            amount: 3897,
            paymentStatus: "Paid",
            paymentMethod: "Credit Card",
            status: "Confirmed",
            tickets: [
              { type: "Adult", quantity: 2, price: 1199 },
              { type: "Child", quantity: 1, price: 899 },
            ],
            meals: [{ name: "Lunch Buffet", quantity: 3, price: 599 }],
            bookingDate: "2024-03-10T10:30:00",
            specialRequests: "Need wheelchair access",
          },
          {
            id: "BKG002",
            userName: "Priya Patel",
            userEmail: "priya@example.com",
            userPhone: "9876543211",
            parkName: "Splash Kingdom",
            parkId: "2",
            date: "2024-03-16",
            slots: 2,
            amount: 2598,
            paymentStatus: "Pending",
            paymentMethod: "UPI",
            status: "Pending",
            tickets: [{ type: "Adult", quantity: 2, price: 1199 }],
            meals: [],
            bookingDate: "2024-03-11T14:20:00",
            specialRequests: "",
          },
          {
            id: "BKG003",
            userName: "Amit Kumar",
            userEmail: "amit@example.com",
            userPhone: "9876543212",
            parkName: "Wave World",
            parkId: "3",
            date: "2024-03-14",
            slots: 4,
            amount: 5196,
            paymentStatus: "Paid",
            paymentMethod: "Debit Card",
            status: "Confirmed",
            tickets: [
              { type: "Adult", quantity: 3, price: 1199 },
              { type: "Child", quantity: 1, price: 899 },
            ],
            meals: [{ name: "Family Pack", quantity: 1, price: 1999 }],
            bookingDate: "2024-03-09T09:15:00",
            specialRequests: "Birthday celebration",
          },
          {
            id: "BKG004",
            userName: "Sneha Reddy",
            userEmail: "sneha@example.com",
            userPhone: "9876543213",
            parkName: "AquaZen Paradise",
            parkId: "1",
            date: "2024-03-17",
            slots: 2,
            amount: 2398,
            paymentStatus: "Paid",
            paymentMethod: "PayPal",
            status: "Confirmed",
            tickets: [{ type: "Adult", quantity: 2, price: 1199 }],
            meals: [{ name: "Premium Lunch", quantity: 2, price: 799 }],
            bookingDate: "2024-03-12T16:45:00",
            specialRequests: "",
          },
          {
            id: "BKG005",
            userName: "Vikram Singh",
            userEmail: "vikram@example.com",
            userPhone: "9876543214",
            parkName: "Splash Kingdom",
            parkId: "2",
            date: "2024-03-13",
            slots: 1,
            amount: 1199,
            paymentStatus: "Failed",
            paymentMethod: "Credit Card",
            status: "Cancelled",
            tickets: [{ type: "Adult", quantity: 1, price: 1199 }],
            meals: [],
            bookingDate: "2024-03-08T11:30:00",
            specialRequests: "",
          },
        ];

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateBookingStatus({ id, status: newStatus }));
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedBookings(filteredBookings.map((b) => b.id));
    } else {
      setSelectedBookings([]);
    }
  };

  const handleSelectBooking = (id) => {
    setSelectedBookings((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id],
    );
  };

  const handleBulkAction = (action) => {
    if (action === "export") {
      console.log("Export selected:", selectedBookings);
    } else if (action === "print") {
      console.log("Print selected:", selectedBookings);
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

  // Filter bookings
  const filteredBookings = mockBookings.filter((booking) => {
    const matchesSearch =
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.parkName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || booking.status === filterStatus;
    const matchesPayment =
      filterPayment === "all" || booking.paymentStatus === filterPayment;
    const matchesDate = !filterDate || booking.date === filterDate;

    return matchesSearch && matchesStatus && matchesPayment && matchesDate;
  });

  // Sort bookings
  const sortedBookings = [...filteredBookings].sort((a, b) => {
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
      case "Confirmed":
        return <Badge variant="success">Confirmed</Badge>;
      case "Pending":
        return <Badge variant="warning">Pending</Badge>;
      case "Cancelled":
        return <Badge variant="error">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPaymentBadge = (status) => {
    switch (status) {
      case "Paid":
        return <Badge variant="success">Paid</Badge>;
      case "Pending":
        return <Badge variant="warning">Pending</Badge>;
      case "Failed":
        return <Badge variant="error">Failed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const columns = [
    {
      header: (
        <input
          type="checkbox"
          checked={
            selectedBookings.length === filteredBookings.length &&
            filteredBookings.length > 0
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
          checked={selectedBookings.includes(row.id)}
          onChange={() => handleSelectBooking(row.id)}
          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
      ),
    },
    {
      header: (
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleSort("id")}
        >
          <span>Booking ID</span>
          {getSortIcon("id")}
        </div>
      ),
      accessor: "id",
      render: (row) => (
        <div>
          <span className="font-bold text-gray-900">{row.id}</span>
          <p className="text-xs text-gray-500 mt-1">
            {new Date(row.bookingDate).toLocaleString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              day: "numeric",
              month: "short",
            })}
          </p>
        </div>
      ),
    },
    {
      header: (
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleSort("userName")}
        >
          <span>Customer</span>
          {getSortIcon("userName")}
        </div>
      ),
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
            {row.userName.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-gray-900">{row.userName}</p>
            <p className="text-xs text-gray-500">{row.userEmail}</p>
            <p className="text-xs text-gray-400 mt-0.5">{row.userPhone}</p>
          </div>
        </div>
      ),
    },
    {
      header: (
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleSort("parkName")}
        >
          <span>Park</span>
          {getSortIcon("parkName")}
        </div>
      ),
      render: (row) => (
        <div>
          <p className="font-bold text-gray-900">{row.parkName}</p>
          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
            <FaCalendarAlt className="text-blue-500" />
            {new Date(row.date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      ),
    },
    {
      header: (
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleSort("slots")}
        >
          <span>Slots</span>
          {getSortIcon("slots")}
        </div>
      ),
      render: (row) => (
        <div className="text-center">
          <span className="font-bold text-gray-900">{row.slots}</span>
          <p className="text-xs text-gray-500 mt-1">persons</p>
        </div>
      ),
    },
    {
      header: (
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleSort("amount")}
        >
          <span>Amount</span>
          {getSortIcon("amount")}
        </div>
      ),
      render: (row) => (
        <div>
          <p className="font-bold text-gray-900">₹{row.amount}</p>
          <div className="flex items-center gap-1 mt-1">
            {getPaymentBadge(row.paymentStatus)}
            <span className="text-xs text-gray-400">{row.paymentMethod}</span>
          </div>
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
              row.status === "Confirmed"
                ? "bg-green-50 text-green-700 border-green-200"
                : row.status === "Cancelled"
                  ? "bg-red-50 text-red-700 border-red-200"
                  : "bg-yellow-50 text-yellow-700 border-yellow-200"
            }
          `}
        >
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Cancelled">Cancelled</option>
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
            onClick={() => navigate(`/admin/bookings/${row.id}`)}
            className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white transition-all"
            title="View Details"
          >
            <FaEye className="mx-auto" />
          </button>
          <button
            onClick={() => window.open(`mailto:${row.userEmail}`)}
            className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 hover:bg-green-600 hover:text-white transition-all"
            title="Send Email"
          >
            <FaEnvelope className="mx-auto" />
          </button>
          <button
            onClick={() => window.open(`https://wa.me/${row.userPhone}`)}
            className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 hover:bg-green-700 hover:text-white transition-all"
            title="WhatsApp"
          >
            <FaWhatsapp className="mx-auto" />
          </button>
        </div>
      ),
    },
  ];

  // Summary stats
  const totalBookings = mockBookings.length;
  const totalRevenue = mockBookings.reduce((sum, b) => sum + b.amount, 0);
  const confirmedBookings = mockBookings.filter(
    (b) => b.status === "Confirmed",
  ).length;
  const pendingBookings = mockBookings.filter(
    (b) => b.status === "Pending",
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and track all customer reservations
          </p>
        </div>
        <div className="flex items-center gap-3">
          {selectedBookings.length > 0 && (
            <>
              <button
                onClick={() => handleBulkAction("export")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all flex items-center gap-2"
              >
                <FaDownload />
                Export ({selectedBookings.length})
              </button>
              <button
                onClick={() => handleBulkAction("print")}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm font-bold hover:bg-gray-700 transition-all flex items-center gap-2"
              >
                <FaPrint />
                Print
              </button>
            </>
          )}
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-2">
            <FaFileExcel />
            Export All
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
              <FaTicketAlt />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {totalBookings}
            </span>
          </div>
          <p className="text-sm text-gray-500">Total Bookings</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
              <FaRupeeSign />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              ₹{totalRevenue}
            </span>
          </div>
          <p className="text-sm text-gray-500">Total Revenue</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
              <FaCheckCircle />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {confirmedBookings}
            </span>
          </div>
          <p className="text-sm text-gray-500">Confirmed</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600">
              <FaClock />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {pendingBookings}
            </span>
          </div>
          <p className="text-sm text-gray-500">Pending</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by booking ID, customer, park..."
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
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <select
              value={filterPayment}
              onChange={(e) => setFilterPayment(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:border-blue-500 focus:outline-none"
            >
              <option value="all">All Payments</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
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
                Date Range
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  placeholder="From"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
                <input
                  type="date"
                  placeholder="To"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">
                Amount Range
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">
                Payment Method
              </label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                <option>All Methods</option>
                <option>Credit Card</option>
                <option>Debit Card</option>
                <option>UPI</option>
                <option>PayPal</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <Table
          columns={columns}
          data={sortedBookings}
          loading={loading}
          pagination={{
            total: sortedBookings.length,
            current: 1,
            pageSize: 10,
            onPageChange: (page) => console.log("Page", page),
          }}
          emptyMessage="No bookings found"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <FaInfoCircle className="text-blue-600 text-lg mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-blue-900 mb-1">
              Quick Actions
            </h3>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1.5 bg-white text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-100 transition-all border border-blue-200">
                Send Reminders to Pending
              </button>
              <button className="px-3 py-1.5 bg-white text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-100 transition-all border border-blue-200">
                Export Today's Bookings
              </button>
              <button className="px-3 py-1.5 bg-white text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-100 transition-all border border-blue-200">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingList;
