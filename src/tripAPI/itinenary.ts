import {
  CreateItinenaryAPIResponse,
  ItinenaryAPIResponse,
  ItineraryType,
} from "@/types/APIResponse/Itinenary";

import { ItenaryPayload } from "@/types/itenary/Itenary";
import { tripAPI } from "@/utils/fetch/fetch";

export const getItinenaries = async (params?: {
  location?: string;
  page?: number;
  limit?: number;
}) => {
  try {
    const response = await tripAPI.get<ItinenaryAPIResponse>("trip", {
      params,
    });
    const { data } = response ?? {};
    return data;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};

export const getItinenaryById = async (body: { id: string }) => {
  try {
    const { id } = body ?? {};
    const response = await tripAPI.get<{ data: ItineraryType }>(
      `trip/itinerary/${id}`
    );
    const { data } = response ?? {};
    return data;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};

export const createItinenary = async (body: ItenaryPayload) => {
  try {
    const response = await tripAPI.post<CreateItinenaryAPIResponse>(
      "trip/generate",
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
