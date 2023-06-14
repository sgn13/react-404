import { Reducer } from 'redux';
import {
  CREATE_PLACEMENT_DATA,
  REMOVE_PLACEMENT_DATA,
  RESET_SEARCHED_PLACEMENTS_DATA,
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_PLACEMENTS_DATA,
  SET_PLACEMENTS_METADATA,
  SET_PLACEMENT_DATA,
  SET_SEARCHED_PLACEMENTS_DATA,
  UPDATE_PLACEMENT_DATA,
} from './action-types';

import { PlacementActionTypes, PlacementState } from './types';

import {
  resetSearchState,
  setSearchState,
  updateStateNew,
} from 'src/utils/store';

const entity = 'placements';

export const initialState: PlacementState = {
  isLoading: false,
  isSubmitting: false,

  placement: undefined,
  placements: [],

  searchedPlacements: [],

  metadata: undefined,
};

const reducer: Reducer<PlacementState> = (
  state = initialState,
  action: PlacementActionTypes
): PlacementState => {
  switch (action.type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };

    case SET_IS_SUBMITTING:
      return { ...state, isSubmitting: action.payload };

    case SET_PLACEMENT_DATA:
      return { ...state, placement: action.payload };

    case SET_PLACEMENTS_DATA:
      return { ...state, placements: action.payload };

    case SET_PLACEMENTS_METADATA:
      return { ...state, metadata: action.payload };

    case SET_SEARCHED_PLACEMENTS_DATA:
      return setSearchState({
        state,
        action,
        local: state.placements,
        entity,
      });

    case RESET_SEARCHED_PLACEMENTS_DATA:
      return resetSearchState({
        state,
      });

    case CREATE_PLACEMENT_DATA:
      return {
        ...state,
        placements: {
          ...state.placements,
          items: [...state.placements.items, action.payload],
        },
      };
    // return createState({
    //   state,
    //   action,
    //   local: state.placements,
    //   entity,
    // });

    case UPDATE_PLACEMENT_DATA:
      return updateStateNew({
        state,
        action,
        local: state.placements,
        entity,
      });

    case REMOVE_PLACEMENT_DATA:
      return {
        ...state,
        placements: {
          ...state.placements,
          items: state.placements.items.filter(
            (item: any) => !action.payload.id.includes(item.id)
          ),
        },
        // items: newItems,
        // archivedCount: Number(prev?.archivedCount || 0) + 1,
      };
    // return removeState({
    //   state,
    //   action,
    //   local: state.placements,
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
