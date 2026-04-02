import api from './api';

const couponService = {
  getCoupons: async (parkId) => {
    let url = '/coupons';
    if (parkId) {
      url += `?parkId=${parkId}`;
    }
    const response = await api.get(url);
    return response.data;
  },

  createCoupon: async (data) => {
    const response = await api.post('/admin/coupons', data);
    return response.data;
  },

  deleteCoupon: async (id) => {
    await api.delete(`/admin/coupons/${id}`);
    return true;
  },

  toggleCoupon: async (id, status) => {
    await api.patch(`/admin/coupons/${id}`, { active: !status });
    return true;
  }
};

export default couponService;
