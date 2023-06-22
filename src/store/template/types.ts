import {
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_TEMPLATE_DATA,
  SET_TEMPLATES_DATA,
  SET_TEMPLATES_METADATA,
  SET_SEARCHED_TEMPLATES_DATA,
  RESET_SEARCHED_TEMPLATES_DATA,
  CREATE_TEMPLATE_DATA,
  REMOVE_TEMPLATE_DATA,
  UPDATE_TEMPLATE_DATA,
} from "./action-types";

export interface TemplateState {
  isLoading: boolean;
  isSubmitting: boolean;

  template: any;
  templates: any;

  searchedTemplates: any;

  metadata: any;
}

export type SetIsLoadingType = {
  type: typeof SET_IS_LOADING;
  payload: boolean;
};

export type SetIsSubmittingType = {
  type: typeof SET_IS_SUBMITTING;
  payload: boolean;
};

export type SetTemplateDataType = {
  type: typeof SET_TEMPLATE_DATA;
  payload: any;
};

export type SetTemplatesDataType = {
  type: typeof SET_TEMPLATES_DATA;
  payload: any;
};

export type SetTemplatesMetadataType = {
  type: typeof SET_TEMPLATES_METADATA;
  payload: any;
};

export type SetSearchedTemplatesDataType = {
  type: typeof SET_SEARCHED_TEMPLATES_DATA;
  payload: any;
};

export type ResetSearchedTemplatesDataType = {
  type: typeof RESET_SEARCHED_TEMPLATES_DATA;
  payload: any;
};

export type CreateTemplateDataType = {
  type: typeof CREATE_TEMPLATE_DATA;
  payload: any;
};

export type RemoveTemplateDataType = {
  type: typeof REMOVE_TEMPLATE_DATA;
  payload: any;
};

export type UpdateTemplateDataType = {
  type: typeof UPDATE_TEMPLATE_DATA;
  payload: any;
};

export type TemplateActionTypes =
  | SetIsLoadingType
  | SetIsSubmittingType
  | SetTemplateDataType
  | SetTemplatesDataType
  | SetTemplatesMetadataType
  | SetSearchedTemplatesDataType
  | ResetSearchedTemplatesDataType
  | CreateTemplateDataType
  | RemoveTemplateDataType
  | UpdateTemplateDataType;
