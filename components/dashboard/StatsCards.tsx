import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatCurrency } from '../../utils/helpers';
import { StatsCardsProps } from '../../types';

const StatsCards = ({ totalBalance, totalIncome, totalExpense }: StatsCardsProps) => {
    return (
        <View className="gap-4">
            {/* Balance Card */}
            <View className="bg-blue-600 rounded-2xl p-4 shadow-sm flex-row items-center gap-4">
                <View className="w-12 h-12 rounded-xl bg-white/20 items-center justify-center">
                    <Ionicons name="wallet-outline" size={24} color="#fff" />
                </View>
                <View>
                    <Text className="text-white/80 font-medium text-sm">Total Balance</Text>
                    <Text className="text-white text-2xl font-bold">{formatCurrency(totalBalance)}</Text>
                </View>
            </View>

            <View className="flex-row gap-4">
                {/* Income Card */}
                <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm">
                    <View className="w-10 h-10 rounded-xl bg-emerald-100 items-center justify-center mb-2">
                        <Ionicons name="arrow-up" size={20} color="#059669" />
                    </View>
                    <Text className="text-gray-500 text-xs font-medium">Total Income</Text>
                    <Text className="text-gray-900 text-lg font-bold">{formatCurrency(totalIncome)}</Text>
                </View>

                {/* Expense Card */}
                <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm">
                    <View className="w-10 h-10 rounded-xl bg-rose-100 items-center justify-center mb-2">
                        <Ionicons name="arrow-down" size={20} color="#e11d48" />
                    </View>
                    <Text className="text-gray-500 text-xs font-medium">Total Expenses</Text>
                    <Text className="text-gray-900 text-lg font-bold">{formatCurrency(totalExpense)}</Text>
                </View>
            </View>
        </View>
    );
};

export default StatsCards;
