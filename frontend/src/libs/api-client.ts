import axios, { AxiosError } from "axios";

export const apiClient = axios.create({
  baseURL: "https://shopvysta.onrender.com/api/v1/products",
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
