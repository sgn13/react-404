import {
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_ANNOTATION_DATA_DATA,
  SET_ANNOTATION_DATAS_DATA,
  SET_ANNOTATION_DATAS_METADATA,
  SET_SEARCHED_ANNOTATION_DATAS_DATA,
  RESET_SEARCHED_ANNOTATION_DATAS_DATA,
  CREATE_ANNOTATION_DATA_DATA,
  REMOVE_ANNOTATION_DATA_DATA,
  UPDATE_ANNOTATION_DATA_DATA,
} from './action-types';

export interface AnnotationDataState {
  isLoading: boolean;
  isSubmitting: boolean;

  annotationData: any;
  annotationDatas: any;

  searchedAnnotationDatas: any;

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

export type SetAnnotationDataDataType = {
  type: typeof SET_ANNOTATION_DATA_DATA;
  payload: any;
};

export type SetAnnotationDatasDataType = {
  type: typeof SET_ANNOTATION_DATAS_DATA;
  payload: any;
};

export type SetAnnotationDatasMetadataType = {
  type: typeof SET_ANNOTATION_DATAS_METADATA;
  payload: any;
};

export type SetSearchedAnnotationDatasDataType = {
  type: typeof SET_SEARCHED_ANNOTATION_DATAS_DATA;
  payload: any;
};

export type ResetSearchedAnnotationDatasDataType = {
  type: typeof RESET_SEARCHED_ANNOTATION_DATAS_DATA;
  payload: any;
};

export type CreateAnnotationDataDataType = {
  type: typeof CREATE_ANNOTATION_DATA_DATA;
  payload: any;
};

export type RemoveAnnotationDataDataType = {
  type: typeof REMOVE_ANNOTATION_DATA_DATA;
  payload: any;
};

export type UpdateAnnotationDataDataType = {
  type: typeof UPDATE_ANNOTATION_DATA_DATA;
  payload: any;
};

export type AnnotationDataActionTypes =
  | SetIsLoadingType
  | SetIsSubmittingType
  | SetAnnotationDataDataType
  | SetAnnotationDatasDataType
  | SetAnnotationDatasMetadataType
  | SetSearchedAnnotationDatasDataType
  | ResetSearchedAnnotationDatasDataType
  | CreateAnnotationDataDataType
  | RemoveAnnotationDataDataType
  | UpdateAnnotationDataDataType;
