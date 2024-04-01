import {
    View,
    Text,
    Image,
    ActivityIndicator,
    ImageBackground,
    ScrollView,
} from "react-native";
import React from "react";
import useFetch from "../../../hooks/useFetch";
import { LinearGradient } from "expo-linear-gradient";
import { image_url } from "../../../contants/CONSTANTS";

const Details = ({ navigation, route }) => {
    const id = route.params.id;
    const { data, loading, error } = useFetch(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${process.env.API_KEY}`
    );

    if (loading) {
        return (
            <View>
                <ActivityIndicator size={100} color={"#000000"} />
            </View>
        );
    }

    return (
        <View className='flex-1 '>
            <View className='h-[400px]  '>
                <ImageBackground
                    source={{
                        uri: data?.backdrop_path
                            ? `${image_url}${data?.backdrop_path}`
                            : `${image_url}${data?.poster_path}`,
                    }}
                    className='flex-1'
                >
                    <LinearGradient
                        className='flex-1 p-2 pb-6   j '
                        colors={[
                            "rgba(34, 36, 47, 0) ",
                            "rgba(34, 36, 47, 0.48)",
                            "rgba(34, 36, 47, 0.56)",
                            "rgba(34, 36, 47, 0.56)",
                        ]}
                    >
                        <View className='flex-1 p-3  justify-end'>
                            <View className='flex-row gap-3'>
                                <Text className='font-bold text-gray-200'>
                                    Title:
                                </Text>
                                <Text className='font-bold text-gray-200'>
                                    {data?.title}
                                </Text>
                            </View>
                            <View className='flex-row gap-3'>
                                <Text className='font-bold text-gray-200'>
                                    Language:
                                </Text>
                                <Text className='font-bold text-gray-200'>
                                    {data?.original_language}
                                </Text>
                            </View>
                            <View className='flex-row gap-3'>
                                <Text className='font-bold text-gray-200'>
                                    Country:
                                </Text>
                                <Text className='font-bold text-gray-200'>
                                    {data?.production_countries[0]?.name}
                                </Text>
                            </View>
                            <View className='flex-row gap-3'>
                                <Text className='font-bold text-gray-200'>
                                    Release Date:
                                </Text>
                                <Text className='font-bold text-gray-200'>
                                    {data?.release_date
                                        .split("-")
                                        .reverse()
                                        .join("/")}
                                </Text>
                            </View>
                            <View className='flex-row items-center flex-wrap gap-[1.5px]'>
                                <Text className='font-bold text-gray-200'>
                                    Genres:
                                </Text>

                                <Text className='font-bold text-gray-200'>
                                    {data?.genres.map((genre) => (
                                        <Text>{genre?.name} , </Text>
                                    ))}
                                </Text>
                            </View>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </View>
            <View className='flex-1 h-full p-4 bg-white -mt-[20px]  rounded-t-3xl '>
                <ScrollView>
                    <Text className='font-bold text-2xl mb-2 mt-4 text-gray-500'>
                        Plot
                    </Text>
                    <Text className='text-md text-gray-500 mb-4'>
                        {data?.overview}
                    </Text>
                </ScrollView>
            </View>
        </View>
    );
};

export default Details;
