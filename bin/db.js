var now;

var db = {};

exports.init = function(_now, cb) {
    now = _now;

    now.db = db;
    cb();
}
/**
 * User
 */
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

db.changePassword = function(email, password, cb) {
    now.mysql.query("UPDATE `User` SET password=? WHERE email=?;", [password, email], function(err) {
        cb(err);
    });
};

db.verifyUser = function(code, cb) {
    now.mysql.query("UPDATE `User` SET verified=true WHERE code=?;", [code], function(err) {
        cb(err);
    });
};

db.insertUser = function(model, cb) {
    now.mysql.query("INSERT INTO User SET ?", {
        email: model.email,
        name: model.name,
        password: model.password,
        verified: model.verified
    }, function(err, result) {
        if (result) {
            model.code = result.insertId;
        }
        cb(err, model);
    });
};

db.getUsers = function(cb) {
    now.mysql.query("SELECT * FROM `User`;", function(err, rows) {
        if (rows) {
            cb(err, rows);
        } else {
            cb(err);
        }
    });
};

/**
 * Oauth
 */

db.insertOauth = function(model, cb) {
    now.mysql.query("INSERT INTO Oauth SET ?", {
        userCode: model.userCode,
        profileId: model.profileId,
        provider: model.provider
    }, function(err, result) {
        cb(err);
    });

};

/**
 * Category
 */

db.insertCategory = function(name, cb) {
    now.mysql.query("INSERT INTO `Category` SET ?", {
        name: name,
    }, function(err, result) {
        cb(err);
    });

};

db.getCategories = function(cb) {
    now.mysql.query("SELECT * FROM `Category`;", function(err, rows) {
        if (rows) {
            cb(err, rows);
        } else {
            cb(err);
        }
    });
};

db.deleteCategory = function(code, cb) {
    now.mysql.query("DELETE FROM `Category` where code=?;", [code], function(err) {
        cb(err);
    });
};

/**
 * Product
 */

db.getProducts = function(cb) {
    now.mysql.query("SELECT * FROM `Product`;", function(err, rows) {
        if (rows) {
            cb(err, rows);
        } else {
            cb(err);
        }
    });
};

db.insertProduct = function(model, cb) {
    now.mysql.query("INSERT INTO `Product` SET ?", {
        createdDate: new Date(),
        expiredDate: model.expiredDate,
        creator: model.creator,
        price: model.price,
        name: model.name,
        content: model.content,
        brand: model.brand,
    }, function(err, result) {
        if (result) {
            model.code = result.insertId;
        }
        cb(err, model);
    });
};

db.deleteProduct = function(code, cb) {
    now.mysql.query("DELETE FROM `Product` where code=?;", [code], function(err) {
        cb(err);
    });
};

