var express = require("express");
var router = express.Router();

var now, db;

exports.init = function(_now, cb) {
    now = _now;
    db = now.db;

    now.web.use("/user", router);
    cb();
}


router.get("/*", function(req, res, next) {
    console.log(req.user);
    if (!req.user || !req.user.code) {
        res.redirect("/login");
        return;
    }
    next();
});

router.get("/", function(req, res) {
    if (!req.user.stype) {
        res.redirect("/user/init");
        return;
    }
    res.render("user", {
        user: req.user
    });
});

router.get("/init", function(req, res) {
    res.render("user_init");
});


router.get("/init/seller", function(req, res) {
    res.render("user_init_seller");
});

router.get("/init/supplier", function(req, res) {
    res.render("user_init_supplier");
});
