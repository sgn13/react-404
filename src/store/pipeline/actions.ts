import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import api from "src/constants/api";

import { setErrorMessage } from "src/store/app/actions";
import { generateMeta, generateQuery } from "src/utils/store";

import { defaultQuery } from "src/constants/query";
import { network } from "src/utils/network";
import {
  CREATE_PIPELINE_DATA,
  REMOVE_PIPELINE_DATA,
  RESET_SEARCHED_PIPELINES_DATA,
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_PIPELINES_DATA,
  SET_PIPELINES_METADATA,
  SET_PIPELINE_DATA,
  SET_SEARCHED_PIPELINES_DATA,
  UPDATE_PIPELINE_DATA,
} from "./action-types";
import {
  CreatePipelineDataType,
  PipelineState,
  RemovePipelineDataType,
  ResetSearchedPipelinesDataType,
  SetIsLoadingType,
  SetIsSubmittingType,
  SetPipelineDataType,
  SetPipelinesDataType,
  SetPipelinesMetadataType,
  SetSearchedPipelinesDataType,
  UpdatePipelineDataType,
} from "./types";

export type AppThunk = ActionCreator<
  ThunkAction<Promise<boolean>, PipelineState, null, Action<string>>
>;

export const setIsLoading = (payload: any): SetIsLoadingType => ({
  type: SET_IS_LOADING,
  payload,
});

export const setIsSubmitting = (payload: any): SetIsSubmittingType => ({
  type: SET_IS_SUBMITTING,
  payload,
});

export const setPipelineData = (payload: any): SetPipelineDataType => ({
  type: SET_PIPELINE_DATA,
  payload,
});

export const setPipelinesData = (payload: any): SetPipelinesDataType => ({
  type: SET_PIPELINES_DATA,
  payload,
});

export const setPipelinesMetadata = (payload: any): SetPipelinesMetadataType => ({
  type: SET_PIPELINES_METADATA,
  payload,
});

export const setSearchedPipelinesData = (payload: any): SetSearchedPipelinesDataType => ({
  type: SET_SEARCHED_PIPELINES_DATA,
  payload,
});

export const resetSearchedPipelinesData = (payload: any): ResetSearchedPipelinesDataType => ({
  type: RESET_SEARCHED_PIPELINES_DATA,
  payload,
});

export const createPipelineData = (payload: any): CreatePipelineDataType => ({
  type: CREATE_PIPELINE_DATA,
  payload,
});

export const removePipelineData = (payload: any): RemovePipelineDataType => ({
  type: REMOVE_PIPELINE_DATA,
  payload,
});

export const updatePipelineData = (payload: any): UpdatePipelineDataType => ({
  type: UPDATE_PIPELINE_DATA,
  payload,
});

export const fetchPipeline: AppThunk =
  ({ pipelineId }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await network({}).get(`${api.mlpipe.root}${pipelineId}/`);

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          dispatch(setPipelineData(data));
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

export const fetchPipelines: AppThunk =
  ({ query = defaultQuery, columns, searchable, search }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      const link = generateQuery({
        url: api.mlPipe.root,
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
          search ? dispatch(setSearchedPipelinesData(result)) : dispatch(setPipelinesData(result));
          const metadata = generateMeta({ query, data });
          dispatch(setPipelinesMetadata(metadata));
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

export const createPipeline: AppThunk =
  ({ values }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      dispatch(setIsSubmitting(true));
      const { data, status } = await network({}).post(api.mlpipe.root, [values]);
      if (status === 200 || (status > 200 && status < 300)) {
        dispatch(createPipelineData(data.data[0]));
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

export const updatePipeline: AppThunk =
  ({ pipelineId, values }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setIsSubmitting(true));
      const { data, status } = await network({}).put(`${api.mlpipe.root}${pipelineId}`, values);

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          console.log(data, "das");
          dispatch(updatePipelineData(data.data));
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

export const deletePipeline: AppThunk =
  ({ pipelineId }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      console.log(pipelineId);

      dispatch(setIsSubmitting(true));
      const { status } = await network({}).delete(api.mlpipe.root, {
        data: { ids: pipelineId },
      });

      if (status === 200 || status > 200) {
        dispatch(removePipelineData({ id: pipelineId }));
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
