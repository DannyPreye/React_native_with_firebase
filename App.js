import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { getAuth } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import Screen1 from "./App/Screens/onBoadingScreen/Screen1";
import app from "./firebaseConfig";
import Home from "./App/Screens/HomeScreen/Home";
import Login from "./App/Screens/authScreens/Login";
import Register from "./App/Screens/authScreens/Register";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Details from "./App/Screens/HomeScreen/Details";
import TvDetail from "./App/Screens/HomeScreen/TvDetail";

export default function App() {
    const Stack = createNativeStackNavigator();
    const auth = getAuth(app);
    const [initializing, setInitializing] = React.useState(true);
    const [user, setUser] = React.useState(null);

    const onAuthChangeHandler = (user) => {
        setUser(user);
        if (initializing) {
            setInitializing(false);
        }
    };

    React.useEffect(() => {
        auth.onAuthStateChanged(onAuthChangeHandler);
    }, []);

    if (initializing) {
        return (
            <View className='flex-1 bg-white items-start justify-center'>
                <ActivityIndicator size='large' color='#0000ff' />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {user ? (
                    <>
                        <Stack.Screen name='Home' component={Home} />
                        <Stack.Screen name='Details' component={Details} />
                        <Stack.Screen
                            name='SeriesDetails'
                            component={TvDetail}
                        />
                    </>
                ) : (
                    <>
                        <Stack.Screen name='Onboarding' component={Screen1} />
                        <Stack.Screen name='Login' component={Login} />
                        <Stack.Screen name='register' component={Register} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
