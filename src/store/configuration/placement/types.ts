import {
  CREATE_PLACEMENT_DATA,
  REMOVE_PLACEMENT_DATA,
  RESET_SEARCHED_PLACEMENTS_DATA,
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_PLACEMENTS_DATA,
  SET_PLACEMENTS_METADATA,
  SET_PLACEMENT_DATA,
  SET_SEARCHED_PLACEMENTS_DATA,
  UPDATE_PLACEMENT_DATA,
} from './action-types';

export interface PlacementState {
  isLoading: boolean;
  isSubmitting: boolean;

  placement: any;
  placements: any;

  searchedPlacements: any;

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

export type SetPlacementDataType = {
  type: typeof SET_PLACEMENT_DATA;
  payload: any;
};

export type SetPlacementsDataType = {
  type: typeof SET_PLACEMENTS_DATA;
  payload: any;
};

export type SetPlacementsMetadataType = {
  type: typeof SET_PLACEMENTS_METADATA;
  payload: any;
};

export type SetSearchedPlacementsDataType = {
  type: typeof SET_SEARCHED_PLACEMENTS_DATA;
  payload: any;
};

export type ResetSearchedPlacementsDataType = {
  type: typeof RESET_SEARCHED_PLACEMENTS_DATA;
  payload: any;
};

export type CreatePlacementDataType = {
  type: typeof CREATE_PLACEMENT_DATA;
  payload: any;
};

export type RemovePlacementDataType = {
  type: typeof REMOVE_PLACEMENT_DATA;
  payload: any;
};

export type UpdatePlacementDataType = {
  type: typeof UPDATE_PLACEMENT_DATA;
  payload: any;
};

export type PlacementActionTypes =
  | SetIsLoadingType
  | SetIsSubmittingType
  | SetPlacementDataType
  | SetPlacementsDataType
  | SetPlacementsMetadataType
  | SetSearchedPlacementsDataType
  | ResetSearchedPlacementsDataType
  | CreatePlacementDataType
  | RemovePlacementDataType
  | UpdatePlacementDataType;
