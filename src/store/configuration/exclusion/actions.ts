import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import {
  CREATE_EXCLUSION_DATA,
  REMOVE_EXCLUSION_DATA,
  RESET_SEARCHED_EXCLUSIONS_DATA,
  SET_EXCLUSION_DATA,
  SET_EXCLUSIONS_DATA,
  SET_EXCLUSIONS_METADATA,
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_SEARCHED_EXCLUSIONS_DATA,
  UPDATE_EXCLUSION_DATA,
} from './action-types';

import {
  CreateExclusionDataType,
  ExclusionState,
  RemoveExclusionDataType,
  ResetSearchedExclusionsDataType,
  SetExclusionDataType,
  SetExclusionsDataType,
  SetExclusionsMetadataType,
  SetIsLoadingType,
  SetIsSubmittingType,
  SetSearchedExclusionsDataType,
  UpdateExclusionDataType,
} from './types';

import api from 'src/constants/api';

import { setErrorMessage } from 'src/store/app/actions';
import { generateMeta, generateQuery } from 'src/utils/store';

import { defaultQuery } from 'src/constants/query';
import { network } from 'src/utils/network';

export type AppThunk = ActionCreator<
  ThunkAction<Promise<boolean>, ExclusionState, null, Action<string>>
>;

export const setIsLoading = (payload: any): SetIsLoadingType => ({
  type: SET_IS_LOADING,
  payload,
});

export const setIsSubmitting = (payload: any): SetIsSubmittingType => ({
  type: SET_IS_SUBMITTING,
  payload,
});

export const setExclusionData = (payload: any): SetExclusionDataType => ({
  type: SET_EXCLUSION_DATA,
  payload,
});

export const setExclusionsData = (payload: any): SetExclusionsDataType => ({
  type: SET_EXCLUSIONS_DATA,
  payload,
});

export const setExclusionsMetadata = (
  payload: any
): SetExclusionsMetadataType => ({
  type: SET_EXCLUSIONS_METADATA,
  payload,
});

export const setSearchedExclusionsData = (
  payload: any
): SetSearchedExclusionsDataType => ({
  type: SET_SEARCHED_EXCLUSIONS_DATA,
  payload,
});

export const resetSearchedExclusionsData = (
  payload: any
): ResetSearchedExclusionsDataType => ({
  type: RESET_SEARCHED_EXCLUSIONS_DATA,
  payload,
});

export const createExclusionData = (payload: any): CreateExclusionDataType => ({
  type: CREATE_EXCLUSION_DATA,
  payload,
});

export const removeExclusionData = (payload: any): RemoveExclusionDataType => ({
  type: REMOVE_EXCLUSION_DATA,
  payload,
});

export const updateExclusionData = (payload: any): UpdateExclusionDataType => ({
  type: UPDATE_EXCLUSION_DATA,
  payload,
});

export const fetchExclusion: AppThunk =
  ({ exclusionId }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await network({}).get(
        `${api.configuration.exclusion}${exclusionId}/`
      );

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          dispatch(setExclusionData(data));
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

export const fetchExclusions: AppThunk =
  ({ query = defaultQuery, columns, searchable, search }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      const link = generateQuery({
        url: api.configuration.exclusion,
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
            ? dispatch(setSearchedExclusionsData(result))
            : dispatch(setExclusionsData(result));
          const metadata = generateMeta({ query, data });
          dispatch(setExclusionsMetadata(metadata));
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

export const createExclusion: AppThunk =
  ({ values }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      dispatch(setIsSubmitting(true));
      const { data, status } = await network({}).post(
        api.configuration.exclusion,
        [values]
      );
      if (status === 200 || (status > 200 && status < 300)) {
        dispatch(createExclusionData(data.data[0]));
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

export const updateExclusion: AppThunk =
  ({ exclusionId, values }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setIsSubmitting(true));
      const { data, status } = await network({}).put(
        `${api.configuration.exclusion}${exclusionId}`,
        values
      );

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          console.log(data, 'das');
          dispatch(updateExclusionData(data.data));
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

export const deleteExclusion: AppThunk =
  ({ exclusionId }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      console.log(exclusionId);

      dispatch(setIsSubmitting(true));
      const { status } = await network({}).delete(api.configuration.exclusion, {
        data: { ids: exclusionId },
      });

      if (status === 200 || status > 200) {
        dispatch(removeExclusionData({ id: exclusionId }));
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
