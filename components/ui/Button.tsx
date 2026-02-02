import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { ButtonProps } from '../../types';

const Button = ({
    title,
    onPress,
    variant = 'primary',
    isLoading,
    disabled,
    className
}: ButtonProps) => {
    const baseStyles = "flex-row items-center justify-center py-3 px-4 rounded-lg";
    const variantStyles = {
        primary: "bg-primary",
        secondary: "bg-white border border-gray-200",
        ghost: "bg-transparent",
    };

    const textStyles = {
        primary: "text-white font-medium",
        secondary: "text-gray-900 font-medium",
        ghost: "text-gray-700 font-medium",
    };

    return (
        <TouchableOpacity
            className={`${baseStyles} ${variantStyles[variant]} ${disabled ? 'opacity-50' : ''} ${className}`}
            onPress={onPress}
            disabled={disabled || isLoading}
            activeOpacity={0.7}
        >
            {isLoading ? (
                <ActivityIndicator color={variant === 'primary' ? '#fff' : '#0f172a'} size="small" />
            ) : (
                <Text className={`${textStyles[variant]} text-base`}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

export default Button;
