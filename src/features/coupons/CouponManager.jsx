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
        <span className="font-black text-gray-900 bg-gray-100 px-3 py-1 rounded-lg border border-gray-200 uppercase tracking-tight">
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
    <div className="space-y-8">
      <PageHeader 
        title="Promotions" 
        subtitle="Campaign management and discount code distribution."
        action={
          <Button onClick={() => setShowForm(!showForm)} variant={showForm ? 'secondary' : 'primary'}>
            {showForm ? <FaTimes className="mr-2" /> : <FaPlus className="mr-2" />}
            {showForm ? 'Cancel' : 'New Coupon'}
          </Button>
        }
      />

      {showForm && (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 animate-in fade-in duration-500">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Input 
                label="Promo Code"
                name="couponCode"
                value={formData.couponCode}
                onChange={handleFormChange}
                placeholder="SAVE50"
                icon={FaTicketAlt}
                required
              />
              <Select 
                label="Discount Type"
                name="discountType"
                value={formData.discountType}
                onChange={handleFormChange}
                options={[
                  { label: 'Percentage (%)', value: 'percentage' },
                  { label: 'Fixed Amount (₹)', value: 'fixed' }
                ]}
              />
              <Input 
                label="Value"
                name="discountValue"
                type="number"
                value={formData.discountValue}
                onChange={handleFormChange}
                placeholder="20"
                icon={formData.discountType === 'percentage' ? FaPercent : FaMoneyBillWave}
                required
              />
              <Input 
                label="Expiry Date"
                name="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={handleFormChange}
                required
              />
              <Input 
                label="Min. Amount (₹)"
                name="minimumAmount"
                type="number"
                value={formData.minimumAmount}
                onChange={handleFormChange}
                placeholder="Optional"
              />
              <Select 
                label="Applicable Destination"
                name="applicablePark"
                value={formData.applicablePark}
                onChange={handleFormChange}
                options={parkOptions}
              />
            </div>
            <div className="flex justify-end pt-4 border-t border-gray-50">
              <Button type="submit" loading={formLoading} className="px-12">Save Campaign Code</Button>
            </div>
          </form>
        </div>
      )}

      <Table 
        columns={columns} 
        data={coupons} 
        loading={couponsLoading}
      />
    </div>
  );
};

export default CouponManager;
