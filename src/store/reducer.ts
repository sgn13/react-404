import { combineReducers } from "redux";
import appState from "./app/reducers";
import liveClientState from "./liveClient/reducers";
import socketState from "./socket/reducers";
import folderState from "./source/folder/reducers";
import themeState from "./theme/reducers";

import environmentState from "./environment/reducers";
import controllerState from "./configuration/controller/reducers";
import exclusionState from "./configuration/exclusion/reducers";
import libraryState from "./configuration/library/reducers";
import placementState from "./configuration/placement/reducers";
import fileUploadState from "./source/fileUpload/reducers";
import streamingState from "./source/streaming/reducers";
import modelState from "./model/reducers";
import templateState from "./template/reducers";

const rootReducer = combineReducers({
  themeState,
  appState,
  liveClientState,
  socketState,
  libraryState,
  exclusionState,
  placementState,
  controllerState,
  streamingState,
  folderState,
  fileUploadState,
  environmentState,
  modelState,
  templateState,
});

export default rootReducer;
export type AppState = ReturnType<typeof rootReducer>;
