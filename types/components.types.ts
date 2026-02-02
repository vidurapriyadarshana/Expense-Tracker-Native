import { TextInputProps } from 'react-native';

// Button component props
export interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'ghost';
    isLoading?: boolean;
    disabled?: boolean;
    className?: string;
}

// Modal component props
export interface ModalProps {
    visible: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

// Input component props
export interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
}

// IconSelector component props
export interface IconSelectorProps {
    icons: string[];
    selectedIcon: string;
    onSelect: (icon: string) => void;
}

// StatsCards component props
export interface StatsCardsProps {
    totalBalance: number;
    totalIncome: number;
    totalExpense: number;
}

// RecentTransactions component props
export interface RecentTransactionsProps {
    transactions: any[];
}

// IncomeChart component props
export interface IncomeChartProps {
    data: any[];
}

// ExpenseChart component props
export interface ExpenseChartProps {
    data: any[];
}
