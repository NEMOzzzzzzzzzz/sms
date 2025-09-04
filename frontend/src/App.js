import React from "react";
import { BrowserRouter as Router} from "react-router-dom";
//import Residents from "./components/Residents";
import Sidebar from "./components/SideBar";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Home />
      </div>
    </Router>
  );
}

export default App;
