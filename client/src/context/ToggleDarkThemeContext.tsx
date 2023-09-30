import React, { createContext, useContext, useState } from 'react';

import { checkDefaultTheme } from '../App';

interface ToggleDarkThemeContextValues {
  isDarkTheme: boolean;
  toggleDarkTheme: () => void;
}

const DarkThemeContext = createContext<
  ToggleDarkThemeContextValues | undefined
>(undefined);

function DarkThemeProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  const toggleDarkTheme = () => {
    const ligthTheme = !isDarkTheme;
    setIsDarkTheme(ligthTheme);

    localStorage.setItem('darkTheme', ligthTheme + '');
  };

  return (
    <DarkThemeContext.Provider value={{ toggleDarkTheme, isDarkTheme }}>
      {children}
    </DarkThemeContext.Provider>
  );
}

function useDarkThemeContext() {
  const context = useContext(DarkThemeContext);

  if (context === undefined)
    throw new Error(
      'Toggle Dark Theme context was used outside of DarkThemeProvider'
    );
  return context;
}

export { DarkThemeProvider, useDarkThemeContext };
