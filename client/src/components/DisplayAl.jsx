import React, {useState,useEffect}from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const DisplayAll = () => {

    const [allRecipes, setAllRecipes] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/recipes")
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setAllRecipes(res.data);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div className="d-flex flex-wrap m-4">
            {
                allRecipes.map((recipe) => (
                    <div className="m-4">
                        <img src={recipe.boxArt} />
                        <Link to={`/recipes/${recipe._id}`} className="d-block">{recipe.title}</Link>
                    </div>
                    
                ))
            }
        </div>
    )
}

export default DisplayAll;