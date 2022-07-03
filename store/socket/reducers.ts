import { SOCKET_CONNECTED, SOCKET_DISCONNECTED } from "./action-types";

const initialState = { connected: false };

// eslint-disable-next-line @typescript-eslint/default-param-last
const reducer = (state = initialState, action: any) => {
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
