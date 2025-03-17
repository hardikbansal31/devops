import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../pages/Home';
import * as weatherApi from '../services/weatherApi';

jest.mock('../services/weatherApi');

const mockWeather = {
  city: 'London',
  temperature: 15,
  humidity: 80,
  description: 'Cloudy',
  icon: '04d',
  forecast: [],
};

describe('Home', () => {
  beforeEach(() => {
    (weatherApi.fetchWeather as jest.Mock).mockResolvedValue(mockWeather);
  });

  it('renders input and displays weather data after fetch', async () => {
    render(<Home />);
    expect(screen.getByPlaceholderText('Enter city name')).toHaveValue('London');
    expect(await screen.findByText('London')).toBeInTheDocument();
    expect(screen.getByText('15°C')).toBeInTheDocument();
    expect(screen.getByText('Cloudy')).toBeInTheDocument();
  });

  it('updates city input on change', () => {
    render(<Home />);
    const input = screen.getByPlaceholderText('Enter city name');
    fireEvent.change(input, { target: { value: 'Paris' } });
    expect(input).toHaveValue('Paris');
  });
});