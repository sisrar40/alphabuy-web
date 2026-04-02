import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import bookingService from '../../services/bookingService';

export const fetchAdminBookings = createAsyncThunk('bookings/fetchAdminBookings', async (_, { rejectWithValue }) => {
  try {
    return await bookingService.getBookings();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateBookingStatus = createAsyncThunk('bookings/updateStatus', async ({ id, status }, { rejectWithValue }) => {
  try {
    await bookingService.updateBookingStatus(id, status);
    return { id, status };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const bookingSlice = createSlice({
  name: 'adminBookings',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.items = (action.payload || []).map(b => ({
          ...b,
          id: b.id,
          bookingDate: b.created_at || b.createdAt,
          date: b.booking_date || b.bookingDate,
          userName: b.user_name || b.userName,
          userEmail: b.user_email || b.userEmail,
          userPhone: b.user_phone || b.userPhone,
          parkName: b.park_id ? 'Park ID ' + String(b.park_id).substring(0, 8) : 'AquaZen Paradise',
          slots: b.items ? b.items.filter(i => i.item_type === 'ticket').reduce((acc, curr) => acc + curr.quantity, 0) : 0,
          amount: b.total,
          paymentStatus: b.payment_status || 'Pending',
          paymentMethod: 'Razorpay',
          status: b.status || 'Pending'
        }));
      })
      .addCase(fetchAdminBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex(b => b.id === action.payload.id);
        if (index !== -1) {
          state.items[index].status = action.payload.status;
        }
      });
  },
});

export default bookingSlice.reducer;
