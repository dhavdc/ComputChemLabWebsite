/*jshint esversion: 6 */ 

const express = require("express");
const router = express.Router();



router.get('/', (req, res) => {
    res.render('team3',
    {
        page: "team",
        user: req.user

    });
});


module.exports = router;