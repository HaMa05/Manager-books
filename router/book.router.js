const express = require("express");
//automational create id
const shortid = require('shortid');

const db = require('../db');
const books = db.get('books').value();

const router = express.Router();
router.get('/', (req, res) => {
	res.render('book/index.pug');
})

// xem tất cả sách
router.get('/see', (req, res) => {
	res.render('book/see.pug', {
		books: books
	});
})

// thêm sách
router.get('/add', (req, res) => {
	res.render('book/add.pug');
})

router.post('/add/book', (req, res) => {
	let id = shortid.generate();
	let data = req.body;
	req.body.id = id;
	db.get('books')
	  .push(data)
	  .write();

	res.redirect('/books');
})

//sửa title sách
router.get('/modify', (req, res) => {
	res.render('book/modify.pug', {
		books: books
	});
})

router.get('/modify/:id/title', (req, res) => {
	const id = req.params.id;
	const book = db.get('books').find({id: id}).value()
	res.render('book/modify-title.pug', {
		books: book
	});
})

router.post('/modify/title', (req, res) => {
	const id = req.body.id;
	const title = req.body.title;
	db.get('books')
	  .find({id: id})
	  .assign({title: title})
	  .write()
	res.redirect('/books');
})

// xóa sách
router.get('/delete', (req, res) => {
	res.render('book/delete.pug', {
		books: books
	});
})

router.get('/:id/delete', (req, res) => {
	const id = req.params.id;
	db.get('books')
	  .remove({id: id})
	  .write()
	res.redirect('/books');
})

module.exports = router;