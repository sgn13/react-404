import {
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_FOLDER_DATA,
  SET_FOLDERS_DATA,
  SET_FOLDERS_METADATA,
  SET_SEARCHED_FOLDERS_DATA,
  RESET_SEARCHED_FOLDERS_DATA,
  CREATE_FOLDER_DATA,
  REMOVE_FOLDER_DATA,
  UPDATE_FOLDER_DATA,
} from './action-types';

export interface FolderState {
  isLoading: boolean;
  isSubmitting: boolean;

  folder: any;
  folders: any;

  searchedFolders: any;

  metadata: any;
}

export type SetIsLoadingType = {
  type: typeof SET_IS_LOADING;
  payload: boolean;
};

export type SetIsSubmittingType = {
  type: typeof SET_IS_SUBMITTING;
  payload: boolean;
};

export type SetFolderDataType = {
  type: typeof SET_FOLDER_DATA;
  payload: any;
};

export type SetFoldersDataType = {
  type: typeof SET_FOLDERS_DATA;
  payload: any;
};

export type SetFoldersMetadataType = {
  type: typeof SET_FOLDERS_METADATA;
  payload: any;
};

export type SetSearchedFoldersDataType = {
  type: typeof SET_SEARCHED_FOLDERS_DATA;
  payload: any;
};

export type ResetSearchedFoldersDataType = {
  type: typeof RESET_SEARCHED_FOLDERS_DATA;
  payload: any;
};

export type CreateFolderDataType = {
  type: typeof CREATE_FOLDER_DATA;
  payload: any;
};

export type RemoveFolderDataType = {
  type: typeof REMOVE_FOLDER_DATA;
  payload: any;
};

export type UpdateFolderDataType = {
  type: typeof UPDATE_FOLDER_DATA;
  payload: any;
};

export type FolderActionTypes =
  | SetIsLoadingType
  | SetIsSubmittingType
  | SetFolderDataType
  | SetFoldersDataType
  | SetFoldersMetadataType
  | SetSearchedFoldersDataType
  | ResetSearchedFoldersDataType
  | CreateFolderDataType
  | RemoveFolderDataType
  | UpdateFolderDataType;
