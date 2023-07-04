import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import api from "src/constants/api";

import { setErrorMessage } from "src/store/app/actions";
import { generateMeta, generateQuery } from "src/utils/store";

import { defaultQuery } from "src/constants/query";
import { network } from "src/utils/network";
import {
  CREATE_FEATURE_DATA,
  REMOVE_FEATURE_DATA,
  RESET_SEARCHED_FEATURES_DATA,
  SET_FEATURES_DATA,
  SET_FEATURES_METADATA,
  SET_FEATURE_DATA,
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_SEARCHED_FEATURES_DATA,
  UPDATE_FEATURE_DATA,
} from "./action-types";
import {
  CreateFeatureDataType,
  FeatureState,
  RemoveFeatureDataType,
  ResetSearchedFeaturesDataType,
  SetFeatureDataType,
  SetFeaturesDataType,
  SetFeaturesMetadataType,
  SetIsLoadingType,
  SetIsSubmittingType,
  SetSearchedFeaturesDataType,
  UpdateFeatureDataType,
} from "./types";

export type AppThunk = ActionCreator<
  ThunkAction<Promise<boolean>, FeatureState, null, Action<string>>
>;

export const setIsLoading = (payload: any): SetIsLoadingType => ({
  type: SET_IS_LOADING,
  payload,
});

export const setIsSubmitting = (payload: any): SetIsSubmittingType => ({
  type: SET_IS_SUBMITTING,
  payload,
});

export const setFeatureData = (payload: any): SetFeatureDataType => ({
  type: SET_FEATURE_DATA,
  payload,
});

export const setFeaturesData = (payload: any): SetFeaturesDataType => ({
  type: SET_FEATURES_DATA,
  payload,
});

export const setFeaturesMetadata = (payload: any): SetFeaturesMetadataType => ({
  type: SET_FEATURES_METADATA,
  payload,
});

export const setSearchedFeaturesData = (payload: any): SetSearchedFeaturesDataType => ({
  type: SET_SEARCHED_FEATURES_DATA,
  payload,
});

export const resetSearchedFeaturesData = (payload: any): ResetSearchedFeaturesDataType => ({
  type: RESET_SEARCHED_FEATURES_DATA,
  payload,
});

export const createFeatureData = (payload: any): CreateFeatureDataType => ({
  type: CREATE_FEATURE_DATA,
  payload,
});

export const removeFeatureData = (payload: any): RemoveFeatureDataType => ({
  type: REMOVE_FEATURE_DATA,
  payload,
});

export const updateFeatureData = (payload: any): UpdateFeatureDataType => ({
  type: UPDATE_FEATURE_DATA,
  payload,
});

export const fetchFeature: AppThunk =
  ({ featureId }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await network({}).get(`${api.feature.root}${featureId}/`);

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          dispatch(setFeatureData(data));
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

export const fetchFeatures: AppThunk =
  ({ query = defaultQuery, columns, searchable, search }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      const link = generateQuery({
        url: api.feature.root,
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
          search ? dispatch(setSearchedFeaturesData(result)) : dispatch(setFeaturesData(result));
          const metadata = generateMeta({ query, data });
          dispatch(setFeaturesMetadata(metadata));
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

export const createFeature: AppThunk =
  ({ values }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      dispatch(setIsSubmitting(true));
      const { data, status } = await network({}).post(api.feature.root, [values]);
      if (status === 200 || (status > 200 && status < 300)) {
        dispatch(createFeatureData(data.data[0]));
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

export const updateFeature: AppThunk =
  ({ featureId, values }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setIsSubmitting(true));
      const { data, status } = await network({}).put(`${api.feature.root}${featureId}`, values);

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          console.log(data, "das");
          dispatch(updateFeatureData(data.data));
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

export const deleteFeature: AppThunk =
  ({ featureId }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      console.log(featureId);

      dispatch(setIsSubmitting(true));
      const { status } = await network({}).delete(api.feature.root, {
        data: { ids: featureId },
      });

      if (status === 200 || status > 200) {
        dispatch(removeFeatureData({ id: featureId }));
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
