import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoupons, addCoupon, deleteCoupon, toggleCoupon } from './couponSlice';
import { fetchParks } from '../parks/parkSlice';
import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Badge from '../../components/ui/Badge';
import { FaPlus, FaTrash, FaTicketAlt, FaPercent, FaMoneyBillWave, FaTimes } from 'react-icons/fa';

const CouponManager = () => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const { items: coupons, loading: couponsLoading } = useSelector((state) => state.coupons);
  const { items: parks } = useSelector((state) => state.parks);

  const [formData, setFormData] = useState({
    couponCode: '',
    discountType: 'percentage',
    discountValue: '',
    expiryDate: '',
    minimumAmount: '',
    applicablePark: 'ALL'
  });

  useEffect(() => {
    dispatch(fetchCoupons());
    if (parks.length === 0) dispatch(fetchParks());
  }, [dispatch, parks.length]);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      await dispatch(addCoupon(formData)).unwrap();
      setShowForm(false);
      setFormData({ couponCode: '', discountType: 'percentage', discountValue: '', expiryDate: '', minimumAmount: '', applicablePark: 'ALL' });
    } catch (error) {
      console.error('Failed to save coupon:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const columns = [
    {
      header: 'Coupon Code',
      accessor: 'couponCode',
      render: (row) => (
        <span className="font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-lg border border-gray-200 uppercase tracking-tight">
          {row.couponCode}
        </span>
      )
    },
    {
      header: 'Discount',
      render: (row) => (
        <span className="font-bold text-gray-700">
          {row.discountType === 'fixed' ? '₹' : ''}{row.discountValue}{row.discountType === 'percentage' ? '%' : ''} Off
        </span>
      )
    },
    {
      header: 'Expiry',
      render: (row) => <span className="text-gray-500 font-medium">{new Date(row.expiryDate).toLocaleDateString()}</span>
    },
    {
      header: 'Status',
      render: (row) => (
        <button onClick={() => dispatch(toggleCoupon({ id: row.id, status: row.active }))}>
          <Badge variant={row.active ? 'success' : 'neutral'}>
            {row.active ? 'Active' : 'Paused'}
          </Badge>
        </button>
      )
    },
    {
      header: 'Actions',
      className: 'text-right',
      tdClassName: 'text-right',
      render: (row) => (
        <Button variant="ghost" size="sm" onClick={() => dispatch(deleteCoupon(row.id))}>
          <FaTrash className="text-red-400" />
        </Button>
      )
    }
  ];

  const parkOptions = [
    { label: 'All Parks', value: 'ALL' },
    ...parks.map(p => ({ label: p.parkName, value: p.id }))
  ];

  return (
    <div className="space-y-12 pb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <PageHeader 
        title="Promotional Infrastructure" 
        subtitle="Strategic campaign management and incentive distribution framework."
        action={
          <button 
            onClick={() => setShowForm(!showForm)}
            className={`px-8 py-4 rounded-[24px] font-bold text-[11px] uppercase tracking-wider transition-all duration-500 shadow-xl flex items-center gap-3 active:scale-95 ${
              showForm 
                ? 'bg-white border border-gray-100 text-gray-500 hover:text-gray-900' 
                : 'bg-premium-gradient text-white shadow-aqua-500/30 hover:shadow-aqua-500/50 hover:scale-[1.02]'
            }`}
          >
            {showForm ? <FaTimes className="text-sm" /> : <FaPlus className="text-sm" />}
            {showForm ? 'Terminate' : 'Initialize Campaign'}
          </button>
        }
      />

      {showForm && (
        <div className="premium-card p-10 md:p-14 border-none relative overflow-hidden mb-12 animate-in fade-in slide-in-from-top-10 duration-700">
          <div className="absolute top-0 right-0 w-64 h-64 bg-aqua-50/50 rounded-full blur-[100px] -mr-32 -mt-32"></div>
          
          <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
            {/* Identity & Logic Section */}
            <div className="space-y-8">
              <div className="flex items-center gap-4 mb-2">
                 <div className="w-1.5 h-6 bg-premium-gradient rounded-full"></div>
                 <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Campaign logic</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Promo Identifier</span>
                  <Input 
                    name="couponCode"
                    value={formData.couponCode}
                    onChange={handleFormChange}
                    placeholder="SAVE50"
                    icon={FaTicketAlt}
                    className="!py-5 !px-6 !rounded-[24px] !bg-gray-50 border-gray-100 focus:border-aqua-500 focus:bg-white transition-all font-medium uppercase"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Incentive Type</span>
                  <Select 
                    name="discountType"
                    value={formData.discountType}
                    onChange={handleFormChange}
                    options={[
                      { label: 'Percentage (%)', value: 'percentage' },
                      { label: 'Fixed Amount (₹)', value: 'fixed' }
                    ]}
                    className="!py-5 !px-6 !rounded-[24px] !bg-gray-50 border-gray-100 focus:border-aqua-500 focus:bg-white transition-all font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Incentive Magnitude</span>
                  <Input 
                    name="discountValue"
                    type="number"
                    value={formData.discountValue}
                    onChange={handleFormChange}
                    placeholder="20"
                    icon={formData.discountType === 'percentage' ? FaPercent : FaMoneyBillWave}
                    className="!py-5 !px-6 !rounded-[24px] !bg-gray-50 border-gray-100 focus:border-aqua-500 focus:bg-white transition-all font-medium"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Constraints & Scope */}
            <div className="space-y-8">
              <div className="flex items-center gap-4 mb-2">
                 <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
                 <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Temporal & Scope Constraints</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Temporal Expiry</span>
                  <Input 
                    name="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={handleFormChange}
                    className="!py-5 !px-6 !rounded-[24px] !bg-gray-50 border-gray-100 focus:border-aqua-500 focus:bg-white transition-all font-medium"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Minimum Threshold (₹)</span>
                  <Input 
                    name="minimumAmount"
                    type="number"
                    value={formData.minimumAmount}
                    onChange={handleFormChange}
                    placeholder="Optional"
                    icon={() => <span className="font-bold text-gray-400">₹</span>}
                    className="!py-5 !px-6 !rounded-[24px] !bg-gray-50 border-gray-100 focus:border-aqua-500 focus:bg-white transition-all font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Destination Node Scope</span>
                  <Select 
                    name="applicablePark"
                    value={formData.applicablePark}
                    onChange={handleFormChange}
                    options={parkOptions}
                    className="!py-5 !px-6 !rounded-[24px] !bg-gray-50 border-gray-100 focus:border-aqua-500 focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-10 border-t border-gray-50">
              <button 
                type="submit" 
                disabled={formLoading}
                className={`px-12 py-5 rounded-[24px] font-bold text-[11px] uppercase tracking-wider transition-all duration-500 shadow-xl ${
                  formLoading 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-premium-gradient text-white shadow-aqua-500/30 hover:shadow-aqua-500/50 hover:scale-[1.02] active:scale-95'
                }`}
              >
                {formLoading ? 'Synchronizing...' : 'Authorize Campaign'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="premium-card p-2 border-none overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-aqua-100/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
        <Table 
          columns={columns} 
          data={coupons} 
          loading={couponsLoading}
        />
      </div>
    </div>
  );
};

export default CouponManager;
