// src/api.ts
import axios, { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

// Declare localStorage interface if not provided by the environment
declare global {
  interface Window {
    localStorage: Storage;
  }
}

interface ApiResponse<T> {
  data: T;
}

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3002/user', // Replace with your actual backend base URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('user-token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('user-token');
      toast.error('401 UnAuthorized');
    }
    return Promise.reject(error);
  }
);

export const productApi = {
  createProduct: (productData: any, onSuccess: Function, onError: Function) => {
    api.post<ApiResponse<any>>('/createProduct', productData)
      .then((resp) => onSuccess && onSuccess(resp.data))
      .catch((err) => onError && onError(err.response?.data));
  },
  updateProduct: (productId: string, productData: any, onSuccess: Function, onError: Function) => {
    api.put<ApiResponse<any>>(`/updateProduct/${productId}`, productData)
      .then((resp) => onSuccess && onSuccess(resp.data))
      .catch((err) => onError && onError(err.response?.data));
  },
  getProduct: (productId: string, onSuccess: Function, onError: Function) => {
    api.get<ApiResponse<any>>(`/getProduct/${productId}`)
      .then((resp) => onSuccess && onSuccess(resp.data))
      .catch((err) => onError && onError(err.response?.data));
  },
  getProducts: (onSuccess: Function, onError: Function) => {
    api.get<ApiResponse<any>>('/getProducts')
      .then((resp) => onSuccess && onSuccess(resp.data))
      .catch((err) => onError && onError(err.response?.data));
  },
  deleteProduct: (productId: string, onSuccess: Function, onError: Function) => {
    api.delete<ApiResponse<any>>(`/deleteProduct/${productId}`)
      .then((resp) => onSuccess && onSuccess(resp.data))
      .catch((err) => onError && onError(err.response?.data));
  },
};
