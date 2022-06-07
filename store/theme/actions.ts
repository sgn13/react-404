import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { ThemeState, ChangeThemeType } from "./types";
import { SET_THEME_DATA } from "./actions-types";

export type AppThunk = ActionCreator<
  ThunkAction<Promise<boolean>, ThemeState, null, Action<string>>
>;

export const setThemeData = (payload: string): ChangeThemeType => ({
  type: SET_THEME_DATA,
  payload,
});

export const setTheme: AppThunk = (themeName: string) => async (dispatch: Dispatch) => {
  dispatch(setThemeData(themeName));
  return true;
};

export const toggleLightDarkTheme: AppThunk = () => async (dispatch: Dispatch, getState) => {
  const {
    themeState: { themeName },
  } = getState();

  if (themeName === "dark") {
    dispatch(setThemeData("light"));
  } else if (themeName === "light") {
    dispatch(setThemeData("dark"));
  } else {
    dispatch(setThemeData("light"));
  }
  return true;
};
