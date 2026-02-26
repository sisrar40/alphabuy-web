import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchParks } from '../parks/parkSlice';
import { fetchAdminBookings } from '../bookings/bookingSlice';
import { fetchLeads } from '../leads/leadSlice';
import PageHeader from '../../components/ui/PageHeader';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import { FaMapMarkedAlt, FaBook, FaMoneyBillWave, FaHeadset } from 'react-icons/fa';

const Dashboard = () => {
  const dispatch = useDispatch();
  const parks = useSelector(state => state.parks.items);
  const bookings = useSelector(state => state.adminBookings.items);
  const leads = useSelector(state => state.leads.items);

  useEffect(() => {
    if (parks.length === 0) dispatch(fetchParks());
    if (bookings.length === 0) dispatch(fetchAdminBookings());
    if (leads.length === 0) dispatch(fetchLeads());
  }, [dispatch, parks.length, bookings.length, leads.length]);

  const totalRevenue = bookings.reduce((sum, b) => b.paymentStatus === 'Paid' ? sum + b.amount : sum, 0);

  const stats = [
    { title: 'Total Parks', value: parks.length.toString(), icon: <FaMapMarkedAlt />, color: 'blue' },
    { title: 'Total Bookings', value: bookings.length.toString(), icon: <FaBook />, color: 'purple' },
    { title: 'Total Revenue', value: `₹${(totalRevenue / 1000).toFixed(1)}K`, icon: <FaMoneyBillWave />, color: 'green' },
    { title: 'Current Leads', value: leads.length.toString(), icon: <FaHeadset />, color: 'orange' },
  ];

  const recentBookings = bookings.slice(0, 5);

  const bookingColumns = [
    { header: 'Booking ID', accessor: 'id' },
    { header: 'User', accessor: 'userName' },
    { header: 'Park', accessor: 'parkName' },
    { header: 'Amount', accessor: 'amount', render: (row) => `₹${row.amount}` },
    { 
      header: 'Status', 
      render: (row) => (
        <Badge variant={row.status === 'Confirmed' ? 'success' : row.status === 'Cancelled' ? 'danger' : 'warning'}>
          {row.status}
        </Badge>
      )
    }
  ];

  return (
    <div className="space-y-10">
      <PageHeader 
        title="Dashboard" 
        subtitle="Overview of your theme park empire and sales performance."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 transition-all hover:shadow-md hover:-translate-y-1 duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 text-xl border border-${stat.color}-100`}>
                {stat.icon}
              </div>
              <Badge variant="success" className="text-[10px]">+12%</Badge>
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.title}</p>
            <h3 className="text-2xl font-black text-gray-900">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">Recent Bookings</h3>
            <button className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">View All</button>
          </div>
          <Table columns={bookingColumns} data={recentBookings} loading={bookings.length === 0} />
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 p-8 flex flex-col items-center justify-center text-center shadow-sm h-full group">
           <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-2xl mb-4 border border-blue-100 group-hover:scale-110 transition-transform duration-500">
              <FaMoneyBillWave />
           </div>
           <h4 className="font-bold text-gray-900 mb-1">Revenue Analytics</h4>
           <p className="text-sm text-gray-500 max-w-[200px]">Real-time revenue charts will be integrated here.</p>
           <div className="mt-8 flex gap-2">
             <div className="h-2 w-16 bg-gray-100 rounded-full overflow-hidden">
               <div className="h-full bg-blue-500 w-3/4 rounded-full"></div>
             </div>
             <div className="h-2 w-16 bg-gray-100 rounded-full overflow-hidden">
               <div className="h-full bg-blue-500 w-1/2 rounded-full"></div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
