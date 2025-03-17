import React from 'react';
import Home from './pages/Home';
import { GlobalStyles } from './styles/GlobalStyles';
import { ThemeProvider } from './context/ThemeContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <Home />
    </ThemeProvider>
  );
};

export default App;