import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTicketTypes, deleteTicketType } from "./ticketSlice";
import PageHeader from "../../components/ui/PageHeader";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaSearch,
  FaTicketAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const TicketTypesList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading } = useSelector((state) => state.tickets);
  const { items: parks } = useSelector((state) => state.parks);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchTicketTypes());
  }, [dispatch]);

  const filteredItems = items.filter((item) =>
    (item.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.description || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getParkNames = (parkIds) => {
    if (!parkIds || parkIds.length === 0) return "Global";
    return parkIds
      .map((id) => {
        const park = parks.find((p) => String(p.id) === String(id));
        return park ? (park.parkName || park.name) : "Unknown Park";
      })
      .join(", ");
  };

  const columns = [
    {
      header: "Ticket Name",
      accessor: "name",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
            <FaTicketAlt />
          </div>
          <div>
            <p className="font-bold text-gray-900">{row.name}</p>
            <p className="text-xs text-gray-500 line-clamp-1">{row.description}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Associated Parks",
      render: (row) => (
        <div className="flex items-center gap-2 max-w-xs overflow-hidden">
          <FaMapMarkerAlt className="text-blue-500 shrink-0" />
          <span className="text-sm text-gray-600 truncate">
            {getParkNames(row.park_ids || row.parkIds)}
          </span>
        </div>
      ),
    },
    {
      header: "Price",
      render: (row) => (
        <div className="flex flex-col">
          <span className="font-bold text-gray-900">₹{row.price}</span>
          {row.original_price > row.price && (
            <span className="text-xs text-gray-400 line-through">₹{row.original_price}</span>
          )}
        </div>
      ),
    },
    {
      header: "Actions",
      className: "text-right",
      render: (row) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => navigate(`/admin/tickets/edit/${row.id}`)}
            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => {
              if (window.confirm("Delete this ticket type?")) {
                dispatch(deleteTicketType(row.id));
              }
            }}
            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-red-600 hover:text-white transition-all"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ticket Types</h1>
          <p className="text-sm text-gray-500 mt-1">Manage ticket variants and park associations</p>
        </div>
        <button
          onClick={() => navigate("/admin/tickets/add")}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg text-sm font-bold flex items-center gap-2 hover:shadow-lg transition-all"
        >
          <FaPlus /> Add Ticket Type
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search ticket types..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <Table
          columns={columns}
          data={filteredItems}
          loading={loading}
          emptyMessage="No ticket types found"
        />
      </div>
    </div>
  );
};

export default TicketTypesList;
