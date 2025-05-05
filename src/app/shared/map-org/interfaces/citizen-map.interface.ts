import { Organization } from "../../../features/organizations/interfaces/organization.interface";

export interface GeoPoint {
  type: "Point";
  coordinates: [
    number,
    number
  ];
}

export interface Location {
  gm_formatted_address: string;
  description: string;
  is_public: boolean;
  geo_point: GeoPoint;
}

export interface CitizenMap {
  _id: string;
  name: string;
  location: Location;
  icon_url: string;
  responsible_organization: string;
}
