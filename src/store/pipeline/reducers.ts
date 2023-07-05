import { Reducer } from "redux";
import { resetSearchState, setSearchState, updateStateNew } from "src/utils/store";
import {
  CREATE_PIPELINE_DATA,
  REMOVE_PIPELINE_DATA,
  RESET_SEARCHED_PIPELINES_DATA,
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_PIPELINES_DATA,
  SET_PIPELINES_METADATA,
  SET_PIPELINE_DATA,
  SET_SEARCHED_PIPELINES_DATA,
  UPDATE_PIPELINE_DATA,
} from "./action-types";

import { PipelineActionTypes, PipelineState } from "./types";

const entity = "pipelines";

export const initialState: PipelineState = {
  isLoading: false,
  isSubmitting: false,

  pipeline: undefined,
  pipelines: [],

  searchedPipelines: [],

  metadata: undefined,
};

const reducer: Reducer<PipelineState> = (
  state = initialState,
  action: PipelineActionTypes,
): PipelineState => {
  switch (action.type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };

    case SET_IS_SUBMITTING:
      return { ...state, isSubmitting: action.payload };

    case SET_PIPELINE_DATA:
      return { ...state, pipeline: action.payload };

    case SET_PIPELINES_DATA:
      return { ...state, pipelines: action.payload };

    case SET_PIPELINES_METADATA:
      return { ...state, metadata: action.payload };

    case SET_SEARCHED_PIPELINES_DATA:
      return setSearchState({
        state,
        action,
        local: state.pipelines,
        entity,
      });

    case RESET_SEARCHED_PIPELINES_DATA:
      return resetSearchState({
        state,
      });

    case CREATE_PIPELINE_DATA:
      return {
        ...state,
        pipelines: {
          ...state.pipelines,
          items: [...state.pipelines.items, action.payload],
        },
      };
    // return createState({
    //   state,
    //   action,
    //   local: state.pipelines,
    //   entity,
    // });

    case UPDATE_PIPELINE_DATA:
      return updateStateNew({
        state,
        action,
        local: state.pipelines,
        entity,
      });

    case REMOVE_PIPELINE_DATA:
      return {
        ...state,
        pipelines: {
          ...state.pipelines,
          items: state.pipelines.items.filter((item: any) => !action.payload.id.includes(item.id)),
        },
        // items: newItems,
        // archivedCount: Number(prev?.archivedCount || 0) + 1,
      };
    // return removeState({
    //   state,
    //   action,
    //   local: state.pipelines,
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
