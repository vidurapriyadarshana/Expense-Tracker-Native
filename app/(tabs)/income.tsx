import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, RefreshControl, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/hooks';
import { fetchIncomes, addIncome, removeIncome } from '../../store/slices/incomeSlice';
import { INCOME_ICONS } from '../../constants/icons';
import { formatCurrency, formatDate } from '../../utils/helpers';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import IconSelector from '../../components/ui/IconSelector';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function IncomeScreen() {
    const dispatch = useDispatch();
    const { incomes, isLoading } = useAppSelector((state) => state.income);
    const { user } = useAppSelector((state) => state.auth);

    const [modalVisible, setModalVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
    const [amount, setAmount] = useState('');
    const [source, setSource] = useState('');
    const [icon, setIcon] = useState(INCOME_ICONS[0]);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    useEffect(() => {
        if (user?.uid) {
            dispatch(fetchIncomes(user.uid) as any);
        }
    }, [user, dispatch]);

    const handleAddIncome = async () => {
        if (!amount || !source || !user?.uid) return;

        setIsSubmitting(true);
        try {
            await dispatch(addIncome({
                userId: user.uid,
                data: {
                    amount: parseFloat(amount),
                    source,
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
            dispatch(removeIncome({ userId: user.uid, incomeId: id }) as any);
        }
    };

    const resetForm = () => {
        setAmount('');
        setSource('');
        setIcon(INCOME_ICONS[0]);
        setDate(new Date());
    };

    const onRefresh = () => {
        if (user?.uid) {
            dispatch(fetchIncomes(user.uid) as any);
        }
    };

    const renderItem = ({ item }: { item: any }) => (
        <View className="flex-row items-center justify-between p-4 bg-white rounded-xl mb-3 border border-gray-100 shadow-sm">
            <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 rounded-xl bg-emerald-100 items-center justify-center">
                    <Text className="text-xl">{item.icon}</Text>
                </View>
                <View>
                    <Text className="font-semibold text-gray-900">{item.source}</Text>
                    <Text className="text-xs text-gray-500">{formatDate(item.date)}</Text>
                </View>
            </View>
            <View className="flex-row items-center gap-3">
                <Text className="font-bold text-emerald-600">{formatCurrency(item.amount)}</Text>
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
                <Text className="text-2xl font-bold text-gray-900">Income</Text>
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    className="bg-primary flex-row items-center px-4 py-2 rounded-lg gap-2"
                >
                    <Ionicons name="add" size={20} color="#fff" />
                    <Text className="text-white font-medium">Add New</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={incomes}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                contentContainerStyle={{ padding: 24 }}
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
                }
                ListEmptyComponent={
                    <View className="items-center justify-center py-10">
                        <Text className="text-gray-500">No income records found</Text>
                    </View>
                }
            />

            <Modal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                title="Add Income"
            >
                <View className="gap-4">
                    <IconSelector
                        icons={INCOME_ICONS}
                        selectedIcon={icon}
                        onSelect={setIcon}
                    />

                    <Input
                        label="Source"
                        placeholder="e.g. Salary, Freelance"
                        value={source}
                        onChangeText={setSource}
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
                        title="Add Income"
                        onPress={handleAddIncome}
                        isLoading={isSubmitting}
                        disabled={!amount || !source}
                    />
                </View>
            </Modal>
        </SafeAreaView>
    );
}
