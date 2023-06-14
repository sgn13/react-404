import {
  CREATE_FOLDER_DATA,
  REMOVE_FOLDER_DATA,
  RESET_SEARCHED_FOLDERS_DATA,
  SET_FOLDERS_DATA,
  SET_FOLDERS_METADATA,
  SET_FOLDER_DATA,
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_SEARCHED_FOLDERS_DATA,
  UPDATE_FOLDER_DATA,
} from './action-types';

import { FolderActionTypes, FolderState } from './types';

import {
  resetSearchState,
  setSearchState,
  updateStateNew,
} from 'src/utils/store';

const entity = 'folders';

export const initialState: FolderState = {
  isLoading: false,
  isSubmitting: false,

  folder: undefined,
  folders: [],

  searchedFolders: [],

  metadata: undefined,
};

const reducer: any = (
  state = initialState,
  action: FolderActionTypes
): FolderState => {
  switch (action.type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };

    case SET_IS_SUBMITTING:
      return { ...state, isSubmitting: action.payload };

    case SET_FOLDER_DATA:
      return { ...state, folder: action.payload };

    case SET_FOLDERS_DATA:
      return { ...state, folders: action.payload };

    case SET_FOLDERS_METADATA:
      return { ...state, metadata: action.payload };

    case SET_SEARCHED_FOLDERS_DATA:
      return setSearchState({
        state,
        action,
        local: state.folders,
        entity,
      });

    case RESET_SEARCHED_FOLDERS_DATA:
      return resetSearchState({
        state,
      });

    case CREATE_FOLDER_DATA:
      return {
        ...state,
        folders: {
          ...state.folders,
          items: [...state.folders.items, action.payload],
        },
      };
    // return createState({
    //   state,
    //   action,
    //   local: state.folders,
    //   entity,
    // });

    case UPDATE_FOLDER_DATA:
      return updateStateNew({
        state,
        action,
        local: state.folders,
        entity,
      });

    case REMOVE_FOLDER_DATA:
      return {
        ...state,
        folders: {
          ...state.folders,
          items: state.folders.items.filter(
            (item: any) => !action.payload.id.includes(item.id)
          ),
        },
        // items: newItems,
        // archivedCount: Number(prev?.archivedCount || 0) + 1,
      };
    // return removeState({
    //   state,
    //   action,
    //   local: state.folders,
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
