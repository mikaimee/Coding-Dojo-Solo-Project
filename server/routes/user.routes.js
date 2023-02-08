const UserController = require("../controllers/user.controller");

module.exports = (app) => {
    app.post('/api/register', UserController.registerUser);
    app.post('/api/login', UserController.loginUser);
    app.post('/api/logout', UserController.logOutUser);
    app.get('/api/currentUser', UserController.getLoginUser);
}