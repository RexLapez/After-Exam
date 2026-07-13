import type { CourseData } from '@/types/Course';

export const mbbs: CourseData = {
  slug: 'mbbs',
  title: 'MBBS',
  category: 'Medical & Clinical Careers',
  categoryEmoji: '🩺',

  hero: {
    title: 'Bachelor of Medicine, Bachelor of Surgery',
    subtitle: 'The gold standard of medical education — become a licensed physician and practice clinical medicine across India and the world.',
    degree: 'MBBS',
    duration: '5.5 Years (incl. 1-year internship)',
    eligibility: 'Class 12 with PCB, min 50% + NEET UG qualified',
    difficulty: 'Very Hard',
    avgSalary: '₹8.0L – ₹24.0L /yr',
    avgFees: '₹10L – ₹75L (total)',
  },

  overview: {
    duration: '5.5 Years',
    eligibility: 'Class 12 PCB (50%+)',
    entranceExams: ['NEET UG'],
    avgFees: '₹10L – ₹75L total',
    avgSalary: '₹8.0L – ₹24.0L /yr',
    degreeType: 'Undergraduate Professional',
    courseLevel: 'Bachelor\'s',
    studyMode: 'Full-time (on-campus)',
    recognition: 'NMC (National Medical Commission)',
  },

  snapshot: {
    metrics: [
      { label: 'Future Demand', rating: 5, description: 'Permanent clinical demand globally' },
      { label: 'Placement Potential', rating: 5, description: 'Near 100% placement for graduates' },
      { label: 'Government Job Scope', rating: 5, description: 'Abundant state and central govt postings' },
      { label: 'Higher Study Requirement', rating: 4, description: 'PG (MD/MS) recommended for specialization' },
      { label: 'Abroad Opportunities', rating: 5, description: 'USMLE / PLAB pathway available' },
    ],
  },

  goodFor: [
    'You\'re passionate about biology and human anatomy',
    'You want direct patient interaction and clinical practice',
    'You\'re okay with 8–12 years of training (UG + PG)',
    'You want the highest job security in healthcare',
    'You\'re prepared for intensive competitive exams',
  ],

  avoidIf: [
    'You dislike long study timelines and delayed earning',
    'You\'re uncomfortable with blood, surgeries, or hospitals',
    'You want a quick entry into the job market (< 4 years)',
    'You prefer lab-based research over clinical work',
    'You struggle with high-pressure exam environments',
  ],

  careerRoadmap: [
    {
      id: 'clinical',
      title: 'Clinical Medicine',
      children: [
        {
          id: 'general-physician',
          title: 'General Physician',
          salary: '₹8–15 LPA',
          children: [
            { id: 'md-medicine', title: 'MD Internal Medicine', salary: '₹18–35 LPA' },
            { id: 'md-pediatrics', title: 'MD Pediatrics', salary: '₹15–30 LPA' },
          ],
        },
        {
          id: 'surgeon',
          title: 'Junior Surgeon',
          salary: '₹10–18 LPA',
          children: [
            { id: 'ms-surgery', title: 'MS General Surgery', salary: '₹25–50 LPA' },
            { id: 'mch-neuro', title: 'MCh Neurosurgery', salary: '₹40–80 LPA' },
          ],
        },
      ],
    },
    {
      id: 'radiology',
      title: 'Diagnostics & Radiology',
      children: [
        { id: 'md-radiology', title: 'MD Radiology', salary: '₹20–40 LPA' },
        { id: 'md-pathology', title: 'MD Pathology', salary: '₹15–25 LPA' },
      ],
    },
    {
      id: 'govt',
      title: 'Government Services',
      children: [
        { id: 'civil-surgeon', title: 'Civil Surgeon', salary: '₹12–20 LPA (Govt pay)' },
        { id: 'pho', title: 'Public Health Officer', salary: '₹10–18 LPA' },
      ],
    },
  ],

  salaryTimeline: [
    { label: 'Internship', range: '₹15K–25K /month', description: 'Mandatory 1-year clinical rotation' },
    { label: 'Fresher', range: '₹6L – ₹12L /yr', description: 'Junior Resident / General Physician' },
    { label: '3–5 Years', range: '₹12L – ₹25L /yr', description: 'Senior Resident or PG student' },
    { label: '5–10 Years', range: '₹25L – ₹50L /yr', description: 'Consultant Specialist after PG' },
    { label: '10+ Years', range: '₹50L – ₹1.5Cr /yr', description: 'Senior Consultant / Private Practice' },
  ],

  admissionProcess: [
    { step: 1, title: 'Complete Class 12', description: 'Score well in Physics, Chemistry, Biology (PCB). Minimum 50% aggregate required.', icon: '📚' },
    { step: 2, title: 'Appear for NEET UG', description: 'The single national entrance exam for all medical colleges in India. Conducted by NTA once a year.', icon: '📝' },
    { step: 3, title: 'Counselling Round', description: 'Based on NEET rank, apply through AIQ (All India Quota) or state counselling for government seats.', icon: '🏛️' },
    { step: 4, title: 'College Allotment', description: 'Receive your allotment letter based on preference list and rank. Report to the college within deadline.', icon: '🎓' },
    { step: 5, title: 'Begin MBBS', description: 'Start your 4.5-year academic journey followed by a 1-year compulsory rotating internship.', icon: '🏥' },
  ],

  topCollegeIds: ['aiims-delhi', 'cmc-vellore', 'manipal'],

  semesterRoadmap: [
    {
      year: 1,
      title: 'Pre-Clinical Foundation',
      description: 'Build the foundational understanding of human body systems.',
      subjects: [
        { name: 'Anatomy', type: 'theory' },
        { name: 'Physiology', type: 'theory' },
        { name: 'Biochemistry', type: 'theory' },
        { name: 'Dissection Lab', type: 'practical' },
      ],
    },
    {
      year: 2,
      title: 'Para-Clinical Sciences',
      description: 'Bridge between basic sciences and clinical medicine.',
      subjects: [
        { name: 'Pathology', type: 'theory' },
        { name: 'Pharmacology', type: 'theory' },
        { name: 'Microbiology', type: 'theory' },
        { name: 'Forensic Medicine', type: 'theory' },
        { name: 'Clinical Postings', type: 'practical' },
      ],
    },
    {
      year: 3,
      title: 'Clinical Sciences – Part I',
      description: 'Deep dive into major clinical disciplines and hospital wards.',
      subjects: [
        { name: 'General Medicine', type: 'theory' },
        { name: 'General Surgery', type: 'theory' },
        { name: 'Obstetrics & Gynaecology', type: 'theory' },
        { name: 'ENT', type: 'theory' },
        { name: 'Ophthalmology', type: 'theory' },
        { name: 'Ward Rotations', type: 'practical' },
      ],
    },
    {
      year: 4,
      title: 'Clinical Sciences – Part II',
      description: 'Advanced specialities and elective exposure.',
      subjects: [
        { name: 'Pediatrics', type: 'theory' },
        { name: 'Orthopaedics', type: 'theory' },
        { name: 'Psychiatry', type: 'theory' },
        { name: 'Dermatology', type: 'theory' },
        { name: 'Community Medicine', type: 'theory' },
      ],
    },
    {
      year: 5,
      title: 'Compulsory Rotating Internship',
      description: 'Hands-on clinical work across all major departments.',
      subjects: [
        { name: 'Medicine Posting', type: 'internship' },
        { name: 'Surgery Posting', type: 'internship' },
        { name: 'OBG Posting', type: 'internship' },
        { name: 'Paediatrics Posting', type: 'internship' },
        { name: 'Community Health Camp', type: 'internship' },
      ],
    },
  ],

  futureScope: [
    { title: 'Super-Specialization', icon: '🏥', description: 'Pursue DM/MCh in cardiology, neurosurgery, gastroenterology, etc.', opportunities: ['DM Cardiology', 'MCh Neurosurgery', 'DM Nephrology', 'DM Oncology'] },
    { title: 'Research', icon: '🔬', description: 'Clinical research, drug trials, and academic medical research.', opportunities: ['MD + PhD', 'Clinical Trial Investigator', 'WHO Fellow', 'ICMR Scientist'] },
    { title: 'Government Jobs', icon: '🏛️', description: 'State and central government medical officer posts.', opportunities: ['Civil Surgeon', 'CMO', 'District Health Officer', 'Railway Medical Officer'] },
    { title: 'Abroad Practice', icon: '✈️', description: 'Clear USMLE (US), PLAB (UK), AMC (Australia) for international practice.', opportunities: ['USMLE Steps 1–3', 'PLAB UK', 'AMC Australia', 'Canadian MCCQE'] },
    { title: 'Private Practice', icon: '💼', description: 'Set up your own clinic or multi-speciality hospital.', opportunities: ['Solo Practice', 'Group Practice', 'Franchised Clinics', 'Telemedicine Startups'] },
    { title: 'Healthcare Management', icon: '📊', description: 'Transition into hospital administration and health policy.', opportunities: ['MHA', 'Hospital CEO', 'Health Tech Advisor', 'Policy Consultant'] },
  ],

  faq: [
    { question: 'Is NEET the only way to get into MBBS?', answer: 'Yes. As of 2024, NEET UG is the sole entrance exam for all MBBS admissions in India — government, private, and deemed universities. There is no other pathway.' },
    { question: 'What is the NEXT exam replacing NEET PG?', answer: 'NExT (National Exit Test) is being introduced to replace the MBBS final year exam and NEET PG simultaneously. It will serve as both a licensing exam and a PG entrance test.' },
    { question: 'How much does MBBS cost in a government college?', answer: 'Government MBBS tuition ranges from ₹1,500/year (AIIMS) to about ₹50,000/year in state government colleges. Total 5.5-year cost is typically under ₹5 lakh.' },
    { question: 'Can I practice abroad after Indian MBBS?', answer: 'Yes, but you must clear the licensing exam of the target country — USMLE for USA, PLAB for UK, AMC for Australia. The process takes 1–3 years of additional preparation.' },
    { question: 'Is MBBS worth it if I don\'t get a government seat?', answer: 'Private MBBS costs ₹50L–1Cr+. While the degree is identical, the ROI depends on your PG prospects. Many students combine private MBBS with strong NEET PG prep to crack government PG seats.' },
  ],

  relatedCourseSlugs: ['bds', 'bams', 'bhms', 'bsc-nursing', 'bpt'],
};
