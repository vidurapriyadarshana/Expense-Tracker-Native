import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { ExpenseChartProps } from '../../types';

const screenWidth = Dimensions.get('window').width;

const ExpenseChart = ({ data }: ExpenseChartProps) => {
    if (!data || data.length === 0) {
        return (
            <View className="bg-white p-4 rounded-2xl shadow-sm items-center justify-center h-48">
                <Text className="text-gray-400">No expense data available</Text>
            </View>
        );
    }

    const lastEntries = data.slice(0, 6).reverse();
    const labels = lastEntries.map(d => new Date(d.date).getDate().toString());
    const values = lastEntries.map(d => d.amount);

    return (
        <View className="bg-white p-4 rounded-2xl shadow-sm">
            <Text className="text-lg font-bold text-gray-900 mb-4">Expense Trend</Text>
            <LineChart
                data={{
                    labels: labels,
                    datasets: [{ data: values }]
                }}
                width={screenWidth - 64}
                height={220}
                chartConfig={{
                    backgroundColor: '#ffffff',
                    backgroundGradientFrom: '#ffffff',
                    backgroundGradientTo: '#ffffff',
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
                    style: { borderRadius: 16 },
                    propsForDots: { r: '4', strokeWidth: '2', stroke: '#dc2626' }
                }}
                bezier
                style={{ marginVertical: 8, borderRadius: 16 }}
            />
        </View>
    );
};

export default ExpenseChart;
