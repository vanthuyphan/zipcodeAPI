var ini = require("./bin/now/ini.js");
var logger = require("./bin/now/logger.js");
var mysql = require("./bin/now/mysql.js");
var web = require("./bin/web.js");
var db = require("./bin/db.js");
var mailer = require("./bin/mailer.js");


var now = {};

now.app = {
    name: "vsell",
    version: "1.0"
};


exports.init = function (iniFile, app) {
    now.app = app;

    ini.init(now, './conf/' + iniFile, function (err) {
        if (err) throw err;

        logger.init(now, function (err) {
            if (err) throw err;

            mysql.init(now, function (err) {
                if (err) throw err;

                db.init(now, function (err) {
                    if (err) throw err;

                    mailer.init(now, function (err) {
                        if (err) throw err;

                        web.init(now, function (err) {
                            if (err) throw err;

                            console.log("App link: %s", now.ini.web.url);
                        });
                    });
                });
            });
        });
    });

};
