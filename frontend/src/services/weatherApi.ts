// frontend/src/services/weatherApi.ts
import axios from 'axios';
import { WeatherData, ForecastData } from '../types';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || 'YOUR_API_KEY_HERE';
const BASE_URL = 'https://api.weatherapi.com/v1';

export const fetchWeather = async (city: string): Promise<WeatherData> => {
  try {
    console.log('Fetching weather for city:', city, 'with API key:', API_KEY);

    // Fetch current weather
    const weatherResponse = await axios.get(`${BASE_URL}/current.json`, {
      params: {
        key: API_KEY,
        q: city,
      },
    });
    console.log('Weather API raw response:', weatherResponse.data);

    // Fetch forecast (5 days)
    const forecastResponse = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: city,
        days: 5,
      },
    });
    console.log('Forecast API raw response:', forecastResponse.data);

    const weatherData = weatherResponse.data;
    const forecastData = forecastResponse.data.forecast.forecastday;

    const forecast: ForecastData[] = forecastData.map((day: any) => ({
      date: day.date,
      temperature: day.day.avgtemp_c,
      description: day.day.condition.text,
      icon: `https:${day.day.condition.icon}`, // Add https: prefix
    }));

    const result: WeatherData = {
      city: weatherData.location.name,
      temperature: weatherData.current.temp_c,
      description: weatherData.current.condition.text,
      icon: `https:${weatherData.current.condition.icon}`,
      humidity: weatherData.current.humidity,
      windSpeed: weatherData.current.wind_kph,
      pressure: weatherData.current.pressure_mb,
      forecast,
    };
    console.log('Processed weather data:', result);
    return result;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error; // Let Home.tsx handle the error
  }
};