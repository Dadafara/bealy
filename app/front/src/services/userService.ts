import { User } from "@/types/User";
import { fetchApi } from "../lib/fetchApi";
import Cookies from 'cookies-js';

export const userService = {
  getUserInfo: async () => {
    try {
      const token = Cookies.get('auth_token');

      if (!token) {
        console.error("Utilisateur non authentifié, token manquant !");
        return;
      }
      
      return await fetchApi("/user/info");
    } catch (error) {
      throw error;
    }
  },

  updateUserInfo: async (userData: Partial<User>) => {
    try {
      const response = await fetchApi("/user/updateinfo", {
        method: "PUT",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      return response;
    } catch (error) {
      throw error;
    }
  },
};
