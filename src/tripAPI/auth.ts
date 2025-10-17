import { LoginResult } from "@/types/APIResponse/Login";
import { tripAPI } from "@/utils/fetch/fetch";

export const postSignin = async (body: {
  mobile_email: string;
  otp: string;
}) => {
  try {
    const response = await tripAPI.post<LoginResult>("auth/otp/login", {
      ...body,
    });
    const { data } = response ?? {};
    return data;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};

export const getOTP = async (body: {
  name?: string;
  mobile_email: string;
  source?: string;
  role?: string;
}) => {
  try {
    const response = await tripAPI.post<{
      message: string;
      sent: string;
      otp: string;
    }>("auth/otp/send", {
      ...body,
    });
    const { data } = response ?? {};
    return data;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};

export const postSignup = async (body: {
  name: string;
  mobile_email: string;
  source: string;
  otp: string;
}) => {
  try {
    const response = await tripAPI.post<LoginResult>("auth/otp/login", {
      ...body,
    });
    const { data } = response ?? {};
    return data;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};
