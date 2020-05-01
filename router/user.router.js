const express = require("express");
// const generatePassword = require('password-generator');
const controllerUser = require('../controllers/user.controller.js');
const validationUser = require('../validation/user.validation.js');

const router = express.Router();

router.get('/', controllerUser.index);

// xem tất user
router.get('/see', controllerUser.see);

// thêm user
router.get('/add', controllerUser.add);
router.post('/add/user', validationUser.postUser, controllerUser.postUser);

//sửa user
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

// xóa user
router.get('/delete', controllerUser.deleteUser);
router.get('/:id/delete', controllerUser.getDelete);

module.exports = router;