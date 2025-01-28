import React from 'react';

type themeContextType = {
  theme: string | null;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};

export const ThemeContext = React.createContext<themeContextType>({
  theme: null,
  setTheme: () => {},
});
