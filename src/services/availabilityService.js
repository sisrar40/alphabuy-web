import api from './api';

const availabilityService = {
  getAvailability: async (parkId) => {
    // const response = await api.get(`/availability${parkId ? `?parkId=${parkId}` : ''}`);
    // return response.data;
    
    return [
      { id: '1', parkId: '1', parkName: 'Adventure City', date: '2024-06-01', availableSlots: 500 },
      { id: '2', parkId: '1', parkName: 'Adventure City', date: '2024-06-02', availableSlots: 450 },
    ];
  },

  createAvailability: async (data) => {
    // const response = await api.post('/availability', data);
    // return response.data;
    console.log('API Service: Creating Availability', data);
    return { ...data, id: Date.now().toString() };
  },

  deleteAvailability: async (id) => {
    // await api.delete(`/availability/${id}`);
    console.log('API Service: Deleting Availability', id);
    return true;
  }
};

export default availabilityService;
