import { View, Text, ScrollView, Platform } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import MainLayouts from "../../components/layouts/MainLayouts";

const Homepage = () => {
    return <MainLayouts></MainLayouts>;
};

export default Homepage;
