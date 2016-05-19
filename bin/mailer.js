var nodemailer = require('nodemailer');
var fs = require("fs");
var jade = require("jade");
var now;
var smtpTransport;
var mailer = {};
var mailOptions;

exports.init = function (_now, cb) {
    now = _now;
    now.mailer = mailer;
    smtpTransport = nodemailer.createTransport('SMTP', {
        service: 'Gmail',
        auth: {
            user: now.ini.gmail.user,
            pass: now.ini.gmail.password
        }
    });


    cb();
}

mailer.sendMail = function (data ,template, cb) {
    var template = process.cwd() + '/views/email-templates/' + template + '.jade';

    // get template from file system
    fs.readFile(template, 'utf8', function(err, file){
        if(err){
            //handle errors
            console.log('ERROR!');
            cb(err);
        }
        else {
            //compile jade template into function
            var compiledTmpl = jade.compile(file, {filename: template});
            // set context to be used in template
            var context = {"email": data.email, "code": data.code};
            // get html back as a string with the context applied;
            var html = compiledTmpl(context);

            mailOptions = {
                from: 'cafe2sales@gmail.com',
                to: data.email,
                subject: data.subject,
                html: html
            };

            smtpTransport.sendMail(mailOptions, function(err, res){
                cb(err);
            });
        }
    });
}