import { LoginResult } from "@/types/APIResponse/Login";
import { jwtDecode } from "jwt-decode";

export const isTokenExpired = () => {
  const token = localStorage.getItem("token");
  console.log({ apiServiceToken: token });
  if (!token) {
    return undefined;
  }
  try {
    const { exp } = jwtDecode(token);
    if (!exp) {
      return true;
    }
    return Date.now() >= exp * 1000;
  } catch (error) {
    console.log(error);
  }
};

export const getNewTokenByRefreshToken = async () => {
  try {
    const rt = localStorage.getItem("refreshToken");
    if (!rt) {
      throw new Error("Refresh token not found");
    }

    const baseURL = `${process.env.NEXT_PUBLIC_API_PROTOCOL}://${process.env.NEXT_PUBLIC_API_HOST}`;
    const response = await fetch(`${baseURL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: rt }),
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const data = (await response.json()) as LoginResult;
    return data;
  } catch (error) {
    console.error("Token refresh failed:", error);

    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    window.location.href = "/authentication/login";

    throw error;
  }
};
