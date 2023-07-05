import {
  CREATE_PIPELINE_DATA,
  REMOVE_PIPELINE_DATA,
  RESET_SEARCHED_PIPELINES_DATA,
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_PIPELINES_DATA,
  SET_PIPELINES_METADATA,
  SET_PIPELINE_DATA,
  SET_SEARCHED_PIPELINES_DATA,
  UPDATE_PIPELINE_DATA,
} from "./action-types";

export interface PipelineState {
  isLoading: boolean;
  isSubmitting: boolean;

  pipeline: any;
  pipelines: any;

  searchedPipelines: any;

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

export type SetPipelineDataType = {
  type: typeof SET_PIPELINE_DATA;
  payload: any;
};

export type SetPipelinesDataType = {
  type: typeof SET_PIPELINES_DATA;
  payload: any;
};

export type SetPipelinesMetadataType = {
  type: typeof SET_PIPELINES_METADATA;
  payload: any;
};

export type SetSearchedPipelinesDataType = {
  type: typeof SET_SEARCHED_PIPELINES_DATA;
  payload: any;
};

export type ResetSearchedPipelinesDataType = {
  type: typeof RESET_SEARCHED_PIPELINES_DATA;
  payload: any;
};

export type CreatePipelineDataType = {
  type: typeof CREATE_PIPELINE_DATA;
  payload: any;
};

export type RemovePipelineDataType = {
  type: typeof REMOVE_PIPELINE_DATA;
  payload: any;
};

export type UpdatePipelineDataType = {
  type: typeof UPDATE_PIPELINE_DATA;
  payload: any;
};

export type PipelineActionTypes =
  | SetIsLoadingType
  | SetIsSubmittingType
  | SetPipelineDataType
  | SetPipelinesDataType
  | SetPipelinesMetadataType
  | SetSearchedPipelinesDataType
  | ResetSearchedPipelinesDataType
  | CreatePipelineDataType
  | RemovePipelineDataType
  | UpdatePipelineDataType;
