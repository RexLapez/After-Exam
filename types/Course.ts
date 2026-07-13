// ─── Hero Section ───
export interface HeroSection {
  title: string;
  subtitle: string;
  degree: string;
  duration: string;
  eligibility: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Very Hard';
  avgSalary: string;
  avgFees: string;
}

// ─── Snapshot (Star Ratings) ───
export interface SnapshotMetric {
  label: string;
  rating: number; // 1–5
  description?: string;
}

export interface SnapshotSection {
  metrics: SnapshotMetric[];
}

// ─── Overview Grid ───
export interface OverviewSection {
  duration: string;
  eligibility: string;
  entranceExams: string[];
  avgFees: string;
  avgSalary: string;
  degreeType: string;
  courseLevel: string;
  studyMode: string;
  recognition: string;
}

// ─── Career Roadmap (Tree) ───
export interface CareerNode {
  id: string;
  title: string;
  description?: string;
  salary?: string;
  children?: CareerNode[];
}

// ─── Salary Timeline ───
export interface SalaryPoint {
  label: string;
  range: string;
  description?: string;
}

// ─── Admission Process ───
export interface AdmissionStep {
  step: number;
  title: string;
  description: string;
  icon?: string;
}

// ─── Semester Roadmap ───
export interface SemesterSubject {
  name: string;
  type?: 'theory' | 'practical' | 'project' | 'internship';
}

export interface Semester {
  year: number;
  title: string;
  description?: string;
  subjects: SemesterSubject[];
}

// ─── Future Scope ───
export interface FutureCategory {
  title: string;
  icon?: string;
  description: string;
  opportunities: string[];
}

// ─── FAQ ───
export interface FAQ {
  question: string;
  answer: string;
}

// ─── Main Course Data Interface ───
export interface CourseData {
  slug: string;
  title: string;
  category: string;
  categoryEmoji?: string;

  hero: HeroSection;
  overview: OverviewSection;
  snapshot: SnapshotSection;

  goodFor: string[];
  avoidIf: string[];

  careerRoadmap: CareerNode[];
  salaryTimeline: SalaryPoint[];
  admissionProcess: AdmissionStep[];

  topCollegeIds: string[];
  semesterRoadmap: Semester[];
  futureScope: FutureCategory[];
  faq: FAQ[];
  relatedCourseSlugs: string[];
}
