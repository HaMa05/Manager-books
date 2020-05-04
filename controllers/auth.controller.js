const md5 = require('md5');

const db = require('../db');

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

  var hashedPassword = md5(password);
	if(user.password !== hashedPassword) {
		res.render('auth/login.pug', {
			error: "Password don't exits.",
			values: req.body
		});
		return;
	}

	res.cookie("cookieId", user.id);
	res.redirect('/transactions');
}