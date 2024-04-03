import { View, Text, ScrollView, Platform, FlatList } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import MainLayouts from "../../components/layouts/MainLayouts";
import useFetch from "../../../hooks/useFetch";
import MovieSlideCard from "../../components/MovieSlideCard";
import TvCardSlide from "../../components/TvCardSlide";
import LoadingIndicator from "../../components/LoadingIndicator";

const Homepage = () => {
    const { data, isLoading, error } = useFetch(
        `https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${process.env.API_KEY}`
    );
    const {
        data: series,
        isLoading: seriesLoading,
        error: seriesError,
    } = useFetch(
        `https://api.themoviedb.org/3/tv/on_the_air?language=en-US&api_key=${process.env.API_KEY}`
    );

    const {
        data: movies,
        isLoading: moviesLoading,
        error: moviesError,
    } = useFetch(
        `https://api.themoviedb.org/3/movie/now_playing?language=en-US&api_key=${process.env.API_KEY}`
    );

    return (
        <MainLayouts>
            <ScrollView className=''>
                <View className='my-4 p-4 w-full gap-2 flex-1'>
                    <Text className='text-2xl font-bold pb-4'>Trending</Text>
                    {isLoading ? (
                        <LoadingIndicator />
                    ) : (
                        <FlatList
                            data={data?.results}
                            keyExtractor={(item) => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ columnGap: 16 }}
                            renderItem={({ item }) => {
                                return item?.media_type === "movie" ? (
                                    <MovieSlideCard movie={item} />
                                ) : (
                                    <TvCardSlide serie={item} />
                                );
                            }}
                        />
                    )}
                </View>
                <View className='my-4 p-4 w-full gap-2 flex-1'>
                    <Text className='text-2xl font-bold pb-4'>
                        Now Playing Movies
                    </Text>
                    {isLoading ? (
                        <LoadingIndicator />
                    ) : (
                        <FlatList
                            data={movies?.results}
                            keyExtractor={(item) => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ columnGap: 16 }}
                            renderItem={({ item }) => {
                                return <MovieSlideCard movie={item} />;
                            }}
                        />
                    )}
                </View>
                <View className='my-4 p-4 w-full gap-2 pb-20 flex-1'>
                    <Text className='text-2xl font-bold pb-4'>
                        Tv Shows Airing Today
                    </Text>
                    {isLoading ? (
                        <LoadingIndicator />
                    ) : (
                        <FlatList
                            data={series?.results}
                            keyExtractor={(item) => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ columnGap: 16 }}
                            renderItem={({ item }) => {
                                return item?.media_type === "movie" ? (
                                    <MovieSlideCard movie={item} />
                                ) : (
                                    <TvCardSlide serie={item} />
                                );
                            }}
                        />
                    )}
                </View>
            </ScrollView>
        </MainLayouts>
    );
};

export default Homepage;
