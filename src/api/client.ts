import axios from "axios";
import { API_BASE_URL } from "constants/api";
import { STORAGE_KEYS } from "constants/storage";

const rawBase = (process.env.REACT_APP_API_URL || API_BASE_URL).replace(/\/$/, "");

export const apiRoot = `${rawBase}/api`;

let authToken: string | null = localStorage.getItem(STORAGE_KEYS.token);

export function setAuthToken(token: string | null): void {
  authToken = token;
}

export function getAuthToken(): string | null {
  return authToken || localStorage.getItem(STORAGE_KEYS.token);
}

export const api = axios.create({
  baseURL: apiRoot,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (authToken) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Token ${authToken}`;
  }
  return config;
});
