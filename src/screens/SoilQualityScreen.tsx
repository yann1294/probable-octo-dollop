import React from "react";
import { View, Text } from "react-native";

const SoilQualityScreen = () => {
  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold mb-4">Soil Quality</Text>
      <View className="bg-green-100 p-4 rounded-lg">
        <Text>Detailed soil quality information will be available here.</Text>
      </View>
    </View>
  );
};

export default SoilQualityScreen;
