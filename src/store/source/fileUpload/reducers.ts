import { Reducer } from 'redux';
import {
  CREATE_FILEUPLOAD_DATA,
  REMOVE_FILEUPLOAD_DATA,
  RESET_SEARCHED_FILEUPLOADS_DATA,
  SET_FILEUPLOAD_DATA,
  SET_FILEUPLOADS_DATA,
  SET_FILEUPLOADS_METADATA,
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_SEARCHED_FILEUPLOADS_DATA,
  UPDATE_FILEUPLOAD_DATA,
} from './action-types';

import { FileUploadActionTypes, FileUploadState } from './types';

import {
  resetSearchState,
  setSearchState,
  updateStateNew,
} from 'src/utils/store';

const entity = 'fileuploads';

export type metadataType = {
  totalCount: any;
  page: any;
  perPage: any;
};

export const initialState: FileUploadState = {
  isLoading: false,
  isSubmitting: false,

  fileupload: undefined,
  fileuploads: [],

  searchedFileUploads: [],

  metadata: undefined,
};

const reducer: Reducer<FileUploadState> = (
  state = initialState,
  action: FileUploadActionTypes
): FileUploadState => {
  switch (action.type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };

    case SET_IS_SUBMITTING:
      return { ...state, isSubmitting: action.payload };

    case SET_FILEUPLOAD_DATA:
      return { ...state, fileupload: action.payload };

    case SET_FILEUPLOADS_DATA:
      return { ...state, fileuploads: action.payload };

    case SET_FILEUPLOADS_METADATA:
      return { ...state, metadata: action.payload };

    case SET_SEARCHED_FILEUPLOADS_DATA:
      return setSearchState({
        state,
        action,
        local: state.fileuploads,
        entity,
      });

    case RESET_SEARCHED_FILEUPLOADS_DATA:
      return resetSearchState({
        state,
      });

    case CREATE_FILEUPLOAD_DATA:
      return {
        ...state,
        fileuploads: {
          ...state.fileuploads,
          items: [...state.fileuploads.items, action.payload],
        },
      };
    // return createState({
    //   state,
    //   action,
    //   local: state.fileuploads,
    //   entity,
    // });

    case UPDATE_FILEUPLOAD_DATA:
      return updateStateNew({
        state,
        action,
        local: state.fileuploads,
        entity,
      });

    case REMOVE_FILEUPLOAD_DATA:
      return {
        ...state,
        fileuploads: {
          ...state.fileuploads,
          items: state.fileuploads.items.filter(
            (item: any) => !action.payload.id.includes(item.id)
          ),
        },
        // items: newItems,
        // archivedCount: Number(prev?.archivedCount || 0) + 1,
      };
    // return removeState({
    //   state,
    //   action,
    //   local: state.fileuploads,
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
