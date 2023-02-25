import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import api from "constants/api";

import { generateMeta, generateQuery } from "utils/store";
import { notifyError } from "store/app/actions";

import { network } from "utils/network";
import { defaultQuery } from "constants/query";

import {
  CreateLiveClientDataType,
  RemoveLiveClientDataType,
  ResetSearchedLiveClientsDataType,
  SetFcrsLiveClientQueryResultDataDataType,
  SetIsLoadingType,
  SetIsSubmittingType,
  SetSearchedLiveClientsDataType,
  SetLiveClientDataType,
  SetLiveClientsDataType,
  SetLiveClientsMetadataType,
  UpdateLiveClientDataType,
  LiveClientState,
} from "./types";
import {
  CREATE_LIVECLIENT_DATA,
  REMOVE_LIVECLIENT_DATA,
  RESET_SEARCHED_LIVECLIENTS_DATA,
  SET_FCRS_LIVECLIENT_QUERY_RESULT_DATA,
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_SEARCHED_LIVECLIENTS_DATA,
  SET_LIVECLIENTS_DATA,
  SET_LIVECLIENTS_METADATA,
  SET_LIVECLIENT_DATA,
  UPDATE_LIVECLIENT_DATA,
} from "./action-types";
import { Notify } from "components/Notification/Notification";

// import { updateSidebarData } from "../app/actions";

export type AppThunk = ActionCreator<
  ThunkAction<Promise<boolean>, LiveClientState, null, Action<string>>
>;

export const setIsLoading = (payload): SetIsLoadingType => ({
  type: SET_IS_LOADING,
  payload,
});

export const setIsSubmitting = (payload): SetIsSubmittingType => ({
  type: SET_IS_SUBMITTING,
  payload,
});

export const setLiveClientData = (payload): SetLiveClientDataType => ({
  type: SET_LIVECLIENT_DATA,
  payload,
});

export const setLiveClientsData = (payload): SetLiveClientsDataType => ({
  type: SET_LIVECLIENTS_DATA,
  payload,
});

export const setLiveClientsMetadata = (payload): SetLiveClientsMetadataType => ({
  type: SET_LIVECLIENTS_METADATA,
  payload,
});

export const setSearchedLiveClientsData = (payload): SetSearchedLiveClientsDataType => ({
  type: SET_SEARCHED_LIVECLIENTS_DATA,
  payload,
});

export const resetSearchedLiveClientsData = (payload): ResetSearchedLiveClientsDataType => ({
  type: RESET_SEARCHED_LIVECLIENTS_DATA,
  payload,
});

export const createLiveClientData = (payload): CreateLiveClientDataType => ({
  type: CREATE_LIVECLIENT_DATA,
  payload,
});

export const removeLiveClientData = (payload): RemoveLiveClientDataType => ({
  type: REMOVE_LIVECLIENT_DATA,
  payload,
});

export const updateLiveClientData = (payload): UpdateLiveClientDataType => ({
  type: UPDATE_LIVECLIENT_DATA,
  payload,
});
export const setFcrsLiveClientQueryResultData = (
  payload,
): SetFcrsLiveClientQueryResultDataDataType => ({
  type: SET_FCRS_LIVECLIENT_QUERY_RESULT_DATA,
  payload,
});

export const setLiveClient: AppThunk = (payload) => (dispatch: Dispatch) => {
  dispatch(setLiveClientData(payload));
};

export const fetchLiveClient: AppThunk =
  ({ liveclientId }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setIsLoading(true));
      // const { data, status } = await network({ dispatch }).get(`${api.liveclient}${liveclientId}/`);
      const { data, status } = await network({ dispatch, sso: true }).get(
        `${api.liveclient}${liveclientId}/`,
      );

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          dispatch(setLiveClientData(data));
          dispatch(setIsLoading(false));
          return true;
        }
      }
      return false;
    } catch (error) {
      notifyError(error);
      dispatch(setIsLoading(false));
      return false;
    }
  };

export const fetchLiveClients: AppThunk =
  ({ query = defaultQuery }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      const link = generateQuery({ url: api.liveclient, query });

      dispatch(setIsLoading(true));
      const { data, status } = await network({ dispatch }).get(link);

      if (status === 200 || (status > 200 && status < 300)) {
        const { results } = data;
        const metadata = generateMeta({ data, query, results });

        if (results) {
          dispatch(setLiveClientsData(results));
          dispatch(setLiveClientsMetadata(metadata));
          dispatch(setIsLoading(false));
          return true;
        }
        return false;
      }
      return false;
    } catch (error) {
      dispatch(setIsLoading(false));
      notifyError(error);
      return false;
    }
  };

export const createLiveClient: AppThunk =
  ({ values }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      dispatch(setIsSubmitting(true));
      const { data, status } = await network({ dispatch }).post(api.liveclient, values);

      if (status === 200 || (status > 200 && status < 300)) {
        Notify("New LiveClient Added Successfully", {
          type: "success",
          position: "top-right",
        });
        dispatch(createLiveClientData(data));
        dispatch(setIsSubmitting(false));
        return true;
      }
      return false;
    } catch (error) {
      notifyError(error);
      dispatch(setIsSubmitting(false));
      return false;
    }
  };

export const updateLiveClient: AppThunk =
  ({ liveclientId, values }) =>
  async (dispatch: Dispatch) => {
    try {
      // const body = formDataGenerator({ data: values });

      dispatch(setIsSubmitting(true));
      const { data, status } = await network({ dispatch }).put(
        `${api.liveclient}${liveclientId}`,
        values,
      );

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          dispatch(updateLiveClientData(data));
          dispatch(setIsSubmitting(false));
          return true;
        }
      }
      return false;
    } catch (error) {
      notifyError(error);
      dispatch(setIsSubmitting(false));
      return false;
    }
  };

export const updateLiveClientPermission: AppThunk =
  ({ liveclientId, values }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setIsSubmitting(true));
      const { data, status } = await network({ dispatch }).post(
        `${api.liveclientPermission}${liveclientId}/`,
        values,
      );

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          dispatch(updateLiveClientData(data));
          dispatch(setIsSubmitting(false));
          return true;
        }
      }
      return false;
    } catch (error) {
      notifyError(error);
      dispatch(setIsSubmitting(false));
      return false;
    }
  };

export const deleteLiveClient: AppThunk =
  ({ liveclientId }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      dispatch(setIsSubmitting(true));
      const { status } = await network({ dispatch }).delete(`${api.liveclient}${liveclientId}/`);

      if (status === 200 || status > 200) {
        dispatch(removeLiveClientData({ id: liveclientId }));
        dispatch(setIsSubmitting(false));
        return true;
      }
      return false;
    } catch (error) {
      notifyError(error);
      dispatch(setIsSubmitting(false));
      return false;
    }
  };
