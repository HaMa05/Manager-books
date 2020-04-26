const express = require("express");
//automational create id
const shortid = require('shortid');

const db = require('../db');
const users = db.get('users').value();

const router = express.Router();
router.get('/', (req, res) => {
	res.render('user/indexUser.pug');
})

// xem tất cả sách
router.get('/see', (req, res) => {
	res.render('user/seeUser.pug', {
		users: users
	});
})

// thêm sách
router.get('/add', (req, res) => {
	res.render('user/addUser.pug');
})

router.post('/add/user', (req, res) => {
	let id = shortid.generate();
	let data = req.body;
	req.body.id = id;
	db.get('users')
	  .push(data)
	  .write();

	res.redirect('/users');
})

//sửa title sách
// router.get('/modify', (req, res) => {
// 	res.render('modifyUser.pug', {
// 		books: books
// 	});
// })

// router.get('/modify/:id/title', (req, res) => {
// 	const id = req.params.id;
// 	const book = db.get('users').find({id: id}).value()
// 	res.render('modify-title.pug', {
// 		books: book
// 	});
// })

// router.post('/modify/title', (req, res) => {
// 	const id = req.body.id;
// 	const title = req.body.title;
// 	db.get('books')
// 	  .find({id: id})
// 	  .assign({title: title})
// 	  .write()
// 	res.redirect('/books');
// })

// xóa sách
router.get('/delete', (req, res) => {
	res.render('user/deleteUser.pug', {
		users: users
	});
})

router.get('/:id/delete', (req, res) => {
	const id = req.params.id;
	db.get('users')
	  .remove({id: id})
	  .write()
	res.redirect('/users');
})

module.exports = router;