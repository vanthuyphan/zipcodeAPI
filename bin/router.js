var express = require("express");
var router = express.Router();


var router_passport = require("./router_passport.js");

var now, db;

var path = require('path');

exports.init = function(_now, cb) {
    console.log("[routes]");

    _now.router = router;

    now = _now;
    db = now.db;

    router_passport.init(now, function (err) {
        if(err) throw err;


        now.web.use("/", router);
        cb();
    });
};

router.use("/", function(req, res, next) {
    // console.debug(req.user);
    next();
});


router.get("/", function(req, res) {
    res.render("index", {
        user: req.user
    });
});


router.get("/find/:code", function(req, res) {
    now.db.getUserByCode(req.params.code, function(err, row) {
        if (err) throw err;

        res.send(row || "Not Found!");
    });
});

router.get('/*', function(req, res) {
    res.render('404')
});