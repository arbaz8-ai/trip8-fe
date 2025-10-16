import { Trip, TripAPIResponse } from "@/types/APIResponse/Itinenary";

import { tripAPI } from "@/utils/fetch/fetch";

export const getCreatedTrips = async (params?: {
  page?: number;
  limit?: number;
}) => {
  try {
    const response = await tripAPI.get<TripAPIResponse>("trip/created", {
      params,
    });
    const { data } = response ?? {};
    return data;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};

export const getSavedTrips = async (params?: {
  page?: number;
  limit?: number;
}) => {
  try {
    const response = await tripAPI.get<TripAPIResponse>("trip/wishlist", {
      params,
    });
    const { data } = response ?? {};
    return data;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};

export const getTripById = async (params: { id: string }) => {
  try {
    const { id } = params ?? {};
    const response = await tripAPI.get<Trip>(`trip/${id}`);
    const { data } = response ?? {};
    return data;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};

export const saveTripToWishlist = async (payload: { id: string }) => {
  try {
    const { id } = payload ?? {};
    const response = await tripAPI.post<{
      success: true;
    }>(`trip/${id}/wishlist`);
    const { data } = response ?? {};
    return data;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};
