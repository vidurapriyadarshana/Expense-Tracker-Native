import { initializeApp, FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
//@ts-ignore - React Native specific import
import { initializeAuth, getReactNativePersistence } from '@firebase/auth/dist/rn/index.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
};

// Debug: Log Firebase config (without sensitive data)
console.log('[Firebase] Initializing with project:', process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID);
console.log('[Firebase] Platform:', Platform.OS);

const app: FirebaseApp = initializeApp(firebaseConfig);

// Initialize Auth based on platform
let auth: Auth;
if (Platform.OS === 'web') {
    // Use default auth for web
    const { getAuth: getWebAuth } = require('firebase/auth');
    auth = getWebAuth(app);
    console.log('[Firebase] Using web auth');
} else {
    // Use React Native specific auth with AsyncStorage persistence
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage)
    });
    console.log('[Firebase] Using RN auth with AsyncStorage');
}

// Note: Firestore is no longer used - all data is stored locally using AsyncStorage
// Only Firebase Auth is used for authentication

export { auth, app };
