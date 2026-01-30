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

export interface CreateIncomeDto {
    icon: string;
    source: string;
    amount: number;
    date: string;
}

// Get all incomes
export const getIncomes = async (userId: string) => {
    const q = query(
        collection(db, `users/${userId}/incomes`),
        orderBy('date', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() }));
};

// Create income
export const createIncome = async (userId: string, data: CreateIncomeDto) => {
    const docRef = await addDoc(collection(db, `users/${userId}/incomes`), {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
    });
    return { _id: docRef.id, ...data };
};

// Delete income
export const deleteIncome = async (userId: string, incomeId: string) => {
    await deleteDoc(doc(db, `users/${userId}/incomes`, incomeId));
};
