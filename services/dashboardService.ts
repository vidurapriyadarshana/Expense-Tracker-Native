import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from './firebase';

export interface DashboardData {
    totalBalance: number;
    totalIncome: number;
    totalExpense: number;
    incomeTransactions: any[];
    expenseTransactions: any[];
    recentTransactions: any[];
}

export const getDashboardData = async (userId: string): Promise<DashboardData> => {
    // Fetch Incomes
    const incomeQuery = query(
        collection(db, `users/${userId}/incomes`),
        orderBy('date', 'desc')
    );
    const incomeSnapshot = await getDocs(incomeQuery);
    const incomes = incomeSnapshot.docs.map(doc => ({ _id: doc.id, ...doc.data(), type: 'income' }));

    // Fetch Expenses
    const expenseQuery = query(
        collection(db, `users/${userId}/expenses`),
        orderBy('date', 'desc')
    );
    const expenseSnapshot = await getDocs(expenseQuery);
    const expenses = expenseSnapshot.docs.map(doc => ({ _id: doc.id, ...doc.data(), type: 'expense' }));

    // Calculate Totals
    const totalIncome = incomes.reduce((sum: number, item: any) => sum + (item.amount || 0), 0);
    const totalExpense = expenses.reduce((sum: number, item: any) => sum + (item.amount || 0), 0);
    const totalBalance = totalIncome - totalExpense;

    // Prepare Recent Transactions (Combined & Sorted)
    const allTransactions = [...incomes, ...expenses].sort((a: any, b: any) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const recentTransactions = allTransactions.slice(0, 5);

    return {
        totalBalance,
        totalIncome,
        totalExpense,
        incomeTransactions: incomes,
        expenseTransactions: expenses,
        recentTransactions,
    };
};
