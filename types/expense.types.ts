// Expense interface
export interface Expense {
    _id: string;
    icon: string;
    category: string;
    amount: number;
    date: string;
    createdAt: string;
    updatedAt: string;
}

// DTO for creating expense
export interface CreateExpenseDto {
    icon: string;
    category: string;
    amount: number;
    date: string;
}

// Expense state for Redux store
export interface ExpenseState {
    expenses: Expense[];
    isLoading: boolean;
    error: string | null;
}
