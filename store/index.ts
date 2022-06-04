import { applyMiddleware, compose, legacy_createStore as createStore, Store } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";
// import socketMiddleware from "store/socket/middleware";
// import { createLogger } from 'redux-logger';

export function initializeStore(defaultState = {}): Store {
  const middleware = [
    thunkMiddleware,
    // socketMiddleware(),
    // createLogger()
  ];

  const store = createStore(
    reducer,
    defaultState,
    composeWithDevTools
      ? composeWithDevTools(applyMiddleware(...middleware))
      : compose(applyMiddleware(...middleware)),
  );

  return store;
}

export type IAppStore = ReturnType<typeof initializeStore>;
export const getStore = initializeStore;
