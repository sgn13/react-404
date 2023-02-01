import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import api from "constants/api";

import { generateMeta, generateQuery } from "utils/store";
import { notifyError } from "store/app/actions";

import { network } from "utils/network";
import { defaultQuery } from "constants/query";

import {
  CreateUserDataType,
  RemoveUserDataType,
  ResetSearchedUsersDataType,
  SetFcrsUserQueryResultDataDataType,
  SetIsLoadingType,
  SetIsSubmittingType,
  SetSearchedUsersDataType,
  SetUserDataType,
  SetUsersDataType,
  SetUsersMetadataType,
  UpdateUserDataType,
  UserState,
} from "./types";
import {
  CREATE_USER_DATA,
  REMOVE_USER_DATA,
  RESET_SEARCHED_USERS_DATA,
  SET_FCRS_USER_QUERY_RESULT_DATA,
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_SEARCHED_USERS_DATA,
  SET_USERS_DATA,
  SET_USERS_METADATA,
  SET_USER_DATA,
  UPDATE_USER_DATA,
} from "./action-types";
import { Notify } from "components/Notification/Notification";

// import { updateSidebarData } from "../app/actions";

export type AppThunk = ActionCreator<
  ThunkAction<Promise<boolean>, UserState, null, Action<string>>
>;

export const setIsLoading = (payload): SetIsLoadingType => ({
  type: SET_IS_LOADING,
  payload,
});

export const setIsSubmitting = (payload): SetIsSubmittingType => ({
  type: SET_IS_SUBMITTING,
  payload,
});

export const setUserData = (payload): SetUserDataType => ({
  type: SET_USER_DATA,
  payload,
});

export const setUsersData = (payload): SetUsersDataType => ({
  type: SET_USERS_DATA,
  payload,
});

export const setUsersMetadata = (payload): SetUsersMetadataType => ({
  type: SET_USERS_METADATA,
  payload,
});

export const setSearchedUsersData = (payload): SetSearchedUsersDataType => ({
  type: SET_SEARCHED_USERS_DATA,
  payload,
});

export const resetSearchedUsersData = (payload): ResetSearchedUsersDataType => ({
  type: RESET_SEARCHED_USERS_DATA,
  payload,
});

export const createUserData = (payload): CreateUserDataType => ({
  type: CREATE_USER_DATA,
  payload,
});

export const removeUserData = (payload): RemoveUserDataType => ({
  type: REMOVE_USER_DATA,
  payload,
});

export const updateUserData = (payload): UpdateUserDataType => ({
  type: UPDATE_USER_DATA,
  payload,
});
export const setFcrsUserQueryResultData = (payload): SetFcrsUserQueryResultDataDataType => ({
  type: SET_FCRS_USER_QUERY_RESULT_DATA,
  payload,
});

export const setUser: AppThunk = (payload) => (dispatch: Dispatch) => {
  dispatch(setUserData(payload));
};

export const fetchUser: AppThunk =
  ({ userId }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setIsLoading(true));
      // const { data, status } = await network({ dispatch }).get(`${api.user}${userId}/`);
      const { data, status } = await network({ dispatch, sso: true }).get(`${api.user}${userId}/`);

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          dispatch(setUserData(data));
          dispatch(setIsLoading(false));
          return true;
        }
      }
      return false;
    } catch (error) {
      notifyError(error);
      dispatch(setIsLoading(false));
      return false;
    }
  };

export const fetchUsers: AppThunk =
  ({ query = defaultQuery }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      const link = generateQuery({ url: api.user, query });

      dispatch(setIsLoading(true));
      const { data, status } = await network({ dispatch }).get(link);

      if (status === 200 || (status > 200 && status < 300)) {
        const { results } = data;
        const metadata = generateMeta({ data, query, results });

        if (results) {
          dispatch(setUsersData(results));
          dispatch(setUsersMetadata(metadata));
          dispatch(setIsLoading(false));
          return true;
        }
      }
      return false;
    } catch (error) {
      dispatch(setIsLoading(false));
      notifyError(error);
      return false;
    }
  };

export const createUser: AppThunk =
  ({ values }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      dispatch(setIsSubmitting(true));
      const { data, status } = await network({ dispatch }).post(api.user, values);

      if (status === 200 || (status > 200 && status < 300)) {
        Notify("New User Added Successfully", {
          type: "success",
          position: "top-right",
        });
        dispatch(createUserData(data));
        dispatch(setIsSubmitting(false));
        return true;
      }
      return false;
    } catch (error) {
      notifyError(error);
      dispatch(setIsSubmitting(false));
      return false;
    }
  };

export const updateUser: AppThunk =
  ({ userId, values }) =>
  async (dispatch: Dispatch) => {
    try {
      // const body = formDataGenerator({ data: values });

      dispatch(setIsSubmitting(true));
      const { data, status } = await network({ dispatch }).put(`${api.user}${userId}`, values);

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          dispatch(updateUserData(data));
          dispatch(setIsSubmitting(false));
          return true;
        }
      }
      return false;
    } catch (error) {
      notifyError(error);
      dispatch(setIsSubmitting(false));
      return false;
    }
  };

export const updateUserPermission: AppThunk =
  ({ userId, values }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setIsSubmitting(true));
      const { data, status } = await network({ dispatch }).post(
        `${api.userPermission}${userId}/`,
        values,
      );

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          dispatch(updateUserData(data));
          dispatch(setIsSubmitting(false));
          return true;
        }
      }
      return false;
    } catch (error) {
      notifyError(error);
      dispatch(setIsSubmitting(false));
      return false;
    }
  };

export const deleteUser: AppThunk =
  ({ userId }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      dispatch(setIsSubmitting(true));
      const { status } = await network({ dispatch }).delete(`${api.user}${userId}/`);

      if (status === 200 || status > 200) {
        dispatch(removeUserData({ id: userId }));
        dispatch(setIsSubmitting(false));
        return true;
      }
      return false;
    } catch (error) {
      notifyError(error);
      dispatch(setIsSubmitting(false));
      return false;
    }
  };
