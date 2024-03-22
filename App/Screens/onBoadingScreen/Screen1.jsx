import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Screen1 = (props) => {
    const navigation = useNavigation();

    return (
        <View className='w-full'>
            <Image
                source={require("../../../assets/images/cinema.jpg")}
                className='w-full mx-auto  h-[400px] object-cover'
            />
            <View className='p-8 shadow-md bg-gray-200 w-full rounded-t-3xl h-full xl -mt-[20px]'>
                <Text className='text-[35px] font-bold text-center'>
                    Community Market Place
                </Text>
                <Text className='text-center text-[18px] text-slate-500 mt-6'>
                    {" "}
                    Buy Sell Marketplace where you can sell old item and make
                    real money
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("register");
                    }}
                    className='p-3 bg-blue-500 rounded-full mt-20 shadow-md'
                >
                    <Text className='text-white  font-semibold text-center text-[18px]'>
                        Get Started
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Screen1;
