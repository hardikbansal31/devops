import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle<{ isDark?: boolean }>`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: ${({ isDark }) => (isDark ? '#fff' : '#333')};
    background: transparent;
    transition: color 0.3s ease;
  }

  * {
    box-sizing: border-box;
  }
`;