export class Appointment {
  appointment_type: string;
  range_start: Date;
  range_end: Date;
  job: number; // FK
  state: number; // FK
  reason: string;
  created: Date;
}
