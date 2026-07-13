import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GitMerge, ChevronRight, ChevronDown, Network, Compass, Landmark, IndianRupee } from 'lucide-react';
import type { CareerNode } from '@/types/Course';

interface Props {
  roadmap: CareerNode[];
}

export default function CareerRoadmap({ roadmap }: Props) {
  return (
    <section id="career-section" className="py-12 scroll-mt-24">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
          <Network className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white font-display tracking-tight">Career Branching Map</h2>
          <p className="text-xs text-slate-400 mt-1">Explore specialized career pathways and milestones after graduation. Click branches to expand.</p>
        </div>
      </div>

      <div className="space-y-6 relative pl-2 md:pl-0">
        {/* Neon vertical connecting track line for root level */}
        <div className="absolute left-4 md:left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-violet-500 via-cyan-500 to-transparent opacity-40"></div>
        
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

  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: idx * 0.05 }}
      className={`relative ${level > 0 ? 'ml-6 md:ml-10' : ''}`}
    >
      {/* Horizontal connector line */}
      {level > 0 && (
        <div className="absolute -left-6 md:-left-10 top-7 w-6 md:w-10 h-0.5 bg-slate-700/60" />
      )}
      
      {/* Node Content Container */}
      <div 
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
        className={`premium-glass p-5 rounded-2xl border-l-4 ${
          level === 0 
            ? 'border-l-violet-500 hover:border-l-violet-400 bg-violet-500/[0.02]' 
            : 'border-l-cyan-500 hover:border-l-cyan-400 bg-cyan-500/[0.01]'
        } ${hasChildren ? 'cursor-pointer' : ''} flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300 premium-glass-hover`}
      >
        <div className="flex items-start md:items-center gap-3.5 flex-1">
          {hasChildren ? (
            <button className="mt-0.5 md:mt-0 w-7 h-7 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] shrink-0 transition-colors">
              {isExpanded ? <ChevronDown className="w-4 h-4 text-violet-400" /> : <ChevronRight className="w-4 h-4 text-cyan-400" />}
            </button>
          ) : (
            <div className="w-7 h-7 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-center shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400/80 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
            </div>
          )}
          
          <div>
            <h4 className="text-sm md:text-base font-bold text-slate-100 flex items-center gap-2">
              {level === 0 && <Compass className="w-4 h-4 text-violet-400" />}
              {node.title}
            </h4>
            {node.description && <p className="text-xs text-slate-400 mt-1 leading-relaxed">{node.description}</p>}
          </div>
        </div>
        
        {node.salary && (
          <div className="md:text-right shrink-0 ml-10 md:ml-0 flex md:flex-col items-center md:items-end gap-2 md:gap-0">
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Avg Salary</span>
            <span className="text-xs md:text-sm font-extrabold text-emerald-400 flex items-center gap-0.5 mt-0.5">
              <IndianRupee className="w-3.5 h-3.5 stroke-[3]" />
              {node.salary.replace(/^₹\s*/, '')}
            </span>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isExpanded && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mt-4 space-y-4 relative"
          >
            {/* Visual connecting line for children */}
            <div className="absolute left-3.5 md:left-5 top-0 bottom-7 w-0.5 bg-gradient-to-b from-slate-700/60 to-transparent"></div>
            
            {node.children!.map((child, cIdx) => (
              <TreeNode key={child.id} node={child} level={level + 1} idx={cIdx} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
