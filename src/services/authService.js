import api from './api';

const authService = {
  login: async (email, password) => {
    // const response = await api.post('/auth/login', { email, password });
    // return response.data;
    
    // Mock login for demo
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@alphabuy.com' && password === 'admin123') {
          resolve({ token: 'mock-jwt-token-for-admin-session', user: { name: 'Super Admin', role: 'admin' } });
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  },

  logout: () => {
    localStorage.removeItem('adminToken');
  }
};

export default authService;
