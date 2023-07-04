import {
    CREATE_FEATURE_DATA,
    REMOVE_FEATURE_DATA,
    RESET_SEARCHED_FEATURES_DATA,
    SET_FEATURES_DATA,
    SET_FEATURES_METADATA,
    SET_FEATURE_DATA,
    SET_IS_LOADING,
    SET_IS_SUBMITTING,
    SET_SEARCHED_FEATURES_DATA,
    UPDATE_FEATURE_DATA,
} from "./action-types";

export interface FeatureState {
  isLoading: boolean;
  isSubmitting: boolean;

  feature: any;
  features: any;

  searchedFeatures: any;

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

export type SetFeatureDataType = {
  type: typeof SET_FEATURE_DATA;
  payload: any;
};

export type SetFeaturesDataType = {
  type: typeof SET_FEATURES_DATA;
  payload: any;
};

export type SetFeaturesMetadataType = {
  type: typeof SET_FEATURES_METADATA;
  payload: any;
};

export type SetSearchedFeaturesDataType = {
  type: typeof SET_SEARCHED_FEATURES_DATA;
  payload: any;
};

export type ResetSearchedFeaturesDataType = {
  type: typeof RESET_SEARCHED_FEATURES_DATA;
  payload: any;
};

export type CreateFeatureDataType = {
  type: typeof CREATE_FEATURE_DATA;
  payload: any;
};

export type RemoveFeatureDataType = {
  type: typeof REMOVE_FEATURE_DATA;
  payload: any;
};

export type UpdateFeatureDataType = {
  type: typeof UPDATE_FEATURE_DATA;
  payload: any;
};

export type FeatureActionTypes =
  | SetIsLoadingType
  | SetIsSubmittingType
  | SetFeatureDataType
  | SetFeaturesDataType
  | SetFeaturesMetadataType
  | SetSearchedFeaturesDataType
  | ResetSearchedFeaturesDataType
  | CreateFeatureDataType
  | RemoveFeatureDataType
  | UpdateFeatureDataType;
