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
    avgSalary: '₹3.5L – ₹8.0L /yr',
    avgFees: '₹2L – ₹10L (total)',
  },

  overview: {
    duration: '4 Years',
    eligibility: 'Class 12 PCB/PCM (50%+)',
    entranceExams: ['State Pharmacy CET', 'NEET UG (some states)', 'GPAT (PG)'],
    avgFees: '₹2L – ₹10L total',
    avgSalary: '₹3.5L – ₹8.0L /yr',
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
    'You want to treat patients directly (consider MBBS or BPT)',
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
          salary: '₹3–6 LPA',
          children: [
            { id: 'qa-manager', title: 'QA Manager', salary: '₹10–18 LPA' },
            { id: 'regulatory', title: 'Regulatory Affairs Head', salary: '₹15–30 LPA' },
          ],
        },
        {
          id: 'production',
          title: 'Production Executive',
          salary: '₹3.5–7 LPA',
          children: [
            { id: 'plant-manager', title: 'Plant Manager', salary: '₹12–25 LPA' },
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
          salary: '₹5–9 LPA',
          children: [
            { id: 'cra-lead', title: 'CRA Lead / Project Manager', salary: '₹12–22 LPA' },
          ],
        },
        {
          id: 'formulation',
          title: 'Formulation Scientist',
          salary: '₹5–10 LPA',
          children: [
            { id: 'rd-lead', title: 'R&D Lead', salary: '₹15–30 LPA' },
          ],
        },
      ],
    },
    {
      id: 'retail',
      title: 'Retail & Community Pharmacy',
      children: [
        { id: 'community-pharmacist', title: 'Community Pharmacist', salary: '₹3–5 LPA' },
        { id: 'pharmacy-owner', title: 'Pharmacy Chain Owner', salary: '₹10–40 LPA+' },
      ],
    },
    {
      id: 'govt',
      title: 'Government Services',
      children: [
        { id: 'drug-inspector', title: 'Drug Inspector', salary: '₹6–12 LPA (Govt pay)' },
        { id: 'govt-pharmacist', title: 'Government Pharmacist', salary: '₹4–8 LPA' },
      ],
    },
  ],

  salaryTimeline: [
    { label: 'Fresher', range: '₹2.5L – ₹5L /yr', description: 'QC Analyst / Medical Representative' },
    { label: '2 Years', range: '₹4L – ₹8L /yr', description: 'Senior Analyst / CRA' },
    { label: '5 Years', range: '₹8L – ₹15L /yr', description: 'Manager / Regulatory Specialist' },
    { label: '10 Years', range: '₹15L – ₹30L /yr', description: 'Head of QA / R&D Manager' },
    { label: 'Leadership', range: '₹30L – ₹60L+ /yr', description: 'VP Operations / Country Head Regulatory' },
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
    { question: 'Is NEET required for B.Pharm admission?', answer: 'In most states, no. B.Pharm admissions are through state pharmacy entrance exams or merit-based. However, a few states like UP accept NEET scores for pharmacy seats.' },
    { question: 'Can I open my own medical store after B.Pharm?', answer: 'Yes. With a B.Pharm degree and registration with the State Pharmacy Council, you can obtain a Drug License to operate a retail pharmacy.' },
    { question: 'What is GPAT?', answer: 'GPAT (Graduate Pharmacy Aptitude Test) is the national entrance exam for M.Pharm admissions. A good GPAT score can also get you AICTE fellowships during M.Pharm.' },
    { question: 'Can I transition to IT or data roles from pharmacy?', answer: 'Yes. Pharmacovigilance, clinical data management, and pharmaceutical informatics are growing fields that combine pharma knowledge with tech skills.' },
  ],

  relatedCourseSlugs: ['pharm-d', 'd-pharm', 'bsc-biotechnology', 'mbbs'],
};
