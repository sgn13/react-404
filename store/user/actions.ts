import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import api from "constants/api";

import { formDataGenerator, generateQuery, generateMeta } from "utils/store";
// import { setErrorMessage } from "store/app/actions";

import { network } from "utils/network";
import { defaultQuery } from "constants/query";
import {
  UserState,
  SetIsLoadingType,
  SetIsSubmittingType,
  SetUserDataType,
  SetUsersDataType,
  SetUsersMetadataType,
  SetSearchedUsersDataType,
  ResetSearchedUsersDataType,
  CreateUserDataType,
  RemoveUserDataType,
  UpdateUserDataType,
  SetFcrsUserQueryResultDataDataType,
} from "./types";
import {
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_USER_DATA,
  SET_USERS_DATA,
  SET_USERS_METADATA,
  SET_SEARCHED_USERS_DATA,
  RESET_SEARCHED_USERS_DATA,
  CREATE_USER_DATA,
  REMOVE_USER_DATA,
  UPDATE_USER_DATA,
  SET_FCRS_USER_QUERY_RESULT_DATA,
} from "./action-types";

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

export const fetchUser: AppThunk =
  ({ userId }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setIsLoading(true));
      // const { data, status } = await network({ dispatch }).get(`${api.user}${userId}/`);
      const { data, status } = await network({ dispatch, sso: true }).get(`${api.me}${userId}/`);

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          dispatch(setUserData(data));
          dispatch(setIsLoading(false));
          return true;
        }
      }
      return false;
    } catch (error) {
      // error.response && dispatch(setErrorMessage(error));
      dispatch(setIsLoading(false));
      return false;
    }
  };

export const fetchUsers: AppThunk =
  ({ query = q }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      const link = generateQuery({ url: api.user, query });

      dispatch(setIsLoading(true));
      const { data, status } = await network({ dispatch }).get(link);

      if (status === 200 || (status > 200 && status < 300)) {
        const { data: results } = data;
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
      // error.response && dispatch(setErrorMessage(error));
      dispatch(setIsLoading(false));
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
        dispatch(createUserData(data));
        dispatch(setIsSubmitting(false));

        return true;
      }
      return false;
    } catch (error) {
      // error.response && dispatch(setErrorMessage(error));
      dispatch(setIsSubmitting(false));
      return false;
    }
  };

export const updateUser: AppThunk =
  ({ userId, values }) =>
  async (dispatch: Dispatch) => {
    try {
      const body = formDataGenerator({ data: values });

      dispatch(setIsSubmitting(true));
      const { data, status } = await network({ dispatch }).patch(`${api.user}${userId}/`, body);

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          dispatch(updateUserData(data));
          dispatch(setIsSubmitting(false));
          return true;
        }
      }
      return false;
    } catch (error) {
      // error.response && dispatch(setErrorMessage(error));
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
      // error.response && dispatch(setErrorMessage(error));
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
      // error.response && dispatch(setErrorMessage(error));
      dispatch(setIsSubmitting(false));
      return false;
    }
  };
export const fetchFcrsUserSidebarMenu =
  ({ query = defaultQuery, search = false, columns, searchable, order }) =>
  async (dispatch) => {
    try {
      const link = generateQuery({
        url: api.user,
        query: { ...query, perPage: 1000 },
        columns,
        searchable,
        order,
      });

      dispatch(setIsLoading(true));
      const { data, status } = await network({ dispatch }).get(link);
      if (status === 200 || status === 201) {
        if (data) {
          const results = data.data;

          // dispatch(
          //   updateSidebarData([
          //     {
          //       icon: "",
          //       label: "Home",
          //       location: "top",
          //       path: "",
          //     },
          //     {
          //       icon: "",
          //       label: "Finacle Query",
          //       location: "top",
          //       path: app.finacle.execute(),
          //     },
          //     ...results.map((menu) => ({
          //       icon: "",
          //       label: menu.menu_name,
          //       location: "top",
          //       path: `/fcrs/user/execute/${menu.id}`,
          //     })),
          //   ]),
          // );
          dispatch(setIsLoading(false));
          return true;
        }
      }
    } catch (error) {
      dispatch(setIsLoading(false));
      // error.response && dispatch(setErrorMessage(error));
    }
    return false;
  };
