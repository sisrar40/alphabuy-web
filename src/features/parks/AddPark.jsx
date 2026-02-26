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
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-2">
        <button onClick={() => navigate('/admin/parks')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
          <FaArrowLeft />
        </button>
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Back to List</p>
      </div>

      <PageHeader 
        title="Create New Park" 
        subtitle="Add a new destination to the booking system."
      />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Input 
              label="Park Name" 
              name="parkName"
              placeholder="e.g. Wonderland City"
              value={formData.parkName}
              onChange={handleChange}
              icon={FaTag}
              required
            />
            <Input 
              label="Location" 
              name="location"
              placeholder="e.g. Mumbai, India"
              value={formData.location}
              onChange={handleChange}
              icon={FaMapMarkerAlt}
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
              placeholder="Describe the park attractions..."
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Input 
              label="Price (₹)" 
              name="price"
              type="number"
              placeholder="0.00"
              value={formData.price}
              onChange={handleChange}
              icon={() => <span className="font-bold">₹</span>}
              required
            />
            <Input 
              label="Image URL" 
              name="image"
              placeholder="https://..."
              value={formData.image}
              onChange={handleChange}
              icon={FaFileImage}
            />
          </div>

          <div className="flex justify-end pt-4 gap-4 border-t border-gray-50">
            <Button variant="secondary" onClick={() => navigate('/admin/parks')}>
              Cancel
            </Button>
            <Button type="submit" loading={loading} className="px-10">
              Create Park Listing
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPark;
