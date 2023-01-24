import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault ()
        axios.post('http://localhost:8000/api/login', {
            email,
            password
        }, {withCredentials: true, credentials: 'include'})
            .then((res) => {
                navigate('/recipes')
            })
            .catch((err) => {
                console.log(err)
            })

    }

    return (
        <div className="d-grid gap-2 col-5 mx-auto">
            <form onSubmit={submitHandler}> 
                <div className="d-grid gap-2 col-5 mx-auto">
                    <label className="d-grid gap-2 col-5 mx-auto">Email: </label>
                    <input className="form-control border-primary" type="text" onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div className="d-grid gap-2 col-5 mx-auto">
                    <label className="d-grid gap-2 col-5 mx-auto">Password: </label>
                    <input className="form-control border-primary" type="text" onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div className="d-grid gap-2 col-5 mx-auto m-4">
                    <button className="btn btn-info">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login;