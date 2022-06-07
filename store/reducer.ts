import { combineReducers } from "redux";
import themeState from "./theme/reducers";
import appState from "./app/reducers";
import registerationState from "./registration/reducers";
import permissionState from "./permission/reducers";
import roleState from "./role/reducers";
import driverState from "./driver/reducers";
import userState from "./user/reducers";
import socketState from "./socket/reducers";

const rootReducer = combineReducers({
  themeState,
  appState,
  permissionState,
  driverState,
  roleState,
  userState,
  registerationState,
  socketState,
});

export default rootReducer;
export type AppState = ReturnType<typeof rootReducer>;
