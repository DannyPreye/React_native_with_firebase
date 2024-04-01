import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Homepage from "./Homepage";
import Movies from "./Movies";
import TvSeries from "./TvSeries";
import { MaterialIcons } from "@expo/vector-icons";

const Home = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarLabel: "",
            }}
        >
            <Tab.Screen
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name='home' size={size} color={color} />
                    ),
                }}
                name='Home'
                component={Homepage}
            />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name='movie' size={size} color={color} />
                    ),
                }}
                name='Movies'
                component={Movies}
            />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <MaterialIcons
                            name='live-tv'
                            size={size}
                            color={color}
                        />
                    ),
                }}
                name='Series'
                component={TvSeries}
            />
        </Tab.Navigator>
    );
};

export default Home;
