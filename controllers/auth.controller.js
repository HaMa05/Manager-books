const md5 = require('md5');
const bcrypt = require("bcrypt");

const db = require('../db');
const sendEmail = require('../config/configEmail.js');
var wrongLoginCountFn = require("../middleware/wrongLoginCount");

module.exports.login = (req, res) => {
	res.render('auth/login.pug');
};

module.exports.postLogin = (req, res) => {
	var email = req.body.email;
	var password = req.body.password;

	var user = db.get('users').find({email: email}).value();
	if(!user) {
		res.render('auth/login.pug', {
			error: "Email don't exits.",
			values: req.body
		});
		return;
	}
  
	bcrypt.compare(password, user.password, (err, result) => {
    if (err) throw err;

    if (result) {
      // send email
      sendEmail.sendMail(user.mail);
      
      res.cookie("cookieId", user.id, {
        signed: true
      });
      res.redirect("/transactions");
    } else {
      // if user input fail
      wrongLoginCountFn.wrongLogin(user);
       // đăng nhập sai quá 3 lần
      if (user.wrongLoginCount >= 3) {
        sendEmail.sendMail(user.email);
        // res.send("Error acount.");
        // return;
      }
      res.render("auth/login.pug", {
        error: "Password don't exits.",
        values: req.body,
      });
      return;
    }
  });
}