import axios from 'axios';

export class WeatherService {
  private apiKey: string = process.env.WEATHER_API_KEY || '';
  private baseUrl: string = 'http://api.weatherapi.com/v1';

  async getWeather(city: string) {
    const url = `${this.baseUrl}/forecast.json?key=${this.apiKey}&q=${city}&days=5&aqi=no&alerts=no`;
    const response = await axios.get(url);
    const data = response.data;

    const current = data.current;
    const forecast = data.forecast.forecastday.map((day: any) => ({
      date: day.date,
      temperature: day.day.avgtemp_c,
      description: day.day.condition.text,
      icon: `https:${day.day.condition.icon}`,
    }));

    return {
      city: data.location.name,
      temperature: current.temp_c,
      humidity: current.humidity,
      description: current.condition.text,
      icon: `https:${current.condition.icon}`,
      windSpeed: current.wind_kph,
      pressure: current.pressure_mb,
      forecast,
    };
  }

  async getAutocomplete(query: string) {
    const url = `${this.baseUrl}/search.json?key=${this.apiKey}&q=${query}`;
    const response = await axios.get(url);
    return response.data;
  }
}