const shortid = require('shortid');

const db = require('../db');
const collections = db.get('collections').value();
const users = db.get('users').value(); 
const books = db.get('books').value(); 

module.exports.indexTransaction = (req, res) => {
	// find name user
	var user = users.filter((user) => {
		return collections.find((coll) => {
			return user.id === coll.userId;
		})
	})

	res.render('transaction/transaction.pug', {
		collections: user
	});

}

module.exports.create = (req, res) => {
	res.render('transaction/transaction-create.pug', {
		users: users,
		books: books
	});
}

module.exports.postCreate = (req, res) => {
	// find id of book from title book
	let id = shortid.generate();
	var book = books.find((book) => {
		return book.title === req.body.bookId;
	})
	// find id of user from name user
	var user = users.find((user) => {
		return user.name === req.body.userId;
	})
	req.body.id = id;
	req.body.userId = user.id;
	req.body.bookId = book.id;
	db.get('collections')
	  .push(req.body)
	  .write();

	res.redirect('/');
}