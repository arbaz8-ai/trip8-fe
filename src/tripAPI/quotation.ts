import { Quotation } from "@/types/quotation/Quotation";
import { tripAPI } from "@/utils/fetch/fetch";

export const getQuotations = async () => {
  try {
    const response = await tripAPI.get<Quotation[]>("quotations");
    const { data } = response ?? {};
    return data;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};
