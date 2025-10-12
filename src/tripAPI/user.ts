import { User } from "@/types/APIResponse/User";
import { tripAPI } from "@/utils/fetch/fetch";

export const getProfile = async () => {
  try {
    const response = await tripAPI.get<User>("users");
    const { data } = response ?? {};
    return data;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};
