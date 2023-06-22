import {
  SOCKET_CONNECT,
  SOCKET_CONNECTED,
  SOCKET_DISCONNECT,
  SOCKET_DISCONNECTED,
} from './action-types';

export interface SocketState {
  socket: any;
  connected: boolean;
}

export type SocketConnect = {
  type: typeof SOCKET_CONNECT;
  payload: any;
};

export type SocketDisconnect = {
  type: typeof SOCKET_DISCONNECT;
};

export type SetSocketConnected = {
  type: typeof SOCKET_CONNECTED;
};

export type SetSocketDisconnected = {
  type: typeof SOCKET_DISCONNECTED;
};

export type SocketActionTypes =
  | SocketConnect
  | SocketDisconnect
  | SetSocketConnected
  | SetSocketDisconnected;
