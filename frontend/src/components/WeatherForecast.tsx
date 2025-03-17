import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ForecastData } from '../types';

const ForecastContainer = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding: 20px 0;
  scrollbar-width: thin;
  scrollbar-color: #00c4cc #f0f2f5;

  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #00c4cc;
    border-radius: 4px;
  }
`;

const ForecastCard = styled(motion.div)`
  background: linear-gradient(135deg, #007bff, #00c4cc);
  border-radius: 15px;
  padding: 15px;
  color: white;
  text-align: center;
  min-width: 150px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

const DateText = styled.p`
  font-size: 1rem;
  margin: 0;
`;

const TempText = styled.p`
  font-size: 1.5rem;
  margin: 10px 0;
`;

const DescText = styled.p`
  font-size: 0.9rem;
  text-transform: capitalize;
`;

interface Props {
  forecast: ForecastData[];
}

const WeatherForecast: React.FC<Props> = ({ forecast }) => {
  return (
    <ForecastContainer>
      {forecast.map((item, index) => (
        <ForecastCard
          key={index}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <DateText>{new Date(item.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</DateText>
          <img src={item.icon} alt="Weather Icon" style={{ width: '60px' }} />
          <TempText>{item.temperature}°C</TempText>
          <DescText>{item.description}</DescText>
        </ForecastCard>
      ))}
    </ForecastContainer>
  );
};

export default WeatherForecast;