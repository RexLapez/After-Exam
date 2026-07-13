export interface ExamData {
  id: string;
  name: string;
  fullName: string;
  conductedBy: string;
  frequency: string;
  mode: 'Online' | 'Offline' | 'Both';
  eligibility: string;
  website?: string;
}
