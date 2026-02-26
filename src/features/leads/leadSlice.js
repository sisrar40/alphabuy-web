import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import leadService from '../../services/leadService';

export const fetchLeads = createAsyncThunk('leads/fetchLeads', async (_, { rejectWithValue }) => {
  try {
    return await leadService.getLeads();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateLeadStatus = createAsyncThunk('leads/updateStatus', async ({ id, status }, { rejectWithValue }) => {
  try {
    await leadService.updateLeadStatus(id, status);
    return { id, status };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteLead = createAsyncThunk('leads/deleteLead', async (id, { rejectWithValue }) => {
  try {
    await leadService.deleteLead(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const leadSlice = createSlice({
  name: 'leads',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeads.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateLeadStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex(l => l.id === action.payload.id);
        if (index !== -1) {
          state.items[index].status = action.payload.status;
        }
      })
      .addCase(deleteLead.fulfilled, (state, action) => {
        state.items = state.items.filter(l => l.id !== action.payload);
      });
  },
});

export default leadSlice.reducer;
