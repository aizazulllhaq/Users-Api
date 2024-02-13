const { Router } = require('express');
const router = Router();
const usersController = require("../controllers/usersController");
const passport = require('passport');


exports.router = router
    .get("/", usersController.getUsers) // get all users
    .post("/new", usersController.createUser) // create new user
    .post('/login', passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }), usersController.loginUser)
    .get("/:id", usersController.getUserDetail) // get User data
    .get('/:id/edit', usersController.editUser) // get user page
    .patch("/:id/edit", usersController.updateUser) // edit user
    .delete("/:id", usersController.deleteUser) // delete user