// src/openmeteo.d.ts
declare module "openmeteo" {
  export function fetchWeatherApi(url: string, params: any): Promise<any[]>;
}
