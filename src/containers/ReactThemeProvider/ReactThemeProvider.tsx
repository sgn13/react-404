import { Theme } from "@mui/material";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import defaultTheme, { getPreferredTheme, getTheme, themeName } from "src/theme";
import light from "src/theme/data/light";

type ReactThemeContextType = {
  theme: Theme;
  setTheme: any;
  toggleLightDarkTheme: () => void;
};

// creating context
export const ReactThemeContext = createContext<ReactThemeContextType | undefined>(undefined);

function ReactThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState(defaultTheme);

  const toggleLightDarkTheme = () => {
    const setLightTheme = () => {
      const lightTheme = getTheme("light");
      setTheme(lightTheme);
      window.localStorage.setItem(themeName, "light");
    };

    const setDarkTheme = () => {
      const darkTheme = getTheme("dark");
      setTheme(darkTheme);
      window.localStorage.setItem(themeName, "dark");
    };

    theme?.palette.mode === "dark" ? setLightTheme() : setDarkTheme();
  };
  useEffect(() => {
    const currentTheme = getPreferredTheme();
    setTheme(currentTheme);
    setTheme(light);
  }, []);

  return (
    <ReactThemeContext.Provider value={{ theme, setTheme, toggleLightDarkTheme }}>
      {children}
    </ReactThemeContext.Provider>
  );
}

export default ReactThemeProvider;

// Usage or Consumption
export const useReactTheme = () => useContext(ReactThemeContext);
