import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import { SET_IS_LOADING, SET_REGISTRATIONS_DATA } from "./action-types";

import { RegistrationState, SetIsLoadingType, SetRegistrationsDataType } from "./types";

import api from "constants/api";

import { setErrorMessage } from "store/app/actions";

import { network } from "utils/network";

export type AppThunk = ActionCreator<
  ThunkAction<Promise<boolean>, RegistrationState, null, Action<string>>
>;

export const setIsLoading = (payload): SetIsLoadingType => ({
  type: SET_IS_LOADING,
  payload,
});

export const setRegistrationsData = (payload): SetRegistrationsDataType => ({
  type: SET_REGISTRATIONS_DATA,
  payload,
});

export const fetchRegistrations: AppThunk =
  ({}) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await network({ dispatch, sso: true }).get(api.registration);

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          dispatch(setRegistrationsData(data));
          dispatch(setIsLoading(false));
          return true;
        }
      }
      return false;
    } catch (error) {
      error.response && dispatch(setErrorMessage(error));
      dispatch(setIsLoading(false));
      return false;
    }
  };
