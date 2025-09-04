// SideBar.js
import { Link, Routes, Route } from "react-router-dom";
import Residents from "C:\\Projects\\sms\\frontend\\src\\components\\Residents.js";

function SideBar() {
  return (
    <aside className="SideBar">
      <h2>Menu</h2>
      <ul>
        <nav>
            <Link to="/residents"><li>Residents</li></Link>
        </nav>
        <Routes>
            <Route path="/residents" element={<Residents />} />
        </Routes>
        <li>Payments</li>
        <li>Announcements</li>
      </ul>
    </aside>
  );
}

export default SideBar;
