import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  Sparkles, 
  ArrowLeft, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  FileText, 
  Compass, 
  TrendingDown, 
  Coins, 
  Layers
} from 'lucide-react';
import careersData from '../data/careersData.json';
import '../css/explore.css';

// Specialized course details lookup
const courseDetailsData = {
  "mbbs": {
    title: "MBBS (Bachelor of Medicine, Bachelor of Surgery)",
    salary: "₹8.0L - ₹24.0L Starting Per Annum",
    demand: "Permanent High Demand (Clinical)",
    duration: "5.5 Years (incl. 1 Year Internship)",
    exams: "NEET UG",
    description: "The gold standard of medical practice. A rigorous 5.5-year clinical degree focused on human anatomy, pharmacology, pathology, and surgical basics, followed by a mandatory 1-year clinical rotation internship.",
    pros: [
      "Absolute prestige and direct clinical practice rights.",
      "Highest job security and public sector health opportunities.",
      "Ability to pursue MD/MS specializations in cardiology, neurosurgery, etc."
    ],
    cons: [
      "Extremely long study trajectory (usually 8-12 years including PG).",
      "Massive entry-level competition (NEET UG score requirements are vertical)."
    ],
    expertAdvice: "Focus on your concepts from day one. Do not just memorize; understand clinical associations. Build good patient bedside manner early, and start thinking about postgrad preparation (NEET PG / NEXT) by your third year.",
    postGradPathways: [
      { name: "MD/MS Specialization", desc: "Advanced specialization in fields like Pediatrics, Surgery, Radiology, or Internal Medicine.", careerOutcome: "Consultant Specialist Physician" }
    ]
  },
  "btech-biotechnology": {
    title: "Biotechnology & Biological Process Engineering",
    salary: "₹5.5L - ₹12.0L Starting Per Annum",
    demand: "Exponential Growth",
    duration: "4 Years",
    exams: "JEE Main / GAT-B / State Entrance",
    description: "An ultra-modern, elite intersection of microbiology, laboratory gene editing, and bulk chemical process engineering. You will handle bioreactor scalability, protein modifications, vaccine creation, or crop DNA improvements. Ideal for students with persistent scientific research minds.",
    pros: [
      "Massive post-pandemic capital investments globally into preventive vaccine diagnostics and monoclonal antibodies.",
      "Clear legal pathways to transition into fully-funded MS/PhD research slots in leading US or European labs.",
      "Highly lucrative non-clinical transition opportunities into strategic Biotech consulting or patent auditing."
    ],
    cons: [
      "Domestic laboratory scientist starting packages are competitive and initially modest compared to direct IT lines.",
      "Almost mandatory to pair B.Sc/B.Tech with a postgraduate (M.Tech, MBA, or PhD) to capture executive lead titles."
    ],
    expertAdvice: "Specialization is your ultimate armor! Don't just settle for academic notes — master actual physical laboratory protocols like HPLC, qPCR, CRISPR sequences, and bioreactor metrics. If you want direct financial safety, pursue a Biotech MBA right after; if you prefer pure research, start prepping for central GATE-B/IIT-JAM from your 2nd year.",
    postGradPathways: [
      { name: "IIT-JAM / GAT-B MSc-MTech", desc: "Gain admissions into premier Central Institutes (IITs/NCBS) with full stipend research support.", careerOutcome: "Genetics Lab Director" },
      { name: "Pharma & Biotech Management MBA", desc: "Corporate operations, product logistics, and clinical trial strategy roles at global pharma conglomerates.", careerOutcome: "Pharma Brand Manager" }
    ]
  },
  "btech-bioinformatics": {
    title: "B.Tech Bioinformatics & Computational Biology",
    salary: "₹6.0L - ₹14.0L Starting Per Annum",
    demand: "Extremely High (Genomics & AI Boom)",
    duration: "4 Years",
    exams: "JEE Main / GAT-B / State Entrance",
    description: "The computational vanguard of life sciences. This degree merges biology with programming, database algorithms, and data science. You will build and run computational pipelines to analyze massive DNA sequencing datasets (NGS), perform molecular dynamics simulation for drug discovery, and program scripts to analyze metabolic pathways.",
    pros: [
      "Outstanding, high-paying career avenues in computational genomics, DNA profiling, and global healthcare tech.",
      "Very high transition capability into core tech fields like Data Science, Machine Learning, and Cloud Architecture.",
      "Abundant, fully-funded research slots in top international universities for MS and PhD programs."
    ],
    cons: [
      "Requires a strong math, statistics, and programming foundation (Python, R, Linux, SQL) which can have a steep learning curve.",
      "Limited entry-level laboratory options for students who prefer hands-on wet-lab pipette work over sitting at a monitor."
    ],
    expertAdvice: "Code, code, code! Don't just study biology; build actual bioinformatics toolkits. Learn Python (Biopython), R (Bioconductor), Git, and Linux terminal operations. Contribute to open-source bio projects on GitHub. Try to secure an internship at a genomics research institute like CSIR-IGIB or NCBS early.",
    postGradPathways: [
      { name: "MS/PhD in Computational Biology & Genomics", desc: "Advanced training in structural biology, structural bioinformatics, and cloud-scale genomics data pipelines.", careerOutcome: "Lead Genomics Scientist" },
      { name: "M.Tech in Data Science & Machine Learning", desc: "Leverage your computational background to pivot into high-paying AI engineering roles in the healthcare or fintech sectors.", careerOutcome: "Healthcare AI Architect" }
    ]
  },
  "bpt": {
    title: "BPT Clinical Physiotherapy & Sports Rehab",
    salary: "₹6.0L - ₹15.0L Starting Per Annum",
    demand: "Extremely High (Geriatric & Corporate)",
    duration: "4.5 Years (incl. 6 months Internship)",
    exams: "State CET / NEET UG / College Exam",
    description: "A highly respected autonomous clinical medicine branch. Physiotherapists evaluate, diagnose, and rehabilitate patients suffering from physical injuries, spinal traumas, arthritic degeneration, and muscular disorders using physical manipulations, dry needling, and sports biomechanics.",
    pros: [
      "Grants legal right to use 'Dr.' prefix and operate fully independent clinical therapy rooms without dependency on main hospital referrals.",
      "High secondary revenue from orthopaedic home-care consultations, chiropractic studios, and elite gym alignments.",
      "Massive surge in urban demand driven by sedentary lifestyle disorders, postural defects, and athletic sports academies."
    ],
    cons: [
      "Demands continuous physical energy to execute repetitive physical patient manipulations and chiropractic adjustments.",
      "Substantial initial patience is key to establishing private clinic reputations and trust circles."
    ],
    expertAdvice: "Clinical diagnostics and human relations are what make or break your practice. Spend maximum internship hours in large trauma wards learning hand adjustments, osteopathy, dry needling, and sports medicine. A warm, confident patient-side manner is your best marketing tool!",
    postGradPathways: [
      { name: "M.PT Sports Physiotherapy", desc: "Premier post-grad specialization focused on managing elite national athletic academies, football clubs, and track teams.", careerOutcome: "Chief Team Physio" },
      { name: "Fellowship in Chiropractic adjustments", desc: "Advanced osteopathic training in spine realignments, trauma release, and dry needling.", careerOutcome: "Private Spine Practitioner" }
    ]
  },
  "bsc-nursing": {
    title: "B.Sc Nursing Critical Care Specialist",
    salary: "₹3.8L - ₹7.0L (Domestic) / ₹45.0L - ₹85.0L (Global Visa)",
    demand: "Acute Global Staff Deficits",
    duration: "4 Years",
    exams: "NEET UG / State Nursing Entrance",
    description: "The core, indispensable pillar of clinical patient support. B.Sc Nursing graduates administer high-end emergency therapeutics, operate life-saving medical gear, monitor patient recovery trajectories, and collaborate with surgeons in emergency ICUs.",
    pros: [
      "Unparalleled, absolute job security. 100% of licensed critical-care graduates receive immediate hospital postings.",
      "The absolute fastest, most reliable professional green-card immigration route (USA, UK, Australia, Canada).",
      "High emotional fulfillment with direct, hands-on control of advanced clinical pharmacology."
    ],
    cons: [
      "Physically demanding schedules including extended night rotations, intensive emergency wards stress, and shifts during holidays.",
      "Domestic hospital starting salaries in smaller private setups can feel disproportionately modest for the effort."
    ],
    expertAdvice: "Plan your global ticket from day one! Start preparing for English proficiency exams (IELTS/OET) and the Western licensing examination (NCLEX-RN) during your 3rd academic year. Secure 1 year of continuous ICU experience in a large JCI-accredited hospital in India to make yourself highly desirable to premium US/UK healthcare recruiters.",
    postGradPathways: [
      { name: "NCLEX-RN US Registered Nurse", desc: "Pass the American state boards to secure clinical positions in California or Texas with full visa sponsor packages.", careerOutcome: "US Critical Care Nurse" },
      { name: "M.Sc Nurse Practitioner (NP)", desc: "Secure clinical prescribing autonomy, diagnose minor conditions, and lead diagnostic clinical batches.", careerOutcome: "Clinical Nurse Practitioner" }
    ]
  },
  "bsc-agriculture": {
    title: "B.Sc Agriculture & Allied Agribusiness",
    salary: "₹4.5L - ₹8.5L Starting Per Annum",
    demand: "High (AgriTech & Government Services)",
    duration: "4 Years",
    exams: "ICAR AIEEA / CUET / State Exam",
    description: "The scientific backbone of food security. Covers soil chemistry, plant genetics, agronomy, water management, and high-tech agricultural practices.",
    pros: [
      "Large volume of prestigious state government agricultural officer posts.",
      "Rapidly growing corporate roles in private fertilizer, seed, and AgriTech startups.",
      "Abundant entrepreneurial pathways in smart organic farming and export markets."
    ],
    cons: [
      "Fieldwork is heavily rural and outdoor-oriented.",
      "Competitive state exams are required for the top government posts."
    ],
    expertAdvice: "Merge your agricultural knowledge with modern tech like GIS mapping, drone analysis, and hydroponics. Agribusiness management is also extremely lucrative. Prepare for exams like NABARD or state ADA/AO from third year if you want public sector security.",
    postGradPathways: [
      { name: "MBA in Agribusiness Management", desc: "Supply chain management, agricultural marketing, and rural banking operations.", careerOutcome: "Agribusiness Division Head" }
    ]
  },
  "bsc-psychology": {
    title: "B.Sc Clinical & Applied Psychology",
    salary: "₹4.0L - ₹10.0L Starting Per Annum",
    demand: "Surging (Mental Health & Corporate HR)",
    duration: "3 - 4 Years",
    exams: "CUET / College Entrance",
    description: "The science of human behavior, cognitive processes, and emotional patterns. Focuses on developmental psychology, psychotherapy models, and behavioral therapy.",
    pros: [
      "Exploding public awareness and corporate demand for professional counselors.",
      "Flexible career options ranging from clinical therapy to corporate HR training.",
      "High satisfaction through direct therapeutic healing and patient progress."
    ],
    cons: [
      "Mandatory to complete an M.Sc / M.Phil to practice legally as a registered Clinical Psychologist.",
      "Significant initial patience needed to build a stable private client network."
    ],
    expertAdvice: "Get certified in specific therapy modalities (e.g., CBT, ACT, or mindfulness counseling) early. Intern at mental health clinics or corporate wellness companies. Building a strong personal brand on LinkedIn or social media can help accelerate your private practice launch.",
    postGradPathways: [
      { name: "M.Sc & M.Phil Clinical Psychology", desc: "Crucial regulatory qualification to practice as an RCI-registered clinical psychologist.", careerOutcome: "Licensed Clinical Psychologist" }
    ]
  },
  "bsc-forensic-science": {
    title: "B.Sc Forensic Sciences & Criminal Investigation",
    salary: "₹4.5L - ₹9.0L Starting Per Annum",
    demand: "High (Cyber & Criminalistics)",
    duration: "3 Years",
    exams: "CUET / State Entrance",
    description: "A highly specialized applied science degree that teaches analytical chemistry, ballistics, toxicology, DNA profiling, and cyber forensics to assist law enforcement agencies in investigating crimes.",
    pros: [
      "Fascinating and unique laboratory investigative work in police departments, intelligence units, and private security agencies.",
      "Rising corporate demand in digital forensics, insurance fraud investigation, and corporate compliance auditing.",
      "Excellent integration of biology, chemistry, and modern computer science tools."
    ],
    cons: [
      "Strict legal processes and high pressure when delivering expert testimony in courtroom trials.",
      "Initial vacancy counts in state government forensic labs are competitive."
    ],
    expertAdvice: "Focus heavily on cyber forensics and advanced analytical chemistry instrumentation (like GC-MS and PCR). Modern crime analysis is shifting rapidly to the digital domain. Intern at State/Central Forensic Science Laboratories (FSLs) to gain real field exposure.",
    postGradPathways: [
      { name: "M.Sc in Digital Forensics & Cyber Security", desc: "Acquire training to analyze cyber crimes, data breaches, and financial network frauds.", careerOutcome: "Cyber Forensic Consultant" }
    ]
  }
};

// Generates high-fidelity fallbacks for other courses in the database
function generateFallbackDetails(slug, courseName, categoryName) {
  const isTech = slug.startsWith('btech') || slug.includes('bioinfo');
  const isPharm = slug.includes('pharm');
  
  return {
    title: courseName,
    salary: isTech ? "₹5.5L - ₹11.5L Starting Per Annum" : (isPharm ? "₹4.0L - ₹8.5L Starting Per Annum" : "₹3.8L - ₹7.5L Starting Per Annum"),
    demand: isTech ? "High (Industry & Automation)" : "Stable Growth Domain",
    duration: isTech ? "4 Years" : (slug.includes('diploma') || slug.startsWith('d-') ? "2 Years" : "3 Years"),
    exams: isTech ? "JEE / State CET" : "CUET / Merit-Based Admission",
    description: `A premium, specialized study track in ${categoryName.replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD00-\uDFFF]/g, '').trim()} offering immediate corporate integration, great practical laboratory learning, and secure placement options.`,
    pros: [
      "Highly practical, direct real-world utility in consumer safety audits or specialized diagnostic labs.",
      "Predictable working hours and solid workspace safety standards.",
      "Great potential to transition into quality control, scientific content management, or corporate administration."
    ],
    cons: [
      "Requires targeted industry certifications or postgraduate credentials to unlock higher executive salary brackets.",
      "Initial compensation is heavily dependent on the chosen geographic job market."
    ],
    expertAdvice: "Pursue active corporate internships and get certified in quality parameters (e.g., ISO, FSSAI, or GMP) before graduating. Real-world corporate exposure is far more powerful than theoretical scores! Develop strong communication skills to pivot into business roles easily.",
    postGradPathways: [
      { 
        name: `M.Sc / M.Tech in ${courseName} Operations`, 
        desc: "Advanced training in handling large-scale pharmaceutical testing grids, consumer logistics, and regulatory clearances.", 
        careerOutcome: "Clinical Operations Director" 
      }
    ]
  };
}

function CourseDetailPlaceholder() {
  const slug = window.location.pathname.split('/').filter(Boolean).pop() || '';
  
  // Search for the course in our JSON data structure
  let foundCourse = null;
  let foundCategory = null;

  if (careersData && careersData.categories) {
    for (const cat of careersData.categories) {
      const match = cat.courses.find(c => c.slug === slug);
      if (match) {
        foundCourse = match;
        foundCategory = cat;
        break;
      }
    }
  }

  // Fallback styling if not explicitly matched in JSON
  const courseName = foundCourse 
    ? foundCourse.name 
    : slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const categoryName = foundCategory 
    ? `${foundCategory.emoji} ${foundCategory.name}` 
    : 'Career Stream Course';

  // Load either specialized data or generate dynamic fallback
  const details = courseDetailsData[slug] || generateFallbackDetails(slug, courseName, categoryName);

  // Initialize WebGL galaxy background
  useEffect(() => {
    const container = document.getElementById('galaxy-bg');
    if (container && window.initGalaxyBackground) {
      window.initGalaxyBackground(container);
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#020205] text-slate-100 flex flex-col justify-between overflow-x-hidden font-sans text-left">
      {/* WebGL Galaxy background container */}
      <div id="galaxy-bg" className="absolute inset-0 z-0 pointer-events-none opacity-40"></div>

      {/* Ambient background gradients fallback */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-violet-600/10 to-cyan-500/10 blur-[150px] opacity-40"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-cyan-600/10 to-emerald-500/10 blur-[150px] opacity-40"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 w-[90%] max-w-5xl mx-auto mt-6 px-6 py-4 flex items-center justify-between border border-white/5 bg-slate-950/40 backdrop-blur-xl rounded-full">
        <a href="/" className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent tracking-wide font-display">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-violet-500">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
          AFTER EXAM
        </a>
        <a 
          href="/explore" 
          className="text-sm font-semibold text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Career Map
        </a>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-grow w-full max-w-4xl mx-auto p-6 md:py-12 space-y-8">
        
        {/* Breadcrumb / Category Tag */}
        <div className="flex justify-start">
          <span className="px-4 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 text-violet-400 text-xs font-semibold uppercase tracking-wider font-display">
            {categoryName}
          </span>
        </div>

        {/* Hero Section */}
        <div className="text-left space-y-4">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent font-display leading-tight">
            {details.title}
          </h1>
          <p className="text-base text-slate-300 leading-relaxed max-w-3xl font-medium">
            {details.description}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-5 bg-white/[0.02] border border-white/5 hover:border-violet-500/20 rounded-2xl transition-all duration-300 flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Starting Salary</span>
              <span className="text-sm font-extrabold text-white mt-1 block">{details.salary}</span>
            </div>
          </div>

          <div className="p-5 bg-white/[0.02] border border-white/5 hover:border-cyan-500/20 rounded-2xl transition-all duration-300 flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Market Demand</span>
              <span className="text-sm font-extrabold text-white mt-1 block">{details.demand}</span>
            </div>
          </div>

          <div className="p-5 bg-white/[0.02] border border-white/5 hover:border-blue-500/20 rounded-2xl transition-all duration-300 flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Course Duration</span>
              <span className="text-sm font-extrabold text-white mt-1 block">{details.duration}</span>
            </div>
          </div>

          <div className="p-5 bg-white/[0.02] border border-white/5 hover:border-emerald-500/20 rounded-2xl transition-all duration-300 flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Key Exams</span>
              <span className="text-sm font-extrabold text-white mt-1 block">{details.exams}</span>
            </div>
          </div>

        </div>

        {/* Pros and Challenges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="p-6 bg-emerald-500/[0.01] hover:bg-emerald-500/[0.02] border border-emerald-500/10 hover:border-emerald-500/20 rounded-3xl transition-all duration-300 space-y-4">
            <h3 className="text-sm font-bold text-emerald-400 tracking-wider uppercase font-display flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Career Advantages
            </h3>
            <ul className="space-y-3">
              {details.pros.map((pro, index) => (
                <li key={index} className="flex gap-2.5 text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
                  <span className="text-emerald-500 mt-0.5">•</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 bg-rose-500/[0.01] hover:bg-rose-500/[0.02] border border-rose-500/10 hover:border-rose-500/20 rounded-3xl transition-all duration-300 space-y-4">
            <h3 className="text-sm font-bold text-rose-400 tracking-wider uppercase font-display flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Sector Challenges
            </h3>
            <ul className="space-y-3">
              {details.cons.map((con, index) => (
                <li key={index} className="flex gap-2.5 text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
                  <span className="text-rose-500 mt-0.5">•</span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Strategic Advice */}
        <div className="relative p-6 md:p-8 bg-blue-500/5 border border-blue-500/15 rounded-3xl overflow-hidden space-y-3 group shadow-xl">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/10 blur-2xl rounded-full transition-all group-hover:scale-125 duration-500" />
          <h3 className="text-xs md:text-sm font-black text-cyan-300 uppercase tracking-widest flex items-center gap-2 relative z-10 font-display">
            <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
            Seniors' Strategic Advice
          </h3>
          <p className="text-xs md:text-sm text-sky-100/90 leading-relaxed font-medium relative z-10">
            {details.expertAdvice}
          </p>
        </div>

        {/* PG Specializations */}
        {details.postGradPathways && details.postGradPathways.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest block font-display">
              Post-Graduate Specializations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {details.postGradPathways.map((path, index) => (
                <div key={index} className="p-5 bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 rounded-2xl space-y-2 text-left transition-all duration-200">
                  <span className="text-sm font-extrabold text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-violet-400" />
                    {path.name}
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed">{path.desc}</p>
                  <div className="pt-1 flex items-center gap-1.5 text-xs text-cyan-300 font-semibold font-display">
                    <Compass className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Career Outcome: {path.careerOutcome}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Button Section */}
        <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-start">
          <a 
            href="/explore" 
            className="group px-8 py-3.5 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-bold rounded-full shadow-lg shadow-violet-500/15 hover:shadow-violet-500/25 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Explore Alternative Careers
            <svg 
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" 
              className="transform group-hover:translate-x-1 transition-transform duration-200"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
          <a 
            href="/community" 
            className="px-8 py-3.5 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-white font-bold rounded-full transition-all duration-200 flex items-center justify-center"
          >
            Join Community Q&A
          </a>
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full text-center py-6 border-t border-white/5 text-xs text-slate-500">
        &copy; {new Date().getFullYear()} AFTER EXAM. All rights reserved.
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CourseDetailPlaceholder />
  </React.StrictMode>
);
