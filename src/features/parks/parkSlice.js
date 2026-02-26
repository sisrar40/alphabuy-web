import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import parkService from '../../services/parkService';

export const fetchParks = createAsyncThunk('parks/fetchParks', async (_, { rejectWithValue }) => {
  try {
    return await parkService.getParks();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const addPark = createAsyncThunk('parks/addPark', async (parkData, { rejectWithValue }) => {
  try {
    return await parkService.createPark(parkData);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const parkSlice = createSlice({
  name: 'parks',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchParks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchParks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchParks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addPark.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default parkSlice.reducer;
