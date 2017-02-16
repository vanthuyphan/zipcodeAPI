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

router.get("/zip", function(req, res) {
    var zip = req.zip;
    var url = "http://maps.googleapis.com/maps/api/geocode/json?address="+ req.zip;
    requestify.get(url).then(function(response) {

        var body = JSON.parse(response.body);
        var status = body.status;
        if ("ZERO_RESULTS" === status) {
            res.render("index", {error: 'Invalid Zipcode'});
        } else {
            var result = body.results[0];
            var formattedAddress = result.formatted_address;
            if (formattedAddress.indexOf("USA") > -1) {
                var address = formattedAddress.split(',');
                var city = address[0].trim();
                var state = address[1].replace(zip, "").trim();
                res.render("index", {city : city, state: state, zip: zip});
            } else {
                res.render("index", {error: 'Invalid Zipcode'});
            }
        }
    }).fail(function(response) {
        res.send({error: 'Invalid Zipcode'});
    });
});

router.get("/", function(req, res) {
    res.render("index");
});

router.get("/zip", function(req, res) {
    var zip = req.body.zip;
    now.db.getZipcode(zip, function (error, row) {
        if (error) throw error;
        res.send(row || {error: "Invalid Zipcode"})
    })
});





