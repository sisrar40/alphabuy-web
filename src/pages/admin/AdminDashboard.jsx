import React from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { FaUsers, FaTicketAlt, FaMoneyBillWave, FaMapMarkedAlt } from "react-icons/fa";

const AdminDashboard = () => {
  const stats = [
    { title: "Total Bookings", value: "1,248", icon: <FaTicketAlt className="text-blue-500" />, trend: "+12%" },
    { title: "Revenue", value: "₹4.2L", icon: <FaMoneyBillWave className="text-green-500" />, trend: "+8%" },
    { title: "Active Parks", value: "6", icon: <FaMapMarkedAlt className="text-purple-500" />, trend: "0%" },
    { title: "Total Users", value: "8,495", icon: <FaUsers className="text-orange-500" />, trend: "+24%" },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-gray-500 font-medium mt-1">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">{stat.title}</p>
              <div className="flex items-baseline space-x-2">
                <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                <span className="text-sm font-bold text-green-500">{stat.trend}</span>
              </div>
            </div>
            <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center text-2xl border border-gray-100">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder Chart Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 h-96 flex flex-col items-center justify-center">
         <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-4">
            <FaMoneyBillWave className="text-3xl text-blue-300" />
         </div>
         <h3 className="text-xl font-bold text-gray-700">Revenue Analytics</h3>
         <p className="text-gray-400 font-medium">Chart integration placeholder (e.g., Recharts)</p>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
