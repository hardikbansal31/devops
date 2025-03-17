// frontend/src/types.ts
export interface ForecastData {
  date: string;        // e.g., "2025-03-18"
  temperature: number; // e.g., 16
  description: string; // e.g., "Sunny"
  icon: string;        // e.g., "https://cdn.weatherapi.com/weather/64x64/day/113.png"
}

export interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  forecast: ForecastData[];
}