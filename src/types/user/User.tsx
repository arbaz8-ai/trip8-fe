export interface User {
  _id: string;
  name: string;
  mobile_verified: boolean;
  email_verified: boolean;
  is_verified: boolean;
  role: "USER" | "VENDOR";
  status: "ACTIVE" | "INACTIVE";
  is_deleted: boolean;
  deleted_at: string | null;
  created_at: Date;
  modified_at: Date;
  picture: string | null;
  creator: string | null;
  source: string;
  mobile: string;
  email: string;
}
