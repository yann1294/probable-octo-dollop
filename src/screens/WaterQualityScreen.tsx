// src/screens/WaterQualityScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { getWaterQuality, WaterQualityData } from "../services/weatherService";
import WaterQuality from "../components/WaterQuality";
import WaterQualitySummary from "../components/WaterQualitySummary";

const WaterQualityScreen = () => {
  const [waterQualityData, setWaterQualityData] =
    useState<WaterQualityData | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    // Example coordinates (you may want to use geolocation or let users input coordinates)
    const latitude = 54.544587;
    const longitude = 10.227487;
    const data = await getWaterQuality(latitude, longitude);
    setWaterQualityData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView
      className="flex-1 bg-gray-100"
      contentContainerStyle={{ padding: 16 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text className="text-2xl font-bold mb-4">Water Quality</Text>
      {waterQualityData ? (
        <>
          <WaterQuality data={waterQualityData} />
          <View className="h-4" />
          <WaterQualitySummary data={waterQualityData} />
        </>
      ) : (
        <View className="bg-blue-100 p-4 rounded-lg">
          <Text>Loading water quality information...</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default WaterQualityScreen;
