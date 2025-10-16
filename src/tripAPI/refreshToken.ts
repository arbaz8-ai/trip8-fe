import { tripAPI } from "@/utils/fetch/fetch";

export const refreshToken = async () => {
  try {
    const rt = localStorage.getItem("refreshToken");
    const response = await tripAPI.post<{ token: string }>("auth/refresh", {
      refresh_token: rt,
    });
    const { data } = response ?? {};
    const { token } = data ?? {};
    localStorage.setItem("token", token);
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};
