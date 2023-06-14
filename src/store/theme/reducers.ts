import defaultTheme, { getTheme } from "src/theme_old";
import { SET_THEME_DATA } from "./actions-types";
import { ThemeActionType } from "./types";

const localStorageKey = "theme";
const value = localStorage.getItem(localStorageKey);
const storedTheme = value ? JSON.parse(value) : null;
const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

const darkTheme = getTheme("dark");
// first priority is theme set in localStorage and then fallback to prefers-color-scheme
export const preferredTheme = storedTheme || (prefersDark && darkTheme) || defaultTheme;

const initialState = { theme: preferredTheme };

// eslint-disable-next-line @typescript-eslint/default-param-last
const reducer = (state = initialState, action: ThemeActionType) => {
  switch (action.type) {
    case SET_THEME_DATA:
      localStorage.setItem(localStorageKey, JSON.stringify(action.payload));
      return { ...state, theme: action.payload };

    default:
      return state;
  }
};

export default reducer;
