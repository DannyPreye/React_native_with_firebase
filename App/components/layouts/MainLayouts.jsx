import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuthentication from "../../../hooks/useAuthentication";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

const MainLayouts = ({ children }) => {
    const { user } = useAuthentication();
    const handleSiginOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.log(error);
            alert("Something went wrong!");
            return;
        }
    };
    return (
        <SafeAreaView
            style={{
                marginTop:
                    Platform.OS === "android" ? StatusBar.currentHeight : 0,
            }}
        >
            <View className='flex-row items-center justify-between px-2 py-4'>
                <View className='flex-row items-center'>
                    <TouchableOpacity className='h-8 w-8 bg-gray-300 rounded-full justify-center items-center'>
                        <AntDesign name='user' size={15} color='black' />
                    </TouchableOpacity>
                </View>
                <TextInput
                    className='w-2/3 rounded-md p-2 border-gray-300 border-[1px]'
                    placeholder='Search...'
                />
                <TouchableOpacity
                    onPress={handleSiginOut}
                    className='h-8 w-8 bg-red-800 rounded-full justify-center items-center'
                >
                    <AntDesign name='logout' size={15} color='white' />
                </TouchableOpacity>
            </View>
            {children}
        </SafeAreaView>
    );
};

export default MainLayouts;
