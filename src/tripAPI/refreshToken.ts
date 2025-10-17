import { tripAPI } from "@/utils/fetch/fetch";

export const refreshAccessToken = async () => {
  try {
    const refresh_token = localStorage.getItem("refreshToken");
    if (!refresh_token) {
      throw new Error("No Refresh Token");
    }
    const response = await tripAPI.post<{
      access_token: string;
      refresh_token: string;
    }>("auth/refresh", {
      refresh_token,
    });
    const { data } = response ?? {};
    return data;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};
