import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/HomePage/Home';
import Navbar from "../components/Navbar/Navbar";
import Series from '../pages/SeriesPage/Series';
import Episode from '../pages/EpisodePage/Episode';

const AppRouter = () => {
  const [langidx, setLangidx] = useState(0);
  return (
    <BrowserRouter>
      <Navbar setLangidx={setLangidx} langidx={langidx}/>
      <Routes>
        <Route path="/" element={<Home langidx={langidx}/>} />
        <Route path="/series/:sid" element={<Series />} />
        <Route path="/episode/:eid" element={<Episode />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter