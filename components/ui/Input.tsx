import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
}

const Input = ({ label, error, className, ...props }: InputProps) => {
    return (
        <View className="mb-4">
            {label && <Text className="text-sm font-medium text-gray-700 mb-1.5">{label}</Text>}
            <TextInput
                className={`h-11 border rounded-lg px-3 text-sm bg-white text-gray-900 ${error ? 'border-red-300' : 'border-gray-200 focus:border-blue-500'
                    } ${className}`}
                placeholderTextColor="#9ca3af"
                {...props}
            />
            {error && <Text className="text-xs text-red-500 mt-1">{error}</Text>}
        </View>
    );
};

export default Input;
