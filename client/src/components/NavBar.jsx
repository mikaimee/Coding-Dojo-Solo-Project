import React from "react";
import {Link, NavLink} from "react-router-dom";


const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-secondary">
            <div className="container-fluid w-75">
                <h1 className="navbar-brand">All Recipes</h1>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="navbar-item">
                            <NavLink to="/recipes" className="nav-link active">Home</NavLink>
                        </li>
                        <li className="navbar-item">
                            <NavLink to="/recipes/create" className="nav-link">Add new recipe</NavLink>
                        </li>
                        <li className="navbar-item">
                            <NavLink to="/recipes/register" className="nav-link">Register</NavLink>
                        </li>
                        <li className="navbar-item">
                            <NavLink to="/recipes/login" className="nav-link">Login</NavLink>
                        </li>
                    </ul>
                </div>
                {/* <NavLink to="/recipes/logout">Logout</NavLink> */}
            </div>
        </nav>
        
    )
}

export default NavBar;