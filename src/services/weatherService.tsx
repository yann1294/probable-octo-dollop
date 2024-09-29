import "text-encoding";
import { fetchWeatherApi } from "openmeteo";

export interface AirQualityData {
  time: Date[];
  pm10: Float32Array;
  pm25: Float32Array;
}

export const getAirQuality = async (
  latitude: number,
  longitude: number,
): Promise<AirQualityData | null> => {
  try {
    const params = {
      latitude,
      longitude,
      hourly: ["pm10", "pm2_5"],
    };
    const url = "https://air-quality-api.open-meteo.com/v1/air-quality";
    const responses = await fetchWeatherApi(url, params);

    // Process first location
    const response = responses[0];

    const utcOffsetSeconds = response.utcOffsetSeconds();
    const hourly = response.hourly()!;

    // Helper function to form time ranges
    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    const weatherData: AirQualityData = {
      time: range(
        Number(hourly.time()),
        Number(hourly.timeEnd()),
        hourly.interval(),
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
      pm10: hourly.variables(0)!.valuesArray()!,
      pm25: hourly.variables(1)!.valuesArray()!,
    };

    return weatherData;
  } catch (error) {
    console.error("Error fetching air quality data:", error);
    return null;
  }
};
