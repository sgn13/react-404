import { Reducer } from "redux";

import { SET_IS_LOADING, SET_IS_SUBMITTING, SET_ME, SET_SIDEBAR, UPDATE_ME } from "./constants";

import { ApplicationActionTypes, ApplicationState } from "./types";

export const initialState: ApplicationState = {
  token: "",
  isLoading: false,
  isSubmitting: false,
  isPermissionLoading: false,
  me: undefined,
  sidebar: [],
  appName: "default",
  notification: [],
  upload: { count: 0, progress: 0, meta: "" },
  download: { count: 0, progress: 0, meta: "" },
  validPermissions: undefined,

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

    case SET_SIDEBAR: {
      return { ...state, sidebar: action.payload };
    }

    default:
      return state;
  }
};

export default reducer;
