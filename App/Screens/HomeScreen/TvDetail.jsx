import {
    View,
    Text,
    ActivityIndicator,
    ImageBackground,
    ScrollView,
    FlatList,
} from "react-native";
import React from "react";
import useFetch from "../../../hooks/useFetch";
import { LinearGradient } from "expo-linear-gradient";
import { image_url } from "../../../contants/CONSTANTS";

const TvDetail = ({ navigation, route }) => {
    const id = route.params.id;
    const { data, isLoading, error } = useFetch(
        `https://api.themoviedb.org/3/tv/${id}?language=en-US&api_key=${process.env.API_KEY}`
    );

    if (isLoading) {
        return (
            <View className='justify-center h-full flex-1 items-center'>
                <ActivityIndicator size={100} color={"#0047AB"} />
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
                                    {data?.original_name || data?.name}
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
                                    {data?.first_air_date
                                        ?.split("-")
                                        ?.reverse()
                                        ?.join("/")}
                                </Text>
                            </View>
                            <View className='flex-row items-center flex-wrap gap-2'>
                                <Text className='font-bold text-gray-200'>
                                    Genres:
                                </Text>

                                <Text className='font-bold text-gray-200'>
                                    {data?.genres.map((genre, index) => (
                                        <Text key={genre?.id}>
                                            {genre?.name}
                                            {data?.genres.length - 1 === index
                                                ? ""
                                                : ", "}
                                        </Text>
                                    ))}
                                </Text>
                            </View>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </View>
            <View className='flex-1 h-full p-4 bg-white -mt-[20px]  rounded-t-3xl '>
                <ScrollView>
                    <Text className='font-bold text-2xl mb-2 mt-4'>Plot</Text>
                    <Text className='text-md text-gray-500 mb-4'>
                        {data?.overview}
                    </Text>

                    <Text className='mt-6 text-2xl font-bold mb-3'>
                        Seasons
                    </Text>

                    <FlatList
                        data={data?.seasons}
                        keyExtractor={({ id }) => id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ columnGap: 16 }}
                        renderItem={({ item }) => (
                            <View className='w-[256px] h-[256px] rounded-[12px] overflow-hidden'>
                                <ImageBackground
                                    source={{
                                        uri: item?.poster_path
                                            ? `${image_url}${item?.poster_path}`
                                            : `${image_url}${data?.poster_path}`,
                                    }}
                                    className='w-full h-full'
                                >
                                    <LinearGradient
                                        className='flex-1    justify-end p-2 '
                                        colors={[
                                            "rgba(34, 36, 47, 0) ",
                                            "rgba(34, 36, 47, 0.48)",
                                            "rgba(34, 36, 47, 0.46)",
                                            "rgba(34, 36, 47, 0.46)",
                                        ]}
                                    >
                                        <Text className='text-lg font-bold text-gray-200'>
                                            {item?.name}
                                        </Text>
                                        <Text className='text-md text-gray-200  font-bold '>
                                            No. of Episodes:{" "}
                                            {item?.episode_count}
                                        </Text>
                                        <Text className='text-md text-gray-200  font-bold mb-3'>
                                            Air Date:{" "}
                                            {item?.air_date
                                                ?.split("-")
                                                ?.reverse()
                                                ?.join("/")}
                                        </Text>
                                    </LinearGradient>
                                </ImageBackground>
                            </View>
                        )}
                    />
                </ScrollView>
            </View>
        </View>
    );
};

export default TvDetail;
