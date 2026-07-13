import type { CourseData } from '@/types/Course';
import { mbbs } from './mbbs';
import { btechBiotechnology } from './btech-biotechnology';
import { bPharm } from './b-pharm';
import careersData from '../careersData.json';

const allCourses: CourseData[] = [mbbs, btechBiotechnology, bPharm];

export const courseRegistry = new Map<string, CourseData>();
allCourses.forEach(c => courseRegistry.set(c.slug, c));

function generateFallbackCourse(slug: string): CourseData | undefined {
  let foundCourseName = '';
  let foundCategoryName = '';
  let foundCategoryEmoji = '🎓';

  for (const cat of careersData.categories) {
    const c = cat.courses.find(x => x.slug === slug);
    if (c) {
      foundCourseName = c.name;
      foundCategoryName = cat.name;
      foundCategoryEmoji = cat.emoji || '🎓';
      break;
    }
  }

  if (!foundCourseName) return undefined;

  // Configure defaults based on category
  let duration = '3 Years';
  let eligibility = 'Class 12 PCB (50%+)';
  let entranceExams = ['State CET', 'CUET UG'];
  let avgFees = '₹1.5L – ₹6L total';
  let avgSalary = '₹3.5L – ₹8.0L /yr';
  let difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Very Hard' = 'Moderate';
  let topColleges = ['vit', 'manipal'];
  let degree = 'B.Sc';
  let recognition = 'UGC / State Councils';

  let goodFor = [
    `You are deeply interested in ${foundCourseName.toLowerCase()} and applied sciences.`,
    'You enjoy hands-on professional work, laboratories, or research writing.',
    'You want an alternative career path with high demand in India and abroad.'
  ];

  let avoidIf = [
    'You want to be a main prescribing MBBS physician (requires clinical residency).',
    'You are looking for quick, high-paying corporate tech jobs without specialization.',
    'You dislike reading technical textbooks or conducting lab experiments.'
  ];

  if (foundCategoryName === 'Medical & Clinical Careers') {
    duration = foundCourseName === 'BDS' ? '5 Years' : '5.5 Years';
    eligibility = 'Class 12 PCB (50%+) + NEET UG qualified';
    entranceExams = ['NEET UG'];
    avgFees = '₹3L – ₹15L (Govt) / ₹20L – ₹60L (Private)';
    avgSalary = '₹5.0L – ₹12.0L /yr';
    difficulty = 'Very Hard';
    topColleges = ['aiims-delhi', 'bhu', 'cmc-vellore'];
    degree = foundCourseName;
    recognition = foundCourseName === 'BDS' ? 'DCI (Dental Council)' : 'CCIM / Ayush Commission';
    goodFor = [
      `You are passionate about clinical patient care and treatment using ${foundCourseName}.`,
      'You are willing to invest 5+ years in rigorous study and internship training.',
      'You want a highly respected healthcare profession with direct human interaction.'
    ];
    avoidIf = [
      'You cannot cope with high-pressure clinical exams and long patient-ward duties.',
      'You expect to start earning high salaries within 3 years of graduating.',
      'You prefer pure research laboratory work over daily patient diagnoses.'
    ];
  } else if (foundCategoryName === 'Pharmacy') {
    duration = foundCourseName === 'Pharm D' ? '6 Years' : (foundCourseName === 'D.Pharm' ? '2 Years' : '4 Years');
    eligibility = 'Class 12 PCB/PCM (50%+)';
    entranceExams = ['State Pharmacy CET', 'NEET UG (some states)'];
    avgFees = '₹2L – ₹10L total';
    avgSalary = '₹3.5L – ₹8.0L /yr';
    difficulty = 'Moderate';
    topColleges = ['jamia-hamdard', 'bits-pilani', 'manipal', 'ict-mumbai'];
    degree = foundCourseName;
    recognition = 'PCI (Pharmacy Council of India)';
  } else if (foundCategoryName === 'Nursing') {
    duration = foundCourseName === 'B.Sc Nursing' ? '4 Years' : '3 Years';
    eligibility = 'Class 12 PCB (45%+)';
    entranceExams = ['State Nursing CET'];
    avgFees = '₹1.5L – ₹5L total';
    avgSalary = '₹3.0L – ₹6.5L /yr';
    difficulty = 'Moderate';
    topColleges = ['cmc-vellore', 'bhu', 'manipal'];
    degree = foundCourseName;
    recognition = 'INC (Indian Nursing Council)';
  } else if (foundCategoryName === 'Allied Health Sciences') {
    duration = foundCourseName === 'BPT' ? '4.5 Years' : '3 Years';
    eligibility = 'Class 12 PCB (50%+)';
    entranceExams = ['State CET', 'University Entrance'];
    avgFees = '₹2L – ₹8L total';
    avgSalary = '₹3.5L – ₹8.0L /yr';
    difficulty = 'Moderate';
    topColleges = ['delhi-university', 'manipal', 'cmc-vellore'];
    degree = foundCourseName.includes('B.Sc') || foundCourseName.includes('Bachelor') ? foundCourseName : `B.Sc ${foundCourseName}`;
    recognition = 'State Allied Health Councils';
  } else if (foundCategoryName === 'Biotechnology & Bioinformatics') {
    duration = foundCourseName.includes('Integrated') ? '5 Years' : (foundCourseName.includes('B.Tech') ? '4 Years' : '3 Years');
    eligibility = 'Class 12 PCB/PCM (60%+)';
    entranceExams = ['VITEEE', 'MET (Manipal)', 'State CET'];
    avgFees = '₹3L – ₹14L total';
    avgSalary = '₹5.0L – ₹10.0L /yr';
    difficulty = 'Hard';
    topColleges = ['vit', 'manipal', 'curaj'];
    degree = foundCourseName.includes('B.Tech') ? 'B.Tech' : 'B.Sc';
    recognition = 'AICTE / UGC';
  } else if (foundCategoryName === 'Life Sciences') {
    duration = '3 Years';
    eligibility = 'Class 12 PCB (50%+)';
    entranceExams = ['CUET UG', 'State CET'];
    avgFees = '₹1L – ₹4L total';
    avgSalary = '₹3.0L – ₹6.0L /yr';
    difficulty = 'Moderate';
    topColleges = ['delhi-university', 'bhu', 'manipal'];
    degree = `B.Sc ${foundCourseName}`;
    recognition = 'UGC';
  } else if (foundCategoryName === 'Agriculture & Food Sciences') {
    duration = '4 Years';
    eligibility = 'Class 12 PCB/PCM/Agriculture (50%+)';
    entranceExams = ['ICAR AIEEA', 'State Agriculture CET'];
    avgFees = '₹1.5L – ₹5L total';
    avgSalary = '₹3.5L – ₹7.5L /yr';
    difficulty = 'Moderate';
    topColleges = ['bhu', 'vit'];
    degree = foundCourseName.includes('B.Tech') ? 'B.Tech' : 'B.Sc';
    recognition = 'ICAR / UGC';
  } else if (foundCategoryName === 'Veterinary Sciences') {
    duration = '5.5 Years';
    eligibility = 'Class 12 PCB (50%+) + NEET UG qualified';
    entranceExams = ['NEET UG', 'State Veterinary CET'];
    avgFees = '₹1L – ₹8L total';
    avgSalary = '₹6.0L – ₹12.0L /yr';
    difficulty = 'Hard';
    topColleges = ['bhu'];
    degree = 'BVSc & AH';
    recognition = 'VCI (Veterinary Council of India)';
  } else if (foundCategoryName === 'Psychology') {
    duration = '3 Years';
    eligibility = 'Class 12 any stream (50%+)';
    entranceExams = ['CUET UG', 'Merit-based'];
    avgFees = '₹1L – ₹5L total';
    avgSalary = '₹3.0L – ₹7.0L /yr';
    difficulty = 'Moderate';
    topColleges = ['delhi-university', 'manipal'];
    degree = foundCourseName.includes('BA') ? 'BA' : 'B.Sc';
    recognition = 'UGC / RCI (Rehabilitation Council)';
  }

  const relatedCourseSlugs = careersData.categories
    .find(c => c.name === foundCategoryName)
    ?.courses.filter(x => x.slug !== slug)
    .map(x => x.slug)
    .slice(0, 3) || [];

  return {
    slug,
    title: foundCourseName,
    category: foundCategoryName,
    categoryEmoji: foundCategoryEmoji,

    hero: {
      title: foundCourseName,
      subtitle: `Explore premium career tracks, average salaries, admission processes, and the future scope of ${foundCourseName} in India.`,
      degree,
      duration,
      eligibility,
      difficulty,
      avgSalary,
      avgFees,
    },

    overview: {
      duration,
      eligibility,
      entranceExams,
      avgFees,
      avgSalary,
      degreeType: 'Undergraduate Degree',
      courseLevel: 'Bachelor\'s',
      studyMode: 'Full-time (on-campus)',
      recognition,
    },

    snapshot: {
      metrics: [
        { label: 'Future Demand', rating: 4, description: 'Growing industry requirements and job options' },
        { label: 'Placement Potential', rating: 3, description: 'Dependent on college ranking and internship experience' },
        { label: 'Government Job Scope', rating: 3, description: 'Available through specific state/union vacancies' },
        { label: 'Higher Study Requirement', rating: 4, description: 'Master\'s/Specialization improves career trajectory' },
        { label: 'Abroad Opportunities', rating: 3, description: 'Requires clearing regional licensing/entrance exams' }
      ]
    },

    goodFor,
    avoidIf,

    careerRoadmap: [
      {
        id: 'entry',
        title: `Junior ${foundCourseName} Professional`,
        description: 'Entry-level work in clinical, research, or administrative environments.',
        salary: '₹3L – ₹6L LPA',
        children: [
          {
            id: 'mid',
            title: `Senior ${foundCourseName} Specialist`,
            description: 'Independent consultant, project leader, or quality analyst.',
            salary: '₹7L – ₹15L LPA',
            children: [
              {
                id: 'lead',
                title: 'Principal / VP / Director',
                description: 'Leadership positions managing whole projects, clinics, or research divisions.',
                salary: '₹18L – ₹35L+ LPA'
              }
            ]
          }
        ]
      }
    ],

    salaryTimeline: [
      { label: 'Fresher', range: '₹3.5L – ₹6L /yr', description: 'Junior / Associate trainee roles' },
      { label: '2 Years', range: '₹5L – ₹9L /yr', description: 'Experienced technical consultant or specialist' },
      { label: '5 Years', range: '₹8L – ₹15L /yr', description: 'Senior scientist, lead practitioner, or manager' },
      { label: '10+ Years', range: '₹15L – ₹30L+ /yr', description: 'Head, VP, or Principal Director' }
    ],

    admissionProcess: [
      { step: 1, title: 'Complete Class 12', description: 'Score minimum 50%–60% aggregate with Physics, Chemistry, and Biology (PCB).', icon: '📚' },
      { step: 2, title: 'Appear for Entrance Exams', description: `Take relevant entrance exams such as ${entranceExams.join(', ')} depending on target college.`, icon: '📝' },
      { step: 3, title: 'Counseling & Seat Selection', description: 'Apply through university admission portals or state counselling rounds with your rank.', icon: '🏛️' },
      { step: 4, title: 'Document Verification', description: 'Submit educational certificates, identity proofs, and counseling allotment letters.', icon: '📑' },
      { step: 5, title: 'Enroll & Begin Course', description: `Pay academic fees and start your degree journey in ${foundCourseName}.`, icon: '🎓' }
    ],

    topCollegeIds: topColleges,

    semesterRoadmap: [
      {
        year: 1,
        title: 'Foundational Studies',
        description: 'Core concepts in basic sciences and introduction to the discipline.',
        subjects: [
          { name: 'Introduction to Applied Sciences', type: 'theory' },
          { name: 'Human Biology & Chemistry Foundations', type: 'theory' },
          { name: 'Professional Communication', type: 'theory' },
          { name: 'Introductory Practical Lab', type: 'practical' }
        ]
      },
      {
        year: 2,
        title: 'Core Methodologies',
        description: 'Deep dive into intermediate analytical methods, theories, and special focus topics.',
        subjects: [
          { name: 'Core Theory Paper I', type: 'theory' },
          { name: 'Core Theory Paper II', type: 'theory' },
          { name: 'Advanced Laboratory Methods', type: 'practical' }
        ]
      },
      {
        year: 3,
        title: 'Specializations & Applications',
        description: 'Advanced methodologies, elective courses, and research preparation.',
        subjects: [
          { name: 'Specialization Subject I', type: 'theory' },
          { name: 'Elective Specialization', type: 'theory' },
          { name: 'Mini-Project / Case Study', type: 'project' }
        ]
      },
      {
        year: 4,
        title: 'Professional Internship & Thesis',
        description: 'Real-world hospital / industry internship and dissertation final project.',
        subjects: [
          { name: 'Industrial / Clinical Internship', type: 'internship' },
          { name: 'Final Major Project & Viva Voce', type: 'project' }
        ]
      }
    ],

    futureScope: [
      { title: 'Core Industry / Clinical Practice', icon: '🏥', description: `Direct employment in hospitals, private labs, or industries specialized in ${foundCourseName}.`, opportunities: ['Private Clinic / Hospital', 'MNCs & Research Labs', 'Quality Analyst Roles'] },
      { title: 'Research & Academia', icon: '🔬', description: 'Pursue Master\'s (M.Sc/M.Tech/M.Pharm) followed by PhD and work as researcher or professor.', opportunities: ['Research Fellowships', 'University Faculty', 'National Labs'] },
      { title: 'Government Jobs', icon: '🏛️', description: 'Apply for central or state government vacancies, public sector undertakings, or civil services.', opportunities: ['State Officer Posts', 'Public Sector Labs', 'UPSC CSE Pathway'] }
    ],

    faq: [
      { question: `Is NEET compulsory for admission to ${foundCourseName}?`, answer: foundCategoryName === 'Medical & Clinical Careers' || foundCategoryName === 'Veterinary Sciences' ? 'Yes, NEET UG qualification is mandatory for all clinical programs in India including this.' : `No, NEET is not required. Admissions are based on state CETs, university-specific exams, or Class 12 board marks.` },
      { question: `What is the future growth scope of ${foundCourseName}?`, answer: 'Excellent. The Indian healthcare, biotechnology, and agricultural sectors are expanding rapidly, opening thousands of positions in clinical, research, and corporate sectors annually.' },
      { question: `Can I practice independently after completing ${foundCourseName}?`, answer: foundCategoryName === 'Medical & Clinical Careers' || foundCategoryName === 'Veterinary Sciences' || foundCategoryName === 'Nursing' || foundCourseName === 'BPT' ? 'Yes. Upon registering with the respective national or state professional councils, you can practice independently, open your clinic, or join clinical consulting teams.' : 'Generally no. Graduates work in laboratory divisions, hospitals, management, or research institutions as specialized consultants.' }
    ],
    relatedCourseSlugs
  };
}

export function getCourseBySlug(slug: string): CourseData | undefined {
  const customCourse = courseRegistry.get(slug);
  if (customCourse) return customCourse;

  // Fallback generation for all other courses in careersData
  const fallback = generateFallbackCourse(slug);
  if (fallback) {
    courseRegistry.set(slug, fallback);
    return fallback;
  }

  return undefined;
}
