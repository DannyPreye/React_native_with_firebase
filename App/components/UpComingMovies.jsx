import React from "react";
import useFetch from "../../hooks/useFetch";
import {
    ActivityIndicator,
    FlatList,
    SectionList,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import MovieCard from "./MovieCard";

const UpComingMovies = () => {
    const { data, isLoading, error, refetch } = useFetch(
        `${process.env.API_URL}/movie/upcoming?api_key=${process.env.API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
    );
    return (
        <View className='flex flex-col w-full  '>
            <Text className='font-bold text-2xl mb-4'>Upcoming Movies</Text>
            <View className='flex row flex-wrap'>
                {isLoading && (
                    <View className='flex justify-center items-center w-full h-full'>
                        <ActivityIndicator />
                    </View>
                )}
                {data?.results?.length > 0 &&
                    data?.results?.map((movie) => (
                        <MovieCard movie={movie} key={movie?.id} />
                    ))}
                {error && (
                    <TouchableOpacity
                        onPress={refetch}
                        className='flex justify-center items-center w-full h-full'
                    >
                        <Text>Reload</Text>
                    </TouchableOpacity>
                )}
            </View>
            {/* <FlatList
                numColumns={1}
                data={data?.results}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <MovieCard movie={item} />}
            ></FlatList> */}
        </View>
    );
};

export default UpComingMovies;
