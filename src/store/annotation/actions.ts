import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import api from "src/constants/api";

import { setErrorMessage } from "src/store/app/actions";
import { generateMeta, generateQuery } from "src/utils/store";

import { defaultQuery } from "src/constants/query";
import { network } from "src/utils/network";
import {
  CREATE_ANNOTATION_DATA,
  REMOVE_ANNOTATION_DATA,
  RESET_SEARCHED_ANNOTATIONS_DATA,
  SET_ANNOTATIONS_DATA,
  SET_ANNOTATIONS_METADATA,
  SET_ANNOTATION_DATA,
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_SEARCHED_ANNOTATIONS_DATA,
  UPDATE_ANNOTATION_DATA,
} from "./action-types";
import {
  AnnotationState,
  CreateAnnotationDataType,
  RemoveAnnotationDataType,
  ResetSearchedAnnotationsDataType,
  SetAnnotationDataType,
  SetAnnotationsDataType,
  SetAnnotationsMetadataType,
  SetIsLoadingType,
  SetIsSubmittingType,
  SetSearchedAnnotationsDataType,
  UpdateAnnotationDataType,
} from "./types";

export type AppThunk = ActionCreator<
  ThunkAction<Promise<boolean>, AnnotationState, null, Action<string>>
>;

export const setIsLoading = (payload: any): SetIsLoadingType => ({
  type: SET_IS_LOADING,
  payload,
});

export const setIsSubmitting = (payload: any): SetIsSubmittingType => ({
  type: SET_IS_SUBMITTING,
  payload,
});

export const setAnnotationData = (payload: any): SetAnnotationDataType => ({
  type: SET_ANNOTATION_DATA,
  payload,
});

export const setAnnotationsData = (payload: any): SetAnnotationsDataType => ({
  type: SET_ANNOTATIONS_DATA,
  payload,
});

export const setAnnotationsMetadata = (payload: any): SetAnnotationsMetadataType => ({
  type: SET_ANNOTATIONS_METADATA,
  payload,
});

export const setSearchedAnnotationsData = (payload: any): SetSearchedAnnotationsDataType => ({
  type: SET_SEARCHED_ANNOTATIONS_DATA,
  payload,
});

export const resetSearchedAnnotationsData = (payload: any): ResetSearchedAnnotationsDataType => ({
  type: RESET_SEARCHED_ANNOTATIONS_DATA,
  payload,
});

export const createAnnotationData = (payload: any): CreateAnnotationDataType => ({
  type: CREATE_ANNOTATION_DATA,
  payload,
});

export const removeAnnotationData = (payload: any): RemoveAnnotationDataType => ({
  type: REMOVE_ANNOTATION_DATA,
  payload,
});

export const updateAnnotationData = (payload: any): UpdateAnnotationDataType => ({
  type: UPDATE_ANNOTATION_DATA,
  payload,
});

export const fetchAnnotation: AppThunk =
  ({ annotationId }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await network({}).get(`${api.annotation.annotate}${annotationId}/`);

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          dispatch(setAnnotationData(data));
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

export const fetchAnnotations: AppThunk =
  ({ query = defaultQuery, columns, searchable, search }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      const link = generateQuery({
        url: api.annotation.annotate,
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
            ? dispatch(setSearchedAnnotationsData(result))
            : dispatch(setAnnotationsData(result));
          const metadata = generateMeta({ query, data });
          dispatch(setAnnotationsMetadata(metadata));
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

export const createAnnotation: AppThunk =
  ({ values }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      dispatch(setIsSubmitting(true));
      const { data, status } = await network({}).post(api.annotation.annotate, [values]);
      if (status === 200 || (status > 200 && status < 300)) {
        dispatch(createAnnotationData(data.data[0]));
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

export const updateAnnotation: AppThunk =
  ({ annotationId, values }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setIsSubmitting(true));
      const { data, status } = await network({}).put(
        `${api.annotation.annotate}${annotationId}`,
        values,
      );

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          console.log(data, "das");
          dispatch(updateAnnotationData(data.data));
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

export const deleteAnnotation: AppThunk =
  ({ annotationId }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      console.log(annotationId);

      dispatch(setIsSubmitting(true));
      const { status } = await network({}).delete(api.annotation.annotate, {
        data: { ids: annotationId },
      });

      if (status === 200 || status > 200) {
        dispatch(removeAnnotationData({ id: annotationId }));
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
