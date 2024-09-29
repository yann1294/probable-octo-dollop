import React from "react";
import { View, Text } from "react-native";

const WaterQualityScreen = () => {
  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold mb-4">Water Quality</Text>
      <View className="bg-blue-100 p-4 rounded-lg">
        <Text>Detailed water quality information will be available here.</Text>
      </View>
    </View>
  );
};

export default WaterQualityScreen;
