import React from 'react';
import ReactDOM from 'react-dom/client';
import NeuralPathway from '../components/pathfinder/PathFinder.tsx';
import '../css/explore.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NeuralPathway onBack={() => { window.location.href = '/'; }} />
  </React.StrictMode>
);
