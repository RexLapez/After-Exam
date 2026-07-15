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
      const navOffset = window.innerWidth < 1024 ? 90 : 40; 
      const y = el.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block sticky top-28 w-64 shrink-0 h-[calc(100vh-10rem)] overflow-y-auto pr-4 no-scrollbar">
        <nav className="relative pl-4 border-l border-white/5 space-y-2">
          <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-5 block">On This Page</h4>
          
          {sections.map((s) => {
            const isActive = activeId === s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => handleClick(e, s.id)}
                className={`group flex items-center justify-between py-1.5 text-sm font-semibold transition-all duration-300 relative ${
                  isActive
                    ? 'text-brand-accent font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{s.label}</span>
                {/* Custom sliding indicator bar on the left */}
                {isActive && (
                  <div className="absolute -left-[18px] top-1/2 -translate-y-1/2 w-[3px] h-5 bg-gradient-to-b from-brand-primary to-brand-accent rounded-full" />
                )}
              </a>
            );
          })}
        </nav>
      </div>

      {/* Mobile Horizontal Navigation Tabs */}
      <div className="lg:hidden sticky top-[69px] z-40 w-full bg-bg-primary/90 backdrop-blur-xl border-b border-border-primary py-3 overflow-x-auto no-scrollbar shadow-lg shadow-black/20">
        <div className="flex px-4 gap-2.5 min-w-max">
          {sections.map((s) => {
            const isActive = activeId === s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => handleClick(e, s.id)}
                className={`px-4 py-2 rounded-full text-xs font-black transition-all duration-300 border ${
                  isActive
                    ? 'bg-brand-primary/10 text-brand-primary border-brand-primary/30'
                    : 'bg-white/[0.02] text-slate-400 border-white/5 hover:bg-white/[0.04]'
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
