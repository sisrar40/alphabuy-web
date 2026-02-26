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
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-2">
        <button onClick={() => navigate('/admin/meals')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
          <FaArrowLeft />
        </button>
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Back to List</p>
      </div>

      <PageHeader 
        title="Add Meal Plan" 
        subtitle="Associate a new dining option with a specific theme park."
      />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Input 
              label="Meal Name" 
              name="mealName"
              placeholder="e.g. Deluxe Veggie Combo"
              value={formData.mealName}
              onChange={handleChange}
              icon={FaUtensils}
              required
            />
            <Select 
              label="Associated Park"
              name="parkId"
              value={formData.parkId}
              onChange={handleChange}
              options={parkOptions}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-gray-700 ml-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none transition-all font-medium text-gray-900"
              placeholder="Describe what's included in the meal..."
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Input 
              label="Meal Price (₹)" 
              name="price"
              type="number"
              placeholder="0.00"
              value={formData.price}
              onChange={handleChange}
              icon={FaTag}
              required
            />
          </div>

          <div className="flex justify-end pt-4 gap-4 border-t border-gray-50">
            <Button variant="secondary" onClick={() => navigate('/admin/meals')}>
              Cancel
            </Button>
            <Button type="submit" loading={loading} className="px-10">
              Save Meal Plan
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMeal;
