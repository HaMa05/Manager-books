const express = require("express");
const router = express.Router();

const db = require("../db");
let books = db.get('books').value();

const paginationController = require("../controllers/pagination.controller");
const paginationMiddleware = require("../middleware/pagination.middleware");

router.get('/', paginationMiddleware.perPage(books), paginationController.get);

router.get('/add/:id', paginationController.addToBook);

router.get('/add_all', paginationController.addAll);

module.exports = router;