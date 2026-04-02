import api from './api';

const leadService = {
  getLeads: async () => {
    const response = await api.get('/admin/leads');
    return response.data;
  },

  updateLeadStatus: async (id, status) => {
    await api.patch(`/admin/leads/${id}`, { status });
    return true;
  },

  deleteLead: async (id) => {
    await api.delete(`/admin/leads/${id}`);
    return true;
  },

  createLead: async (leadData) => {
    const response = await api.post('/leads', leadData);
    return response.data;
  }
};

export default leadService;
