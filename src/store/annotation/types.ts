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

export interface AnnotationState {
  isLoading: boolean;
  isSubmitting: boolean;

  annotation: any;
  annotations: any;

  searchedAnnotations: any;

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

export type SetAnnotationDataType = {
  type: typeof SET_ANNOTATION_DATA;
  payload: any;
};

export type SetAnnotationsDataType = {
  type: typeof SET_ANNOTATIONS_DATA;
  payload: any;
};

export type SetAnnotationsMetadataType = {
  type: typeof SET_ANNOTATIONS_METADATA;
  payload: any;
};

export type SetSearchedAnnotationsDataType = {
  type: typeof SET_SEARCHED_ANNOTATIONS_DATA;
  payload: any;
};

export type ResetSearchedAnnotationsDataType = {
  type: typeof RESET_SEARCHED_ANNOTATIONS_DATA;
  payload: any;
};

export type CreateAnnotationDataType = {
  type: typeof CREATE_ANNOTATION_DATA;
  payload: any;
};

export type RemoveAnnotationDataType = {
  type: typeof REMOVE_ANNOTATION_DATA;
  payload: any;
};

export type UpdateAnnotationDataType = {
  type: typeof UPDATE_ANNOTATION_DATA;
  payload: any;
};

export type AnnotationActionTypes =
  | SetIsLoadingType
  | SetIsSubmittingType
  | SetAnnotationDataType
  | SetAnnotationsDataType
  | SetAnnotationsMetadataType
  | SetSearchedAnnotationsDataType
  | ResetSearchedAnnotationsDataType
  | CreateAnnotationDataType
  | RemoveAnnotationDataType
  | UpdateAnnotationDataType;
