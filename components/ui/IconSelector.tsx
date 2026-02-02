import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { IconSelectorProps } from '../../types';

const IconSelector = ({ icons, selectedIcon, onSelect }: IconSelectorProps) => {
    return (
        <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">Select Icon</Text>
            <View className="flex-row flex-wrap gap-2">
                {icons.map((icon) => (
                    <TouchableOpacity
                        key={icon}
                        className={`w-12 h-12 rounded-xl items-center justify-center border-2 ${selectedIcon === icon
                                ? 'bg-blue-50 border-blue-500'
                                : 'bg-gray-100 border-transparent'
                            }`}
                        onPress={() => onSelect(icon)}
                    >
                        <Text className="text-2xl">{icon}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default IconSelector;
