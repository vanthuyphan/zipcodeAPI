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





function setupPassport() {
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function(email, password, done) {
            db.getUserByEmail(email, function(err, row) {
                if (row && row.password === password) {
                    return done(err, row);
                }
                done(err, false, {
                    msg: "Invalid user message"
                });
            });
            // console.log("CHECK LOGIN WITH %s:%s", email, password);
            // if (email == password) {
            //     if (email == 'admin') {
            //         return done(null, {
            //             id: 123456,
            //             email: email
            //         });
            //     }
            //     return done(null, {
            //         id: 1234,
            //         email: email
            //     });
            // };
            // return done(null, false, {
            //     message: "Invalid user message"
            // });
        }
    ));

    function loginOrRegisterOauth(oauthProfile, done) {

        now.db.getUserByEmail(oauthProfile.profile.email, function(err, row) {
            if (err) return done(err);

            if (row) {

                now.db.insertOauth({
                    userCode: row.code,
                    profileId: oauthProfile.profile.id,
                    provider: oauthProfile.provider
                }, function() {});

                done(null, row);
                return;
            }

            done(null, {
                oauth: oauthProfile
            });

        });

        // now.db.getUserByEmail(oauthProfile.email, function(err, profile) {
        //     if (err) return done(err);

        //     if (profile) {
        //         return done(null, profile);
        //     }


        // });
    };

    function exportOauthProfile(provider, profile) {
        console.debug(profile);
        return {
            provider: provider,
            profile: {
                id: profile.id,
                name: profile.displayName,
                gender: profile.gender ? (profile.gender == 'male' ? 1 : 2) : 0,
                email: (profile.emails && profile.emails.length > 0) ? profile.emails[0].value : ""
            }
        };
    };

    passport.use(new FacebookStrategy({
            clientID: now.ini.facebook.appId,
            clientSecret: now.ini.facebook.appSecret,
            callbackURL: now.ini.web.url + "/login/facebook/callback",
            enableProof: false,
            profileFields: ['id', 'displayName', 'photos', 'emails'],
            passReqToCallback: true
        },
        function(request, accessToken, refreshToken, profile, done) {
            loginOrRegisterOauth(exportOauthProfile("facebook", profile), done);
        }
    ));

    passport.use(new GoogleStrategy({
            clientID: now.ini.google.clientId,
            clientSecret: now.ini.google.clientSecret,
            callbackURL: now.ini.web.url + "/login/google/callback",
            profileFields: ['id', 'displayName', 'photos', 'emails'],
            passReqToCallback: true
        },
        function(request, accessToken, refreshToken, profile, done) {
            loginOrRegisterOauth(exportOauthProfile("google", profile), done);
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
    now.web.use(passport.initialize());
    now.web.use(passport.session());

    now.web.get('/login/facebook',
        passport.authenticate('facebook', {
            scope: ["email"]
        }));

    now.web.get('/login/facebook/callback',
        passport.authenticate('facebook', {
            failureRedirect: '/login'
        }),
        function(req, res) {
            if (req.user.code) {
                res.redirect("/");
                return;
            }
            res.redirect("/register");

            // if (req.query.redirect) {
            //     return res.redirect(req.query.redirect);
            // }
        });

    now.web.get('/login/google', passport.authenticate('google', {
        scope: ['email', 'profile']

        // scope: ['https://www.googleapis.com/auth/drive','https://www.googleapis.com/auth/plus.login', ]
    }));

    now.web.get('/login/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/login'
        }),
        function(req, res) {
            if (req.user.code) {
                res.redirect("/");
                return;
            }
            res.redirect("/register");
            // res.redirect('/');
        });

    now.web.post('/login', function(req, res, next) {
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login'
        }, function(err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.render('login', {
                    msg: "Wrong password!"
                });
            }
            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }
                return res.redirect('/');
            });
        })(req, res, next);
    });

    now.web.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
}
