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

export interface WaterQualityData {
  current: {
    time: Date;
    waveHeight: number;
    waveDirection: number;
    wavePeriod: number;
  };
  hourly: {
    time: Date[];
    waveHeight: Float32Array;
    waveDirection: Float32Array;
    wavePeriod: Float32Array;
    windWaveHeight: Float32Array;
    windWaveDirection: Float32Array;
    windWavePeriod: Float32Array;
    windWavePeakPeriod: Float32Array;
    swellWaveHeight: Float32Array;
    swellWaveDirection: Float32Array;
    swellWavePeriod: Float32Array;
    swellWavePeakPeriod: Float32Array;
    oceanCurrentVelocity: Float32Array;
    oceanCurrentDirection: Float32Array;
  };
  daily: {
    time: Date[];
    wavePeriodMax: Float32Array;
  };
}

export const getWaterQuality = async (
  latitude: number,
  longitude: number,
): Promise<WaterQualityData | null> => {
  try {
    const params = {
      latitude,
      longitude,
      current: ["wave_height", "wave_direction", "wave_period"],
      hourly: [
        "wave_height",
        "wave_direction",
        "wave_period",
        "wind_wave_height",
        "wind_wave_direction",
        "wind_wave_period",
        "wind_wave_peak_period",
        "swell_wave_height",
        "swell_wave_direction",
        "swell_wave_period",
        "swell_wave_peak_period",
        "ocean_current_velocity",
        "ocean_current_direction",
      ],
      daily: "wave_period_max",
      models: ["best_match", "meteofrance_wave", "meteofrance_currents"],
    };
    const url = "https://marine-api.open-meteo.com/v1/marine";
    const responses = await fetchWeatherApi(url, params);

    const response = responses[0];
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const current = response.current()!;
    const hourly = response.hourly()!;
    const daily = response.daily()!;

    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    const weatherData: WaterQualityData = {
      current: {
        time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
        waveHeight: current.variables(0)!.value(),
        waveDirection: current.variables(1)!.value(),
        wavePeriod: current.variables(2)!.value(),
      },
      hourly: {
        time: range(
          Number(hourly.time()),
          Number(hourly.timeEnd()),
          hourly.interval(),
        ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
        waveHeight: hourly.variables(0)!.valuesArray()!,
        waveDirection: hourly.variables(1)!.valuesArray()!,
        wavePeriod: hourly.variables(2)!.valuesArray()!,
        windWaveHeight: hourly.variables(3)!.valuesArray()!,
        windWaveDirection: hourly.variables(4)!.valuesArray()!,
        windWavePeriod: hourly.variables(5)!.valuesArray()!,
        windWavePeakPeriod: hourly.variables(6)!.valuesArray()!,
        swellWaveHeight: hourly.variables(7)!.valuesArray()!,
        swellWaveDirection: hourly.variables(8)!.valuesArray()!,
        swellWavePeriod: hourly.variables(9)!.valuesArray()!,
        swellWavePeakPeriod: hourly.variables(10)!.valuesArray()!,
        oceanCurrentVelocity: hourly.variables(11)!.valuesArray()!,
        oceanCurrentDirection: hourly.variables(12)!.valuesArray()!,
      },
      daily: {
        time: range(
          Number(daily.time()),
          Number(daily.timeEnd()),
          daily.interval(),
        ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
        wavePeriodMax: daily.variables(0)!.valuesArray()!,
      },
    };

    return weatherData;
  } catch (error) {
    console.error("Error fetching water quality data:", error);
    return null;
  }
};
