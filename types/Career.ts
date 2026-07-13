export interface CareerData {
  id: string;
  title: string;
  field: string;
  avgSalary: string;
  growthOutlook: 'High' | 'Moderate' | 'Stable';
  description: string;
  requiredSkills: string[];
}
