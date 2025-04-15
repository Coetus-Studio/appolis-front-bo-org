export interface GeoPoint {
  type: string;
  coordinates: string[];
}

export interface Location {
  gm_formatted_address: string;
  description: string | null;
  is_public: boolean;
  geo_point: GeoPoint;
}

export interface Images {
  _id: string;
  key: string
  url: string;
}

export interface Messages {
  _id: string;
  createdAt: string;
  message: string;
  user?: {
    email?: string;
  } | string | null;
}


export interface RequirementType {
  _id: string;
  description: string;
  name: string;
}

export interface Profile {
  _id: string;
  createdAt: Date;
  phone: string;
  main_address: string;
  birth_date: Date;
  full_name: string;
}

export interface CreatedBy {
  _id: string;
  ceratedAt: Date;
  responded_consultations: string[];
  rolesByOrganization: string[];
  profile: Profile;
  password: string;
  is_active: boolean;
  is_verified: boolean;
  email: string;
}

export interface Requirements {
  _id: string;
  title: string;
  description: string;
  requirement_type: {
    _id: string;
    name: string;
    description: string;
    __v?: number;
  };
  category?: {
    _id: string;
    name: string;
  };
  supporters: string[];
  created_by: {
    _id: string;
    email: string;
    profile: {
      _id: string;
      full_name: string;
      phone?: string;
      main_address?: string;
      birth_date?: string;
    };
    createdAt: string;
  };
  location?: {
    _id: string;
    description?: string;
    gm_formatted_address: string;
    geo_point: {
      type: 'Point';
      coordinates: [number, number];
    };
    is_public?: boolean;
  };
  images?: {
    _id: string;
    key: string;
    url: string;
    createdAt?: string;
  }[];
  messages?: {
    _id: string;
    createdAt: string;
    message: string;
    user?: { email?: string } | string | null;
  }[];
  createdAt: string;
}
