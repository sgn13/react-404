import {
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_CONTROLLER_DATA,
  SET_CONTROLLERS_DATA,
  SET_CONTROLLERS_METADATA,
  SET_SEARCHED_CONTROLLERS_DATA,
  RESET_SEARCHED_CONTROLLERS_DATA,
  CREATE_CONTROLLER_DATA,
  REMOVE_CONTROLLER_DATA,
  UPDATE_CONTROLLER_DATA,
} from './action-types';

export interface ControllerState {
  isLoading: boolean;
  isSubmitting: boolean;

  controller: any;
  controllers: any;

  searchedControllers: any;

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

export type SetControllerDataType = {
  type: typeof SET_CONTROLLER_DATA;
  payload: any;
};

export type SetControllersDataType = {
  type: typeof SET_CONTROLLERS_DATA;
  payload: any;
};

export type SetControllersMetadataType = {
  type: typeof SET_CONTROLLERS_METADATA;
  payload: any;
};

export type SetSearchedControllersDataType = {
  type: typeof SET_SEARCHED_CONTROLLERS_DATA;
  payload: any;
};

export type ResetSearchedControllersDataType = {
  type: typeof RESET_SEARCHED_CONTROLLERS_DATA;
  payload: any;
};

export type CreateControllerDataType = {
  type: typeof CREATE_CONTROLLER_DATA;
  payload: any;
};

export type RemoveControllerDataType = {
  type: typeof REMOVE_CONTROLLER_DATA;
  payload: any;
};

export type UpdateControllerDataType = {
  type: typeof UPDATE_CONTROLLER_DATA;
  payload: any;
};

export type ControllerActionTypes =
  | SetIsLoadingType
  | SetIsSubmittingType
  | SetControllerDataType
  | SetControllersDataType
  | SetControllersMetadataType
  | SetSearchedControllersDataType
  | ResetSearchedControllersDataType
  | CreateControllerDataType
  | RemoveControllerDataType
  | UpdateControllerDataType;
