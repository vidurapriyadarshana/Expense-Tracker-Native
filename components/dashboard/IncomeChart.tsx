import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

interface IncomeChartProps {
    data: any[];
}

const IncomeChart = ({ data }: IncomeChartProps) => {
    // Process data for last 6 months or days
    // Simplified for demo: just taking amounts if available, else placeholders

    if (!data || data.length === 0) {
        return (
            <View className="bg-white p-4 rounded-2xl shadow-sm items-center justify-center h-48">
                <Text className="text-gray-400">No income data available</Text>
            </View>
        );
    }

    // Group by date (simplified) or take last 6 entries
    const lastEntries = data.slice(0, 6).reverse();
    const labels = lastEntries.map(d => new Date(d.date).getDate().toString());
    const values = lastEntries.map(d => d.amount);

    // If less than 2 points, chart kit might crash or look weird, handled by empty check above mostly

    return (
        <View className="bg-white p-4 rounded-2xl shadow-sm">
            <Text className="text-lg font-bold text-gray-900 mb-4">Income Trend</Text>
            <LineChart
                data={{
                    labels: labels,
                    datasets: [{ data: values }]
                }}
                width={screenWidth - 64} // padding adjustment
                height={220}
                chartConfig={{
                    backgroundColor: '#ffffff',
                    backgroundGradientFrom: '#ffffff',
                    backgroundGradientTo: '#ffffff',
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
                    style: { borderRadius: 16 },
                    propsForDots: { r: '4', strokeWidth: '2', stroke: '#059669' }
                }}
                bezier
                style={{ marginVertical: 8, borderRadius: 16 }}
            />
        </View>
    );
};

export default IncomeChart;
