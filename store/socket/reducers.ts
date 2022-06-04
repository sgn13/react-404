import { SOCKET_CONNECTED, SOCKET_DISCONNECTED } from "./action-types";

const initialState = { connected: false };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SOCKET_CONNECTED: {
      return { ...state, connected: true };
    }
    case SOCKET_DISCONNECTED: {
      return { ...state, connected: false };
    }
    default:
      return state;
  }
};
export default reducer;
