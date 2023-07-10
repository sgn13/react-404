import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import {
  CREATE_ANNOTATION_DATA_DATA,
  REMOVE_ANNOTATION_DATA_DATA,
  RESET_SEARCHED_ANNOTATION_DATAS_DATA,
  SET_ANNOTATION_DATAS_DATA,
  SET_ANNOTATION_DATAS_METADATA,
  SET_ANNOTATION_DATA_DATA,
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_SEARCHED_ANNOTATION_DATAS_DATA,
  UPDATE_ANNOTATION_DATA_DATA,
} from './action-types';

import {
  CreateAnnotationDataDataType,
  AnnotationDataState,
  RemoveAnnotationDataDataType,
  ResetSearchedAnnotationDatasDataType,
  SetAnnotationDataDataType,
  SetAnnotationDatasDataType,
  SetAnnotationDatasMetadataType,
  SetIsLoadingType,
  SetIsSubmittingType,
  SetSearchedAnnotationDatasDataType,
  UpdateAnnotationDataDataType,
} from './types';

import api from 'src/constants/api';

import { setErrorMessage } from 'src/store/app/actions';
import { generateQuery } from 'src/utils/store';

import { defaultQuery } from 'src/constants/query';
import { network } from 'src/utils/network';

export type AppThunk = ActionCreator<
  ThunkAction<Promise<boolean>, AnnotationDataState, null, Action<string>>
>;

export const setIsLoading = (payload: any): SetIsLoadingType => ({
  type: SET_IS_LOADING,
  payload,
});

export const setIsSubmitting = (payload: any): SetIsSubmittingType => ({
  type: SET_IS_SUBMITTING,
  payload,
});

export const setAnnotationDataData = (
  payload: any
): SetAnnotationDataDataType => ({
  type: SET_ANNOTATION_DATA_DATA,
  payload,
});

export const setAnnotationDatasData = (
  payload: any
): SetAnnotationDatasDataType => ({
  type: SET_ANNOTATION_DATAS_DATA,
  payload,
});

export const setAnnotationDatasMetadata = (
  payload: any
): SetAnnotationDatasMetadataType => ({
  type: SET_ANNOTATION_DATAS_METADATA,
  payload,
});

export const setSearchedAnnotationDatasData = (
  payload: any
): SetSearchedAnnotationDatasDataType => ({
  type: SET_SEARCHED_ANNOTATION_DATAS_DATA,
  payload,
});

export const resetSearchedAnnotationDatasData = (
  payload: any
): ResetSearchedAnnotationDatasDataType => ({
  type: RESET_SEARCHED_ANNOTATION_DATAS_DATA,
  payload,
});

export const createAnnotationDataData = (
  payload: any
): CreateAnnotationDataDataType => ({
  type: CREATE_ANNOTATION_DATA_DATA,
  payload,
});

export const removeAnnotationDataData = (
  payload: any
): RemoveAnnotationDataDataType => ({
  type: REMOVE_ANNOTATION_DATA_DATA,
  payload,
});

export const updateAnnotationDataData = (
  payload: any
): UpdateAnnotationDataDataType => ({
  type: UPDATE_ANNOTATION_DATA_DATA,
  payload,
});

export const fetchAnnotationData: AppThunk =
  ({ annotationDataId }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await network({}).get(
        `${api.source.annotationData}${annotationDataId}/`
      );

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          dispatch(setAnnotationDataData(data));
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

export const fetchAnnotationDatas: AppThunk =
  ({ query = defaultQuery, columns, searchable, search }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      const link = generateQuery({
        url: api.source.annotationData,
        query,
        columns,
        searchable,
      });

      dispatch(setIsLoading(true));
      const { data, status } = await network({ requireToken: true }).get(link);
      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          search
            ? dispatch(setSearchedAnnotationDatasData(data))
            : dispatch(setAnnotationDatasData(data));
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

export const createAnnotationData: AppThunk =
  ({ values }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      dispatch(setIsSubmitting(true));
      const { data, status } = await network({}).post(
        api.source.annotationData,
        values
      );
      console.log(data, 'dadadatatat');

      if (status === 200 || (status > 200 && status < 300)) {
        // dispatch(createAnnotationDataData(data?.data?.[0]));
        dispatch(setIsSubmitting(false));
        localStorage.setItem('images', data?.images);
        return true;
      }
      return false;
    } catch (error: any) {
      console.log(error);
      error.response && dispatch(setErrorMessage(error));
      dispatch(setIsSubmitting(false));
      return false;
    }
  };

export const updateAnnotationData: AppThunk =
  ({ annotationDataId, values }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setIsSubmitting(true));
      const { data, status } = await network({}).put(
        `${api.source.annotationData}/${annotationDataId}`,
        values
      );

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          dispatch(updateAnnotationDataData(data.data));
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

export const deleteAnnotationData: AppThunk =
  ({ annotationDataId }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      dispatch(setIsSubmitting(true));
      const { status } = await network({}).delete(api.source.annotationData, {
        data: { ids: annotationDataId },
      });

      if (status === 200 || status > 200) {
        dispatch(removeAnnotationDataData({ id: annotationDataId }));
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
