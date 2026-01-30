import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    query,
    orderBy
} from 'firebase/firestore';
import { db } from './firebase';

export interface CreateExpenseDto {
    icon: string;
    category: string;
    amount: number;
    date: string;
}

// Get all expenses
export const getExpenses = async (userId: string) => {
    const q = query(
        collection(db, `users/${userId}/expenses`),
        orderBy('date', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() }));
};

// Create expense
export const createExpense = async (userId: string, data: CreateExpenseDto) => {
    const docRef = await addDoc(collection(db, `users/${userId}/expenses`), {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
    });
    return { _id: docRef.id, ...data };
};

// Delete expense
export const deleteExpense = async (userId: string, expenseId: string) => {
    await deleteDoc(doc(db, `users/${userId}/expenses`, expenseId));
};
