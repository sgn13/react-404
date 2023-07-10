import { combineReducers } from "redux";
import appState from "./app/reducers";
import socketState from "./socket/reducers";
import folderState from "./source/folder/reducers";
import themeState from "./theme/reducers";

import annotationState from "./annotation/reducers";
import annotationImageState from "./annotationImage/reducers";
import controllerState from "./configuration/controller/reducers";
import exclusionState from "./configuration/exclusion/reducers";
import libraryState from "./configuration/library/reducers";
import placementState from "./configuration/placement/reducers";
import environmentState from "./environment/reducers";
import featureState from "./feature/reducers";
import modelState from "./model/reducers";
import pipelineState from "./pipeline/reducers";
import fileUploadState from "./source/fileUpload/reducers";
import streamingState from "./source/streaming/reducers";
import templateState from "./template/reducers";

const rootReducer = combineReducers({
  themeState,
  appState,
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
  featureState,
  pipelineState,
  annotationImageState,
  annotationState,
});

export default rootReducer;
export type AppState = ReturnType<typeof rootReducer>;
