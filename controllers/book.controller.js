const db = require('../db');
const books = db.get('books').value();

module.exports.index = (req, res) => {
	res.render('book/index.pug');
};

module.exports.see = (req, res) => {
	res.render('book/see.pug', {
		books: books
	});
}

module.exports.add = (req, res) => {
	res.render('book/add.pug');
}

module.exports.postAddBook = (req, res) => {
	let id = shortid.generate();
	let data = req.body;
	req.body.id = id;
	db.get('books')
	  .push(data)
	  .write();

	res.redirect('/books');
}

module.exports.modify = (req, res) => {
	res.render('book/modify.pug', {
		books: books
	});
}

module.exports.getTitle = (req, res) => {
	const id = req.params.id;
	const book = db.get('books').find({id: id}).value()
	res.render('book/modify-title.pug', {
		books: book
	});
}

module.exports.postTitle = (req, res) => {
	const id = req.body.id;
	const title = req.body.title;
	db.get('books')
	  .find({id: id})
	  .assign({title: title})
	  .write()
	res.redirect('/books');
}

module.exports.delete = (req, res) => {
	res.render('book/delete.pug', {
		books: books
	});
}

module.exports.getDelete = (req, res) => {
	const id = req.params.id;
	db.get('books')
	  .remove({id: id})
	  .write()
	res.redirect('/books');
}