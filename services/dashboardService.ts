import { getLocalExpenses, getLocalIncomes } from './localStorage';

export interface DashboardData {
    totalBalance: number;
    totalIncome: number;
    totalExpense: number;
    incomeTransactions: any[];
    expenseTransactions: any[];
    recentTransactions: any[];
}

export const getDashboardData = async (userId: string): Promise<DashboardData> => {
    // Fetch Incomes from local storage
    const incomes = await getLocalIncomes(userId);
    const incomesWithType = incomes.map(income => ({ ...income, type: 'income' }));

    // Fetch Expenses from local storage
    const expenses = await getLocalExpenses(userId);
    const expensesWithType = expenses.map(expense => ({ ...expense, type: 'expense' }));

    // Calculate Totals
    const totalIncome = incomes.reduce((sum: number, item: any) => sum + (item.amount || 0), 0);
    const totalExpense = expenses.reduce((sum: number, item: any) => sum + (item.amount || 0), 0);
    const totalBalance = totalIncome - totalExpense;

    // Prepare Recent Transactions (Combined & Sorted)
    const allTransactions = [...incomesWithType, ...expensesWithType].sort((a: any, b: any) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const recentTransactions = allTransactions.slice(0, 5);

    return {
        totalBalance,
        totalIncome,
        totalExpense,
        incomeTransactions: incomesWithType,
        expenseTransactions: expensesWithType,
        recentTransactions,
    };
};
