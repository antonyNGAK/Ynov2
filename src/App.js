import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';       // Chemin vers HomePage
import ResultPage from './pages/ResultPage';  //  --||--
import Details from './pages/Details';  // --||--

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/details" element={<Details />} />
        <Route path="*" element={<h2>404 - Page non trouvée</h2>} /> {/* redirection en cas de page erroné */}
      </Routes>
    </Router>
  );
}

export default App;