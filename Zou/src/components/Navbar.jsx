import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/employees">Employees</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
}

export default Navbar;