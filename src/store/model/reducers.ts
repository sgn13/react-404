import { Reducer } from "redux";
import {
  CREATE_MODEL_DATA,
  REMOVE_MODEL_DATA,
  RESET_SEARCHED_MODELS_DATA,
  SET_MODELS_DATA,
  SET_MODELS_METADATA,
  SET_MODEL_DATA,
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_SEARCHED_MODELS_DATA,
  UPDATE_MODEL_DATA,
} from "./action-types";

import { ModelActionTypes, ModelState } from "./types";

import { resetSearchState, setSearchState, updateStateNew } from "src/utils/store";

const entity = "models";

export const initialState: ModelState = {
  isLoading: false,
  isSubmitting: false,

  model: undefined,
  models: [],

  searchedModels: [],

  metadata: undefined,
};

const reducer: Reducer<ModelState> = (
  state = initialState,
  action: ModelActionTypes,
): ModelState => {
  switch (action.type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };

    case SET_IS_SUBMITTING:
      return { ...state, isSubmitting: action.payload };

    case SET_MODEL_DATA:
      return { ...state, model: action.payload };

    case SET_MODELS_DATA:
      return { ...state, models: action.payload };

    case SET_MODELS_METADATA:
      return { ...state, metadata: action.payload };

    case SET_SEARCHED_MODELS_DATA:
      return setSearchState({
        state,
        action,
        local: state.models,
        entity,
      });

    case RESET_SEARCHED_MODELS_DATA:
      return resetSearchState({
        state,
      });

    case CREATE_MODEL_DATA:
      return {
        ...state,
        models: {
          ...state.models,
          items: [...state.models.items, action.payload],
        },
      };
    // return createState({
    //   state,
    //   action,
    //   local: state.models,
    //   entity,
    // });

    case UPDATE_MODEL_DATA:
      return updateStateNew({
        state,
        action,
        local: state.models,
        entity,
      });

    case REMOVE_MODEL_DATA:
      return {
        ...state,
        models: {
          ...state.models,
          items: state.models.items.filter((item: any) => !action.payload.id.includes(item.id)),
        },
        // items: newItems,
        // archivedCount: Number(prev?.archivedCount || 0) + 1,
      };
    // return removeState({
    //   state,
    //   action,
    //   local: state.models,
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
