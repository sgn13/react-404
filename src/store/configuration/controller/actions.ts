import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import {
  CREATE_CONTROLLER_DATA,
  REMOVE_CONTROLLER_DATA,
  RESET_SEARCHED_CONTROLLERS_DATA,
  SET_CONTROLLERS_DATA,
  SET_CONTROLLERS_METADATA,
  SET_CONTROLLER_DATA,
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_SEARCHED_CONTROLLERS_DATA,
  UPDATE_CONTROLLER_DATA,
} from './action-types';

import {
  ControllerState,
  CreateControllerDataType,
  RemoveControllerDataType,
  ResetSearchedControllersDataType,
  SetControllerDataType,
  SetControllersDataType,
  SetControllersMetadataType,
  SetIsLoadingType,
  SetIsSubmittingType,
  SetSearchedControllersDataType,
  UpdateControllerDataType,
} from './types';

import api from 'src/constants/api';

import { setErrorMessage } from 'src/store/app/actions';
import { generateMeta, generateQuery } from 'src/utils/store';

import { defaultQuery } from 'src/constants/query';
import { network } from 'src/utils/network';

export type AppThunk = ActionCreator<
  ThunkAction<Promise<boolean>, ControllerState, null, Action<string>>
>;

export const setIsLoading = (payload: any): SetIsLoadingType => ({
  type: SET_IS_LOADING,
  payload,
});

export const setIsSubmitting = (payload: any): SetIsSubmittingType => ({
  type: SET_IS_SUBMITTING,
  payload,
});

export const setControllerData = (payload: any): SetControllerDataType => ({
  type: SET_CONTROLLER_DATA,
  payload,
});

export const setControllersData = (payload: any): SetControllersDataType => ({
  type: SET_CONTROLLERS_DATA,
  payload,
});

export const setControllersMetadata = (
  payload: any
): SetControllersMetadataType => ({
  type: SET_CONTROLLERS_METADATA,
  payload,
});

export const setSearchedControllersData = (
  payload: any
): SetSearchedControllersDataType => ({
  type: SET_SEARCHED_CONTROLLERS_DATA,
  payload,
});

export const resetSearchedControllersData = (
  payload: any
): ResetSearchedControllersDataType => ({
  type: RESET_SEARCHED_CONTROLLERS_DATA,
  payload,
});

export const createControllerData = (
  payload: any
): CreateControllerDataType => ({
  type: CREATE_CONTROLLER_DATA,
  payload,
});

export const removeControllerData = (
  payload: any
): RemoveControllerDataType => ({
  type: REMOVE_CONTROLLER_DATA,
  payload,
});

export const updateControllerData = (
  payload: any
): UpdateControllerDataType => ({
  type: UPDATE_CONTROLLER_DATA,
  payload,
});

export const fetchController: AppThunk =
  ({ controllerId }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await network({}).get(
        `${api.configuration.controller}${controllerId}/`
      );

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          dispatch(setControllerData(data));
          dispatch(setIsLoading(false));
          return true;
        }
      }
      return false;
    } catch (error: any) {
      error.response && dispatch(setErrorMessage(error));
      dispatch(setIsLoading(false));
      return false;
    }
  };

export const fetchControllers: AppThunk =
  ({ query = defaultQuery, columns, searchable, search }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      const link = generateQuery({
        url: api.configuration.controller,
        query,
        columns,
        searchable,
      });

      dispatch(setIsLoading(true));
      const { data, status } = await network({}).get(link);

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          const result = {
            items: data?.items || [],
            headers: data?.headers || {},
          };
          search
            ? dispatch(setSearchedControllersData(result))
            : dispatch(setControllersData(result));
          const metadata = generateMeta({ query, data });
          dispatch(setControllersMetadata(metadata));
          dispatch(setIsLoading(false));
          return true;
        }
      }
      return false;
    } catch (error: any) {
      error.response && dispatch(setErrorMessage(error));
      dispatch(setIsLoading(false));
      return false;
    }
  };

export const createController: AppThunk =
  ({ values }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      dispatch(setIsSubmitting(true));
      const { data, status } = await network({}).post(
        api.configuration.controller,
        [values]
      );
      if (status === 200 || (status > 200 && status < 300)) {
        dispatch(createControllerData(data.data[0]));
        dispatch(setIsSubmitting(false));

        return true;
      }
      return false;
    } catch (error: any) {
      error.response && dispatch(setErrorMessage(error));
      dispatch(setIsSubmitting(false));
      return false;
    }
  };

export const updateController: AppThunk =
  ({ controllerId, values }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setIsSubmitting(true));
      const { data, status } = await network({}).put(
        `${api.configuration.controller}${controllerId}`,
        values
      );

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          console.log(data, 'das');
          dispatch(updateControllerData(data.data));
          dispatch(setIsSubmitting(false));
          return true;
        }
      }
      return false;
    } catch (error: any) {
      error.response && dispatch(setErrorMessage(error));
      dispatch(setIsSubmitting(false));
      return false;
    }
  };

export const deleteController: AppThunk =
  ({ controllerId }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      console.log(controllerId);

      dispatch(setIsSubmitting(true));
      const { status } = await network({}).delete(
        api.configuration.controller,
        {
          data: { ids: controllerId },
        }
      );

      if (status === 200 || status > 200) {
        dispatch(removeControllerData({ id: controllerId }));
        dispatch(setIsSubmitting(false));

        return true;
      }
      return false;
    } catch (error: any) {
      error.response && dispatch(setErrorMessage(error));
      dispatch(setIsSubmitting(false));
      return false;
    }
  };
