const express = require("express");
const fetch = require("cross-fetch");

const router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
    const response = await fetch("http://localhost:3000/posts");
    const datas = await response.json();

    res.render("pages/index", {
        posts: datas,
    });
});

module.exports = router;
