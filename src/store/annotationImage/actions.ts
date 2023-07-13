import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import api from "src/constants/api";

import { setErrorMessage } from "src/store/app/actions";
import { generateQuery } from "src/utils/store";

import { defaultQuery } from "src/constants/query";
import { network } from "src/utils/network";
import {
  CREATE_ANNOTATION_IMAGE_DATA,
  REMOVE_ANNOTATION_IMAGE_DATA,
  RESET_SEARCHED_ANNOTATION_IMAGES_DATA,
  SET_ANNOTATION_IMAGES_DATA,
  SET_ANNOTATION_IMAGES_METADATA,
  SET_ANNOTATION_IMAGE_DATA,
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_SEARCHED_ANNOTATION_IMAGES_DATA,
  UPDATE_ANNOTATION_IMAGE_DATA,
} from "./action-types";
import {
  AnnotationImageState,
  CreateAnnotationImageDataType,
  RemoveAnnotationImageDataType,
  ResetSearchedAnnotationImagesDataType,
  SetAnnotationImageDataType,
  SetAnnotationImagesDataType,
  SetAnnotationImagesMetadataType,
  SetIsLoadingType,
  SetIsSubmittingType,
  SetSearchedAnnotationImagesDataType,
  UpdateAnnotationImageDataType,
} from "./types";

export type AppThunk = ActionCreator<
  ThunkAction<Promise<boolean>, AnnotationImageState, null, Action<string>>
>;

export const setIsLoading = (payload: any): SetIsLoadingType => ({
  type: SET_IS_LOADING,
  payload,
});

export const setIsSubmitting = (payload: any): SetIsSubmittingType => ({
  type: SET_IS_SUBMITTING,
  payload,
});

export const setAnnotationImageData = (payload: any): SetAnnotationImageDataType => ({
  type: SET_ANNOTATION_IMAGE_DATA,
  payload,
});

export const setAnnotationImagesData = (payload: any): SetAnnotationImagesDataType => ({
  type: SET_ANNOTATION_IMAGES_DATA,
  payload,
});

export const setAnnotationImagesMetadata = (payload: any): SetAnnotationImagesMetadataType => ({
  type: SET_ANNOTATION_IMAGES_METADATA,
  payload,
});

export const setSearchedAnnotationImagesData = (
  payload: any,
): SetSearchedAnnotationImagesDataType => ({
  type: SET_SEARCHED_ANNOTATION_IMAGES_DATA,
  payload,
});

export const resetSearchedAnnotationImagesData = (
  payload: any,
): ResetSearchedAnnotationImagesDataType => ({
  type: RESET_SEARCHED_ANNOTATION_IMAGES_DATA,
  payload,
});

export const createAnnotationImageData = (payload: any): CreateAnnotationImageDataType => ({
  type: CREATE_ANNOTATION_IMAGE_DATA,
  payload,
});

export const removeAnnotationImageData = (payload: any): RemoveAnnotationImageDataType => ({
  type: REMOVE_ANNOTATION_IMAGE_DATA,
  payload,
});

export const updateAnnotationImageData = (payload: any): UpdateAnnotationImageDataType => ({
  type: UPDATE_ANNOTATION_IMAGE_DATA,
  payload,
});

export const fetchAnnotationImage: AppThunk =
  ({ annotationImageId }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await network({}).get(
        `${api.annotation.upload}${annotationImageId}/`,
      );

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          dispatch(setAnnotationImageData(data));
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

export const fetchAnnotationImages: AppThunk =
  ({ query = defaultQuery, columns, searchable, search }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      const link = generateQuery({
        url: api.annotation.upload,
        query,
        columns,
        searchable,
      });

      dispatch(setIsLoading(true));
      const { data, status } = await network({ requireToken: true }).get(link);
      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          search
            ? dispatch(setSearchedAnnotationImagesData(data))
            : dispatch(setAnnotationImagesData(data));
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

export const createAnnotationImage: AppThunk =
  ({ values, projectName }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      dispatch(setIsSubmitting(true));
      const { data, status } = await network({}).post(
        `${api.annotation.upload}?project_name=${projectName}`,
        values,
      );

      if (status === 200 || (status > 200 && status < 300)) {
        // dispatch(createAnnotationImageData(data?.data?.[0]));
        dispatch(setIsSubmitting(false));
        localStorage.setItem("images", data?.images);
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

export const updateAnnotationImage: AppThunk =
  ({ annotationImageId, values }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setIsSubmitting(true));
      const { data, status } = await network({}).put(
        `${api.annotation.upload}/${annotationImageId}`,
        values,
      );

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          dispatch(updateAnnotationImageData(data.data));
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

export const deleteAnnotationImage: AppThunk =
  ({ annotationImageId }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      dispatch(setIsSubmitting(true));
      const { status } = await network({}).delete(api.annotation.upload, {
        data: { ids: annotationImageId },
      });

      if (status === 200 || status > 200) {
        dispatch(removeAnnotationImageData({ id: annotationImageId }));
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
