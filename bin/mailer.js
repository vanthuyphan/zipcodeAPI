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
    smtpTransport = nodemailer.createTransport("SMTP",{
        service:"Gmail",
        auth:{
            XOAuth2: {
                user: now.ini.gmail.user,
                clientId: now.ini.google.clientId,
                clientSecret: now.ini.google.clientSecret,
                refreshToken: now.ini.google.refresh_token
            }
        }
    });
    cb();
}

mailer.sendMail = function (data ,template, cb) {
    var template = process.cwd() + '/views/email-templates/' + template + '.jade';
    fs.readFile(template, 'utf8', function(err, file){
        if(err){
            console.log('ERROR!');
            cb(err);
        }
        else {
            data.baseUrl = now.ini.web.url;
            var compiledTmpl = jade.compile(file, {filename: template});
            var html = compiledTmpl(data);

            mailOptions = {
                from: now.ini.gmail.user,
                to: data.to || data.email,
                subject: data.subject,
                html: html
            };

            smtpTransport.sendMail(mailOptions, function(err, res){
                cb(err);
            });
        }
    });
}