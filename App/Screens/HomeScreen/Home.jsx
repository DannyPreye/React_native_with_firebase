import {
    View,
    Text,
    Platform,
    TouchableOpacity,
    TextInput,
    FlatList,
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

const Home = () => {
    const { user } = useAuthentication();

    const { data, loading, error, refetch } = useFetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
    );

    const handleSiginOut = async () => {
        signOut(auth);
    };

    console.log(loading);

    return (
        <SafeAreaView
            style={{
                marginTop:
                    Platform.OS === "android" ? StatusBar.currentHeight : 0,
            }}
        >
            <View className='flex-col  h-full '>
                <View className='flex-row items-center justify-between px-2'>
                    <View className='flex-row items-center'>
                        <TouchableOpacity className='h-8 w-8 bg-gray-300 rounded-full justify-center items-center'>
                            <AntDesign name='user' size={15} color='black' />
                        </TouchableOpacity>
                        <Text className='text-lg font-bold'>
                            {" "}
                            Hi {user?.displayName}
                        </Text>
                    </View>
                    <TextInput
                        className='w-2/3 rounded-md p-2 border-gray-300 border-[1px]'
                        placeholder='Search...'
                    />
                    <TouchableOpacity
                        onPress={handleSiginOut}
                        className='h-8 w-8 bg-red-800 rounded-full justify-center items-center'
                    >
                        <AntDesign name='logout' size={15} color='white' />
                    </TouchableOpacity>
                </View>
                <View className='my-4 p-4 w-full flex-1'>
                    <Text className='font-bold text-2xl mb-4'>
                        Trending Movies
                    </Text>
                    <View className=''>
                        {/* {data?.results?.map((movie) => (
                            <MovieSlideCard movie={movie} />
                        ))} */}
                        {loading ? (
                            <Text>Loading...</Text>
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
            </View>
        </SafeAreaView>
    );
};

export default Home;
