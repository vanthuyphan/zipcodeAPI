var ini = require('node-ini');

exports.init = function(now, iniPath, cb) {
    console.info("[now.ini]	" + iniPath);
    ini.parse(iniPath, function(err, data) {
        now.ini = data;

        // console.info("========================== %s [%s] ====================================================", now.ini.app.name, now.ini.app.mode);
        cb(err);
    });
}
