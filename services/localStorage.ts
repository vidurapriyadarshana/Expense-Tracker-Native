import AsyncStorage from '@react-native-async-storage/async-storage';
import { Expense, Income } from '../types';

// Storage keys
const STORAGE_KEYS = {
    EXPENSES: (userId: string) => `@expenses_${userId}`,
    INCOMES: (userId: string) => `@incomes_${userId}`,
};

// Generate unique ID
const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
};

// Generic get items from storage
export const getStorageItems = async <T>(key: string): Promise<T[]> => {
    try {
        const data = await AsyncStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error(`[LocalStorage] Error getting items for key ${key}:`, error);
        return [];
    }
};

// Generic save items to storage
export const saveStorageItems = async <T>(key: string, items: T[]): Promise<void> => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(items));
    } catch (error) {
        console.error(`[LocalStorage] Error saving items for key ${key}:`, error);
        throw error;
    }
};

// ==================== EXPENSES ====================

export const getLocalExpenses = async (userId: string): Promise<Expense[]> => {
    const key = STORAGE_KEYS.EXPENSES(userId);
    const expenses = await getStorageItems<Expense>(key);
    // Sort by date descending
    return expenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const createLocalExpense = async (
    userId: string,
    data: Omit<Expense, '_id' | 'createdAt' | 'updatedAt'>
): Promise<Expense> => {
    const key = STORAGE_KEYS.EXPENSES(userId);
    const expenses = await getStorageItems<Expense>(key);
    
    const newExpense: Expense = {
        ...data,
        _id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    
    expenses.push(newExpense);
    await saveStorageItems(key, expenses);
    
    console.log(`[LocalStorage] Expense created with ID: ${newExpense._id}`);
    return newExpense;
};

export const deleteLocalExpense = async (userId: string, expenseId: string): Promise<void> => {
    const key = STORAGE_KEYS.EXPENSES(userId);
    const expenses = await getStorageItems<Expense>(key);
    
    const filteredExpenses = expenses.filter(e => e._id !== expenseId);
    await saveStorageItems(key, filteredExpenses);
    
    console.log(`[LocalStorage] Expense deleted: ${expenseId}`);
};

// ==================== INCOMES ====================

export const getLocalIncomes = async (userId: string): Promise<Income[]> => {
    const key = STORAGE_KEYS.INCOMES(userId);
    const incomes = await getStorageItems<Income>(key);
    // Sort by date descending
    return incomes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const createLocalIncome = async (
    userId: string,
    data: Omit<Income, '_id' | 'createdAt' | 'updatedAt'>
): Promise<Income> => {
    const key = STORAGE_KEYS.INCOMES(userId);
    const incomes = await getStorageItems<Income>(key);
    
    const newIncome: Income = {
        ...data,
        _id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    
    incomes.push(newIncome);
    await saveStorageItems(key, incomes);
    
    console.log(`[LocalStorage] Income created with ID: ${newIncome._id}`);
    return newIncome;
};

export const deleteLocalIncome = async (userId: string, incomeId: string): Promise<void> => {
    const key = STORAGE_KEYS.INCOMES(userId);
    const incomes = await getStorageItems<Income>(key);
    
    const filteredIncomes = incomes.filter(i => i._id !== incomeId);
    await saveStorageItems(key, filteredIncomes);
    
    console.log(`[LocalStorage] Income deleted: ${incomeId}`);
};

// ==================== CLEAR USER DATA ====================

export const clearUserData = async (userId: string): Promise<void> => {
    try {
        await AsyncStorage.multiRemove([
            STORAGE_KEYS.EXPENSES(userId),
            STORAGE_KEYS.INCOMES(userId),
        ]);
        console.log(`[LocalStorage] All data cleared for user: ${userId}`);
    } catch (error) {
        console.error(`[LocalStorage] Error clearing user data:`, error);
        throw error;
    }
};
