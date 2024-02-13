require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const app = express();
const usersApiRoutes = require('./routes/usersApiRoutes');
const { dbConnect } = require('./utils/dbCon');
const { User } = require('./models/userSchema');
const session = require('express-session');
const passport = require('passport')
const cors = require('cors');

dbConnect();
app.use(cors());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());




// app.use((req, res, next) => {
//     res.locals.success = req.flash("success");
//     res.locals.error = req.flash("error");
//     res.locals.currUser = req.user;
//     next();
// });

app.use(methodOverride('_method'));

// Routes
app.use("/api/v1/users", usersApiRoutes.router);

// Listing
app.listen(process.env.PORT, () => {
    console.log(`Server Listing at : http://localhost:${process.env.PORT}`)
});