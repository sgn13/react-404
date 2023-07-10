import {
  CREATE_ANNOTATION_IMAGE_DATA,
  REMOVE_ANNOTATION_IMAGE_DATA,
  RESET_SEARCHED_ANNOTATION_IMAGES_DATA,
  SET_ANNOTATION_IMAGES_DATA,
  SET_ANNOTATION_IMAGES_METADATA,
  SET_ANNOTATION_IMAGE_DATA,
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_SEARCHED_ANNOTATION_IMAGES_DATA,
  UPDATE_ANNOTATION_IMAGE_DATA,
} from './action-types';

import { AnnotationImageActionTypes, AnnotationImageState } from './types';

import {
  resetSearchState,
  setSearchState,
  updateStateNew,
} from 'src/utils/store';

const entity = 'annotationImages';

export const initialState: AnnotationImageState = {
  isLoading: false,
  isSubmitting: false,

  annotationImage: undefined,
  annotationImages: [],

  searchedAnnotationImages: [],

  metadata: undefined,
};

const reducer: any = (
  state = initialState,
  action: AnnotationImageActionTypes
): AnnotationImageState => {
  switch (action.type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };

    case SET_IS_SUBMITTING:
      return { ...state, isSubmitting: action.payload };

    case SET_ANNOTATION_IMAGE_DATA:
      return { ...state, annotationImage: action.payload };

    case SET_ANNOTATION_IMAGES_DATA:
      return { ...state, annotationImages: action.payload };

    case SET_ANNOTATION_IMAGES_METADATA:
      return { ...state, metadata: action.payload };

    case SET_SEARCHED_ANNOTATION_IMAGES_DATA:
      return setSearchState({
        state,
        action,
        local: state.annotationImages,
        entity,
      });

    case RESET_SEARCHED_ANNOTATION_IMAGES_DATA:
      return resetSearchState({
        state,
      });

    case CREATE_ANNOTATION_IMAGE_DATA:
      return {
        ...state,
        annotationImages: {
          ...state.annotationImages,
          items: [...state.annotationImages.items, action.payload],
        },
      };
    // return createState({
    //   state,
    //   action,
    //   local: state.annotationImages,
    //   entity,
    // });

    case UPDATE_ANNOTATION_IMAGE_DATA:
      return updateStateNew({
        state,
        action,
        local: state.annotationImages,
        entity,
      });

    case REMOVE_ANNOTATION_IMAGE_DATA:
      return {
        ...state,
        annotationImages: {
          ...state.annotationImages,
          items: state.annotationImages.items.filter(
            (item: any) => !action.payload.id.includes(item.id)
          ),
        },
        // items: newItems,
        // archivedCount: Number(prev?.archivedCount || 0) + 1,
      };
    // return removeState({
    //   state,
    //   action,
    //   local: state.annotationImages,
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
