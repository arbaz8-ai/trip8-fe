export interface IVerificationToken extends Document {
  platform_id: Types.ObjectId;
  user_id?: Types.ObjectId;
  verification_type: VerificationType;
  token: string;
  code?: string;
  link?: string;
  verify_attempts?: number;
  resend_attempts?: number;
  expires_at: Date;
  status: TokenStatusType;
  created_at: Date;
  modified_at: Date;
}

export const VerificationTokenSchema: Schema = new Schema(
  {
    platform_id: { type: Schema.Types.ObjectId, required: true, index: true },
    user_id: { type: Schema.Types.ObjectId, default: null, index: true },
    verification_type: { type: String, enum: Object.values(VerificationType), required: true },
    token: { type: String, maxlength: 128, required: true },
    code: { type: String, maxlength: 6, default: "0" },
    link: { type: String, maxlength: 255, default: null, index: true },
    verify_attempts: { type: Number, default: 0 },
    resend_attempts: { type: Number, default: 0 },
    expires_at: { type: Date, required: true },
    status: { type: String, enum: Object.values(TokenStatusType), required: true },
  },
  { timestamps: true }
);

export interface IVerification extends Document {
  mobile_email: string;
  tokens: Types.DocumentArray<IVerificationToken>;
  status: TokenStatusType;
  created_at: Date;
  modified_at: Date;
}

const VerificationSchema: Schema = new Schema(
  {
    mobile_email: { type: String, maxlength: 100, required: true, unique: true, index: true },
    tokens: { type: [VerificationTokenSchema], default: [] },
    status: { type: String, enum: Object.values(TokenStatusType), required: true },
  },
  { collection: "verification", timestamps: true }
);

export interface IUser extends Document {
  creator?: Types.ObjectId;
  name: string;
  mobile: string;
  mobile_verified: boolean;
  email: string;
  email_verified: boolean;
  google_id?: string;
  is_verified: boolean;
  picture?: string;
  role: UserRole;
  status: StatusType;
  is_deleted: boolean;
  deleted_at?: Date;
  created_at: Date;
  modified_at: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    creator: { type: Schema.Types.ObjectId, default: null },
    name: { type: String, required: true, unique: true, maxlength: 50, index: true },
    mobile: { type: String, required: true, unique: true, maxlength: 10, index: true },
    mobile_verified: { type: Boolean, default: false },
    email: { type: String, required: true, unique: true, maxlength: 100, index: true },
    email_verified: { type: Boolean, default: false },
    google_id: { type: String, maxlength: 255, default: null },
    is_verified: { type: Boolean, default: false },
    picture: { type: String, maxlength: 255 },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.USER },
    status: { type: String, enum: Object.values(StatusType), default: StatusType.ACTIVE },
    is_deleted: { type: Boolean, default: false },
    deleted_at: { type: Date, default: null },
  },
  { timestamps: true }
);

export interface IAuthRefreshToken extends Document {
  user_id: Types.ObjectId;
  platform_id: Types.ObjectId;
  refresh_token: string;
  expires_at: Date;
  device_id?: string;
  ip_address?: string;
  provider: ProviderType;
  status: TokenStatusType;
  created_at: Date;
  modified_at: Date;
}

const AuthRefreshTokenSchema: Schema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, required: true, index: true },
    platform_id: { type: Schema.Types.ObjectId, required: true, index: true },
    refresh_token: { type: String, maxlength: 128, required: true },
    expires_at: { type: Date, required: true },
    device_id: { type: String, maxlength: 128 },
    ip_address: { type: String, maxlength: 40 },
    provider: { type: String, enum: Object.values(ProviderType), required: true },
    status: { type: String, enum: Object.values(TokenStatusType), required: true },
  },
  { collection: "auth_refresh_tokens", timestamps: true }
);


export interface IAuthPlatform extends Document {
  name: string;
  app_id?: string;
  app_secret?: string;
  identifier?: string;
  platform: PlatformType;
  status: StatusType;
  is_deleted: boolean;
  deleted_at?: Date;
  created_at: Date;
  modified_at: Date;
}

const AuthPlatformSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true, maxlength: 50, index: true },
    app_id: { type: String, maxlength: 80 },
    app_secret: { type: String, maxlength: 128 },
    identifier: { type: String, maxlength: 100 },
    platform: { type: String, enum: Object.values(PlatformType), required: true },
    status: { type: String, enum: Object.values(StatusType), required: true },
    is_deleted: { type: Boolean, default: false },
    deleted_at: { type: Date, default: null },
  },
  { collection: "auth_platforms", timestamps: true }
);


export interface IAuthAccessToken extends Document {
  user_id: Types.ObjectId;
  refresh_id: Types.ObjectId;
  access_token: string;
  device_id?: string;
  device_token?: string;
  expires_at: Date;
  ip_address?: string;
  provider: ProviderType;
  status: TokenStatusType;
  created_at: Date;
  modified_at: Date;
}

const AuthAccessTokenSchema: Schema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, required: true, index: true },
    refresh_id: { type: Schema.Types.ObjectId, required: true, index: true },
    access_token: { type: String, maxlength: 128, required: true },
    device_id: { type: String, maxlength: 128 },
    device_token: { type: String, maxlength: 250 },
    expires_at: { type: Date, required: true },
    ip_address: { type: String, maxlength: 40 },
    provider: { type: String, enum: Object.values(ProviderType), required: true },
    status: { type: String, enum: Object.values(TokenStatusType), required: true },
  },
  { collection: "auth_access_tokens", timestamps: true }
);