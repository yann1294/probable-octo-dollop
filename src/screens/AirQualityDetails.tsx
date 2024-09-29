// src/screens/AirQualityDetails.tsx
import React from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

interface AirQualityData {
  time: Date[];
  pm10: Float32Array;
  pm25: Float32Array;
}

interface AirQualityDetailsProps {
  route: { params: { data: AirQualityData } };
}

type LineChartData = {
  labels: string[];
  datasets: {
    data: number[];
    color?: (opacity: number) => string;
    strokeWidth?: number;
  }[];
  legend: string[];
};

const AirQualityDetails: React.FC<AirQualityDetailsProps> = ({ route }) => {
  const { data } = route.params;

  const chartData: LineChartData = {
    labels: data.time.slice(0, 24).map((t) => t.getHours().toString()),
    datasets: [
      {
        data: Array.from(data.pm25.slice(0, 24)).map(Number),
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: Array.from(data.pm10.slice(0, 24)).map(Number),
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ["PM2.5", "PM10"],
  };

  const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726",
    },
  };

  return (
    <ScrollView className="flex-1 bg-blue-50 p-4">
      <Text className="text-2xl font-bold text-blue-800 mb-4">
        Air Quality Details
      </Text>
      <LineChart
        data={chartData}
        width={Dimensions.get("window").width - 32}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <View className="mt-4">
        <Text className="text-lg font-semibold text-blue-800 mb-2">
          Hourly Data
        </Text>
        {data.time.slice(0, 24).map((time: any, index: any) => (
          <View
            key={time.toISOString()}
            className="flex-row justify-between py-2 border-b border-blue-200"
          >
            <Text className="text-blue-600">{time.toLocaleTimeString()}</Text>
            <Text className="text-blue-800">
              PM2.5: {data.pm25[index].toFixed(2)}
            </Text>
            <Text className="text-blue-800">
              PM10: {data.pm10[index].toFixed(2)}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default AirQualityDetails;
