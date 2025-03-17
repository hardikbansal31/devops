import { Request, Response } from 'express';
import { WeatherService } from '../services/weatherService';

const weatherService = new WeatherService();

export const getWeather = async (req: Request, res: Response) => {
  try {
    const { city } = req.params;
    const weatherData = await weatherService.getWeather(city);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};

export const getAutocomplete = async (req: Request, res: Response) => {
  try {
    const { query } = req.params;
    const suggestions = await weatherService.getAutocomplete(query);
    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch suggestions' });
  }
};