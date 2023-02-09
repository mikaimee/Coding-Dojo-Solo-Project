import React, {useState,useEffect}from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const CreateRecipe = (props) => {
    const [title, setTitle] = useState('')
    const [servings, setServings] = useState('')
    const [timeTaken, setTimeTaken] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [directions, setDirections] = useState('')
    const [boxArt, setBoxArt] = useState('')

    const {currentUser, setCurrentUser} = props;

    const [errors, setErrors] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost8000/api/currentUser", {withCredentials: true})
            .then((res) => {
                console.log(res.data)
                setCurrentUser({
                    _id: res.data._id,
                    username: res.data.username,
                })
            })
            .catch((err) => {
                console.log("logged in user fetch error", err)
            })
    }, [])

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/recipes", {
            title,
            servings,
            timeTaken,
            ingredients,
            directions,
            boxArt
        }, {withCredentials: true})
            .then((res) => {
                console.log(res)
                console.log("catch from back-end")
                navigate("/recipes")
        })
            .catch((err) => {
                console.log(err)
                console.log("error from front-end")
                setErrors(err.response.data.errors);
            })
    }

    return(
        <div>
            <h2>Add new Recipe</h2>
            <form onSubmit={submitHandler} >
                <div className="d-grid gap-2 col-5 mx-auto">
                    <label c>Title: </label>
                    <input className="form-control border-primary" type="text" onChange={(e) => setTitle(e.target.value)} />
                    {errors.title ? <span>{errors.title.message}</span> : null}
                </div>
                <div className="d-grid gap-2 col-5 mx-auto m-2">
                    <label className="form-label">Servings: </label>
                    <input className="form-control border-primary" type="text" onChange={(e) => setServings(e.target.value)} />
                    {errors.servings ? <span>{errors.servings.message}</span> : null}
                </div>
                <div className="d-grid gap-2 col-5 mx-auto m-2">
                    <label className="form-label">Time Taken: </label>
                    <input className="form-control border-primary" type="text" onChange={(e) => setTimeTaken(e.target.value)} />
                    {errors.timeTaken ? <span>{errors.timeTaken.message}</span> : null}
                </div>
                <div className="d-grid gap-2 col-5 mx-auto m-2">
                    <label className="form-label">Ingredients: </label>
                    <input className="form-control border-primary" type="text" onChange={(e) => setIngredients(e.target.value)} />
                    {errors.ingredients ? <span>{errors.ingredients.message}</span> : null}
                </div>
                <div className="d-grid gap-2 col-5 mx-auto m-2">
                    <label className="form-label">Directions: </label>
                    <input className="form-control border-primary" type="text" onChange={(e) => setDirections(e.target.value)} />
                    {errors.directions ? <span>{errors.directions.message}</span> : null}
                </div>
                <div className="d-grid gap-2 col-5 mx-auto m-2">
                    <label className="form-label">Picture: </label>
                    <input className="form-control border-primary" type="text" onChange={(e) => setBoxArt(e.target.value)} />
                    {errors.boxArt ? <span>{errors.boxArt.message}</span> : null}
                </div>
                <div className="d-grid gap-2 col-5 mx-auto m-4">
                    <button className="btn btn-info" >Add</button>
                </div>
                
            </form>
        </div>
    )
}

export default CreateRecipe;