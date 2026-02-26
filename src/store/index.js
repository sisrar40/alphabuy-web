import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./bookingSlice";
import adminAuthReducer from "./adminAuthSlice";

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
    adminAuth: adminAuthReducer,
  },
});
