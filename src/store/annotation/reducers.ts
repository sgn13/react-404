import { Reducer } from "redux";
import { resetSearchState, setSearchState, updateStateNew } from "src/utils/store";
import {
    CREATE_ANNOTATION_DATA,
    REMOVE_ANNOTATION_DATA,
    RESET_SEARCHED_ANNOTATIONS_DATA,
    SET_ANNOTATIONS_DATA,
    SET_ANNOTATIONS_METADATA,
    SET_ANNOTATION_DATA,
    SET_IS_LOADING,
    SET_IS_SUBMITTING,
    SET_SEARCHED_ANNOTATIONS_DATA,
    UPDATE_ANNOTATION_DATA,
} from "./action-types";

import { AnnotationActionTypes, AnnotationState } from "./types";

const entity = "annotations";

export const initialState: AnnotationState = {
  isLoading: false,
  isSubmitting: false,

  annotation: undefined,
  annotations: [],

  searchedAnnotations: [],

  metadata: undefined,
};

const reducer: Reducer<AnnotationState> = (
  state = initialState,
  action: AnnotationActionTypes,
): AnnotationState => {
  switch (action.type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };

    case SET_IS_SUBMITTING:
      return { ...state, isSubmitting: action.payload };

    case SET_ANNOTATION_DATA:
      return { ...state, annotation: action.payload };

    case SET_ANNOTATIONS_DATA:
      return { ...state, annotations: action.payload };

    case SET_ANNOTATIONS_METADATA:
      return { ...state, metadata: action.payload };

    case SET_SEARCHED_ANNOTATIONS_DATA:
      return setSearchState({
        state,
        action,
        local: state.annotations,
        entity,
      });

    case RESET_SEARCHED_ANNOTATIONS_DATA:
      return resetSearchState({
        state,
      });

    case CREATE_ANNOTATION_DATA:
      return {
        ...state,
        annotations: {
          ...state.annotations,
          items: [...state.annotations.items, action.payload],
        },
      };
    // return createState({
    //   state,
    //   action,
    //   local: state.annotations,
    //   entity,
    // });

    case UPDATE_ANNOTATION_DATA:
      return updateStateNew({
        state,
        action,
        local: state.annotations,
        entity,
      });

    case REMOVE_ANNOTATION_DATA:
      return {
        ...state,
        annotations: {
          ...state.annotations,
          items: state.annotations.items.filter(
            (item: any) => !action.payload.id.includes(item.id),
          ),
        },
        // items: newItems,
        // archivedCount: Number(prev?.archivedCount || 0) + 1,
      };
    // return removeState({
    //   state,
    //   action,
    //   local: state.annotations,
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
