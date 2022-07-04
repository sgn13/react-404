import { SET_IS_LOADING, SET_ME, SET_IS_SUBMITTING, UPDATE_ME } from "./constants";

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

export type SetMeType = {
  type: typeof SET_ME;
  payload: any;
};
export type UpdateMeType = {
  type: typeof UPDATE_ME;
  payload: any;
};

export type ApplicationActionTypes =
  | SetIsLoadingType
  | SetIsSubmittingType
  | SetMeType
  | UpdateMeType;
