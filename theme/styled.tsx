import { PropsWithChildren } from "react";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyle from "./Global";
import { useSelector } from "react-redux";

export function StyledThemeProvider({ children }: PropsWithChildren<{}>) {
  const selectedTheme = useSelector((state) => state.themeState.theme);

  return (
    <ThemeProvider theme={selectedTheme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}

// it's always better to wrap any external library in wrapper and use it all over the app
// this way if the library introduces any breaking change in future, you just need to update in one place i.e inside the wrapper
export default styled;
