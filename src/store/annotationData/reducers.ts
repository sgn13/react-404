import {
  CREATE_ANNOTATION_DATA_DATA,
  REMOVE_ANNOTATION_DATA_DATA,
  RESET_SEARCHED_ANNOTATION_DATAS_DATA,
  SET_ANNOTATION_DATAS_DATA,
  SET_ANNOTATION_DATAS_METADATA,
  SET_ANNOTATION_DATA_DATA,
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_SEARCHED_ANNOTATION_DATAS_DATA,
  UPDATE_ANNOTATION_DATA_DATA,
} from './action-types';

import { AnnotationDataActionTypes, AnnotationDataState } from './types';

import {
  resetSearchState,
  setSearchState,
  updateStateNew,
} from 'src/utils/store';

const entity = 'annotationDatas';

export const initialState: AnnotationDataState = {
  isLoading: false,
  isSubmitting: false,

  annotationData: undefined,
  annotationDatas: [],

  searchedAnnotationDatas: [],

  metadata: undefined,
};

const reducer: any = (
  state = initialState,
  action: AnnotationDataActionTypes
): AnnotationDataState => {
  switch (action.type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };

    case SET_IS_SUBMITTING:
      return { ...state, isSubmitting: action.payload };

    case SET_ANNOTATION_DATA_DATA:
      return { ...state, annotationData: action.payload };

    case SET_ANNOTATION_DATAS_DATA:
      return { ...state, annotationDatas: action.payload };

    case SET_ANNOTATION_DATAS_METADATA:
      return { ...state, metadata: action.payload };

    case SET_SEARCHED_ANNOTATION_DATAS_DATA:
      return setSearchState({
        state,
        action,
        local: state.annotationDatas,
        entity,
      });

    case RESET_SEARCHED_ANNOTATION_DATAS_DATA:
      return resetSearchState({
        state,
      });

    case CREATE_ANNOTATION_DATA_DATA:
      return {
        ...state,
        annotationDatas: {
          ...state.annotationDatas,
          items: [...state.annotationDatas.items, action.payload],
        },
      };
    // return createState({
    //   state,
    //   action,
    //   local: state.annotationDatas,
    //   entity,
    // });

    case UPDATE_ANNOTATION_DATA_DATA:
      return updateStateNew({
        state,
        action,
        local: state.annotationDatas,
        entity,
      });

    case REMOVE_ANNOTATION_DATA_DATA:
      return {
        ...state,
        annotationDatas: {
          ...state.annotationDatas,
          items: state.annotationDatas.items.filter(
            (item: any) => !action.payload.id.includes(item.id)
          ),
        },
        // items: newItems,
        // archivedCount: Number(prev?.archivedCount || 0) + 1,
      };
    // return removeState({
    //   state,
    //   action,
    //   local: state.annotationDatas,
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
