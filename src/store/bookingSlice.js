import { createSlice } from "@reduxjs/toolkit";

import { TICKET_TYPES, MEAL_PLANS, ADD_ONS } from "../data/bookingMetadata";

const initialState = {
  parkId: null,
  date: null,
  selectedTime: null,
  tickets: [], // Array of { id, quantity }
  meals: [], // Array of meal IDs (strings)
  selectedAddOns: [], // Array of add-on IDs (strings)
  selectedCoupon: null,
  availableMeals: [], // From backend
  availableTicketTypes: [], // From backend
  availableAddOns: [], // From backend
  payment: {
    transactionId: null,
    amount: 0,
    status: "pending",
  },
  userInfo: {
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  },
  pricing: {
    subtotal: 0,
    tax: 0,
    discount: 0,
    total: 0,
  }
};

// Load initial state from localStorage if available
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("alphabuy_booking_state");
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return initialState;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("alphabuy_booking_state", serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const bookingSlice = createSlice({
  name: "booking",
  initialState: loadState(),
  reducers: {
    setBookingDate: (state, action) => {
      state.date = action.payload;
      saveState(state);
    },
    setBookingParkId: (state, action) => {
      state.parkId = action.payload;
      saveState(state);
    },
    setBookingTime: (state, action) => {
      state.selectedTime = action.payload;
      saveState(state);
    },
    setBookingTickets: (state, action) => {
      state.tickets = action.payload;
      saveState(state);
    },
    setBookingMeals: (state, action) => {
      state.meals = action.payload;
      saveState(state);
    },
    setAvailableMetadata: (state, action) => {
      const { meals, tickets, addOns } = action.payload;
      if (meals) state.availableMeals = meals;
      if (tickets) state.availableTicketTypes = tickets;
      if (addOns) state.availableAddOns = addOns;
      saveState(state);
    },
    setPaymentDetails: (state, action) => {
      state.payment = { ...state.payment, ...action.payload };
      saveState(state);
    },
    setUserInfo: (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
      saveState(state);
    },
    setSelectedCoupon: (state, action) => {
      state.selectedCoupon = action.payload;
      saveState(state);
    },
    setBookingAddOns: (state, action) => {
      state.selectedAddOns = action.payload;
      saveState(state);
    },
    calculateBookingTotal: (state) => {
      // Subtotal from tickets
      const ticketSubtotal = state.tickets.reduce((sum, t) => {
        const type = state.availableTicketTypes.find(tt => tt.id === (t.id || t.type));
        return sum + (t.quantity || t.count || 0) * (type ? type.price : 0);
      }, 0);

      // Subtotal from meals
      const mealSubtotal = state.meals.reduce((sum, m) => {
        const mealId = typeof m === 'string' ? m : (m.id || m.type);
        const plan = state.availableMeals.find(mp => mp.id === mealId);
        return sum + (plan ? plan.price : 0);
      }, 0);

      // Subtotal from add-ons
      const addOnSubtotal = (state.selectedAddOns || []).reduce((sum, addOnId) => {
        const addOn = state.availableAddOns.find(a => a.id === addOnId);
        return sum + (addOn ? addOn.price : 0);
      }, 0);

      const subtotal = ticketSubtotal + mealSubtotal + addOnSubtotal;

      let discount = 0;
      if (state.selectedCoupon) {
        if (state.selectedCoupon.discountType === 'percentage') {
          discount = (subtotal * state.selectedCoupon.discountValue) / 100;
        } else {
          discount = state.selectedCoupon.discountValue;
        }
      }

      const taxableAmount = subtotal - discount;
      const tax = taxableAmount * 0.18;
      const total = taxableAmount + tax;

      state.pricing = {
        subtotal,
        tax,
        discount,
        total,
      };
      saveState(state);
    },
    resetBooking: () => {
      localStorage.removeItem("alphabuy_booking_state");
      return initialState;
    },
  },
});

export const {
  setBookingDate,
  setBookingParkId,
  setBookingTime,
  setBookingTickets,
  setBookingMeals,
  setAvailableMetadata,
  setPaymentDetails,
  setUserInfo,
  setSelectedCoupon,
  setBookingAddOns,
  calculateBookingTotal,
  resetBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;
