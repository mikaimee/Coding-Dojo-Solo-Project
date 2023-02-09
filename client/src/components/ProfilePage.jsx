import React, {useState, useEffect} from "react";
import axios from "axios";

const ProfilePage = (props) => {

    const{currentUser, setCurrentUser} = props;
    const[username, setUsername] = useState("");
    const [email, setEmail] = useState("")
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8000/api/currentUser", {withCredentials: true})
            .then((res) => {
                console.log(res.data)
                setCurrentUser(res.data);
            })
    })


    return(
        <div>
            Profile Page
        </div>
    )
}

export default ProfilePage;