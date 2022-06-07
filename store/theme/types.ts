import { SET_THEME_DATA } from "./actions-types";

export interface ThemeState {
  themeName: string;
}

export type ChangeThemeType = {
  type: typeof SET_THEME_DATA;
  payload?: string;
};

export type ThemeActionType = ChangeThemeType;
