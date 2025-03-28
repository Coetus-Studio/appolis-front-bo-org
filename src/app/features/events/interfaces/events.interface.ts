// import { Location } from '../../../shared/interfaces/locations.interface'

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

export interface EventForm {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  responsible_organization: string;
  // messages: string[];
  // event_type: string;
  // assistents: string;
  created_by: string;
  location: Location;
  // images: string[];
  // status: string;
  // created_at: string;
}
