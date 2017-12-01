// FK = Foreign Key

export class Claim {
  id: number;
  application_date: Date;
  application_end: Date;
  modified_date: Date;
  form_start: Date;
  type: string;
  loan_amount: number;
  suburb: string;
  address: string;
  state_change_date: Date;
  edit_date: Date;
  conditional: boolean;
  local_file: string;
  unique_ref: string;
  mid: string;
  job_change_counter: number;
  application_creator: number; // FK
  branch: number; // FK
  applicant: number; // FK
  claim_type: number; // FK
  state: number; // FK
  editor: number; // FK
  location: number; // FK
  sub_section: number; // FK
  // co_applicant: number; // FK
  // guarantor: number; // FK
  // loan_information: string;
  // office_use: string;
}
