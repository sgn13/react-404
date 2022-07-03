import { Reducer } from "redux";

import { createState, removeState, updateState } from "utils/store";
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
} from "./action-types";

import { RoleActionTypes, RoleState } from "./types";

export const initialState: RoleState = {
  isLoading: false,
  isSubmitting: false,

  role: undefined,
  roles: [],

  searchedRoles: [],

  metadata: undefined,
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const reducer: Reducer<RoleState> = (state = initialState, action: RoleActionTypes): RoleState => {
  switch (action.type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };

    case SET_IS_SUBMITTING:
      return { ...state, isSubmitting: action.payload };

    case SET_ROLE_DATA:
      return { ...state, role: action.payload };

    case SET_ROLES_DATA:
      return { ...state, roles: action.payload };

    case SET_ROLES_METADATA:
      return { ...state, metadata: action.payload };

    case SET_SEARCHED_ROLES_DATA:
      return { ...state, searchedRoles: action.payload };

    case RESET_SEARCHED_ROLES_DATA:
      return { ...state, searchedRoles: undefined };

    case CREATE_ROLE_DATA:
      return createState({
        state,
        action,
        local: state.roles,
        entity: "roles",
      });

    case UPDATE_ROLE_DATA:
      return updateState({
        state,
        action,
        local: state.roles,
        entity: "roles",
      });

    case REMOVE_ROLE_DATA:
      return removeState({
        state,
        action,
        local: state.roles,
        entity: "roles",
      });

    default:
      return state;
  }
};

export default reducer;
