import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import mealService from '../../services/mealService';

export const fetchMeals = createAsyncThunk('meals/fetchMeals', async (parkId, { rejectWithValue }) => {
  try {
    return await mealService.getMeals(parkId);
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

export const updateMeal = createAsyncThunk('meals/updateMeal', async (mealData, { rejectWithValue }) => {
  try {
    return await mealService.updateMeal(mealData);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteMeal = createAsyncThunk('meals/deleteMeal', async (mealId, { rejectWithValue }) => {
  try {
    await mealService.deleteMeal(mealId);
    return mealId;
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
      })
      .addCase(updateMeal.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => String(item.id) === String(action.payload.id));
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteMeal.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => String(item.id) !== String(action.payload));
      });
  },
});

export default mealSlice.reducer;
