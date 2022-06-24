import styled, { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import GlobalStyle from "./Global";

export function StyledThemeProvider({ children }: { children: React.ReactNode }) {
  const themeName = useSelector((state) => state?.themeState?.themeName);
  return (
    <ThemeProvider theme={{ theme: themeName }}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}

// it's always better to wrap any external library in wrapper and use it all over the app
// this way if the library introduces any breaking change in future, you just need to update in one place i.e inside the wrapper
export default styled;
