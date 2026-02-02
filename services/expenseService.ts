import {
    getLocalExpenses,
    createLocalExpense,
    deleteLocalExpense,
} from './localStorage';
import { CreateExpenseDto, Expense } from '../types';

export type { CreateExpenseDto, Expense };

// Get all expenses from local storage
export const getExpenses = async (userId: string) => {
    return await getLocalExpenses(userId);
};

// Create expense in local storage
export const createExpense = async (userId: string, data: CreateExpenseDto) => {
    console.log(`[LocalStorage] Creating expense for user: ${userId}`, data);
    try {
        const expense = await createLocalExpense(userId, data);
        console.log(`[LocalStorage] Expense created with ID: ${expense._id}`);
        return expense;
    } catch (error) {
        console.error('[LocalStorage] Error creating expense:', error);
        throw error;
    }
};

// Delete expense from local storage
export const deleteExpense = async (userId: string, expenseId: string) => {
    console.log(`[LocalStorage] Deleting expense: ${expenseId} for user: ${userId}`);
    try {
        await deleteLocalExpense(userId, expenseId);
        console.log(`[LocalStorage] Expense deleted successfully: ${expenseId}`);
    } catch (error) {
        console.error('[LocalStorage] Error deleting expense:', error);
        throw error;
    }
};
