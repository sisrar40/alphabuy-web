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
    <div className="space-y-12 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <PageHeader 
          title="Executive Overview" 
          subtitle="Real-time intelligence on your theme park infrastructure and financial throughput."
        />
        <div className="flex items-center gap-4 bg-white p-2 rounded-[24px] border border-gray-50 shadow-soft">
           <button className="px-6 py-3 rounded-2xl bg-gray-50 text-[10px] font-bold text-gray-900 uppercase tracking-wider hover:bg-white hover:text-aqua-600 transition-all">Last 24h</button>
           <button className="px-6 py-3 rounded-2xl bg-premium-gradient text-[10px] font-bold text-white uppercase tracking-widest shadow-lg shadow-aqua-500/20">Last 7 Days</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="premium-card p-8 border-none relative overflow-hidden group hover:-translate-y-2 transition-all duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-aqua-50/50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-aqua-100/60 transition-colors duration-700"></div>
            
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${
                stat.color === 'blue' ? 'bg-blue-50 text-blue-600 shadow-blue-500/10' :
                stat.color === 'purple' ? 'bg-purple-50 text-purple-600 shadow-purple-500/10' :
                stat.color === 'green' ? 'bg-emerald-50 text-emerald-600 shadow-emerald-500/10' :
                'bg-amber-50 text-amber-600 shadow-amber-500/10'
              }`}>
                {stat.icon}
              </div>
              <div className="bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-xl border border-emerald-100 flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                 <span className="text-[9px] font-bold uppercase tracking-wider">+12%</span>
              </div>
            </div>

            <div className="relative z-10">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 leading-none">{stat.title}</p>
              <h3 className="text-4xl font-bold text-gray-900 tracking-tight font-display leading-none">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="w-1.5 h-8 bg-premium-gradient rounded-full shadow-lg"></div>
               <h3 className="text-2xl font-bold text-gray-900 tracking-tight font-display">Recent Operations</h3>
            </div>
            <button className="px-6 py-3 rounded-2xl border border-gray-100 bg-white text-[10px] font-bold text-aqua-600 uppercase tracking-widest hover:shadow-premium transition-all active:scale-95">View Archive</button>
          </div>
          <div className="premium-card p-2 border-none overflow-hidden">
             <Table columns={bookingColumns} data={recentBookings} loading={bookings.length === 0} />
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="flex items-center gap-4">
             <div className="w-1.5 h-8 bg-amber-500 rounded-full shadow-lg"></div>
             <h3 className="text-2xl font-bold text-gray-900 tracking-tight font-display">Revenue Hub</h3>
          </div>
          
          <div className="premium-card p-10 border-none flex flex-col items-center justify-center text-center group min-h-[400px] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-[100px] -mr-32 -mt-32"></div>
            
            <div className="w-20 h-20 rounded-[28px] bg-white border border-gray-100 flex items-center justify-center text-aqua-600 text-3xl mb-8 shadow-soft group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 relative z-10">
               <FaMoneyBillWave />
            </div>
            
            <div className="relative z-10">
               <h4 className="font-bold text-xl text-gray-900 mb-2 font-display">Financial Trajectory</h4>
               <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-10 leading-relaxed">Predictive analytics and real-time revenue matrices are syncing.</p>
               
               <div className="space-y-6 w-full max-w-[240px] mx-auto">
                 <div className="space-y-2">
                    <div className="flex justify-between text-[9px] font-bold text-gray-900 uppercase tracking-wider">
                       <span>Target Allocation</span>
                       <span>84%</span>
                    </div>
                    <div className="h-2.5 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100/50 p-[2px]">
                       <div className="h-full bg-premium-gradient w-[84%] rounded-full shadow-lg shadow-aqua-500/20"></div>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <div className="flex justify-between text-[9px] font-bold text-gray-900 uppercase tracking-wider">
                       <span>Market Index</span>
                       <span>62%</span>
                    </div>
                    <div className="h-2.5 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100/50 p-[2px]">
                       <div className="h-full bg-blue-400 w-[62%] rounded-full shadow-lg shadow-blue-500/20"></div>
                    </div>
                 </div>
               </div>

               <button className="px-12 py-5 rounded-[24px] bg-gray-900 text-white text-[11px] font-bold uppercase tracking-wider shadow-2xl hover:bg-black transition-all active:scale-95">Open Analytics Console</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
