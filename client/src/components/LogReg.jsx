import React, {useState}from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import axios from "axios";

const LogReg = (props) => {
    const {currentUser, setCurrentUser} = props
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loginErrors, setLoginErrors] = useState("")
    const [regErrors, setRegErrors] = useState("")

    const navigate = useNavigate()

    const loginUserHandler = (e) => {
        e.preventDefault ()
        axios.post('http://localhost:8000/api/login', {
            email,
            password
        }, {withCredentials: true, credentials: 'include'})
            .then((res) => {
                console.log("successful login", res)
                setCurrentUser({
                    _id: res.data.user._id,
                    username: res.data.user.username,
                    email: res.data.user.email
                })
                navigate('/recipes')
            })
            .catch((err) => {
                console.log(err)
                setLoginErrors(err.response.data.errors)
            })
    };

    const autoLogin = (email, password) => {
        axios.post("http://http://localhost:8000/api/login", {
            email,
            password
        }, {withCredentials: true, credentials: 'include'})
            .then((res) => {
                console.log("successful login after registration", res);
                setCurrentUser({
                    _id: res.data.user._id,
                    username: res.data.user.username,
                    email: res.data.user.email
                })
                navigate('/recipes')
            })
            .catch((err) => {
                console.log("Autologin error", err)
            })
    }

    const regUserHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/register', {
            username, 
            email,
            password,
            confirmPassword
        }, {withCredentials: true, credentials: 'include'})
            .then((res) => {
                console.log("successful registration", res)
                autoLogin(email, password)
                navigate('/recipes')
            })
            .catch((err) => {
                console.log(err);
                setRegErrors(err.response.data.errors);
            })
    };

    return (
        <div id="logRegComponent">
            {/* Registration Form */}
            <div className="d-grid gap-2 col-5 mx-auto">
                <form className="logRegForm" onSubmit={regUserHandler}>
                    <div className="d-grid gap-2 col-5 mx-auto">
                        <label className="form-label">Username: </label>
                        <input className="form-control border-primary" type="text" onChange={(e) => setUsername(e.target.value)} />
                        {regErrors.username ? <span>{regErrors.username.message}</span> : null}
                    </div>
                    <div className="d-grid gap-2 col-5 mx-auto">
                        <label className="form-label">Email: </label>
                        <input className="form-control border-primary" type="text" onChange={(e) => setEmail(e.target.value)} />
                        {regErrors.email ? <span>{regErrors.email.message}</span> : null}
                    </div>
                    <div className="d-grid gap-2 col-5 mx-auto">
                        <label className="form-label">Password: </label>
                        <input className="form-control border-primary" type="text" onChange={(e) => setPassword(e.target.value)} />
                        {regErrors.username ? <span>{regErrors.password.message}</span> : null}
                    </div>
                    <div className="d-grid gap-2 col-5 mx-auto">
                        <label className="form-label">Confirm Email: </label>
                        <input className="form-control border-primary" type="text" onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <div className="d-grid gap-2 col-5 mx-auto m-4">
                        <button className="btn btn-info">Register</button>
                    </div>
                </form>
            </div>

            {/* Login Form */}

            <div className="d-grid gap-2 col-5 mx-auto">
                <form onSubmit={loginUserHandler}> 
                    <div className="d-grid gap-2 col-5 mx-auto">
                        <label className="d-grid gap-2 col-5 mx-auto">Email: </label>
                        <input className="form-control border-primary" type="text" onChange={(e) => setEmail(e.target.value)}></input>
                        {regErrors.username ? <span>{regErrors.password.message}</span> : null}
                    </div>
                    <div className="d-grid gap-2 col-5 mx-auto">
                        <label className="d-grid gap-2 col-5 mx-auto">Password: </label>
                        <input className="form-control border-primary" type="text" onChange={(e) => setPassword(e.target.value)}></input>
                        {loginErrors.username ? <span>{loginErrors.password.message}</span> : null}
                    </div>
                    <div className="d-grid gap-2 col-5 mx-auto m-4">
                        <button className="btn btn-info">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LogReg;