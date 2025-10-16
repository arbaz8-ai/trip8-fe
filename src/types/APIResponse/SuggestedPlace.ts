export interface APIPlaceResponse {
  places: {
    name: string;
    category: string[];
  }[];
}
