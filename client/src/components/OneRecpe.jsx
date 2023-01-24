import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";


const OneRecipe = () => {

    const {id} = useParams();

    const[oneRecipe, setOneRecipe] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/recipes/${id}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setOneRecipe(res.data);
            })
            .catch((err) => {
                console.log(err)
            });
    }, [id]);

    const deleteFilter = () => {
        axios.delete(`http://localhost:8000/api/recipes/${id}`)
            .then((res) => {
                console.log(res.data);
                navigate("/recipes");
            })
            .catch((err) => {
                console.log("Error with deleting pet");
                console.log(err);
            })
    }

    return(
        <div>
            <div className="container-fluid">
                <div className="border border-3 rounded-1 border-dark-subtle m-5 p-3">
                    <Link to="/recipes" className="homelink d-flex justify-content-end">back to home</Link>
                    <div>
                        <h2 className="text-decoration-underline">Details about {oneRecipe.title}</h2>
                    </div>
                    <div>
                        <p>Servings: {oneRecipe.servings}</p>
                        <p>Ingredients: {oneRecipe.ingredients}</p>
                        <p>Directions: {oneRecipe.directions}</p>
                    </div>
                    <div className="mx-auto">
                        <Link to={`/recipes/${oneRecipe._id}/edit`} className="ms-4">Edit</Link>
                        <button className="btn btn-danger ms-4" onClick={deleteFilter}>Delete {oneRecipe.title}</button>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default OneRecipe;