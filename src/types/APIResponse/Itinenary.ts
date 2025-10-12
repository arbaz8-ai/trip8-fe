import { TripInfo } from "../itenary/Itenary";

interface Activity {
  time: string;
  title: string;
  location: string;
  description: string;
  duration: string;
  tags: string[];
  distance_from_previous: string;
}

interface Day {
  day: number;
  total_distance_covered: string;
  date: string;
  activities: Activity[];
}

export interface ItineraryType {
  location: string;
  estimated_trip_cost: string;
  days: Day[];
  _id: string;
}

export interface Itinenary {
  _id: string;
  starting: string;
  destination: string;
  days: number;
  nights: number;
  trip_info: TripInfo;
  itineraries: ItineraryType;
  created_at: string;
  modified_at: string;
}

export interface ItinenaryAPIResponse {
  data: Itinenary[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export type CreateItinenaryAPIResponse = ItineraryType;
