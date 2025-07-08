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

function getAccessToken(): string | null {
  const { token } = useAuthStore.getState();
  return token;
}

function getRefreshToken(): string | null {
  const { refreshToken } = useAuthStore.getState();
  return refreshToken;
}

function setAccessToken(token: string) {
  const { setToken } = useAuthStore.getState();
  setToken(token);
}

function setRefreshToken(refreshToken: string) {
  const { setRefreshToken } = useAuthStore.getState();
  setRefreshToken(refreshToken);
}

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      getRefreshToken()
    ) {
      originalRequest._retry = true;

      try {
        // Call your refresh endpoint
        const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {
          refreshToken: getRefreshToken(),
        });

        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;
        setAccessToken(newAccessToken);
        if (newRefreshToken) {
          setRefreshToken(newRefreshToken);
        }

        // Retry original request with new token
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };

        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        router.replace("/(auth)/sign-in");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
