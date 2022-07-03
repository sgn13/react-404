import { Reducer } from "redux";

import { SET_IS_LOADING, SET_REGISTRATIONS_DATA } from "./action-types";

import { RegistrationActionTypes, RegistrationState } from "./types";

const entity = "registrations";

export const initialState: RegistrationState = {
  isLoading: false,
  registrations: [],
};

const reducer: Reducer<RegistrationState> = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state = initialState,
  action: RegistrationActionTypes,
): RegistrationState => {
  switch (action.type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };

    case SET_REGISTRATIONS_DATA:
      return { ...state, registrations: action.payload };

    default:
      return state;
  }
};

export default reducer;
