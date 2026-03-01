import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addMeal } from './mealSlice';
import { fetchParks } from '../parks/parkSlice';
import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { FaUtensils, FaTag, FaArrowLeft } from 'react-icons/fa';

const AddMeal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { items: parks } = useSelector((state) => state.parks);
  
  const [formData, setFormData] = useState({
    mealName: '',
    parkId: '',
    description: '',
    price: '',
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
    try {
      await dispatch(addMeal(formData)).unwrap();
      navigate('/admin/meals');
    } catch (error) {
      console.error('Failed to save meal:', error);
    } finally {
      setLoading(false);
    }
  };

  const parkOptions = [
    { label: 'Select a Park', value: '' },
    ...parks.map(p => ({ label: p.parkName, value: p.id }))
  ];

  return (
    <div className="space-y-10 pb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/admin/meals')} 
            className="w-12 h-12 rounded-2xl bg-white border border-gray-50 flex items-center justify-center text-gray-400 hover:text-aqua-600 hover:shadow-premium transition-all duration-500 shadow-soft active:scale-95"
          >
            <FaArrowLeft className="text-lg" />
          </button>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-2">Culinary Registry</p>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight font-display leading-none">Provision Asset</h1>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-3 bg-white px-6 py-3 rounded-2xl border border-gray-50 shadow-soft">
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
           <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Kitchen Link Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8">
          <div className="premium-card p-10 md:p-14 border-none relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-aqua-50/50 rounded-full blur-[100px] -mr-32 -mt-32"></div>
            
            <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
              {/* Specification Section */}
              <div className="space-y-8">
                <div className="flex items-center gap-4 mb-2">
                   <div className="w-1.5 h-6 bg-premium-gradient rounded-full"></div>
                   <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Culinary Specification</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Meal Designation</span>
                    <Input 
                      name="mealName"
                      placeholder="e.g. Deluxe Veggie Combo"
                      value={formData.mealName}
                      onChange={handleChange}
                      icon={FaUtensils}
                      className="!py-5 !px-6 !rounded-[24px] !bg-gray-50 border-gray-100 focus:border-aqua-500 focus:bg-white transition-all font-medium"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Deployment Node</span>
                    <Select 
                      name="parkId"
                      value={formData.parkId}
                      onChange={handleChange}
                      options={parkOptions}
                      className="!py-5 !px-6 !rounded-[24px] !bg-gray-50 border-gray-100 focus:border-aqua-500 focus:bg-white transition-all font-medium"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Composition Section */}
              <div className="space-y-8">
                <div className="flex items-center gap-4 mb-2">
                   <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
                   <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Plan Composition</h3>
                </div>
                
                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Nutritional Breakdown</span>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="6"
                    className="w-full px-8 py-6 bg-gray-50 border border-gray-100 rounded-[32px] focus:ring-4 focus:ring-aqua-500/5 focus:border-aqua-500 focus:bg-white outline-none transition-all duration-500 font-medium text-gray-900 leading-relaxed placeholder:text-gray-400 shadow-soft"
                    placeholder="Provide a comprehensive breakdown of the meal inclusions, dietary parameters, and serving metrics..."
                  ></textarea>
                </div>
              </div>

              {/* Fiscal Section */}
              <div className="space-y-8">
                <div className="flex items-center gap-4 mb-2">
                   <div className="w-1.5 h-6 bg-amber-500 rounded-full"></div>
                   <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Fiscal Parameters</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Surcharge Quotient (₹)</span>
                    <Input 
                      name="price"
                      type="number"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={handleChange}
                      icon={FaTag}
                      className="!py-5 !px-6 !rounded-[24px] !bg-gray-50 border-gray-100 focus:border-aqua-500 focus:bg-white transition-all font-medium"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Authority Area */}
              <div className="flex items-center justify-end gap-6 pt-10 border-t border-gray-50">
                <button 
                  type="button"
                  onClick={() => navigate('/admin/meals')}
                  className="px-10 py-5 rounded-[24px] border border-gray-50 bg-white text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-gray-900 hover:border-gray-200 transition-all active:scale-95"
                >
                  Retract
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
                  {loading ? 'Validating...' : 'Authorize Provision'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Intelligence Sidebar */}
        <div className="lg:col-span-4 space-y-8">
           <div className="premium-card p-10 border-none relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-[60px] -mr-16 -mt-16"></div>
              <h4 className="font-bold text-xl text-gray-900 mb-4 font-display relative z-10">Standard Protocol</h4>
              <p className="text-[11px] font-medium text-gray-400 leading-relaxed mb-8 relative z-10">All dining assets must be linked to a physical park node. Financial surcharges should be inclusive of ecosystem taxes.</p>
              
              <div className="space-y-4 relative z-10">
                 <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Status Check</p>
                    <p className="text-[10px] font-bold text-emerald-800">Parks database is fully synchronized.</p>
                 </div>
              </div>
           </div>
           
           <div className="bg-gray-900 rounded-[40px] p-10 text-white relative overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-premium-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-700"></div>
              <h4 className="font-bold text-xl mb-4 font-display">Logistics Notice</h4>
              <p className="text-[11px] font-medium text-white font-bold leading-relaxed">Changes to culinary assets are broadcasted instantly to the global consumer frontend.</p>
              <div className="mt-8 flex justify-end">
                 <span className="text-[8px] font-bold uppercase tracking-wider text-white/30 italic">Priority Alpha Transmit</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AddMeal;
