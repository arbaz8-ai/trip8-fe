export interface User {
  _id: string;
  name: string;
  mobile_verified: boolean;
  email_verified: boolean;
  is_verified: boolean;
  role: "USER" | "VENDOR";
  status: "ACTIVE" | "INACTIVE";
  is_deleted: false;
  deleted_at: null;
  created_at: Date;
  modified_at: Date;
  picture: null;
  creator: null;
  source: string;
  mobile: string;
  email: string;
}
