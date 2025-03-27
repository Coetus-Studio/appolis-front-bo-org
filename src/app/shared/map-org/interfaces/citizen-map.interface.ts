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
  name: string;
  location: Location;
}
