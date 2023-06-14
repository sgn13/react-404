import { Reducer } from 'redux';
import {
  CREATE_EXCLUSION_DATA,
  REMOVE_EXCLUSION_DATA,
  RESET_SEARCHED_EXCLUSIONS_DATA,
  SET_EXCLUSION_DATA,
  SET_EXCLUSIONS_DATA,
  SET_EXCLUSIONS_METADATA,
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_SEARCHED_EXCLUSIONS_DATA,
  UPDATE_EXCLUSION_DATA,
} from './action-types';

import { ExclusionActionTypes, ExclusionState } from './types';

import {
  resetSearchState,
  setSearchState,
  updateStateNew,
} from 'src/utils/store';

const entity = 'exclusions';

export const initialState: ExclusionState = {
  isLoading: false,
  isSubmitting: false,

  exclusion: undefined,
  exclusions: [],

  searchedExclusions: [],

  metadata: undefined,
};

const reducer: Reducer<ExclusionState> = (
  state = initialState,
  action: ExclusionActionTypes
): ExclusionState => {
  switch (action.type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };

    case SET_IS_SUBMITTING:
      return { ...state, isSubmitting: action.payload };

    case SET_EXCLUSION_DATA:
      return { ...state, exclusion: action.payload };

    case SET_EXCLUSIONS_DATA:
      return { ...state, exclusions: action.payload };

    case SET_EXCLUSIONS_METADATA:
      return { ...state, metadata: action.payload };

    case SET_SEARCHED_EXCLUSIONS_DATA:
      return setSearchState({
        state,
        action,
        local: state.exclusions,
        entity,
      });

    case RESET_SEARCHED_EXCLUSIONS_DATA:
      return resetSearchState({
        state,
      });

    case CREATE_EXCLUSION_DATA:
      return {
        ...state,
        exclusions: {
          ...state.exclusions,
          items: [...state.exclusions.items, action.payload],
        },
      };
    // return createState({
    //   state,
    //   action,
    //   local: state.exclusions,
    //   entity,
    // });

    case UPDATE_EXCLUSION_DATA:
      return updateStateNew({
        state,
        action,
        local: state.exclusions,
        entity,
      });

    case REMOVE_EXCLUSION_DATA:
      return {
        ...state,
        exclusions: {
          ...state.exclusions,
          items: state.exclusions.items.filter(
            (item: any) => !action.payload.id.includes(item.id)
          ),
        },
        // items: newItems,
        // archivedCount: Number(prev?.archivedCount || 0) + 1,
      };
    // return removeState({
    //   state,
    //   action,
    //   local: state.exclusions,
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
