import { useLayoutEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';

type Props = {
  children: React.ReactNode;
};

const isDarkTheme = window?.matchMedia('(prefers-color-scheme: dark)').matches;
const defaultTheme = isDarkTheme ? 'dark-mode' : 'light-mode';

export const ThemeProvider: React.FC<Props> = (props) => {
  const { children } = props;

  const [theme, setTheme] = useState(
    localStorage.getItem('app-theme') || defaultTheme,
  );

  useLayoutEffect(() => {
    document.documentElement.setAttribute('class', theme);
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  const value = {
    theme,
    setTheme,
  };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
