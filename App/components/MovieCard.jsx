import {
    View,
    Text,
    Touchable,
    TouchableOpacity,
    ImageBackground,
    Image,
} from "react-native";
import React from "react";
import { image_url } from "../../contants/CONSTANTS";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const MovieCard = ({ movie }) => {
    const navigation = useNavigation();
    const handlePress = () => {
        navigation.navigate("Details", { id: movie?.id });
    };
    return (
        <View className='m-2 w-full px-2'>
            <TouchableOpacity onPress={handlePress} className=''>
                <Image
                    className='h-[200px] w-full rounded-xl'
                    source={{
                        uri: movie?.backdrop_path
                            ? `${image_url}${movie?.backdrop_path}`
                            : `${image_url}${movie?.poster_path}`,
                    }}
                />
            </TouchableOpacity>
            <View>
                <Text className='text-lg font-bold'>
                    {movie?.title || movie?.name}
                </Text>
                <Text className='text-base font-thin '>
                    Release Date: {movie?.release_date || movie?.first_air_date}
                </Text>
            </View>
        </View>
    );
};

export default MovieCard;
