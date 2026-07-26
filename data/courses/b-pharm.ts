import type { CourseData } from '@/types/Course';

export const bPharm: CourseData = {
  slug: 'b-pharm',
  title: 'B.Pharm',
  category: 'Pharmacy',
  categoryEmoji: '💊',

  hero: {
    title: 'Bachelor of Pharmacy',
    subtitle: 'Master the science of drug formulation, quality control, and pharmaceutical care — one of the most stable and globally mobile healthcare careers.',
    degree: 'B.Pharm',
    duration: '4 Years',
    eligibility: 'Class 12 with PCB/PCM, 50%+ aggregate',
    difficulty: 'Moderate',
    avgSalary: '₹2.8L – ₹5.0L /yr',
    avgFees: '₹2L – ₹10L (total)',
  },

  overview: {
    duration: '4 Years',
    eligibility: 'Class 12 PCB/PCM (50%+)',
    entranceExams: ['State CETs (MHT-CET, WBJEE, KCET, etc.)', 'Direct Merit-Based Admission'],
    avgFees: '₹2L – ₹10L total',
    avgSalary: '₹2.8L – ₹5.0L /yr',
    degreeType: 'Undergraduate Professional',
    courseLevel: 'Bachelor\'s',
    studyMode: 'Full-time (on-campus)',
    recognition: 'PCI (Pharmacy Council of India)',
  },

  snapshot: {
    metrics: [
      { label: 'Future Demand', rating: 4, description: 'Pharma industry is India\'s 3rd largest globally' },
      { label: 'Placement Potential', rating: 4, description: 'Strong in pharma manufacturing, QC, and clinical' },
      { label: 'Government Job Scope', rating: 3, description: 'Drug Inspector, Govt Hospital Pharmacist roles' },
      { label: 'Higher Study Requirement', rating: 3, description: 'M.Pharm or MBA improves career growth significantly' },
      { label: 'Abroad Opportunities', rating: 4, description: 'Licensed pharmacist roles in US, UK, Australia' },
    ],
  },

  goodFor: [
    'You\'re interested in how medicines are made and work',
    'You want a stable healthcare career without clinical pressure',
    'You like chemistry, formulation science, and lab work',
    'You want options in industry, retail, hospitals, or research',
    'You\'re open to regulatory and quality assurance roles',
  ],

  avoidIf: [
    'You want to treat patients directly (consider MBBS or Physiotherapy)',
    'You dislike organic chemistry and formulation math',
    'You expect very high starting salaries (> ₹10 LPA)',
    'You want a purely creative or non-technical career',
    'You\'re not interested in regulatory compliance work',
  ],

  careerRoadmap: [
    {
      id: 'industry',
      title: 'Pharmaceutical Industry',
      children: [
        {
          id: 'qc-analyst',
          title: 'QC / QA Analyst',
          salary: '₹2.5–4 LPA',
          children: [
            { id: 'qa-manager', title: 'QA Senior Analyst (5+ Yrs Exp)', salary: '₹5–8 LPA' },
            { id: 'regulatory', title: 'Regulatory Specialist (10+ Yrs Exp)', salary: '₹8–13 LPA' },
          ],
        },
        {
          id: 'production',
          title: 'Production Executive',
          salary: '₹2.5–4.2 LPA',
          children: [
            { id: 'plant-manager', title: 'Production Supervisor (8+ Yrs Exp)', salary: '₹6.5–11 LPA' },
          ],
        },
      ],
    },
    {
      id: 'clinical',
      title: 'Clinical & Research',
      children: [
        {
          id: 'cra',
          title: 'Clinical Research Associate',
          salary: '₹3–4.8 LPA',
          children: [
            { id: 'cra-lead', title: 'CRA Team Lead (8+ Yrs Exp)', salary: '₹7–11 LPA' },
          ],
        },
        {
          id: 'formulation',
          title: 'Formulation Junior Scientist',
          salary: '₹3.2–5 LPA',
          children: [
            { id: 'rd-lead', title: 'Formulation Lead (9+ Yrs Exp)', salary: '₹8–13 LPA' },
          ],
        },
      ],
    },
    {
      id: 'retail',
      title: 'Retail & Community Pharmacy',
      children: [
        { id: 'community-pharmacist', title: 'Community Pharmacist', salary: '₹2.4–3.8 LPA' },
        { id: 'pharmacy-owner', title: 'Pharmacy Store Owner (Entrepreneur)', salary: '₹5–12 LPA' },
      ],
    },
    {
      id: 'govt',
      title: 'Government Services',
      children: [
        { id: 'drug-inspector', title: 'Drug Inspector', salary: '₹5–9 LPA (Govt pay scale)' },
        { id: 'govt-pharmacist', title: 'Government Pharmacist', salary: '₹3.5–6.5 LPA' },
      ],
    },
  ],

  salaryTimeline: [
    { label: 'Fresher', range: '₹2.4L – ₹3.8L /yr', description: 'QC Chemist / Medical Representative / Trainee' },
    { label: '2-3 Years', range: '₹3.5L – ₹5.2L /yr', description: 'Senior Analyst / Associate CRA' },
    { label: '5-7 Years', range: '₹5.2L – ₹8.5L /yr', description: 'Quality / Regulatory Specialist' },
    { label: '10+ Years (High Exp)', range: '₹9.0L – ₹14.0L+ /yr', description: 'Assistant Manager / Lead Pharmacist' },
  ],

  admissionProcess: [
    { step: 1, title: 'Complete Class 12', description: 'Score 50%+ in PCB or PCM. Some states accept both streams.', icon: '📚' },
    { step: 2, title: 'Appear for Entrance Exam', description: 'State pharmacy CET, WBJEE, MHT-CET, or direct merit-based admission.', icon: '📝' },
    { step: 3, title: 'State Counselling', description: 'Apply through state pharmacy counselling portals.', icon: '🏛️' },
    { step: 4, title: 'College Allotment', description: 'Get allotment based on rank and preference list.', icon: '🎓' },
    { step: 5, title: 'Begin B.Pharm', description: 'Start your 4-year pharmacy degree.', icon: '💊' },
  ],

  topCollegeIds: ['jamia-hamdard', 'ict-mumbai', 'manipal', 'bits-pilani'],

  semesterRoadmap: [
    {
      year: 1,
      title: 'Pharmaceutical Foundations',
      description: 'Core sciences and introduction to pharmacy.',
      subjects: [
        { name: 'Pharmaceutical Analysis', type: 'theory' },
        { name: 'Pharmaceutics I', type: 'theory' },
        { name: 'Anatomy & Physiology', type: 'theory' },
        { name: 'Pharmaceutical Chemistry', type: 'theory' },
        { name: 'Pharmacy Lab', type: 'practical' },
      ],
    },
    {
      year: 2,
      title: 'Pharmaceutical Chemistry & Pharmacology',
      description: 'Drug chemistry, pharmacology, and dosage forms.',
      subjects: [
        { name: 'Organic Chemistry', type: 'theory' },
        { name: 'Physical Pharmaceutics', type: 'theory' },
        { name: 'Pharmacology I', type: 'theory' },
        { name: 'Pharmacognosy', type: 'theory' },
        { name: 'Drug Formulation Lab', type: 'practical' },
      ],
    },
    {
      year: 3,
      title: 'Applied Pharmacy & Industrial Training',
      description: 'Advanced pharmacology, industrial operations, and clinical exposure.',
      subjects: [
        { name: 'Pharmacology II', type: 'theory' },
        { name: 'Industrial Pharmacy', type: 'theory' },
        { name: 'Biopharmaceutics', type: 'theory' },
        { name: 'Pharmaceutical Jurisprudence', type: 'theory' },
        { name: 'Industrial Visit / Training', type: 'internship' },
      ],
    },
    {
      year: 4,
      title: 'Clinical Pharmacy & Project',
      description: 'Clinical application, research project, and placement preparation.',
      subjects: [
        { name: 'Clinical Pharmacy & Therapeutics', type: 'theory' },
        { name: 'Pharmaceutical Quality Assurance', type: 'theory' },
        { name: 'Novel Drug Delivery Systems', type: 'theory' },
        { name: 'Research Project', type: 'project' },
        { name: 'Placement Preparation', type: 'internship' },
      ],
    },
  ],

  futureScope: [
    { title: 'Pharmaceutical Industry', icon: '🏭', description: 'India is the pharmacy of the world — massive manufacturing and export sector.', opportunities: ['Sun Pharma', 'Cipla', 'Dr. Reddy\'s', 'Lupin', 'Biocon'] },
    { title: 'Clinical Research', icon: '🔬', description: 'Growing demand for CRAs and clinical data managers in India.', opportunities: ['CRO Companies', 'Pharma Sponsors', 'Bioequivalence Studies'] },
    { title: 'Government Jobs', icon: '🏛️', description: 'Drug Inspector, Pharmacist, and public health roles.', opportunities: ['Drug Inspector (CDSCO)', 'ESIC Pharmacist', 'UPSC Drug Controller'] },
    { title: 'Higher Studies', icon: '📖', description: 'M.Pharm, MBA Pharma Management, or MS abroad.', opportunities: ['M.Pharm (Pharmacology)', 'MBA Healthcare', 'MS Pharmaceutical Sciences'] },
    { title: 'Abroad Practice', icon: '✈️', description: 'Licensed pharmacist in US, UK, Australia with excellent pay.', opportunities: ['NAPLEX (US)', 'GPhC (UK)', 'KAPS (Australia)'] },
    { title: 'Entrepreneurship', icon: '🚀', description: 'Start your own pharmacy retail chain or pharma startup.', opportunities: ['Medical Store Chain', 'Generic Drug Brand', 'Health-Tech Startup'] },
  ],

  faq: [
    { question: 'What is the difference between B.Pharm and D.Pharm?', answer: 'B.Pharm is a 4-year degree that qualifies you for industry, research, and higher study roles. D.Pharm is a 2-year diploma focused on retail pharmacy practice. B.Pharm opens significantly more career doors.' },
    { question: 'Is NEET required for B.Pharm admission?', answer: 'No, NEET is not required for B.Pharm admissions across the vast majority of India. Admissions are conducted through state-level CETs (such as MHT-CET, WBJEE, KCET) or Class 12 merit marks.' },
    { question: 'Can I open my own medical store after B.Pharm?', answer: 'Yes. With a B.Pharm degree and registration with the State Pharmacy Council, you can obtain a Drug License to operate a retail pharmacy.' },
    { question: 'What is GPAT?', answer: 'GPAT (Graduate Pharmacy Aptitude Test) is the national entrance exam for M.Pharm admissions. A good GPAT score can also get you AICTE fellowships during M.Pharm.' },
    { question: 'Can I transition to IT or data roles from pharmacy?', answer: 'Yes. Pharmacovigilance, clinical data management, and pharmaceutical informatics are growing fields that combine pharma knowledge with tech skills.' },
  ],

  relatedCourseSlugs: ['pharm-d', 'd-pharm', 'bsc-biotechnology', 'mbbs'],
  pcbEligibility: 'YES',
  pcmbEligibility: 'YES',
  mathRequired: 'NO',
  neetRequired: 'NO',
};
