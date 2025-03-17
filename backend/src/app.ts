import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: './.env' }); // Explicitly specify path

interface AutocompleteResponse {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
}

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

// WeatherAPI.com configuration
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_BASE_URL = 'https://api.weatherapi.com/v1';

// Log the key to verify it's loaded
console.log('Loaded WEATHER_API_KEY:', WEATHER_API_KEY || 'Not found');

if (!WEATHER_API_KEY) {
  console.error('Error: WEATHER_API_KEY is not set in environment variables.');
  process.exit(1);
}

// Autocomplete endpoint
app.get('/api/autocomplete/:query', async (req, res) => {
  const { query } = req.params;
  console.log('Received autocomplete request for:', query);
  console.log('Using API key:', WEATHER_API_KEY); // Log key at runtime

  try {
    const response = await axios.get<AutocompleteResponse[]>(`${WEATHER_API_BASE_URL}/search.json`, {
      params: {
        key: WEATHER_API_KEY,
        q: query,
      },
    });
    console.log('WeatherAPI raw response:', response.data);
    const cities = response.data.map(item => item.name);
    console.log('Sending cities:', cities);
    res.json(cities);
  } catch (error) {
    console.error('Autocomplete error:', error);
    res.status(500).json({ error: 'Failed to fetch suggestions' });
  }
});

export default app;