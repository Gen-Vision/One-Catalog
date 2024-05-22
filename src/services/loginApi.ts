import axios, { AxiosInstance } from "axios";
import {  toast } from 'react-toastify';
interface ApiResponse<T> {
  data: T;
}

interface ErrorApiResponse {
  status: number;
}

interface LoginPayload {
  username: string;
  password: string;
}

// Declare localStorage interface if not provided by the environment
declare global {
  interface Window {
    localStorage: Storage;
  }
}

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:3002",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("user-token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("user-token");
      toast.error('401 UnAuthorized');
    }
    return Promise.reject(error);
  }
);

export const userApi = {
  register: (payload: LoginPayload, onSuccess: Function,onError :Function) => {
    api.post<ApiResponse<any>>("/user/register", payload).then((resp) => onSuccess && onSuccess(resp.data)).catch(err => onError && onError(err.response?.data));
  },
  login: (payload: LoginPayload, onSuccess: Function ,onError :Function) => {
    api.post<ApiResponse<any>>("/user/login", payload).then((resp) => onSuccess && onSuccess(resp.data)).catch(err => onError && onError(err.response?.data));
  },
  refreshLogin :(onSuccess: Function,onError :Function) => {
    api.get<ApiResponse<any>>("/user/refreshLogin").then((resp) => onSuccess && onSuccess(resp.data)).catch(err => onError && onError(err.response?.data));
  },
};
