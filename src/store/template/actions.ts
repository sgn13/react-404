import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import api from "src/constants/api";

import { setErrorMessage } from "src/store/app/actions";
import { generateMeta, generateQuery } from "src/utils/store";

import { defaultQuery } from "src/constants/query";
import { network } from "src/utils/network";
import {
  TemplateState,
  CreateTemplateDataType,
  RemoveTemplateDataType,
  ResetSearchedTemplatesDataType,
  SetTemplateDataType,
  SetTemplatesDataType,
  SetTemplatesMetadataType,
  SetIsLoadingType,
  SetIsSubmittingType,
  SetSearchedTemplatesDataType,
  UpdateTemplateDataType,
} from "./types";
import {
  CREATE_TEMPLATE_DATA,
  REMOVE_TEMPLATE_DATA,
  RESET_SEARCHED_TEMPLATES_DATA,
  SET_TEMPLATES_DATA,
  SET_TEMPLATES_METADATA,
  SET_TEMPLATE_DATA,
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_SEARCHED_TEMPLATES_DATA,
  UPDATE_TEMPLATE_DATA,
} from "./action-types";

export type AppThunk = ActionCreator<
  ThunkAction<Promise<boolean>, TemplateState, null, Action<string>>
>;

export const setIsLoading = (payload: any): SetIsLoadingType => ({
  type: SET_IS_LOADING,
  payload,
});

export const setIsSubmitting = (payload: any): SetIsSubmittingType => ({
  type: SET_IS_SUBMITTING,
  payload,
});

export const setTemplateData = (payload: any): SetTemplateDataType => ({
  type: SET_TEMPLATE_DATA,
  payload,
});

export const setTemplatesData = (payload: any): SetTemplatesDataType => ({
  type: SET_TEMPLATES_DATA,
  payload,
});

export const setTemplatesMetadata = (payload: any): SetTemplatesMetadataType => ({
  type: SET_TEMPLATES_METADATA,
  payload,
});

export const setSearchedTemplatesData = (payload: any): SetSearchedTemplatesDataType => ({
  type: SET_SEARCHED_TEMPLATES_DATA,
  payload,
});

export const resetSearchedTemplatesData = (payload: any): ResetSearchedTemplatesDataType => ({
  type: RESET_SEARCHED_TEMPLATES_DATA,
  payload,
});

export const createTemplateData = (payload: any): CreateTemplateDataType => ({
  type: CREATE_TEMPLATE_DATA,
  payload,
});

export const removeTemplateData = (payload: any): RemoveTemplateDataType => ({
  type: REMOVE_TEMPLATE_DATA,
  payload,
});

export const updateTemplateData = (payload: any): UpdateTemplateDataType => ({
  type: UPDATE_TEMPLATE_DATA,
  payload,
});

export const fetchTemplate: AppThunk =
  ({ templateId }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await network({}).get(`${api.template.root}${templateId}/`);

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          dispatch(setTemplateData(data));
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

export const fetchTemplates: AppThunk =
  ({ query = defaultQuery, columns, searchable, search }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      const link = generateQuery({
        url: api.template.root,
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
          search ? dispatch(setSearchedTemplatesData(result)) : dispatch(setTemplatesData(result));
          const metadata = generateMeta({ query, data });
          dispatch(setTemplatesMetadata(metadata));
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

export const createTemplate: AppThunk =
  ({ values }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      dispatch(setIsSubmitting(true));
      const { data, status } = await network({}).post(api.template.root, [values]);
      if (status === 200 || (status > 200 && status < 300)) {
        dispatch(createTemplateData(data.data[0]));
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

export const updateTemplate: AppThunk =
  ({ templateId, values }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setIsSubmitting(true));
      const { data, status } = await network({}).put(`${api.template.root}${templateId}`, values);

      if (status === 200 || (status > 200 && status < 300)) {
        if (data) {
          console.log(data, "das");
          dispatch(updateTemplateData(data.data));
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

export const deleteTemplate: AppThunk =
  ({ templateId }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    try {
      console.log(templateId);

      dispatch(setIsSubmitting(true));
      const { status } = await network({}).delete(api.template.root, {
        data: { ids: templateId },
      });

      if (status === 200 || status > 200) {
        dispatch(removeTemplateData({ id: templateId }));
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
