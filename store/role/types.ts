import {
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_ROLE_DATA,
  SET_ROLES_DATA,
  SET_ROLES_METADATA,
  SET_SEARCHED_ROLES_DATA,
  RESET_SEARCHED_ROLES_DATA,
  CREATE_ROLE_DATA,
  REMOVE_ROLE_DATA,
  UPDATE_ROLE_DATA,
} from './action-types';

export interface RoleState {
  isLoading: boolean;
  isSubmitting: boolean;

  role: any;
  roles: any;

  searchedRoles: any;

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

export type SetRoleDataType = {
  type: typeof SET_ROLE_DATA;
  payload: any;
};

export type SetRolesDataType = {
  type: typeof SET_ROLES_DATA;
  payload: any;
};

export type SetRolesMetadataType = {
  type: typeof SET_ROLES_METADATA;
  payload: any;
};

export type SetSearchedRolesDataType = {
  type: typeof SET_SEARCHED_ROLES_DATA;
  payload: any;
};

export type ResetSearchedRolesDataType = {
  type: typeof RESET_SEARCHED_ROLES_DATA;
  payload: any;
};

export type CreateRoleDataType = {
  type: typeof CREATE_ROLE_DATA;
  payload: any;
};

export type RemoveRoleDataType = {
  type: typeof REMOVE_ROLE_DATA;
  payload: any;
};

export type UpdateRoleDataType = {
  type: typeof UPDATE_ROLE_DATA;
  payload: any;
};

export type RoleActionTypes =
  | SetIsLoadingType
  | SetIsSubmittingType
  | SetRoleDataType
  | SetRolesDataType
  | SetRolesMetadataType
  | SetSearchedRolesDataType
  | ResetSearchedRolesDataType
  | CreateRoleDataType
  | RemoveRoleDataType
  | UpdateRoleDataType;
