const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

const User = require("../models/user");


//Login Page
router.get("/", (req, res) => {
    res.render('admin/login');
});

router.post("/", (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    })(req, res, next);
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});
// const newUser = new User({
//     name: 'admin',
//     password: 'computchem@umb2020',
// });
// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(newUser.password, salt, (err, hash) => {
//         if (err) throw err;
//         //Set hashed password
//         newUser.password = hash;
//         newUser.save()
//         .then(data => console.log(data))
//         .catch(err => console.log(err));
//     });
// });


module.exports = router;





