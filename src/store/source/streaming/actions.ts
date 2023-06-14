import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import {
  CREATE_STREAMING_DATA,
  REMOVE_STREAMING_DATA,
  RESET_SEARCHED_STREAMINGS_DATA,
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_SEARCHED_STREAMINGS_DATA,
  SET_STREAMINGS_DATA,
  SET_STREAMINGS_METADATA,
  SET_STREAMING_DATA,
  UPDATE_STREAMING_DATA,
} from './action-types';

import {
  CreateStreamingDataType,
  RemoveStreamingDataType,
  ResetSearchedStreamingsDataType,
  SetIsLoadingType,
  SetIsSubmittingType,
  SetSearchedStreamingsDataType,
  SetStreamingDataType,
  SetStreamingsDataType,
  SetStreamingsMetadataType,
  StreamingState,
  UpdateStreamingDataType,
} from './types';

import api from 'src/constants/api';

import { setErrorMessage } from 'src/store/app/actions';
import { generateQuery } from 'src/utils/store';

import { defaultQuery } from 'src/constants/query';
import { network } from 'src/utils/network';

export type AppThunk = ActionCreator<
  ThunkAction<Promise<boolean>, StreamingState, null, Action<string>>
>;

export const setIsLoading = (payload: any): SetIsLoadingType => ({
  type: SET_IS_LOADING,
  payload,
});

export const setIsSubmitting = (payload: any): SetIsSubmittingType => ({
  type: SET_IS_SUBMITTING,
  payload,
});

export const setStreamingData = (payload: any): SetStreamingDataType => ({
  type: SET_STREAMING_DATA,
  payload,
});

export const setStreamingsData = (payload: any): SetStreamingsDataType => ({
  type: SET_STREAMINGS_DATA,
  payload,
});

export const setStreamingsMetadata = (
  payload: any
): SetStreamingsMetadataType => ({
  type: SET_STREAMINGS_METADATA,
  payload,
});

export const setSearchedStreamingsData = (
  payload: any
): SetSearchedStreamingsDataType => ({
  type: SET_SEARCHED_STREAMINGS_DATA,
  payload,
});

export const resetSearchedStreamingsData = (
  payload: any
): ResetSearchedStreamingsDataType => ({
  type: RESET_SEARCHED_STREAMINGS_DATA,
  payload,
});

export const createStreamingData = (payload: any): CreateStreamingDataType => ({
  type: CREATE_STREAMING_DATA,
  payload,
});

export const removeStreamingData = (payload: any): RemoveStreamingDataType => ({
  type: REMOVE_STREAMING_DATA,
  payload,
});

export const updateStreamingData = (payload: any): UpdateStreamingDataType => ({
  type: UPDATE_STREAMING_DATA,
  payload,
});

export const fetchStreaming: AppThunk =
  ({ streamingId }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await network({}).get(
        `${api.configuration.streaming}${streamingId}/`
      );

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          dispatch(setStreamingData(data));
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

export const fetchStreamings: AppThunk =
  ({ query = defaultQuery, columns, searchable, search }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      const link = generateQuery({
        url: api.source.streaming,
        query,
        columns,
        searchable,
      });

      dispatch(setIsLoading(true));
      const { data, status } = await network({}).get(link);
      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          search
            ? dispatch(setSearchedStreamingsData(data))
            : dispatch(setStreamingsData(data));

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

export const createStreaming: AppThunk =
  ({ values }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      dispatch(setIsSubmitting(true));
      const { data, status } = await network({}).post(api.source.streaming, [
        values,
      ]);
      if (status === 200 || (status > 200 && status < 300)) {
        dispatch(createStreamingData(data.data[0]));
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

export const updateStreaming: AppThunk =
  ({ streamingId, values }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setIsSubmitting(true));
      const { data, status } = await network({}).put(
        `${api.source.streaming}${streamingId}`,
        values
      );

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          console.log(data, 'das');
          dispatch(updateStreamingData(data.data));
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

export const deleteStreaming: AppThunk =
  ({ streamingId }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      dispatch(setIsSubmitting(true));
      const { status } = await network({}).delete(api.source.streaming, {
        data: { ids: streamingId },
      });

      if (status === 200 || status > 200) {
        dispatch(removeStreamingData({ id: streamingId }));
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
