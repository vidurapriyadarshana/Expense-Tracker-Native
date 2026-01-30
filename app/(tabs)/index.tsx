import React, { useEffect, useState } from 'react';
import { ScrollView, RefreshControl, View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/hooks';
import { fetchDashboardData } from '../../store/slices/dashboardSlice';
import { logout } from '../../store/slices/authSlice';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import StatsCards from '../../components/dashboard/StatsCards';
import IncomeChart from '../../components/dashboard/IncomeChart';
import ExpenseChart from '../../components/dashboard/ExpenseChart';
import RecentTransactions from '../../components/dashboard/RecentTransactions';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase';

export default function DashboardScreen() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { data, isLoading } = useAppSelector((state) => state.dashboard);
    const { user } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (user?.uid) {
            dispatch(fetchDashboardData(user.uid) as any);
        }
    }, [user, dispatch]);

    const onRefresh = () => {
        if (user?.uid) {
            dispatch(fetchDashboardData(user.uid) as any);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            dispatch(logout());
            router.replace('/(auth)/login');
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <View className="px-6 py-4 bg-white border-b border-gray-200 flex-row justify-between items-center">
                <View className="flex-row items-center gap-3">
                    <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center">
                        <Text className="text-blue-600 font-bold text-lg">
                            {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                        </Text>
                    </View>
                    <View>
                        <Text className="text-sm text-gray-500">Welcome back,</Text>
                        <Text className="text-lg font-bold text-gray-900">{user?.displayName || 'User'}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={handleLogout} className="p-2 bg-gray-100 rounded-full">
                    <Ionicons name="log-out-outline" size={20} color="#374151" />
                </TouchableOpacity>
            </View>

            <ScrollView
                contentContainerStyle={{ padding: 24, paddingBottom: 100, gap: 24 }}
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
                }
            >
                {data && (
                    <>
                        <StatsCards
                            totalBalance={data.totalBalance}
                            totalIncome={data.totalIncome}
                            totalExpense={data.totalExpense}
                        />

                        <RecentTransactions transactions={data.recentTransactions} />

                        <IncomeChart data={data.incomeTransactions} />

                        <ExpenseChart data={data.expenseTransactions} />
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
