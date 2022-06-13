import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import GlobalStyle from "./Global";

function StyledThemeProvider({ children }: { children: React.ReactNode }) {
  const themeName = useSelector((state) => state?.themeState?.themeName);
  return (
    <ThemeProvider theme={{ theme: themeName }}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}

export default StyledThemeProvider;
