# Expense Tracker Mobile App

A comprehensive mobile application built with React Native and Expo for tracking personal finances. Manage your income and expenses, visualize spending habits with charts, and secure your data with Firebase authentication.

## 🚀 Features

-   **Authentication**: Secure login and signup implementation using Firebase Auth.
-   **Dashboard**: Overview of current balance, total income, and total expenses.
-   **Transaction Tracking**: Add, edit, and view income and expense transactions.
-   **Expense Analysis**: Visual charts (Line, Pie) to track spending trends and category breakdowns.
-   **Budget Management**: (Implied) Monitor financial health.
-   **Responsive UI**: Modern interface capable of adapting to different device sizes.

## 🛠 Tech Stack & Libraries

This project uses a modern React Native stack centered around the Expo ecosystem.

### Core Framework
-   **[React Native](https://reactnative.dev/)**: Framework for building native apps using React.
-   **[Expo](https://expo.dev/)**: Platform and tools for building React Native apps.
-   **[Expo Router](https://docs.expo.dev/router/introduction/)**: File-based routing for React Native.

### State Management
-   **[Redux Toolkit](https://redux-toolkit.js.org/)**: Simplified state management for React.
-   **[React Redux](https://react-redux.js.org/)**: Official React bindings for Redux.

### Styling
-   **[NativeWind](https://www.nativewind.dev/)**: Tailwind CSS for React Native.
-   **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework.

### Backend & Data
-   **[Firebase](https://firebase.google.com/)**: Backend-as-a-Service for Authentication and Firestore Database.
-   **[Async Storage](https://react-native-async-storage.github.io/async-storage/)**: Unencrypted, asynchronous, persistent, key-value storage system.

### UI Components & Utilities
-   **[React Native Chart Kit](https://github.com/indiespirit/react-native-chart-kit)**: Charts for React Native.
-   **[@expo/vector-icons](https://docs.expo.dev/guides/icons/)**: Icons libraries.
-   **[Datetimepicker](https://github.com/react-native-datetimepicker/datetimepicker)**: Native date and time picker.

## 📂 File System Structure

```bash
expense-tracker-mobile/
├── app/                    # Expo Router screens and routes
│   ├── (auth)/             # Authentication routes (Login, Signup, etc.)
│   ├── (tabs)/             # Main tab navigation (Home, Transactions, Profile, etc.)
│   ├── _layout.tsx         # Root layout configuration
│   └── index.tsx           # Entry screen (Welcome/Slash)
├── components/             # Reusable UI components (Input, Buttons, Cards, Charts)
├── services/               # API service layers (Firebase interactions)
├── store/                  # Redux store configuration and slices
├── constants/              # App-wide constants (Colors, Fonts, Configs)
├── utils/                  # Helper functions and formatters
├── assets/                 # Static assets (Images, Fonts, Icons)
├── firebase.rules          # Firestore security rules
├── global.css              # Global styles (Tailwind imports)
└── package.json            # Dependencies and scripts
```

## ⚙️ Setup & Installation

Follow these steps to set up the project locally.

### Prerequisites

-   [Node.js](https://nodejs.org/)
-   [Expo Go](https://expo.dev/client) app on your mobile device (iOS/Android)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd expense-tracker-mobile
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Configuration:**
    -   Ensure you have a Firebase project set up.
    -   Update any necessary firebase configuration files in `services/` or `.env` if applicable.

### Running the App

1.  **Start the development server:**
    ```bash
    npx expo start
    ```

2.  **Run on Device/Emulator:**
    -   **Android**: Press `a` in the terminal (requires Android Studio/Emulator).
    -   **iOS**: Press `i` in the terminal (requires Xcode/Simulator on macOS).
    -   **Physical Device**: Scan the QR code with the Expo Go app.

## 📄 Scripts

-   `npm start`: Start the Expo server.
-   `npm run android`: Run on Android emulator/device.
-   `npm run ios`: Run on iOS simulator.
-   `npm run web`: Run app in the browser.

## 📱 Build & Deployment (APK)

This project uses **EAS (Expo Application Services)** for building the Android APK.

### 1. Install EAS CLI
If you haven't already, install the EAS CLI globally:
```bash
npm install -g eas-cli
```

### 2. Login to Expo
```bash
eas login
```

### 3. Configure the Project
Initialize the build configuration (this creates an `eas.json` file):
```bash
eas build:configure
```
*Select `Android` when prompted.*

### 4. Build the APK
To generate a standard APK for testing (side-loading), run:
```bash
eas build -p android --profile preview
```

> **Note**: You may need to adjust the `eas.json` to define the "preview" profile if it's not automatically created. A typical preview profile looks like this in `eas.json`:
> ```json
> "preview": {
>   "distribution": "internal",
>   "android": {
>     "buildType": "apk"
>   }
> }
> ```

