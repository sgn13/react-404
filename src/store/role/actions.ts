import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import api from "src/constants/api";

import { generateMeta, generateQuery } from "src/utils/store";
// import { setErrorMessage } from "store/app/actions";

import { network } from "src/utils/network";
import {
    CREATE_ROLE_DATA,
    REMOVE_ROLE_DATA,
    RESET_SEARCHED_ROLES_DATA,
    SET_IS_LOADING,
    SET_IS_SUBMITTING,
    SET_ROLES_DATA,
    SET_ROLES_METADATA,
    SET_ROLE_DATA,
    SET_SEARCHED_ROLES_DATA,
    UPDATE_ROLE_DATA,
} from "./action-types";
import {
    CreateRoleDataType,
    RemoveRoleDataType,
    ResetSearchedRolesDataType,
    RoleState,
    SetIsLoadingType,
    SetIsSubmittingType,
    SetRoleDataType,
    SetRolesDataType,
    SetRolesMetadataType,
    SetSearchedRolesDataType,
    UpdateRoleDataType,
} from "./types";

export type AppThunk = ActionCreator<
  ThunkAction<Promise<boolean>, RoleState, null, Action<string>>
>;

export const setIsLoading = (payload): SetIsLoadingType => ({
  type: SET_IS_LOADING,
  payload,
});

export const setIsSubmitting = (payload): SetIsSubmittingType => ({
  type: SET_IS_SUBMITTING,
  payload,
});

export const setRoleData = (payload): SetRoleDataType => ({
  type: SET_ROLE_DATA,
  payload,
});

export const setRolesData = (payload): SetRolesDataType => ({
  type: SET_ROLES_DATA,
  payload,
});

export const setRolesMetadata = (payload): SetRolesMetadataType => ({
  type: SET_ROLES_METADATA,
  payload,
});

export const setSearchedRolesData = (payload): SetSearchedRolesDataType => ({
  type: SET_SEARCHED_ROLES_DATA,
  payload,
});

export const resetSearchedRolesData = (payload): ResetSearchedRolesDataType => ({
  type: RESET_SEARCHED_ROLES_DATA,
  payload,
});

export const createRoleData = (payload): CreateRoleDataType => ({
  type: CREATE_ROLE_DATA,
  payload,
});

export const removeRoleData = (payload): RemoveRoleDataType => ({
  type: REMOVE_ROLE_DATA,
  payload,
});

export const updateRoleData = (payload): UpdateRoleDataType => ({
  type: UPDATE_ROLE_DATA,
  payload,
});

export const fetchRole: AppThunk =
  ({ roleId }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await network({ dispatch }).get(`${api.role}${roleId}/`);

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          dispatch(setRoleData(data));
          dispatch(setIsLoading(false));
          return true;
        }
      }
      return false;
    } catch (error) {
      // if (error.response) dispatch(setErrorMessage(error));
      dispatch(setIsLoading(false));
      return false;
    }
  };

export const fetchRoles: AppThunk =
  ({ query = q }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      const link = generateQuery({ url: api.role, query });

      dispatch(setIsLoading(true));
      const { data, status } = await network({ dispatch }).get(link);

      if (status === 200 || (status > 200 && status < 300)) {
        const { data: results } = data;
        const metadata = generateMeta({ data, query, results });

        if (results) {
          dispatch(setRolesData(results));
          dispatch(setRolesMetadata(metadata));
          dispatch(setIsLoading(false));
          return true;
        }
      }
      return false;
    } catch (error) {
      // if (error.response) dispatch(setErrorMessage(error));
      dispatch(setIsLoading(false));
      return false;
    }
  };

export const createRole: AppThunk =
  ({ values }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      dispatch(setIsSubmitting(true));
      const { data, status } = await network({ dispatch }).post(api.role, values);

      if (status === 200 || (status > 200 && status < 300)) {
        dispatch(createRoleData(data));
        dispatch(setIsSubmitting(false));

        return true;
      }
      return false;
    } catch (error) {
      // if (error.response) dispatch(setErrorMessage(error));
      dispatch(setIsSubmitting(false));
      return false;
    }
  };

export const updateRole: AppThunk =
  ({ roleId, values }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setIsSubmitting(true));
      const { data, status } = await network({ dispatch }).put(`${api.role}${roleId}/`, values);

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          dispatch(updateRoleData(data));
          dispatch(setIsSubmitting(false));
          return true;
        }
      }
      return false;
    } catch (error) {
      // if (error.response) dispatch(setErrorMessage(error));
      dispatch(setIsSubmitting(false));
      return false;
    }
  };

export const deleteRole: AppThunk =
  ({ roleId }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      dispatch(setIsSubmitting(true));
      const { status } = await network({ dispatch }).delete(`${api.role}${roleId}/`);

      if (status === 200 || status > 200) {
        dispatch(removeRoleData({ id: roleId }));
        dispatch(setIsSubmitting(false));
        return true;
      }
      return false;
    } catch (error) {
      // if (error.response) dispatch(setErrorMessage(error));
      dispatch(setIsSubmitting(false));
      return false;
    }
  };
