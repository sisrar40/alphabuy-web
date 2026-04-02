import api from './api';

const ticketService = {
    getTicketTypes: async (parkId) => {
        let url = '/ticket-types';
        if (parkId) {
            url += `?parkId=${parkId}`;
        }
        const response = await api.get(url);
        return response.data;
    },

    createTicketType: async (ticketData) => {
        const response = await api.post('/admin/ticket-types', ticketData);
        return response.data;
    },

    updateTicketType: async (ticketData) => {
        const response = await api.put(`/admin/ticket-types/${ticketData.id}`, ticketData);
        return response.data;
    },

    deleteTicketType: async (id) => {
        const response = await api.delete(`/admin/ticket-types/${id}`);
        return response.data;
    }
};

export default ticketService;
