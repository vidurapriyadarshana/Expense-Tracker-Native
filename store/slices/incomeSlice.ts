import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as incomeService from '../../services/incomeService';
import { fetchDashboardData } from './dashboardSlice';

interface Income {
    _id: string;
    icon: string;
    source: string;
    amount: number;
    date: string;
}

interface IncomeState {
    incomes: Income[];
    isLoading: boolean;
    error: string | null;
}

const initialState: IncomeState = {
    incomes: [],
    isLoading: false,
    error: null,
};

export const fetchIncomes = createAsyncThunk(
    'income/fetchIncomes',
    async (userId: string) => {
        return await incomeService.getIncomes(userId);
    }
);

export const addIncome = createAsyncThunk(
    'income/addIncome',
    async ({ userId, data }: { userId: string; data: incomeService.CreateIncomeDto }, { dispatch }) => {
        const result = await incomeService.createIncome(userId, data);
        // Refresh dashboard data after adding income
        dispatch(fetchDashboardData(userId));
        return result;
    }
);

export const removeIncome = createAsyncThunk(
    'income/removeIncome',
    async ({ userId, incomeId }: { userId: string; incomeId: string }, { dispatch }) => {
        await incomeService.deleteIncome(userId, incomeId);
        // Refresh dashboard data after removing income
        dispatch(fetchDashboardData(userId));
        return incomeId;
    }
);

const incomeSlice = createSlice({
    name: 'income',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Incomes
            .addCase(fetchIncomes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchIncomes.fulfilled, (state, action: any) => {
                state.isLoading = false;
                state.incomes = action.payload;
            })
            .addCase(fetchIncomes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to fetch incomes';
            })
            // Add Income
            .addCase(addIncome.fulfilled, (state, action: any) => {
                state.incomes.unshift(action.payload);
            })
            // Remove Income
            .addCase(removeIncome.fulfilled, (state, action) => {
                state.incomes = state.incomes.filter((inc) => inc._id !== action.payload);
            });
    },
});

export default incomeSlice.reducer;
