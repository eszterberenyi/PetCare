export interface Appointment {
  id?: number;
  userId?: number;
  text: string;
  note?: string;
  day: string;
  reminder: boolean;
}
