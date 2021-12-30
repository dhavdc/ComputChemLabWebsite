/*jshint esversion: 6 */ 

const express = require("express");
const router = express.Router();
const Publications = require("../models/publications");


router.post('/', (req, res) => {
    let searchText = req.body.searchText;
    Publications.find({
        $text : {$search: searchText}
    }, (err, publications) => {
        res.render('search',
    {
        page: "search",
        user: req.user,
        publications: publications,
        searchText: searchText
    });
        console.log(publications);
    });
    
});


module.exports = router;