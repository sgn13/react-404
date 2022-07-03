import axios, { AxiosInstance } from "axios";
import env from "constants/env";

export const network = ({ requireToken = true, accessToken = "" }): AxiosInstance => {
  const axiosConfig = {
    // eslint-disable-next-line no-unsafe-optional-chaining
    baseURL: env?.api?.url + env?.api?.prefix || "http://localhost:8080",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Accept-Language": "en",
    },
  };

  if (requireToken) {
    axiosConfig.headers.Authorization = accessToken
      ? `Bearer ${accessToken}`
      : `Bearer ${sessionStorage.getItem("accessToken")}`;
  }

  const clientRequest = axios.create(axiosConfig);

  return clientRequest;
};

export default network;
