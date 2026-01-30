import React from 'react';
import { View, Text } from 'react-native';
import { formatCurrency, formatDate } from '../../utils/helpers';

interface RecentTransactionsProps {
    transactions: any[];
}

const RecentTransactions = ({ transactions }: RecentTransactionsProps) => {
    return (
        <View className="bg-white p-4 rounded-2xl shadow-sm">
            <Text className="text-lg font-bold text-gray-900 mb-4">Recent Transactions</Text>

            {transactions.length === 0 ? (
                <Text className="text-gray-400 text-center py-4">No recent transactions</Text>
            ) : (
                <View className="gap-3">
                    {transactions.map((item) => (
                        <View key={item._id} className="flex-row items-center justify-between border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                            <View className="flex-row items-center gap-3">
                                <View className={`w-10 h-10 rounded-xl items-center justify-center ${item.type === 'income' ? 'bg-emerald-100' : 'bg-rose-100'
                                    }`}>
                                    <Text className="text-xl">{item.icon}</Text>
                                </View>
                                <View>
                                    <Text className="font-semibold text-gray-900 text-sm">
                                        {item.type === 'income' ? item.source : item.category}
                                    </Text>
                                    <Text className="text-xs text-gray-500">{formatDate(item.date)}</Text>
                                </View>
                            </View>
                            <Text className={`font-bold text-sm ${item.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
                                }`}>
                                {item.type === 'income' ? '+' : '-'} {formatCurrency(item.amount)}
                            </Text>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
};

export default RecentTransactions;
