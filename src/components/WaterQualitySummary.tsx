import React from "react";
import { View, Text, ScrollView } from "react-native";
import { WaterQualityData } from "../services/weatherService";

interface WaterQualitySummaryProps {
  data: WaterQualityData;
}

const WaterQualitySummary: React.FC<WaterQualitySummaryProps> = ({ data }) => {
  const { current, hourly } = data;

  return (
    <ScrollView className="bg-blue-100 p-4 rounded-lg">
      <Text className="text-xl font-bold mb-4">Water Quality Summary</Text>

      <View className="mb-4">
        <Text className="text-lg font-semibold mb-2">Current Conditions</Text>
        <Text>Wave Height: {current.waveHeight.toFixed(2)} m</Text>
        <Text>Wave Direction: {current.waveDirection.toFixed(0)}°</Text>
        <Text>Wave Period: {current.wavePeriod.toFixed(1)} s</Text>
      </View>

      <View>
        <Text className="text-lg font-semibold mb-2">
          Hourly Forecast (Next 24 hours)
        </Text>
        {hourly.time.slice(0, 24).map((time, index) => (
          <View key={time.toISOString()} className="mb-2 p-2 bg-white rounded">
            <Text className="font-semibold">{time.toLocaleTimeString()}</Text>
            <Text>Wave Height: {hourly.waveHeight[index].toFixed(2)} m</Text>
            <Text>
              Wave Direction: {hourly.waveDirection[index].toFixed(0)}°
            </Text>
            <Text>Wave Period: {hourly.wavePeriod[index].toFixed(1)} s</Text>
            <Text>
              Wind Wave Height: {hourly.windWaveHeight[index].toFixed(2)} m
            </Text>
            <Text>
              Swell Wave Height: {hourly.swellWaveHeight[index].toFixed(2)} m
            </Text>
            <Text>
              Ocean Current Velocity:{" "}
              {hourly.oceanCurrentVelocity[index].toFixed(2)} m/s
            </Text>
            <Text>
              Ocean Current Direction:{" "}
              {hourly.oceanCurrentDirection[index].toFixed(0)}°
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default WaterQualitySummary;
