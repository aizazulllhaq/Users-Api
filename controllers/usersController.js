const { User } = require('../models/userSchema');
const { wrapAsync } = require('../utils/wrapAsync');
const passport = require('passport');

exports.getUsers = wrapAsync(async (req, res) => {

    const { apiKey } = req.query;
    if (apiKey && apiKey == "superSecretWeatherWidget") {
        const users = await User.find({});
        res.json({
            success: true,
            message: "get all users",
            data: users
        })
    } else {
        res.json({
            success: false,
            message: "Enter a valid api-key"
        })

    }

})

exports.createUser = wrapAsync(async (req, res) => {

    // start
    console.log(req.body);
    // Register a new user
    const { username , email , password } = req.body;
    User.register({ username, email }, password, function (err, user) {
        if (err) {
            return res.status(500).json({ success: false, message: "Registration failed", error: err.message });
        }
        // If registration successful, authenticate the user
        passport.authenticate('local')(req, res, function () {
            res.json({ success: true, message: "Registration successful", user });
        });
    });
    // end
})

exports.loginUser = wrapAsync(async (req, res) => {
    res.json({
        success: true,
        message: "login successfull"
    })
})

exports.getUserDetail = wrapAsync(async (req, res) => {

    const { id } = req.params;
    const user = await User.findById(id);

    res.json({
        success: true,
        message: "get user data",
        data: user
    });
})

exports.editUser = wrapAsync(async (req, res) => {

    const { id } = req.params;
    const user = await User.findById(id);

    res.json({
        success: true,
        message: "get edit user page",
        data: user
    });
})

exports.updateUser = wrapAsync(async (req, res) => {

    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        res.json({
            success: false,
            message: "User can't found"
        })
    }
    const { username, email, password } = req.body;
    const updateUser = await User.updateOne({ username, email, password });

    res.json({
        success: true,
        message: "edit user",
        data: updateUser,
    });
})

exports.deleteUser = wrapAsync(async (req, res) => {

    const { id } = req.params
    try {
        const user = await User.findById(id);
        if (!user) {
            res.json({
                success: false,
                message: "user doesn't found"
            })
        }
        await User.deleteOne({ _id: id });
        res.json({
            success: true,
            message: "user delete successfully",
            data: user
        })
    } catch (error) {
        res.json({
            success: false,
            message: "Some Error Occurred",
            data: error
        })
    }

    res.json({
        success: true,
        message: "Delete User",
        data: user
    });
})
