import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Residents from "./components/Residents";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/residents">Residents</Link>
      </nav>
      <Routes>
        <Route path="/residents" element={<Residents />} />
      </Routes>
    </Router>
  );
}

export default App;
