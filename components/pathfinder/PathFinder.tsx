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
  Sparkles
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

export default function PathFinder({ onBack }: NeuralPathwayProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedKeys, setExpandedKeys] = useState<string[]>(() => {
    try {
      const saved = sessionStorage.getItem("expanded_categories");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  
  // Track overrides during search so user can expand/collapse manually while filtering
  const [searchOverrides, setSearchOverrides] = useState<Record<string, boolean>>({});

  // Reset search overrides when search query is cleared
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchOverrides({});
    }
  }, [searchQuery]);

  // Expand / Collapse All logic
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

  // Filter categories and courses
  const filteredCategories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return careersData.categories;

    return careersData.categories
      .map(category => {
        const isCategoryMatch = category.name.toLowerCase().includes(query);
        // If category matches, show all its courses. Otherwise, show only matching courses.
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

  // Toggle Category expanded state
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

  // Helper to check if category is expanded
  const isExpanded = (catName: string) => {
    if (catName in searchOverrides) {
      return searchOverrides[catName];
    }
    // Default to expanded if there is an active search query
    if (searchQuery.trim()) {
      return true;
    }
    return expandedKeys.includes(catName);
  };

  // Text highlighting helper
  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${escapeRegExp(query)})`, "gi"));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className="bg-cyan-500/20 text-cyan-300 font-medium px-0.5 rounded">
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

  return (
    <div className="relative min-h-screen bg-[#020205] text-slate-100 pb-24 font-sans select-none overflow-x-hidden">
      {/* Background radial blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-violet-600/10 to-cyan-500/10 blur-[150px] opacity-40"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-cyan-600/10 to-emerald-500/10 blur-[150px] opacity-40"></div>
      </div>

      {/* Header Panel */}
      <header className="relative z-10 w-full max-w-4xl mx-auto pt-8 px-6 flex items-center justify-between">
        <button 
          onClick={onBack || (() => { window.location.href = "/"; })}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
        <div className="text-xs text-slate-500 font-medium tracking-widest uppercase font-display">
          PCB Stream Map
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-3xl mx-auto px-6 mt-12">
        
        {/* Page Titles */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent font-display mb-4">
            Explore Career Possibilities
          </h1>
          <p className="text-slate-400 max-w-md mx-auto text-sm md:text-base leading-relaxed">
            Click on any branch node below to expand career groups. Selecting a course opens its dedicated path.
          </p>
        </div>

        {/* Sticky Controls Panel */}
        <div className="sticky top-6 z-30 mb-12 p-3 bg-slate-950/60 border border-white/5 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/40 flex flex-col sm:flex-row gap-3 items-center">
          {/* Search bar */}
          <div className="relative flex-grow w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4.5 h-4.5 text-slate-500" />
            <input 
              type="text"
              placeholder="Search courses, careers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.04] transition-all duration-200"
            />
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2 w-full sm:w-auto shrink-0 justify-end">
            <button 
              onClick={handleExpandAll}
              className="flex-grow sm:flex-grow-0 px-4 py-2.5 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 rounded-xl text-xs font-semibold hover:text-white transition-all duration-200 flex items-center justify-center gap-1.5"
              title="Expand All Categories"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              Expand All
            </button>
            <button 
              onClick={handleCollapseAll}
              className="flex-grow sm:flex-grow-0 px-4 py-2.5 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 rounded-xl text-xs font-semibold hover:text-white transition-all duration-200 flex items-center justify-center gap-1.5"
              title="Collapse All Categories"
            >
              <Minimize2 className="w-3.5 h-3.5" />
              Collapse All
            </button>
          </div>
        </div>

        {/* Root Node of the Tree */}
        <div className="flex flex-col items-center mb-12 relative z-20">
          <div className="px-6 py-3.5 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-2xl shadow-xl shadow-violet-500/10 text-white font-extrabold text-base tracking-wide flex items-center gap-2.5 border border-white/10 font-display">
            <Compass className="w-5 h-5 text-cyan-300 animate-spin-slow" />
            PCB AFTER CLASS 12
          </div>
        </div>

        {/* Roadmap Tree Wrapper */}
        <div className="relative w-full max-w-2xl mx-auto pl-2 sm:pl-0">
          {/* Vertical Connecting Roadmap Line (Desktop & Tablet) */}
          <div className="hidden sm:block absolute left-6 top-[-3rem] bottom-8 w-0.5 bg-gradient-to-b from-violet-500/40 via-cyan-500/20 to-transparent transform pointer-events-none z-0"></div>

          <div className="flex flex-col gap-6 relative z-10">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => {
                const expanded = isExpanded(category.name);
                return (
                  <div key={category.name} className="relative">
                    {/* Tiny visual node connector dot (Desktop only) */}
                    <div className="hidden sm:block absolute left-[21.5px] top-6 w-2.5 h-2.5 rounded-full bg-slate-900 border border-violet-500/50 z-20"></div>

                    {/* Category Block Header Card */}
                    <button 
                      onClick={() => toggleCategory(category.name)}
                      className={`w-full text-left p-4 pl-4 sm:pl-12 bg-white/[0.02] border rounded-2xl flex items-center justify-between transition-all duration-300 group z-10 ${
                        expanded 
                          ? "border-violet-500/30 shadow-lg shadow-violet-500/5 bg-white/[0.04]" 
                          : "border-white/5 hover:border-white/15"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl shrink-0 leading-none">{category.emoji}</span>
                        <span className="font-bold text-sm sm:text-base text-slate-100 group-hover:text-white font-display transition-colors duration-200">
                          {highlightText(category.name, searchQuery)}
                          <span className="text-xs text-slate-500 font-medium ml-2 shrink-0">
                            ({category.courses.length})
                          </span>
                        </span>
                      </div>
                      
                      <div className="shrink-0 w-8 h-8 rounded-lg bg-white/[0.02] group-hover:bg-white/[0.05] border border-white/5 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors duration-200">
                        {expanded ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </div>
                    </button>

                    {/* Child Course Nodes List */}
                    <AnimatePresence initial={false}>
                      {expanded && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="relative pl-5 sm:pl-16 ml-[23px] border-l-2 border-slate-800/80 flex flex-col gap-3 mt-3 pb-3">
                            {category.courses.map((course) => (
                              <a 
                                key={course.slug}
                                href={`/courses/${course.slug}`}
                                className="relative flex items-center justify-between p-3.5 bg-white/[0.01] hover:bg-violet-500/[0.04] border border-white/5 hover:border-violet-500/30 rounded-xl transition-all duration-[3000ms] ease-out group font-sans outline-none"
                              >
                                {/* Horizontal Connection Tree Line (Desktop only) */}
                                <div className="hidden sm:block absolute left-[-1.5rem] top-1/2 w-6 h-0.5 bg-slate-800 group-hover:bg-violet-500/30 transition-colors duration-500"></div>
                                
                                <span className="font-medium text-sm text-slate-300 group-hover:text-white transition-colors duration-[1000ms]">
                                  {highlightText(course.name, searchQuery)}
                                </span>

                                <div className="w-6 h-6 rounded-md flex items-center justify-center text-slate-500 group-hover:text-violet-400 transform group-hover:translate-x-0.5 transition-all duration-[1500ms]">
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
              <div className="text-center py-12 bg-white/[0.01] border border-white/5 rounded-2xl">
                <Sparkles className="w-8 h-8 text-slate-600 mx-auto mb-3" />
                <p className="text-sm text-slate-500 font-medium">No career options found matching your query.</p>
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}
