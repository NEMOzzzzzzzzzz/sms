import React from "react";
import { BrowserRouter as Router} from "react-router-dom";
//import Residents from "./components/Residents";
import Sidebar from "./components/SideBar";
import Home from "./pages/Home";
import "C:\\Projects\\sms\\frontend\\src\\styles\\SideBar.css";

function App() {
  return (
    <Router>
        <div style={{display: "flex"}}>
          <Sidebar />
          <Home />
        </div>
    </Router>
  );
}

export default App;
