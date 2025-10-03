import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/SideBar";
import Home from "./pages/Home";
import Residents from "./components/Residents";
import Payments from "./components/Payments";
import Announcements from "./components/Announcements";

function App() {
  return (
    <Router>
      <div className="flex h-screen font-sans bg-gray-300 text-lg">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/residents" element={<Residents />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/announcements" element={<Announcements />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
