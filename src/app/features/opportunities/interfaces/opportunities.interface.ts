export interface OpportType {
  _id: string;
  description: string;
  name: string;
}

export interface Opportunity {

  _id: string;
  title: string;
  description: string;
  // opport_type: OpportType;
  // interested: string[];
  // messages: string;
  created_by: string;
  start_date: Date;
  end_date: Date;
  sponsors: string[];

}
