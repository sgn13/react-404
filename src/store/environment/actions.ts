import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import api from "src/constants/api";

import { setErrorMessage } from "src/store/app/actions";
import { generateMeta, generateQuery } from "src/utils/store";

import { defaultQuery } from "src/constants/query";
import { network } from "src/utils/network";
import {
  EnvironmentState,
  CreateEnvironmentDataType,
  RemoveEnvironmentDataType,
  ResetSearchedEnvironmentsDataType,
  SetEnvironmentDataType,
  SetEnvironmentsDataType,
  SetEnvironmentsMetadataType,
  SetIsLoadingType,
  SetIsSubmittingType,
  SetSearchedEnvironmentsDataType,
  UpdateEnvironmentDataType,
} from "./types";
import {
  CREATE_ENVIRONMENT_DATA,
  REMOVE_ENVIRONMENT_DATA,
  RESET_SEARCHED_ENVIRONMENTS_DATA,
  SET_ENVIRONMENTS_DATA,
  SET_ENVIRONMENTS_METADATA,
  SET_ENVIRONMENT_DATA,
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_SEARCHED_ENVIRONMENTS_DATA,
  UPDATE_ENVIRONMENT_DATA,
} from "./action-types";

export type AppThunk = ActionCreator<
  ThunkAction<Promise<boolean>, EnvironmentState, null, Action<string>>
>;

export const setIsLoading = (payload: any): SetIsLoadingType => ({
  type: SET_IS_LOADING,
  payload,
});

export const setIsSubmitting = (payload: any): SetIsSubmittingType => ({
  type: SET_IS_SUBMITTING,
  payload,
});

export const setEnvironmentData = (payload: any): SetEnvironmentDataType => ({
  type: SET_ENVIRONMENT_DATA,
  payload,
});

export const setEnvironmentsData = (payload: any): SetEnvironmentsDataType => ({
  type: SET_ENVIRONMENTS_DATA,
  payload,
});

export const setEnvironmentsMetadata = (payload: any): SetEnvironmentsMetadataType => ({
  type: SET_ENVIRONMENTS_METADATA,
  payload,
});

export const setSearchedEnvironmentsData = (payload: any): SetSearchedEnvironmentsDataType => ({
  type: SET_SEARCHED_ENVIRONMENTS_DATA,
  payload,
});

export const resetSearchedEnvironmentsData = (payload: any): ResetSearchedEnvironmentsDataType => ({
  type: RESET_SEARCHED_ENVIRONMENTS_DATA,
  payload,
});

export const createEnvironmentData = (payload: any): CreateEnvironmentDataType => ({
  type: CREATE_ENVIRONMENT_DATA,
  payload,
});

export const removeEnvironmentData = (payload: any): RemoveEnvironmentDataType => ({
  type: REMOVE_ENVIRONMENT_DATA,
  payload,
});

export const updateEnvironmentData = (payload: any): UpdateEnvironmentDataType => ({
  type: UPDATE_ENVIRONMENT_DATA,
  payload,
});

export const fetchEnvironment: AppThunk =
  ({ environmentId }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await network({}).get(`${api.environment.root}${environmentId}`);

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          dispatch(setEnvironmentData(data));
          dispatch(setIsLoading(false));
          return true;
        }
      }
      return false;
    } catch (error: any) {
      error.response && dispatch(setErrorMessage(error));
      dispatch(setIsLoading(false));
      return false;
    }
  };

export const fetchEnvironments: AppThunk =
  ({ query = defaultQuery, columns, searchable, search }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      const link = generateQuery({
        url: api.environment.root,
        query,
        columns,
        searchable,
      });

      dispatch(setIsLoading(true));
      const { data, status } = await network({}).get(link);

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          const result = {
            items: data?.items || [],
            headers: data?.headers || {},
          };
          search
            ? dispatch(setSearchedEnvironmentsData(result))
            : dispatch(setEnvironmentsData(result));
          const metadata = generateMeta({ query, data });
          dispatch(setEnvironmentsMetadata(metadata));
          dispatch(setIsLoading(false));
          return true;
        }
      }
      return false;
    } catch (error: any) {
      error.response && dispatch(setErrorMessage(error));
      dispatch(setIsLoading(false));
      return false;
    }
  };

export const createEnvironment: AppThunk =
  ({ values }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      dispatch(setIsSubmitting(true));
      const { data, status } = await network({}).post(api.environment.root, [values]);
      if (status === 200 || (status > 200 && status < 300)) {
        dispatch(createEnvironmentData(data.data[0]));
        dispatch(setIsSubmitting(false));

        return true;
      }
      return false;
    } catch (error: any) {
      error.response && dispatch(setErrorMessage(error));
      dispatch(setIsSubmitting(false));
      return false;
    }
  };

export const updateEnvironment: AppThunk =
  ({ environmentId, values }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setIsSubmitting(true));
      const { data, status } = await network({}).put(
        `${api.environment.root}${environmentId}`,
        values,
      );

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          dispatch(updateEnvironmentData(data.data));
          dispatch(setIsSubmitting(false));
          return true;
        }
      }
      return false;
    } catch (error: any) {
      error.response && dispatch(setErrorMessage(error));
      dispatch(setIsSubmitting(false));
      return false;
    }
  };

export const deleteEnvironment: AppThunk =
  ({ environmentId }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      console.log(environmentId);

      dispatch(setIsSubmitting(true));
      const { status } = await network({}).delete(api.environment.root, {
        data: { ids: environmentId },
      });

      if (status === 200 || status > 200) {
        dispatch(removeEnvironmentData({ id: environmentId }));
        dispatch(setIsSubmitting(false));

        return true;
      }
      return false;
    } catch (error: any) {
      error.response && dispatch(setErrorMessage(error));
      dispatch(setIsSubmitting(false));
      return false;
    }
  };
