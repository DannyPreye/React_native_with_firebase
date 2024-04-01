import {
    View,
    Text,
    ScrollView,
    FlatList,
    ActivityIndicator,
} from "react-native";
import React from "react";
import MainLayouts from "../../components/layouts/MainLayouts";
import useFetch from "../../../hooks/useFetch";
import TvCardSlide from "../../components/TvCardSlide";

const TvSeries = () => {
    const { data, isLoading, error, refetch } = useFetch(
        `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
    );
    const {
        data: upcoming,
        isLoading: upcomingLoading,
        error: upcomingError,
        refetch: upcomingRefresh,
    } = useFetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
    );

    const {
        data: today,
        isLoading: todayLoading,
        error: todayError,
        refetch: todayRefresh,
    } = useFetch(
        `https://api.themoviedb.org/3/tv/airing_today?api_key=${process.env.API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
    );

    return (
        <MainLayouts>
            <ScrollView className=''>
                <View className='my-4 p-4 w-full gap-2 flex-1'>
                    <Text className='text-2xl font-bold'>Trending Series</Text>
                    {isLoading && (
                        <View className='flex justify-center items-center w-full h-full'>
                            <ActivityIndicator size={"large"} />
                        </View>
                    )}
                    {data?.results?.length > 0 && (
                        <FlatList
                            data={data?.results}
                            keyExtractor={(item) => item.id}
                            ref={refetch}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ columnGap: 16 }}
                            renderItem={({ item }) => (
                                <TvCardSlide serie={item} />
                            )}
                        />
                    )}
                </View>
                <View className='my-4 p-4 w-full gap-2 flex-1 '>
                    <Text className='text-2xl font-bold'>Airing Today</Text>
                    {todayLoading && (
                        <View className='flex justify-center items-center w-full h-full'>
                            <ActivityIndicator size={"large"} />
                        </View>
                    )}
                    {today?.results?.length > 0 && (
                        <FlatList
                            data={today?.results}
                            keyExtractor={(item) => item.id}
                            ref={refetch}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ columnGap: 16 }}
                            renderItem={({ item }) => (
                                <TvCardSlide serie={item} />
                            )}
                        />
                    )}
                </View>
                <View className='my-4 p-4 w-full gap-2 flex-1 pb-20'>
                    <Text className='text-2xl font-bold'>Popular Series</Text>
                    <FlatList
                        data={upcoming?.results}
                        keyExtractor={(item) => item.id}
                        ref={refetch}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ columnGap: 16 }}
                        renderItem={({ item }) => <TvCardSlide serie={item} />}
                    />
                </View>
            </ScrollView>
        </MainLayouts>
    );
};

export default TvSeries;
