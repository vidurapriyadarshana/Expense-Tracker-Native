// Income interface
export interface Income {
    _id: string;
    icon: string;
    source: string;
    amount: number;
    date: string;
    createdAt: string;
    updatedAt: string;
}

// DTO for creating income
export interface CreateIncomeDto {
    icon: string;
    source: string;
    amount: number;
    date: string;
}

// Income state for Redux store
export interface IncomeState {
    incomes: Income[];
    isLoading: boolean;
    error: string | null;
}
