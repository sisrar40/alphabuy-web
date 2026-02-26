import api from './api';

const couponService = {
  getCoupons: async () => {
    // const response = await api.get('/coupons');
    // return response.data;
    
    return [
      { id: '1', couponCode: 'WELCOME20', discountType: 'percentage', discountValue: 20, expiryDate: '2025-12-31', active: true, applicablePark: 'ALL' },
      { id: '2', couponCode: 'FLAT500', discountType: 'fixed', discountValue: 500, expiryDate: '2024-06-30', active: false, applicablePark: '1' },
    ];
  },

  createCoupon: async (data) => {
    // const response = await api.post('/coupons', data);
    // return response.data;
    console.log('API Service: Creating Coupon', data);
    return { ...data, id: Date.now().toString(), active: true };
  },

  deleteCoupon: async (id) => {
    // await api.delete(`/coupons/${id}`);
    console.log('API Service: Deleting Coupon', id);
    return true;
  },

  toggleCoupon: async (id, status) => {
    // await api.patch(`/coupons/${id}`, { active: !status });
    console.log('API Service: Toggling Coupon', id, !status);
    return true;
  }
};

export default couponService;
