const express = require('express');
const router = express.Router();
const shortid = require('shortid');

const db = require('../db');
const collections = db.get('collections').value();
const users = db.get('users').value(); 
const books = db.get('books').value(); 

router.get('/', (req, res) => {
	var user = users.filter((user) => {
		return collections.find((coll) => {
			return user.id === coll.userId;
		})
	})
	// console.log(user.name);
	res.render('transaction/transaction.pug', {
		collections: user
	});

})

router.get('/create', (req, res) => {
	res.render('transaction/transaction-create.pug', {
		users: users,
		books: books
	});
})

router.post('/', (req, res) => {
	// res.render('transaction.pug', {
	// 	collections: collections
	// });
	// console.log(req.body.title);
	let id = shortid.generate();
	var book = books.find((book) => {
		return book.title === req.body.bookId;
	})
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
	// console.log(book.id);
})

module.exports = router;