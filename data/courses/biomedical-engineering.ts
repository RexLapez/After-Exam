import type { CourseData } from '@/types/Course';

export const biomedicalEngineering: CourseData = {
  slug: 'biomedical-engineering',
  title: 'Biomedical Engineering',
  category: 'Biomedical Engineering & Health Technology',
  categoryEmoji: '⚙️',

  hero: {
    title: 'Biomedical Engineering',
    subtitle: 'An elite interdisciplinary engineering field bridging biology, medicine, and engineering — design life-saving medical devices, imaging systems, and implants.',
    degree: 'B.Tech / B.E.',
    duration: '4 Years',
    eligibility: 'Class 12 with PCMB / PCM (PCB eligible at select institutions)',
    difficulty: 'Hard',
    avgSalary: '₹3.2L – ₹6.0L /yr',
    avgFees: '₹4L – ₹16L (total)',
  },

  overview: {
    duration: '4 Years',
    eligibility: 'Class 12 PCMB/PCM (PCB accepted by institutions like VIT, Manipal, SRM)',
    entranceExams: ['VITEEE', 'MET (Manipal)', 'JEE Main', 'State Engineering CETs'],
    avgFees: '₹4L – ₹16L total',
    avgSalary: '₹3.2L – ₹6.0L /yr',
    degreeType: 'Undergraduate Engineering',
    courseLevel: 'Bachelor\'s',
    studyMode: 'Full-time (on-campus)',
    recognition: 'AICTE / UGC',
  },

  snapshot: {
    metrics: [
      { label: 'Future Demand', rating: 5, description: 'Surging demand in healthcare tech and diagnostics' },
      { label: 'Placement Potential', rating: 4, description: 'Excellent in medical device and imaging MNCs' },
      { label: 'Government Job Scope', rating: 3, description: 'Biomedical Engineer roles in government hospitals' },
      { label: 'Higher Study Requirement', rating: 4, description: 'M.Tech / MS helps pivot to advanced R&D' },
      { label: 'Abroad Opportunities', rating: 5, description: 'Massive medical device markets in US, Germany, Japan' },
    ],
  },

  goodFor: [
    'You are passionate about both biology and mathematics/physics.',
    'You want to build physical medical devices, prosthetics, or diagnostic machinery.',
    'You want a technical engineering career directly impacting human healthcare.'
  ],

  avoidIf: [
    'You dislike complex mathematics, coding, electronics, or physics.',
    'You want a clinical patient-care role (like MBBS or Nursing).',
    'You want a pure biological research career (consider B.Sc Biotech/Microbiology instead).'
  ],

  careerRoadmap: [
    {
      id: 'r-and-d',
      title: 'Junior R&D Engineer',
      description: 'Design and prototype medical instruments, prosthetics, and biomaterials under supervision.',
      salary: '₹3.5L - ₹5.5L /yr',
      children: [
        {
          id: 'lead-designer',
          title: 'Senior R&D Lead (8+ Yrs Exp)',
          description: 'Lead medical device architecture design, clinical trials, and patent filings.',
          salary: '₹8L - ₹14L /yr'
        }
      ]
    },
    {
      id: 'clinical-eng',
      title: 'Clinical Biomedical Engineer',
      description: 'Maintain and calibrate biomedical equipment and imaging systems in hospital networks.',
      salary: '₹3.0L - ₹5.0L /yr',
      children: [
        {
          id: 'hosp-admin',
          title: 'Biomedical Department Manager (10+ Yrs Exp)',
          description: 'Oversee technical hospital assets, equipment safety protocols, and tech procurement.',
          salary: '₹7.5L - ₹12.5L /yr'
        }
      ]
    },
    {
      id: 'regulatory',
      title: 'Regulatory & Quality Executive',
      description: 'Ensure medical device manufacturing complies with CDSCO, ISO, and FDA standards.',
      salary: '₹3.2L - ₹5.5L /yr'
    }
  ],

  salaryTimeline: [
    { label: 'Fresher', range: '₹3.0L – ₹4.8L /yr', description: 'Biomedical Engineer Trainee / Junior Engineer' },
    { label: '2-3 Years', range: '₹4.2L – ₹6.5L /yr', description: 'Biomedical Engineer / Quality Analyst' },
    { label: '5-7 Years', range: '₹6.5L – ₹10.0L /yr', description: 'Senior Engineer / Clinical Specialist' },
    { label: '10+ Years (High Exp)', range: '₹10.5L – ₹16.0L+ /yr', description: 'Department Head / Senior Technical Specialist' }
  ],

  admissionProcess: [
    { step: 1, title: 'Check Subject Eligibility', description: 'Verify if your preferred college accepts PCB or requires Mathematics in Class 12.' },
    { step: 2, title: 'Crack Entrance Exams', description: 'Appear for engineering entrance tests like VITEEE, MET, JEE Main, or state-level CETs.' },
    { step: 3, title: 'Counseling & Allotment', description: 'Participate in the respective counseling cycles to secure your branch.' },
    { step: 4, title: 'Enrollment', description: 'Verify credentials, pay fees, and begin your undergraduate engineering program.' }
  ],

  topCollegeIds: ['vit', 'manipal'],

  semesterRoadmap: [
    {
      year: 1,
      title: 'Foundations of Engineering & Science',
      subjects: [
        { name: 'Engineering Mathematics (Calculus & Linear Algebra)', type: 'theory' },
        { name: 'Human Anatomy & Physiology for Engineers', type: 'theory' },
        { name: 'Basic Electronics & Network Analysis', type: 'practical' },
        { name: 'Programming & Problem Solving', type: 'practical' }
      ]
    },
    {
      year: 2,
      title: 'Biomedical Core & Instruments',
      subjects: [
        { name: 'Biomedical Sensors & Transducers', type: 'practical' },
        { name: 'Electronic Devices & Circuits', type: 'theory' },
        { name: 'Biochemistry & Biomaterials', type: 'theory' },
        { name: 'Linear Integrated Circuits', type: 'practical' }
      ]
    },
    {
      year: 3,
      title: 'Advanced Diagnostic & Imaging Tech',
      subjects: [
        { name: 'Medical Diagnostic Instrumentation', type: 'practical' },
        { name: 'Medical Imaging Systems (MRI, CT, Ultrasound)', type: 'theory' },
        { name: 'Biomedical Signal & Image Processing', type: 'practical' },
        { name: 'Biomechanics & Rehabilitation', type: 'theory' }
      ]
    },
    {
      year: 4,
      title: 'Specialization & Research Project',
      subjects: [
        { name: 'Artificial Organs & Implant Design', type: 'theory' },
        { name: 'Medical Device Regulatory Compliance', type: 'theory' },
        { name: 'Industry Internship', type: 'internship' },
        { name: 'Capstone R&D Project', type: 'project' }
      ]
    }
  ],

  futureScope: [
    { title: 'Core MedTech Industry', icon: '🏥', description: 'Design, manufacture, and test healthcare equipment for multinationals.', opportunities: ['GE Healthcare', 'Siemens Healthineers', 'Philips Healthcare', 'Medtronic'] },
    { title: 'Clinical Operations', icon: '🏢', description: 'Work as clinical engineers in corporate hospital chains to keep technology safe and functional.', opportunities: ['Apollo Hospitals', 'Max Healthcare', 'Fortis Healthcare'] },
    { title: 'Research & Innovation', icon: '🔬', description: 'Work on cutting-edge implants, prosthetics, neural engineering, and bionics.', opportunities: ['IITs R&D', 'IISc Research Labs', 'Biomaterial Research Groups'] }
  ],

  faq: [
    { question: 'Is Mathematics required for Biomedical Engineering?', answer: 'Yes, Mathematics is a major component of B.Tech curriculum. While top private institutes (like VIT and Manipal) allow PCB students to take bridge courses in math, other colleges may strictly require PCM/PCMB.' },
    { question: 'Can PCB-only students practice as Biomedical Engineers?', answer: 'Yes. Upon completing your B.Tech Biomedical Engineering, you can work in hospitals, MedTech companies, or research labs alongside engineers from all backgrounds.' },
    { question: 'What is the career growth in this field?', answer: 'Extremely high. The medical device industry in India is growing exponentially, driven by rising health infrastructure and diagnostic tech.' }
  ],

  relatedCourseSlugs: ['btech-biotechnology', 'bsc-biotechnology', 'bsc-biology', 'bca'],
  pcbEligibility: 'DEPENDS',
  pcmbEligibility: 'YES',
  mathRequired: 'DEPENDS',
  neetRequired: 'NO',
};
