require('dotenv/config');
const express = require("express");
const session = require('express-session');
const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);
const flash = require("connect-flash");
const passport = require("passport");
const { ensureAuthenticated, forwardAuthenticated } = require('./config/auth');
var bodyParser = require('body-parser');
const sslRedirect = require('heroku-ssl-redirect');

//ROUTES
const publicationsRoute = require("./routes/publications");
const teamRoute = require("./routes/team");
const contactRoute = require("./routes/contact");
const openingsRoute = require("./routes/openings");
const topicsRoute = require("./routes/topics");
const usersRoute = require("./routes/users");
const dashboardRoute = require('./routes/dashboard');
const searchRoute = require('./routes/search');
const albumRoute = require('./routes/album');
const app = express();

require('./config/passport')(passport);


app.set("view engine", "ejs");
app.use(express.static(__dirname));

//Express Session
app.use(session({
    secret: '',
    resave: true,
    saveUninitialized: true
}));
app.use(sslRedirect());


//Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));


//Connect Flash
app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});



app.get('/', (req, res) => {
    res.render('index', {
        page: req.url,
        user: req.user
    });
});


//Routes
app.use('/publications', publicationsRoute);
app.use('/team', teamRoute);
app.use('/contact', contactRoute);
app.use('/openings', openingsRoute);
app.use('/topics', topicsRoute);
app.use('/login', usersRoute);
app.use('/dashboard', dashboardRoute);
app.use('/search', searchRoute);
app.use('/album', albumRoute);



//Connect to MongoDB
mongoose.connect(
        process.env.DB_CONNECTION_STRING_ONLINE, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log(`DB Connection Error: ${err.message}`);
    });


//Start Server

app.get('/jana', (req, res) => {
    res.render("jana", {page: "", user: ""});
});

app.listen(process.env.PORT || 8080, () => {
    console.log("Server started on port 8080!");
});