import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import mealService from '../../services/mealService';

export const fetchMeals = createAsyncThunk('meals/fetchMeals', async (_, { rejectWithValue }) => {
  try {
    return await mealService.getMeals();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const addMeal = createAsyncThunk('meals/addMeal', async (mealData, { rejectWithValue }) => {
  try {
    return await mealService.createMeal(mealData);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const mealSlice = createSlice({
  name: 'meals',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMeals.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchMeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addMeal.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default mealSlice.reducer;
