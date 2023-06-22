import { Action, ActionCreator, Dispatch, Store } from "redux";

import { w3cwebsocket as W3CWebSocket } from "websocket";
import env from "src/constants/env";
import {
  SocketConnect,
  SocketDisconnect,
  SetSocketConnected,
  SetSocketDisconnected,
} from "src/store/socket/types";

import {
  SOCKET_CONNECT,
  SOCKET_CONNECTED,
  SOCKET_DISCONNECT,
  SOCKET_DISCONNECTED,
} from "./action-types";

export const socketConnect = (payload): SocketConnect => ({
  type: SOCKET_CONNECT,
  payload,
});

export const socketDisconnect = (): SocketDisconnect => ({
  type: SOCKET_DISCONNECT,
});

export const socketConnected = (): SetSocketConnected => ({
  type: SOCKET_CONNECTED,
});

export const socketDisconnected = (): SetSocketDisconnected => ({
  type: SOCKET_DISCONNECTED,
});

export const connectSocket =
  (url = "http://localhost:CUSTOM_PORT") =>
  async (dispatch: Dispatch) => {
    try {
      const connection = new W3CWebSocket(url);
      dispatch(socketConnect(connection));
    } catch (err) {
      console.log("handleUserJoined error: ", err);
    }
  };

export const setSocketConnected = () => async (dispatch) => dispatch(socketConnected());
export const setSocketDisconnected = () => async (dispatch) => dispatch(socketDisconnected());

export const messageHandlers = new Set();

export const addMessageHandler = (handler) => {
  messageHandlers.add(handler);
};

export const removeMessageHandler = (handler) => {
  messageHandlers.delete(handler);
};

export const pingPong = ({
  socket,
  pingTimerId,
  reconnectTimerId,
  pingTimerIds,
  reconnectTimerIds,
}) => {
  const pingIntervalDuration = 5000;
  const assumedLatency = 4000; // max time taken by pong response to arrive
  const pongTimeout = assumedLatency;
  // set pongTimer every time ping is sent, clear every time pong is received from the server.
  // if pong is not received, try reconnecting (which means create new connection)
  const reconnectSocket = () => {
    // clearTimers(pingTimerIds);
    clearInterval(pingTimerId);
    console.info(`Socket Disconnected. Trying Reconnecting... after ${pongTimeout} sec.`);
    connectSocket(env.ws.url);
  };

  const sendPing = () => {
    socket.send(
      JSON.stringify({
        event: "ping",
        payload: {},
      }),
    );
    console.log("ping sent");
    clearInterval(reconnectTimerId);
    reconnectTimerId = setInterval(reconnectSocket, pongTimeout);
    // reconnectTimerIds.push(reconnectTimerId);
  };
  clearInterval(pingTimerId);
  pingTimerId = setInterval(sendPing, pingIntervalDuration);
  // pingTimerIds.push(reconnectTimerId);
};

export const clearTimers = (timers: any[]) => timers.forEach((id) => clearInterval(id));
