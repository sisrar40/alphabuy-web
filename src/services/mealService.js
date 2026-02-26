import api from './api';

const mealService = {
  getMeals: async () => {
    // const response = await api.get('/meals');
    // return response.data;
    return [
      { id: '1', mealName: 'Family Combo', parkId: '1', parkName: 'Adventure City', price: 499, description: 'Meal for 4 people' },
      { id: '2', mealName: 'Single Snacker', parkId: '2', parkName: 'Aqua Splash', price: 199, description: 'Quick bite' },
    ];
  },

  createMeal: async (mealData) => {
    // const response = await api.post('/meals', mealData);
    // return response.data;
    console.log('API Service: Creating Meal', mealData);
    return { ...mealData, id: Date.now().toString() };
  }
};

export default mealService;
