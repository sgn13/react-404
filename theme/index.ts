import darkColors from "./source/colors/darkColors";
import lightColors from "./source/colors/lightColors";
import shadows from "./source/shadows";
import typography from "./source/typography";

const defaultTheme = {
  themeName: "default",
  color: lightColors,
  action: {
    active: "rgba(0, 0, 0, 0.54)",
    hover: "rgba(0, 0, 0, 0.04)",
    hoverOpacity: 0.04,
    selected: "rgba(0, 0, 0, 0.08)",
    selectedOpacity: 0.08,
    disabled: "rgba(0, 0, 0, 0.26)",
    disabledBackground: "rgba(0, 0, 0, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(0, 0, 0, 0.12)",
    focusOpacity: 0.12,
  },
  typography: typography,
  shape: {
    borderRadius: 10,
  },
  shadows: shadows,
  transitions: {
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
  zIndex: {
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
};

const lightTheme = {
  ...defaultTheme,
  themeName: "light",
};

const darkTheme = {
  ...defaultTheme,
  themeName: "dark",
  color: darkColors,
};

type ThemeNames = "default" | "dark" | "light";

export type ThemeType = typeof defaultTheme;

export const getTheme = (name: ThemeNames): ThemeType => {
  switch (name) {
    case "light":
      return lightTheme;
    case "dark":
      return darkTheme;
    default:
      return defaultTheme;
  }
};

export default defaultTheme;
