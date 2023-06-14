// import configuration from "configuration/index";
// import { updateAtmData } from "store/atm/actions";
// import { updateCctvData } from "store/cctv/actions";
// import { updateFirewallData } from "store/firewall/actions";

const socketMiddleware = () => {
  // let atmClient = null;
  // let cctvClient = null;
  // let firewallClient = null;
  // return (store) => (next) => (action) => {
  //   if (!atmClient) {
  //     atmClient = new W3CWebSocket(
  //       `${configuration.ws.url}${ws.atm}&token=${sessionStorage.getItem("accessToken")}`,
  //     );
  //   }
  //   if (atmClient) {
  //     // atmClient.onopen = () => {
  //     //   console.log('atm socket connected outside');
  //     // };
  //     atmClient.onmessage = (message) => {
  //       const { atmState } = store.getState();
  //       if (atmState.isFiltering) return;
  //       const parsedMessage = JSON.parse(message.data);
  //       if (Object.keys(parsedMessage.data).length) {
  //         store.dispatch(updateAtmData(parsedMessage.data));
  //       }
  //     };
  //     atmClient.onclose = () => {
  //       atmClient = null;
  //       let count = 0;
  //       const maxCount = 10;
  //       var intervalID = setInterval(() => {
  //         atmClient = new W3CWebSocket(
  //           `${configuration.ws.url}${ws.atm}&token=${sessionStorage.getItem("accessToken")}`,
  //         );
  //         // atmClient.onopen = () => {
  //         //   console.log('atm socket connected inside');
  //         // };
  //         atmClient.onmessage = (message) => {
  //           const { atmState } = store.getState();
  //           if (atmState.isFiltering) return;
  //           const parsedMessage = JSON.parse(message.data);
  //           if (Object.keys(parsedMessage.data).length) {
  //             store.dispatch(updateAtmData(parsedMessage.data));
  //           }
  //         };
  //         count++;
  //         if (atmClient || count === maxCount) {
  //           window.clearInterval(intervalID);
  //         }
  //       }, 5000);
  //     };
  //   }
  //   if (!cctvClient) {
  //     cctvClient = new W3CWebSocket(
  //       `${configuration.ws.url}${ws.cctv}&token=${sessionStorage.getItem("accessToken")}`,
  //     );
  //   }
  //   if (cctvClient) {
  //     cctvClient.onmessage = (message) => {
  //       const { cctvState } = store.getState();
  //       if (cctvState.isFiltering) return;
  //       const parsedMessage = JSON.parse(message.data);
  //       if (Object.keys(parsedMessage.data).length) {
  //         store.dispatch(updateCctvData(parsedMessage.data));
  //       }
  //     };
  //     cctvClient.onclose = () => {
  //       cctvClient = null;
  //       let count = 0;
  //       const maxCount = 10;
  //       var intervalID = setInterval(() => {
  //         cctvClient = new W3CWebSocket(
  //           `${configuration.ws.url}${ws.atm}&token=${sessionStorage.getItem("accessToken")}`,
  //         );
  //         cctvClient.onmessage = (message) => {
  //           const { atmState } = store.getState();
  //           if (atmState.isFiltering) return;
  //           const parsedMessage = JSON.parse(message.data);
  //           if (Object.keys(parsedMessage.data).length) {
  //             store.dispatch(updateCctvData(parsedMessage.data));
  //           }
  //         };
  //         count++;
  //         if (cctvClient || count === maxCount) {
  //           window.clearInterval(intervalID);
  //         }
  //       }, 5000);
  //     };
  //   }
  //   if (!firewallClient) {
  //     firewallClient = new W3CWebSocket(
  //       `${configuration.ws.url}${ws.firewall}&token=${sessionStorage.getItem("accessToken")}`,
  //     );
  //   }
  //   if (firewallClient) {
  //     firewallClient.onmessage = (message) => {
  //       const { firewallState } = store.getState();
  //       if (firewallState.isFiltering) return;
  //       const parsedMessage = JSON.parse(message.data);
  //       if (Object.keys(parsedMessage.data).length) {
  //         store.dispatch(updateFirewallData(parsedMessage.data));
  //       }
  //     };
  //     firewallClient.onclose = () => {
  //       firewallClient = null;
  //       let count = 0;
  //       const maxCount = 10;
  //       var intervalID = setInterval(() => {
  //         firewallClient = new W3CWebSocket(
  //           `${configuration.ws.url}${ws.atm}&token=${sessionStorage.getItem("accessToken")}`,
  //         );
  //         firewallClient.onmessage = (message) => {
  //           const { atmState } = store.getState();
  //           if (atmState.isFiltering) return;
  //           const parsedMessage = JSON.parse(message.data);
  //           if (Object.keys(parsedMessage.data).length) {
  //             store.dispatch(updateCctvData(parsedMessage.data));
  //           }
  //         };
  //         count++;
  //         if (firewallClient || count === maxCount) {
  //           window.clearInterval(intervalID);
  //         }
  //       }, 5000);
  //     };
  //   }
  //   switch (action.type) {
  //     case PING_ATM: {
  //       try {
  //         atmClient.send(action.payload);
  //       } catch (err) {}
  //       return;
  //     }
  //     case PING_CCTV: {
  //       try {
  //         atmClient.send(action.payload);
  //       } catch (err) {}
  //       return;
  //     }
  //     case PING_FIREWALL: {
  //       try {
  //         firewallClient.send(action.payload);
  //       } catch (err) {}
  //       return;
  //     }
  //     default:
  //       return next(action);
  //   }
  // };
};

export default socketMiddleware;
