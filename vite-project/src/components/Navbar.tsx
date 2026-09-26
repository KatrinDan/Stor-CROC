import {NavLink} from "react-router-dom";
import "./Navbar.css"
function Navbar() {
    return (
        <nav className="top-nav">
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/products" className="nav-link">Products</NavLink>
            <NavLink to="/cart" className="nav-link">Cart</NavLink>
            <NavLink to="/favorites" className="nav-link">Favorites</NavLink>
            <NavLink to="/profile" className="nav-link">Profile</NavLink>
        </nav>
    );
}
export default Navbar;