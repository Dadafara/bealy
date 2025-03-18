import { fetchApi } from "@/lib/fetchApi";
import Cookies from "cookies-js";

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

const TOKEN = process.env.NEXT_PUBLIC_TOKEN_COOKIE || "auth_token";

export const logout = () => {
  try {
    Cookies.expire(TOKEN);
    window.location.href = "/account/login";
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error);
  }
};

export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return Cookies.get(TOKEN);
  }
  return null;
};

export const isAuthenticated = (): boolean => {
  if (typeof window !== "undefined") {
    return Cookies.get(TOKEN) !== undefined;
  }
  return false;
};

export const registerUser = async (userData: {
  username: string;
  password: string;
}) => {
  try {
    const response = await fetchApi('/auth/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    return response;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const login = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  try {
    const response = await fetchApi("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (response.token) {
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      Cookies.set(TOKEN, response.token, { expires: expiryDate });
    }

    return response;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const verifyToken = async() => {
  try {
    const res = await fetchApi('/auth/verify');

    return res;
  } catch (error) {
    console.error("Erreur d'authentification :", error);
    throw error;
  }
}