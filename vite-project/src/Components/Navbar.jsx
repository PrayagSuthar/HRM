import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/");
    };

    return (
        <nav>
            <Link to={role === "admin" ? "/dashboard" : "/employee-dashboard"}>
                Dashboard
            </Link>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
};

export default Navbar;
