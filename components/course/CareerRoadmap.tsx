import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GitMerge, ChevronRight, ChevronDown, Network, Compass, Landmark, IndianRupee, Briefcase, Award } from 'lucide-react';
import type { CareerNode } from '@/types/Course';

interface Props {
  roadmap: CareerNode[];
}

export default function CareerRoadmap({ roadmap }: Props) {
  return (
    <section id="career-section" className="py-16 scroll-mt-24">
      {/* Section Header */}
      <div className="space-y-2 mb-10">
        <div className="inline-block">
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight pb-1.5">Career Branching Map</h2>
          <div className="h-[3px] w-12 bg-brand-primary rounded-full" />
        </div>
        <p className="text-xs sm:text-sm text-slate-400">Explore specialized career pathways and milestones after graduation. Click branches to expand.</p>
      </div>

      {/* Main Roadmap Container */}
      <div className="relative pl-6 md:pl-10 space-y-8">
        {/* Glowing vertical main line track */}
        <div className="absolute left-[23px] md:left-[39px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-brand-primary via-brand-accent to-transparent opacity-30"></div>
        
        {roadmap.map((node, idx) => (
          <TreeNode key={node.id} node={node} level={0} idx={idx} />
        ))}
      </div>
    </section>
  );
}

function TreeNode({ node, level, idx }: { node: CareerNode; level: number; idx: number }) {
  const [isExpanded, setIsExpanded] = useState(level === 0); // Root expanded by default
  const hasChildren = node.children && node.children.length > 0;

  // Compute colors and tags based on tree depth / level
  const getNodeStyles = (lvl: number) => {
    switch (lvl) {
      case 0:
        return {
          border: 'border-l-brand-primary hover:border-l-brand-hover',
          accentBg: 'bg-brand-primary/5',
          accentText: 'text-brand-primary',
          badgeText: 'Entry Pathway',
          icon: Compass,
          cardBg: 'bg-brand-primary/[0.015]'
        };
      case 1:
        return {
          border: 'border-l-brand-accent hover:border-l-brand-hover',
          accentBg: 'bg-brand-accent/5',
          accentText: 'text-brand-accent',
          badgeText: 'Mid-Level',
          icon: Briefcase,
          cardBg: 'bg-brand-accent/[0.01]'
        };
      default:
        return {
          border: 'border-l-brand-success hover:border-l-brand-success/80',
          accentBg: 'bg-brand-success/5',
          accentText: 'text-brand-success',
          badgeText: 'Senior Lead',
          icon: Award,
          cardBg: 'bg-brand-success/[0.01]'
        };
    }
  };

  const styles = getNodeStyles(level);
  const NodeIcon = styles.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: idx * 0.05 }}
      className={`relative ${level > 0 ? 'ml-8 md:ml-12' : ''}`}
    >
      {/* Horizontal connector line with custom track */}
      {level > 0 && (
        <div className="absolute -left-8 md:-left-12 top-8 w-8 md:w-12 h-[2px] bg-gradient-to-r from-transparent to-slate-700/60" />
      )}
      
      {/* Node Content Card */}
      <div 
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
        className={`premium-glass p-5 md:p-6 rounded-2xl border border-border-primary border-l-4 ${styles.border} ${styles.cardBg} ${
          hasChildren ? 'cursor-pointer hover:border-r-brand-primary/10' : ''
        } flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300 premium-glass-hover shadow-md`}
      >
        <div className="flex items-start md:items-center gap-4 flex-1">
          {/* Action toggle button / Bullet mark */}
          {hasChildren ? (
            <button className="mt-1 md:mt-0 w-8 h-8 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] shrink-0 transition-colors shadow-inner">
              {isExpanded ? <ChevronDown className={`w-4 h-4 ${styles.accentText}`} /> : <ChevronRight className="w-4 h-4 text-slate-500" />}
            </button>
          ) : (
            <div className="mt-1.5 md:mt-0 w-8 h-8 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-center shrink-0 shadow-inner">
              <div className={`w-2.5 h-2.5 rounded-full ${styles.accentText} bg-current`} />
            </div>
          )}
          
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h4 className="text-base font-extrabold text-slate-100 flex items-center gap-2">
                <NodeIcon className={`w-4 h-4 ${styles.accentText}`} />
                {node.title}
              </h4>
              <span className={`px-2 py-0.5 rounded-md border text-[9px] font-mono font-bold uppercase tracking-wider ${styles.accentText} ${styles.accentBg} border-current/10`}>
                {styles.badgeText}
              </span>
            </div>
            {node.description && <p className="text-xs text-slate-400 leading-relaxed font-medium">{node.description}</p>}
          </div>
        </div>
        
        {/* Salary marker */}
        {node.salary && (
          <div className="md:text-right shrink-0 ml-12 md:ml-0 flex md:flex-col items-center md:items-end gap-2.5 md:gap-0 pl-4 border-l border-white/5 md:border-l-0 md:pl-0">
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Avg Salary</span>
            <span className="text-sm font-black text-brand-accent flex items-center gap-0.5 mt-0.5 bg-brand-accent/5 px-2.5 py-1 rounded-lg border border-brand-accent/10">
              <IndianRupee className="w-3.5 h-3.5 stroke-[3]" />
              {node.salary.replace(/^₹\s*/, '')}
            </span>
          </div>
        )}
      </div>

      {/* Expandable children list */}
      <AnimatePresence>
        {isExpanded && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mt-4 space-y-4 relative"
          >
            {/* Visual connecting track for children */}
            <div className="absolute left-[15px] md:left-[21px] top-0 bottom-8 w-[2px] bg-gradient-to-b from-slate-700/60 to-transparent" />
            
            {node.children!.map((child, cIdx) => (
              <TreeNode key={child.id} node={child} level={level + 1} idx={cIdx} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
