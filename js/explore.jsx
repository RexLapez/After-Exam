import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import NeuralPathway from '../components/pathfinder/PathFinder.tsx';
import CoursePage from '../pages/CoursePage';
import '../css/explore.css';
import '../css/course.css';

const COURSE_REDIRECTS = {
  'genetic-engineering': 'btech-biotechnology',
  'molecular-biology': 'bsc-biology',
  'cell-biology': 'bsc-biology',
  'medical-biotechnology': 'bsc-biotechnology',
  'industrial-biotechnology': 'bsc-biotechnology',
  'plant-biotechnology': 'bsc-biotechnology',
  'agricultural-biotechnology': 'bsc-biotechnology',
  'integrated-msc-biotechnology': 'bsc-biotechnology',
  'agricultural-engineering': 'bsc-agriculture',
  'seed-technology': 'bsc-agriculture',
  'sericulture': 'bsc-agriculture',
  'silk-technology': 'bsc-agriculture',
  'animal-husbandry': 'bvsc-and-ah',
  'applied-psychology': 'ba-psychology',
  'clinical-nutrition': 'nutrition-and-dietetics',
  'cardiac-technology': 'other-allied-health',
  'audiology': 'other-allied-health',
  'anm': 'gnm',
  'msc-health-informatics': 'bca'
};

function ExploreApp() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);

    const handleGlobalClick = (e) => {
      const target = e.target;
      const anchor = target && typeof target.closest === 'function' ? target.closest('a') : null;
      if (anchor && !anchor.target && !anchor.hasAttribute('download')) {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('/explore')) {
          e.preventDefault();
          window.history.pushState(null, '', href);
          setCurrentPath(href);
        }
      }
    };
    document.addEventListener('click', handleGlobalClick);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [currentPath]);

  const navigate = (path) => {
    window.history.pushState(null, '', path);
    setCurrentPath(path);
  };

  const segments = currentPath.split('/').filter(Boolean);
  const isCoursePage = segments.length > 1 && segments[0] === 'explore';
  let slug = isCoursePage ? segments[1] : '';

  if (slug && COURSE_REDIRECTS[slug]) {
    const newSlug = COURSE_REDIRECTS[slug];
    window.history.replaceState(null, '', `/explore/${newSlug}`);
    slug = newSlug;
  }

  if (isCoursePage) {
    return (
      <CoursePage 
        slug={slug} 
        onBack={() => navigate('/explore')} 
      />
    );
  }

  return (
    <NeuralPathway 
      onBack={() => { window.location.href = '/'; }} 
    />
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ExploreApp />
  </React.StrictMode>
);
