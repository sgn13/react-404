import { Reducer } from 'redux';
import {
  CREATE_LIBRARY_DATA,
  REMOVE_LIBRARY_DATA,
  RESET_SEARCHED_LIBRARYS_DATA,
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_LIBRARYS_DATA,
  SET_LIBRARYS_METADATA,
  SET_LIBRARY_DATA,
  SET_SEARCHED_LIBRARYS_DATA,
  UPDATE_LIBRARY_DATA,
} from './action-types';

import { LibraryActionTypes, LibraryState } from './types';

import {
  resetSearchState,
  setSearchState,
  updateStateNew,
} from 'src/utils/store';

const entity = 'librarys';

export const initialState: LibraryState = {
  isLoading: false,
  isSubmitting: false,

  library: undefined,
  librarys: [],

  searchedLibrarys: [],

  metadata: undefined,
};

const reducer: Reducer<LibraryState> = (
  state = initialState,
  action: LibraryActionTypes
): LibraryState => {
  switch (action.type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };

    case SET_IS_SUBMITTING:
      return { ...state, isSubmitting: action.payload };

    case SET_LIBRARY_DATA:
      return { ...state, library: action.payload };

    case SET_LIBRARYS_DATA:
      return { ...state, librarys: action.payload };

    case SET_LIBRARYS_METADATA:
      return { ...state, metadata: action.payload };

    case SET_SEARCHED_LIBRARYS_DATA:
      return setSearchState({
        state,
        action,
        local: state.librarys,
        entity,
      });

    case RESET_SEARCHED_LIBRARYS_DATA:
      return resetSearchState({
        state,
      });

    case CREATE_LIBRARY_DATA:
      return {
        ...state,
        librarys: {
          ...state.librarys,
          items: [...state.librarys.items, action.payload],
        },
      };
    // return createState({
    //   state,
    //   action,
    //   local: state.librarys,
    //   entity,
    // });

    case UPDATE_LIBRARY_DATA:
      return updateStateNew({
        state,
        action,
        local: state.librarys,
        entity,
      });

    case REMOVE_LIBRARY_DATA:
      return {
        ...state,
        librarys: {
          ...state.librarys,
          items: state.librarys.items.filter(
            (item: any) => !action.payload.id.includes(item.id)
          ),
        },
        // items: newItems,
        // archivedCount: Number(prev?.archivedCount || 0) + 1,
      };
    // return removeState({
    //   state,
    //   action,
    //   local: state.librarys,
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
