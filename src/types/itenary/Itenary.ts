export enum PreferredPriceType {
  BALANCED = "BALANCED",
  RELAXED = "RELAXED",
  PACKED = "PACKED",
}
export enum TripType {
  ADVENTURE = "ADVENTURE",
  LEISURE = "LEISURE",
  FAMILY = "FAMILY",
  HOMEYMOON = "HOMEYMOON",
  OFFBEAT = "OFFBEAT",
  LUXURY = "LUXURY",
}

export type PlacesType = {
  id: string;
  name: string;
  cover: string;
};

export interface TripInfo {
  trip_goals: string;
  itenary_type: string;
  trip_types: TripType[];
  preference: string;
  preferred_price: PreferredPriceType;
  age_group: string;
  has_kids: boolean;
  place_preference: string;
  place_comment: string;
  additional_activity: string;
  food_preference: "LOCAL_CUISINES" | "VEG" | "NON_VEG" | "PURE_VEG";
  food_budget: "MID_RANGE" | "BUDGET" | "FINE_DINING";
  food_comment: string;
  places: PlacesType[];
}

export interface ItenaryPayload {
  starting: string;
  destination: string;
  days: number;
  nights: number;
  trip_info: TripInfo;
  price: number;
  status: "ACTIVE" | "INACTIVE";
  tags: { name: string; icon: any }[];
}
