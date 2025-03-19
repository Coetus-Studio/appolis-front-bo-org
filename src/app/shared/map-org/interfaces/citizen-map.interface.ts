export interface GeoPoint {
  type: "Point";
  coordinates: [
    number,
    number
  ];
}

export interface Location {
  address: string;
  description: string;
  category: string;
  url_icon: string;
  is_public: boolean;
  city_code: string;
  geo_point: GeoPoint;
}

export interface CitizenMap {
  name: string;
  location: Location;
}
