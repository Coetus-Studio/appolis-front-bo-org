export interface Role {
  _id: string;
  name: string;
  description?: string;
}

export interface Organization {
  _id: string;
  name: string;
  email: string;
  description?: string;
}

export interface RoleByOrganization {
  _id: string;
  role: Role;
  organization: Organization;
  isActive: boolean;
  assignedAt: string;
}

export interface User {
  _id?: string;
  public_id: string;
  full_name: string;
  email: string;
  phone: string;
  password: string;
  rolesByOrganization: RoleByOrganization[];
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}
