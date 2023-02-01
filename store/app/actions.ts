import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { network } from "utils/network";
import api from "constants/api";
import {
  SET_DOWNLOADING_INFO,
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_ME,
  SET_NOTIFICATION_DATA,
  SET_SIDEBAR,
  SET_UPLOADING_INFO,
  UPDATE_ME,
} from "./constants";
import {
  ApplicationState,
  SetDownloadingInfoType,
  SetIsLoadingType,
  SetIsSubmittingType,
  SetMeType,
  SetNotificationDataType,
  SetSidebarType,
  SetUploadingInfoType,
  UpdateMeType,
} from "./types";

import { ToastOptions, ToastPosition, TypeOptions } from "react-toastify";
import { Notify } from "components/Notification/Notification";

export const setMe = (payload: any): SetMeType => ({
  type: SET_ME,
  payload,
});

export const updateMe = (payload: any): UpdateMeType => ({
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

export const setUploadingInfo = (payload: {
  count?: any;
  progress?: any;
  meta?: any;
}): SetUploadingInfoType => ({
  type: SET_UPLOADING_INFO,
  payload,
});

export const setDownloadingInfo = (payload: {
  count?: any;
  progress?: any;
  meta?: any;
}): SetDownloadingInfoType => ({
  type: SET_DOWNLOADING_INFO,
  payload,
});

export const setSidebar = (payload): SetSidebarType => ({
  type: SET_SIDEBAR,
  payload,
});

export const setErrorResponse = ({ message }): SetNotificationDataType => {
  return {
    type: SET_NOTIFICATION_DATA,
    payload: {
      position: "top-right",
      message: message || "Error has occurred",
      type: "error",
    },
  };
};

export const notify = (message: string, options: ToastOptions) => Notify(message, options);

export const notifyError = (err: any) => {
  let message;
  if (err && err.response && err.response.data) {
    const errorKeyArray = Object.keys(err.response.data);
    const errorMessageArray = Object.values(err.response.data);
    if (errorMessageArray.length && errorMessageArray[0].length) {
      message = `${errorMessageArray[0]} : ${errorKeyArray.length && errorKeyArray[0]}`;
    }
  }
  Notify(message || "Error has occurred", {
    type: "error",
  });
};

export const notifySuccess = (message = "Error has occurred") => {
  Notify(message, {
    type: "success",
  });
};

export const showNotification = (payload: {
  position: ToastPosition;
  type: TypeOptions;
  message: string;
}): SetNotificationDataType => {
  return {
    type: SET_NOTIFICATION_DATA,
    payload,
  };
};

export type AppThunk = ActionCreator<
  ThunkAction<Promise<boolean>, ApplicationState, null, Action<string>>
>;

export const login =
  ({ values }) =>
  async (dispatch) => {
    try {
      dispatch(setIsSubmitting(true));

      // Convert form data object  to plain object
      // let formDataAsObject = Object.fromEntries(values.entries());
      // posting as multipart/formData
      const { data, status } = await network({ requireToken: false }).post(api.login, values);
      if (status === 200 || status === 201) {
        if (data) {
          dispatch(setIsSubmitting(false));
          sessionStorage.setItem("accessToken", data.token.access);
          sessionStorage.setItem("refreshToken", data.token.refresh);
          const redirectUrl = window.sessionStorage.getItem("redirectTo") || "/";
          Notify("Login Successful", {
            type: "success",
          });
          setTimeout(() => (window.location.href = redirectUrl), 1000);
          return data;
        }
        return true;
      }
      // notifyError(data);
      dispatch(setIsSubmitting(false));
      return false;
    } catch (error) {
      dispatch(setIsSubmitting(false));
      if (error.response) dispatch(notifyError(error));
      return false;
    }
  };

export const uploadFile: AppThunk =
  ({ formData }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setUploadingInfo({ count: 1 }));
      dispatch(setIsSubmitting(true));
      const { data, status } = await network({
        dispatch,
        onUploadProgress: (progressEvent) => {
          dispatch(
            setUploadingInfo({
              progress: progressEvent.total
                ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
                : ".",
            }),
          );
        },
      }).post(`${api.uploadFile}`, formData);

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          dispatch(setIsSubmitting(false));
          setTimeout(() => dispatch(setUploadingInfo({ count: 0 })), 1000);
          return true;
        }
      }
      return false;
    } catch (error) {
      if (error.response) dispatch(setErrorMessage(error));
      dispatch(setIsSubmitting(false));
      return false;
    }
  };

export const logOut = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    // logout from server
    await network({ dispatch, sso: true }).post(api.logout, {
      refresh: sessionStorage.getItem("refreshToken"),
      access: sessionStorage.getItem("accessToken"),
    });

    // logout locally from browser
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.setItem("logout", Date.now().toString());
    window.location.href = "/login";
  } catch (error) {
    console.log(error);
  }
};

export const fetchMe =
  () =>
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
      console.log(error);
      return false;
    }
  };

// export const changepassword =
//   ({ values }) =>
//   async (dispatch) => {
//     try {
//       dispatch(setIsSubmitting(true));

//       const { status, data } = await network({
//         dispatch,
//         requireToken: false,
//       }).patch(api.changepassword, values);

//       if (status === 200 || status > 200) {
//         if (data) {
//           const { token } = data;

//           sessionStorage.setItem("token", token);

//           dispatch(setIsSubmitting(false));

//           return true;
//         }
//         dispatch(setIsSubmitting(false));
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

// export const register =
//   ({ values }) =>
//   async (dispatch) => {
//     try {
//       dispatch(setIsSubmitting(true));
//       const requestOptions = {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           username: String(values.email).toLowerCase(),
//           password: values.password,
//           requester_app: "VRS",
//         }),
//         credentials: "omit",
//       };

//       const result = await fetch(envConfig.sso.url + api.ssoRegister, requestOptions);
//       const data = await result.json();

//       const status = result.status;
//       if (status === 200 || status === 201) {
//         if (data) {
//           dispatch(setIsSubmitting(false));
//           return data;
//         }
//       } else {
//         dispatch(setErrorResponse(data));
//         dispatch(setIsSubmitting(false));
//       }
//     } catch (error) {
//       dispatch(setIsSubmitting(false));
//       error.response && dispatch(setErrorMessage(error));
//     }
//   };
