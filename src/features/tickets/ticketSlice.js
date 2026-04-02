import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ticketService from '../../services/ticketService';

export const fetchTicketTypes = createAsyncThunk('tickets/fetchTicketTypes', async (parkId, { rejectWithValue }) => {
  try {
    return await ticketService.getTicketTypes(parkId);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const addTicketType = createAsyncThunk('tickets/addTicketType', async (ticketData, { rejectWithValue }) => {
  try {
    return await ticketService.createTicketType(ticketData);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateTicketType = createAsyncThunk('tickets/updateTicketType', async (ticketData, { rejectWithValue }) => {
  try {
    return await ticketService.updateTicketType(ticketData);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteTicketType = createAsyncThunk('tickets/deleteTicketType', async (id, { rejectWithValue }) => {
  try {
    await ticketService.deleteTicketType(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const ticketSlice = createSlice({
  name: 'tickets',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTicketTypes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTicketTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTicketTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addTicketType.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateTicketType.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => String(item.id) === String(action.payload.id));
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteTicketType.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => String(item.id) !== String(action.payload));
      });
  },
});

export default ticketSlice.reducer;
