import {
    View,
    Text,
    Image,
    ScrollView,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    ToastAndroid,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../../firebaseConfig";
const Register = () => {
    const [googleLoading, setGoogleLoading] = useState(false);
    const navigation = useNavigation();

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
    });
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                await createUserWithEmailAndPassword(
                    auth,
                    values.email,
                    values.password
                );
                navigation.navigate("Login");
            } catch (error) {
                console.log(error);
                if (error.code === "auth/email-already-in-use") {
                    ToastAndroid.show(
                        "Email is already in use",
                        ToastAndroid.SHORT
                    );
                } else {
                    ToastAndroid.show(
                        "Something went wrong",
                        ToastAndroid.SHORT
                    );
                }
            }
        },
    });

    return (
        <View className='flex-1 '>
            <Image
                source={require("../../../assets/images/cinema2.jpg")}
                className='w-full h-[300px]'
            />
            <ScrollView className='-mt-[40px] p-8 flex-1 bg-white rounded-t-3xl'>
                <Text className='font-bold text-center py-2 font-slate-500 text-2xl'>
                    Register
                </Text>
                <Text className=' text-center  font-slate-500 text-base'>
                    Welcome to our Cinema App! Let's get you started
                </Text>
                <View className='mt-8 gap-3'>
                    <View>
                        <TextInput
                            onBlur={formik.handleBlur("name")}
                            value={formik.values.name}
                            onChangeText={formik.handleChange("name")}
                            placeholder='Name'
                            className='border-2 border-slate-900 rounded-md p-2 '
                        />
                        {formik.errors.name && (
                            <Text className='text-sm text-orange-700'>
                                {formik.errors.name}
                            </Text>
                        )}
                    </View>
                    <View>
                        <TextInput
                            onBlur={formik.handleBlur("email")}
                            value={formik.values.email}
                            onChangeText={formik.handleChange("email")}
                            placeholder='Email'
                            className='border-2 border-slate-900 rounded-md p-2'
                            keyboardType='email-address'
                        />
                        {formik.errors.email && (
                            <Text className='text-sm text-orange-700'>
                                {formik.errors.email}
                            </Text>
                        )}
                    </View>
                    <View>
                        <TextInput
                            onBlur={formik.handleBlur("password")}
                            value={formik.values.password}
                            onChangeText={formik.handleChange("password")}
                            placeholder='Password'
                            className='border-2 border-slate-900 rounded-md p-2'
                            secureTextEntry
                        />
                        {formik.errors.password && (
                            <Text className='text-sm text-orange-700'>
                                {formik.errors.password}
                            </Text>
                        )}
                    </View>
                </View>
                <View className='flex-row gap-1 justify-center items-center my-4'>
                    <Text className=' text-base  '>
                        Already have an acccount?
                    </Text>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text className='text-blue-600 text-base font-bold  '>
                            Sign In
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={formik.handleSubmit}
                        className='bg-blue-600 rounded-full p-2 mt-4 items-center'
                    >
                        {formik.isSubmitting ? (
                            <ActivityIndicator color='white' size='small' />
                        ) : (
                            <Text className='font-bold text-white '>
                                Sign Up
                            </Text>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity className='bg-orange-700 rounded-full p-2 mt-4 items-center'>
                        {googleLoading ? (
                            <ActivityIndicator color='white' size='small' />
                        ) : (
                            <View className='flex-row gap-3 items-center justify-center'>
                                <AntDesign
                                    name='google'
                                    size={24}
                                    color='black'
                                />
                                <Text className='font-bold text-white '>
                                    Sign up with google
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default Register;
