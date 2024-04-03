import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

const LoadingIndicator = () => {
    return (
        <View className='flex justify-center items-center w-full h-full'>
            <ActivityIndicator color={"darkblue"} />
        </View>
    );
};

export default LoadingIndicator;
