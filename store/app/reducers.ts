import { Reducer } from "redux";

import { SET_IS_LOADING, SET_IS_SUBMITTING, SET_ME, UPDATE_ME } from "./constants";

import { ApplicationState, ApplicationActionTypes } from "./types";

export const initialState: ApplicationState = {
  token: "",
  isLoading: false,
  isSubmitting: false,
  isPermissionLoading: false,
  notification: [],
  me: undefined,
  sidebar: [],
  appName: "default",
  validPermissions: undefined,
  upload: { count: 0, progress: 0, meta: "" },
  download: { count: 0, progress: 0, meta: "" },
  collapsed: false,
};

const reducer: Reducer<ApplicationState> = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: ApplicationState = initialState,
  action: ApplicationActionTypes,
): ApplicationState => {
  const { notification } = state;

  switch (action.type) {
    case SET_IS_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case SET_IS_SUBMITTING: {
      return {
        ...state,
        isSubmitting: action.payload,
      };
    }

    case SET_ME: {
      return { ...state, me: action.payload };
    }
    case UPDATE_ME: {
      return { ...state, me: { ...state.me, ...action.payload } };
    }

    default:
      return state;
  }
};

export default reducer;
