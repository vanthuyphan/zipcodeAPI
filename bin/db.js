var now;

var db = {};

exports.init = function(_now, cb) {
    now = _now;

    now.db = db;
    cb();
}

db.getUserByCode = function(code, cb) {
    now.mysql.query("SELECT * FROM `User` WHERE code=? LIMIT 1;", [code], function(err, rows) {
        if (rows) {
            cb(err, rows[0]);
        } else {
            cb(err);
        }
    });
};

db.getUserByEmail = function(email, cb) {
    now.mysql.query("SELECT * FROM `User` WHERE email=? LIMIT 1;", [email], function(err, rows) {
        if (rows) {
            cb(err, rows[0]);
        } else {
            cb(err);
        }
    });
};



db.insertUser = function(model, cb) {
    now.mysql.query("INSERT INTO User SET ?", {
        email: model.email,
        name: model.name,
        password: model.password
    }, function(err, result) {
        if (result) {
            model.code = result.insertId;
        }
        cb(err, model);
    });
};

db.insertOauth = function(model, cb) {
    now.mysql.query("INSERT INTO Oauth SET ?", {
        userCode: model.userCode,
        profileId: model.profileId,
        provider: model.provider
    }, function(err, result) {
        cb(err);
    });

};
