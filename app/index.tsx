import { Redirect } from 'expo-router';
import { useAppSelector } from '../store/hooks';
import { ActivityIndicator, View } from 'react-native';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useDispatch } from 'react-redux';
import { setUser, setLoading } from '../store/slices/authSlice';

export default function Index() {
    const { user, isLoading } = useAppSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [isAuthCheckComplete, setIsAuthCheckComplete] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                dispatch(setUser({
                    uid: currentUser.uid,
                    email: currentUser.email,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                }));
            } else {
                dispatch(setUser(null));
            }
            dispatch(setLoading(false));
            setIsAuthCheckComplete(true);
        });

        return () => unsubscribe();
    }, [dispatch]);

    if (isLoading || !isAuthCheckComplete) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <ActivityIndicator size="large" color="#0f172a" />
            </View>
        );
    }

    if (user) {
        return <Redirect href="/(tabs)" />;
    }

    return <Redirect href="/(auth)/login" />;
}
