import React, { useState, PropsWithChildren, createContext } from "react";
import theme from "theme";

export const ThemeContext = createContext(theme);

const ReactThemeProvider = ({ children }: PropsWithChildren<{}>) => {
  const [selectedTheme, setSelectedTheme] = useState(theme);
  return (
    <ThemeContext.Provider value={{ selectedTheme, setSelectedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ReactThemeProvider;

// Usage or Consume this in any of its child react component like so
// import { useContext } from "react";
// import { ThemeContext } from "./ThemeContext";
//  const { selectedTheme, setSelectedTheme } = useContext(ThemeContext);
