import { Reducer } from "redux";

import {
    createState,
    removeState,
    resetSearchState,
    setSearchState,
    updateState,
} from "src/utils/store";
import { PermissionActionTypes, PermissionState } from "./types";

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

const entity = "permissions";

export const initialState: PermissionState = {
  isLoading: false,
  isSubmitting: false,

  permission: undefined,
  permissions: [],

  searchedPermissions: [],

  metadata: undefined,
};

const reducer: Reducer<PermissionState> = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state = initialState,
  action: PermissionActionTypes,
): PermissionState => {
  switch (action.type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };

    case SET_IS_SUBMITTING:
      return { ...state, isSubmitting: action.payload };

    case SET_PERMISSION_DATA:
      return { ...state, permission: action.payload };

    case SET_PERMISSIONS_DATA:
      return { ...state, permissions: action.payload };

    case SET_PERMISSIONS_METADATA:
      return { ...state, metadata: action.payload };

    case SET_SEARCHED_PERMISSIONS_DATA:
      return setSearchState({
        state,
        action,
        local: state.permissions,
        entity,
      });

    case RESET_SEARCHED_PERMISSIONS_DATA:
      return resetSearchState({
        state,
      });

    case CREATE_PERMISSION_DATA:
      return createState({
        state,
        action,
        local: state.permissions,
        entity,
      });

    case UPDATE_PERMISSION_DATA:
      return updateState({
        state,
        action,
        local: state.permissions,
        entity,
      });

    case REMOVE_PERMISSION_DATA:
      return removeState({
        state,
        action,
        local: state.permissions,
        entity,
      });

    default:
      return state;
  }
};

export default reducer;
