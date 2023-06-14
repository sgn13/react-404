import {
  CREATE_LIBRARY_DATA,
  REMOVE_LIBRARY_DATA,
  RESET_SEARCHED_LIBRARYS_DATA,
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_LIBRARYS_DATA,
  SET_LIBRARYS_METADATA,
  SET_LIBRARY_DATA,
  SET_SEARCHED_LIBRARYS_DATA,
  UPDATE_LIBRARY_DATA,
} from './action-types';

export interface LibraryState {
  isLoading: boolean;
  isSubmitting: boolean;

  library: any;
  librarys: any;

  searchedLibrarys: any;

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

export type SetLibraryDataType = {
  type: typeof SET_LIBRARY_DATA;
  payload: any;
};

export type SetLibrarysDataType = {
  type: typeof SET_LIBRARYS_DATA;
  payload: any;
};

export type SetLibrarysMetadataType = {
  type: typeof SET_LIBRARYS_METADATA;
  payload: any;
};

export type SetSearchedLibrarysDataType = {
  type: typeof SET_SEARCHED_LIBRARYS_DATA;
  payload: any;
};

export type ResetSearchedLibrarysDataType = {
  type: typeof RESET_SEARCHED_LIBRARYS_DATA;
  payload: any;
};

export type CreateLibraryDataType = {
  type: typeof CREATE_LIBRARY_DATA;
  payload: any;
};

export type RemoveLibraryDataType = {
  type: typeof REMOVE_LIBRARY_DATA;
  payload: any;
};

export type UpdateLibraryDataType = {
  type: typeof UPDATE_LIBRARY_DATA;
  payload: any;
};

export type LibraryActionTypes =
  | SetIsLoadingType
  | SetIsSubmittingType
  | SetLibraryDataType
  | SetLibrarysDataType
  | SetLibrarysMetadataType
  | SetSearchedLibrarysDataType
  | ResetSearchedLibrarysDataType
  | CreateLibraryDataType
  | RemoveLibraryDataType
  | UpdateLibraryDataType;
