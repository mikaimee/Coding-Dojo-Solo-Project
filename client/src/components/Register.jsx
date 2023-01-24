import React, {useState} from "react";
import axios from "axios";
import { isRouteErrorResponse, useNavigate } from "react-router-dom";

const Register = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errors, setErrors] = useState({})

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/register', {
            username, 
            email,
            password,
            confirmPassword
        }, {withCredentials: true, credentials: 'include'})
            .then((res) => {
                console.log(res)
                navigate('/recipes')
            })
            .cathc((err) => {
                console.log(err);
                setErrors(err.response.data.errors);
            })
    };

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className="d-grid gap-2 col-5 mx-auto">
                    <label className="form-label">Username: </label>
                    <input className="form-control border-primary" type="text" onChange={(e) => setUsername(e.target.value)} />
                    {errors.username ? <span>{errors.username.message}</span> : null}
                </div>
                <div className="d-grid gap-2 col-5 mx-auto">
                    <label className="form-label">Email: </label>
                    <input className="form-control border-primary" type="text" onChange={(e) => setEmail(e.target.value)} />
                    {errors.email ? <span>{errors.email.message}</span> : null}
                </div>
                <div className="d-grid gap-2 col-5 mx-auto">
                    <label className="form-label">Password: </label>
                    <input className="form-control border-primary" type="text" onChange={(e) => setPassword(e.target.value)} />
                    {errors.username ? <span>{errors.password.message}</span> : null}
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
    )
}

export default Register;