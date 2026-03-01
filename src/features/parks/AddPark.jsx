import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addPark } from './parkSlice';
import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { FaMapMarkerAlt, FaTag, FaFileImage, FaArrowLeft } from 'react-icons/fa';

const AddPark = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    parkName: '',
    location: '',
    description: '',
    price: '',
    image: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(addPark(formData)).unwrap();
      navigate('/admin/parks');
    } catch (error) {
      console.error('Failed to save park:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 pb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/admin/parks')} 
            className="w-12 h-12 rounded-2xl bg-white border border-gray-50 flex items-center justify-center text-gray-400 hover:text-aqua-600 hover:shadow-premium transition-all duration-500 shadow-soft active:scale-95"
          >
            <FaArrowLeft className="text-lg" />
          </button>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-2">Park Registry</p>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight font-display leading-none">Initialize Asset</h1>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-3 bg-white px-6 py-3 rounded-2xl border border-gray-50 shadow-soft">
           <div className="w-2 h-2 rounded-full bg-aqua-500 animate-pulse"></div>
           <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Awaiting Manifest Data</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8">
          <div className="premium-card p-10 md:p-14 border-none relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-aqua-50/50 rounded-full blur-[100px] -mr-32 -mt-32"></div>
            
            <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
              {/* Identity Section */}
              <div className="space-y-8">
                <div className="flex items-center gap-4 mb-2">
                   <div className="w-1.5 h-6 bg-premium-gradient rounded-full"></div>
                   <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Core Identity</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Asset Designation</span>
                    <Input 
                      name="parkName"
                      placeholder="e.g. Wonderland City"
                      value={formData.parkName}
                      onChange={handleChange}
                      icon={FaTag}
                      className="!py-5 !px-6 !rounded-[24px] !bg-gray-50 border-gray-100 focus:border-aqua-500 focus:bg-white transition-all font-medium"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Geographic Coordinates</span>
                    <Input 
                      name="location"
                      placeholder="e.g. Mumbai, India"
                      value={formData.location}
                      onChange={handleChange}
                      icon={FaMapMarkerAlt}
                      className="!py-5 !px-6 !rounded-[24px] !bg-gray-50 border-gray-100 focus:border-aqua-500 focus:bg-white transition-all font-medium"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Narrative Section */}
              <div className="space-y-8">
                <div className="flex items-center gap-4 mb-2">
                   <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
                   <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Operational Narrative</h3>
                </div>
                
                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Detailed Description</span>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="6"
                    className="w-full px-8 py-6 bg-gray-50 border border-gray-100 rounded-[32px] focus:ring-4 focus:ring-aqua-500/5 focus:border-aqua-500 focus:bg-white outline-none transition-all duration-500 font-medium text-gray-900 leading-relaxed placeholder:text-gray-400 shadow-soft"
                    placeholder="Provide a comprehensive breakdown of the park's primary attractions, infrastructure, and unique identifiers..."
                  ></textarea>
                </div>
              </div>

              {/* Financials & Media */}
              <div className="space-y-8">
                <div className="flex items-center gap-4 mb-2">
                   <div className="w-1.5 h-6 bg-amber-500 rounded-full"></div>
                   <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Financials & Visualization</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Base Price Quotient (₹)</span>
                    <Input 
                      name="price"
                      type="number"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={handleChange}
                      icon={() => <span className="font-bold text-aqua-600">₹</span>}
                      className="!py-5 !px-6 !rounded-[24px] !bg-gray-50 border-gray-100 focus:border-aqua-500 focus:bg-white transition-all font-medium"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Asset Imagery URI</span>
                    <Input 
                      name="image"
                      placeholder="https://cloud.storage/asset.jpg"
                      value={formData.image}
                      onChange={handleChange}
                      icon={FaFileImage}
                      className="!py-5 !px-6 !rounded-[24px] !bg-gray-50 border-gray-100 focus:border-aqua-500 focus:bg-white transition-all font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Submission Area */}
              <div className="flex items-center justify-end gap-6 pt-10 border-t border-gray-50">
                <button 
                  type="button"
                  onClick={() => navigate('/admin/parks')}
                  className="px-10 py-5 rounded-[24px] border border-gray-50 bg-white text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:text-gray-900 hover:border-gray-200 transition-all active:scale-95"
                >
                  Terminate
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className={`px-12 py-5 rounded-[24px] font-bold text-[10px] uppercase tracking-widest transition-all duration-500 shadow-xl ${
                    loading 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-premium-gradient text-white shadow-aqua-500/30 hover:shadow-aqua-500/50 hover:scale-[1.02] active:scale-95'
                  }`}
                >
                  {loading ? 'Processing...' : 'Deploy Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-8">
           <div className="premium-card p-10 border-none relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-[60px] -mr-16 -mt-16"></div>
              <h4 className="font-bold text-xl text-gray-900 mb-4 font-display relative z-10">Data Integrity</h4>
              <p className="text-[11px] font-medium text-gray-400 leading-relaxed mb-8 relative z-10">Ensure all geographic coordinates and financial parameters are accurate before deployment. All listings undergo real-time synchronization with the global grid.</p>
              
              <ul className="space-y-4 relative z-10">
                 {[
                   { label: 'High-Res Preview Sync', active: true },
                   { label: 'Financial Guardrails', active: true },
                   { label: 'Public Indexing', active: false }
                 ].map((item, i) => (
                   <li key={i} className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full ${item.active ? 'bg-aqua-500' : 'bg-gray-200'}`}></div>
                      <span className={`text-[9px] font-bold uppercase tracking-widest ${item.active ? 'text-gray-700' : 'text-gray-400'}`}>{item.label}</span>
                   </li>
                 ))}
              </ul>
           </div>
           
           <div className="bg-gray-900 rounded-[40px] p-10 text-white relative overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-premium-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-700"></div>
              <h4 className="font-bold text-xl mb-4 font-display">System Notice</h4>
              <p className="text-[11px] font-medium text-white font-bold leading-relaxed">Listing deployment typically propagates within 2.4 seconds across all consumer endpoints.</p>
              <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-between">
                 <div className="flex gap-2 text-aqua-400">
                    <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-current animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-current animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                 </div>
                 <span className="text-[8px] font-bold uppercase tracking-widest text-white/30">Network Optimized</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AddPark;
