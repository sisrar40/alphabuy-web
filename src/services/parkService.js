import api from './api';

const parkService = {
  getParks: async () => {
    const response = await api.get('/parks');
    return response.data;
  },

  createPark: async (parkData) => {
    const response = await api.post('/admin/parks', parkData);
    return response.data;
  },

  deletePark: async (id) => {
    await api.delete(`/admin/parks/${id}`);
    return true;
  },

  getParkById: async (id) => {
    const response = await api.get(`/parks/${id}`);
    return response.data;
  },

  updatePark: async (id, parkData) => {
    const response = await api.put(`/admin/parks/${id}`, parkData);
    return response.data;
  }
};

export default parkService;
