import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "types/navigation";

type AirQualityNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface AirQualityData {
  time: Date[];
  pm10: Float32Array;
  pm25: Float32Array;
}

interface AirQualityProps {
  data: AirQualityData | null;
}

const AirQuality: React.FC<AirQualityProps> = ({ data }) => {
  const navigation = useNavigation<AirQualityNavigationProp>();

  if (!data) {
    return (
      <View className="bg-blue-100 p-4 rounded-lg shadow-md">
        <Text className="text-lg font-bold text-blue-800">Air Quality</Text>
        <Text className="text-blue-600">Loading...</Text>
      </View>
    );
  }

  const latestPM10 = data.pm10[0].toFixed(2);
  const latestPM25 = data.pm25[0].toFixed(2);

  const getAirQualityStatus = (pm25: number) => {
    if (pm25 <= 12) return { status: "Good", color: "text-green-600" };
    if (pm25 <= 35.4) return { status: "Moderate", color: "text-yellow-600" };
    if (pm25 <= 55.4)
      return {
        status: "Unhealthy for Sensitive Groups",
        color: "text-orange-600",
      };
    if (pm25 <= 150.4) return { status: "Unhealthy", color: "text-red-600" };
    if (pm25 <= 250.4)
      return { status: "Very Unhealthy", color: "text-purple-600" };
    return { status: "Hazardous", color: "text-red-800" };
  };

  const { status, color } = getAirQualityStatus(parseFloat(latestPM25));

  return (
    <TouchableOpacity
      className="bg-blue-100 p-4 rounded-lg shadow-md"
      onPress={() => navigation.navigate("AirQualityDetails", { data })}
    >
      <Text className="text-lg font-bold text-blue-800 mb-2">Air Quality</Text>
      <Text className={`text-xl font-semibold ${color}`}>{status}</Text>
      <View className="flex-row justify-between mt-2">
        <View>
          <Text className="text-blue-600">PM2.5</Text>
          <Text className="text-lg font-bold">{latestPM25}</Text>
        </View>
        <View>
          <Text className="text-blue-600">PM10</Text>
          <Text className="text-lg font-bold">{latestPM10}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AirQuality;
