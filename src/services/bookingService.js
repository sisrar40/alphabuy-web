import api from './api';

const bookingService = {
  getBookings: async () => {
    // const response = await api.get('/admin/bookings');
    // return response.data;
    
    return [
      { id: 'BK-1001', userName: 'John Doe', parkName: 'Adventure City', date: '2024-06-15', slots: 4, amount: 4796, paymentStatus: 'Paid', status: 'Confirmed' },
      { id: 'BK-1002', userName: 'Jane Smith', parkName: 'Aqua Splash', date: '2024-06-16', slots: 2, amount: 1798, paymentStatus: 'Paid', status: 'Pending' },
      { id: 'BK-1003', userName: 'Bob Taylor', parkName: 'Adventure City', date: '2024-06-17', slots: 1, amount: 1199, paymentStatus: 'Unpaid', status: 'Pending' },
    ];
  },

  getBookingById: async (id) => {
    // const response = await api.get(`/admin/bookings/${id}`);
    // return response.data;
    return { 
      id: 'BK-1001', 
      userName: 'John Doe', 
      userEmail: 'john@example.com',
      parkName: 'Adventure City', 
      date: '2024-06-15', 
      slots: 4, 
      amount: 4796, 
      paymentStatus: 'Paid', 
      status: 'Confirmed',
      items: [
        { name: 'Adult Ticket', qty: 2, price: 1199 },
        { name: 'Child Ticket', qty: 2, price: 799 },
        { name: 'Family Meal Combo', qty: 1, price: 499 }
      ]
    };
  },

  updateBookingStatus: async (id, status) => {
    // await api.patch(`/admin/bookings/${id}`, { status });
    console.log('API Service: Updating Booking Status', id, status);
    return true;
  }
};

export default bookingService;
