import {
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_ANNOTATION_IMAGE_DATA,
  SET_ANNOTATION_IMAGES_DATA,
  SET_ANNOTATION_IMAGES_METADATA,
  SET_SEARCHED_ANNOTATION_IMAGES_DATA,
  RESET_SEARCHED_ANNOTATION_IMAGES_DATA,
  CREATE_ANNOTATION_IMAGE_DATA,
  REMOVE_ANNOTATION_IMAGE_DATA,
  UPDATE_ANNOTATION_IMAGE_DATA,
} from './action-types';

export interface AnnotationImageState {
  isLoading: boolean;
  isSubmitting: boolean;

  annotationImage: any;
  annotationImages: any;

  searchedAnnotationImages: any;

  metadata: any;
}

export type SetIsLoadingType = {
  type: typeof SET_IS_LOADING;
  payload: boolean;
};

export type SetIsSubmittingType = {
  type: typeof SET_IS_SUBMITTING;
  payload: boolean;
};

export type SetAnnotationImageDataType = {
  type: typeof SET_ANNOTATION_IMAGE_DATA;
  payload: any;
};

export type SetAnnotationImagesDataType = {
  type: typeof SET_ANNOTATION_IMAGES_DATA;
  payload: any;
};

export type SetAnnotationImagesMetadataType = {
  type: typeof SET_ANNOTATION_IMAGES_METADATA;
  payload: any;
};

export type SetSearchedAnnotationImagesDataType = {
  type: typeof SET_SEARCHED_ANNOTATION_IMAGES_DATA;
  payload: any;
};

export type ResetSearchedAnnotationImagesDataType = {
  type: typeof RESET_SEARCHED_ANNOTATION_IMAGES_DATA;
  payload: any;
};

export type CreateAnnotationImageDataType = {
  type: typeof CREATE_ANNOTATION_IMAGE_DATA;
  payload: any;
};

export type RemoveAnnotationImageDataType = {
  type: typeof REMOVE_ANNOTATION_IMAGE_DATA;
  payload: any;
};

export type UpdateAnnotationImageDataType = {
  type: typeof UPDATE_ANNOTATION_IMAGE_DATA;
  payload: any;
};

export type AnnotationImageActionTypes =
  | SetIsLoadingType
  | SetIsSubmittingType
  | SetAnnotationImageDataType
  | SetAnnotationImagesDataType
  | SetAnnotationImagesMetadataType
  | SetSearchedAnnotationImagesDataType
  | ResetSearchedAnnotationImagesDataType
  | CreateAnnotationImageDataType
  | RemoveAnnotationImageDataType
  | UpdateAnnotationImageDataType;
