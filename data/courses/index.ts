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
  } else if (foundCategoryName === 'Computing & Tech') {
    duration = foundCourseName.includes('M.Sc') ? '2 Years' : '3 Years';
    eligibility = foundCourseName.includes('M.Sc') ? 'Graduation (50%+)' : 'Class 12 any stream (50%+)';
    entranceExams = ['CUET UG', 'Merit-based', 'University Entrance'];
    avgFees = '₹1.5L – ₹5L total';
    avgSalary = '₹3.5L – ₹10.0L /yr';
    difficulty = 'Moderate';
    topColleges = ['delhi-university', 'vit', 'manipal'];
    degree = foundCourseName === 'BCA' ? 'BCA' : (foundCourseName.includes('M.Sc') ? 'M.Sc' : 'B.Sc');
    recognition = 'UGC';
  }

  const relatedCourseSlugs = careersData.categories
    .find(c => c.name === foundCategoryName)
    ?.courses.filter(x => x.slug !== slug)
    .map(x => x.slug)
    .slice(0, 3) || [];

  const fallbackBase = {
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
        { label: 'Higher Study Requirement', rating: 4, description: 'Master\'s/Specialization improves career trajectory' }
      ]
    },
    goodFor,
    avoidIf,
    topCollegeIds: topColleges
  };

  // ─── CONTEXT-AWARE CONTENT GENERATION ───
  let careerRoadmap: any[] = [];
  let admissionProcess: any[] = [];
  let semesterRoadmap: any[] = [];
  let futureScope: any[] = [];
  let faq: any[] = [];
  let salaryTimeline: any[] = [];
  let snapshot: any = null;

  const isNonClinical = foundCategoryName === 'Computing & Tech' || foundCategoryName === 'Management' || foundCategoryName === 'Design';

  if (isNonClinical) {
    if (foundCategoryName === 'Computing & Tech') {
      snapshot = {
        metrics: [
          { label: 'Future Demand', rating: 4.8, description: 'Exceptional demand for software developers, cloud architects, and data engineers globally.' },
          { label: 'Placement Potential', rating: 4.5, description: 'Excellent placement rates in top IT hubs with active campus hiring.' },
          { label: 'Government Job Scope', rating: 3.5, description: 'Technical officer roles in NIC, PSUs, and public sector banks.' },
          { label: 'Higher Study Requirement', rating: 3.0, description: 'MCA/M.Tech is optional; skills and portfolios are primary for initial hiring.' }
        ]
      };
      goodFor = [
        "You are passionate about coding, algorithms, software development, or cloud architecture.",
        "You enjoy solving logical puzzles, database queries, or designing interactive web products.",
        "You want a high-paying software career in India or remote opportunities abroad."
      ];
      avoidIf = [
        "You expect to pass without regular coding practice or building hands-on projects.",
        "You prefer physical clinical patient care, laboratory work, or mechanical operations.",
        "You dislike rapid technology updates and learning new coding frameworks."
      ];
      careerRoadmap = [
        {
          id: 'entry-tech',
          title: 'Software Developer / QA Analyst',
          description: 'Build, test, and maintain software programs or cloud services.',
          salary: '₹4L – ₹8L LPA',
          children: [
            {
              id: 'mid-tech',
              title: 'Senior Developer / Architect / Tech Lead',
              description: 'Design system architectures, lead sprints, and manage technical stacks.',
              salary: '₹9L – ₹18L LPA',
              children: [
                {
                  id: 'lead-tech',
                  title: 'Engineering Director / VP of Tech / CTO',
                  description: 'Define technical vision, scale architectures, and manage engineering departments.',
                  salary: '₹22L – ₹50L+ LPA'
                }
              ]
            }
          ]
        },
        {
          id: 'entry-data',
          title: 'Data Analyst / Database Administrator',
          description: 'Manage data pipelines, analyze databases, and construct reporting dashboards.',
          salary: '₹3.5L – ₹7L LPA',
          children: [
            {
              id: 'mid-data',
              title: 'Data Scientist / Business Intelligence Lead',
              description: 'Develop predictive models, design corporate data workflows, and lead analytics teams.',
              salary: '₹8L – ₹16L LPA',
              children: [
                {
                  id: 'lead-data',
                  title: 'Chief Data Officer / Director of Analytics',
                  description: 'Steer enterprise-wide business intelligence strategies and analytics divisions.',
                  salary: '₹20L – ₹45L+ LPA'
                }
              ]
            }
          ]
        }
      ];
      semesterRoadmap = [
        {
          year: 1,
          title: 'Foundational Coding',
          description: 'Basic computational thinking, mathematics, and introductory languages.',
          subjects: [
            { name: 'Introduction to Programming (C/Python)', type: 'theory' },
            { name: 'Computer Architecture & Systems', type: 'theory' },
            { name: 'Discrete Mathematics', type: 'theory' },
            { name: 'Programming Laboratory I', type: 'practical' }
          ]
        },
        {
          year: 2,
          title: 'Data Structures & Databases',
          description: 'Intermediate algorithms, data structures, and database engines.',
          subjects: [
            { name: 'Data Structures & Algorithms', type: 'theory' },
            { name: 'Database Management Systems', type: 'theory' },
            { name: 'Web Programming Technologies', type: 'theory' },
            { name: 'Database & DSA Practical Lab', type: 'practical' }
          ]
        },
        {
          year: 3,
          title: 'Specialized Tech & Cloud',
          description: 'Advanced engineering paradigms, cloud instances, and portfolio mini-projects.',
          subjects: [
            { name: 'Software Engineering Methodologies', type: 'theory' },
            { name: 'Cloud Computing & Virtualization', type: 'theory' },
            { name: 'Core Elective (AI/ML or CyberSecurity)', type: 'theory' },
            { name: 'Mini-Project Portfolio Build', type: 'project' }
          ]
        },
        {
          year: 4,
          title: 'Capstone & Placement Prep',
          description: 'Final major project development, internship milestones, and corporate interviews.',
          subjects: [
            { name: 'Major Capstone Project', type: 'project' },
            { name: 'Corporate Internship / Industry Project', type: 'internship' }
          ]
        }
      ];
    } else if (foundCategoryName === 'Design') {
      snapshot = {
        metrics: [
          { label: 'Future Demand', rating: 4.6, description: 'High demand for UX/UI designers, product stylists, and brand identity creators.' },
          { label: 'Placement Potential', rating: 4.2, description: 'Strong placements in design agencies, tech giants, and product startups.' },
          { label: 'Government Job Scope', rating: 2.0, description: 'Limited direct roles; mostly restricted to public department media wings.' },
          { label: 'Higher Study Requirement', rating: 2.5, description: 'Industry portfolios and project showcases matter far more than Master\'s degrees.' }
        ]
      };
      goodFor = [
        "You are passionate about user experience, art direction, and visual styling.",
        "You enjoy sketching, mapping user journeys, or styling custom design systems.",
        "You want a creative career path with direct corporate value."
      ];
      avoidIf = [
        "You prefer structured mathematical calculations and raw coding over creative visual brainstorming.",
        "You dislike iterative revisions based on user testing and corporate feedback."
      ];
      careerRoadmap = [
        {
          id: 'entry-design',
          title: 'UI/UX Designer / Visual Artist',
          description: 'Create interface layouts, style guides, and initial vector graphics.',
          salary: '₹4L – ₹7L LPA',
          children: [
            {
              id: 'mid-design',
              title: 'Senior Product Designer / Art Director',
              description: 'Lead visual design systems, user experience strategy, and asset guidelines.',
              salary: '₹8L – ₹16L LPA',
              children: [
                {
                  id: 'lead-design',
                  title: 'Design Director / VP of Design / Chief Creative Officer',
                  description: 'Oversee corporate creative vision, design departments, and brand identity.',
                  salary: '₹20L – ₹40L+ LPA'
                }
              ]
            }
          ]
        }
      ];
      semesterRoadmap = [
        {
          year: 1,
          title: 'Design Fundamentals',
          description: 'Visual thinking, typography, freehand sketching, and shape geometry.',
          subjects: [
            { name: 'Introduction to Visual Arts', type: 'theory' },
            { name: 'Drawing & Anatomy Representation', type: 'practical' },
            { name: 'History of Art & Design', type: 'theory' },
            { name: 'Design Tools Lab I (Vector/Raster)', type: 'practical' }
          ]
        },
        {
          year: 2,
          title: 'Interface & Mediums',
          description: 'Digital tools, ergonomics, style definitions, and color theory.',
          subjects: [
            { name: 'UI Design Principles', type: 'theory' },
            { name: 'User Experience & Research Methods', type: 'theory' },
            { name: 'Product Styling & Identity', type: 'theory' },
            { name: 'Interaction Lab II', type: 'practical' }
          ]
        },
        {
          year: 3,
          title: 'Specialized Media',
          description: 'Advanced prototyping tools, portfolio building, and interactive systems.',
          subjects: [
            { name: 'Design Systems & Libraries', type: 'theory' },
            { name: 'Information Architecture', type: 'theory' },
            { name: 'Specialization Project I', type: 'project' }
          ]
        },
        {
          year: 4,
          title: 'Major Portfolio & Internships',
          description: 'Capstone creative projects, studio internship, and jury presentations.',
          subjects: [
            { name: 'Final Portfolio & Capstone Project', type: 'project' },
            { name: 'Design Studio Internship', type: 'internship' }
          ]
        }
      ];
    } else {
      snapshot = {
        metrics: [
          { label: 'Future Demand', rating: 4.5, description: 'Consistent corporate demand for management trainees, sales coordinators, and managers.' },
          { label: 'Placement Potential', rating: 4.0, description: 'Good placement options in finance, marketing, and operations divisions.' },
          { label: 'Government Job Scope', rating: 3.0, description: 'Administrative and administrative officer positions in government agencies.' },
          { label: 'Higher Study Requirement', rating: 4.8, description: 'An MBA from a top-tier institute significantly boosts long-term career growth.' }
        ]
      };
      goodFor = [
        "You are passionate about leading teams, corporate operations, and business logic.",
        "You enjoy studying company metrics, financial bookkeeping, or client management.",
        "You want a corporate management pathway leading to executive leadership."
      ];
      avoidIf = [
        "You prefer pure theoretical research or technical software development over daily human communication.",
        "You dislike public speaking, case analysis presentations, or corporate reports."
      ];
      careerRoadmap = [
        {
          id: 'entry-mgmt',
          title: 'Management Trainee / Operations Analyst',
          description: 'Handle operations tracking, reporting, and associate business administration.',
          salary: '₹3.5L – ₹6L LPA',
          children: [
            {
              id: 'mid-mgmt',
              title: 'Business Manager / Department Lead',
              description: 'Manage sales targets, team coordinates, operations planning, and corporate budgets.',
              salary: '₹7.5L – ₹15L LPA',
              children: [
                {
                  id: 'lead-mgmt',
                  title: 'General Manager / Director / COO / CEO',
                  description: 'Define strategic goals, drive organizational scaling, and lead business divisions.',
                  salary: '₹18L – ₹40L+ LPA'
                }
              ]
            }
          ]
        }
      ];
      semesterRoadmap = [
        {
          year: 1,
          title: 'Principles of Management',
          description: 'Foundations of organization, communication, and accounting.',
          subjects: [
            { name: 'Principles of Business Administration', type: 'theory' },
            { name: 'Financial Accounting & Bookkeeping', type: 'theory' },
            { name: 'Business Communication', type: 'theory' },
            { name: 'IT Applications Lab', type: 'practical' }
          ]
        },
        {
          year: 2,
          title: 'Core Functional Areas',
          description: 'Marketing, human resources, organizational behavior, and stats.',
          subjects: [
            { name: 'Marketing Management', type: 'theory' },
            { name: 'Human Resource Management', type: 'theory' },
            { name: 'Business Statistics & Analysis', type: 'theory' },
            { name: 'Case Study Presentations', type: 'practical' }
          ]
        },
        {
          year: 3,
          title: 'Strategy & Specialization',
          description: 'Corporate finance, project metrics, electives, and mini-case-studies.',
          subjects: [
            { name: 'Strategic Management', type: 'theory' },
            { name: 'Financial Management Foundations', type: 'theory' },
            { name: 'Industry Case Analysis Project', type: 'project' }
          ]
        },
        {
          year: 4,
          title: 'Corporate Internship & Capstone',
          description: 'Corporate business internships, final major project reports.',
          subjects: [
            { name: 'Corporate Business Internship', type: 'internship' },
            { name: 'Final Management Capstone Project', type: 'project' }
          ]
        }
      ];
    }

    admissionProcess = [
      { step: 1, title: 'Complete Class 12', description: 'Score minimum 50%–60% aggregate in Class 12 from any stream.', icon: '📚' },
      { step: 2, title: 'Appear for Entrance Exams', description: `Take relevant entrance exams such as ${entranceExams.join(', ')} depending on target college.`, icon: '📝' },
      { step: 3, title: 'Counseling & Seat Selection', description: 'Apply through university admission portals or state counselling rounds with your rank/merit list.', icon: '🏛️' },
      { step: 4, title: 'Document Verification', description: 'Submit educational certificates, identity proofs, and counseling allotment letters.', icon: '📑' },
      { step: 5, title: 'Enroll & Begin Course', description: `Pay academic fees and start your degree journey in ${foundCourseName}.`, icon: '🎓' }
    ];

    futureScope = [
      { title: 'Corporate Sector & MNCs', icon: '🏢', description: `Direct employment in top firms, tech hubs, or start-up enterprises as specialized ${foundCourseName} experts.`, opportunities: ['MNC Consultant', 'Tech Startups', 'Product Analyst'] },
      { title: 'Entrepreneurship & Freelancing', icon: '🚀', description: 'Establish your own consulting firm, SaaS product, design agency, or work as a remote freelancer.', opportunities: ['Freelance Projects', 'SaaS Business Launch', 'Design Agency'] },
      { title: 'Government & Banking Tech', icon: '🏛️', description: 'Apply for public sector technical positions, public administration, or banking tech cells.', opportunities: ['Technical Officer', 'Public Services (UPSC)', 'State Corporate Sector'] }
    ];

    faq = [
      { question: `What are the admission requirements for ${foundCourseName}?`, answer: `Admissions are based on Class 12 board marks (minimum 50%–60% aggregate), state-level CETs, or university-specific entrance exams. NEET or science stream constraints do not apply.` },
      { question: `What is the future growth scope of ${foundCourseName}?`, answer: 'Excellent. The digital economy, enterprise software, data analytics, and design consulting are growing rapidly, creating thousands of high-paying jobs annually.' },
      { question: `Can I work as a freelancer or start an agency after completing ${foundCourseName}?`, answer: 'Yes. Graduates can work as independent freelancers, digital consultants, launch startups, open custom agencies, or work remotely with global corporate teams.' }
    ];
    salaryTimeline = [
      { label: 'Fresher', range: '₹3.5L – ₹6L /yr', description: 'Junior Developer / Operations Associate trainee roles' },
      { label: '2 Years', range: '₹5L – ₹9L /yr', description: 'Experienced consultant, engineer, or specialist' },
      { label: '5 Years', range: '₹8L – ₹15L /yr', description: 'Senior engineer, lead practitioner, or team lead' },
      { label: '10+ Years', range: '₹15L – ₹30L+ /yr', description: 'Head of Tech, Director, or VP' }
    ];
  } else {
    snapshot = {
      metrics: [
        { label: 'Future Demand', rating: 4.2, description: 'Consistent requirements across clinical practice, research labs, and hospitals.' },
        { label: 'Placement Potential', rating: 3.8, description: 'Reliable placements in private clinics, hospitals, and diagnostic lines.' },
        { label: 'Government Job Scope', rating: 4.5, description: 'Excellent scope through state medical services and public health centers.' },
        { label: 'Higher Study Requirement', rating: 4.7, description: 'PG specializations/diplomas are highly recommended for practice.' }
      ]
    };
    careerRoadmap = [
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
    ];

    admissionProcess = [
      { step: 1, title: 'Complete Class 12', description: 'Score minimum 50%–60% aggregate with Physics, Chemistry, and Biology (PCB).', icon: '📚' },
      { step: 2, title: 'Appear for Entrance Exams', description: `Take relevant entrance exams such as ${entranceExams.join(', ')} depending on target college.`, icon: '📝' },
      { step: 3, title: 'Counseling & Seat Selection', description: 'Apply through university admission portals or state counselling rounds with your rank.', icon: '🏛️' },
      { step: 4, title: 'Document Verification', description: 'Submit educational certificates, identity proofs, and counseling allotment letters.', icon: '📑' },
      { step: 5, title: 'Enroll & Begin Course', description: `Pay academic fees and start your degree journey in ${foundCourseName}.`, icon: '🎓' }
    ];

    semesterRoadmap = [
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
    ];

    futureScope = [
      { title: 'Core Industry / Clinical Practice', icon: '🏥', description: `Direct employment in hospitals, private labs, or industries specialized in ${foundCourseName}.`, opportunities: ['Private Clinic / Hospital', 'MNCs & Research Labs', 'Quality Analyst Roles'] },
      { title: 'Research & Academia', icon: '🔬', description: 'Pursue Master\'s (M.Sc/M.Tech/M.Pharm) followed by PhD and work as researcher or professor.', opportunities: ['Research Fellowships', 'University Faculty', 'National Labs'] },
      { title: 'Government Jobs', icon: '🏛️', description: 'Apply for central or state government vacancies, public sector undertakings, or civil services.', opportunities: ['State Officer Posts', 'Public Sector Labs', 'UPSC CSE Pathway'] }
    ];

    faq = [
      { question: `Is NEET compulsory for admission to ${foundCourseName}?`, answer: foundCategoryName === 'Medical & Clinical Careers' || foundCategoryName === 'Veterinary Sciences' ? 'Yes, NEET UG qualification is mandatory for all clinical programs in India including this.' : `No, NEET is not required. Admissions are based on state CETs, university-specific exams, or Class 12 board marks.` },
      { question: `What is the future growth scope of ${foundCourseName}?`, answer: 'Excellent. The Indian healthcare, biotechnology, and agricultural sectors are expanding rapidly, opening thousands of positions in clinical, research, and corporate sectors annually.' },
      { question: `Can I practice independently after completing ${foundCourseName}?`, answer: foundCategoryName === 'Medical & Clinical Careers' || foundCategoryName === 'Veterinary Sciences' || foundCategoryName === 'Nursing' || foundCourseName === 'BPT' ? 'Yes. Upon registering with the respective national or state professional councils, you can practice independently, open your clinic, or join clinical consulting teams.' : 'Generally no. Graduates work in laboratory divisions, hospitals, management, or research institutions as specialized consultants.' }
    ];
    salaryTimeline = [
      { label: 'Fresher', range: '₹3.5L – ₹6L /yr', description: 'Junior clinician / Associate trainee roles' },
      { label: '2 Years', range: '₹5L – ₹9L /yr', description: 'Experienced consultant or specialist' },
      { label: '5 Years', range: '₹8L – ₹15L /yr', description: 'Senior scientist, lead practitioner, or manager' },
      { label: '10+ Years', range: '₹15L – ₹30L+ /yr', description: 'Head, VP, or Principal Director' }
    ];
  }

  return {
    ...fallbackBase,
    careerRoadmap,
    admissionProcess,
    semesterRoadmap,
    futureScope,
    faq,
    salaryTimeline,
    goodFor,
    avoidIf,
    snapshot,
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
