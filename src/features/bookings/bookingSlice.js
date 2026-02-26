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
        state.items = action.payload;
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
