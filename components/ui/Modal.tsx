import React from 'react';
import { View, Text, Modal as RNModal, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ModalProps } from '../../types';

const Modal = ({ visible, onClose, title, children }: ModalProps) => {
    return (
        <RNModal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View className="flex-1 justify-center items-center bg-black/50 p-4">
                <View className="bg-white rounded-2xl w-full max-w-md max-h-[90%] shadow-xl">
                    <View className="flex-row items-center justify-between p-4 border-b border-gray-100">
                        <Text className="text-xl font-bold text-gray-900">{title}</Text>
                        <TouchableOpacity
                            onPress={onClose}
                            className="p-1 rounded-full hover:bg-gray-100 bg-gray-50"
                        >
                            <Ionicons name="close" size={20} color="#6b7280" />
                        </TouchableOpacity>
                    </View>
                    <ScrollView className="p-4" keyboardShouldPersistTaps="handled">
                        {children}
                    </ScrollView>
                </View>
            </View>
        </RNModal>
    );
};

export default Modal;
