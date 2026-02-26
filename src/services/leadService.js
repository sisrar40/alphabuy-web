import api from './api';

const leadService = {
  getLeads: async () => {
    // const response = await api.get('/admin/leads');
    // return response.data;
    
    return [
      { id: '1', name: 'Alice Walker', email: 'alice@example.com', phone: '+91 98765 43210', park: 'Adventure City', message: 'Interested in family discounts for 20+ people.', status: 'New', date: '2024-05-20' },
      { id: '2', name: 'Charlie Brown', email: 'charlie@web.com', phone: '+91 88888 77777', park: 'Aqua Splash', message: 'Do you have weekend slots available next month?', status: 'Contacted', date: '2024-05-18' },
    ];
  },

  updateLeadStatus: async (id, status) => {
    // await api.patch(`/admin/leads/${id}`, { status });
    console.log('API Service: Updating Lead Status', id, status);
    return true;
  },

  deleteLead: async (id) => {
    // await api.delete(`/admin/leads/${id}`);
    console.log('API Service: Deleting Lead', id);
    return true;
  }
};

export default leadService;
