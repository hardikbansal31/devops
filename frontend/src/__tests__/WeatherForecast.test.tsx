import React from 'react';
import { render, screen } from '@testing-library/react';
import WeatherForecast from '../components/WeatherForecast';
import { ForecastData } from '../types';

const mockForecast: ForecastData[] = [
  {
    date: '2025-03-17 12:00:00',
    temperature: 16,
    description: 'Sunny',
    icon: '01d',
  },
  {
    date: '2025-03-18 12:00:00',
    temperature: 18,
    description: 'Clear',
    icon: '01n',
  },
];

describe('WeatherForecast', () => {
  it('renders forecast data correctly', () => {
    render(<WeatherForecast forecast={mockForecast} />);
    expect(screen.getByText('3/17/2025')).toBeInTheDocument();
    expect(screen.getByText('16°C')).toBeInTheDocument();
    expect(screen.getByText('Sunny')).toBeInTheDocument();
    expect(screen.getAllByAltText('Weather Icon')[0]).toHaveAttribute(
      'src',
      'http://openweathermap.org/img/wn/01d.png'
    );
    expect(screen.getByText('3/18/2025')).toBeInTheDocument();
    expect(screen.getByText('18°C')).toBeInTheDocument();
    expect(screen.getByText('Clear')).toBeInTheDocument();
  });
});