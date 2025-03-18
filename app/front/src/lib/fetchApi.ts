import Cookies from 'cookies-js';
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  const token = Cookies.get("auth_token");

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error: ${response.status}`);
  }

  return response.json();
};
