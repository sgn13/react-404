import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { ChangeThemeType, ThemeState } from "./types";
import { SET_THEME_DATA } from "./actions-types";
import { getTheme, ThemeType } from "theme";

export type AppThunk = ActionCreator<
  ThunkAction<Promise<boolean>, ThemeState, null, Action<string>>
>;

export const setThemeData = (payload: ThemeType): ChangeThemeType => ({
  type: SET_THEME_DATA,
  payload,
});

export const setTheme: AppThunk = (payload: ThemeType) => async (dispatch: Dispatch) => {
  dispatch(setThemeData(payload));
  return true;
};

export const toggleLightDarkTheme: AppThunk = () => async (dispatch: Dispatch, getState) => {
  const {
    themeState: {
      theme: { themeName },
    },
  } = getState();

  const lightTheme = getTheme("light");
  const darkTheme = getTheme("dark");

  if (themeName === "dark") {
    dispatch(setThemeData(lightTheme));
  } else if (themeName === "light") {
    dispatch(setThemeData(darkTheme));
  } else {
    dispatch(setThemeData(lightTheme));
  }
  return true;
};
