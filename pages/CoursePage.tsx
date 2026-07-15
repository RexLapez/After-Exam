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

function updateMetaTag(name: string, content: string) {
  let element = document.querySelector(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('name', name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function updateOgTag(property: string, content: string) {
  let element = document.querySelector(`meta[property="${property}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('property', property);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function updateTwitterTag(name: string, content: string) {
  let element = document.querySelector(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('name', name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function updateCanonical(url: string) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

function updateJsonLd(course: any, title: string, description: string, url: string) {
  // Remove existing dynamic json-ld
  const existing = document.querySelectorAll('script[type="application/ld+json"].dynamic-seo');
  existing.forEach(el => el.remove());

  // Breadcrumb List
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://afterexam.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Explore",
        "item": "https://afterexam.in/explore"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": course.title,
        "item": url
      }
    ]
  };

  // EducationalOccupationalProgram Schema
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    "name": course.title,
    "description": description,
    "educationalCredentialAwarded": course.overview.degreeType || "Degree",
    "programDuration": {
      "@type": "QuantitativeValue",
      "value": parseInt(course.overview.duration) || 3,
      "unitText": "YEAR"
    },
    "occupationalCredentialAwarded": {
      "@type": "Credential",
      "name": course.overview.recognition
    },
    "provider": {
      "@type": "Organization",
      "name": "AfterExam",
      "url": "https://afterexam.in"
    }
  };

  const script1 = document.createElement('script');
  script1.type = 'application/ld+json';
  script1.className = 'dynamic-seo';
  script1.text = JSON.stringify(breadcrumbSchema);
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.type = 'application/ld+json';
  script2.className = 'dynamic-seo';
  script2.text = JSON.stringify(courseSchema);
  document.head.appendChild(script2);
}

export default function CoursePage({ slug: propSlug }: { slug?: string }) {
  const slug = propSlug || window.location.pathname.split('/').filter(Boolean).pop() || '';
  const course = getCourseBySlug(slug);

  useEffect(() => {
    if (course) {
      const titleText = `${course.title} After 12th PCB | Colleges, Fees, Salary & Career Guide | AfterExam`;
      const entranceReq = course.overview.entranceExams.length > 0 
        ? `${course.overview.entranceExams.join('/')} requirements` 
        : 'eligibility';
      const descText = `Complete guide to ${course.title} after 12th including eligibility, ${entranceReq}, colleges, fees, salary, career scope and future opportunities.`;
      const urlText = `https://afterexam.in/explore/${course.slug}`;

      document.title = titleText;
      updateMetaTag('description', descText);
      updateMetaTag('keywords', `${course.title.toLowerCase()}, ${course.category.toLowerCase()}, career after 12th, afterexam`);
      updateCanonical(urlText);
      
      updateOgTag('og:title', titleText);
      updateOgTag('og:description', descText);
      updateOgTag('og:url', urlText);
      updateOgTag('og:image', 'https://afterexam.in/assets/og-image.png');

      updateTwitterTag('twitter:title', titleText);
      updateTwitterTag('twitter:description', descText);
      updateTwitterTag('twitter:image', 'https://afterexam.in/assets/og-image.png');

      updateJsonLd(course, titleText, descText, urlText);
    } else {
      document.title = 'AFTER EXAM | Course Not Found';
    }

    return () => {
      // Revert to Explore Page Defaults on unmount
      document.title = 'AFTER EXAM | After Exam Pathfinder';
      updateMetaTag('description', 'Explore interactive neural career pathways mapped out specifically for science (PCB) students.');
      updateMetaTag('keywords', 'after exam pathfinder, career map, neet career alternatives, biology student paths, pcb career exploration');
      updateCanonical('https://afterexam.in/explore');
      
      updateOgTag('og:title', 'AFTER EXAM | After Exam Pathfinder');
      updateOgTag('og:description', 'Explore interactive neural career pathways mapped out specifically for science (PCB) students.');
      updateOgTag('og:url', 'https://afterexam.in/explore');
      updateOgTag('og:image', 'https://afterexam.in/assets/og-image.png');

      updateTwitterTag('twitter:title', 'AFTER EXAM | After Exam Pathfinder');
      updateTwitterTag('twitter:description', 'Explore interactive neural career pathways mapped out specifically for science (PCB) students.');
      updateTwitterTag('twitter:image', 'https://afterexam.in/assets/og-image.png');

      const existing = document.querySelectorAll('script[type="application/ld+json"].dynamic-seo');
      existing.forEach(el => el.remove());
    };
  }, [course]);

  if (!course) {
    return (
      <div className="min-h-screen bg-bg-primary text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-black font-display mb-4">Course Not Found</h1>
        <p className="text-slate-400 mb-8 max-w-md">The career path you're looking for doesn't exist or is currently being updated in our database.</p>
        <a href="/explore" className="px-6 py-3 bg-brand-primary hover:bg-brand-hover rounded-xl font-bold text-sm transition-colors">
          Return to Pathfinder
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary text-slate-100 font-sans selection:bg-brand-primary/30 selection:text-brand-accent">

      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-brand-accent/5 to-brand-success/5 blur-[120px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full max-w-[1400px] mx-auto px-6 py-5 flex items-center justify-between border-b border-border-primary bg-bg-primary/80 backdrop-blur-md">
        <a href="/" className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent tracking-wide font-display">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" className="text-brand-primary">
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
