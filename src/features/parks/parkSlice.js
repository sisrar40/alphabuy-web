import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import parkService from '../../services/parkService';

export const fetchParks = createAsyncThunk('parks/fetchParks', async (_, { rejectWithValue }) => {
  try {
    return await parkService.getParks();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchParkById = createAsyncThunk('parks/fetchParkById', async (id, { rejectWithValue }) => {
  try {
    return await parkService.getParkById(id);
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

export const deletePark = createAsyncThunk('parks/deletePark', async (id, { rejectWithValue }) => {
  try {
    await parkService.deletePark(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updatePark = createAsyncThunk('parks/updatePark', async (parkData, { rejectWithValue }) => {
  try {
    return await parkService.updatePark(parkData.id, parkData);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const parkSlice = createSlice({
  name: 'parks',
  initialState: {
    items: [],
    selectedItem: null,
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
      .addCase(fetchParkById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchParkById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedItem = action.payload;
      })
      .addCase(fetchParkById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addPark.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deletePark.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p.id !== action.payload);
      })
      .addCase(updatePark.fulfilled, (state, action) => {
        const index = state.items.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.selectedItem?.id === action.payload.id) {
          state.selectedItem = action.payload;
        }
      });
  },
});

export default parkSlice.reducer;
