
const express = require("express");
const router = express.Router();



router.get('/', (req, res) => {
    res.render('album',
    {
        page: "album",
        user: req.user
    });
});


module.exports = router;