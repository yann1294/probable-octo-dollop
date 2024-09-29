import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import AirQuality from "../components/AirQuality";
import { getAirQuality } from "../services/weatherService";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { AirQualityData } from "../services/weatherService";

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [airQualityData, setAirQualityData] = useState<AirQualityData | null>(
    null,
  );
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    const lat = 40.7128; // Example: New York City
    const lon = -74.006;
    const data = await getAirQuality(lat, lon);
    setAirQualityData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text className="text-2xl font-bold mb-4">Environment Quality</Text>
        <AirQuality data={airQualityData} navigation={navigation} />
        <View className="h-4" />
        <Text className="text-lg font-semibold mb-2">Soil Quality</Text>
        <View className="bg-green-100 p-4 rounded-lg">
          <Text>Soil quality data coming soon...</Text>
        </View>
        <View className="h-4" />
        <Text className="text-lg font-semibold mb-2">Water Quality</Text>
        <View className="bg-blue-100 p-4 rounded-lg">
          <Text>Water quality data coming soon...</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
