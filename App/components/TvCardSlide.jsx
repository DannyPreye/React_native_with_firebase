import {
    View,
    Text,
    ImageBackground,
    Touchable,
    TouchableOpacity,
} from "react-native";
import React from "react";
import { image_url } from "../../contants/CONSTANTS";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const TvCardSlide = ({ serie }) => {
    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate(`SeriesDetails`, { id: serie?.id });
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            className='w-[256px] h-[256px] rounded-[12px] overflow-hidden'
        >
            <ImageBackground
                source={{
                    uri: serie?.backdrop_path
                        ? `${image_url}${serie?.backdrop_path}`
                        : `${image_url}${serie?.poster_path}`,
                }}
                className='flex-1'
            >
                <LinearGradient
                    className='flex-1    j '
                    colors={[
                        "rgba(34, 36, 47, 0) ",
                        "rgba(34, 36, 47, 0.48)",
                        "rgba(34, 36, 47, 0.46)",
                        "rgba(34, 36, 47, 0.46)",
                    ]}
                >
                    <View className='flex-1 p-3  justify-end'>
                        <View className='flex-row gap-3'>
                            <Text
                                ellipsizeMode='clip'
                                className='font-bold text-gray-200'
                            >
                                Title:
                            </Text>
                            <Text className='font-bold text-gray-200'>
                                {serie?.original_name || serie?.name}
                            </Text>
                        </View>
                        <View className='flex-row gap-3'>
                            <Text className='font-bold text-gray-200'>
                                Language:
                            </Text>
                            <Text className='font-bold text-gray-200'>
                                {serie?.original_language}
                            </Text>
                        </View>

                        <View className='flex-row gap-3'>
                            <Text className='font-bold text-gray-200'>
                                Release Date:
                            </Text>
                            <Text className='font-bold text-gray-200'>
                                {serie?.first_air_date
                                    ?.split("-")
                                    ?.reverse()
                                    ?.join("/")}
                            </Text>
                        </View>
                    </View>
                </LinearGradient>
            </ImageBackground>
        </TouchableOpacity>
    );
};

export default TvCardSlide;
