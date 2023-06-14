import {
  CREATE_FILEUPLOAD_DATA,
  REMOVE_FILEUPLOAD_DATA,
  RESET_SEARCHED_FILEUPLOADS_DATA,
  SET_FILEUPLOAD_DATA,
  SET_FILEUPLOADS_DATA,
  SET_FILEUPLOADS_METADATA,
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_SEARCHED_FILEUPLOADS_DATA,
  UPDATE_FILEUPLOAD_DATA,
} from './action-types';

export interface FileUploadState {
  isLoading: boolean;
  isSubmitting: boolean;

  fileupload: any;
  fileuploads: any;

  searchedFileUploads: any;

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

export type SetFileUploadDataType = {
  type: typeof SET_FILEUPLOAD_DATA;
  payload: any;
};

export type SetFileUploadsDataType = {
  type: typeof SET_FILEUPLOADS_DATA;
  payload: any;
};

export type SetFileUploadsMetadataType = {
  type: typeof SET_FILEUPLOADS_METADATA;
  payload: any;
};

export type SetSearchedFileUploadsDataType = {
  type: typeof SET_SEARCHED_FILEUPLOADS_DATA;
  payload: any;
};

export type ResetSearchedFileUploadsDataType = {
  type: typeof RESET_SEARCHED_FILEUPLOADS_DATA;
  payload: any;
};

export type CreateFileUploadDataType = {
  type: typeof CREATE_FILEUPLOAD_DATA;
  payload: any;
};

export type RemoveFileUploadDataType = {
  type: typeof REMOVE_FILEUPLOAD_DATA;
  payload: any;
};

export type UpdateFileUploadDataType = {
  type: typeof UPDATE_FILEUPLOAD_DATA;
  payload: any;
};

export type FileUploadActionTypes =
  | SetIsLoadingType
  | SetIsSubmittingType
  | SetFileUploadDataType
  | SetFileUploadsDataType
  | SetFileUploadsMetadataType
  | SetSearchedFileUploadsDataType
  | ResetSearchedFileUploadsDataType
  | CreateFileUploadDataType
  | RemoveFileUploadDataType
  | UpdateFileUploadDataType;
