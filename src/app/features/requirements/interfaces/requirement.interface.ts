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
  key: string;
  url: string;
}

export interface Messages {
  _id: string;
  user: string;
  message: string;
  createdAt: Date;
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
  // updated_at: Date; // dejar este campo en todos los update
  assigned: string;
  createdAt: Date;
  created_by: CreatedBy;
  description: string;
  images: Images[];
  location: Location;
  messages: Messages[];
  title: string;
  status: string;
  supporters: string[];
  requirement_type: RequirementType;
}
