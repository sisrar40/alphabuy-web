import api from './api';

const mealService = {
  getMeals: async (parkId) => {
    let url = '/meals';
    if (parkId) {
      url += `?parkId=${parkId}`;
    }
    const response = await api.get(url);
    return response.data;
  },

  createMeal: async (mealData) => {
    const response = await api.post('/admin/meals', mealData);
    return response.data;
  },

  updateMeal: async (mealData) => {
    const response = await api.put(`/admin/meals/${mealData.id}`, mealData);
    return response.data;
  },

  deleteMeal: async (mealId) => {
    const response = await api.delete(`/admin/meals/${mealId}`);
    return response.data;
  }
};

export default mealService;
