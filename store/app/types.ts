import {
  SET_IS_LOADING,
  SET_IS_PERMISSION_LOADING,
  SET_NOTIFICATION_DATA,
  RESET_NOTIFICATION_DATA,
  SET_SIDEBAR,
  SET_ME,
  SET_IS_SUBMITTING,
  SET_APP_NAME,
  FETCH_SIDEBAR,
  FETCH_SIDEBAR_REVERSE,
  UPDATE_ME,
  SET_VALID_PERMISSIONS,
  SET_UPLOADING_INFO,
  SET_DOWNLOADING_INFO,
  SET_LAYOUT_COLLAPSED,
} from "./constants";

export type NotificationPayloadType = {
  name: string;
  message: string;
  level: string;
};

export interface ApplicationState {
  token: string;
  isLoading: boolean;
  isSubmitting: boolean;
  isPermissionLoading: boolean;
  notification: NotificationPayloadType[];
  me: any;
  sidebar: any[];
  appName: any;
  validPermissions: any;
  upload: { count: number; progress: number; meta: string };
  download: { count: number; progress: number; meta: string };
  collapsed: boolean;
}

export type SetIsLoadingType = {
  type: typeof SET_IS_LOADING;
  payload: boolean;
};
export type SetIsSubmittingType = {
  type: typeof SET_IS_SUBMITTING;
  payload: boolean;
};
export type SetIsPermissionLoadingType = {
  type: typeof SET_IS_PERMISSION_LOADING;
  payload: boolean;
};
export type SetNotificationDataType = {
  type: typeof SET_NOTIFICATION_DATA;
  payload: NotificationPayloadType;
};

export type ResetNotificationDataType = {
  type: typeof RESET_NOTIFICATION_DATA;
};

export type SetSidebarType = {
  type: typeof SET_SIDEBAR;
  payload: any;
};

export type SetMeType = {
  type: typeof SET_ME;
  payload: any;
};
export type UpdateMeType = {
  type: typeof UPDATE_ME;
  payload: any;
};

export type FetchSidebarType = {
  type: typeof FETCH_SIDEBAR;
  payload: any;
};
export type FetchSidebarReverseType = {
  type: typeof FETCH_SIDEBAR_REVERSE;
  payload: any;
};
export type SetAppNameType = {
  type: typeof SET_APP_NAME;
  payload: any;
};

export type SetValidPermissionsType = {
  type: typeof SET_VALID_PERMISSIONS;
  payload: any;
};

export type SetDownloadingInfoType = {
  type: typeof SET_DOWNLOADING_INFO;
  payload: any;
};

export type SetUploadingInfoType = {
  type: typeof SET_UPLOADING_INFO;
  payload: any;
};

export type SetLayoutCollapsedType = {
  type: typeof SET_LAYOUT_COLLAPSED;
  payload: any;
};

export type ApplicationActionTypes =
  | SetIsLoadingType
  | SetIsSubmittingType
  | SetIsPermissionLoadingType
  | SetNotificationDataType
  | ResetNotificationDataType
  | SetSidebarType
  | SetMeType
  | FetchSidebarType
  | FetchSidebarReverseType
  | SetAppNameType
  | UpdateMeType
  | SetValidPermissionsType
  | SetDownloadingInfoType
  | SetUploadingInfoType
  | SetLayoutCollapsedType;
