import api from './api';

const walletService = {
    getWallet: async (token) => {
        const response = await api.get('/user/wallet', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    getTransactions: async (token) => {
        const response = await api.get('/user/wallet/transactions', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    addFunds: async (token, amount, referenceId = '', description = 'Wallet top-up') => {
        const response = await api.post('/user/wallet/add-funds',
            { amount, reference_id: referenceId, description },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    },

    deductFunds: async (token, amount, referenceId = '', description = 'Booking payment') => {
        const response = await api.post('/user/wallet/deduct-funds',
            { amount, reference_id: referenceId, description },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    },
};

export default walletService;
