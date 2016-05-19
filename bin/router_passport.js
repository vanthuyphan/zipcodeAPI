var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;

var now, db;

exports.init = function (_now, cb) {
    now = _now;
    db = now.db;

    setupPassport();
    setupRegister();
    cb();
}


function setupRegister() {

    function checkLogged(req, res, next) {
        if (req.user && req.user.code) {
            console.info(req.user);
            res.redirect("/");
            return;
        }
        next();
    }

    now.web.get("/register", checkLogged, function (req, res) {
        var model;
        if (req.user && req.user.oauth) {
            model = req.user.oauth.profile;
        }
        res.render("register", model);
    });

    now.web.post("/register", checkLogged, function (req, res, next) {
        var input = req.body;

        if (!input.name || !input.email || !input.password) {
            req.body.msg = "Bạn chưa nhập đủ thông tin!";
            res.render("register", req.body);
            return;
        }

        db.insertUser(req.body, function (err, row) {

            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    req.body.msg = "Email này đã được đăng ký từ trước!";
                    res.render("register", req.body);
                    return;
                }
                next(err);
            }

            if (!req.user || !req.user.oauth) {
                req.session.passport.user = req.body;
                res.redirect("/");
                return;
            }

            if (req.body.email === req.user.oauth.profile.email) {
                db.insertOauth({
                    userCode: row.code,
                    profileId: req.user.oauth.profile.id,
                    provider: req.user.oauth.provider
                }, function (err) {
                    if (err) return next(err);

                    req.session.passport.user = req.body;
                    res.redirect("/");
                });
                return;
            }

            res.redirect("/");
        });
    });

    now.web.get("/login", checkLogged, function (req, res) {
        res.render("login");
    });

    now.web.get("/forgot", checkLogged, function (req, res) {
        res.render("forgot");
    });

    now.web.post("/change_password", checkLogged, function (req, res) {
        var user = req.body;
        db.changePassword(user.email, user.password, function (err) {
            if (!err) {
                res.redirect("login");
            } else {
                res.render("error");

            }
        });
    });

    now.web.get("/reset_password", checkLogged, function (req, res) {
        console.log(req.query)
        var user = req.query;
        db.getUserByCode(user.code, function (err, row) {
            if (!row) {
                res.send("Invalid request");
            } else {
                res.render("change_password", {"email" : row.email});
            }
        });
    });

    now.web.post("/forgot", checkLogged, function (req, res) {
        var email = req.body.email;
        if (!email) {
            req.body.msg = "Please enter your email";
            res.render("forgot", req.body);
            return;
        } else {
            db.getUserByEmail(email, function (err, row) {
                console.log(row);
                if (!row) {
                    req.body.msg = "This email address in not in the system";
                    res.render("forgot", req.body);
                    return;
                } else {
                    row.subject = "Reset Password";
                    now.mailer.sendMail(row, "forgot_password", function (err) {
                        if (err) {
                            res.render("error");
                            return;
                        } else {
                            req.body.msg = "Please check your mailbox for further instruction";
                            res.render("forgot", req.body);
                            return;
                        }
                    })
                }
            });
        }
    });
}


function setupPassport() {
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function (email, password, done) {
            db.getUserByEmail(email, function (err, row) {
                if (row && row.password === password) {
                    return done(err, row);
                }
                done(err, false);
            });
        }
    ));

    function loginOrRegisterOauth(oauthProfile, done) {
<<<<<<< HEAD
        now.db.getUserByEmail(oauthProfile.profile.email, function(err, row) {
=======

        now.db.getUserByEmail(oauthProfile.profile.email, function (err, row) {
>>>>>>> fd6ca132fe05d0baec80d22a6b29b8f8cf37f47b
            if (err) return done(err);

            if (row) {

                now.db.insertOauth({
                    userCode: row.code,
                    profileId: oauthProfile.profile.id,
                    provider: oauthProfile.provider
                }, function () {
                });

                done(null, row);
                return;
            }

            done(null, {
                oauth: oauthProfile
            });

        });
    };

    function exportOauthProfile(provider, profile) {
        // console.debug(profile);
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
        function (request, accessToken, refreshToken, profile, done) {
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
        function (request, accessToken, refreshToken, profile, done) {
            loginOrRegisterOauth(exportOauthProfile("google", profile), done);
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
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
        function (req, res) {
            if (req.user.code) {
                res.redirect("/");
                return;
            }
            res.redirect("/login/#signup");
        });

    now.web.get('/login/google', passport.authenticate('google', {
        scope: ['email', 'profile']

        // scope: ['https://www.googleapis.com/auth/drive','https://www.googleapis.com/auth/plus.login', ]
    }));

    now.web.get('/login/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/login'
        }),
        function (req, res) {
            if (req.user.code) {
                res.redirect("/");
                return;
            }
            res.redirect("/login/#signup");
        });

    now.web.post('/login', function (req, res, next) {
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login'
        }, function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.render('login', {
                    msg: "Wrong password!"
                });
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                return res.redirect('/');
            });
        })(req, res, next);
    });

    now.web.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
}
