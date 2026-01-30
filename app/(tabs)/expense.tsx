import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, RefreshControl, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/hooks';
import { fetchExpenses, addExpense, removeExpense } from '../../store/slices/expenseSlice';
import { EXPENSE_ICONS } from '../../constants/icons';
import { formatCurrency, formatDate } from '../../utils/helpers';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import IconSelector from '../../components/ui/IconSelector';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ExpenseScreen() {
    const dispatch = useDispatch();
    const { expenses, isLoading } = useAppSelector((state) => state.expense);
    const { user } = useAppSelector((state) => state.auth);

    const [modalVisible, setModalVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [icon, setIcon] = useState(EXPENSE_ICONS[0]);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    useEffect(() => {
        if (user?.uid) {
            dispatch(fetchExpenses(user.uid) as any);
        }
    }, [user, dispatch]);

    const handleAddExpense = async () => {
        if (!amount || !category || !user?.uid) return;

        setIsSubmitting(true);
        try {
            await dispatch(addExpense({
                userId: user.uid,
                data: {
                    amount: parseFloat(amount),
                    category,
                    icon,
                    date: date.toISOString()
                }
            }) as any);
            setModalVisible(false);
            resetForm();
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = (id: string) => {
        if (user?.uid) {
            dispatch(removeExpense({ userId: user.uid, expenseId: id }) as any);
        }
    };

    const resetForm = () => {
        setAmount('');
        setCategory('');
        setIcon(EXPENSE_ICONS[0]);
        setDate(new Date());
    };

    const onRefresh = () => {
        if (user?.uid) {
            dispatch(fetchExpenses(user.uid) as any);
        }
    };

    const renderItem = ({ item }: { item: any }) => (
        <View className="flex-row items-center justify-between p-4 bg-white rounded-xl mb-3 border border-gray-100 shadow-sm">
            <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 rounded-xl bg-orange-100 items-center justify-center">
                    <Text className="text-xl">{item.icon}</Text>
                </View>
                <View>
                    <Text className="font-semibold text-gray-900">{item.category}</Text>
                    <Text className="text-xs text-gray-500">{formatDate(item.date)}</Text>
                </View>
            </View>
            <View className="flex-row items-center gap-3">
                <Text className="font-bold text-red-500">{formatCurrency(item.amount)}</Text>
                <TouchableOpacity
                    onPress={() => handleDelete(item._id)}
                    className="p-2 bg-gray-50 rounded-lg hover:bg-red-50"
                >
                    <Ionicons name="trash-outline" size={18} color="#ef4444" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
            <View className="flex-row justify-between items-center px-6 py-4 bg-white border-b border-gray-200">
                <Text className="text-2xl font-bold text-gray-900">Expenses</Text>
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    className="bg-primary flex-row items-center px-4 py-2 rounded-lg gap-2"
                >
                    <Ionicons name="add" size={20} color="#fff" />
                    <Text className="text-white font-medium">Add New</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={expenses}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                contentContainerStyle={{ padding: 24 }}
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
                }
                ListEmptyComponent={
                    <View className="items-center justify-center py-10">
                        <Text className="text-gray-500">No expense records found</Text>
                    </View>
                }
            />

            <Modal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                title="Add Expense"
            >
                <View className="gap-4">
                    <IconSelector
                        icons={EXPENSE_ICONS}
                        selectedIcon={icon}
                        onSelect={setIcon}
                    />

                    <Input
                        label="Category"
                        placeholder="e.g. Food, Transport"
                        value={category}
                        onChangeText={setCategory}
                    />

                    <Input
                        label="Amount (LKR)"
                        placeholder="0.00"
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                    />

                    <View className="mb-4">
                        <Text className="text-sm font-medium text-gray-700 mb-1.5">Date</Text>
                        {Platform.OS === 'android' && (
                            <TouchableOpacity
                                onPress={() => setShowDatePicker(true)}
                                className="h-11 border border-gray-200 rounded-lg px-3 justify-center bg-white"
                            >
                                <Text>{formatDate(date)}</Text>
                            </TouchableOpacity>
                        )}

                        {(showDatePicker || Platform.OS === 'ios') && (
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display="default"
                                onChange={(event, selectedDate) => {
                                    setShowDatePicker(false);
                                    if (selectedDate) setDate(selectedDate);
                                }}
                            />
                        )}
                    </View>

                    <Button
                        title="Add Expense"
                        onPress={handleAddExpense}
                        isLoading={isSubmitting}
                        disabled={!amount || !category}
                    />
                </View>
            </Modal>
        </SafeAreaView>
    );
}
