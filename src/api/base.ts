import axios, { InternalAxiosRequestConfig } from "axios";
type IMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";

import { useToken } from "@/src/providers/AuthProvider";

interface iResponse {
  status: boolean;
  message: string;
  data?: any;
}

export const useAxios = () => {
  const baseURL = "https://servexi.onrender.com/api";
  const api = axios.create({
    baseURL,
  });

  const { getToken } = useToken();

  const errorHandler = (error: any) => {
    const statusCode = error.response?.status;
    if (statusCode && statusCode !== 401) {
      // console.error(error)
    } else {
      // clear customer login
    }
    return Promise.reject(error);
  };

  api.interceptors.response.use(undefined, (error) => {
    return errorHandler(error);
  });

  api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const token = getToken();
      if (token) {
        config.headers["authorization"] = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return errorHandler(error);
    }
  );

  const requestApi = async (
    path: string,
    method: IMethod,
    body?: object,
    headers?: object
  ): Promise<iResponse> => {
    try {
      const apiData = await api.request({
        url: path,
        method: method,
        data: body,
        headers,
      });
      return {
        status: true,
        data: apiData.data,
        message: apiData.data.message,
      };
    } catch (e) {
      return { status: false, data: e, message: "" };
    }
  };

  return { requestApi };
};
