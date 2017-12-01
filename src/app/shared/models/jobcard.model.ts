import { Appointment } from './appointment.model';

export class Jobcard {
  id: number;
  appointment: Appointment;
  suburb: string;
  address: string;
  ping_count: number;
  token: string;
  valid_job: number; // ENUM
  updated: Date;
  on_site: boolean;
  distance: number;
  job_creator: number; // FK
  claim: number; // FK
  skill: number; // FK
  sp: number; // FK
  area: number; // FK
  state: number; // FK
  supplier_type: number; // FK
  forced_location: number; // FK

  job_start: Date;
  job_end: Date;
  modified_date: Date;
  team_leader: number;
  job_information: string; // XML
  office_use: string; // XML
  editor: number; // FK
  edit_date: Date;
  local_file: string;
  claim_value: number;
  mid: number;
  orig_state_id: any;
  orig_job_information: any;
}
