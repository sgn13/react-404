import { applyMiddleware, compose, legacy_createStore as createStore, Store } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";
// import socketMiddleware from "store/socket/middleware";
// import { createLogger } from 'redux-logger';

const localStorageKey = "theme";
const storedTheme = localStorage.getItem(localStorageKey) || "{}";
const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

// first priority is theme set in localStorage and then fallback to prefers-color-scheme
const preferredThemeName =
  JSON.parse(storedTheme)?.themeName || (storedTheme === "{}" && prefersDark && "dark") || "light";

const initialStoreState = {
  themeState: { themeName: preferredThemeName },
};

export function initializeStore(defaultState = initialStoreState): Store {
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

  // our callback is fired everytime when the store is updated
  // subscribe is used to listen for changes to the store and react to them.
  store.subscribe(() => {
    const { themeState } = store.getState();
    if (!themeState) return;
    localStorage.setItem(localStorageKey, JSON.stringify(themeState));
  });

  return store;
}

export type IAppStore = ReturnType<typeof initializeStore>;
export const getStore = initializeStore;
