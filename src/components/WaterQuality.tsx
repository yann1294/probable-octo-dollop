// src/components/WaterQuality.tsx
import React from "react";
import { View, Text } from "react-native";
import { WaterQualityData } from "../services/weatherService";

interface WaterQualityProps {
  data: WaterQualityData | null;
}

const WaterQuality: React.FC<WaterQualityProps> = ({ data }) => {
  if (!data) {
    return (
      <View className="bg-blue-200 p-4 rounded-lg">
        <Text className="text-lg font-bold">Water Quality</Text>
        <Text>Loading...</Text>
      </View>
    );
  }

  const { current } = data;

  return (
    <View className="bg-blue-200 p-4 rounded-lg">
      <Text className="text-lg font-bold mb-2">Water Quality</Text>
      <Text>Wave Height: {current.waveHeight.toFixed(2)} m</Text>
      <Text>Wave Direction: {current.waveDirection.toFixed(0)}°</Text>
      <Text>Wave Period: {current.wavePeriod.toFixed(1)} s</Text>
    </View>
  );
};
export default WaterQuality;
