import React, { useEffect, useState } from 'react';

const sections = [
  { id: 'hero-section', label: 'Overview' },
  { id: 'snapshot-section', label: 'Snapshot' },
  { id: 'fit-section', label: 'Is It Right For You?' },
  { id: 'career-section', label: 'Career Map' },
  { id: 'salary-section', label: 'Salary Timeline' },
  { id: 'colleges-section', label: 'Top Colleges' },
  { id: 'admission-section', label: 'Admissions' },
  { id: 'syllabus-section', label: 'Syllabus' },
  { id: 'future-section', label: 'Future Scope' },
  { id: 'faq-section', label: 'FAQs' },
];

export default function StickySidebar() {
  const [activeId, setActiveId] = useState('hero-section');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first intersecting entry
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          setActiveId(visible.target.id);
        }
      },
      { rootMargin: '-15% 0px -55% 0px' }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      // Get the nav height for mobile offset
      const navOffset = window.innerWidth < 1024 ? 70 : 32; 
      const y = el.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block sticky top-24 w-64 shrink-0 h-[calc(100vh-8rem)] overflow-y-auto pr-4 no-scrollbar border-r border-white/5">
        <nav className="space-y-1.5 pr-2">
          <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest px-3 mb-4">On This Page</h4>
          {sections.map((s) => {
            const isActive = activeId === s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => handleClick(e, s.id)}
                className={`group flex items-center justify-between px-3 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 relative ${
                  isActive
                    ? 'text-violet-400 bg-violet-500/5'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]'
                }`}
              >
                <span>{s.label}</span>
                {/* Active indicator dot */}
                <div className={`w-1.5 h-1.5 rounded-full bg-violet-500 transition-all duration-300 ${
                  isActive ? 'opacity-100 scale-100 shadow-[0_0_8px_rgba(139,92,246,0.8)]' : 'opacity-0 scale-50'
                }`} />
              </a>
            );
          })}
        </nav>
      </div>

      {/* Mobile Horizontal Tabs */}
      <div className="lg:hidden sticky top-0 z-40 w-full bg-[#020205]/80 backdrop-blur-xl border-b border-white/5 py-3 overflow-x-auto no-scrollbar shadow-lg shadow-black/20">
        <div className="flex px-4 gap-2 min-w-max">
          {sections.map((s) => {
            const isActive = activeId === s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => handleClick(e, s.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap border transition-all duration-300 ${
                  isActive
                    ? 'bg-violet-500/10 text-violet-400 border-violet-500/30'
                    : 'bg-white/[0.02] text-slate-400 border-white/5 hover:bg-white/[0.05]'
                }`}
              >
                {s.label}
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}
