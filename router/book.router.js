const express = require("express");
//automational create id
const db = require("../db");
let books = db.get('books').value();

const controllerBook = require('../controllers/book.controller.js');
const paginationMiddleware = require("../middleware/pagination.middleware");
const router = express.Router();
router.get('/', controllerBook.index);

// xem tất cả sách
router.get("/seeBookPagination", paginationMiddleware.perPage(books), controllerBook.see);


// thêm sách
router.get('/add', controllerBook.add);
router.post('/add/book', controllerBook.postAddBook);

//sửa title sách
router.get('/modify', controllerBook.modify);
router.get('/modify/:id/title', controllerBook.getTitle);
router.post('/modify/title', controllerBook.postTitle);

// xóa sách
router.get('/delete', controllerBook.delete);
router.get('/:id/delete', controllerBook.getDelete);

module.exports = router;