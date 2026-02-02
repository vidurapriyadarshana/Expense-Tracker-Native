import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState, User } from '../../types';

const initialState: AuthState = {
    user: null,
    isLoading: true,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
            state.isLoading = false;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.isLoading = false;
            state.error = null;
        },
    },
});

export const { setUser, setLoading, logout } = authSlice.actions;

export default authSlice.reducer;
