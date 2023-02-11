import { createContext, useState } from "react";

// context
export const ThemeContext = createContext({});

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export default ThemeProvider;

// Usage or Consumption

// import { useContext } from "react";
// import { ThemeContext } from "./ThemeContext";

// function ThemeToggler() {
//   const { theme, setTheme } = useContext(ThemeContext);

//   return (
//     <>
//       <p>Current theme: {theme}</p>
//       <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>Toggle Theme</button>
//     </>
//   );
// }
