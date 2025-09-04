import React from "react";
import { BrowserRouter as Router} from "react-router-dom";
//import Residents from "./components/Residents";
import Sidebar from "./components/SideBar";
import Home from "./pages/Home";
import "C:\\Projects\\sms\\frontend\\src\\styles\\SideBar.css";

function App() {
  return (
    <Router>
      <div style={{ display: "flex"}}>
        <Sidebar />
        <div style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",  // horizontal center
          alignItems: "center"       // vertical center
        }}>
        <Home />
        </div>
      </div>
    </Router>
  );
}

export default App;
