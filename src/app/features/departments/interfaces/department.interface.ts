import { User } from "../../../shared/interfaces/user-session.interface";
import { Organization } from "../../organizations/interfaces/organization.interface";


export interface DepartmentFormModel {
  _id: string;
  name: string;
  description: string;
  category: string[];
  responsible_organization: string;
  // user: User;
  // TODO: ver relacion con interface user
  user: string[];
  created_by: string;


}
