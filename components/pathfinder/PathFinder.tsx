import React, { useState, useEffect, useMemo, useRef } from "react";
import { 
  ArrowLeft, 
  Search, 
  ChevronDown, 
  ChevronRight, 
  ArrowRight,
  Maximize2,
  Minimize2,
  Compass,
  Sparkles,
  BookOpen,
  Building2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import careersData from "../../data/careersData.json";
import "../../css/explore.css";

interface Course {
  name: string;
  slug: string;
}

interface Category {
  name: string;
  emoji: string;
  courses: Course[];
}

interface NeuralPathwayProps {
  onBack?: () => void;
}

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "Medical & Clinical Careers": "Traditional clinical fields including alternative systems like Ayurveda and Homeopathy.",
  "Pharmacy": "Researching, dispensing, and manufacturing of pharmaceutical therapeutics.",
  "Nursing": "Critical patient support, clinic assistance, and healthcare administration.",
  "Allied Health Sciences": "Essential technologists and therapists supporting diagnostic, lab, and clinical operations.",
  "Biotechnology & Bioinformatics": "Fusing molecular biology, genetics, and computing for advanced bio-engineering.",
  "Life Sciences": "Academic research in biochemistry, microbiology, genetics, and ecology.",
  "Agriculture & Food Sciences": "Modern crop technologies, sustainable agri-business, and food processing.",
  "Veterinary Sciences": "Animal medical care, surgery, and livestock health management.",
  "Psychology": "Human cognitive behavior, clinical psychology, and mental health counseling.",
  "Nutrition & Dietetics": "Public and clinical nutrition tracking, diet sheets, and wellness consults.",
  "Forensic Sciences": "Biological forensic tests, criminal diagnostics, and evidence curation.",
  "Environmental Sciences": "Ecological monitoring, environment conservation, and green policies.",
  "Public Health": "Global epidemiology tracking, vaccine operations, and public healthcare policies.",
  "Law": "Integrated legal streams specializing in IP rights, corporate law, and bioethics.",
  "Management": "Hospital operations management, pharma marketing, and business administration.",
  "Design": "User experience mapping, product graphics, and medical equipment styling.",
  "Government Career Paths": "Civil services, national defense, banking, and public sector operations.",
  "Computing & Tech": "Software programming, health informatics, and clinical computing systems."
};

const POPULAR_SEARCHES = ["BCA", "Biotechnology", "Veterinary", "Ayurveda", "B.Pharm"];
const POPULAR_EXAMS = ["NEET UG", "VITEEE", "MET", "CUET UG"];
const POPULAR_COLLEGES = [
  { name: "AIIMS Delhi", slug: "mbbs" },
  { name: "BITS Pilani", slug: "b-pharm" },
  { name: "VIT Vellore", slug: "btech-biotechnology" },
  { name: "Manipal Academy", slug: "btech-biotechnology" },
  { name: "BHU Varanasi", slug: "bams" },
  { name: "Delhi University", slug: "bca" }
];

export default function PathFinder({ onBack }: NeuralPathwayProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchDropdownRef = useRef<HTMLDivElement>(null);

  const [expandedKeys, setExpandedKeys] = useState<string[]>(() => {
    try {
      const saved = sessionStorage.getItem("expanded_categories");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  
  const [searchOverrides, setSearchOverrides] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchOverrides({});
    }
  }, [searchQuery]);

  // Click outside listener for search autocomplete dropdown
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (searchDropdownRef.current && !searchDropdownRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleExpandAll = () => {
    const allNames = careersData.categories.map(c => c.name);
    if (searchQuery.trim()) {
      const overrides: Record<string, boolean> = {};
      filteredCategories.forEach(cat => {
        overrides[cat.name] = true;
      });
      setSearchOverrides(overrides);
    } else {
      setExpandedKeys(allNames);
      sessionStorage.setItem("expanded_categories", JSON.stringify(allNames));
    }
  };

  const handleCollapseAll = () => {
    if (searchQuery.trim()) {
      const overrides: Record<string, boolean> = {};
      filteredCategories.forEach(cat => {
        overrides[cat.name] = false;
      });
      setSearchOverrides(overrides);
    } else {
      setExpandedKeys([]);
      sessionStorage.setItem("expanded_categories", JSON.stringify([]));
    }
  };

  const filteredCategories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return careersData.categories;

    return careersData.categories
      .map(category => {
        const isCategoryMatch = category.name.toLowerCase().includes(query);
        const matchingCourses = isCategoryMatch
          ? category.courses
          : category.courses.filter(course =>
              course.name.toLowerCase().includes(query)
            );

        return {
          ...category,
          courses: matchingCourses,
          isDirectMatch: isCategoryMatch
        };
      })
      .filter(category => category.courses.length > 0);
  }, [searchQuery]);

  const toggleCategory = (catName: string) => {
    const isCurrentlyExpanded = isExpanded(catName);
    
    if (searchQuery.trim()) {
      setSearchOverrides(prev => ({
        ...prev,
        [catName]: !isCurrentlyExpanded
      }));
    } else {
      setExpandedKeys(prev => {
        const next = prev.includes(catName)
          ? prev.filter(k => k !== catName)
          : [...prev, catName];
        sessionStorage.setItem("expanded_categories", JSON.stringify(next));
        return next;
      });
    }
  };

  const isExpanded = (catName: string) => {
    if (catName in searchOverrides) {
      return searchOverrides[catName];
    }
    if (searchQuery.trim()) {
      return true;
    }
    return expandedKeys.includes(catName);
  };

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${escapeRegExp(query)})`, "gi"));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className="bg-brand-accent/20 text-brand-accent font-semibold px-0.5 rounded">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  // Autocomplete Suggestions matching logic
  const searchSuggestions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return null;

    const matchedCourses: Course[] = [];
    const matchedCategories: string[] = [];

    careersData.categories.forEach(cat => {
      if (cat.name.toLowerCase().includes(query)) {
        matchedCategories.push(cat.name);
      }
      cat.courses.forEach(course => {
        if (course.name.toLowerCase().includes(query) || course.slug.toLowerCase().includes(query)) {
          matchedCourses.push(course);
        }
      });
    });

    const matchedColleges = POPULAR_COLLEGES.filter(c => c.name.toLowerCase().includes(query));
    const matchedExams = POPULAR_EXAMS.filter(e => e.toLowerCase().includes(query));

    return {
      courses: matchedCourses.slice(0, 4),
      categories: matchedCategories.slice(0, 2),
      colleges: matchedColleges.slice(0, 2),
      exams: matchedExams.slice(0, 2)
    };
  }, [searchQuery]);

  const hasSuggestions = searchSuggestions && (
    searchSuggestions.courses.length > 0 ||
    searchSuggestions.categories.length > 0 ||
    searchSuggestions.colleges.length > 0 ||
    searchSuggestions.exams.length > 0
  );

  return (
    <div className="relative min-h-screen bg-bg-primary text-slate-100 pb-24 font-sans select-none overflow-x-hidden">
      {/* Background radial blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 blur-[150px] opacity-40"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-brand-accent/5 to-brand-primary/5 blur-[150px] opacity-40"></div>
      </div>

      {/* Header Panel */}
      <header className="relative z-20 w-full max-w-4xl mx-auto pt-8 px-6 flex items-center justify-between">
        <button 
          onClick={onBack || (() => { window.location.href = "/"; })}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
        <div className="text-xs text-slate-500 font-bold tracking-widest uppercase font-display">
          PCB Stream Map
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-3xl mx-auto px-6 mt-12">
        
        {/* Page Titles */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent font-display leading-[1.1] pb-1">
            Explore Career Possibilities
          </h1>
          <p className="text-slate-400 max-w-md mx-auto text-sm md:text-base leading-relaxed font-medium">
            Discover alternative career pipelines after board exams. Explore details regarding starting salaries, eligibility, and core subjects.
          </p>
        </div>

        {/* Spotlight-like Search Controls Wrapper */}
        <div ref={searchDropdownRef} className="relative z-30 mb-12">
          <div className="p-3 bg-[#161616]/95 border border-[#2A2A2A] backdrop-blur-xl rounded-2xl shadow-xl shadow-black/40 flex flex-col sm:flex-row gap-3 items-center">
            {/* Search bar */}
            <div className="relative flex-grow w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4.5 h-4.5 text-slate-500" />
              <input 
                type="text"
                placeholder="Search courses, careers, colleges, exams..."
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0E0E0E] border border-[#232323] rounded-xl py-2.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/20 transition-all duration-200 font-medium"
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2 w-full sm:w-auto shrink-0 justify-end">
              <button 
                onClick={handleExpandAll}
                className="flex-grow sm:flex-grow-0 px-4 py-2.5 bg-[#1B1B1B] hover:bg-[#252525] border border-[#2A2A2A] rounded-xl text-xs font-bold hover:text-white transition-all duration-200 flex items-center justify-center gap-1.5"
                title="Expand All Categories"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                Expand All
              </button>
              <button 
                onClick={handleCollapseAll}
                className="flex-grow sm:flex-grow-0 px-4 py-2.5 bg-[#1B1B1B] hover:bg-[#252525] border border-[#2A2A2A] rounded-xl text-xs font-bold hover:text-white transition-all duration-200 flex items-center justify-center gap-1.5"
                title="Collapse All Categories"
              >
                <Minimize2 className="w-3.5 h-3.5" />
                Collapse All
              </button>
            </div>
          </div>

          {/* Autocomplete Spotlight Dropdown */}
          <AnimatePresence>
            {isSearchFocused && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute left-0 right-0 mt-2 bg-[#141414] border border-[#2A2A2A] rounded-2xl shadow-2xl shadow-black/80 overflow-hidden"
              >
                {!searchQuery.trim() ? (
                  // Initial Default Suggestions (when input is empty)
                  <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
                        Popular Searches
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {POPULAR_SEARCHES.map(item => (
                          <button
                            key={item}
                            onClick={() => { setSearchQuery(item); }}
                            className="px-3 py-1.5 bg-[#1B1B1B] hover:bg-[#22C55E]/10 border border-[#2A2A2A] hover:border-[#22C55E]/30 rounded-lg text-xs font-semibold text-slate-300 hover:text-white transition-all"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-brand-primary" />
                        Qualifying Exams
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {POPULAR_EXAMS.map(item => (
                          <button
                            key={item}
                            onClick={() => { setSearchQuery(item); }}
                            className="px-3 py-1.5 bg-[#1B1B1B] hover:bg-brand-primary/10 border border-[#2A2A2A] hover:border-brand-primary/30 rounded-lg text-xs font-semibold text-slate-300 hover:text-white transition-all"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : hasSuggestions ? (
                  // Real-time suggestions matched against query
                  <div className="p-3 max-h-[360px] overflow-y-auto space-y-4 no-scrollbar">
                    {searchSuggestions.courses.length > 0 && (
                      <div>
                        <h4 className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest px-3 mb-2">Career Pathways</h4>
                        <div className="space-y-1">
                          {searchSuggestions.courses.map(course => (
                            <a
                              key={course.slug}
                              href={`/explore/${course.slug}`}
                              className="flex items-center justify-between px-3 py-3 hover:bg-brand-primary/10 rounded-lg group transition-colors"
                            >
                              <span className="text-xs font-semibold text-slate-200 group-hover:text-white">{course.name}</span>
                              <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-brand-primary transition-transform group-hover:translate-x-0.5" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {searchSuggestions.categories.length > 0 && (
                      <div>
                        <h4 className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest px-3 mb-2">Categories</h4>
                        <div className="space-y-1">
                          {searchSuggestions.categories.map(cat => (
                            <button
                              key={cat}
                              onClick={() => {
                                toggleCategory(cat);
                                setIsSearchFocused(false);
                                // scroll to element with a slight timeout
                                setTimeout(() => {
                                  document.getElementById(`category-${cat.replace(/\s+/g, '-').toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }, 100);
                              }}
                              className="w-full flex items-center justify-between px-3 py-3 hover:bg-[#22C55E]/10 rounded-lg group text-left transition-colors"
                            >
                              <span className="text-xs font-semibold text-slate-200 group-hover:text-white">{cat}</span>
                              <span className="text-[10px] font-bold text-[#22C55E] opacity-0 group-hover:opacity-100 transition-opacity">Expand Group &darr;</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {searchSuggestions.colleges.length > 0 && (
                      <div>
                        <h4 className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest px-3 mb-2">Featured Colleges</h4>
                        <div className="space-y-1">
                          {searchSuggestions.colleges.map(coll => (
                            <a
                              key={coll.name}
                              href={`/explore/${coll.slug}`}
                              className="flex items-center justify-between px-3 py-3 hover:bg-brand-accent/10 rounded-lg group transition-colors"
                            >
                              <div className="flex items-center gap-2">
                                <Building2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-accent" />
                                <span className="text-xs font-semibold text-slate-200 group-hover:text-white">{coll.name}</span>
                              </div>
                              <span className="text-[10px] font-bold text-brand-accent font-mono">View Pathways &rarr;</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  // No results found fallback
                  <div className="p-6 text-center text-slate-500 text-xs font-semibold">
                    No exact autocomplete matches found. Try typing another term.
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Roadmap Tree Wrapper */}
        <div className="relative w-full max-w-2xl mx-auto pl-2 sm:pl-0">
          {/* Vertical Connecting Roadmap Line */}
          <div className="hidden sm:block absolute left-6 top-[-1.5rem] bottom-8 w-[2px] bg-gradient-to-b from-brand-primary/30 via-brand-accent/10 to-transparent transform pointer-events-none z-0"></div>

          <div className="flex flex-col gap-6 relative z-10">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => {
                const expanded = isExpanded(category.name);
                const categoryId = `category-${category.name.replace(/\s+/g, '-').toLowerCase()}`;
                
                return (
                  <div key={category.name} id={categoryId} className="relative">
                    {/* Visual node connector dot (Desktop only) */}
                    <div className={`hidden sm:block absolute left-[21.5px] top-7 w-[11px] h-[11px] rounded-full bg-[#0B0B0B] border-2 transition-all duration-300 z-20 ${
                      expanded ? 'border-brand-primary shadow-sm shadow-brand-primary' : 'border-slate-800'
                    }`}></div>

                    {/* Category Block Header Card */}
                    <button 
                      onClick={() => toggleCategory(category.name)}
                      className={`w-full text-left p-6 pl-6 sm:pl-14 bg-[#141414] border rounded-2xl flex flex-col justify-between transition-all duration-300 group z-10 relative ${
                        expanded 
                          ? "border-brand-primary/30 shadow-xl shadow-black/35" 
                          : "border-border-primary hover:border-slate-700 hover:-translate-y-0.5"
                      }`}
                    >
                      <div className="flex items-start justify-between w-full">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform duration-300">
                            {category.emoji}
                          </div>
                          <div className="space-y-1">
                            <h3 className="font-extrabold text-slate-100 group-hover:text-white font-display text-base sm:text-lg transition-colors duration-200">
                              {highlightText(category.name, searchQuery)}
                              <span className="text-xs text-slate-500 font-bold ml-2 font-mono">
                                ({category.courses.length} Career Paths)
                              </span>
                            </h3>
                            <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-xl">
                              {CATEGORY_DESCRIPTIONS[category.name] || "Explore career roadmap details, colleges, salaries, and scopes."}
                            </p>
                          </div>
                        </div>
                        
                        <div className="shrink-0 w-8 h-8 rounded-lg bg-white/[0.02] group-hover:bg-white/[0.05] border border-white/5 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors duration-200 mt-1">
                          {expanded ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </div>
                      </div>

                      {/* Preview mini tags for career paths if collapsed */}
                      {!expanded && category.courses.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4 pl-0 sm:pl-16">
                          {category.courses.slice(0, 3).map((course, cIdx) => (
                            <span key={cIdx} className="px-2 py-1 bg-[#1A1A1A] border border-white/[0.03] text-[10px] font-semibold text-slate-400 rounded-md">
                              {course.name}
                            </span>
                          ))}
                          {category.courses.length > 3 && (
                            <span className="text-[10px] text-slate-500 font-bold pt-1">
                              +{category.courses.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </button>

                    {/* Child Course Nodes List with Smooth Transition */}
                    <AnimatePresence initial={false}>
                      {expanded && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="relative pl-6 sm:pl-16 ml-[26px] border-l-2 border-slate-800/80 flex flex-col gap-3 mt-3 pb-3">
                            {category.courses.map((course) => (
                              <a 
                                key={course.slug}
                                href={`/explore/${course.slug}`}
                                className="relative flex items-center justify-between p-3.5 bg-[#141414]/30 hover:bg-brand-primary/[0.03] border border-[#202020] hover:border-brand-primary/20 rounded-xl transition-all duration-300 ease-out group font-sans outline-none"
                              >
                                {/* Horizontal Connection Tree Line */}
                                <div className="hidden sm:block absolute left-[-1.5rem] top-1/2 w-6 h-[2px] bg-slate-800 group-hover:bg-brand-primary/20 transition-colors duration-300"></div>
                                
                                <span className="font-semibold text-sm text-slate-300 group-hover:text-white transition-colors">
                                  {highlightText(course.name, searchQuery)}
                                </span>
                                
                                <div className="w-6 h-6 rounded-md flex items-center justify-center text-slate-500 group-hover:text-brand-accent transform group-hover:translate-x-0.5 transition-all duration-300">
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </div>
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-16 bg-white/[0.01] border border-white/5 rounded-2xl">
                <Sparkles className="w-8 h-8 text-slate-600 mx-auto mb-3" />
                <p className="text-sm text-slate-500 font-bold">No career options found matching your query.</p>
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}
