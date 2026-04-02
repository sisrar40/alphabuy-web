import api from './api';

const availabilityService = {
  getAvailability: async (parkId) => {
    const response = await api.get(`/availability${parkId ? `?parkId=${parkId}` : ''}`);
    return response.data;
  },

  createAvailability: async (data) => {
    const response = await api.post('/availability', data);
    return response.data;
  },

  deleteAvailability: async (id) => {
    await api.delete(`/availability/${id}`);
    return true;
  }
};

export default availabilityService;
