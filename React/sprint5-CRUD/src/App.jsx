import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home'; 
import SuperHeroList from './pages/SuperHeroList';
import SuperHeroDetail from './pages/SuperHeroDetail';
import SuperHeroCreate from './pages/SuperHeroCreate';
import SuperHeroEdit from './pages/SuperHeroEdit';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App bg-blue-50 min-h-screen">
      <div className="max-w-screen-lg mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/heroes" element={<SuperHeroList />} />
          <Route path="/heroes/create" element={<SuperHeroCreate />} />
          <Route path="/heroes/:id" element={<SuperHeroDetail />} />
          <Route path="/heroes/edit/:id" element={<SuperHeroEdit />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;



