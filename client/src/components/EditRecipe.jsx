import React, {useState,useEffect}from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import OneRecipe from "./OneRecpe";

const EditRecipe = () => {
    const {id} = useParams();

    const [title, setTitle] = useState('')
    const [servings, setServings] = useState('')
    const [timeTaken, setTimeTaken] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [directions, setDirections] = useState('')
    const [boxArt, setBoxArt] = useState('')

    const[errors, setErrors] = useState([]);
    const[recipeNotFound, setRecipeNotFound] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/recipes/${id}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setTitle(res.data.title);
                setServings(res.data.servings);
                setTimeTaken(res.data.timeTaken);
                setIngredients(res.data.ingredients);
                setDirections(res.data.directions);
                setBoxArt(res.data.boxArt);
            })
            .catch((err) => {
                console.log(err.res);
                setRecipeNotFound(`Recipe is not found`)
            })
    }, []);

    const submitHandler = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:8000/api/recipes/${id}`, {
            title,
            servings,
            timeTaken,
            ingredients,
            directions,
            boxArt
        }).then((res) => {
            console.log(res)
            console.log(res.data)
            console.log("catch from back-end")
            navigate("/recipes")
        }).catch((err) => {
            console.log(err);
            console.log("error from front-end")
            setErrors(err.response.data.errors);
        })
    };

    return(
        <div>
            <h2>Edit Recipe</h2>
            <form onSubmit={submitHandler} >
                {recipeNotFound ? (
                    <h2>{recipeNotFound} <Link to="/recipe/create"> Click here to add new recipe</Link> </h2>
                ): null}
                <div className="d-grid gap-2 col-5 mx-auto">
                    <label className="form-label">Title: </label>
                    <input className="form-control border-primary" type="text" value={title} id="title" onChange={(e) => setTitle(e.target.value)} />
                    {errors.title ? <span>{errors.title.message}</span> : null}
                </div>
                <div className="d-grid gap-2 col-5 mx-auto">
                    <label className="form-label">Servings: </label>
                    <input className="form-control border-primary" type="text" value={servings} id="servings" onChange={(e) => setServings(e.target.value)} />
                    {errors.servings ? <span>{errors.servings.message}</span> : null}
                </div>
                <div className="d-grid gap-2 col-5 mx-auto">
                    <label className="form-label">Time Taken: </label>
                    <input className="form-control border-primary" type="text" value={timeTaken} id="timeTaken" onChange={(e) => setTimeTaken(e.target.value)} />
                    {errors.timeTaken ? <span>{errors.timeTaken.message}</span> : null}
                </div>
                <div className="d-grid gap-2 col-5 mx-auto">
                    <label className="form-label">Ingredients: </label>
                    <input className="form-control border-primary" type="text" value={ingredients} id="servings" onChange={(e) => setIngredients(e.target.value)} />
                    {errors.ingredients ? <span>{errors.ingredients.message}</span> : null}
                </div>
                <div className="d-grid gap-2 col-5 mx-auto">
                    <label className="form-label">Direction: </label>
                    <input className="form-control border-primary" type="text" value={directions} id="directions" onChange={(e) => setDirections(e.target.value)} />
                    {errors.directions ? <span>{errors.directions.message}</span> : null}
                </div>
                <div className="d-grid gap-2 col-5 mx-auto">
                    <label className="form-label">Picture: </label>
                    <input className="form-control border-primary" type="text" value={boxArt} id="boxArt" onChange={(e) => setBoxArt(e.target.value)} />
                    {errors.boxArt ? <span>{errors.boxArt.message}</span> : null}
                </div>
                <div className="d-grid gap-2 col-5 mx-auto m-4">
                    <button className="btn btn-info">Update</button>
                </div>
                
            </form>
        </div>
    )
}

export default EditRecipe;