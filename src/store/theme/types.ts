import { ThemeType } from "src/theme_old";
import { SET_THEME_DATA } from "./actions-types";

export interface ThemeState {
  theme: ThemeType;
}

export type ChangeThemeType = {
  type: typeof SET_THEME_DATA;
  payload?: ThemeType;
};

export type ThemeActionType = ChangeThemeType;
