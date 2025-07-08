import * as Keychain from "react-native-keychain";

export const secureStorage = {
  setItem: async (key: string, value: string) => {
    await Keychain.setGenericPassword(key, value, { service: key });
  },
  getItem: async (key: string): Promise<string | null> => {
    const credentials = await Keychain.getGenericPassword({ service: key });
    return credentials ? credentials.password : null;
  },
  removeItem: async (key: string) => {
    await Keychain.resetGenericPassword({ service: key });
  },
};
