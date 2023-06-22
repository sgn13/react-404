import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import api from "src/constants/api";

import { setErrorMessage } from "src/store/app/actions";
import { generateMeta, generateQuery } from "src/utils/store";

import { defaultQuery } from "src/constants/query";
import { network } from "src/utils/network";
import {
  ModelState,
  CreateModelDataType,
  RemoveModelDataType,
  ResetSearchedModelsDataType,
  SetModelDataType,
  SetModelsDataType,
  SetModelsMetadataType,
  SetIsLoadingType,
  SetIsSubmittingType,
  SetSearchedModelsDataType,
  UpdateModelDataType,
} from "./types";
import {
  CREATE_MODEL_DATA,
  REMOVE_MODEL_DATA,
  RESET_SEARCHED_MODELS_DATA,
  SET_MODELS_DATA,
  SET_MODELS_METADATA,
  SET_MODEL_DATA,
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_SEARCHED_MODELS_DATA,
  UPDATE_MODEL_DATA,
} from "./action-types";

export type AppThunk = ActionCreator<
  ThunkAction<Promise<boolean>, ModelState, null, Action<string>>
>;

export const setIsLoading = (payload: any): SetIsLoadingType => ({
  type: SET_IS_LOADING,
  payload,
});

export const setIsSubmitting = (payload: any): SetIsSubmittingType => ({
  type: SET_IS_SUBMITTING,
  payload,
});

export const setModelData = (payload: any): SetModelDataType => ({
  type: SET_MODEL_DATA,
  payload,
});

export const setModelsData = (payload: any): SetModelsDataType => ({
  type: SET_MODELS_DATA,
  payload,
});

export const setModelsMetadata = (payload: any): SetModelsMetadataType => ({
  type: SET_MODELS_METADATA,
  payload,
});

export const setSearchedModelsData = (payload: any): SetSearchedModelsDataType => ({
  type: SET_SEARCHED_MODELS_DATA,
  payload,
});

export const resetSearchedModelsData = (payload: any): ResetSearchedModelsDataType => ({
  type: RESET_SEARCHED_MODELS_DATA,
  payload,
});

export const createModelData = (payload: any): CreateModelDataType => ({
  type: CREATE_MODEL_DATA,
  payload,
});

export const removeModelData = (payload: any): RemoveModelDataType => ({
  type: REMOVE_MODEL_DATA,
  payload,
});

export const updateModelData = (payload: any): UpdateModelDataType => ({
  type: UPDATE_MODEL_DATA,
  payload,
});

export const fetchModel: AppThunk =
  ({ modelId }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await network({}).get(`${api.configuration.model}${modelId}/`);

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          dispatch(setModelData(data));
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

export const fetchModels: AppThunk =
  ({ query = defaultQuery, columns, searchable, search }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      const link = generateQuery({
        url: api.model.root,
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
          search ? dispatch(setSearchedModelsData(result)) : dispatch(setModelsData(result));
          const metadata = generateMeta({ query, data });
          dispatch(setModelsMetadata(metadata));
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

export const createModel: AppThunk =
  ({ values }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      dispatch(setIsSubmitting(true));
      const { data, status } = await network({}).post(api.model.root, [values]);
      if (status === 200 || (status > 200 && status < 300)) {
        dispatch(createModelData(data.data[0]));
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

export const updateModel: AppThunk =
  ({ modelId, values }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setIsSubmitting(true));
      const { data, status } = await network({}).put(`${api.model.root}${modelId}`, values);

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          console.log(data, "das");
          dispatch(updateModelData(data.data));
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

export const deleteModel: AppThunk =
  ({ modelId }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      console.log(modelId);

      dispatch(setIsSubmitting(true));
      const { status } = await network({}).delete(api.model.root, {
        data: { ids: modelId },
      });

      if (status === 200 || status > 200) {
        dispatch(removeModelData({ id: modelId }));
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
