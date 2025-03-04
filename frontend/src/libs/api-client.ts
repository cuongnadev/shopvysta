import axios from "axios";

export const apiClient = axios.create({
  baseURL: "example",
  withCredentials: true,
});
