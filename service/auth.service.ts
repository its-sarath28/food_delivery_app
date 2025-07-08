import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { BASE_URL } from "@/constants/links";

export const useSignUp = (options: {
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
}) => {
  return useMutation({
    mutationFn: async (data: {
      fullName: string;
      email: string;
      password: string;
    }) => {
      const response = await axios.post(`${BASE_URL}/auth/register`, data);

      if (response.status !== 201) {
        throw new Error("Something went wrong, Please try again later");
      }

      return response.data;
    },
    onSuccess: options.onSuccess,
    onError: options.onError,
  });
};

export const useSignIn = (options: {
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
}) => {
  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await axios.post(`${BASE_URL}/auth/login`, data);

      if (response.status !== 201) {
        throw new Error("Something went wrong, Please try again later");
      }

      return response.data;
    },
    onSuccess: options.onSuccess,
    onError: options.onError,
  });
};
