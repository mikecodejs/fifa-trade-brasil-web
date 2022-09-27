import { LoginRequest } from "../context/Auth";
import { Api } from "./axios";

export interface User {
  id: string;
  name: string;
  email: string;
  status: boolean;
  acceptTermsAndConditions: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  message: string;
  user: User;
  token: string;
}

export const singInService = async (credentials: LoginRequest) => {
  return await Api.post<LoginResponse>("/v1/user/login", credentials, {
    headers: { "Content-Type": "application/json" },
  });
};

export const validateTokenService = async (token: string) => {
  return await Api.get<{ status: boolean }>(`/v1/validate-token/${token}`, {
    headers: { "Content-Type": "application/json" },
  });
};
