import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, SafeAreaView, ScrollView } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../services/firebase';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/authSlice';

export default function Signup() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSignup = async () => {
        if (!fullName || !email || !password) {
            setError('Please fill in all fields');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            // 1. Create auth user
            console.log('Creating auth user...');
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('Auth user created:', user.uid);

            // 2. Update profile with display name
            console.log('Updating profile...');
            await updateProfile(user, {
                displayName: fullName,
            });
            console.log('Profile updated');

            // 3. Update Redux state
            dispatch(setUser({
                uid: user.uid,
                email: user.email,
                displayName: fullName,
                photoURL: user.photoURL,
            }));

            Alert.alert('Success', 'Account created successfully!');
            router.replace('/(tabs)');
        } catch (err: any) {
            console.error('Signup error:', err);
            const errorMessage = err.message || 'Failed to create account';
            setError(errorMessage);
            Alert.alert('Signup Error', errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
                <View className="items-center mb-8">
                    <Text className="text-3xl font-bold text-gray-900 mb-2">Create Account</Text>
                    <Text className="text-gray-500 text-center">
                        Join TrackIt today and start managing your finances effectively
                    </Text>
                </View>

                <View className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
                    <Input
                        label="Full Name"
                        placeholder="John Doe"
                        value={fullName}
                        onChangeText={setFullName}
                        autoCapitalize="words"
                        error={error && !fullName ? 'Name is required' : ''}
                    />

                    <Input
                        label="Email Address"
                        placeholder="john@example.com"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <Input
                        label="Password"
                        placeholder="••••••••"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <Button
                        title="Sign Up"
                        onPress={handleSignup}
                        isLoading={isLoading}
                        variant="primary"
                        className="mt-2"
                    />
                </View>

                <View className="flex-row justify-center mt-4">
                    <Text className="text-gray-600">Already have an account? </Text>
                    <Link href="/login" asChild>
                        <TouchableOpacity>
                            <Text className="text-blue-600 font-bold">Sign In</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
