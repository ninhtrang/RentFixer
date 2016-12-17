var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');


router.post('/', function(req, res, next) {
    var contact = {
            ten: req.body.ten,
            sdt: req.body.sdt,
            email: req.body.email,
            noidung: req.body.noidung
        }
    
    var transporter = nodemailer.createTransport("SMTP", {
        service: "gmail",
        auth: {
            user: "",
            pass: ""
        }
        });

    var mailOptions = {
        from: '', // sender address
        to: contact.email, // list of receivers
        subject: 'Profixer', // Subject line
        text: 'Co 1 ng nhan tin (noi them sdt va noi dung vao day)', 
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log('send email Error');
            console.log(error);
            res.send(error);
            
            return;
            
        }
        console.log('Message sent: ' + info.response);
        res.end();
    });
});

module.exports = router;