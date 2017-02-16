var express = require("express");
var router = express.Router();
var requestify = require('requestify');

var now, db;

var path = require('path');

exports.init = function(_now, cb) {
    console.log("[routes]");
    _now.router = router;
    now = _now;
    db = now.db;
    now.web.use("/", router);
    cb();
};

router.use(function(req, res, next) {
    res.locals.user = req.user;
    next();
});

router.get("/", function(req, res) {
    res.render("index");
});

router.get("/zip", function(req, res) {
    var zip = req.param('zip');
    now.db.getZipcode(zip, function (error, row) {
        if (error) throw error;
        res.send(row || {error: "Invalid Zipcode"})
    })
});





