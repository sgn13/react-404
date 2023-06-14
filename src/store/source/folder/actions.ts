import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import {
  CREATE_FOLDER_DATA,
  REMOVE_FOLDER_DATA,
  RESET_SEARCHED_FOLDERS_DATA,
  SET_FOLDERS_DATA,
  SET_FOLDERS_METADATA,
  SET_FOLDER_DATA,
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_SEARCHED_FOLDERS_DATA,
  UPDATE_FOLDER_DATA,
} from './action-types';

import {
  CreateFolderDataType,
  FolderState,
  RemoveFolderDataType,
  ResetSearchedFoldersDataType,
  SetFolderDataType,
  SetFoldersDataType,
  SetFoldersMetadataType,
  SetIsLoadingType,
  SetIsSubmittingType,
  SetSearchedFoldersDataType,
  UpdateFolderDataType,
} from './types';

import api from 'src/constants/api';

import { setErrorMessage } from 'src/store/app/actions';
import { generateQuery } from 'src/utils/store';

import { defaultQuery } from 'src/constants/query';
import { network } from 'src/utils/network';

export type AppThunk = ActionCreator<
  ThunkAction<Promise<boolean>, FolderState, null, Action<string>>
>;

export const setIsLoading = (payload: any): SetIsLoadingType => ({
  type: SET_IS_LOADING,
  payload,
});

export const setIsSubmitting = (payload: any): SetIsSubmittingType => ({
  type: SET_IS_SUBMITTING,
  payload,
});

export const setFolderData = (payload: any): SetFolderDataType => ({
  type: SET_FOLDER_DATA,
  payload,
});

export const setFoldersData = (payload: any): SetFoldersDataType => ({
  type: SET_FOLDERS_DATA,
  payload,
});

export const setFoldersMetadata = (payload: any): SetFoldersMetadataType => ({
  type: SET_FOLDERS_METADATA,
  payload,
});

export const setSearchedFoldersData = (
  payload: any
): SetSearchedFoldersDataType => ({
  type: SET_SEARCHED_FOLDERS_DATA,
  payload,
});

export const resetSearchedFoldersData = (
  payload: any
): ResetSearchedFoldersDataType => ({
  type: RESET_SEARCHED_FOLDERS_DATA,
  payload,
});

export const createFolderData = (payload: any): CreateFolderDataType => ({
  type: CREATE_FOLDER_DATA,
  payload,
});

export const removeFolderData = (payload: any): RemoveFolderDataType => ({
  type: REMOVE_FOLDER_DATA,
  payload,
});

export const updateFolderData = (payload: any): UpdateFolderDataType => ({
  type: UPDATE_FOLDER_DATA,
  payload,
});

export const fetchFolder: AppThunk =
  ({ folderId }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await network({}).get(
        `${api.folder}${folderId}/`
      );

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          dispatch(setFolderData(data));
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

export const fetchFolders: AppThunk =
  ({ query = defaultQuery, columns, searchable, search }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      const link = generateQuery({
        url: api.folder,
        query,
        columns,
        searchable,
      });

      dispatch(setIsLoading(true));
      const { data, status } = await network({ requireToken: true }).get(link);
      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          search
            ? dispatch(setSearchedFoldersData(data))
            : dispatch(setFoldersData(data));
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

export const createFolder: AppThunk =
  ({ values }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      dispatch(setIsSubmitting(true));
      const { data, status } = await network({}).post(api.folder, [values]);
      if (status === 200 || (status > 200 && status < 300)) {
        dispatch(createFolderData(data.data[0]));
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

export const updateFolder: AppThunk =
  ({ folderId, values }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setIsSubmitting(true));
      const { data, status } = await network({}).put(
        `${api.folder}/${folderId}`,
        values
      );

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          dispatch(updateFolderData(data.data));
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

export const deleteFolder: AppThunk =
  ({ folderId }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      dispatch(setIsSubmitting(true));
      const { status } = await network({}).delete(api.folder, {
        data: { ids: folderId },
      });

      if (status === 200 || status > 200) {
        dispatch(removeFolderData({ id: folderId }));
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
