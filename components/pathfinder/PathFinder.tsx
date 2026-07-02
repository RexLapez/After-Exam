import React, { useState, useEffect, useRef } from "react";
import { 
  Dna, 
  GraduationCap, 
  Activity, 
  HeartPulse, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  Briefcase, 
  Cpu, 
  ShieldCheck, 
  ChevronRight, 
  BookOpen, 
  Award, 
  Zap, 
  RotateCcw, 
  ChevronLeft,
  Info,
  ExternalLink,
  Lock,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Types for Node Coordinates
interface NodePos {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  icon: any;
  x: number;
  y: number;
  level: number;
  parents: string[]; // Node IDs that unlock this node
}

// Career details mapping
interface CareerDetail {
  title: string;
  salary: string;
  demand: string;
  description: string;
  pros: string[];
  cons: string[];
  expertAdvice: string;
  postGradPathways: { name: string; desc: string; careerOutcome: string }[];
}

interface NeuralPathwayProps {
  onBack?: () => void;
}

export default function NeuralPathway({ onBack }: NeuralPathwayProps) {
  // Navigation Selection States
  const [selectedStream, setSelectedStream] = useState<"pcb" | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDegree, setSelectedDegree] = useState<string | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);
  
  // Sidebar info detail panel
  const [activeDetails, setActiveDetails] = useState<CareerDetail | null>(null);
  
  // Track viewport dimension resizes for the canvas
  const canvasRef = useRef<HTMLDivElement>(null);

  // Loading Screen States
  const [loadingStage, setLoadingStage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Stage 1: Load network
    const t1 = setTimeout(() => {
      setLoadingStage(1);
    }, 850);

    // Stage 2: Ready
    const t2 = setTimeout(() => {
      setLoadingStage(2);
    }, 1700);

    // Stage 3: Fade out loader and present pathfinder grid
    const t3 = setTimeout(() => {
      setIsLoading(false);
    }, 2450);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let targetLeft = 0;
    if (selectedDegree !== null) {
      targetLeft = 320;
    } else if (selectedCategory !== null) {
      targetLeft = 140;
    }

    const t = setTimeout(() => {
      container.scrollTo({
        left: targetLeft,
        behavior: "smooth"
      });
    }, 700);

    return () => clearTimeout(t);
  }, [selectedStream, selectedCategory, selectedDegree]);

  const starsCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = starsCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let localStars: {
      x: number;
      y: number;
      size: number;
      opacity: number;
      twinkleSpeed: number;
      direction: number;
    }[] = [];
    
    let shootingStar: {
      x: number;
      y: number;
      length: number;
      speed: number;
      dx: number;
      dy: number;
      opacity: number;
      fadeSpeed: number;
    } | null = null;

    let lastShootingStarTime = Date.now();
    let nextSpawnDelay = Math.random() * 1000 + 4000;
    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      localStars = [];
      const count = Math.floor((canvas.width * canvas.height) / 7000);
      for (let i = 0; i < count; i++) {
        localStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random(),
          twinkleSpeed: Math.random() * 0.015 + 0.005,
          direction: Math.random() > 0.5 ? 1 : -1
        });
      }
    };

    const spawnShootingStar = () => {
      shootingStar = {
        x: Math.random() * canvas.width * 0.8,
        y: Math.random() * canvas.height * 0.3,
        length: Math.random() * 80 + 60,
        speed: Math.random() * 10 + 15,
        dx: Math.random() * 3 + 6,
        dy: Math.random() * 2 + 4,
        opacity: 1,
        fadeSpeed: Math.random() * 0.02 + 0.01
      };
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw normal stars
      localStars.forEach(star => {
        star.opacity += star.twinkleSpeed * star.direction;
        if (star.opacity >= 1) {
          star.opacity = 1;
          star.direction = -1;
        } else if (star.opacity <= 0) {
          star.opacity = 0;
          star.direction = 1;
          star.x = Math.random() * canvas.width;
          star.y = Math.random() * canvas.height;
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw shooting star
      if (shootingStar) {
        const grad = ctx.createLinearGradient(
          shootingStar.x,
          shootingStar.y,
          shootingStar.x - shootingStar.dx * (shootingStar.length / shootingStar.speed),
          shootingStar.y - shootingStar.dy * (shootingStar.length / shootingStar.speed)
        );
        grad.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.opacity})`);
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(
          shootingStar.x - shootingStar.dx * (shootingStar.length / shootingStar.speed),
          shootingStar.y - shootingStar.dy * (shootingStar.length / shootingStar.speed)
        );
        ctx.stroke();

        shootingStar.x += shootingStar.dx;
        shootingStar.y += shootingStar.dy;
        shootingStar.opacity -= shootingStar.fadeSpeed;

        if (shootingStar.opacity <= 0 || shootingStar.x > canvas.width || shootingStar.y > canvas.height) {
          shootingStar = null;
        }
      } else {
        const now = Date.now();
        if (now - lastShootingStarTime > nextSpawnDelay) {
          spawnShootingStar();
          lastShootingStarTime = now;
          nextSpawnDelay = Math.random() * 1000 + 4000;
        }
      }

      animationFrameId = requestAnimationFrame(drawStars);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    drawStars();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // Clean-Slate Reset Helper
  const handleReset = () => {
    setSelectedStream(null);
    setSelectedCategory(null);
    setSelectedDegree(null);
    setSelectedCareer(null);
    setActiveDetails(null);
  };

  // Node Positions and Level Data - Pure PCB Stream Centered Layout
  const nodes: NodePos[] = [
    // --- COLUMN 0: STREAMS ---
    {
      id: "pcb",
      name: "PCB Stream",
      subtitle: "Biomedical Track",
      description: "Physics, Chemistry, and Biology. Highly focused on medicine, allied healthcare, clinical therapies, and genetics.",
      icon: HeartPulse,
      x: 60,
      y: 415,
      level: 0,
      parents: []
    },

    // --- COLUMN 1: DOMAINS ---
    {
      id: "medical-allied",
      name: "Medical Allied",
      subtitle: "Clinical Care & Therapy",
      description: "Hands-on patient care, physical therapies, and nursing disciplines.",
      icon: Activity,
      x: 350,
      y: 180,
      level: 1,
      parents: ["pcb"]
    },
    {
      id: "life-sciences",
      name: "Life Sciences",
      subtitle: "Research & Industry R&D",
      description: "Biotechnology, biochemistry, vaccine engineering, and core labs.",
      icon: Dna,
      x: 350,
      y: 415,
      level: 1,
      parents: ["pcb"]
    },
    {
      id: "others",
      name: "Other Fields",
      subtitle: "FMCG & Food Tech",
      description: "Food security auditing, packaging compliance, and clinical nutrition.",
      icon: Sparkles,
      x: 350,
      y: 650,
      level: 1,
      parents: ["pcb"]
    },

    // --- COLUMN 2: DEGREES ---
    // Medical Allied Children
    {
      id: "bpt-physio",
      name: "BPT Physiotherapy",
      subtitle: "4.5-Year Clinical Care",
      description: "Specialized non-surgical structural adjustments and orthopedic rehabilitation.",
      icon: Activity,
      x: 640,
      y: 60,
      level: 2,
      parents: ["medical-allied"]
    },
    {
      id: "bsc-nursing",
      name: "B.Sc Nursing",
      subtitle: "4-Year Critical Care",
      description: "High-level diagnostic aid with maximum global migration visa speed.",
      icon: HeartPulse,
      x: 640,
      y: 180,
      level: 2,
      parents: ["medical-allied"]
    },
    {
      id: "bsc-clinical-research",
      name: "B.Sc Clinical Research",
      subtitle: "3-Year Drug Auditing",
      description: "Validate safety parameters of modern vaccine and pharma lab trials.",
      icon: ShieldCheck,
      x: 640,
      y: 300,
      level: 2,
      parents: ["medical-allied"]
    },
    // Life Sciences Children
    {
      id: "bsc-biotech",
      name: "B.Sc Biotechnology",
      subtitle: "3-Year Pure Science",
      description: "Theoretical molecular genetics, genetics engineering, and biochemistry labs.",
      icon: Dna,
      x: 640,
      y: 340,
      level: 2,
      parents: ["life-sciences"]
    },
    {
      id: "btech-biotech",
      name: "B.Tech Biotechnology",
      subtitle: "4-Year Applied Engineering",
      description: "Industrial bioprocess design, bio-reactor scaling, and corporate drug manufacture.",
      icon: Cpu,
      x: 640,
      y: 450,
      level: 2,
      parents: ["life-sciences"]
    },
    {
      id: "btech-bioinformatics",
      name: "B.Tech Bioinformatics",
      subtitle: "4-Year Computational Biology",
      description: "Genomic sequencing databases, molecular data modeling, and scripting for biological patterns.",
      icon: Cpu,
      x: 640,
      y: 560,
      level: 2,
      parents: ["life-sciences"]
    },
    {
      id: "bsc-pure-science",
      name: "B.Sc Pure Sciences",
      subtitle: "3-Year Lab Specialties",
      description: "Microbiology and Biochemistry foundations. Highly strategic for MBA conversions.",
      icon: GraduationCap,
      x: 640,
      y: 670,
      level: 2,
      parents: ["life-sciences"]
    },
    // Others Children
    {
      id: "bsc-food-tech",
      name: "B.Sc Food Tech",
      subtitle: "3-Year Nutrition & Safety",
      description: "FMCG compliance, clinical nutrition counseling, and quality audits.",
      icon: Award,
      x: 640,
      y: 780,
      level: 2,
      parents: ["others"]
    },

    // --- COLUMN 3: CAREER OUTCOMES ---
    // BPT Physiotherapy Careers
    {
      id: "career-sports-physio",
      name: "Sports Physiotherapist",
      subtitle: "Athletic Team Rehab",
      description: "Work with elite athletic institutions and academies on structural trauma recovery.",
      icon: Activity,
      x: 930,
      y: 20,
      level: 3,
      parents: ["bpt-physio"]
    },
    {
      id: "career-clinical-physio",
      name: "Clinical Physiotherapist",
      subtitle: "Multi-Specialty Wards",
      description: "In-patient orthopedic diagnostics and physical wellness administration.",
      icon: Briefcase,
      x: 930,
      y: 80,
      level: 3,
      parents: ["bpt-physio"]
    },
    {
      id: "career-private-practitioner",
      name: "Private Clinician",
      subtitle: "Self-Sustaining Clinic",
      description: "Launch direct consulting, clinical chiropractics, and muscular therapy rooms.",
      icon: Award,
      x: 930,
      y: 140,
      level: 3,
      parents: ["bpt-physio"]
    },
    // B.Sc Nursing Careers
    {
      id: "career-icu-nurse",
      name: "ICU / Critical Care Nurse",
      subtitle: "Emergency Units",
      description: "Administer critical pharmaceuticals and lead patient survival workflows.",
      icon: HeartPulse,
      x: 930,
      y: 200,
      level: 3,
      parents: ["bsc-nursing"]
    },
    {
      id: "career-nurse-educator",
      name: "Nurse Educator",
      subtitle: "Training Faculties",
      description: "Teach anatomy, nursing ethics, and direct clinical postings.",
      icon: GraduationCap,
      x: 930,
      y: 260,
      level: 3,
      parents: ["bsc-nursing"]
    },
    {
      id: "career-research-nurse",
      name: "Research Nurse",
      subtitle: "Sponsor Drug Log trials",
      description: "Assess clinical trial safety thresholds and log adverse patient outcomes.",
      icon: ShieldCheck,
      x: 930,
      y: 320,
      level: 3,
      parents: ["bsc-nursing"]
    },
    // B.Sc / B.Tech Biotech Careers
    {
      id: "career-rd-scientist",
      name: "R&D Scientist",
      subtitle: "Vaccines Formulation",
      description: "Engineer cell vectors, construct protein chains, and formulate vaccine bases.",
      icon: Dna,
      x: 930,
      y: 390,
      level: 3,
      parents: ["bsc-biotech", "btech-biotech"]
    },
    {
      id: "career-bioprocess-engineer",
      name: "Bioprocess Engineer",
      subtitle: "Industrial Bioreactors",
      description: "Supervise massive bioreactor systems scaling live culture outputs.",
      icon: Cpu,
      x: 930,
      y: 450,
      level: 3,
      parents: ["bsc-biotech", "btech-biotech"]
    },
    {
      id: "career-clinical-analyst",
      name: "Clinical Data Analyst",
      subtitle: "Biostatistics Registries",
      description: "Compile and organize trial telemetry logs for medical authorities.",
      icon: Briefcase,
      x: 930,
      y: 510,
      level: 3,
      parents: ["bsc-biotech", "btech-biotech", "bsc-clinical-research"]
    },
    // B.Tech Bioinformatics Careers
    {
      id: "career-bioinfo-analyst",
      name: "Bioinformatics Specialist",
      subtitle: "Genomic Data Pipelines",
      description: "Analyze NGS sequencing results and write biological scripting pipelines.",
      icon: Cpu,
      x: 930,
      y: 580,
      level: 3,
      parents: ["btech-bioinformatics"]
    },
    {
      id: "career-genomics-ai",
      name: "Genomics AI Engineer",
      subtitle: "AI Drug Discovery",
      description: "Train machine learning models (like AlphaFold) to predict molecular structures.",
      icon: Sparkles,
      x: 930,
      y: 640,
      level: 3,
      parents: ["btech-bioinformatics"]
    },
    // B.Sc Pure Science Careers
    {
      id: "career-lab-analyst",
      name: "Lab Technologist",
      subtitle: "Diagnostics Center",
      description: "Oversee automated clinical chemical profiling assays and micro-lab panels.",
      icon: Briefcase,
      x: 930,
      y: 700,
      level: 3,
      parents: ["bsc-pure-science"]
    },
    {
      id: "career-academic-lecturer",
      name: "Academic Lecturer",
      subtitle: "University Teaching",
      description: "Instruct graduate batches and manage academic laboratories post CSIR-NET.",
      icon: GraduationCap,
      x: 930,
      y: 760,
      level: 3,
      parents: ["bsc-pure-science"]
    },
    // Food Tech Careers
    {
      id: "career-safety-auditor",
      name: "Food Safety Auditor",
      subtitle: "Consumer Goods QA",
      description: "Audit chemical stabilizers, processing loops, and authorize FSSAI clearances.",
      icon: ShieldCheck,
      x: 930,
      y: 820,
      level: 3,
      parents: ["bsc-food-tech"]
    }
  ];

  // Helper functions to evaluate node lock status
  const isNodeUnlocked = (node: NodePos): boolean => {
    if (node.level === 0) return true;
    
    if (node.level === 1) {
      return selectedStream !== null && node.parents.includes(selectedStream);
    }
    
    if (node.level === 2) {
      return selectedCategory !== null && node.parents.includes(selectedCategory);
    }
    
    if (node.level === 3) {
      return selectedDegree !== null && node.parents.some(p => p === selectedDegree);
    }
    
    return false;
  };

  const isNewlyUnlocked = (node: NodePos): boolean => {
    if (node.level === 1) return selectedStream !== null && selectedCategory === null;
    if (node.level === 2) return selectedCategory !== null && selectedDegree === null;
    if (node.level === 3) return selectedDegree !== null && selectedCareer === null;
    return false;
  };

  const getDynamicNodeY = (node: NodePos): number => {
    if (node.level === 0) {
      return 415;
    }
    
    if (node.level === 1) {
      if (selectedCategory !== null) {
        return node.id === selectedCategory ? 415 : node.y;
      }
      return node.y;
    }
    
    if (node.level === 2) {
      if (selectedCategory !== null && node.parents.includes(selectedCategory)) {
        if (selectedDegree !== null) {
          return node.id === selectedDegree ? 415 : node.y;
        }
        const activeList = nodes.filter(n => n.level === 2 && n.parents.includes(selectedCategory));
        const idx = activeList.findIndex(n => n.id === node.id);
        const K = activeList.length;
        if (K > 1) {
          return 415 + (idx - (K - 1) / 2) * 150;
        }
        return 415;
      }
      return node.y;
    }
    
    if (node.level === 3) {
      if (selectedDegree !== null && node.parents.includes(selectedDegree)) {
        if (selectedCareer !== null) {
          return node.id === selectedCareer ? 415 : node.y;
        }
        const activeList = nodes.filter(n => n.level === 3 && n.parents.includes(selectedDegree));
        const idx = activeList.findIndex(n => n.id === node.id);
        const M = activeList.length;
        if (M > 1) {
          const gap = M === 2 ? 180 : 150;
          return 415 + (idx - (M - 1) / 2) * gap;
        }
        return 415;
      }
      return node.y;
    }
    
    return node.y;
  };

  const getSelectionLevel = (): number => {
    if (selectedCareer !== null) return 3;
    if (selectedDegree !== null) return 2;
    if (selectedCategory !== null) return 1;
    if (selectedStream !== null) return 0;
    return -1;
  };

  const getDynamicNodeX = (node: NodePos): number => {
    return node.x;
  };

  const getDynamicNodeOpacity = (node: NodePos): number => {
    const unlocked = isNodeUnlocked(node);
    if (!unlocked) return 0.15;
    
    const currentDepth = getSelectionLevel();
    
    // Diminish parent nodes that are before the current active selection depth
    if (node.level < currentDepth) {
      const isPartofPath = 
        (node.level === 0 && selectedStream === node.id) ||
        (node.level === 1 && selectedCategory === node.id) ||
        (node.level === 2 && selectedDegree === node.id);
      
      if (isPartofPath) {
        return 0.45; // Diminished opacity
      }
    }
    
    if (node.level === 0) return 1;
    
    if (node.level === 1) {
      if (selectedCategory !== null) {
        return node.id === selectedCategory ? 1 : 0;
      }
      return 1;
    }
    
    if (node.level === 2) {
      if (selectedCategory !== null) {
        if (node.parents.includes(selectedCategory)) {
          if (selectedDegree !== null) {
            return node.id === selectedDegree ? 1 : 0;
          }
          return 1;
        }
        return 0;
      }
      return 0.15;
    }
    
    if (node.level === 3) {
      if (selectedDegree !== null) {
        if (node.parents.includes(selectedDegree)) {
          if (selectedCareer !== null) {
            return node.id === selectedCareer ? 1 : 0;
          }
          return 1;
        }
        return 0;
      }
      return 0.15;
    }
    
    return 1;
  };

  // Click Handler for expanding neural network paths
  const handleNodeClick = (node: NodePos) => {
    if (!isNodeUnlocked(node)) return;

    if (node.level === 0) {
      setSelectedStream(node.id as "pcb");
      setSelectedCategory(null);
      setSelectedDegree(null);
      setSelectedCareer(null);
      setActiveDetails(null);
    } else if (node.level === 1) {
      setSelectedCategory(node.id);
      setSelectedDegree(null);
      setSelectedCareer(null);
      setActiveDetails(null);
    } else if (node.level === 2) {
      setSelectedDegree(node.id);
      setSelectedCareer(null);
      setActiveDetails(getDetailsForNode(node.id, node.name, node.subtitle, node.description));
    } else if (node.level === 3) {
      setSelectedCareer(node.id);
      setActiveDetails(getDetailsForNode(node.id, node.name, node.subtitle, node.description));
    }
  };

  // Career details catalog provider
  const getDetailsForNode = (nodeId: string, nodeName: string, subtitle: string, description: string): CareerDetail => {
    if (nodeId.includes("bioinfo")) {
      return {
        title: "B.Tech Bioinformatics & Computational Biology",
        salary: "₹6.0L - ₹14.0L Starting Per Annum",
        demand: "Extremely High (Genomics & AI Boom)",
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
      };
    } else if (nodeId.includes("biotech")) {
      return {
        title: "Biotechnology & Biological Process Engineering",
        salary: "₹5.5L - ₹12.0L Starting Per Annum",
        demand: "Exponential Growth",
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
      };
    } else if (nodeId.includes("physio")) {
      return {
        title: "BPT Clinical Physiotherapy & Sports Rehab",
        salary: "₹6.0L - ₹15.0L Starting Per Annum",
        demand: "Extremely High (Geriatric & Corporate)",
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
      };
    } else if (nodeId.includes("nursing")) {
      return {
        title: "B.Sc Nursing Critical Care Specialist",
        salary: "₹3.8L - ₹7.0L (Domestic) / ₹45.0L - ₹85.0L (Global Visa)",
        demand: "Acute Global Staff Deficits",
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
      };
    } else if (nodeId.includes("pure-science")) {
      return {
        title: "B.Sc Pure Sciences (Microbiology, Biotech, Genetics)",
        salary: "₹3.5L - ₹6.0L Starting Per Annum",
        demand: "Moderate (Great Foundation)",
        description: "A highly versatile, academically balanced foundation in biochemistry, cellular immunology, and tissue culture. Highly recommended for students who want a balanced academic timeline to focus on cracking national public sector or strategic MBA entries.",
        pros: [
          "Much lower academic stress compared to medical engineering, leaving abundant free hours to prepare for competitive examinations like IIT-JAM or CAT.",
          "Substantially lower tuition fees across government colleges, offering exceptional educational ROI.",
          "Highly adaptive baseline that leaves options open to pivot into FMCG food safety, medical writing, or MBA marketing."
        ],
        cons: [
          "Direct entry-level diagnostic lab salaries without post-grad specializations can initially feel modest.",
          "Requires active, self-driven post-grad planning (MSc/MBA) to lock in high-paying managerial packages."
        ],
        expertAdvice: "Do not treat this as a passive degree! If your goal is high-end central research, start preparing for IIT-JAM from your 2nd year. If your goal is corporate wealth, focus on business communications, finance baselines, and crack the CAT to enter premium MBA tracks.",
        postGradPathways: [
          { name: "M.Sc + CSIR-NET JRF", desc: "Conduct advanced academic research at national labs with full government monthly stipends (₹37,000+).", careerOutcome: "National Senior Scientist / Professor" },
          { name: "MBA in Hospital or Healthcare Management", desc: "Translate your technical bioscience foundation into commanding executive operational roles in hospital corporate lines.", careerOutcome: "Healthcare Operations Manager" }
        ]
      };
    } else if (nodeId.includes("clinical-research")) {
      return {
        title: "B.Sc Clinical Research & Trial Operations",
        salary: "₹4.5L - ₹9.0L Starting Per Annum",
        demand: "Very High (Sustained Pharma Boom)",
        description: "Clinical trial operators construct, audit, and regulate trial protocols to test the safety, bioavailability, and side effects of newly formulated drugs before global commercial releases.",
        pros: [
          "Very structured corporate desk or site coordinator roles at massive clinical firms (IQVIA, Syneos, Novartis).",
          "High global demand as Western pharma companies shift high-volume testing trials to central hubs.",
          "Excellent, clean work-life balance compared to critical care ICU nursing rotations."
        ],
        cons: [
          "Involves massive amounts of data auditing, log entry verification, and regulatory compliance paperwork.",
          "Demands absolute, meticulous precision; minor data errors can halt multi-million dollar trials."
        ],
        expertAdvice: "Secure Good Clinical Practice (GCP) certifications during your university semesters. Get hands-on exposure to clinical data management systems (CDMS) and biostatistics. Meticulous data precision is your ultimate career accelerator!",
        postGradPathways: [
          { name: "Post-Grad Diploma in Pharmacovigilance", desc: "Specialized licensing in tracking and auditing post-market drug safety outcomes and legal FDA reports.", careerOutcome: "Pharmacovigilance Officer" }
        ]
      };
    } else {
      // General Fallback
      return {
        title: nodeName,
        salary: "₹4.0L - ₹8.0L Starting Per Annum",
        demand: "High Specialized Niche",
        description: description || "A premium, specialized biotechnology or allied science track offering immediate corporate integration, great practical laboratory learning, and secure placement options.",
        pros: [
          "Highly practical, direct real-world utility in consumer safety audits or specialized diagnostic labs.",
          "Predictable working hours and solid workspace safety standards."
        ],
        cons: [
          "Requires targeted industry certifications to unlock higher executive salary brackets."
        ],
        expertAdvice: "Pursue active corporate internships and get certified in quality parameters (e.g., ISO, FSSAI, or GMP) before graduating. Real-world corporate exposure is far more powerful than theoretical scores!",
        postGradPathways: [
          { name: "M.Sc Clinical Operations", desc: "Advanced training in handling large-scale pharmaceutical testing grids, consumer logistics, and regulatory clearances.", careerOutcome: "Clinical Operations Director" }
        ]
      };
    }
  };

  // Generate Bezier Curve Path between nodes
  const drawBezierPath = (startX: number, startY: number, endX: number, endY: number) => {
    // Elegant organic horizontal S-curve
    const controlX = (startX + endX) / 2;
    return `M ${startX} ${startY} C ${controlX} ${startY}, ${controlX} ${endY}, ${endX} ${endY}`;
  };

  // Variants for cascading sidebar text entry
  const sidebarContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const sidebarItemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 150, damping: 18 } 
    }
  };

  return (
    <div className="fixed inset-0 bg-[#020205] text-slate-100 font-sans select-none overflow-hidden flex flex-col z-50">
      
      {/* Night Sky & Stars Backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Canvas for stars and shooting stars */}
        <canvas ref={starsCanvasRef} className="absolute inset-0 z-0" />

        {/* Subtle Constellation Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(59, 130, 246, 0.12) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(59, 130, 246, 0.12) 1px, transparent 1px)`,
            backgroundSize: "64px 64px"
          }}
        />

        {/* Ambient Night Sky Glowing Nebulae */}
        <div className="absolute top-1/4 left-1/3 w-[700px] h-[700px] bg-blue-900/10 blur-[140px] rounded-full animate-pulse" style={{ animationDuration: "12s" }} />
        <div className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] bg-indigo-950/15 blur-[160px] rounded-full" />
        <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-sky-900/5 blur-[120px] rounded-full" />

        {/* Decorative Grid of Rounded Squares (Cosmic constellation layout) */}
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 p-8 gap-8 opacity-[0.015]">
          {Array.from({ length: 48 }).map((_, i) => (
            <div 
              key={i} 
              className="border border-dashed border-sky-400 rounded-2xl"
              style={{ borderRadius: "20px" }}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="absolute inset-0 z-[100] bg-[#020205]/92 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center select-none"
          >
            {/* Glowing Core Engine Logo */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-blue-500/25 blur-3xl rounded-full scale-125 animate-pulse" />
              <div className="w-20 h-20 rounded-2xl border-2 border-blue-500/20 bg-blue-500/5 flex items-center justify-center relative overflow-hidden">
                <Zap className="w-10 h-10 text-cyan-400 animate-pulse" />
                <div className="absolute inset-1 rounded-full border border-dashed border-cyan-400/20 animate-spin" style={{ animationDuration: '10s' }} />
              </div>
            </div>

            {/* Console Log Panel */}
            <div className="w-full max-w-sm bg-[#05050d]/80 border border-white/5 rounded-2xl p-6 font-mono text-left space-y-4 shadow-2xl relative overflow-hidden">
              <div className="absolute -right-16 -top-16 w-32 h-32 bg-cyan-500/5 blur-2xl rounded-full" />
              
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden relative">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ 
                    width: loadingStage === 0 ? "35%" : loadingStage === 1 ? "75%" : "100%" 
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full"
                />
              </div>

              <div className="space-y-2 text-[11px] leading-relaxed">
                <div className="flex items-center gap-2">
                  <span className="text-blue-500 font-black">&gt;</span>
                  <span className="text-slate-300">Initializing PathFinder...</span>
                </div>

                {loadingStage >= 1 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-blue-500 font-black">&gt;</span>
                    <span className="text-slate-300">Loading Career Network...</span>
                  </motion.div>
                )}

                {loadingStage >= 2 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-emerald-400 font-black">&gt;</span>
                    <span className="text-emerald-400 font-bold uppercase tracking-wider animate-pulse">Ready.</span>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="pathfinder-board"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex flex-col w-full h-full"
          >
            {/* Pathfinder Dashboard Header */}
            <header className="relative z-10 h-20 border-b border-white/5 bg-[#020205]/80 backdrop-blur-md px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-xl border border-white/5 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
              id="back-home-header-btn"
            >
              <ArrowLeft className="w-4 h-4 text-sky-400" />
              <span>Exit Pathfinder</span>
            </button>
          )}

          <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-white/10">
            <Zap className="w-5 h-5 text-blue-400 animate-pulse" />
            <div>
              <span className="text-sm font-black text-white tracking-tight block">
                AFTER EXAM PATHFINDER
              </span>
              <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-widest font-mono">
                PCB Interactive Decision Grid
              </span>
            </div>
          </div>
        </div>

        {/* Level Legend indicator */}
        <div className="hidden md:flex items-center gap-4 text-[10px] font-mono font-bold text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
            <span>01. Streams</span>
          </div>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
            <span>02. Domains</span>
          </div>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]" />
            <span>03. Degrees</span>
          </div>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
            <span>04. Outcomes</span>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-blue-500/15 bg-blue-500/5 text-blue-400 hover:text-white hover:bg-blue-500/20 text-xs font-bold cursor-pointer transition-all shrink-0"
          id="reset-pathway-header-btn"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Board
        </button>
      </header>

      {/* Main Interactive Stage */}
      <div className="flex-1 relative z-10 flex overflow-hidden w-full h-full">
        
        {/* Scrollable Neural Graph Canvas Panel */}
        <div ref={scrollContainerRef} className="flex-1 overflow-auto relative cursor-grab active:cursor-grabbing p-6 md:p-12 select-none h-full bg-transparent">
          
          {/* Instructions banner */}
          <div className="absolute top-6 left-12 z-20 pointer-events-none max-w-sm">
            <div className="bg-slate-950/85 backdrop-blur-md border border-blue-500/10 p-4 rounded-2xl shadow-xl space-y-1">
              <span className="text-[9px] font-mono font-bold text-sky-400 uppercase tracking-widest block">
                How to Build:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Click the starting Stream node (<strong className="text-white">PCB</strong>). Subsequent branches will sprout open sequentially! Tap any glowing terminal node to unlock starting packages and expert advice.
              </p>
            </div>
          </div>

          {/* Core Traversal Workspace Stage */}
          <motion.div 
            ref={canvasRef}
            animate={{ x: activeDetails ? -180 : 0 }}
            transition={{ type: "spring", damping: 26, stiffness: 130 }}
            className="relative w-[1240px] h-[900px] mx-auto mt-12 bg-transparent"
          >
            {/* SVG Interactive Pipeline Connections Overlay */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
              <defs>
                <linearGradient id="active-curve-grad" gradientUnits="userSpaceOnUse" x1="60" y1="0" x2="1160" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Loop and render connectors */}
              {nodes.map(node => {
                if (node.level === 0) return null;

                // For each parent of this child node, draw a connection curve
                return node.parents.map(parentKey => {
                  const parentNode = nodes.find(n => n.id === parentKey);
                  if (!parentNode) return null;

                  // Evaluate if parent is active and this child is unlocked
                  const parentActive = (parentNode.level === 0 && selectedStream === parentNode.id) ||
                                       (parentNode.level === 1 && selectedCategory === parentNode.id) ||
                                       (parentNode.level === 2 && selectedDegree === parentNode.id);
                  
                  const activeConnection = parentActive && isNodeUnlocked(node);
                  
                  // Card dimension offsets to connect perfectly from mid-right to mid-left
                  // Card Width: 230px, Card Height: 70px
                  const startX = getDynamicNodeX(parentNode) + 230;
                  const startY = getDynamicNodeY(parentNode) + 35;
                  const endX = getDynamicNodeX(node);
                  const endY = getDynamicNodeY(node) + 35;

                  const parentOpacity = getDynamicNodeOpacity(parentNode);
                  const childOpacity = getDynamicNodeOpacity(node);
                  const showConnection = parentOpacity > 0 && childOpacity > 0;

                  return (
                    <g key={`${parentNode.id}-${node.id}`}>
                      {/* Dormant / Faded pipeline */}
                      {showConnection && (
                        <path
                          d={drawBezierPath(startX, startY, endX, endY)}
                          fill="none"
                          stroke="rgba(255, 255, 255, 0.02)"
                          strokeWidth="1.5"
                          strokeDasharray="4,4"
                        />
                      )}

                      {/* Active Glowing Sprouting Stream */}
                      {activeConnection && showConnection && (
                        <>
                          <motion.path
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            d={drawBezierPath(startX, startY, endX, endY)}
                            fill="none"
                            stroke="url(#active-curve-grad)"
                            strokeWidth="2.5"
                            strokeDasharray="none"
                            className=""
                            style={{
                              filter: "drop-shadow(0 0 6px rgba(59, 130, 246, 0.3))"
                            }}
                          />
                          {/* Only show glowing dot pulse animations on final Level 3 connections */}
                          {node.level === 3 && (
                            <>
                              {/* Inner Sharp Glowing dot */}
                              <circle r="3" fill="#10b981">
                                <animateMotion
                                  dur="6s"
                                  repeatCount="indefinite"
                                  path={drawBezierPath(startX, startY, endX, endY)}
                                />
                              </circle>
                              {/* Outer Blurry glow halo */}
                              <circle r="6" fill="#06b6d4" opacity="0.5" style={{ filter: "blur(1.5px)" }}>
                                <animateMotion
                                  dur="6s"
                                  repeatCount="indefinite"
                                  path={drawBezierPath(startX, startY, endX, endY)}
                                />
                              </circle>
                            </>
                          )}
                        </>
                      )}
                    </g>
                  );
                });
              })}
            </svg>

            {/* Render Nodes as Interactive Dashed Cards */}
            {nodes.map((node, index) => {
              const IconComponent = node.icon;
              const unlocked = isNodeUnlocked(node);
              const isSelected = selectedStream === node.id || selectedCategory === node.id || selectedDegree === node.id || selectedCareer === node.id;
              
              const dynamicY = getDynamicNodeY(node);
              const dynamicOpacity = getDynamicNodeOpacity(node);

              return (
                <motion.div
                  key={node.id}
                  style={{
                    position: "absolute",
                    width: "230px",
                    height: "70px",
                    pointerEvents: dynamicOpacity === 0 ? "none" : "auto",
                  }}
                  initial={{ opacity: 0, scale: 0.88, x: node.x, y: node.y }}
                  animate={{ 
                    opacity: dynamicOpacity, 
                    scale: isSelected ? 1.04 : (isNewlyUnlocked(node) && unlocked ? [1, 1.06, 1] : 1),
                    x: getDynamicNodeX(node),
                    y: dynamicY
                  }}
                  whileHover={unlocked && dynamicOpacity > 0.2 ? { 
                    scale: isSelected ? 1.06 : 1.03,
                    boxShadow: "0 0 22px rgba(59, 130, 246, 0.25)",
                    transition: { duration: 0.2 }
                  } : {}}
                  transition={{
                    x: { type: "spring", stiffness: 65, damping: 24, mass: 1.1 },
                    y: { type: "spring", stiffness: 65, damping: 24, mass: 1.1 },
                    opacity: { duration: 0.6, delay: (isNewlyUnlocked(node) && unlocked) ? 0.65 : 0, ease: "easeOut" },
                    scale: { duration: 0.45, delay: (isNewlyUnlocked(node) && unlocked) ? 0.65 : 0, ease: "easeOut" }
                  }}
                  onClick={() => handleNodeClick(node)}
                  className={`group rounded-2xl border-2 border-dashed flex items-center p-3 text-left transition-all relative select-none ${
                    !unlocked 
                      ? "border-white/5 bg-[#040409]/30 text-slate-600 cursor-not-allowed" 
                      : isSelected 
                        ? "border-blue-500 bg-blue-600/10 text-white shadow-[0_0_25px_rgba(29,78,216,0.25)] cursor-pointer" 
                        : "border-blue-500/20 hover:border-blue-400/80 bg-[#090912]/90 hover:bg-[#0c0c18] text-slate-300 hover:text-white cursor-pointer hover:shadow-[0_0_15px_rgba(59,130,246,0.12)]"
                  }`}
                >
                  {/* Glowing core indicator for unlocked nodes */}
                  {unlocked && dynamicOpacity > 0.2 && !isSelected && (
                    <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
                  )}

                  {/* Left Icon Area with exact night-sky blue theme styling */}
                  <div className={`p-2 rounded-xl mr-3 shrink-0 transition-colors ${
                    !unlocked 
                      ? "bg-white/[0.02] text-slate-700" 
                      : isSelected 
                        ? "bg-blue-500/20 text-sky-400" 
                        : "bg-blue-500/5 text-sky-400/80 group-hover:bg-blue-500/10 group-hover:text-sky-400"
                  }`}>
                    {!unlocked ? (
                      <Lock className="w-4 h-4" />
                    ) : (
                      <IconComponent className="w-4 h-4" />
                    )}
                  </div>

                  {/* Node Label Text */}
                  <div className="min-w-0 flex-1 leading-tight">
                    <span className={`block font-black text-xs truncate tracking-tight ${
                      !unlocked 
                        ? "text-slate-600" 
                        : isSelected 
                          ? "text-white" 
                          : "text-slate-200 group-hover:text-sky-400"
                    }`}>
                      {node.name}
                    </span>
                    <span className={`block text-[9px] font-mono font-bold uppercase tracking-wider mt-0.5 truncate ${
                      !unlocked 
                        ? "text-slate-700" 
                        : isSelected 
                          ? "text-sky-300" 
                          : "text-blue-500/60"
                    }`}>
                      {node.subtitle}
                    </span>
                  </div>

                  {/* Chevron to indicate clickability for unlocked parent nodes */}
                  {unlocked && node.level < 3 && !isSelected && (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-sky-500 shrink-0 transition-transform group-hover:translate-x-0.5" />
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Floating details Slide-Over or Right Panel */}
        <AnimatePresence>
          {activeDetails && (
            <motion.div
              initial={{ opacity: 0, x: 180 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 180 }}
              transition={{ type: "spring", damping: 26, stiffness: 170 }}
              className="w-full lg:w-[440px] shrink-0 border-l border-white/10 bg-[#030308]/85 backdrop-blur-xl relative z-20 flex flex-col h-full shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            >
              {/* Sidebar Header metadata */}
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div className="space-y-1 pr-6">
                  <span className="bg-blue-500/10 text-sky-400 border border-blue-500/20 text-[9px] font-mono font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    SECURED NODE PROFILE
                  </span>
                  <h3 className="text-base font-black text-white tracking-tight leading-tight pt-1">
                    {activeDetails.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveDetails(null)}
                  className="p-1.5 rounded-lg border border-white/5 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable details panel with cascade fade animations */}
              <motion.div 
                variants={sidebarContainerVariants}
                initial="hidden"
                animate="show"
                className="flex-1 overflow-y-auto p-6 space-y-6 text-left"
              >
                
                {/* Description */}
                <motion.div variants={sidebarItemVariants} className="space-y-1.5">
                  <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block">
                    Core Operational Description
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {activeDetails.description}
                  </p>
                </motion.div>

                {/* Salary and Industry Demand */}
                <motion.div variants={sidebarItemVariants} className="bg-blue-500/[0.03] border border-blue-500/10 rounded-2xl p-4 grid grid-cols-2 gap-4">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono font-bold text-slate-500 uppercase block">Starting Salary</span>
                    <span className="text-sm font-extrabold text-sky-300 block">{activeDetails.salary}</span>
                    <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider">Honest junior average</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono font-bold text-slate-500 uppercase block">Market Demand</span>
                    <span className="text-sm font-extrabold text-white block">{activeDetails.demand}</span>
                    <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider">Worldwide Outlook</span>
                  </div>
                </motion.div>

                {/* Key Pros & Challenges */}
                <motion.div variants={sidebarItemVariants} className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block">
                      Placement Advantages
                    </span>
                    <div className="space-y-2">
                      {activeDetails.pros.map((pro, idx) => (
                        <div key={idx} className="flex gap-2 text-xs text-slate-300 items-start leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{pro}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block">
                      Sector Challenges
                    </span>
                    <div className="space-y-2">
                      {activeDetails.cons.map((con, idx) => (
                        <div key={idx} className="flex gap-2 text-xs text-slate-300 items-start leading-relaxed">
                          <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                          <span>{con}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Senior Strategic Pivot Advice */}
                <motion.div variants={sidebarItemVariants} className="bg-blue-500/5 border border-blue-500/15 rounded-2xl p-4 space-y-1.5 relative overflow-hidden">
                  <div className="absolute -top-6 -right-6 w-16 h-16 bg-blue-500/10 blur-xl rounded-full" />
                  <span className="text-[9px] font-mono font-black text-sky-300 uppercase tracking-widest flex items-center gap-1.5 relative z-10">
                    <Sparkles className="w-3.5 h-3.5 text-sky-300 animate-pulse" />
                    Seniors' Strategic Advice
                  </span>
                  <p className="text-xs text-sky-100/95 leading-relaxed font-medium relative z-10">
                    {activeDetails.expertAdvice}
                  </p>
                </motion.div>

                {/* Post-Graduate Specializations */}
                {activeDetails.postGradPathways && activeDetails.postGradPathways.length > 0 && (
                  <motion.div variants={sidebarItemVariants} className="space-y-3 pt-2 pb-6">
                    <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block">
                      Secure Post-Grad specialities
                    </span>
                    <div className="space-y-2">
                      {activeDetails.postGradPathways.map((path, idx) => (
                        <div key={idx} className="bg-white/[0.02] border border-white/5 p-3 rounded-xl space-y-1 text-left">
                          <span className="text-xs font-extrabold text-white flex items-center gap-1.5">
                            <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                            {path.name}
                          </span>
                          <p className="text-[10px] text-slate-400 leading-relaxed">{path.desc}</p>
                          <p className="text-[10px] text-sky-300 font-medium">
                            <span className="text-slate-500 font-bold uppercase text-[9px] font-mono">Core Career:</span> {path.careerOutcome}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  )}
</AnimatePresence>
</div>
  );
}
