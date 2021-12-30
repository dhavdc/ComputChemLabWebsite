
const express = require("express");
const router = express.Router();



router.get('/', (req, res) => {
    res.render('openings',
    {
        page: "openings",
        user: req.user

    });
});


module.exports = router;