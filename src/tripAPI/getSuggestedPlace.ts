import { APIPlaceResponse } from "@/types/APIResponse/SuggestedPlace";
import { ItenaryPayload } from "@/types/itenary/Itenary";
import { tripAPI } from "@/utils/fetch/fetch";

export const getSuggestedPlace = async (
  body: Pick<
    ItenaryPayload,
    "starting" | "destination" | "days" | "nights" | "trip_info"
  >
) => {
  try {
    const response = await tripAPI.post<APIPlaceResponse>(
      "trip/suggested-places",
      {
        ...body,
      }
    );
    const { data } = response ?? {};
    return data;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};
