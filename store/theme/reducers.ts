import { SET_THEME_DATA } from "./actions-types";
import { ThemeActionType } from "./types";

const initialState = { themeName: "light" };

// eslint-disable-next-line @typescript-eslint/default-param-last
const reducer = (state = initialState, action: ThemeActionType) => {
  switch (action.type) {
    case SET_THEME_DATA:
      return { ...state, themeName: action.payload };

    default:
      return state;
  }
};

export default reducer;
