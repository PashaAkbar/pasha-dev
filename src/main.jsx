import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import StarWarsPage from './starwars/StarWarsPage';
import NeoBrutalPage from './neobrutalism/NeoBrutalPage';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/starwars" element={<StarWarsPage />} />
        <Route path="/neo" element={<NeoBrutalPage />} />
        <Route path="*" element={<App />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
