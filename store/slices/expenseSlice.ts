import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as expenseService from '../../services/expenseService';

interface Expense {
    _id: string;
    icon: string;
    category: string;
    amount: number;
    date: string;
}

interface ExpenseState {
    expenses: Expense[];
    isLoading: boolean;
    error: string | null;
}

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
    async ({ userId, data }: { userId: string; data: expenseService.CreateExpenseDto }) => {
        return await expenseService.createExpense(userId, data);
    }
);

export const removeExpense = createAsyncThunk(
    'expense/removeExpense',
    async ({ userId, expenseId }: { userId: string; expenseId: string }) => {
        await expenseService.deleteExpense(userId, expenseId);
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
