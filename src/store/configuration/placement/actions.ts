import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import {
  CREATE_PLACEMENT_DATA,
  REMOVE_PLACEMENT_DATA,
  RESET_SEARCHED_PLACEMENTS_DATA,
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_PLACEMENTS_DATA,
  SET_PLACEMENTS_METADATA,
  SET_PLACEMENT_DATA,
  SET_SEARCHED_PLACEMENTS_DATA,
  UPDATE_PLACEMENT_DATA,
} from './action-types';

import {
  CreatePlacementDataType,
  PlacementState,
  RemovePlacementDataType,
  ResetSearchedPlacementsDataType,
  SetIsLoadingType,
  SetIsSubmittingType,
  SetPlacementDataType,
  SetPlacementsDataType,
  SetPlacementsMetadataType,
  SetSearchedPlacementsDataType,
  UpdatePlacementDataType,
} from './types';

import api from 'src/constants/api';

import { setErrorMessage } from 'src/store/app/actions';
import { generateMeta, generateQuery } from 'src/utils/store';

import { defaultQuery } from 'src/constants/query';
import { network } from 'src/utils/network';

export type AppThunk = ActionCreator<
  ThunkAction<Promise<boolean>, PlacementState, null, Action<string>>
>;

export const setIsLoading = (payload: any): SetIsLoadingType => ({
  type: SET_IS_LOADING,
  payload,
});

export const setIsSubmitting = (payload: any): SetIsSubmittingType => ({
  type: SET_IS_SUBMITTING,
  payload,
});

export const setPlacementData = (payload: any): SetPlacementDataType => ({
  type: SET_PLACEMENT_DATA,
  payload,
});

export const setPlacementsData = (payload: any): SetPlacementsDataType => ({
  type: SET_PLACEMENTS_DATA,
  payload,
});

export const setPlacementsMetadata = (
  payload: any
): SetPlacementsMetadataType => ({
  type: SET_PLACEMENTS_METADATA,
  payload,
});

export const setSearchedPlacementsData = (
  payload: any
): SetSearchedPlacementsDataType => ({
  type: SET_SEARCHED_PLACEMENTS_DATA,
  payload,
});

export const resetSearchedPlacementsData = (
  payload: any
): ResetSearchedPlacementsDataType => ({
  type: RESET_SEARCHED_PLACEMENTS_DATA,
  payload,
});

export const createPlacementData = (payload: any): CreatePlacementDataType => ({
  type: CREATE_PLACEMENT_DATA,
  payload,
});

export const removePlacementData = (payload: any): RemovePlacementDataType => ({
  type: REMOVE_PLACEMENT_DATA,
  payload,
});

export const updatePlacementData = (payload: any): UpdatePlacementDataType => ({
  type: UPDATE_PLACEMENT_DATA,
  payload,
});

export const fetchPlacement: AppThunk =
  ({ placementId }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await network({}).get(
        `${api.configuration.placement}${placementId}/`
      );

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          dispatch(setPlacementData(data));
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

export const fetchPlacements: AppThunk =
  ({ query = defaultQuery, columns, searchable, search }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      const link = generateQuery({
        url: api.configuration.placement,
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
            ? dispatch(setSearchedPlacementsData(result))
            : dispatch(setPlacementsData(result));
          const metadata = generateMeta({ query, data });
          dispatch(setPlacementsMetadata(metadata));
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

export const createPlacement: AppThunk =
  ({ values }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      dispatch(setIsSubmitting(true));
      const { data, status } = await network({}).post(
        api.configuration.placement,
        [values]
      );
      if (status === 200 || (status > 200 && status < 300)) {
        dispatch(createPlacementData(data.data[0]));
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

export const updatePlacement: AppThunk =
  ({ placementId, values }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setIsSubmitting(true));
      const { data, status } = await network({}).put(
        `${api.configuration.placement}${placementId}`,
        values
      );

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          console.log(data, 'das');
          dispatch(updatePlacementData(data.data));
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

export const deletePlacement: AppThunk =
  ({ placementId }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      dispatch(setIsSubmitting(true));
      const { status } = await network({}).delete(api.configuration.placement, {
        data: { ids: placementId },
      });

      if (status === 200 || status > 200) {
        dispatch(removePlacementData({ id: placementId }));
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
