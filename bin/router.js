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

/**
 * Admin
 */
router.get("/users", function(req, res) {
    now.db.getUsers(function(err, rows) {
        if (err) throw err;
        res.render("users", {"users": rows});
    })

});

router.get("/categories", function(req, res) {
    now.db.getCategories(function(err, rows) {
        if (err) throw err;
        res.render("categories", {"categories": rows});
    })

});

router.post("/add_category", function(req, res) {
    now.db.insertCategory(req.body.name, function(err) { //ignore the error about name already there
        res.redirect("/categories");
    })
});

router.post("/delete_category", function(req, res) {
    now.db.deleteCategory(req.body.code, function(err) {
        if (err) throw err;
        res.redirect("/categories");
    })
});

router.get('/*', function(req, res) {
    res.render('404')
});