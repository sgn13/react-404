import { SET_IS_LOADING, SET_REGISTRATIONS_DATA } from './action-types';

export interface RegistrationState {
  isLoading: boolean;

  registrations: any;
}

export type SetIsLoadingType = {
  type: typeof SET_IS_LOADING;
  payload: boolean;
};

export type SetRegistrationsDataType = {
  type: typeof SET_REGISTRATIONS_DATA;
  payload: any;
};

export type RegistrationActionTypes = SetIsLoadingType | SetRegistrationsDataType;
