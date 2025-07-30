import * as Keychain from "react-native-keychain";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const secureStorage = {
  setItem: async (key: string, value: string) => {
    await Keychain.setGenericPassword(key, value, { service: key });
  },
  getItem: async (key: string) => {
    const credentials = await Keychain.getGenericPassword({ service: key });
    return credentials && credentials.username === key
      ? credentials.password
      : null;
  },
  removeItem: async (key: string) => {
    await Keychain.resetGenericPassword({ service: key });
  },
};

interface AuthStore {
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  user: any | null;

  setToken: (token: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUser: (user: any) => void;

  clearStorage: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,

      setToken: async (token) => {
        set({ token });
        await secureStorage.setItem("token", token);
      },
      setRefreshToken: async (refreshToken) => {
        set({ refreshToken });
        await secureStorage.setItem("refreshToken", refreshToken);
      },
      setIsAuthenticated: async (isAuthenticated) => {
        set({ isAuthenticated });
        await secureStorage.setItem(
          "isAuthenticated",
          isAuthenticated.toString()
        );
      },
      setUser: async (user) => {
        set({ user });
      },

      clearStorage: async () => {
        set({
          token: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
        });
        await secureStorage.removeItem("token");
        await secureStorage.removeItem("refreshToken");
        await secureStorage.removeItem("isAuthenticated");
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => secureStorage),
    }
  )
);
