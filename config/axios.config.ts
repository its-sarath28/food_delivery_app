import { BASE_URL } from "@/constants/links";
import { useAuthStore } from "@/store/auth.store";
import type { InternalAxiosRequestConfig } from "axios";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { router } from "expo-router";

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: AxiosResponse<any>) => void;
  reject: (error?: any) => void;
  originalRequest: AxiosRequestConfig & { _retry?: boolean };
}> = [];

const processQueue = async (error: any, token: string | null = null) => {
  for (const prom of failedQueue) {
    const { resolve, reject, originalRequest } = prom;

    if (token) {
      try {
        originalRequest._retry = true;
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${token}`,
        };
        const response = await apiClient(originalRequest);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    } else {
      reject(error);
    }
  }
  failedQueue = [];
};

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { token } = useAuthStore.getState();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (err: AxiosError) => Promise.reject(err)
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    const { refreshToken, setRefreshToken, setToken } = useAuthStore.getState();

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      refreshToken
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve,
            reject,
            originalRequest,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {
          refreshToken,
        });

        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;

        setToken(newAccessToken);
        if (newRefreshToken) {
          setRefreshToken(newRefreshToken);
        }

        processQueue(null, newAccessToken);
        isRefreshing = false;

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };

        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;
        router.replace("/(auth)/sign-in");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
