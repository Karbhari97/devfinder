import type { AxiosError, AxiosRequestConfig } from "axios";
import { endpoints } from "./utils/constants";
import axios from "axios";

interface LoginPayload {
  emailId?: string;
  password?: string;
}

export const loginApi = async (payload: LoginPayload) => {
  const config: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_API_URL,
    url: `${endpoints.login}`,
    method: "POST",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      emailId: payload?.emailId,
      password: payload?.password,
    },
  };

  try {
    const response = await axios(config);
    return response?.data;
  } catch (error:any) {
    console.log(error)
  }
};

export const fetchUserApi = async () => {
  const config: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_API_URL,
    url: endpoints.profileView,
    withCredentials: true,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios(config);
    return response?.data;
  } catch (error: any) {
    console.log(error?.response);
  }
};

export const logoutApi = async () => {
  const config: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_API_URL,
    url: endpoints.logout,
    method: "POST",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
    data: {},
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    console.log(error)
  }
};
