import { Reducer } from "redux";

import {
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_ME,
  SET_SIDEBAR,
  UPDATE_ME,
  SET_NOTIFICATION_DATA,
} from "./constants";

import { ApplicationActionTypes, ApplicationState } from "./types";
import { Notify } from "components/Notification/Notification";

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

    case SET_NOTIFICATION_DATA: {
      const { message = "", position = "bottom-right", type = "success" } = action.payload;
      Notify(message, {
        position,
        type,
      });
      return { ...state };
    }

    default:
      return state;
  }
};

export default reducer;
