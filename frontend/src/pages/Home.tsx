import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Form, Dropdown, Container, Row, Col } from 'react-bootstrap';
import WeatherCard from '../components/WeatherCard';
import WeatherForecast from '../components/WeatherForecast';
import { fetchWeather } from '../services/weatherApi';
import { WeatherData } from '../types';
import { FaSearch, FaSun, FaMoon, FaHistory } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';

// Styled Components
const PageWrapper = styled(motion.div)<{ weatherType: string; isDark: boolean }>`
  min-height: 100vh;
  background: ${({ weatherType, isDark }) => {
    if (isDark) return 'linear-gradient(135deg, #1e2a44, #2c3e50)';
    switch (weatherType.toLowerCase()) {
      case 'sunny': return 'linear-gradient(135deg, #ffeb3b, #ff9800)';
      case 'cloudy': return 'linear-gradient(135deg, #b0bec5, #607d8b)';
      case 'rain': return 'linear-gradient(135deg, #0288d1, #01579b)';
      case 'snow': return 'linear-gradient(135deg, #e0f7fa, #b0bec5)';
      default: return 'linear-gradient(135deg, #4fc3f7, #0288d1)';
    }
  }};
  transition: background 0.5s ease;
  padding: 20px 0;
`;

const Header = styled.header`
  text-align: center;
  padding: 20px;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0;
  font-family: 'Arial', sans-serif;
`;

const SearchContainer = styled.div`
  max-width: 600px;
  margin: 20px auto;
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled(Form.Control)`
  padding: 12px 40px 12px 20px;
  font-size: 1.1rem;
  border-radius: 25px;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease;
  &:focus {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
    outline: none;
  }
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  right: 15px;
  color: #666;
`;

const Suggestions = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  list-style: none;
  padding: 10px 0;
  margin: 5px 0 0;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
`;

const SuggestionItem = styled.li`
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background: #f5f7fa;
  }
`;

const ThemeToggle = styled.button<{ isDark: boolean }>`
  position: fixed;
  top: 20px;
  right: 20px;
  border-radius: 50%;
  padding: 10px;
  background: ${({ isDark }) => (isDark ? '#ffca28' : '#37474f')};
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: background 0.3s ease;
  color: ${({ isDark }) => (isDark ? '#333' : '#fff')};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
`;

const HistoryDropdown = styled(Dropdown)`
  position: fixed;
  top: 20px;
  right: 70px;
`;

const WeatherSection = styled(Container)`
  margin-top: 40px;
  color: #fff;
`;

const StatusMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #fff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;

const ForecastToggle = styled.button`
  margin-top: 20px;
  background: #0288d1;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  color: #fff;
  cursor: pointer;
  &:hover {
    background: #0277bd;
  }
`;

// Icon Container to wrap react-icons components
const IconContainer = styled.div`
  display: contents;
`;

const SearchIcon: React.FC = () => (
  <IconContainer>{<FaSearch />}</IconContainer>
);

const SunIcon: React.FC = () => <IconContainer>{<FaSun />}</IconContainer>;

const MoonIcon: React.FC = () => <IconContainer>{<FaMoon />}</IconContainer>;

const HistoryIcon: React.FC = () => (
  <IconContainer>{<FaHistory />}</IconContainer>
);


// Home Component
const Home: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showForecast, setShowForecast] = useState<boolean>(false);
  const { isDark, toggleDark } = useTheme();

  // Load search history from localStorage on mount
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('weatherSearchHistory') || '[]');
    setSearchHistory(history);
  }, []);

  // Fetch city suggestions for autocomplete
  const fetchSuggestions = async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5000/api/autocomplete/${query}`);
      setSuggestions(response.data);
    } catch (err) {
      console.error('Suggestion fetch error:', err);
      setSuggestions([]);
    }
  };

  // Fetch weather data for a given city
  const fetchWeatherData = async (selectedCity: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(selectedCity);
      setWeather(data);
      updateSearchHistory(selectedCity);
    } catch (err) {
      console.error('Weather fetch error:', err);
      setError('Failed to fetch weather data. Please try again.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // Update search history and save to localStorage
  const updateSearchHistory = (newCity: string) => {
    const updatedHistory = [newCity, ...searchHistory.filter(c => c !== newCity)].slice(0, 5);
    setSearchHistory(updatedHistory);
    localStorage.setItem('weatherSearchHistory', JSON.stringify(updatedHistory));
  };

  // Handle input change and fetch suggestions
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCity(value);
    fetchSuggestions(value);
  };

  // Handle Enter key press to fetch weather
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && city) {
      fetchWeatherData(city);
      setSuggestions([]);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setCity(suggestion);
    fetchWeatherData(suggestion);
    setSuggestions([]);
  };

  // Handle history item click
  const handleHistoryClick = (historyCity: string) => {
    setCity(historyCity);
    fetchWeatherData(historyCity);
  };

  return (
    <PageWrapper
      weatherType={weather?.description || 'default'}
      isDark={isDark}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Header>
        <Title>ass-mit</Title>
        <p>Real-time weather updates at your fingertips</p>
      </Header>

      <SearchContainer>
        <SearchInput
          type="text"
          value={city}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Search for a city... (e.g., New York)"
          autoFocus
        />
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>

        {suggestions.length > 0 && (
          <Suggestions>
            {suggestions.map((suggestion, index) => (
              <SuggestionItem key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </SuggestionItem>
            ))}
          </Suggestions>
        )}
      </SearchContainer>

      <ThemeToggle onClick={toggleDark} isDark={isDark}>
        {isDark ? <SunIcon /> : <MoonIcon />}
      </ThemeToggle>

      <HistoryDropdown>
        <Dropdown.Toggle variant="secondary" id="history-dropdown">
          <HistoryIcon />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {searchHistory.length > 0 ? (
            searchHistory.map((histCity, index) => (
              <Dropdown.Item key={index} onClick={() => handleHistoryClick(histCity)}>
                {histCity}
              </Dropdown.Item>
            ))
          ) : (
            <Dropdown.Item disabled>No search history</Dropdown.Item>
          )}
        </Dropdown.Menu>
      </HistoryDropdown>

      <WeatherSection>
        {loading && <StatusMessage>Loading weather data...</StatusMessage>}
        {error && <StatusMessage>{error}</StatusMessage>}
        {weather && !loading && !error && (
          <Row className="justify-content-center">
            <Col md={6}>
              <WeatherCard weather={weather} />
              <ForecastToggle onClick={() => setShowForecast(!showForecast)}>
                {showForecast ? 'Hide Forecast' : 'Show Forecast'}
              </ForecastToggle>
              {showForecast && <WeatherForecast forecast={weather.forecast} />}
            </Col>
          </Row>
        )}
      </WeatherSection>
    </PageWrapper>
  );
};

export default Home;