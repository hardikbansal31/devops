import React from 'react';
import { render, screen } from '@testing-library/react';
import WeatherCard from '../components/WeatherCard';
import { WeatherData } from '../types';

const mockWeather: WeatherData = {
  city: 'London',
  temperature: 15,
  humidity: 80,
  description: 'Cloudy',
  icon: '04d',
  forecast: [],
};

describe('WeatherCard', () => {
  it('renders weather data correctly', () => {
    render(<WeatherCard weather={mockWeather} />);
    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('15°C')).toBeInTheDocument();
    expect(screen.getByText('Cloudy')).toBeInTheDocument();
    expect(screen.getByText('Humidity: 80%')).toBeInTheDocument();
    expect(screen.getByAltText('Weather Icon')).toHaveAttribute(
      'src',
      'http://openweathermap.org/img/wn/04d.png'
    );
  });
});