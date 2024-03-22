import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { image_url } from "../../contants/CONSTANTS";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const MovieSlideCard = ({ movie }) => {
    const navigation = useNavigation();
    const handlePress = () => {
        navigation.navigate("Details", { id: movie?.id });
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            className='w-[256px] h-[256px] rounded-[12px] overflow-hidden bg-red-700 '
        >
            <ImageBackground
                source={{
                    uri: movie?.backdrop_path
                        ? `${image_url}${movie?.backdrop_path}`
                        : `${image_url}${movie?.poster_path}`,
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
                            <Text className='font-bold text-gray-200'>
                                Title:
                            </Text>
                            <Text className='font-bold text-gray-200'>
                                {movie?.title}
                            </Text>
                        </View>
                        <View className='flex-row gap-3'>
                            <Text className='font-bold text-gray-200'>
                                Language:
                            </Text>
                            <Text className='font-bold text-gray-200'>
                                {movie?.original_language}
                            </Text>
                        </View>

                        <View className='flex-row gap-3'>
                            <Text className='font-bold text-gray-200'>
                                Release Date:
                            </Text>
                            <Text className='font-bold text-gray-200'>
                                {movie?.release_date
                                    .split("-")
                                    .reverse()
                                    .join("/")}
                            </Text>
                        </View>
                    </View>
                </LinearGradient>
            </ImageBackground>
        </TouchableOpacity>
    );
};

export default MovieSlideCard;
