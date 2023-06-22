import { Reducer } from "redux";
import {
  CREATE_TEMPLATE_DATA,
  REMOVE_TEMPLATE_DATA,
  RESET_SEARCHED_TEMPLATES_DATA,
  SET_TEMPLATES_DATA,
  SET_TEMPLATES_METADATA,
  SET_TEMPLATE_DATA,
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_SEARCHED_TEMPLATES_DATA,
  UPDATE_TEMPLATE_DATA,
} from "./action-types";

import { TemplateActionTypes, TemplateState } from "./types";

import { resetSearchState, setSearchState, updateStateNew } from "src/utils/store";

const entity = "templates";

export const initialState: TemplateState = {
  isLoading: false,
  isSubmitting: false,

  template: undefined,
  templates: [],

  searchedTemplates: [],

  metadata: undefined,
};

const reducer: Reducer<TemplateState> = (
  state = initialState,
  action: TemplateActionTypes,
): TemplateState => {
  switch (action.type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };

    case SET_IS_SUBMITTING:
      return { ...state, isSubmitting: action.payload };

    case SET_TEMPLATE_DATA:
      return { ...state, template: action.payload };

    case SET_TEMPLATES_DATA:
      return { ...state, templates: action.payload };

    case SET_TEMPLATES_METADATA:
      return { ...state, metadata: action.payload };

    case SET_SEARCHED_TEMPLATES_DATA:
      return setSearchState({
        state,
        action,
        local: state.templates,
        entity,
      });

    case RESET_SEARCHED_TEMPLATES_DATA:
      return resetSearchState({
        state,
      });

    case CREATE_TEMPLATE_DATA:
      return {
        ...state,
        templates: {
          ...state.templates,
          items: [...state.templates.items, action.payload],
        },
      };
    // return createState({
    //   state,
    //   action,
    //   local: state.templates,
    //   entity,
    // });

    case UPDATE_TEMPLATE_DATA:
      return updateStateNew({
        state,
        action,
        local: state.templates,
        entity,
      });

    case REMOVE_TEMPLATE_DATA:
      return {
        ...state,
        templates: {
          ...state.templates,
          items: state.templates.items.filter((item: any) => !action.payload.id.includes(item.id)),
        },
        // items: newItems,
        // archivedCount: Number(prev?.archivedCount || 0) + 1,
      };
    // return removeState({
    //   state,
    //   action,
    //   local: state.templates,
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
