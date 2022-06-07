import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { ToggleDarkThemeType } from "./types";
import { ThemeState, TOGGLE_DARKTHEME } from "./actions-types";

export type AppThunk = ActionCreator<
  ThunkAction<Promise<boolean>, ThemeState, null, Action<string>>
>;

export const setThemeData = (payload): ToggleDarkThemeType => ({
  type: TOGGLE_DARKTHEME,
  payload,
});

export const changeTheme: AppThunk =
  ({}) =>
  async (dispatch: Dispatch) => {
    dispatch(setThemeData({}));
    return true;
  };
