import api from './api';

const parkService = {
  getParks: async () => {
    // const response = await api.get('/parks');
    // return response.data;
    
    // Placeholder response
    return [
      { id: '1', parkName: 'Adventure City Theme Park', location: 'Downtown', price: 1199, description: 'The best park in the city' },
      { id: '2', parkName: 'Aqua Splash Water Park', location: 'Westside', price: 899, description: 'Beat the heat here' },
    ];
  },

  createPark: async (parkData) => {
    // const response = await api.post('/parks', parkData);
    // return response.data;
    
    // Placeholder
    console.log('API Service: Creating Park', parkData);
    return { ...parkData, id: Date.now().toString() };
  },

  deletePark: async (id) => {
    // await api.delete(`/parks/${id}`);
    console.log('API Service: Deleting Park', id);
    return true;
  }
};

export default parkService;
