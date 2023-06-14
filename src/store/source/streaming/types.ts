import {
  CREATE_STREAMING_DATA,
  REMOVE_STREAMING_DATA,
  RESET_SEARCHED_STREAMINGS_DATA,
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_SEARCHED_STREAMINGS_DATA,
  SET_STREAMINGS_DATA,
  SET_STREAMINGS_METADATA,
  SET_STREAMING_DATA,
  UPDATE_STREAMING_DATA,
} from './action-types';

export interface StreamingState {
  isLoading: boolean;
  isSubmitting: boolean;

  streaming: any;
  streamings: any;

  searchedStreamings: any;

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

export type SetStreamingDataType = {
  type: typeof SET_STREAMING_DATA;
  payload: any;
};

export type SetStreamingsDataType = {
  type: typeof SET_STREAMINGS_DATA;
  payload: any;
};

export type SetStreamingsMetadataType = {
  type: typeof SET_STREAMINGS_METADATA;
  payload: any;
};

export type SetSearchedStreamingsDataType = {
  type: typeof SET_SEARCHED_STREAMINGS_DATA;
  payload: any;
};

export type ResetSearchedStreamingsDataType = {
  type: typeof RESET_SEARCHED_STREAMINGS_DATA;
  payload: any;
};

export type CreateStreamingDataType = {
  type: typeof CREATE_STREAMING_DATA;
  payload: any;
};

export type RemoveStreamingDataType = {
  type: typeof REMOVE_STREAMING_DATA;
  payload: any;
};

export type UpdateStreamingDataType = {
  type: typeof UPDATE_STREAMING_DATA;
  payload: any;
};

export type StreamingActionTypes =
  | SetIsLoadingType
  | SetIsSubmittingType
  | SetStreamingDataType
  | SetStreamingsDataType
  | SetStreamingsMetadataType
  | SetSearchedStreamingsDataType
  | ResetSearchedStreamingsDataType
  | CreateStreamingDataType
  | RemoveStreamingDataType
  | UpdateStreamingDataType;
