import {
    getLocalIncomes,
    createLocalIncome,
    deleteLocalIncome,
} from './localStorage';
import { CreateIncomeDto, Income } from '../types';

export type { CreateIncomeDto, Income };

// Get all incomes from local storage
export const getIncomes = async (userId: string) => {
    return await getLocalIncomes(userId);
};

// Create income in local storage
export const createIncome = async (userId: string, data: CreateIncomeDto) => {
    console.log(`[LocalStorage] Creating income for user: ${userId}`, data);
    try {
        const income = await createLocalIncome(userId, data);
        console.log(`[LocalStorage] Income created with ID: ${income._id}`);
        return income;
    } catch (error) {
        console.error('[LocalStorage] Error creating income:', error);
        throw error;
    }
};

// Delete income from local storage
export const deleteIncome = async (userId: string, incomeId: string) => {
    console.log(`[LocalStorage] Deleting income: ${incomeId} for user: ${userId}`);
    try {
        await deleteLocalIncome(userId, incomeId);
        console.log(`[LocalStorage] Income deleted successfully: ${incomeId}`);
    } catch (error) {
        console.error('[LocalStorage] Error deleting income:', error);
        throw error;
    }
};
