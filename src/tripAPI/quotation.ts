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

interface postQuotationPayload {
  trip_id: string;
  transport: {
    type: string;
  };
  stay: {
    type: string;
  };
  price: number;
  people: number;
  quote_source: string;
  requirement: string;
}

export const postQuotation = async (payload: postQuotationPayload) => {
  try {
    const response = await tripAPI.post("quotations", payload);
    const { data } = response ?? {};
    return data;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};
