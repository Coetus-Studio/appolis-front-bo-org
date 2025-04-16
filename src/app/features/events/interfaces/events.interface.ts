// import { Location } from '../../../shared/interfaces/locations.interface'

import { Organization } from "../../organizations/interfaces/organization.interface";

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

export interface Status {
  _id: string;
  name?: string;
}

export interface EventForm {
  _id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  responsible_organization: Organization;
  // messages: string[];
  // event_type: string;
  // assistents: string;
  created_by: string;
  location: Location;
  // images: string[];
  status?: Status;
  // created_at: string;
  is_enabled: boolean;
  sponsor?: string[]; // inicialmente lo dejo como texto libre para ingresar desde el front
}
