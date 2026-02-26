import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  date: null,
  tickets: [],
  meals: [],
  payment: {
    transactionId: null,
    amount: 0,
    status: "pending",
  },
  userInfo: {
    name: "",
    email: "",
    phone: "",
  },
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingDate: (state, action) => {
      state.date = action.payload;
    },
    setBookingTickets: (state, action) => {
      state.tickets = action.payload;
    },
    setBookingMeals: (state, action) => {
      state.meals = action.payload;
    },
    setPaymentDetails: (state, action) => {
      state.payment = { ...state.payment, ...action.payload };
    },
    setUserInfo: (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
    resetBooking: () => initialState,
  },
});

export const {
  setBookingDate,
  setBookingTickets,
  setBookingMeals,
  setPaymentDetails,
  setUserInfo,
  resetBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;
