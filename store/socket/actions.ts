import {
  SOCKET_CONNECT,
  SOCKET_DISCONNECT,
  SOCKET_CONNECTED,
  SOCKET_DISCONNECTED,
  SOCKET_EMIT,
  PING_ATM,
  PING_CCTV,
  PING_FIREWALL,
} from "./action-types";

export const socketConnect = () => ({
  type: SOCKET_CONNECT,
});

export const socketDisconnect = () => ({
  type: SOCKET_DISCONNECT,
});

export const socketConnected = () => ({
  type: SOCKET_CONNECTED,
});

export const socketDisconnected = () => ({
  type: SOCKET_DISCONNECTED,
});

export const socketEmit = (payload) => ({
  type: SOCKET_EMIT,
  payload,
});

export const pingAtm = (payload) => ({
  type: PING_ATM,
  payload,
});

export const pingCctv = (payload) => ({
  type: PING_CCTV,
  payload,
});

export const pingFirewall = (payload) => ({
  type: PING_FIREWALL,
  payload,
});

export const connectSocket = () => async (dispatch) => dispatch(socketConnect());

export const socketRequest = (payload) => async (dispatch) => {
  return dispatch(socketEmit(payload));
};
