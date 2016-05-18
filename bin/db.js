var now;

var db = {};

exports.init = function(_now, cb) {
	now = _now;

    now.db = db;
    cb();
}

db.getUserByCode = function(code, cb) {
    now.mysql.query("SELECT * FROM `User` WHERE code=? LIMIT 1;", [code], function (err, rows) {
    	if(rows) {
    		cb(err, rows[0]);
    	} else {
    		cb(err);
    	}
    });
};