import { User } from "@/types/APIResponse/User";
import { tripAPI } from "@/utils/fetch/fetch";

export const getUser = async () => {
  try {
    const response = await tripAPI.get<User>("users");
    const { data } = response ?? {};
    return data;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};

export const updateUser = async (body: {
  name: string;
  mobile: string;
  email: string;
}) => {
  try {
    const response = await tripAPI.put<User>("users", { ...body });
    const { data } = response ?? {};
    return data;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};
