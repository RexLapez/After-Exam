import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import NeuralPathway from '../components/pathfinder/PathFinder.tsx';
import CoursePage from '../pages/CoursePage';
import '../css/explore.css';
import '../css/course.css';

function ExploreApp() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
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
    window.scrollTo(0, 0);
  }, [currentPath]);

  const navigate = (path) => {
    window.history.pushState(null, '', path);
    setCurrentPath(path);
  };

  const segments = currentPath.split('/').filter(Boolean);
  const isCoursePage = segments.length > 1 && segments[0] === 'explore';
  const slug = isCoursePage ? segments[1] : '';

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
