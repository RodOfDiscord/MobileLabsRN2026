import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ThemeContextType, ThemeType } from '../types';

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeParams = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeParams must be used within a ThemeProvider');
  }
  return context;
};
