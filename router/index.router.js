const express = require("express");
const router = express.Router();
// const db = require("../db");
const controllerIndex = require("../controllers/index.controller");
const cookieCount = require("../middleware/cookie-count");

router.get("/", controllerIndex.createCookie, controllerIndex.index);

module.exports = router;
