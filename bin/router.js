var express = require("express");
var router = express.Router();

var router_user = require("./router_user.js");
var router_passport = require("./router_passport.js");

var now, db;

var path = require('path');

exports.init = function(_now, cb) {
    console.log("[routes]");

    _now.router = router;

    now = _now;
    db = now.db;

    router_passport.init(now, function(err) {
        if (err) throw err;

        now.web.use("/", router);
        router_user.init(now, function(err) {
            if (err) throw err;
            
            cb();
        });
    });
};

router.use(function(req, res, next) {
    res.locals.user = req.user;
    next();
});


router.get("/", function(req, res) {
    if (req.user && req.user.code) {
        res.redirect("/user");
        return;
    }

    res.render("index");
});


router.get("/home", function(req, res) {
    res.render("home");
});


router.get("/find/:code", function(req, res) {
    now.db.getUserByCode(req.params.code, function(err, row) {
        if (err) throw err;

        res.send(row || "Not Found!");
    });
});

router.post("/sendMessage", function(req, res) {
    var input = req.body;
    input.subject = "Client Query";
    console.log(input.message);
    input.to = now.ini.gmail.user;
    now.mailer.sendMail(input, "clientQuery", function(err) {
        if (err) throw err;
        res.render("info", { "message": "Thank you. Got the message. Get back to you soon" });
    })
});


router.post("/add_product", function(req, res) {
    now.db.insertProduct(req.body, function(err) {
        if (err) throw err;
        res.redirect("/products");
    })
});
