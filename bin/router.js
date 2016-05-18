var express = require("express");
var router = express.Router();

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


router.get("/", function(req, res) {
    res.render("index");
});


router.get("/register", function(req, res) {
    res.render("register");
});
router.post("/register", function(req, res) {
    var input = req.body;

    if (!input.name || !input.email || !input.password) {
        res.render("register", {
            err: "Bạn chưa nhập đủ thông tin!"
        });
        return;
    }

    // db.findUserByEmail(input.email, function(err, row) {
    //     if(err) throw err;

    //     if(!row) {
            
    //         return;
    //     }
    // });
});

router.get("/login", function(req, res) {
    res.render("login");
});


router.get("/find/:code", function(req, res) {
    now.db.getUserByCode(req.params.code, function(err, row) {
        if (err) throw err;

        res.send(row || "Not Found!");
    });
});
