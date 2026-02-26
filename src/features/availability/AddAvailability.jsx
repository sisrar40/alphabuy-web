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
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-2">
        <button onClick={() => navigate('/admin/dashboard')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
          <FaArrowLeft />
        </button>
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Back to Dashboard</p>
      </div>

      <PageHeader 
        title="Inventory Management" 
        subtitle="Schedule available dates and ticket quantities for your destination parks."
      />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-4xl relative overflow-hidden">
        {success && (
          <div className="absolute top-0 left-0 right-0 bg-green-50 px-6 py-3 border-b border-green-100 text-green-700 flex items-center gap-2 animate-in slide-in-from-top duration-300">
            <FaCheckCircle />
            <span className="text-sm font-bold tracking-tight">Inventory successfully updated for the selected date.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8 pt-4">
          <Select 
            label="Target Park Location"
            name="parkId"
            value={formData.parkId}
            onChange={handleChange}
            options={parkOptions}
            disabled={parksLoading}
            required
            containerClassName="max-w-md"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Input 
              label="Operating Date" 
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              icon={FaCalendarAlt}
              required
            />
            <Input 
              label="Available Ticket Slots" 
              name="availableSlots"
              type="number"
              placeholder="e.g. 1000"
              value={formData.availableSlots}
              onChange={handleChange}
              icon={FaTicketAlt}
              required
            />
          </div>

          <div className="flex justify-end pt-4 gap-4 border-t border-gray-50">
            <Button variant="secondary" onClick={() => navigate('/admin/dashboard')}>
              Discard
            </Button>
            <Button type="submit" loading={loading} className="px-10">
              Update Inventory
            </Button>
          </div>
        </form>
      </div>

      <div className="bg-blue-50/50 rounded-2xl border border-blue-100 p-6 flex items-start gap-4">
        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
          <FaCalendarAlt />
        </div>
        <div>
          <h4 className="text-sm font-bold text-blue-900">Pro Tip: Multi-date Selection</h4>
          <p className="text-xs text-blue-700/70 mt-1">In a future update, you'll be able to select date ranges to bulk update inventory across entire months.</p>
        </div>
      </div>
    </div>
  );
};

export default AddAvailability;
