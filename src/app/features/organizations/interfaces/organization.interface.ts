export interface Organization {
  _id: string;
  is_verified: false;
  main_address: string;
  email: string;
  public_id: string;
  members: string[];
  main_members: string[];
  descrption: string;
  users: string[];
  consutlations: string[];
  org_type: string;
  foundation_date: Date;
  name: string;
}
