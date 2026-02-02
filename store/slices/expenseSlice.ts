import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as expenseService from '../../services/expenseService';
import { fetchDashboardData } from './dashboardSlice';
import { ExpenseState, CreateExpenseDto } from '../../types';

const initialState: ExpenseState = {
    expenses: [],
    isLoading: false,
    error: null,
};

export const fetchExpenses = createAsyncThunk(
    'expense/fetchExpenses',
    async (userId: string) => {
        return await expenseService.getExpenses(userId);
    }
);

export const addExpense = createAsyncThunk(
    'expense/addExpense',
    async ({ userId, data }: { userId: string; data: CreateExpenseDto }, { dispatch }) => {
        const result = await expenseService.createExpense(userId, data);
        // Refresh dashboard data after adding expense
        dispatch(fetchDashboardData(userId));
        return result;
    }
);

export const removeExpense = createAsyncThunk(
    'expense/removeExpense',
    async ({ userId, expenseId }: { userId: string; expenseId: string }, { dispatch }) => {
        await expenseService.deleteExpense(userId, expenseId);
        // Refresh dashboard data after removing expense
        dispatch(fetchDashboardData(userId));
        return expenseId;
    }
);

const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Expenses
            .addCase(fetchExpenses.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchExpenses.fulfilled, (state, action: any) => {
                state.isLoading = false;
                state.expenses = action.payload;
            })
            .addCase(fetchExpenses.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to fetch expenses';
            })
            // Add Expense
            .addCase(addExpense.fulfilled, (state, action: any) => {
                state.expenses.unshift(action.payload);
            })
            // Remove Expense
            .addCase(removeExpense.fulfilled, (state, action) => {
                state.expenses = state.expenses.filter((exp) => exp._id !== action.payload);
            });
    },
});

export default expenseSlice.reducer;
