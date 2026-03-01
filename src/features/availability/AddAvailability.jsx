import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addAvailability } from './availabilitySlice';
import { fetchParks } from '../parks/parkSlice';
import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Badge from '../../components/ui/Badge';
import { FaCalendarAlt, FaTicketAlt, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';

const AddAvailability = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { items: parks, loading: parksLoading } = useSelector((state) => state.parks);
  
  const [formData, setFormData] = useState({
    parkId: '',
    date: '',
    availableSlots: '',
  });

  useEffect(() => {
    if (parks.length === 0) {
      dispatch(fetchParks());
    }
  }, [dispatch, parks.length]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.parkId) return alert('Please select a park first');
    setLoading(true);
    setSuccess(false);
    
    try {
      await dispatch(addAvailability(formData)).unwrap();
      setSuccess(true);
      setFormData(prev => ({ ...prev, date: '', availableSlots: '' }));
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to update inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  const parkOptions = [
    { label: 'Select a Park Location', value: '' },
    ...parks.map(p => ({ label: p.parkName, value: p.id }))
  ];

  return (
    <div className="space-y-10 pb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/admin/dashboard')} 
            className="w-12 h-12 rounded-2xl bg-white border border-gray-50 flex items-center justify-center text-gray-500 hover:text-aqua-600 hover:shadow-premium transition-all duration-500 shadow-soft active:scale-95"
          >
            <FaArrowLeft className="text-lg" />
          </button>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-2">Inventory Management</p>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight font-display leading-none">Schedule Capacity</h1>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-3 bg-white px-6 py-3 rounded-2xl border border-gray-50 shadow-soft">
           <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
           <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Inventory Grid Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8">
          <div className="premium-card p-10 md:p-14 border-none relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-aqua-50/50 rounded-full blur-[100px] -mr-32 -mt-32"></div>
            
            {success && (
              <div className="absolute top-0 left-0 right-0 bg-emerald-50 px-10 py-5 border-b border-emerald-100 text-emerald-600 flex items-center gap-3 animate-in slide-in-from-top duration-500 z-20">
                <FaCheckCircle className="text-lg" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Inventory manifest successfully synchronized.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className={`space-y-12 relative z-10 ${success ? 'pt-8' : ''} transition-all duration-500`}>
              {/* Node Selection */}
              <div className="space-y-8">
                <div className="flex items-center gap-4 mb-2">
                   <div className="w-1.5 h-6 bg-premium-gradient rounded-full"></div>
                   <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Operational node</h3>
                </div>
                
                <div className="space-y-2 max-w-md">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Target Asset Location</span>
                  <Select 
                    name="parkId"
                    value={formData.parkId}
                    onChange={handleChange}
                    options={parkOptions}
                    disabled={parksLoading}
                    className="!py-5 !px-6 !rounded-[24px] !bg-gray-50 border-gray-100 focus:border-aqua-500 focus:bg-white transition-all font-medium"
                    required
                  />
                </div>
              </div>

              {/* Temporal Allocation */}
              <div className="space-y-8">
                <div className="flex items-center gap-4 mb-2">
                   <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
                   <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Temporal Allocation</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Operational Date</span>
                    <Input 
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      icon={FaCalendarAlt}
                      className="!py-5 !px-6 !rounded-[24px] !bg-gray-50 border-gray-100 focus:border-aqua-500 focus:bg-white transition-all font-medium"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Asset Capacity (Slots)</span>
                    <Input 
                      name="availableSlots"
                      type="number"
                      placeholder="e.g. 1000"
                      value={formData.availableSlots}
                      onChange={handleChange}
                      icon={FaTicketAlt}
                      className="!py-5 !px-6 !rounded-[24px] !bg-gray-50 border-gray-100 focus:border-aqua-500 focus:bg-white transition-all font-medium text-gray-900"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Authority Interface */}
              <div className="flex items-center justify-end gap-6 pt-10 border-t border-gray-50">
                <button 
                  type="button"
                  onClick={() => navigate('/admin/dashboard')}
                  className="px-10 py-5 rounded-[24px] border border-gray-50 bg-white text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:text-gray-900 hover:border-gray-200 transition-all active:scale-95"
                >
                  Discard
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className={`px-12 py-5 rounded-[24px] font-bold text-[10px] uppercase tracking-wider transition-all duration-500 shadow-xl ${
                    loading 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-premium-gradient text-white shadow-aqua-500/30 hover:shadow-aqua-500/50 hover:scale-[1.02] active:scale-95'
                  }`}
                >
                  {loading ? 'Synchronizing...' : 'Authorize Allocation'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Intelligence Sidebar */}
        <div className="lg:col-span-4 space-y-8">
           <div className="premium-card p-10 border-none relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-[60px] -mr-16 -mt-16"></div>
              <h4 className="font-bold text-xl text-gray-900 mb-4 font-display relative z-10">Inventory Guard</h4>
              <p className="text-[11px] font-medium text-gray-500 leading-relaxed mb-8 relative z-10">Asset capacity should be determined based on infrastructure throughput limits and safety protocols. Once authorized, slots are broadcasted to the grid.</p>
              
              <div className="space-y-4 relative z-10">
                 <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-3">
                    <FaCalendarAlt className="text-blue-500" />
                    <span className="text-[9px] font-bold text-blue-700 uppercase tracking-widest leading-none">Real-time scheduling active</span>
                 </div>
              </div>
           </div>
           
           <div className="bg-gray-900 rounded-[40px] p-10 text-white relative overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-premium-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-700"></div>
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-aqua-400">
                    <FaCalendarAlt />
                 </div>
                 <h4 className="font-bold text-lg font-display leading-none">Roadmap Node</h4>
              </div>
              <p className="text-[11px] font-medium text-white/40 leading-relaxed mb-6">In future cycles, bulk temporal allocation across date ranges will be enabled via the range UI.</p>
              <div className="flex items-center gap-2">
                 <div className="w-full h-[2px] bg-white/5 rounded-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-aqua-500 w-1/3 rounded-full"></div>
                 </div>
                 <span className="text-[8px] font-bold uppercase tracking-widest text-white/20 whitespace-nowrap">v2.4 Pending</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AddAvailability;
