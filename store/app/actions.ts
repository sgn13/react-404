import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { network } from "utils/network";
import api from "constants/api";
import { SET_IS_LOADING, SET_IS_SUBMITTING, SET_ME, UPDATE_ME } from "./constants";
import { SetIsLoadingType, SetIsSubmittingType, SetMeType, UpdateMeType } from "./types";

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

// export const logOut = () => async (dispatch) => {
//   try {
//     dispatch(setIsLoading(true));
//     await network({ dispatch, sso: true }).post(api.logout, {
//       refresh: sessionStorage.getItem("refreshToken"),
//       access: sessionStorage.getItem("accessToken"),
//     });

//     sessionStorage.removeItem("accessToken");
//     sessionStorage.removeItem("refreshToken");
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     window.localStorage.setItem("logout", Date.now().toString());
//     window.location.href = "/login";
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const fetchMe =
//   ({}) =>
//   async (dispatch: Dispatch): Promise<boolean> => {
//     try {
//       dispatch(setIsLoading(true));

//       const { data, status } = await network({
//         dispatch,
//         sso: true,
//       }).get(api.me);
//       if (status === 200) {
//         if (data) {
//           dispatch(updateMe({ ...data }));
//           dispatch(setIsLoading(false));
//         }
//         return true;
//       }
//       return false;
//     } catch (error) {
//       console.log(error);
//       return false;
//     }
//   };

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

export const login =
  ({ values }) =>
  async (dispatch) => {
    try {
      dispatch(setIsSubmitting(true));

      // Create form data object  to plain object
      // let formDataAsObject = Object.fromEntries(values.entries());
      // posting as multipart/formData
      const { data, status } = await network({ requireToken: false }).post(api.login, values);
      if (status === 200 || status === 201) {
        if (data) {
          dispatch(setIsSubmitting(false));
          sessionStorage.setItem("accessToken", data.token.access);
          sessionStorage.setItem("refreshToken", data.token.refresh);
          const redirectUrl = window.localStorage.getItem("redirectTo") || "/";
          window.location.href = redirectUrl;
          return data;
        }
      } else {
        dispatch(setIsSubmitting(false));
        return false;
      }
    } catch (error) {
      dispatch(setIsSubmitting(false));
      console.log("got error", error);
    }
    return false;
  };

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
