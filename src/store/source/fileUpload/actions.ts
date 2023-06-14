import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import {
  CREATE_FILEUPLOAD_DATA,
  REMOVE_FILEUPLOAD_DATA,
  RESET_SEARCHED_FILEUPLOADS_DATA,
  SET_FILEUPLOAD_DATA,
  SET_FILEUPLOADS_DATA,
  SET_FILEUPLOADS_METADATA,
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_SEARCHED_FILEUPLOADS_DATA,
  UPDATE_FILEUPLOAD_DATA,
} from './action-types';

import {
  CreateFileUploadDataType,
  FileUploadState,
  RemoveFileUploadDataType,
  ResetSearchedFileUploadsDataType,
  SetFileUploadDataType,
  SetFileUploadsDataType,
  SetFileUploadsMetadataType,
  SetIsLoadingType,
  SetIsSubmittingType,
  SetSearchedFileUploadsDataType,
  UpdateFileUploadDataType,
} from './types';

import api from 'src/constants/api';

import { setErrorMessage } from 'src/store/app/actions';
import { generateQuery } from 'src/utils/store';

import { defaultQuery } from 'src/constants/query';
import { network } from 'src/utils/network';

export type AppThunk = ActionCreator<
  ThunkAction<Promise<boolean>, FileUploadState, null, Action<string>>
>;

export const setIsLoading = (payload: any): SetIsLoadingType => ({
  type: SET_IS_LOADING,
  payload,
});

export const setIsSubmitting = (payload: any): SetIsSubmittingType => ({
  type: SET_IS_SUBMITTING,
  payload,
});

export const setFileUploadData = (payload: any): SetFileUploadDataType => ({
  type: SET_FILEUPLOAD_DATA,
  payload,
});

export const setFileUploadsData = (payload: any): SetFileUploadsDataType => ({
  type: SET_FILEUPLOADS_DATA,
  payload,
});

export const setFileUploadsMetadata = (
  payload: any
): SetFileUploadsMetadataType => ({
  type: SET_FILEUPLOADS_METADATA,
  payload,
});

export const setSearchedFileUploadsData = (
  payload: any
): SetSearchedFileUploadsDataType => ({
  type: SET_SEARCHED_FILEUPLOADS_DATA,
  payload,
});

export const resetSearchedFileUploadsData = (
  payload: any
): ResetSearchedFileUploadsDataType => ({
  type: RESET_SEARCHED_FILEUPLOADS_DATA,
  payload,
});

export const createFileUploadData = (
  payload: any
): CreateFileUploadDataType => ({
  type: CREATE_FILEUPLOAD_DATA,
  payload,
});

export const removeFileUploadData = (
  payload: any
): RemoveFileUploadDataType => ({
  type: REMOVE_FILEUPLOAD_DATA,
  payload,
});

export const updateFileUploadData = (
  payload: any
): UpdateFileUploadDataType => ({
  type: UPDATE_FILEUPLOAD_DATA,
  payload,
});

export const fetchFileUpload: AppThunk =
  ({ fileUploadId }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await network({}).get(
        `${api.source.fileUpload}${fileUploadId}/`
      );

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          dispatch(setFileUploadData(data));
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

export const fetchFileUploads: AppThunk =
  ({ query = defaultQuery, columns, searchable, search }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      const link = generateQuery({
        url: api.source.fileUpload,
        query,
        columns,
        searchable,
      });

      dispatch(setIsLoading(true));
      const { data, status } = await network({}).get(link);
      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          search
            ? dispatch(setSearchedFileUploadsData(data))
            : dispatch(setFileUploadsData(data));

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

export const createFileUpload: AppThunk =
  ({ values }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      dispatch(setIsSubmitting(true));
      const { data, status } = await network({}).post(api.source.fileUpload, [
        values,
      ]);
      if (status === 200 || (status > 200 && status < 300)) {
        dispatch(createFileUploadData(data.data[0]));
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

export const updateFileUpload: AppThunk =
  ({ fileUploadId, values }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setIsSubmitting(true));
      const { data, status } = await network({}).put(
        `${api.source.fileUpload}${fileUploadId}`,
        values
      );

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          dispatch(updateFileUploadData(data.data));
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

export const deleteFileUpload: AppThunk =
  ({ fileUploadId }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      dispatch(setIsSubmitting(true));
      const { status } = await network({}).delete(api.source.fileUpload, {
        data: { ids: fileUploadId },
      });

      if (status === 200 || status > 200) {
        dispatch(removeFileUploadData({ id: fileUploadId }));
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
