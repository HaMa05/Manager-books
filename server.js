const express = require("express");
const app = express();
const bodyParser = require('body-parser');
//automational create id
const shortid = require('shortid');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
// create constructor 
const adapter = new FileSync('db.json');
const db = lowdb(adapter);
db.defaults({books: []})
  .write()

const pug = require('pug');
app.set('view engine', 'pug');
app.set('views', './views');

const books = db.get('books').value();

// Trang chính
app.get('/', (req, res) => {
	res.send("<h1> You are wellcom!</h1> <a href=\"/books\" style=\"text-decoration: none; font-size: 30px; font-weight: bold; color: #ea640f \">Manager Books</a>");
})
// quản lý sách
app.get('/books', (req, res) => {
	res.render('index.pug');
})

// xem tất cả sách
app.get('/books/see', (req, res) => {
	res.render('see.pug', {
		books: books
	});
})

// thêm sách
app.get('/books/add', (req, res) => {
	res.render('add.pug');
})

app.post('/books/add/book', (req, res) => {
	let id = shortid.generate();
	let data = req.body;
	req.body.id = id;
	db.get('books')
	  .push(data)
	  .write();

	res.redirect('/books');
})

//sửa title sách
app.get('/books/modify', (req, res) => {
	res.render('modify.pug', {
		books: books
	});
})

app.get('/books/modify/:id/title', (req, res) => {
	const id = req.params.id;
	const book = db.get('books').find({id: id}).value()
	res.render('modify-title.pug', {
		books: book
	});
})

app.post('/books/modify/title', (req, res) => {
	const id = req.body.id;
	const title = req.body.title;
	db.get('books')
	  .find({id: id})
	  .assign({title: title})
	  .write()
	res.redirect('/books');
})

// xóa sách
app.get('/books/delete', (req, res) => {
	res.render('delete.pug', {
		books: books
	});
})

app.get('/books/:id/delete', (req, res) => {
	const id = req.params.id;
	db.get('books')
	  .remove({id: id})
	  .write()
	res.redirect('/books');
})

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
