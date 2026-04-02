import api from './api';

const bookingService = {
  getBookings: async () => {
    const response = await api.get('/admin/bookings');
    return response.data;
  },

  getBookingById: async (id) => {
    const response = await api.get(`/admin/bookings/${id}`);
    return response.data;
  },

  updateBookingStatus: async (id, status) => {
    await api.patch(`/admin/bookings/${id}`, { status });
    return true;
  },

  createBooking: async (bookingData) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  }
};

export default bookingService;
