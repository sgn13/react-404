import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import {
  CREATE_LIBRARY_DATA,
  REMOVE_LIBRARY_DATA,
  RESET_SEARCHED_LIBRARYS_DATA,
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_LIBRARYS_DATA,
  SET_LIBRARYS_METADATA,
  SET_LIBRARY_DATA,
  SET_SEARCHED_LIBRARYS_DATA,
  UPDATE_LIBRARY_DATA,
} from './action-types';

import {
  CreateLibraryDataType,
  LibraryState,
  RemoveLibraryDataType,
  ResetSearchedLibrarysDataType,
  SetIsLoadingType,
  SetIsSubmittingType,
  SetLibraryDataType,
  SetLibrarysDataType,
  SetLibrarysMetadataType,
  SetSearchedLibrarysDataType,
  UpdateLibraryDataType,
} from './types';

import api from 'src/constants/api';

import { setErrorMessage } from 'src/store/app/actions';
import { generateMeta, generateQuery } from 'src/utils/store';

import { defaultQuery } from 'src/constants/query';
import { network } from 'src/utils/network';

export type AppThunk = ActionCreator<
  ThunkAction<Promise<boolean>, LibraryState, null, Action<string>>
>;

export const setIsLoading = (payload: any): SetIsLoadingType => ({
  type: SET_IS_LOADING,
  payload,
});

export const setIsSubmitting = (payload: any): SetIsSubmittingType => ({
  type: SET_IS_SUBMITTING,
  payload,
});

export const setLibraryData = (payload: any): SetLibraryDataType => ({
  type: SET_LIBRARY_DATA,
  payload,
});

export const setLibrarysData = (payload: any): SetLibrarysDataType => ({
  type: SET_LIBRARYS_DATA,
  payload,
});

export const setLibrarysMetadata = (payload: any): SetLibrarysMetadataType => ({
  type: SET_LIBRARYS_METADATA,
  payload,
});

export const setSearchedLibrarysData = (
  payload: any
): SetSearchedLibrarysDataType => ({
  type: SET_SEARCHED_LIBRARYS_DATA,
  payload,
});

export const resetSearchedLibrarysData = (
  payload: any
): ResetSearchedLibrarysDataType => ({
  type: RESET_SEARCHED_LIBRARYS_DATA,
  payload,
});

export const createLibraryData = (payload: any): CreateLibraryDataType => ({
  type: CREATE_LIBRARY_DATA,
  payload,
});

export const removeLibraryData = (payload: any): RemoveLibraryDataType => ({
  type: REMOVE_LIBRARY_DATA,
  payload,
});

export const updateLibraryData = (payload: any): UpdateLibraryDataType => ({
  type: UPDATE_LIBRARY_DATA,
  payload,
});

export const fetchLibrary: AppThunk =
  ({ libraryId }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await network({}).get(
        `${api.configuration.library}${libraryId}/`
      );

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          dispatch(setLibraryData(data));
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

export const fetchLibrarys: AppThunk =
  ({ query = defaultQuery, columns, searchable, search }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      const link = generateQuery({
        url: api.configuration.library,
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
            ? dispatch(setSearchedLibrarysData(result))
            : dispatch(setLibrarysData(result));
          dispatch(setIsLoading(false));
          const metadata = generateMeta({ query, data });
          dispatch(setLibrarysMetadata(metadata));
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

export const createLibrary: AppThunk =
  ({ values }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      // const formDataValues = getFormData(values);
      dispatch(setIsSubmitting(true));
      const { data, status } = await network({}).post(
        api.configuration.library,
        [values]
      );
      if (status === 200 || (status > 200 && status < 300)) {
        return true;
      }
      return false;
    } catch (error: any) {
      error.response && dispatch(setErrorMessage(error));
      dispatch(setIsSubmitting(false));
      return false;
    }
  };

export const updateLibrary: AppThunk =
  ({ libraryId, values }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setIsSubmitting(true));
      const { data, status } = await network({}).put(
        `${api.configuration.library}${libraryId}`,
        values
      );

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          dispatch(updateLibraryData(data.data));
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

export const deleteLibrary: AppThunk =
  ({ libraryId }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      console.log(libraryId);

      dispatch(setIsSubmitting(true));
      const { status } = await network({}).delete(api.configuration.library, {
        data: { ids: libraryId },
      });

      if (status === 200 || status > 200) {
        dispatch(removeLibraryData({ id: libraryId }));
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
