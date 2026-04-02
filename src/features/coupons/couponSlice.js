import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import couponService from '../../services/couponService';

export const fetchCoupons = createAsyncThunk('coupons/fetchCoupons', async (parkId, { rejectWithValue }) => {
  try {
    return await couponService.getCoupons(parkId);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const addCoupon = createAsyncThunk('coupons/addCoupon', async (data, { rejectWithValue }) => {
  try {
    return await couponService.createCoupon(data);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteCoupon = createAsyncThunk('coupons/deleteCoupon', async (id, { rejectWithValue }) => {
  try {
    await couponService.deleteCoupon(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const toggleCoupon = createAsyncThunk('coupons/toggleCoupon', async ({ id, status }, { rejectWithValue }) => {
  try {
    await couponService.toggleCoupon(id, status);
    return { id, status: !status };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const couponSlice = createSlice({
  name: 'coupons',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoupons.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCoupons.fulfilled, (state, action) => {
        state.loading = false;
        // Normalize snake_case from backend to camelCase for frontend
        state.items = (action.payload || []).map(coupon => ({
          ...coupon,
          couponCode: coupon.code,
          discountType: coupon.discount_type,
          discountValue: coupon.discount_value,
          expiryDate: coupon.expiry_date,
          applicablePark: coupon.applicable_park_id,
          minimumAmount: coupon.minimum_amount || 0,
          maxUses: coupon.max_uses || 0
        }));
      })
      .addCase(fetchCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addCoupon.fulfilled, (state, action) => {
        // Normalize the newly added coupon
        const coupon = action.payload;
        state.items.push({
          ...coupon,
          couponCode: coupon.code,
          discountType: coupon.discount_type,
          discountValue: coupon.discount_value,
          expiryDate: coupon.expiry_date,
          applicablePark: coupon.applicable_park_id
        });
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.items = state.items.filter(c => c.id !== action.payload);
      })
      .addCase(toggleCoupon.fulfilled, (state, action) => {
        const index = state.items.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.items[index].active = action.payload.status;
        }
      });
  },
});

export default couponSlice.reducer;
