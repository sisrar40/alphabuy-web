import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import parkReducer from '../features/parks/parkSlice';
import mealReducer from '../features/meals/mealSlice';
import availabilityReducer from '../features/availability/availabilitySlice';
import couponReducer from '../features/coupons/couponSlice';
import adminBookingReducer from '../features/bookings/bookingSlice';
import leadReducer from '../features/leads/leadSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    parks: parkReducer,
    meals: mealReducer,
    availability: availabilityReducer,
    coupons: couponReducer,
    adminBookings: adminBookingReducer,
    leads: leadReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
