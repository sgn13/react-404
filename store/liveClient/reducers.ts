import { Reducer } from "redux";

import { createState, removeState, updateState } from "utils/store";
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

import { LiveClientActionTypes, LiveClientState } from "./types";

export const initialState: LiveClientState = {
  isLoading: false,
  isSubmitting: false,

  liveclient: undefined,
  liveclients: [],

  searchedLiveClients: [],
  liveclientQueryResult: [],
  metadata: undefined,
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const reducer: Reducer<LiveClientState> = (
  state = initialState,
  action: LiveClientActionTypes,
): LiveClientState => {
  switch (action.type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };

    case SET_IS_SUBMITTING:
      return { ...state, isSubmitting: action.payload };

    case SET_LIVECLIENT_DATA:
      return { ...state, liveclient: action.payload };

    case SET_LIVECLIENTS_DATA:
      return { ...state, liveclients: action.payload };

    case SET_LIVECLIENTS_METADATA:
      return { ...state, metadata: action.payload };

    case SET_SEARCHED_LIVECLIENTS_DATA:
      return { ...state, searchedLiveClients: action.payload };

    case RESET_SEARCHED_LIVECLIENTS_DATA:
      return { ...state, searchedLiveClients: undefined };

    case CREATE_LIVECLIENT_DATA:
      return createState({
        state,
        action,
        local: state.liveclients,
        entity: "liveclients",
      });

    case UPDATE_LIVECLIENT_DATA:
      return updateState({
        state,
        action,
        local: state.liveclients,
        entity: "liveclients",
      });

    case REMOVE_LIVECLIENT_DATA:
      return removeState({
        state,
        action,
        local: state.liveclients,
        entity: "liveclients",
      });
    case SET_FCRS_LIVECLIENT_QUERY_RESULT_DATA:
      return { ...state, liveclientQueryResult: action.payload };
    default:
      return state;
  }
};

export default reducer;
