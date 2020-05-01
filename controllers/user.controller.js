const db = require('../db');
const shortid = require('shortid');
const users = db.get('users').value();

module.exports.index = (req, res) => {
	res.render('user/indexUser.pug');
}

module.exports.see = (req, res) => {
	res.render('user/seeUser.pug', {
		users: users
	});
}

module.exports.add = (req, res) => {
	res.render('user/addUser.pug');
}

module.exports.postUser = (req, res) => {
	let id = shortid.generate();
	let data = req.body;
  
	req.body.id = id;
	db.get('users')
	  .push(data)
	  .write();

	res.render('user/seeUser.pug', {
		users: users
	});
}

module.exports.deleteUser = (req, res) => {
	res.render('user/deleteUser.pug', {
		users: users
	});
}

module.exports.getDelete = (req, res) => {
	const id = req.params.id;
	db.get('users')
	  .remove({id: id})
	  .write()
	res.redirect('/users');
}