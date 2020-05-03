const express = require("express");
const router = express.Router();
// const db = require("../db");
const controllerIndex = require("../controllers/index.controller");
const cookieCount = require("../middleware/cookie-count");
const middlewareAuth = require('../middleware/auth.middleware.js');

router.get("/", /*controllerIndex.createCookie,*/middlewareAuth.requireAuth, controllerIndex.index);

module.exports = router;
