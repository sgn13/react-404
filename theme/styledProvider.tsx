import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import GlobalStyle from "./GlobalStyle";

function StyledThemeProvider({ children }: { children: React.ReactNode }) {
  const darkThemeEnabled = useSelector((state) => state?.themeState?.darkThemeEnabled);
  return (
    <ThemeProvider theme={{ theme: darkThemeEnabled ? "dark" : "light" }}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}

export default StyledThemeProvider;
