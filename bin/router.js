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


router.get("/", function(req, res) {
    res.render("index");
});


router.get("/register", function(req, res) {

    res.render("register");
});


router.get("/find/:code", function(req, res) {
    now.db.getUserByCode(req.params.code, function(err, row) {
    	if (err) throw err;

    	res.send(row || "Not Found!");
    });
});
