import {
  CREATE_LIVECLIENT_DATA,
  REMOVE_LIVECLIENT_DATA,
  RESET_SEARCHED_LIVECLIENTS_DATA,
  SET_FCRS_LIVECLIENT_QUERY_RESULT_DATA,
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_SEARCHED_LIVECLIENTS_DATA,
  SET_LIVECLIENTS_DATA,
  SET_LIVECLIENTS_METADATA,
  SET_LIVECLIENT_DATA,
  UPDATE_LIVECLIENT_DATA,
} from "./action-types";

export interface LiveClientState {
  isLoading: boolean;
  isSubmitting: boolean;

  liveclient: any;
  liveclients: any;
  liveclientQueryResult: any;
  searchedLiveClients: any;

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

export type SetLiveClientDataType = {
  type: typeof SET_LIVECLIENT_DATA;
  payload: any;
};

export type SetLiveClientsDataType = {
  type: typeof SET_LIVECLIENTS_DATA;
  payload: any;
};

export type SetLiveClientsMetadataType = {
  type: typeof SET_LIVECLIENTS_METADATA;
  payload: any;
};

export type SetSearchedLiveClientsDataType = {
  type: typeof SET_SEARCHED_LIVECLIENTS_DATA;
  payload: any;
};

export type ResetSearchedLiveClientsDataType = {
  type: typeof RESET_SEARCHED_LIVECLIENTS_DATA;
  payload: any;
};

export type CreateLiveClientDataType = {
  type: typeof CREATE_LIVECLIENT_DATA;
  payload: any;
};

export type RemoveLiveClientDataType = {
  type: typeof REMOVE_LIVECLIENT_DATA;
  payload: any;
};

export type UpdateLiveClientDataType = {
  type: typeof UPDATE_LIVECLIENT_DATA;
  payload: any;
};
export type SetFcrsLiveClientQueryResultDataDataType = {
  type: typeof SET_FCRS_LIVECLIENT_QUERY_RESULT_DATA;
  payload: any;
};

export type LiveClientActionTypes =
  | SetIsLoadingType
  | SetIsSubmittingType
  | SetLiveClientDataType
  | SetLiveClientsDataType
  | SetLiveClientsMetadataType
  | SetSearchedLiveClientsDataType
  | ResetSearchedLiveClientsDataType
  | CreateLiveClientDataType
  | RemoveLiveClientDataType
  | UpdateLiveClientDataType
  | SetFcrsLiveClientQueryResultDataDataType;
