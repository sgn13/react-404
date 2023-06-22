import React, { useEffect } from "react";
import { addMessageHandler, messageHandlers } from "src/store/socket/actions";

let reconnectTimerId = null;
let pingTimerId = null;

let pongHeartbeat = 0;
let previousPongHearbeat = null;
let reconnectAttempt = 0;

function useSocket({
  maxReconnectAttempt = 5,
  pingInterval = 5000,
  reconnectInterval = 7000,
  connectOnMount = true,
  socket,
  me,
  connected,
  connectSocket,
  setSocketConnected,
  setSocketDisconnected,
  showLog = false,
}: any) {
  const resetTrackers = () => {
    // console.log('reseting trackers', {
    //   reconnectAttempt,
    //   pongHeartbeat,
    //   previousPongHearbeat,
    // });
    pongHeartbeat = 0;
    previousPongHearbeat = null;
    reconnectAttempt = 0;
  };

  useEffect(() => {
    if (!socket && connectOnMount) {
      // connecting socket
      connectSocket();
    }
  }, []);

  const reconnectSocket = () => {
    reconnectTimerId = setInterval(() => {
      if (reconnectAttempt === maxReconnectAttempt) {
        clearInterval(reconnectTimerId);
        return;
      }
      connectSocket();
      if (showLog)
        console.info(
          `[Attempt-${
            reconnectAttempt + 1
          }/${maxReconnectAttempt}] Trying to restablish socket connection...`,
        );
      reconnectAttempt += 1;
    }, reconnectInterval);
  };

  const pongHandler = (message) => {
    const { payload, event } = JSON.parse(message?.data);

    if (event === "pong") {
      // Pong messages are automatically sent by server in response to ping messages of client as required by the spec.
      if (showLog) console.log("pong received.", pongHeartbeat);
      pongHeartbeat = pongHeartbeat + 1;
    }

    return;
  };

  useEffect(() => {
    addMessageHandler(pongHandler);
  }, []);

  useEffect(() => {
    if (!connected) {
      clearInterval(reconnectTimerId);
      clearInterval(pingTimerId);
      reconnectSocket();
    }

    return () => {
      clearInterval(reconnectInterval);
    };
  }, [connected]);

  useEffect(() => {
    if (!me || !socket) return;
    // keeing these events here because we want to persist it accross application

    socket.onopen = () => {
      setSocketConnected();
      clearInterval(reconnectTimerId);
      resetTrackers();

      socket.send(
        JSON.stringify({
          event: "desk-joined",
          payload: me?.profile,
        }),
      );

      socket.send(
        JSON.stringify({
          event: "ping",
          payload: {},
        }),
      );

      // clear previous timer before starting new;
      clearInterval(pingTimerId);
      pingTimerId = setInterval(() => {
        if (previousPongHearbeat === pongHeartbeat) {
          socket.close(); // to disconnect previously connected socket
          setSocketDisconnected();
          return;
        }

        socket.send(
          JSON.stringify({
            event: "ping",
            payload: {},
          }),
        );
        if (showLog) console.log("ping sent", previousPongHearbeat);

        previousPongHearbeat = pongHeartbeat;
      }, pingInterval);
    };

    socket.onmessage = (message) => messageHandlers.forEach((handler) => handler(message));

    socket.onclose = () => {
      console.log("socket connection has been closed by server!");
    };

    socket.onerror = (err) => {
      // console.log('Error in socket connection !');
      socket.close();
    };
  }, [socket, me]);

  return null;
}

export default useSocket;
