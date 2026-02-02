// Dashboard data from service
export interface DashboardData {
    totalBalance: number;
    totalIncome: number;
    totalExpense: number;
    incomeTransactions: any[];
    expenseTransactions: any[];
    recentTransactions: any[];
}

// Dashboard state for Redux store
export interface DashboardState {
    data: DashboardData | null;
    isLoading: boolean;
    error: string | null;
}
