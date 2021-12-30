/*jshint esversion: 6 */ 

const express = require("express");
const router = express.Router();



router.get('/', (req, res) => {
    res.render('topics',
    {
        page: "topics",
        user: req.user

    });
});

router.get('/cphmd', (req, res) => {
    res.render('topics/cphmd',
    {
        page: "topics",
        user: req.user
    });
});

router.get('/pka-calc', (req, res) => {
    res.render('topics/pkacalculations',
    {
        page: "topics",
        user: req.user
    });
});

router.get('/channels-transporters', (req, res) => {
    res.render('topics/channeltransp',
    {
        page: "topics",
        user: req.user
    });
});

router.get('/drug-design', (req, res) => {
    res.render('topics/drugdesign',
    {
        page: "topics",
        user: req.user
    });
});

router.get('/materials-design', (req, res) => {
    res.render('topics/materialsdesign',
    {
        page: "topics",
        user: req.user
    });
});



module.exports = router;