import { useEffect } from "react";
import env from "src/constants/env";
import { addMessageHandler } from "src/store/socket/actions";
import useReconnectingSocket from "src/store/socket/useReconnectingSocket";

function useSocketService({
  socket,
  connected,
  connectSocket,
  setSocketDisconnected,
  setSocketConnected,
  me,
}: PropsFromRedux) {
  useReconnectingSocket({
    maxReconnectAttempt: 0,
    reconnectInterval: 5000,
    pingInterval: 3000,
    connectOnMount: true,
    socket,
    me,
    connected,
    connectSocket: () => connectSocket(env.ws.url),
    setSocketConnected,
    setSocketDisconnected,
    showLog: !false,
  });

  // const handleNewClientJoined = (client: string) => {
  //   console.log("new-client-joined", client);
  //   if (client) addNewOnlineClient({ newClient: client });
  // };

  // const handleClientLeft = (client: clientType) => {
  //   if (client) removeOldOnlineClient({ oldClient: client });
  // };

  // const handleConnectToClientSuccess = (remoteUser) => {
  //   history.push(app.desk.liveCall);
  // };

  const handleDeskJoinedSuccesssHandler = (message, me) => {
    const parsedMessage = JSON.parse(message.data);
    const { payload, event } = parsedMessage;
    if (event === "desk-joined-success") {
      const { ws_name } = payload;
      const newProfile = { ...me };
      newProfile.profile.ws_name = ws_name;
      // setMeData({ newMe: newProfile });
      console.log("Desk is online.");
    }
  };

  const handleNewClientJoinedHandler = (message, socket, connected) => {
    const parsedMessage = JSON.parse(message.data);
    const { payload, event } = parsedMessage;
    if (event === "new-client-joined") {
      // handleNewClientJoined(payload);
      // check if the new-client is client who is already on ongoing-kyc list, if so change it's status.
      const connectedToDeskData = window.sessionStorage.getItem("ongoing-kyc-clients");
      if (connectedToDeskData) {
        const connectedToDeskClients = JSON.parse(connectedToDeskData);

        if (connectedToDeskClients && connectedToDeskClients.length) {
          const found = connectedToDeskClients.findIndex((item) => item.app_id === payload?.app_id);
          if (found && connected) {
            // emit that client status is ongoing-kyc which is expected to be broadcasted to all desks by signalling server
            socket.send(
              JSON.stringify({
                event: "ongoing-kyc",
                payload: { ws_name: payload?.ws_name, app_id: payload?.app_id },
              }),
            );
          }
        }
      }
    }
  };

  useEffect(() => {
    // only add this event handler if me is available
    // make sure addMessageHandlerCallback is named function to remove memory leak
    if (me)
      addMessageHandler(function deskJoined(message) {
        handleDeskJoinedSuccesssHandler(message, me);
      });
  }, [me]);

  useEffect(() => {
    if (socket && connected)
      addMessageHandler(function newClientJoined(message) {
        handleNewClientJoinedHandler(message, socket, connected);
      });
  }, [connected, socket]);

  const handleConnectToClientHandler = (message) => {
    const parsedMessage = JSON.parse(message.data);
    const { payload, event } = parsedMessage;
    if (event === "connect-to-client") {
      const { deviceInfo } = payload;
    }
  };

  useEffect(() => {
    addMessageHandler(handleConnectToClientHandler);
  }, []);

  return null;
}

export default useSocketService;
