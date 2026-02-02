// User interface
export interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
}

// Auth state for Redux store
export interface AuthState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
}
