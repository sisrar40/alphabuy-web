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
    <div className="flex h-screen bg-[#f8f9fa] overflow-hidden font-sans">
      {/* Sidebar - Premium Minimalist Profile */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-80' : 'w-28'
        } bg-white border-r border-gray-100 transition-all duration-700 ease-in-out flex flex-col z-50 relative`}
      >
        <div className="h-28 flex items-center justify-center px-8 border-b border-gray-50/50 overflow-hidden bg-white/50 backdrop-blur-sm">
           <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 bg-premium-gradient rounded-[20px] flex items-center justify-center text-white text-2xl font-bold shadow-xl shadow-aqua-500/30 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                A
              </div>
              {isSidebarOpen && (
                <div className="flex flex-col animate-in fade-in slide-in-from-left-4 duration-700">
                  <span className="font-bold text-gray-900 tracking-tight text-2xl leading-none">ALPHABUY</span>
                  <p className="font-bold text-[9px] text-aqua-500 uppercase tracking-widest mt-1.5 opacity-80">Console Layer</p>
                </div>
              )}
           </div>
        </div>

        <div className="flex-1 overflow-y-auto py-10 custom-scrollbar">
          {menuGroups.map((group, idx) => (
            <div key={idx} className="mb-10">
              {isSidebarOpen && (
                <p className="px-10 mb-6 text-[9px] font-bold text-gray-400 uppercase tracking-widest opacity-80">
                  {group.label}
                </p>
              )}
              <div className="px-4 space-y-2.5">
                {group.items.map((item) => {
                  const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`
                        flex items-center px-6 py-4 rounded-[24px] transition-all duration-500 font-bold text-[11px] uppercase tracking-widest relative group
                        ${isActive 
                          ? 'bg-white shadow-premium text-gray-900 border border-gray-50' 
                          : 'text-gray-400 hover:bg-gray-50/50 hover:text-aqua-600'}
                      `}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-premium-gradient rounded-r-full shadow-lg shadow-aqua-500/50"></div>
                      )}
                      
                      <div className={`text-2xl transition-all duration-500 ${isActive ? 'text-aqua-500 scale-110' : 'text-gray-400 group-hover:text-aqua-400 group-hover:scale-110'} ${isSidebarOpen ? 'mr-5' : 'mx-auto'}`}>
                        {item.icon}
                      </div>
                      
                      {isSidebarOpen && (
                        <span className={`transition-all duration-500 ${isActive ? 'translate-x-1' : 'group-hover:translate-x-1'}`}>
                          {item.name}
                        </span>
                      )}
                      
                      {!isSidebarOpen && isActive && (
                         <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-aqua-500 rounded-full shadow-lg"></div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="p-8 border-t border-gray-50/50 bg-white/50 backdrop-blur-sm">
          <button 
            onClick={handleLogout}
            className={`
              flex items-center w-full px-6 py-4 rounded-[24px] text-gray-400 font-bold text-[11px] uppercase tracking-widest hover:bg-red-50 hover:text-red-500 transition-all duration-500 group
              ${!isSidebarOpen && 'justify-center'}
            `}
          >
            <div className={`text-2xl transition-all duration-500 group-hover:rotate-12 ${isSidebarOpen ? 'mr-5' : ''}`}>
              <FaSignOutAlt />
            </div>
            {isSidebarOpen && <span>Secure Exit</span>}
          </button>
        </div>
      </aside>

      {/* Main Execution Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top Intelligence Bar */}
        <header className="h-28 bg-white/60 backdrop-blur-xl border-b border-gray-100 flex items-center justify-between px-12 z-40">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-12 h-12 rounded-[18px] text-gray-400 bg-white border border-gray-50 flex items-center justify-center hover:text-aqua-600 hover:shadow-premium transition-all duration-500 shadow-soft active:scale-95 translate-y-[-2px]"
            >
              <FaBars className="text-xl" />
            </button>
            <div className="h-10 w-[1px] bg-gray-100 hidden md:block"></div>
            <div className="hidden md:flex flex-col">
               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1.5">Operational Node</span>
               <h2 className="font-bold text-2xl text-gray-900 tracking-tight font-display leading-none">
                 {location.pathname.split('/').pop().toUpperCase()}
               </h2>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              <button className="w-12 h-12 relative rounded-[18px] bg-white border border-gray-50 flex items-center justify-center text-gray-400 hover:text-aqua-600 hover:shadow-premium transition-all duration-500 shadow-soft group">
                <FaBell className="text-xl group-hover:animate-swing" />
                <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-aqua-500 rounded-full border-2 border-white shadow-sm animate-pulse"></span>
              </button>
            </div>
            
            <div className="h-10 w-[1px] bg-gray-100 hidden sm:block"></div>
            
            <div className="hidden sm:flex items-center gap-5 group cursor-pointer">
              <div className="text-right flex flex-col items-end">
                <p className="text-sm font-bold text-gray-900 leading-none mb-1.5 tracking-tight group-hover:text-aqua-600 transition-colors">Commander Alpha</p>
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                   <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider leading-none">System Root</p>
                </div>
              </div>
              <div className="w-14 h-14 rounded-[24px] bg-white border border-gray-100 p-1 flex items-center justify-center text-gray-400 overflow-hidden shadow-soft transition-all duration-500 group-hover:shadow-premium group-hover:border-aqua-100">
                <div className="w-full h-full rounded-[20px] bg-gray-50 flex items-center justify-center text-gray-400">
                   <FaUserCircle className="text-5xl text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Intelligence Content Container */}
        <main className="flex-1 overflow-y-auto p-12 bg-[#f8f9fa] relative">
          {/* Subtle Page Background Gradient */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-aqua-100/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
          
          <div className="max-w-7xl mx-auto relative z-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
