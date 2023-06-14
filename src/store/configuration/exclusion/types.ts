import {
  CREATE_EXCLUSION_DATA,
  REMOVE_EXCLUSION_DATA,
  RESET_SEARCHED_EXCLUSIONS_DATA,
  SET_EXCLUSION_DATA,
  SET_EXCLUSIONS_DATA,
  SET_EXCLUSIONS_METADATA,
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_SEARCHED_EXCLUSIONS_DATA,
  UPDATE_EXCLUSION_DATA,
} from './action-types';

export interface ExclusionState {
  isLoading: boolean;
  isSubmitting: boolean;

  exclusion: any;
  exclusions: any;

  searchedExclusions: any;

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

export type SetExclusionDataType = {
  type: typeof SET_EXCLUSION_DATA;
  payload: any;
};

export type SetExclusionsDataType = {
  type: typeof SET_EXCLUSIONS_DATA;
  payload: any;
};

export type SetExclusionsMetadataType = {
  type: typeof SET_EXCLUSIONS_METADATA;
  payload: any;
};

export type SetSearchedExclusionsDataType = {
  type: typeof SET_SEARCHED_EXCLUSIONS_DATA;
  payload: any;
};

export type ResetSearchedExclusionsDataType = {
  type: typeof RESET_SEARCHED_EXCLUSIONS_DATA;
  payload: any;
};

export type CreateExclusionDataType = {
  type: typeof CREATE_EXCLUSION_DATA;
  payload: any;
};

export type RemoveExclusionDataType = {
  type: typeof REMOVE_EXCLUSION_DATA;
  payload: any;
};

export type UpdateExclusionDataType = {
  type: typeof UPDATE_EXCLUSION_DATA;
  payload: any;
};

export type ExclusionActionTypes =
  | SetIsLoadingType
  | SetIsSubmittingType
  | SetExclusionDataType
  | SetExclusionsDataType
  | SetExclusionsMetadataType
  | SetSearchedExclusionsDataType
  | ResetSearchedExclusionsDataType
  | CreateExclusionDataType
  | RemoveExclusionDataType
  | UpdateExclusionDataType;
