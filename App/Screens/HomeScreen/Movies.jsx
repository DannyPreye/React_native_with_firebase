import {
    View,
    Text,
    Platform,
    TouchableOpacity,
    TextInput,
    FlatList,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import React from "react";
import useAuthentication from "../../../hooks/useAuthentication";
import { signOut } from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import { auth } from "../../../firebaseConfig";
import useFetch from "../../../hooks/useFetch";
import MovieSlideCard from "../../components/MovieSlideCard";
import UpComingMovies from "../../components/UpComingMovies";
import MainLayouts from "../../components/layouts/MainLayouts";

const Movies = () => {
    const { user } = useAuthentication();

    const { data, isLoading, error, refetch } = useFetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
    );

    const handleSiginOut = async () => {
        signOut(auth);
    };

    return (
        <MainLayouts>
            <ScrollView className='flex-col  h-full '>
                <View className='my-4 p-4 w-full flex-1'>
                    <Text className='font-bold text-2xl mb-4'>
                        Trending Movies
                    </Text>
                    <View className=''>
                        {/* {data?.results?.map((movie) => (
                            <MovieSlideCard movie={movie} />
                        ))} */}
                        {isLoading ? (
                            <View className='flex justify-center items-center w-full h-full'>
                                <ActivityIndicator />
                            </View>
                        ) : (
                            <FlatList
                                data={data?.results}
                                keyExtractor={(item) => item.id}
                                ref={refetch}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ columnGap: 16 }}
                                renderItem={({ item }) => (
                                    <MovieSlideCard movie={item} />
                                )}
                            />
                        )}
                    </View>
                </View>
                <View className='my-4 p-4 pb-8 w-full flex-1'>
                    <UpComingMovies />
                </View>
            </ScrollView>
        </MainLayouts>
    );
};

export default Movies;
