export interface OpportType {
  _id: string;
  description: string;
  name: string;
}

export interface Opportunity {

  _id: string;
  title: string;
  description: string;
  opport_type: OpportType;
  interested: string[];
  messages: string;
  created_by: string;
  created_at: Date;

}
