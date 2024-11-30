export interface GeoPoint {
  type: string;
  coordinates: string;
}

export interface Location {
  address: string;
  description: string;
  category: string;
  is_public: string;
  city_code: string;
  geo_point: GeoPoint;
}

export interface EventForm {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  responsible_organization: string;
  messages: string[];
  event_type: string;
  assistents: string;
  created_by: string;
  location: Location;
  images: string[];
  status: string;
  created_at: string;
}
