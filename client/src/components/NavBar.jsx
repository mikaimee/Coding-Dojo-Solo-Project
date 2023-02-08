import React from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";
import axios from "axios";


const NavBar = (props) => {

    const {currentUser, setCurrentUser} = props;
    const navigate = useNavigate;

    const logoutUser = () => {
        axios.post("http://localhost:8000/api/logout", {withCredentials: true})
            .then((res) => {
                console.log("successful logout", res);
                setCurrentUser(null)
                navigate("/recipes")
            })
            .catch((err) => {
                console.log("error logging out", err)
            })
    }

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
                            <NavLink to="/loginReg" className="nav-link">Login</NavLink>
                        </li>
                        <li className="navbar-item">
                            <button onClick={logoutUser}>Logout</button>
                        </li>
                    </ul>
                </div>
                {/* <NavLink to="/recipes/logout">Logout</NavLink> */}
            </div>
        </nav>
        
    )
}

export default NavBar;