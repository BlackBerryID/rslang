import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './app.scss'
import Header from '../header';
import Homepage from "../homepage";

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App