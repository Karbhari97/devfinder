import type { AxiosRequestConfig } from "axios";
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
    const respone = await axios(config);
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};
