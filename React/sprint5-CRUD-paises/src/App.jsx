import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import Home from './pages/Home'; 
import CountryList from './pages/CountryList'; 
import CountryDetail from './pages/CountryDetail'; 
import CountryCreate from './pages/CountryCreate'; 
import NotFound from './pages/NotFound'; 

function App() {
  return (
    <div className="App bg-blue-50 min-h-screen">
      <div className="max-w-screen-lg mx-auto p-4">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/countries" element={<CountryList />} />
          <Route path="/countries/:id" element={<CountryDetail />} />
          <Route path="/create" element={<CountryCreate />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <ToastContainer />
    </div>
  );
}

export default App;

