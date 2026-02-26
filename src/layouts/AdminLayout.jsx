import React, { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaMapMarkedAlt, 
  FaUtensils, 
  FaCalendarAlt, 
  FaTicketAlt, 
  FaBook, 
  FaHeadset, 
  FaSignOutAlt, 
  FaBars, 
  FaUserCircle,
  FaBell
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin/login');
  };

  const menuGroups = [
    {
      label: 'Main Control',
      items: [
        { name: 'Analytics', path: '/admin/dashboard', icon: <FaTachometerAlt /> },
        { name: 'Water Parks', path: '/admin/parks', icon: <FaMapMarkedAlt /> },
        { name: 'Meal Plans', path: '/admin/meals', icon: <FaUtensils /> },
        { name: 'Inventory', path: '/admin/dates', icon: <FaCalendarAlt /> },
      ]
    },
    {
      label: 'Customer Relations',
      items: [
        { name: 'Promotions', path: '/admin/coupons', icon: <FaTicketAlt /> },
        { name: 'Bookings', path: '/admin/bookings', icon: <FaBook /> },
        { name: 'User Leads', path: '/admin/leads', icon: <FaHeadset /> },
      ]
    }
  ];

  return (
    <div className="flex h-screen bg-primary overflow-hidden font-sans">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-72' : 'w-24'
        } bg-white border-r border-gray-100 transition-standard flex flex-col z-50`}
      >
        <div className="h-24 flex items-center justify-center px-6 border-b border-gray-50 overflow-hidden">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-aqua-gradient rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-aqua-500/20">
                A
              </div>
              {isSidebarOpen && (
                <div className="flex flex-col">
                  <span className="font-black text-gray-900 tracking-tighter text-lg leading-none">ALPHABUY</span>
                  <span className="font-bold text-[10px] text-aqua-600 uppercase tracking-[0.2em]">Management</span>
                </div>
              )}
           </div>
        </div>

        <div className="flex-1 overflow-y-auto py-8">
          {menuGroups.map((group, idx) => (
            <div key={idx} className="mb-8">
              {isSidebarOpen && (
                <p className="px-8 mb-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.25em]">
                  {group.label}
                </p>
              )}
              <div className="px-4 space-y-2">
                {group.items.map((item) => {
                  const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`
                        flex items-center px-4 py-3.5 rounded-2xl transition-standard font-bold text-sm
                        ${isActive 
                          ? 'bg-aqua-gradient text-white shadow-premium' 
                          : 'text-gray-500 hover:bg-aqua-50/50 hover:text-aqua-600'}
                      `}
                    >
                      <div className={`text-xl ${isActive ? 'text-white' : 'text-gray-400'} ${isSidebarOpen ? 'mr-4' : 'mx-auto'}`}>
                        {item.icon}
                      </div>
                      {isSidebarOpen && <span>{item.name}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-gray-50">
          <button 
            onClick={handleLogout}
            className={`
              flex items-center w-full px-4 py-3.5 rounded-2xl text-gray-400 font-bold text-sm hover:bg-red-50 hover:text-red-500 transition-standard
              ${!isSidebarOpen && 'justify-center'}
            `}
          >
            <FaSignOutAlt className={`text-xl ${isSidebarOpen ? 'mr-4' : ''}`} />
            {isSidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Topbar */}
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-gray-50 flex items-center justify-between px-10 z-40">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-3 rounded-xl text-gray-400 hover:text-aqua-600 hover:bg-aqua-50 transition-standard shadow-soft"
            >
              <FaBars />
            </button>
            <div className="h-8 w-[1px] bg-gray-100 hidden sm:block"></div>
            <h2 className="font-black text-xl text-gray-800 tracking-tight font-display">
              {location.pathname.split('/').pop().toUpperCase()}
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <button className="p-3 relative rounded-xl text-gray-400 hover:text-aqua-600 hover:bg-aqua-50 transition-standard shadow-soft">
              <FaBell />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="hidden sm:flex items-center gap-4 pl-4 border-l border-gray-100">
              <div className="text-right">
                <p className="text-sm font-black text-gray-900 leading-none mb-1">Commander Alpha</p>
                <p className="text-[10px] font-black text-aqua-500 uppercase tracking-widest leading-none">Chief Executive</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-300 overflow-hidden shadow-soft">
                <FaUserCircle className="text-4xl" />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-10 bg-primary/50">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
