import {
  CREATE_STREAMING_DATA,
  REMOVE_STREAMING_DATA,
  RESET_SEARCHED_STREAMINGS_DATA,
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_SEARCHED_STREAMINGS_DATA,
  SET_STREAMINGS_DATA,
  SET_STREAMINGS_METADATA,
  SET_STREAMING_DATA,
  UPDATE_STREAMING_DATA,
} from './action-types';

import { StreamingActionTypes, StreamingState } from './types';

import {
  resetSearchState,
  setSearchState,
  updateStateNew,
} from 'src/utils/store';

const entity = 'streamings';

export type metadataType = {
  totalCount: any;
  page: any;
  perPage: any;
};

export const initialState: StreamingState = {
  isLoading: false,
  isSubmitting: false,

  streaming: undefined,
  streamings: [],

  searchedStreamings: [],

  metadata: undefined,
};

const reducer: any = (
  state = initialState,
  action: StreamingActionTypes
): StreamingState => {
  switch (action.type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };

    case SET_IS_SUBMITTING:
      return { ...state, isSubmitting: action.payload };

    case SET_STREAMING_DATA:
      return { ...state, streaming: action.payload };

    case SET_STREAMINGS_DATA:
      return { ...state, streamings: action.payload };

    case SET_STREAMINGS_METADATA:
      return { ...state, metadata: action.payload };

    case SET_SEARCHED_STREAMINGS_DATA:
      return setSearchState({
        state,
        action,
        local: state.streamings,
        entity,
      });

    case RESET_SEARCHED_STREAMINGS_DATA:
      return resetSearchState({
        state,
      });

    case CREATE_STREAMING_DATA:
      return {
        ...state,
        streamings: {
          ...state.streamings,
          items: [...state.streamings.items, action.payload],
        },
      };
    // return createState({
    //   state,
    //   action,
    //   local: state.streamings,
    //   entity,
    // });

    case UPDATE_STREAMING_DATA:
      return updateStateNew({
        state,
        action,
        local: state.streamings,
        entity,
      });

    case REMOVE_STREAMING_DATA:
      return {
        ...state,
        streamings: {
          ...state.streamings,
          items: state.streamings.items.filter(
            (item: any) => !action.payload.id.includes(item.id)
          ),
        },
        // items: newItems,
        // archivedCount: Number(prev?.archivedCount || 0) + 1,
      };
    // return removeState({
    //   state,
    //   action,
    //   local: state.streamings,
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
