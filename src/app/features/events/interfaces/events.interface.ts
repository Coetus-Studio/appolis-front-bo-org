export interface EventOrgInterface {
  title: string;
  description: string;
  start_date: Date;
  end_date: Date;
  responsible_organization: string;
  messages: string[];
  event_type: string;
  assistents: string[];
  created_by: string;
  location: string;
  images: string[];
  status: string;
  created_at: Date;
}
