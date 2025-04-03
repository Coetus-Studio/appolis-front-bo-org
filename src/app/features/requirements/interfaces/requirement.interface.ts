export interface GeoPoint {
  type: string;
  coordinates: string;
}

export interface Location {
  gm_formatted_address: string;
  description: string | null;
  is_public: boolean;
  geo_point: GeoPoint;
}

export interface Requirements {
  _id: string;
  title: string;
  description: string;
  created_at: Date;
  // updated_at: Date; // dejar este campo en todos los update
  status: string;
  assigned: string;
  images: string[];
  location: Location;
  created_by: string;
  supporters: string[];
  requirement_type: string;
  messages: string[];
}
