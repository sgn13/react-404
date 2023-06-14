import { Reducer } from "redux";

import { createState, removeState, updateState } from "src/utils/store";
import {
    CREATE_USER_DATA,
    REMOVE_USER_DATA,
    RESET_SEARCHED_USERS_DATA,
    SET_FCRS_USER_QUERY_RESULT_DATA,
    SET_IS_LOADING,
    SET_IS_SUBMITTING,
    SET_SEARCHED_USERS_DATA,
    SET_USERS_DATA,
    SET_USERS_METADATA,
    SET_USER_DATA,
    UPDATE_USER_DATA,
} from "./action-types";

import { UserActionTypes, UserState } from "./types";

export const initialState: UserState = {
  isLoading: false,
  isSubmitting: false,

  user: undefined,
  users: [],

  searchedUsers: [],
  userQueryResult: [],
  metadata: undefined,
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const reducer: Reducer<UserState> = (state = initialState, action: UserActionTypes): UserState => {
  switch (action.type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };

    case SET_IS_SUBMITTING:
      return { ...state, isSubmitting: action.payload };

    case SET_USER_DATA:
      return { ...state, user: action.payload };

    case SET_USERS_DATA:
      return { ...state, users: action.payload };

    case SET_USERS_METADATA:
      return { ...state, metadata: action.payload };

    case SET_SEARCHED_USERS_DATA:
      return { ...state, searchedUsers: action.payload };

    case RESET_SEARCHED_USERS_DATA:
      return { ...state, searchedUsers: undefined };

    case CREATE_USER_DATA:
      return createState({
        state,
        action,
        local: state.users,
        entity: "users",
      });

    case UPDATE_USER_DATA:
      return updateState({
        state,
        action,
        local: state.users,
        entity: "users",
      });

    case REMOVE_USER_DATA:
      return removeState({
        state,
        action,
        local: state.users,
        entity: "users",
      });
    case SET_FCRS_USER_QUERY_RESULT_DATA:
      return { ...state, userQueryResult: action.payload };
    default:
      return state;
  }
};

export default reducer;
