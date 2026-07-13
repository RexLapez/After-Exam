import type { CourseData } from '@/types/Course';

export const btechBiotechnology: CourseData = {
  slug: 'btech-biotechnology',
  title: 'B.Tech Biotechnology',
  category: 'Biotechnology & Bioinformatics',
  categoryEmoji: '🧬',

  hero: {
    title: 'Bachelor of Technology in Biotechnology',
    subtitle: 'An elite fusion of microbiology, genetic engineering, and process engineering — build the future of medicine, agriculture, and clean energy.',
    degree: 'B.Tech',
    duration: '4 Years',
    eligibility: 'Class 12 with PCB (or PCM), VITEEE / MET / State CET',
    difficulty: 'Hard',
    avgSalary: '₹5.5L – ₹12.0L /yr',
    avgFees: '₹4L – ₹16L (total)',
  },

  overview: {
    duration: '4 Years',
    eligibility: 'Class 12 PCB/PCM (60%+)',
    entranceExams: ['VITEEE', 'MET (Manipal)', 'State CET'],
    avgFees: '₹4L – ₹16L total',
    avgSalary: '₹5.5L – ₹12.0L /yr',
    degreeType: 'Undergraduate Engineering',
    courseLevel: 'Bachelor\'s',
    studyMode: 'Full-time (on-campus)',
    recognition: 'AICTE / UGC',
  },

  snapshot: {
    metrics: [
      { label: 'Future Demand', rating: 5, description: 'Post-pandemic biotech boom globally' },
      { label: 'Placement Potential', rating: 3, description: 'Strong in tier-1 colleges, variable elsewhere' },
      { label: 'Government Job Scope', rating: 2, description: 'Limited direct govt roles; GATE → PSUs' },
      { label: 'Higher Study Requirement', rating: 5, description: 'MS/PhD strongly recommended for top roles' },
      { label: 'Abroad Opportunities', rating: 5, description: 'Excellent MS/PhD funding in US, EU' },
    ],
  },

  goodFor: [
    'You\'re fascinated by genetics, DNA, and molecular biology',
    'You enjoy hands-on lab work — PCR, CRISPR, cell culture',
    'You\'re open to pursuing MS/PhD for career acceleration',
    'You want exposure to both biology and engineering',
    'You\'re interested in startups, biopharma, or research',
  ],

  avoidIf: [
    'You expect high-paying jobs immediately after B.Tech',
    'You don\'t want to pursue higher studies (MS/PhD/MBA)',
    'You prefer pure clinical patient-facing work',
    'You\'re looking for straightforward government exam pathways',
    'You dislike chemistry-heavy coursework',
  ],

  careerRoadmap: [
    {
      id: 'research',
      title: 'Research & Development',
      children: [
        {
          id: 'research-associate',
          title: 'Research Associate',
          salary: '₹4–8 LPA',
          children: [
            { id: 'research-scientist', title: 'Research Scientist', salary: '₹10–20 LPA' },
            { id: 'rd-director', title: 'R&D Director', salary: '₹25–50 LPA' },
          ],
        },
      ],
    },
    {
      id: 'bioinformatics',
      title: 'Bioinformatics & Computational Biology',
      children: [
        {
          id: 'bioinfo-analyst',
          title: 'Bioinformatics Analyst',
          salary: '₹5–10 LPA',
          children: [
            { id: 'bioinfo-scientist', title: 'Bioinformatics Scientist', salary: '₹12–25 LPA' },
          ],
        },
      ],
    },
    {
      id: 'pharma',
      title: 'Pharmaceutical & Clinical',
      children: [
        {
          id: 'cra',
          title: 'Clinical Research Associate',
          salary: '₹5–10 LPA',
          children: [
            { id: 'reg-affairs', title: 'Regulatory Affairs Manager', salary: '₹12–22 LPA' },
            { id: 'pharma-pm', title: 'Pharma Product Manager', salary: '₹15–30 LPA' },
          ],
        },
      ],
    },
    {
      id: 'business',
      title: 'Business & Consulting',
      children: [
        { id: 'biotech-consultant', title: 'Biotech Business Consultant', salary: '₹10–25 LPA' },
        { id: 'patent-analyst', title: 'Biotech Patent Analyst', salary: '₹8–18 LPA' },
      ],
    },
  ],

  salaryTimeline: [
    { label: 'Fresher', range: '₹3.5L – ₹7L /yr', description: 'Lab trainee / Junior Research Fellow' },
    { label: '2 Years', range: '₹6L – ₹12L /yr', description: 'Research Associate / QC Analyst' },
    { label: '5 Years', range: '₹10L – ₹22L /yr', description: 'Senior Scientist / CRA Lead' },
    { label: '10 Years', range: '₹20L – ₹45L /yr', description: 'R&D Manager / Regulatory Head' },
    { label: 'Leadership', range: '₹40L – ₹80L+ /yr', description: 'VP R&D / CSO at pharma/biotech firm' },
  ],

  admissionProcess: [
    { step: 1, title: 'Complete Class 12', description: 'Score well in PCB (Biology stream). Private and state colleges usually require 50%–60%+ aggregate.', icon: '📚' },
    { step: 2, title: 'Appear for Entrance Exams', description: 'Take university exams like VITEEE or MET (Manipal), or state-level CETs that accept biology students.', icon: '📝' },
    { step: 3, title: 'University / State Counselling', description: 'Apply through university admission portals or state CET counselling boards for seat allotment.', icon: '🏛️' },
    { step: 4, title: 'College Allotment', description: 'Get seat based on exam rank, choices, and availability.', icon: '🎓' },
    { step: 5, title: 'Begin B.Tech', description: 'Start your 4-year engineering journey in biotechnology.', icon: '🧬' },
  ],

  topCollegeIds: ['vit', 'manipal', 'curaj'],

  semesterRoadmap: [
    {
      year: 1,
      title: 'Engineering & Biology Foundations',
      description: 'Core engineering subjects alongside introductory biology.',
      subjects: [
        { name: 'Engineering Mathematics', type: 'theory' },
        { name: 'Engineering Physics', type: 'theory' },
        { name: 'Cell Biology', type: 'theory' },
        { name: 'Chemistry', type: 'theory' },
        { name: 'Programming (C/Python)', type: 'practical' },
      ],
    },
    {
      year: 2,
      title: 'Core Biotechnology',
      description: 'Deep dive into genetics, microbiology, and biochemistry.',
      subjects: [
        { name: 'Genetics & Molecular Biology', type: 'theory' },
        { name: 'Microbiology', type: 'theory' },
        { name: 'Biochemistry', type: 'theory' },
        { name: 'Biostatistics', type: 'theory' },
        { name: 'Microbiology Lab', type: 'practical' },
      ],
    },
    {
      year: 3,
      title: 'Applied Biotechnology & Specialization',
      description: 'Advanced techniques and elective specializations.',
      subjects: [
        { name: 'Genetic Engineering', type: 'theory' },
        { name: 'Bioprocess Engineering', type: 'theory' },
        { name: 'Immunology', type: 'theory' },
        { name: 'Bioinformatics', type: 'theory' },
        { name: 'Industrial Training', type: 'internship' },
      ],
    },
    {
      year: 4,
      title: 'Research Project & Placements',
      description: 'Capstone research project and campus placement preparation.',
      subjects: [
        { name: 'Research Methodology', type: 'theory' },
        { name: 'Elective: Nanobiotechnology / Genomics', type: 'theory' },
        { name: 'B.Tech Project / Dissertation', type: 'project' },
        { name: 'Campus Placement Prep', type: 'internship' },
      ],
    },
  ],

  futureScope: [
    { title: 'Industry R&D', icon: '🏭', description: 'Work at pharma, FMCG, or biotech companies on product development.', opportunities: ['Biocon', 'Serum Institute', 'Dr. Reddy\'s', 'Novozymes'] },
    { title: 'Research (MS/PhD)', icon: '🔬', description: 'Funded positions at top global universities.', opportunities: ['MS in USA/EU', 'PhD at IISc/NCBS', 'CSIR-NET JRF', 'DBT Fellowship'] },
    { title: 'Startups', icon: '🚀', description: 'India\'s biotech startup ecosystem is booming.', opportunities: ['AgriTech', 'MedTech', 'Synthetic Biology', 'Precision Medicine'] },
    { title: 'Higher Studies (MBA)', icon: '📊', description: 'Pivot into pharma management and business roles.', opportunities: ['MBA Pharma Mgmt', 'MBA Healthcare', 'Biotech Consulting'] },
    { title: 'Government & PSU', icon: '🏛️', description: 'GATE score → PSU or government research labs.', opportunities: ['GATE Biotech', 'BARC', 'DRDO', 'ICAR'] },
    { title: 'Teaching & Academia', icon: '📖', description: 'Pursue PhD and join as faculty in universities.', opportunities: ['Assistant Professor', 'Research Lead', 'Lab Director'] },
  ],

  faq: [
    { question: 'Is B.Tech Biotechnology worth it without higher studies?', answer: 'At top universities like VIT and Manipal, yes — campus placements in quality control, bioinformatics, operations, and business consulting roles exist. But for core scientific R&D, MS/PhD is highly recommended.' },
    { question: 'Can PCB students join B.Tech Biotechnology?', answer: 'Yes, absolutely. Many premium private universities (such as VIT and Manipal) and state-level engineering colleges offer direct pathways for Class 12 Biology (PCB) students. They do not require JEE Main or Class 12 Mathematics.' },
    { question: 'What is the difference between B.Sc and B.Tech Biotechnology?', answer: 'B.Tech focuses heavily on bioprocess engineering, bioinformatics, and computing, leading to stronger placements. B.Sc is more academic and research-oriented, usually requiring an M.Sc afterwards.' },
    { question: 'What entrance exams are needed?', answer: 'PCB students should target VITEEE (VIT Vellore), MET (Manipal), and state-level engineering CETs (like MHT-CET, KCET) which feature biology-eligible seat streams.' },
    { question: 'What salary can I expect as a fresher?', answer: 'Freshers typically earn ₹3.5–7 LPA in India. Those pursuing an MS or PhD abroad can expect entry-level research salaries of $60K–$80K in the US/EU biotech sector.' },
  ],

  relatedCourseSlugs: ['bsc-biotechnology', 'btech-bioinformatics', 'b-pharm', 'microbiology'],
};
