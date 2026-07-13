export interface CollegeData {
  id: string;
  name: string;
  location: string;
  type: 'Government' | 'Private' | 'Deemed';
  fees: string;
  nirfRank?: number;
  avgPackage: string;
  website?: string;
  logo?: string;
}
