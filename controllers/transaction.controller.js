const shortid = require('shortid');

const db = require('../db');
const collections = db.get('collections').value();
const users = db.get('users').value(); 
const books = db.get('books').value(); 

module.exports.indexTransaction = (req, res) => {
	let newUser = users;
	let newBook = books;
	// loại bỏ tính chất object
	let a = JSON.stringify(collections);
	let newColl = [];
	newColl = JSON.parse(a);

	// tìm phần tử el.isComplete = false
	let user = newColl.filter((el) => {
		if(el.isComplete !== true) {
			return newUser.filter((user) => {
				if(el.userId === user.id) {
					return el.userId = user.name;
				}
			})
		}
	});

	let userDisplay = user.filter((el) => {
		return newBook.filter((book) => {
			if(el.bookId === book.id) {
				return el.bookId = book.title;
			}
		})
	})

	res.render('transaction/transaction.pug', {
		collections: userDisplay
	});

}

// user 
module.exports.indexTransactionUser = (req, res, next) => {
	let newUser = users;
	let newBook = books;
	let cookieId = req.signedCookies.cookieId; // cookieId = userId

	// Neu la tai khoan dang nhap la admin thi chuyen sang module khac
	let isAdmin = db.get('users').find({id: cookieId}).value();
	if(isAdmin.isAdmin) {
		next();
		return;
	}
	// loại bỏ tính chất object
	let a = JSON.stringify(collections);
	let newColl = [];
	newColl = JSON.parse(a);

	// tim user dựa vào userId của collections
	let user = newColl.filter((el) => {
		// el.isComplete = false và id = true
		if(el.isComplete !== true && el.id && el.userId === cookieId) {
			return newUser.filter((user) => {
				if(el.userId === user.id) {
					return el.userId = user.name;
				}
			})
		}
	});

	// tìm title dựa vào bookId
	let userDisplay = user.filter((el) => {
		return newBook.filter((book) => {
			if(el.bookId === book.id) {
				return el.bookId = book.title;
			}
		})
	})

	// console.log(userDisplay);
	res.render('transaction/transaction.pug', {
		collections: userDisplay
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
  let isComplete = false;
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
  req.body.isComplete = isComplete;
	db.get('collections')
	  .push(req.body)
	  .write();

	res.redirect('/');
}


module.exports.finishBook = (req, res) => {
	const id = req.params.id;
	db.get('collections')
	  .find({id: id})
	  .assign({isComplete: true})
	  .write();
	res.redirect('/transactions');
}

// if id = null
module.exports.errorFinish = (req, res) => {
	// res.send("Error !!!");
	res.redirect('/transactions');
}