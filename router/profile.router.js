const multer  = require('multer');
const cloudinary = require('cloudinary').v2;
const express = require("express");
const router = express.Router()

var upload = multer({ dest: 'public/uploads/' });
const profileController = require("../controllers/profile.controller");

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// profile
router.get("/", profileController.profile);

// profile avatar
router.get("/avatar", profileController.updateProfile);

// post profile
router.post("/avatar", upload.single('avatar'), profileController.postProfile);

module.exports = router;