var express = require("express");
var router = express.Router();

var now;

var path = require('path');

exports.init = function(_now, cb) {
    console.log("[routes]");

    now = _now;
    now.router = router;

    now.web.use("/", router);
    cb();
};


router.get("/", function (req, res) {
    res.render("index");
});


router.get("/register", function (req, res) {
    res.render("register");
});

