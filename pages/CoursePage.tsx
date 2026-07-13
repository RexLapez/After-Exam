import React, { useEffect } from 'react';
import { getCourseBySlug } from '@/data/courses';
import { ArrowLeft } from 'lucide-react';

import CourseHero from '@/components/course/CourseHero';
import CourseQuickStats from '@/components/course/CourseQuickStats';
import CourseSnapshot from '@/components/course/CourseSnapshot';
import IsRightForYou from '@/components/course/IsRightForYou';
import CareerRoadmap from '@/components/course/CareerRoadmap';
import SalaryTimeline from '@/components/course/SalaryTimeline';
import TopColleges from '@/components/course/TopColleges';
import AdmissionProcess from '@/components/course/AdmissionProcess';
import SemesterRoadmap from '@/components/course/SemesterRoadmap';
import FutureScope from '@/components/course/FutureScope';
import CourseFAQ from '@/components/course/CourseFAQ';
import RelatedCourses from '@/components/course/RelatedCourses';
import StickySidebar from '@/components/course/StickySidebar';

export default function CoursePage() {
  const slug = window.location.pathname.split('/').filter(Boolean).pop() || '';
  const course = getCourseBySlug(slug);

  useEffect(() => {
    if (course) {
      document.title = `AFTER EXAM | ${course.title}`;
    } else {
      document.title = 'AFTER EXAM | Course Not Found';
    }
  }, [course]);

  if (!course) {
    return (
      <div className="min-h-screen bg-[#020205] text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-black font-display mb-4">Course Not Found</h1>
        <p className="text-slate-400 mb-8 max-w-md">The career path you're looking for doesn't exist or is currently being updated in our database.</p>
        <a href="/explore" className="px-6 py-3 bg-violet-600 hover:bg-violet-500 rounded-full font-bold text-sm transition-colors">
          Return to Pathfinder
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020205] text-slate-100 font-sans selection:bg-violet-500/30 selection:text-violet-200">

      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-violet-600/5 to-cyan-500/5 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-cyan-600/5 to-emerald-500/5 blur-[120px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full max-w-[1400px] mx-auto px-6 py-5 flex items-center justify-between border-b border-white/5 bg-[#020205]/80 backdrop-blur-md">
        <a href="/" className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent tracking-wide font-display">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" className="text-violet-500">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
          AFTER EXAM
        </a>
        <a href="/explore" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Career Map</span>
          <span className="sm:hidden">Back</span>
        </a>
      </header>

      {/* Main Layout */}
      <main className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

        {/* Sidebar Nav */}
        <StickySidebar />

        {/* Content Area */}
        <div className="flex-1 w-full max-w-4xl pb-32">

          <CourseHero hero={course.hero} category={course.category} categoryEmoji={course.categoryEmoji} />

          <div className="premium-divider my-16" />

          <CourseQuickStats overview={course.overview} />

          <div className="premium-divider my-16" />

          <CourseSnapshot snapshot={course.snapshot} />

          <div className="premium-divider my-16" />

          <IsRightForYou goodFor={course.goodFor} avoidIf={course.avoidIf} />

          <div className="premium-divider my-16" />

          <CareerRoadmap roadmap={course.careerRoadmap} />

          <div className="premium-divider my-16" />

          <SalaryTimeline timeline={course.salaryTimeline} />

          <div className="premium-divider my-16" />

          <TopColleges collegeIds={course.topCollegeIds} />

          <div className="premium-divider my-16" />

          <AdmissionProcess process={course.admissionProcess} />

          <div className="premium-divider my-16" />

          <SemesterRoadmap semesters={course.semesterRoadmap} />

          <div className="premium-divider my-16" />

          <FutureScope scope={course.futureScope} />

          <div className="premium-divider my-16" />

          <CourseFAQ faqs={course.faq} />

          {course.relatedCourseSlugs.length > 0 && (
            <>
              <div className="premium-divider my-16" />
              <RelatedCourses courseSlugs={course.relatedCourseSlugs} />
            </>
          )}

        </div>
      </main>

    </div>
  );
}
