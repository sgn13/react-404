import {
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_ENVIRONMENT_DATA,
  SET_ENVIRONMENTS_DATA,
  SET_ENVIRONMENTS_METADATA,
  SET_SEARCHED_ENVIRONMENTS_DATA,
  RESET_SEARCHED_ENVIRONMENTS_DATA,
  CREATE_ENVIRONMENT_DATA,
  REMOVE_ENVIRONMENT_DATA,
  UPDATE_ENVIRONMENT_DATA,
} from "./action-types";

export interface EnvironmentState {
  isLoading: boolean;
  isSubmitting: boolean;

  environment: any;
  environments: any;

  searchedEnvironments: any;

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

export type SetEnvironmentDataType = {
  type: typeof SET_ENVIRONMENT_DATA;
  payload: any;
};

export type SetEnvironmentsDataType = {
  type: typeof SET_ENVIRONMENTS_DATA;
  payload: any;
};

export type SetEnvironmentsMetadataType = {
  type: typeof SET_ENVIRONMENTS_METADATA;
  payload: any;
};

export type SetSearchedEnvironmentsDataType = {
  type: typeof SET_SEARCHED_ENVIRONMENTS_DATA;
  payload: any;
};

export type ResetSearchedEnvironmentsDataType = {
  type: typeof RESET_SEARCHED_ENVIRONMENTS_DATA;
  payload: any;
};

export type CreateEnvironmentDataType = {
  type: typeof CREATE_ENVIRONMENT_DATA;
  payload: any;
};

export type RemoveEnvironmentDataType = {
  type: typeof REMOVE_ENVIRONMENT_DATA;
  payload: any;
};

export type UpdateEnvironmentDataType = {
  type: typeof UPDATE_ENVIRONMENT_DATA;
  payload: any;
};

export type EnvironmentActionTypes =
  | SetIsLoadingType
  | SetIsSubmittingType
  | SetEnvironmentDataType
  | SetEnvironmentsDataType
  | SetEnvironmentsMetadataType
  | SetSearchedEnvironmentsDataType
  | ResetSearchedEnvironmentsDataType
  | CreateEnvironmentDataType
  | RemoveEnvironmentDataType
  | UpdateEnvironmentDataType;
