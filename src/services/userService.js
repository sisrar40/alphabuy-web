import api from './api';

const userService = {
    lookupUser: async (email, phone) => {
        let url = '/user/lookup?';
        if (email) url += `email=${encodeURIComponent(email)}&`;
        if (phone) url += `phone=${encodeURIComponent(phone)}`;
        const response = await api.get(url);
        return response.data;
    }
};

export default userService;
