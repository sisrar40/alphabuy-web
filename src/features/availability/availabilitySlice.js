import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import availabilityService from '../../services/availabilityService';

export const fetchAvailability = createAsyncThunk('availability/fetchAvailability', async (parkId, { rejectWithValue }) => {
  try {
    return await availabilityService.getAvailability(parkId);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const addAvailability = createAsyncThunk('availability/addAvailability', async (data, { rejectWithValue }) => {
  try {
    return await availabilityService.createAvailability(data);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const availabilitySlice = createSlice({
  name: 'availability',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailability.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAvailability.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addAvailability.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default availabilitySlice.reducer;
