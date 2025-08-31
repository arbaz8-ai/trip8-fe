export const services = ["trip8"] as const;
export type ApiService = (typeof services)[number];
