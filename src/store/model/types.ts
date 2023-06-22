import {
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_MODEL_DATA,
  SET_MODELS_DATA,
  SET_MODELS_METADATA,
  SET_SEARCHED_MODELS_DATA,
  RESET_SEARCHED_MODELS_DATA,
  CREATE_MODEL_DATA,
  REMOVE_MODEL_DATA,
  UPDATE_MODEL_DATA,
} from "./action-types";

export interface ModelState {
  isLoading: boolean;
  isSubmitting: boolean;

  model: any;
  models: any;

  searchedModels: any;

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

export type SetModelDataType = {
  type: typeof SET_MODEL_DATA;
  payload: any;
};

export type SetModelsDataType = {
  type: typeof SET_MODELS_DATA;
  payload: any;
};

export type SetModelsMetadataType = {
  type: typeof SET_MODELS_METADATA;
  payload: any;
};

export type SetSearchedModelsDataType = {
  type: typeof SET_SEARCHED_MODELS_DATA;
  payload: any;
};

export type ResetSearchedModelsDataType = {
  type: typeof RESET_SEARCHED_MODELS_DATA;
  payload: any;
};

export type CreateModelDataType = {
  type: typeof CREATE_MODEL_DATA;
  payload: any;
};

export type RemoveModelDataType = {
  type: typeof REMOVE_MODEL_DATA;
  payload: any;
};

export type UpdateModelDataType = {
  type: typeof UPDATE_MODEL_DATA;
  payload: any;
};

export type ModelActionTypes =
  | SetIsLoadingType
  | SetIsSubmittingType
  | SetModelDataType
  | SetModelsDataType
  | SetModelsMetadataType
  | SetSearchedModelsDataType
  | ResetSearchedModelsDataType
  | CreateModelDataType
  | RemoveModelDataType
  | UpdateModelDataType;
