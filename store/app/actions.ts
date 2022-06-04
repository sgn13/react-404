import configuration from 'configuration';
import { api } from 'constants/url';
import { hostStorage } from 'pages/auth/Login';
import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { network } from 'utils/network';
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
import {
  ApplicationState,
  NotificationPayloadType,
  ResetNotificationDataType,
  SetIsLoadingType,
  SetIsSubmittingType,
  SetIsPermissionLoadingType,
  SetNotificationDataType,
  SetSidebarType,
  SetMeType,
  FetchSidebarType,
  SetAppNameType,
  FetchSidebarReverseType,
  UpdateMeType,
  SetValidPermissionsType,
  SetUploadingInfoType,
  SetDownloadingInfoType,
  SetLayoutCollapsedType,
} from './types';

export type AppThunk = ActionCreator<
  ThunkAction<Promise<boolean>, ApplicationState, null, Action<string>>
>;

export const setMe = (payload): SetMeType => ({
  type: SET_ME,
  payload,
});

export const updateMe = (payload): UpdateMeType => ({
  type: UPDATE_ME,
  payload,
});

export const setIsLoading = (payload: boolean): SetIsLoadingType => ({
  type: SET_IS_LOADING,
  payload,
});

export const setIsSubmitting = (payload: boolean): SetIsSubmittingType => ({
  type: SET_IS_SUBMITTING,
  payload,
});

export const setIsPermissionLoading = (payload: boolean): SetIsPermissionLoadingType => ({
  type: SET_IS_PERMISSION_LOADING,
  payload,
});

export const setNotification = (payload: NotificationPayloadType): SetNotificationDataType => ({
  type: SET_NOTIFICATION_DATA,
  payload,
});

export const resetNotification = (): ResetNotificationDataType => ({
  type: RESET_NOTIFICATION_DATA,
});

export const setSidebar = (payload): SetSidebarType => ({
  type: SET_SIDEBAR,
  payload,
});

export const setAppName = (payload): SetAppNameType => ({
  type: SET_APP_NAME,
  payload,
});
export const updateSidebarData = (payload): FetchSidebarType => ({
  type: FETCH_SIDEBAR,
  payload,
});
export const updateSidebarReverseData = (payload): FetchSidebarReverseType => ({
  type: FETCH_SIDEBAR_REVERSE,
  payload,
});

export const setValidPermissions = (payload): SetValidPermissionsType => ({
  type: SET_VALID_PERMISSIONS,
  payload,
});

export const setUploadingInfo = (payload): SetUploadingInfoType => ({
  type: SET_UPLOADING_INFO,
  payload,
});

export const setDownloadingInfo = (payload): SetDownloadingInfoType => ({
  type: SET_DOWNLOADING_INFO,
  payload,
});

export const setLayoutCollapse = (payload): SetLayoutCollapsedType => ({
  type: SET_LAYOUT_COLLAPSED,
  payload,
});
export const dispatchSetLayoutCollapse = (payload) => (dispatch) =>
  dispatch({
    type: SET_LAYOUT_COLLAPSED,
    payload,
  });

export const dispatchSetAppName = (payload) => async (dispatch) => dispatch(setAppName(payload));

export const dispatchSetUploadingInfo = (payload) => (dispatch) =>
  dispatch(setUploadingInfo(payload));

export const dispatchSetDownloadingInfo = (payload) => (dispatch) =>
  dispatch(setDownloadingInfo(payload));

export const setErrorMessage = (err): SetNotificationDataType => {
  let message;
  if (err && err.response && err.response.data) {
    const errorKeyArray = Object.keys(err.response.data);
    const errorMessageArray = Object.values(err.response.data);
    if (errorMessageArray.length && errorMessageArray[0].length) {
      message = `${errorMessageArray[0]} : ${errorKeyArray.length && errorKeyArray[0]}`;
    }
  }
  return {
    type: SET_NOTIFICATION_DATA,
    payload: {
      name: (err && err.response && err.response.name) || 'Error',
      message: message || 'Error has occurred',
      level: 'error',
    },
  };
};

export const setLoginErrorMessage = (err): SetNotificationDataType => {
  const error = Object.values(err);

  return {
    type: SET_NOTIFICATION_DATA,
    payload: {
      name: (err && err.response && err.response.name) || 'Error',
      message: error.length ? (error[0] as string) : 'Error has occurred',
      level: 'error',
    },
  };
};

export const setErrorResponse = ({ message }): SetNotificationDataType => {
  return {
    type: SET_NOTIFICATION_DATA,
    payload: {
      name: 'Error',
      message: message || 'Error has occurred',
      level: 'error',
    },
  };
};

export const logout = () => {
  sessionStorage.removeItem('accessToken');
  sessionStorage.removeItem('refreshToken');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  window.localStorage.setItem('logout', Date.now().toString());

  window.location.href = '/login';
};

export const logOut = () => async (dispatch) => {
  const createGuest = require('cross-domain-storage/guest');
  const hostStorage = createGuest(`${configuration.sso.intranet}/accessStorage`);

  try {
    dispatch(setIsLoading(true));
    await network({ dispatch, sso: true }).post(api.logout, {
      refresh: sessionStorage.getItem('refreshToken'),
      access: sessionStorage.getItem('accessToken'),
    });

    hostStorage.remove('accessToken');
    hostStorage.remove('refreshToken');
    hostStorage.set('accessToken', '');
    hostStorage.set('refreshToken', '');
    hostStorage.close();
    logout();
  } catch (error) {
    error.response && dispatch(setErrorMessage(error));
  }
};

export const fetchMe: AppThunk =
  ({}) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      dispatch(setIsLoading(true));

      const { data, status } = await network({
        dispatch,
        sso: true,
      }).get(api.me);
      if (status === 200) {
        if (data) {
          dispatch(updateMe({ ...data }));
          dispatch(setIsLoading(false));
        }
        return true;
      }
      return false;
    } catch (error) {
      dispatch(setErrorMessage(error));
      return false;
    }
  };

export const fetchAppMe: AppThunk =
  ({}) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      dispatch(setIsLoading(true));
      dispatch(setIsPermissionLoading(true));

      const { data, status } = await network({
        dispatch,
      }).get(api.me);
      if (status === 200) {
        if (data) {
          dispatch(updateMe(data));
          dispatch(setIsLoading(false));
          dispatch(setIsPermissionLoading(false));
        }
        return true;
      }
      return false;
    } catch (error) {
      dispatch(setErrorMessage(error));
      return false;
    }
  };

export const changepassword =
  ({ values }) =>
  async (dispatch) => {
    try {
      dispatch(setIsSubmitting(true));

      const { status, data } = await network({
        dispatch,
        requireToken: false,
      }).patch(api.changepassword, values);

      if (status === 200 || status > 200) {
        if (data) {
          const { token } = data;

          sessionStorage.setItem('token', token);

          dispatch(setIsSubmitting(false));

          dispatch(
            setNotification({
              name: 'Password Changed',
              message: data.message,
              level: 'success',
            }),
          );
          return true;
        }
        dispatch(setIsSubmitting(false));
        dispatch(
          setNotification({
            name: 'Error',
            message: data,
            level: 'error',
          }),
        );
      }
    } catch (error) {
      error.response && dispatch(setErrorMessage(error));
    }
  };

export const authenticateUser =
  ({ accessToken }) =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true));

      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
      };

      const result = await fetch(configuration.sso.url + api.me, requestOptions);
      const data = await result.json();

      const status = result.status;
      if (status === 200 || status === 201) {
        if (data) {
          dispatch(setMe(data));
          return data;
        }
      }
      dispatch(setIsLoading(false));
    } catch (error) {
      dispatch(setIsLoading(false));
      error.response && dispatch(setErrorMessage(error));
    }
  };

export const login =
  ({ values }) =>
  async (dispatch) => {
    try {
      const createGuest = require('cross-domain-storage/guest');
      const hostStorage = createGuest(`${configuration.sso.intranet}/accessStorage`);

      dispatch(setIsSubmitting(true));

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: String(values.email).toLowerCase(),
          password: values.password,
        }),
        credentials: 'omit',
      };

      const result = await fetch(configuration.api.url + api.ssoLogin, requestOptions);
      const data = await result.json();

      const status = result.status;
      if (status === 200 || status === 201) {
        if (data) {
          dispatch(setIsSubmitting(false));
          sessionStorage.setItem('accessToken', data.jwt_token.access);
          sessionStorage.setItem('refreshToken', data.jwt_token.refresh);

          if (hostStorage) {
            hostStorage.set('accessStorage', '', (error, data) => {});
          }

          const redirectUrl = window.localStorage.getItem('redirectTo') || '/';
          window.location.href = redirectUrl;

          return data;
        }
      } else {
        dispatch(setLoginErrorMessage(data));
        dispatch(setIsSubmitting(false));
      }
    } catch (error) {
      dispatch(setIsSubmitting(false));
      error.response && dispatch(setErrorMessage(error));
    }
  };

export const register =
  ({ values }) =>
  async (dispatch) => {
    try {
      dispatch(setIsSubmitting(true));
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: String(values.email).toLowerCase(),
          password: values.password,
          requester_app: 'VRS',
        }),
        credentials: 'omit',
      };

      const result = await fetch(configuration.sso.url + api.ssoRegister, requestOptions);
      const data = await result.json();

      const status = result.status;
      if (status === 200 || status === 201) {
        if (data) {
          dispatch(setIsSubmitting(false));
          return data;
        }
      } else {
        dispatch(setErrorResponse(data));
        dispatch(setIsSubmitting(false));
      }
    } catch (error) {
      dispatch(setIsSubmitting(false));
      error.response && dispatch(setErrorMessage(error));
    }
  };

export const fetchValidPermissions: AppThunk =
  ({ userId }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      const { data, status } = await network({
        dispatch,
      }).get(`${api.userPermission}${userId}/`);

      if (status === 200) {
        if (data) {
          dispatch(setValidPermissions(data));
          dispatch(setIsSubmitting(false));
          return true;
        }
      } else {
        dispatch(setErrorResponse(data));
        return false;
      }
    } catch (error) {
      dispatch(setErrorMessage(error));
      return false;
    }
  };
