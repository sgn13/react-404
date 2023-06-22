import { Reducer } from "redux";
import { SocketState } from "src/store/socket/types";
import {
  SOCKET_CONNECT,
  SOCKET_CONNECTED,
  SOCKET_DISCONNECT,
  SOCKET_DISCONNECTED,
} from "./action-types";

const initialState: SocketState = {
  socket: null,
  connected: false,
};

const reducer: Reducer<SocketState> = (state = initialState, action): SocketState => {
  switch (action.type) {
    case SOCKET_CONNECT:
      return { ...state, socket: action.payload };

    case SOCKET_DISCONNECT:
      return { ...state, socket: null };

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
