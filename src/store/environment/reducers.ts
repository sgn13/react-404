import { Reducer } from "redux";
import {
  CREATE_ENVIRONMENT_DATA,
  REMOVE_ENVIRONMENT_DATA,
  RESET_SEARCHED_ENVIRONMENTS_DATA,
  SET_ENVIRONMENTS_DATA,
  SET_ENVIRONMENTS_METADATA,
  SET_ENVIRONMENT_DATA,
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_SEARCHED_ENVIRONMENTS_DATA,
  UPDATE_ENVIRONMENT_DATA,
} from "./action-types";

import { EnvironmentActionTypes, EnvironmentState } from "./types";

import { resetSearchState, setSearchState, updateStateNew } from "src/utils/store";

const entity = "environments";

export const initialState: EnvironmentState = {
  isLoading: false,
  isSubmitting: false,

  environment: undefined,
  environments: [],

  searchedEnvironments: [],

  metadata: undefined,
};

const reducer: Reducer<EnvironmentState> = (
  state = initialState,
  action: EnvironmentActionTypes,
): EnvironmentState => {
  switch (action.type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };

    case SET_IS_SUBMITTING:
      return { ...state, isSubmitting: action.payload };

    case SET_ENVIRONMENT_DATA:
      return { ...state, environment: action.payload };

    case SET_ENVIRONMENTS_DATA:
      return { ...state, environments: action.payload };

    case SET_ENVIRONMENTS_METADATA:
      return { ...state, metadata: action.payload };

    case SET_SEARCHED_ENVIRONMENTS_DATA:
      return setSearchState({
        state,
        action,
        local: state.environments,
        entity,
      });

    case RESET_SEARCHED_ENVIRONMENTS_DATA:
      return resetSearchState({
        state,
      });

    case CREATE_ENVIRONMENT_DATA:
      return {
        ...state,
        environments: {
          ...state.environments,
          items: [...state.environments.items, action.payload],
        },
      };
    // return createState({
    //   state,
    //   action,
    //   local: state.environments,
    //   entity,
    // });

    case UPDATE_ENVIRONMENT_DATA:
      return updateStateNew({
        state,
        action,
        local: state.environments,
        entity,
      });

    case REMOVE_ENVIRONMENT_DATA:
      return {
        ...state,
        environments: {
          ...state.environments,
          items: state.environments.items.filter(
            (item: any) => !action.payload.id.includes(item.id),
          ),
        },
        // items: newItems,
        // archivedCount: Number(prev?.archivedCount || 0) + 1,
      };
    // return removeState({
    //   state,
    //   action,
    //   local: state.environments,
    //   entity,
    // });
    //        const newItems = prev?.items?.filter(
    //     (item: { id?: number }) => !selectedIds.includes(item.id),
    //   );

    default:
      return state;
  }
};

export default reducer;
