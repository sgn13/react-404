import { Reducer } from "redux";
import { resetSearchState, setSearchState, updateStateNew } from "src/utils/store";
import {
    CREATE_FEATURE_DATA,
    REMOVE_FEATURE_DATA,
    RESET_SEARCHED_FEATURES_DATA,
    SET_FEATURES_DATA,
    SET_FEATURES_METADATA,
    SET_FEATURE_DATA,
    SET_IS_LOADING,
    SET_IS_SUBMITTING,
    SET_SEARCHED_FEATURES_DATA,
    UPDATE_FEATURE_DATA,
} from "./action-types";

import { FeatureActionTypes, FeatureState } from "./types";

const entity = "features";

export const initialState: FeatureState = {
  isLoading: false,
  isSubmitting: false,

  feature: undefined,
  features: [],

  searchedFeatures: [],

  metadata: undefined,
};

const reducer: Reducer<FeatureState> = (
  state = initialState,
  action: FeatureActionTypes,
): FeatureState => {
  switch (action.type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };

    case SET_IS_SUBMITTING:
      return { ...state, isSubmitting: action.payload };

    case SET_FEATURE_DATA:
      return { ...state, feature: action.payload };

    case SET_FEATURES_DATA:
      return { ...state, features: action.payload };

    case SET_FEATURES_METADATA:
      return { ...state, metadata: action.payload };

    case SET_SEARCHED_FEATURES_DATA:
      return setSearchState({
        state,
        action,
        local: state.features,
        entity,
      });

    case RESET_SEARCHED_FEATURES_DATA:
      return resetSearchState({
        state,
      });

    case CREATE_FEATURE_DATA:
      return {
        ...state,
        features: {
          ...state.features,
          items: [...state.features.items, action.payload],
        },
      };
    // return createState({
    //   state,
    //   action,
    //   local: state.features,
    //   entity,
    // });

    case UPDATE_FEATURE_DATA:
      return updateStateNew({
        state,
        action,
        local: state.features,
        entity,
      });

    case REMOVE_FEATURE_DATA:
      return {
        ...state,
        features: {
          ...state.features,
          items: state.features.items.filter((item: any) => !action.payload.id.includes(item.id)),
        },
        // items: newItems,
        // archivedCount: Number(prev?.archivedCount || 0) + 1,
      };
    // return removeState({
    //   state,
    //   action,
    //   local: state.features,
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
