import { NavLink } from "react-router-dom";

export default function Nav() {
    return (
        <nav>
            <NavLink to="/">Søgning</NavLink>
            <NavLink to="/about">Filtrer</NavLink>
            <NavLink to="/contact">Contact</NavLink>
        </nav>
    );
}
