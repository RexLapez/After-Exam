import React from 'react';
import { motion } from 'motion/react';
import { Layers, ArrowRight } from 'lucide-react';
import { getCourseBySlug } from '@/data/courses';

interface Props {
  courseSlugs: string[];
}

export default function RelatedCourses({ courseSlugs }: Props) {
  const related = courseSlugs.map(slug => getCourseBySlug(slug)).filter(Boolean);

  if (!related || related.length === 0) return null;

  return (
    <section id="related-section" className="py-12 scroll-mt-24">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white font-display tracking-tight">Similar Career Paths</h2>
          <p className="text-xs text-slate-400 mt-1">Other alternative academic paths that match your streams and interest profile.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {related.map((course, idx) => (
          <motion.a
            key={course!.slug}
            href={`/courses/${course!.slug}`}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="premium-glass p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 premium-glass-hover group h-full"
          >
            <div>
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-xl shrink-0">
                  {course!.categoryEmoji || '🩺'}
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">{course!.category}</span>
                  <h3 className="text-sm md:text-base font-bold text-slate-100 group-hover:text-violet-400 transition-colors leading-snug mt-0.5">{course!.title}</h3>
                </div>
              </div>
              
              <p className="text-xs md:text-sm text-slate-400 font-medium mb-6 line-clamp-2">
                {course!.hero.subtitle}
              </p>
            </div>
            
            <div className="flex justify-between items-center text-xs font-bold pt-4 border-t border-white/5">
              <span className="text-slate-500 font-mono">{course!.hero.duration}</span>
              <span className="text-cyan-400 flex items-center gap-1">
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
