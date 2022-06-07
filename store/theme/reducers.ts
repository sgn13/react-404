import { TOGGLE_DARKTHEME } from "./actions-types";
import { ThemeActionType } from "./types";

const initialState = { darkThemeEnabled: false };

// eslint-disable-next-line @typescript-eslint/default-param-last
const reducer = (state = initialState, action: ThemeActionType) => {
  switch (action.type) {
    case TOGGLE_DARKTHEME:
      return { ...state, darkThemeEnabled: !state.darkThemeEnabled };

    default:
      return state;
  }
};

export default reducer;
