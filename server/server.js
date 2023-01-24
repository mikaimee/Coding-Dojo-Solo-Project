const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();  // allows access to env file
const cookieParser = require("cookie-parser")

require("./config/mongoose.config");

// middleware that adds post data
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// middleware that adds cookies to a request
app.use(cookieParser());

app.use(
    cors({credentials: true, origin: "http://localhost:3000"})
);

const Routes = require("./routes/recipe.routes")(app);
const UserRoutes = require("./routes/user.routes")(app);

app.listen(8000, () => {
    console.log("Listening at PORT 8000")
})