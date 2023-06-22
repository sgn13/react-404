import configuration from 'configuration/index';
import { setNotification } from 'store/app/actions';

const socketMiddleware = () => {
  return (store) => (next) => (action) => {
    const {
      socketState: { kycClient },
      appState: { me },
    } = store.getState();

    // if (kycClient) {
    //   kycClient.onmessage = (message) => {
    //     const { atmState } = store.getState();
    //     const parsedMessage = JSON.parse(message.data);
    //     const { data, event } = parsedMessage;
    //   };

    //   // move these code to to layout.tsx otherwise the functions will be created on every store update
    //   kycClient.onclose = () => {
    //     store.dispatch(setKycClientDisconnected());
    //     console.log('client socket disconnected');
    //   };

    //   kycClient.onerror = (err) => {
    //     console.log('got socket err', err);
    //   };
    // }

    switch (action.type) {
      default: {
        return next(action);
      }
    }
  };
};

export default socketMiddleware;
