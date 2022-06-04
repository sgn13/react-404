import { Reducer } from 'redux';

import {
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_IS_PERMISSION_LOADING,
  SET_NOTIFICATION_DATA,
  RESET_NOTIFICATION_DATA,
  SET_SIDEBAR,
  SET_ME,
  SET_APP_NAME,
  FETCH_SIDEBAR,
  FETCH_SIDEBAR_REVERSE,
  UPDATE_ME,
  SET_VALID_PERMISSIONS,
  SET_UPLOADING_INFO,
  SET_DOWNLOADING_INFO,
  SET_LAYOUT_COLLAPSED,
} from './action-types';

import { ApplicationState, ApplicationActionTypes } from './types';

export const initialState: ApplicationState = {
  token: '',
  isLoading: false,
  isSubmitting: false,
  isPermissionLoading: false,
  notification: [],
  me: undefined,
  sidebar: [],
  appName: 'default',
  validPermissions: undefined,
  upload: { count: 0, progress: 0, meta: '' },
  download: { count: 0, progress: 0, meta: '' },
  collapsed: false,
};

const reducer: Reducer<ApplicationState> = (
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
    case SET_IS_PERMISSION_LOADING: {
      return {
        ...state,
        isPermissionLoading: action.payload,
      };
    }
    case SET_NOTIFICATION_DATA: {
      return {
        ...state,
        notification: [...notification, action.payload],
        isLoading: false,
      };
    }
    case RESET_NOTIFICATION_DATA: {
      return {
        ...state,
        notification: [],
        isLoading: false,
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
    case SET_APP_NAME: {
      return { ...state, appName: action.payload };
    }
    case FETCH_SIDEBAR: {
      return {
        ...state,
        sidebar: [...action.payload, ...state.sidebar],
      };
    }
    case FETCH_SIDEBAR_REVERSE: {
      return {
        ...state,
        sidebar: [...state.sidebar, ...action.payload],
      };
    }
    case SET_VALID_PERMISSIONS: {
      return { ...state, validPermissions: action.payload };
    }
    case SET_UPLOADING_INFO: {
      return {
        ...state,
        upload: { ...state.upload, ...action.payload },
      };
    }
    case SET_DOWNLOADING_INFO: {
      return {
        ...state,
        download: { ...state.download, ...action.payload },
      };
    }
    case SET_LAYOUT_COLLAPSED: {
      return {
        ...state,
        collapsed: action.payload,
      };
    }

    default:
      return state;
  }
};

export default reducer;
