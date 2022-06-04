import axios, { AxiosError, AxiosInstance } from 'axios';
import { configuration } from 'configuration';
import {
  logout,
  setDownloadingInfo,
  setIsLoading,
  setIsPermissionLoading,
  setNotification,
  setUploadingInfo,
} from 'store/app/actions';

import { api } from 'constants/url';

export const network = ({
  dispatch,
  requireToken = true,
  accessToken = '',
  sso = false,
  onUploadProgress = undefined,
}): AxiosInstance => {
  const axiosConfig = {
    baseURL: !sso ? configuration.api.url : configuration.sso.url || 'http://localhost:3001/api/v1',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Accept-Language': 'en',
    },
    onUploadProgress,
  };

  if (requireToken) {
    axiosConfig.headers.Authorization = accessToken
      ? `Bearer ${accessToken}`
      : `Bearer ${sessionStorage.getItem('accessToken')}`;
  }

  const clientRequest = axios.create(axiosConfig);

  clientRequest.interceptors.request.use(
    (conf) => conf,
    (error: AxiosError) => Promise.reject(error),
  );

  clientRequest.interceptors.response.use(
    (conf) => {
      if (conf.status) {
        let action = '';
        switch (conf.config.method) {
          case 'post':
            action = 'Created';
            break;
          case 'put':
            action = 'Updated';
            break;
          case 'patch':
            action = 'Updated';
            break;
          case 'delete':
            action = 'Deleted';
            break;
        }

        action &&
          dispatch(
            setNotification({
              name: 'Action',
              message: `Successfully ${action}`,
              level: 'success',
            }),
          );
      }
      return conf;
    },
    (error: AxiosError) => {
      dispatch(setIsLoading(false));
      dispatch(setIsPermissionLoading(false));
      dispatch(setDownloadingInfo({ count: 0, progress: 0 }));
      dispatch(setUploadingInfo({ count: 0, progress: 0 }));
      if (error.message === 'timeout of 15000ms exceeded') {
        // if (error) {
        dispatch(
          setNotification({
            name: 'Network',
            message: 'Network Timeout Reached',
            level: 'error',
          }),
        );

        localStorage.setItem('timeoutRedirect', window.location.href);
        window.location.href = '/504';
      }

      if (error.response && error.response.status === 401) {
        localStorage.setItem('redirectTo', window.location.href);
        logout();
        // window.location.href = '/401';
        // dispatch(
        //   setNotification({
        //     name: 'Network',
        //     message: 'Unauthorized',
        //     level: 'error',
        //   }),
        // );
      }

      return Promise.reject(error);
    },
  );

  return clientRequest;
};

export const XMLRequest = ({ src, cb, accessToken = '' }) => {
  if (typeof src !== 'string') return;

  const xhr = new XMLHttpRequest();

  xhr.open('GET', src, true);
  xhr.setRequestHeader(
    'Authorization',
    accessToken ? `Bearer ${accessToken}` : `Bearer ${sessionStorage.getItem('accessToken')}`,
  );

  xhr.responseType = 'arraybuffer';

  xhr.onload = function (e) {
    if (this.status == 200) {
      cb({
        data: window.URL.createObjectURL(new Blob([this.response], { type: 'application/pdf' })),
        xhr,
      });
    } else {
      console.error('Error', xhr);
    }
  };

  xhr.send();
};

export default network;
