import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";
import theme from ".";
import GlobalStyle from "./GlobalStyle";

type PropType = { children: React.ReactNode };

function AppThemeProvider({ children }: PropType) {
  return (
    <StyledComponentsThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </StyledComponentsThemeProvider>
  );
}

export default AppThemeProvider;
