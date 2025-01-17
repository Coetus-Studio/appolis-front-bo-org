export interface GeoPoint {
  type: string;
  coordinates: string;
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
