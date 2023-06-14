import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { PropsWithChildren } from "react";
import { useReactTheme } from "src/containers/ReactThemeProvider/ReactThemeProvider";

export function MuiThemeProvider({ children }: PropsWithChildren<Record<string, unknown>>) {
  const { theme } = useReactTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
