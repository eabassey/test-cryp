import { Claim } from '../../shared/models/claim.model';

export class WorkflowClaimListViewModel {
  constructor(
    public id: number,
    public applicant_name: string, // From applicant object
    public suburb: string,
    public type: string,
    public application_date: Date,
    public mid: string,
    public claim_handler: string, // application_creator object
    public claim_status: Status,
    public job_cards: JobCardVM[]
  ) {}
}

export interface JobCardVM {
  id: number;
  skill_name: string; // From skill object
  sp_name: string;
  appointment: AppointmentVM;
  job_status: Status;
  // What must I do ... where does this come from
}

export interface AppointmentVM {
  appointment_type: string;
  appointment_date: Date;
}

export interface Status {
  state_id: number;
  state_description: string;
}
