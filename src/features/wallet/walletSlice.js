import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import walletService from '../../services/walletService';

export const fetchWallet = createAsyncThunk('wallet/fetchWallet', async (token, { rejectWithValue }) => {
    try {
        return await walletService.getWallet(token);
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || error.message);
    }
});

export const fetchTransactions = createAsyncThunk('wallet/fetchTransactions', async (token, { rejectWithValue }) => {
    try {
        return await walletService.getTransactions(token);
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || error.message);
    }
});

export const addFundsToWallet = createAsyncThunk('wallet/addFunds', async ({ token, amount, referenceId, description }, { rejectWithValue }) => {
    try {
        return await walletService.addFunds(token, amount, referenceId, description);
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || error.message);
    }
});

export const deductFromWallet = createAsyncThunk('wallet/deductFunds', async ({ token, amount, referenceId, description }, { rejectWithValue }) => {
    try {
        return await walletService.deductFunds(token, amount, referenceId, description);
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || error.message);
    }
});

const walletSlice = createSlice({
    name: 'wallet',
    initialState: {
        wallet: null,
        transactions: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearWalletError: (state) => { state.error = null; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWallet.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchWallet.fulfilled, (state, action) => { state.loading = false; state.wallet = action.payload; })
            .addCase(fetchWallet.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            .addCase(fetchTransactions.fulfilled, (state, action) => { state.transactions = action.payload || []; })

            .addCase(addFundsToWallet.fulfilled, (state, action) => { state.wallet = action.payload; })
            .addCase(addFundsToWallet.rejected, (state, action) => { state.error = action.payload; })

            .addCase(deductFromWallet.fulfilled, (state, action) => { state.wallet = action.payload; })
            .addCase(deductFromWallet.rejected, (state, action) => { state.error = action.payload; });
    },
});

export const { clearWalletError } = walletSlice.actions;
export default walletSlice.reducer;
