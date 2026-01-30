import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as dashboardService from '../../services/dashboardService';

interface DashboardState {
    data: dashboardService.DashboardData | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: DashboardState = {
    data: null,
    isLoading: false,
    error: null,
};

export const fetchDashboardData = createAsyncThunk(
    'dashboard/fetchData',
    async (userId: string) => {
        return await dashboardService.getDashboardData(userId);
    }
);

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchDashboardData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchDashboardData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to fetch dashboard data';
            });
    },
});

export default dashboardSlice.reducer;
