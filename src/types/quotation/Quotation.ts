export interface Quotation {
  _id: string;
  trip_id: string;
  car: {
    make: string;
    model: string;
    year: number;
    capacity: 7;
    features: string[];
    price: number;
  };
  stay: {
    hotel_name: string;
    location: string;
    check_in: string;
    check_out: string;
    room_type: string;
    price: number;
  };
  price: number;
  expires_at: Date;
  is_deleted: boolean;
  creator: string;
  user_id: string;
  status: string;
  created_at: Date;
  modified_at: Date;
  user: {
    _id: string;
    name: string;
    mobile_verified: boolean;
    email_verified: boolean;
    is_verified: boolean;
    role: string;
    status: string;
    is_deleted: boolean;
    deleted_at: Date;
    created_at: Date;
    modified_at: Date;
    picture: string | null;
    creator: string | null;
    source: string;
    mobile: string;
    email: string;
  };
}
