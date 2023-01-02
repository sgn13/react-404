import {
  RESET_NOTIFICATION_DATA,
  SET_DOWNLOADING_INFO,
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_ME,
  SET_NOTIFICATION_DATA,
  SET_SIDEBAR,
  SET_UPLOADING_INFO,
  UPDATE_ME,
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

export type SetMeType = {
  type: typeof SET_ME;
  payload: any;
};
export type UpdateMeType = {
  type: typeof UPDATE_ME;
  payload: any;
};

export type SetIsLoadingType = {
  type: typeof SET_IS_LOADING;
  payload: boolean;
};
export type SetIsSubmittingType = {
  type: typeof SET_IS_SUBMITTING;
  payload: boolean;
};

export type SetNotificationDataType = {
  type: typeof SET_NOTIFICATION_DATA;
  payload: NotificationPayloadType;
};

export type ResetNotificationDataType = {
  type: typeof RESET_NOTIFICATION_DATA;
};

export type SetDownloadingInfoType = {
  type: typeof SET_DOWNLOADING_INFO;
  payload: any;
};

export type SetUploadingInfoType = {
  type: typeof SET_UPLOADING_INFO;
  payload: any;
};

export type SetSidebarType = {
  type: typeof SET_SIDEBAR;
  payload: any;
};

export type ApplicationActionTypes =
  | SetIsLoadingType
  | SetIsSubmittingType
  | SetMeType
  | UpdateMeType
  | SetUploadingInfoType
  | SetDownloadingInfoType
  | SetNotificationDataType
  | ResetNotificationDataType
  | SetSidebarType;
