import { TOGGLE_DARKTHEME } from "./actions-types";

export interface ThemeState {
  darkThemeEnabled: boolean;
}

export type ToggleDarkThemeType = {
  type: typeof TOGGLE_DARKTHEME;
  payload?: any;
};

export type ThemeActionType = ToggleDarkThemeType;
