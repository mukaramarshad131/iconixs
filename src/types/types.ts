export interface UserInfo {
    id: string;
    email: string;
    first_name?: string;
    last_name?: string;
    phoneNumber?: string;
    username: string;
    password?: string;
    avatar?: string;
    status?: boolean;
    location?:any;
    zip?: string;
    state?: string;
    country?: string;
    line1?: string;
    line2?: string;
    permissions?: string[];
  }
  export interface UserToken {
    accessToken?: string;
    refreshToken?: string;
  }

  export interface DataType {
    key?: string;
    id?: string;
    contact_type?: string;
    date?: string;
    location?: string;
    attendees?: any[];
    provider?: {
      full_name: string;
    };
    category?: string;
    price?: string;
    status?: string;
  }

  export type FieldType = {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone_number?: string;
    gender?: string;
    height?: string;
    dob?: string;
    metric_stat?: string;
    city: string;
    zip?: string;
    state?: string;
    country?: string;
    line1?: string;
  };