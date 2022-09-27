import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  singInService,
  User,
  validateTokenService
} from "../services/auth.service";
import { getItem, setItem } from "../utils/asyncStorage";

export interface AuthContextProps {
  children: ReactNode;
}

export interface AuthContextData {
  singed: boolean;
  user: object | null;
  singIn(credentials: LoginRequest): Promise<void>;
  singOut(): void;
  loading: boolean;
}

export interface LoginRequest {
  email: string;
  password: String;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider = ({ children }: AuthContextProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<object | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const validateToken = async () => {
      const token: string = String(await getItem("@token"));

      await validateTokenService(token)
        .then(async ({ data }) => {
          if (data.status) {
            const user: User = JSON.parse(String(await getItem("@user")));
            navigate("/dashboard/transaction");
            setUser(user);
          }
        })
        .catch(() => {
          setUser(null);
        });

      setLoading(true);
    };

    validateToken();
  }, [setUser]);

  const singIn = async (credentials: LoginRequest) => {
    const { user, token } = (await singInService(credentials)).data;

    await setItem("@user", JSON.stringify(user));
    await setItem("@token", token);

    setUser(user);
  };

  const singOut = async () => {
    await setItem("@user", "");
    await setItem("@token", "");

    setLoading(true);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        singed: Boolean(user),
        user,
        singIn,
        singOut,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
