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
  } catch (error: any) {
    console.log(error);
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
    console.log(error);
  }
};

export const fetchFeedApi = async () => {
  let config: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_API_URL,
    url: endpoints.feed,
    method: "GET",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

interface updateProfileData {
  firstName?: string;
  lastName?: string;
  age?: number;
  about?: string;
  gender?: string;
}

export const updateProfileApi = async (payload: updateProfileData) => {
  const config: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_API_URL,
    url: endpoints.profileEdit,
    method: "PATCH",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      firstName: payload?.firstName,
      lastName: payload?.lastName,
      age: Number(payload?.age),
      about: payload?.about,
      gender: payload?.gender,
    },
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
