import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import MovieDetail from './pages/movieDetail/MovieDetail';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/detail/:id' element={<MovieDetail />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
