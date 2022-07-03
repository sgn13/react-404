import {
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_USER_DATA,
  SET_USERS_DATA,
  SET_USERS_METADATA,
  SET_SEARCHED_USERS_DATA,
  RESET_SEARCHED_USERS_DATA,
  CREATE_USER_DATA,
  REMOVE_USER_DATA,
  UPDATE_USER_DATA,
  SET_FCRS_USER_QUERY_RESULT_DATA,
} from "./action-types";

export interface UserState {
  isLoading: boolean;
  isSubmitting: boolean;

  user: any;
  users: any;
  userQueryResult: any;
  searchedUsers: any;

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

export type SetUserDataType = {
  type: typeof SET_USER_DATA;
  payload: any;
};

export type SetUsersDataType = {
  type: typeof SET_USERS_DATA;
  payload: any;
};

export type SetUsersMetadataType = {
  type: typeof SET_USERS_METADATA;
  payload: any;
};

export type SetSearchedUsersDataType = {
  type: typeof SET_SEARCHED_USERS_DATA;
  payload: any;
};

export type ResetSearchedUsersDataType = {
  type: typeof RESET_SEARCHED_USERS_DATA;
  payload: any;
};

export type CreateUserDataType = {
  type: typeof CREATE_USER_DATA;
  payload: any;
};

export type RemoveUserDataType = {
  type: typeof REMOVE_USER_DATA;
  payload: any;
};

export type UpdateUserDataType = {
  type: typeof UPDATE_USER_DATA;
  payload: any;
};
export type SetFcrsUserQueryResultDataDataType = {
  type: typeof SET_FCRS_USER_QUERY_RESULT_DATA;
  payload: any;
};

export type UserActionTypes =
  | SetIsLoadingType
  | SetIsSubmittingType
  | SetUserDataType
  | SetUsersDataType
  | SetUsersMetadataType
  | SetSearchedUsersDataType
  | ResetSearchedUsersDataType
  | CreateUserDataType
  | RemoveUserDataType
  | UpdateUserDataType
  | SetFcrsUserQueryResultDataDataType;
