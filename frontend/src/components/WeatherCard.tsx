import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { WeatherData } from '../types';
import { WiThermometer, WiHumidity, WiStrongWind, WiBarometer } from 'react-icons/wi';
import { useTheme } from '../context/ThemeContext';

const Card = styled(motion.div)<{ isDark: boolean }>`
  background: ${({ isDark }) => (isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.1)')};
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 25px;
  color: #fff;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.18);
  width: 350px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  }
`;

const CityName = styled.h2`
  font-size: 2rem;
  margin: 0;
  text-transform: capitalize;
`;

const Temperature = styled.h3`
  font-size: 3.5rem;
  margin: 10px 0;
  font-weight: 300;
`;

const Description = styled.p`
  font-size: 1.2rem;
  text-transform: capitalize;
  opacity: 0.9;
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-top: 20px;
  font-size: 1.1rem;
`;

const Icon = styled.img`
  width: 80px;
  height: 80px;
`;

interface Props {
  weather: WeatherData;
}

const WeatherCard: React.FC<Props> = ({ weather }) => {
  const { isDark } = useTheme();

  return (
    <Card
      isDark={isDark}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CityName>{weather.city}</CityName>
      <Icon src={weather.icon} alt="Weather Icon" />
      <Temperature>{weather.temperature}°C</Temperature>
      <Description>{weather.description}</Description>
      <DetailGrid>
        <span>
          {(WiThermometer as any)({ size: 24 })} {/* Type assertion */}
          {weather.temperature}°C
        </span>
        <span>
          {(WiHumidity as any)({ size: 24 })} {/* Type assertion */}
          {weather.humidity}%
        </span>
        <span>
          {(WiStrongWind as any)({ size: 24 })} {/* Type assertion */}
          {weather.windSpeed} kph
        </span>
        <span>
          {(WiBarometer as any)({ size: 24 })} {/* Type assertion */}
          {weather.pressure} mb
        </span>
      </DetailGrid>
    </Card>
  );
};

export default WeatherCard;