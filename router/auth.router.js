const express = require("express");
const router = express.Router();

const controllerAuth = require("../controllers/auth.controller");

router.get("/login", controllerAuth.login);

router.post("/login", controllerAuth.postLogin);

module.exports = router;