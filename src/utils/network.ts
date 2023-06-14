import axios, { AxiosError, AxiosInstance } from "axios";
import env from "src/constants/env";

export const network = ({
  requireToken = true,
  accessToken = "",
  onUploadProgress = (event: any) => {},
  onDownloadProgress = (event: any) => {},
  responseType = undefined,
}): AxiosInstance => {
  const axiosConfig = {
    // eslint-disable-next-line no-unsafe-optional-chaining
    baseURL: env?.api?.url + env?.api?.prefix || "http://localhost:8080",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Accept-Language": "en",
      // "Content-Disposition": "attachment;",
    },
    responseType,
    onUploadProgress,
    onDownloadProgress,
    // forcing axios to use custom agent customized to ignore SSL Certificate verification
    // httpsAgent: new https.Agent({
    //   rejectUnauthorized: false,
    // }),
  };

  if (requireToken) {
    axiosConfig.headers.Authorization = accessToken
      ? `Bearer ${accessToken}`
      : `Bearer ${sessionStorage.getItem("accessToken")}`;
  }

  const clientRequest = axios.create(axiosConfig);

  clientRequest.interceptors.request.use(
    (conf) => conf,
    (error: AxiosError) => Promise.reject(error),
  );

  return clientRequest;
};

export default network;
