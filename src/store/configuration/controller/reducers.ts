import { Reducer } from 'redux';
import {
  CREATE_CONTROLLER_DATA,
  REMOVE_CONTROLLER_DATA,
  RESET_SEARCHED_CONTROLLERS_DATA,
  SET_CONTROLLERS_DATA,
  SET_CONTROLLERS_METADATA,
  SET_CONTROLLER_DATA,
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_SEARCHED_CONTROLLERS_DATA,
  UPDATE_CONTROLLER_DATA,
} from './action-types';

import { ControllerActionTypes, ControllerState } from './types';

import {
  resetSearchState,
  setSearchState,
  updateStateNew,
} from 'src/utils/store';

const entity = 'controllers';

export const initialState: ControllerState = {
  isLoading: false,
  isSubmitting: false,

  controller: undefined,
  controllers: [],

  searchedControllers: [],

  metadata: undefined,
};

const reducer: Reducer<ControllerState> = (
  state = initialState,
  action: ControllerActionTypes
): ControllerState => {
  switch (action.type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };

    case SET_IS_SUBMITTING:
      return { ...state, isSubmitting: action.payload };

    case SET_CONTROLLER_DATA:
      return { ...state, controller: action.payload };

    case SET_CONTROLLERS_DATA:
      return { ...state, controllers: action.payload };

    case SET_CONTROLLERS_METADATA:
      return { ...state, metadata: action.payload };

    case SET_SEARCHED_CONTROLLERS_DATA:
      return setSearchState({
        state,
        action,
        local: state.controllers,
        entity,
      });

    case RESET_SEARCHED_CONTROLLERS_DATA:
      return resetSearchState({
        state,
      });

    case CREATE_CONTROLLER_DATA:
      return {
        ...state,
        controllers: {
          ...state.controllers,
          items: [...state.controllers.items, action.payload],
        },
      };
    // return createState({
    //   state,
    //   action,
    //   local: state.controllers,
    //   entity,
    // });

    case UPDATE_CONTROLLER_DATA:
      return updateStateNew({
        state,
        action,
        local: state.controllers,
        entity,
      });

    case REMOVE_CONTROLLER_DATA:
      return {
        ...state,
        controllers: {
          ...state.controllers,
          items: state.controllers.items.filter(
            (item: any) => !action.payload.id.includes(item.id)
          ),
        },
        // items: newItems,
        // archivedCount: Number(prev?.archivedCount || 0) + 1,
      };
    // return removeState({
    //   state,
    //   action,
    //   local: state.controllers,
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
