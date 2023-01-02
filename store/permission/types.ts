import {
  CREATE_PERMISSION_DATA,
  REMOVE_PERMISSION_DATA,
  RESET_SEARCHED_PERMISSIONS_DATA,
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_PERMISSIONS_DATA,
  SET_PERMISSIONS_METADATA,
  SET_PERMISSION_DATA,
  SET_SEARCHED_PERMISSIONS_DATA,
  UPDATE_PERMISSION_DATA,
} from "./action-types";

export interface PermissionState {
  isLoading: boolean;
  isSubmitting: boolean;

  permission: any;
  permissions: any;

  searchedPermissions: any;

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

export type SetPermissionDataType = {
  type: typeof SET_PERMISSION_DATA;
  payload: any;
};

export type SetPermissionsDataType = {
  type: typeof SET_PERMISSIONS_DATA;
  payload: any;
};

export type SetPermissionsMetadataType = {
  type: typeof SET_PERMISSIONS_METADATA;
  payload: any;
};

export type SetSearchedPermissionsDataType = {
  type: typeof SET_SEARCHED_PERMISSIONS_DATA;
  payload: any;
};

export type ResetSearchedPermissionsDataType = {
  type: typeof RESET_SEARCHED_PERMISSIONS_DATA;
  payload: any;
};

export type CreatePermissionDataType = {
  type: typeof CREATE_PERMISSION_DATA;
  payload: any;
};

export type RemovePermissionDataType = {
  type: typeof REMOVE_PERMISSION_DATA;
  payload: any;
};

export type UpdatePermissionDataType = {
  type: typeof UPDATE_PERMISSION_DATA;
  payload: any;
};

export type PermissionActionTypes =
  | SetIsLoadingType
  | SetIsSubmittingType
  | SetPermissionDataType
  | SetPermissionsDataType
  | SetPermissionsMetadataType
  | SetSearchedPermissionsDataType
  | ResetSearchedPermissionsDataType
  | CreatePermissionDataType
  | RemovePermissionDataType
  | UpdatePermissionDataType;
