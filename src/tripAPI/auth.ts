import { LoginResult } from "@/types/results/Login";
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

export const getOTP = async (body: { mobile_email: string }) => {
  try {
    const response = await tripAPI.post<any>("auth/otp/send", {
      ...body,
    });
    const { data } = response ?? {};
    return data;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};

export const getPosts = async () => {
  try {
    const response = await tripAPI.get<any>("posts");
    const { data } = response ?? {};
    return data;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};
