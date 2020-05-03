const express = require('express');
const router = express.Router();

const controllerTransaction = require('../controllers/transaction.controller.js');

router.get("/", controllerTransaction.indexTransactionUser, controllerTransaction.indexTransaction);

router.get('/create', controllerTransaction.create);

router.post('/', controllerTransaction.postCreate);

// improve if id = null
router.get("/complete", controllerTransaction.errorFinish);

module.exports = router;